import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./Api";

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function main(promptText : string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite", 
    });

    const result = await model.generateContent(
    `${promptText} (Please answer in Hindi)`
    );

    return result.response.text();
  } catch (error) {
    // ... error handling
  }
}
