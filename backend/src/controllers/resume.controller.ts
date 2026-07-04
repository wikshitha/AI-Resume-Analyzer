import fs from "fs";
import * as pdf from "pdf-parse";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // READ PDF
    const dataBuffer = fs.readFileSync(filePath);
    // pdf-parse has a CommonJS callable export; cast to any to call it
    const pdfData = await (pdf as any)(dataBuffer);

    const extractedText = pdfData.text;

    // SAVE TO DB
    const resume = await prisma.resume.create({
      data: {
        userId: (req as any).user.id, // from JWT middleware
        fileName: req.file.originalname,
        fileUrl: filePath,
        extractedText,
      },
    });

    res.json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
};