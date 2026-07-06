import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getAIInsights, getATSTrend, getDashboardStats, getRecentActivity } from "../controllers/dashboard.controller";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
);

router.get(
  "/trend",
  authMiddleware,
  getATSTrend
);

router.get(
  "/insights",
  authMiddleware,
  getAIInsights
);

router.get(
  "/recent",
  authMiddleware,
  getRecentActivity
);

export default router;