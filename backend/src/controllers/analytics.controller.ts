import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnalysisHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const history = await prisma.resume.findMany({
      where: {
        userId,
        atsScore: {
          not: null,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        fileName: true,
        atsScore: true,
        jobMatchScore: true,
        createdAt: true,
      },
    });

    return res.json(history);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch history",
    });

  }
};

export const getResumeAnalysis = async (
  req: Request,
  res: Response
) => {
  try {
    const resumeId = req.params.id as string;

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
      select: {
        id: true,
        fileName: true,

        atsScore: true,
        jobMatchScore: true,
        keywordCoverage: true,

        matchedSkills: true,
        missingSkills: true,

        strengths: true,
        weaknesses: true,

        suggestions: true,

        summary: true,
      },
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.json(resume);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analysis",
    });

  }
};