import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash', // use a valid model version
      contents: prompt,
      config: {
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });
    if (!response.text) {
      throw new Error('Empty response from gemini ai');
    }

    return response.text;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    console.error('Gemini API Error:', error);
    throw error;
  }
};
