import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  getAnalysisHistory,
  getResumeAnalysis,
} from "../controllers/analytics.controller";

const router = express.Router();

router.get(
  "/history",
  authMiddleware,
  getAnalysisHistory
);

router.get(
  "/:id/analysis",
  authMiddleware,
  getResumeAnalysis
);

export default router;