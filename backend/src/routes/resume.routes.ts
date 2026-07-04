import express from "express";
import { upload } from "../utils/multer";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserResumes, uploadResume } from "../controllers/resume.controller";

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

export default router;