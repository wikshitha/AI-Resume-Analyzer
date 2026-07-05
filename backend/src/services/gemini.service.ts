import { GoogleGenAI } from "@google/genai";
import { buildResumeJDAnalysisPrompt } from "../prompts/resume.prompt";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeResumeWithJD = async (
  resumeText: string,
  jobDescription: string
) => {
  const prompt = buildResumeJDAnalysisPrompt(
    resumeText,
    jobDescription
  );

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};