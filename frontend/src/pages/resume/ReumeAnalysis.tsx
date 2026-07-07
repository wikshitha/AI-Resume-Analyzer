import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";

type Analysis = {
  fileName: string;

  atsScore: number;
  jobMatchScore: number;
  keywordCoverage: number;

  matchedSkills: string[];
  missingSkills: string[];

  strengths: string[];
  weaknesses: string[];

  suggestions: string[];

  summary: string;
};

export default function ResumeAnalysis() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await api.get(`/analytics/${id}/analysis`);

      setAnalysis(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading analysis...
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Analysis not found
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Resume Analysis
        </h1>

        <p className="text-gray-500">
          {analysis.fileName}
        </p>

      </div>

      {/* SCORE CARDS */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-lg bg-blue-100 p-6 text-center">

          <h3 className="text-lg font-semibold">
            ATS Score
          </h3>

          <p className="mt-2 text-4xl font-bold text-blue-700">
            {analysis.atsScore}%
          </p>

        </div>

        <div className="rounded-lg bg-green-100 p-6 text-center">

          <h3 className="text-lg font-semibold">
            Job Match
          </h3>

          <p className="mt-2 text-4xl font-bold text-green-700">
            {analysis.jobMatchScore}%
          </p>

        </div>

        <div className="rounded-lg bg-purple-100 p-6 text-center">

          <h3 className="text-lg font-semibold">
            Keyword Coverage
          </h3>

          <p className="mt-2 text-4xl font-bold text-purple-700">
            {analysis.keywordCoverage}%
          </p>

        </div>

      </div>

      {/* SKILLS */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-lg border bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold text-green-700">
            Matched Skills
          </h2>

          <ul className="list-disc space-y-2 pl-5">

            {analysis.matchedSkills.map((skill, index) => (

              <li key={index}>
                {skill}
              </li>

            ))}

          </ul>

        </div>

        <div className="rounded-lg border bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold text-red-700">
            Missing Skills
          </h2>

          <ul className="list-disc space-y-2 pl-5">

            {analysis.missingSkills.map((skill, index) => (

              <li key={index}>
                {skill}
              </li>

            ))}

          </ul>

        </div>

      </div>

      {/* STRENGTHS / WEAKNESSES */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-lg border bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Strengths
          </h2>

          <ul className="list-disc space-y-2 pl-5">

            {analysis.strengths.map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

          </ul>

        </div>

        <div className="rounded-lg border bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Weaknesses
          </h2>

          <ul className="list-disc space-y-2 pl-5">

            {analysis.weaknesses.map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

          </ul>

        </div>

      </div>

      {/* SUGGESTIONS */}

      <div className="rounded-lg border bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          AI Suggestions
        </h2>

        <ul className="list-disc space-y-2 pl-5">

          {analysis.suggestions.map((item, index) => (

            <li key={index}>
              {item}
            </li>

          ))}

        </ul>

      </div>

      {/* SUMMARY */}

      <div className="rounded-lg border bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          AI Summary
        </h2>

        <p className="leading-7 text-gray-700">
          {analysis.summary}
        </p>

      </div>

    </div>
  );
}