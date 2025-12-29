import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getNutritionFromGemini = async (foodText) => {
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

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  const json = text.slice(start, end + 1);

  return JSON.parse(json);
};