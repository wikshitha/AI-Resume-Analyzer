import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { analyzeResumeWithJD } from "../services/gemini.service";

const prisma = new PrismaClient();

const safeArray = (value: unknown): string[] => {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
};

export const analyzeResume = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const resumeId = req.params.id as string;
    const { jobDescription } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    if (!jobDescription || typeof jobDescription !== "string") {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    // Fetch resume
    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (!resume.extractedText) {
      return res.status(400).json({
        message: "Resume text has not been extracted",
      });
    }

    // Analyze with Gemini
    const aiResponse =
      (await analyzeResumeWithJD(
        resume.extractedText,
        jobDescription
      )) ?? "";

    if (!aiResponse) {
      return res.status(500).json({
        message: "Gemini returned an empty response",
      });
    }

    // Remove markdown if Gemini returns ```json
    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed: any;

    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Invalid JSON:", cleanedResponse);

      return res.status(500).json({
        message: "Failed to parse AI response",
      });
    }

    // Save analysis
    const updatedResume = await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        jobDescription,

        atsScore: parsed.atsScore ?? 0,
        jobMatchScore: parsed.jobMatchScore ?? 0,
        keywordCoverage: parsed.keywordCoverage ?? 0,

        matchedSkills: safeArray(parsed.matchedSkills),
        missingSkills: safeArray(parsed.missingSkills),
        strengths: safeArray(parsed.strengths),
        weaknesses: safeArray(parsed.weaknesses),
        suggestions: safeArray(parsed.suggestions),

        summary: parsed.summary ?? "",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: updatedResume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI analysis failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

