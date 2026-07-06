import { useEffect, useState } from "react";
import { FiFileText, FiPercent, FiAward } from "react-icons/fi";

import api from "@/services/api";

import ATSTrendChart from "@/components/dashboard/ATSTrendChart";
import AIInsights from "@/components/dashboard/AIInsights";
import RecentActivity from "@/components/dashboard/RecentActivity";

type DashboardStats = {
  totalAnalyses: number;
  averageATS: number;
  bestScore: number;
};

type TrendData = {
  date: string;
  score: number;
};

type Insights = {
  improvement: number;
  bestResume: string;
  bestScore: number;
  strongestSkill: string;
  mostMissingSkill: string;
};

type RecentResume = {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatchScore: number;
  createdAt: string;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    totalAnalyses: 0,
    averageATS: 0,
    bestScore: 0,
  });

  const [trendData, setTrendData] = useState<TrendData[]>([]);

  const [insights, setInsights] = useState<Insights>({
    improvement: 0,
    bestResume: "-",
    bestScore: 0,
    strongestSkill: "-",
    mostMissingSkill: "-",
  });

  const [recentResumes, setRecentResumes] = useState<RecentResume[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [statsRes, trendRes, insightsRes, recentRes] =
        await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/trend"),
          api.get("/dashboard/insights"),
          api.get("/dashboard/recent"),
        ]);

      setStats(statsRes.data);
      setTrendData(trendRes.data);
      setInsights(insightsRes.data);
      setRecentResumes(recentRes.data);
    } catch (error) {
      console.error("Dashboard loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          AI Resume Analyzer Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Track your resume performance and AI analysis results
        </p>
      </div>

      {/* KPI CARDS */}

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <FiFileText className="text-3xl text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">
                Total Analyses
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalAnalyses}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <FiPercent className="text-3xl text-green-600" />

            <div>
              <p className="text-sm text-gray-500">
                Average ATS
              </p>

              <h2 className="text-3xl font-bold">
                {stats.averageATS}%
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <FiAward className="text-3xl text-yellow-500" />

            <div>
              <p className="text-sm text-gray-500">
                Best Score
              </p>

              <h2 className="text-3xl font-bold">
                {stats.bestScore}%
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* CHART + AI INSIGHTS */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <ATSTrendChart data={trendData} />
        </div>

        <AIInsights
          improvement={insights.improvement}
          bestResume={insights.bestResume}
          bestScore={insights.bestScore}
          strongestSkill={insights.strongestSkill}
          mostMissingSkill={insights.mostMissingSkill}
        />

      </div>

      {/* RECENT AI ACTIVITY */}

      <RecentActivity resumes={recentResumes} />

      {/* EMPTY STATE */}

      {stats.totalAnalyses === 0 && (
        <div className="rounded-lg bg-white p-10 text-center shadow dark:bg-gray-800">

          <h2 className="text-xl font-semibold">
            No Resume Analysis Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Upload and analyze your first resume to see AI insights.
          </p>

        </div>
      )}

    </div>
  );
}