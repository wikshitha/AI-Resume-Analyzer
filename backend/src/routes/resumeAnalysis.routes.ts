import express from "express";
import { analyzeResume } from "../controllers/resumeAnalysis.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/:id/analyze", authMiddleware, analyzeResume);

export default router;