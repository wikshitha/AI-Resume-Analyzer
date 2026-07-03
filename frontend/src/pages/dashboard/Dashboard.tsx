import { FiFileText, FiPercent, FiAward } from "react-icons/fi";

export default function Dashboard() {
  const hasData = false;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          AI Resume Analyzer Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Track your resume performance and ATS scores
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center gap-3">
          <FiFileText className="text-blue-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Analyses</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              12
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center gap-3">
          <FiPercent className="text-green-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Average ATS Score</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              82%
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center gap-3">
          <FiAward className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Best Score</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              94%
            </h2>
          </div>
        </div>

      </div>

      {/* CHART PLACEHOLDER */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow h-64 flex items-center justify-center text-gray-400">
        ATS Trend Chart (Coming Soon)
      </div>

      {/* EMPTY STATE */}
      {!hasData && (
        <div className="bg-white dark:bg-gray-800 p-10 rounded shadow text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            No Resume Analysis Yet
          </h2>
          <p className="text-gray-500 mt-2">
            Upload your first resume to get AI insights
          </p>
        </div>
      )}

    </div>
  );
}