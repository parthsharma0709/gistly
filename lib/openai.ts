import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const response = await client.responses.create({
      model: 'gpt-4o-mini', //  No reasoning mode here
      input: [
        {
          role: 'system',
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Summarize the following PDF text:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_output_tokens: 1500,
    });

    console.dir(response, { depth: null });

    return response.output_text || 'No summary generated.';
  } catch (error: any) {
    console.error('Error from OpenAI:', error);

    //  Keep the real error details so caller can handle fallback properly
    if (
      error?.status === 429 ||
      error?.code === 'insufficient_quota' ||
      error?.code === 'rate_limit_exceeded'
    ) {
      // Attach a flag instead of replacing error
      error.isQuotaError = true;
    }

    throw error; // let caller decide
  }
}
