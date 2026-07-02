export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome to AI Resume Analyzer
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Analyses</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Average ATS Score</p>
          <h2 className="text-2xl font-bold">82%</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Best Score</p>
          <h2 className="text-2xl font-bold">94%</h2>
        </div>
      </div>

      {/* PLACEHOLDER CHART */}
      <div className="bg-white p-6 rounded shadow h-64">
        ATS Trend Chart (Coming Soon)
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded shadow">
        Recent Resume Analysis History
      </div>
    </div>
  );
}