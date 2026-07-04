import express from "express";
import { upload } from "../utils/multer";
import { authMiddleware } from "../middleware/auth.middleware";
import { deleteResume, getResumeById, getUserResumes, uploadResume } from "../controllers/resume.controller";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware as any,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/",
  authMiddleware,
  getUserResumes
);

router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);

router.get(
  "/:id",
  authMiddleware,
  getResumeById
);

export default router;