import {
  FaArrowTrendUp,
  FaAward,
  FaBrain,
  FaTriangleExclamation,
} from "react-icons/fa6";

type Props = {
  improvement: number;
  bestResume: string;
  bestScore: number;
  strongestSkill: string;
  mostMissingSkill: string;
};

export default function AIInsights({
  improvement,
  bestResume,
  bestScore,
  strongestSkill,
  mostMissingSkill,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        AI Insights
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <FaArrowTrendUp className="text-green-600" />
          <div>
            <p className="font-medium">
              ATS Improvement
            </p>

            <p className="text-sm text-gray-500">
              {improvement >= 0 ? "+" : ""}
              {improvement}% compared to your first analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaAward className="text-yellow-500" />
          <div>
            <p className="font-medium">
              Best Resume
            </p>

            <p className="text-sm text-gray-500">
              {bestResume} ({bestScore}% ATS)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaBrain className="text-blue-600" />
          <div>
            <p className="font-medium">
              Strongest Skill
            </p>

            <p className="text-sm text-gray-500">
              {strongestSkill}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaTriangleExclamation className="text-red-500" />
          <div>
            <p className="font-medium">
              Most Missing Skill
            </p>

            <p className="text-sm text-gray-500">
              {mostMissingSkill}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}