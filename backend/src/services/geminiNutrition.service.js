import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getNutritionFromGemini = async (foodText) => {
try {
    const prompt = `
You are a nutrition expert.
Return ONLY valid JSON in this format:

{
  "calories": number,
  "protein": number,
}

Food: "${foodText}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    // Extract JSON safely
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid Gemini response format");
    }

    const json = text.slice(start, end + 1);
    const parsed = JSON.parse(json);

    return {
      calories: Number(parsed.calories),
      protein: Number(parsed.protein) || 0,
    };
  } catch (error) {
    console.error("Gemini Service Error:", error.message);
    throw error;
  }
};