import express from "express";
import { upload } from "../utils/multer";
import { uploadResume } from "../controllers/resume.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;