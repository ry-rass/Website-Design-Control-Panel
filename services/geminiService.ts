
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeLayout(imageBase64: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.split(',')[1] || imageBase64,
            },
          },
          {
            text: "Analyze this layout screenshot. Suggest specific typography (font family, size) and layout changes to improve visual hierarchy and professional aesthetics. Return as a short bulleted list.",
          },
        ],
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "Could not analyze the layout at this time.";
  }
}
