import { useState } from "react";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AnalysisResult = {
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

export default function Analysis() {
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!resumeId || !jobDescription) {
      alert("Please enter Resume ID and Job Description.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(`/resume/${resumeId}/analyze`, {
        jobDescription,
      });

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume vs Job Description Analysis</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            className="w-full border rounded-lg p-3"
            placeholder="Resume ID"
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
          />

          <textarea
            rows={10}
            className="w-full border rounded-lg p-3"
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>ATS Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{result.atsScore}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Match</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{result.jobMatchScore}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {result.keywordCoverage}%
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard title="Matched Skills" items={result.matchedSkills} />
            <InfoCard title="Missing Skills" items={result.missingSkills} />
            <InfoCard title="Strengths" items={result.strengths} />
            <InfoCard title="Weaknesses" items={result.weaknesses} />
            <InfoCard title="Suggestions" items={result.suggestions} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result.summary}</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function InfoCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {items.length > 0 ? (
            items.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No data available.</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}