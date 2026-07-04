import fs from "fs";
import pdf from "pdf-parse";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadResume = async (req: Request, res: Response) => {
  try {
    // check file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // get user from auth middleware
    const user = (req as any).user;

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filePath = req.file.path;

    // READ PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);

    const extractedText = pdfData.text;

    // SAVE TO DB
    const resume = await prisma.resume.create({
      data: {
        fileName: req.file.originalname,
        fileUrl: filePath,
        extractedText,

        user: {
          connect: {
            id: user.userId,
          },
        },
      },
    });

    return res.json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      message: "Upload failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getUserResumes = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resumes = await prisma.resume.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(resumes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch resumes",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteResume = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ensure resume belongs to user
    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await prisma.resume.delete({
      where: { id },
    });

    return res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete resume",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getResumeById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.json(resume);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch resume",
      error: error instanceof Error ? error.message : error,
    });
  }
};