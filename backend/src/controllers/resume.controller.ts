import pdf from "pdf-parse";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary";

const prisma = new PrismaClient();

export const uploadResume = async (req: Request, res: Response) => {
  try {
    // check file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedFile = req.file;

    // get user from auth middleware
    const user = (req as any).user;

    if (!user?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const fileBuffer = uploadedFile.buffer;

    // READ PDF
    const dataBuffer = fileBuffer;
    const pdfData = await pdf(dataBuffer);

    const extractedText = pdfData.text;

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "ai-resume-analyzer",
          public_id: `${Date.now()}-${uploadedFile.originalname.replace(/\.[^.]+$/, "")}`,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Cloudinary upload failed"));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(fileBuffer);
    });

    // SAVE TO DB
    const resume = await prisma.resume.create({
      data: {
        fileName: uploadedFile.originalname,
        fileUrl: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id,
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

    const cloudinaryPublicId = (resume as { cloudinaryPublicId?: string | null }).cloudinaryPublicId;

    if (cloudinaryPublicId) {
      await cloudinary.uploader.destroy(cloudinaryPublicId, {
        resource_type: "raw",
      });
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