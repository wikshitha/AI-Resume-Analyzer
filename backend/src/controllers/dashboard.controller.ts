import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    // Get analyzed resumes only
    const resumes = await prisma.resume.findMany({
      where: {
        userId,
        atsScore: {
          not: null,
        },
      },
      select: {
        atsScore: true,
      },
    });

    const totalAnalyses = resumes.length;

    const averageATS =
      totalAnalyses > 0
        ? Math.round(
            resumes.reduce(
              (sum, r) => sum + (r.atsScore ?? 0),
              0
            ) / totalAnalyses
          )
        : 0;

    const bestScore =
      totalAnalyses > 0
        ? Math.max(
            ...resumes.map((r) => r.atsScore ?? 0)
          )
        : 0;

    return res.json({
      totalAnalyses,
      averageATS,
      bestScore,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
};

export const getATSTrend = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const resumes = await prisma.resume.findMany({
      where: {
        userId,
        atsScore: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
      select: {
        atsScore: true,
        createdAt: true,
      },
    });

    const trend = resumes.map((resume) => ({
      date: resume.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      score: resume.atsScore,
    }));

    return res.json(trend);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch ATS trend",
    });
  }
};

export const getAIInsights = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const resumes = await prisma.resume.findMany({
      where: {
        userId,
        atsScore: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        fileName: true,
        atsScore: true,
        matchedSkills: true,
        missingSkills: true,
      },
    });

    if (resumes.length === 0) {
      return res.json({
        improvement: 0,
        bestResume: "-",
        bestScore: 0,
        strongestSkill: "-",
        mostMissingSkill: "-",
      });
    }

    // -----------------------
    // Improvement %
    // -----------------------

    let improvement = 0;

    if (resumes.length >= 2) {
      const first = resumes[0].atsScore ?? 0;
      const last = resumes[resumes.length - 1].atsScore ?? 0;

      improvement = last - first;
    }

    // -----------------------
    // Best Resume
    // -----------------------

    const bestResume = resumes.reduce((best, current) =>
      (current.atsScore ?? 0) > (best.atsScore ?? 0)
        ? current
        : best
    );

    // -----------------------
    // Count Skills
    // -----------------------

    const matchedCounter: Record<string, number> = {};
    const missingCounter: Record<string, number> = {};

    resumes.forEach((resume) => {

      (resume.matchedSkills ?? []).forEach((skill) => {
        matchedCounter[skill] =
          (matchedCounter[skill] || 0) + 1;
      });

      (resume.missingSkills ?? []).forEach((skill) => {
        missingCounter[skill] =
          (missingCounter[skill] || 0) + 1;
      });

    });

    const strongestSkill =
      Object.entries(matchedCounter)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    const mostMissingSkill =
      Object.entries(missingCounter)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    return res.json({
      improvement,

      bestResume: bestResume.fileName,

      bestScore: bestResume.atsScore,

      strongestSkill,

      mostMissingSkill,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch AI insights",
    });
  }
};

export const getRecentActivity = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const resumes = await prisma.resume.findMany({
      where: {
        userId,
        atsScore: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        fileName: true,
        atsScore: true,
        jobMatchScore: true,
        createdAt: true,
      },
    });

    return res.json(resumes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load recent activity",
    });
  }
};