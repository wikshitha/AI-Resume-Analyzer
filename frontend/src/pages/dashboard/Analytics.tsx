import { useEffect, useState } from "react";
import api from "@/services/api";
import AnalysisHistoryTable from "@/components/analytics/AnalysisHistoryTable";

type Analysis = {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatchScore: number;
  createdAt: string;
};

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Analysis[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/analytics/history");
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading AI Analysis History...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          AI Analysis History
        </h1>

        <p className="text-gray-500">
          View all previously analyzed resumes
        </p>

      </div>

      <AnalysisHistoryTable history={history} />

    </div>
  );
}