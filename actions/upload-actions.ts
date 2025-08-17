'use server';

import { getDbConnection } from '@/lib/db';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          ufsUrl: string;
          name: string;
        };
      };
    },
  ],
) {
  if (!uploadResponse) {
    return { success: false, message: 'file upload failed', data: null };
  }

  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, message: 'file upload failed', data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    let summary: string | null = null;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
    } catch (error: any) {
      console.error('OpenAI failed:', error);

      const isQuotaOrRateError =
        error?.status === 429 ||
        error?.code === 'insufficient_quota' ||
        error?.code === 'rate_limit_exceeded' ||
        error?.message?.includes('quota') ||
        error?.message?.includes('RATE_LIMIT_EXCEEDED');

      if (isQuotaOrRateError) {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error('Gemini also failed:', geminiError);
          throw new Error('Failed to generate summary with available AI providers');
        }
      } else {
        throw error; // some other unexpected error
      }
    }

    if (!summary) {
      return { success: false, message: 'Failed to generate summary', data: null };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: 'Summary generated successfully',
      data: { summary, title: formattedFileName },
    };
  } catch (error) {
    return { success: false, message: 'file upload failed', data: null };
  }
}

async function savePdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        status, 
        title, 
        file_name
      )
      VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        'completed',  
        ${title},
        ${fileName}
      ) RETURNING id, summary_text;`;

    return savedSummary;
  } catch (error) {
    console.error('error saving pdf summary', error);
    throw error;
  }
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfSummaryType) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: 'User not found' };
    }

    savedSummary = await savePdfSummary({ userId, fileUrl, summary, title, fileName });

    if (!savedSummary) {
      return { success: false, message: 'Failed to save PDF summary, please try again' };
    }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Error saving pdf' };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: 'PDF summary saved successfully',
    data: { id: savedSummary.id },
  };
}
