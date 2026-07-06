import { useState } from "react";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { toast } from "sonner";
import api from "@/services/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UploadedResume = {
  id: string;
  fileName: string;
};

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

export default function UploadResume() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedResume, setUploadedResume] =
    useState<UploadedResume | null>(null);

  const [jobDescription, setJobDescription] = useState("");

  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // ---------------- UPLOAD ----------------
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const res = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedResume(res.data.resume);

      toast.success("Resume uploaded successfully!");

      // reset old analysis if new resume uploaded
      setAnalysis(null);
      setJobDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- ANALYZE ----------------
  const handleAnalyze = async () => {
    if (!uploadedResume) {
      toast.error("Please upload a resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please paste the job description.");
      return;
    }

    try {
      setAnalyzing(true);

      const res = await api.post(
        `/resume/${uploadedResume.id}/analyze`,
        {
          jobDescription,
        }
      );


      setAnalysis(res.data.data);

      toast.success("AI analysis completed successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const CircularScore = ({ value }: { value: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
      circumference - (value / 100) * circumference;

    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="14"
          fontWeight="bold"
        >
          {value}%
        </text>
      </svg>
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">

      {/* ---------------- UPLOAD CARD ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Upload Resume
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="rounded-lg border-2 border-dashed p-10 text-center">
            <FaCloudUploadAlt
              className="mx-auto mb-4 text-blue-600"
              size={60}
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] || null)
              }
            />

            <p className="mt-3 text-sm text-gray-500">
              Upload your resume in PDF format
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <FaFilePdf className="text-red-600" size={26} />

              <div>
                <p className="font-medium">
                  {selectedFile.name}
                </p>

                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            disabled={uploading}
            onClick={handleUpload}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </Button>

        </CardContent>
      </Card>

      {/* ---------------- JD + ANALYZE ---------------- */}
      {uploadedResume && (
        <Card>
          <CardHeader>
            <CardTitle>AI Resume Analysis</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">

            <div className="rounded-lg bg-green-50 p-4">
              <p className="font-medium text-green-700">
                {uploadedResume.fileName}
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Job Description
              </label>

              <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste job description here..."
                className="w-full rounded-lg border p-3"
              />
            </div>

            <Button
              className="w-full"
              disabled={analyzing}
              onClick={handleAnalyze}
            >
              {analyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>

          </CardContent>
        </Card>
      )}

      {/* ---------------- RESULTS SECTION (NEW) ---------------- */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis Result</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">

            {/* SCORES */}
            <div className="grid gap-6 md:grid-cols-3">

              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <p className="text-gray-500">ATS Score</p>
                <div className="mt-3 flex justify-center">
                  <CircularScore value={analysis.atsScore} />
                </div>
              </div>

              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <p className="text-gray-500">Job Match</p>
                <h2 className="mt-3 text-3xl font-bold text-blue-600">
                  {analysis.jobMatchScore}%
                </h2>
              </div>

              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <p className="text-gray-500">Keyword Coverage</p>
                <h2 className="mt-3 text-3xl font-bold text-purple-600">
                  {analysis.keywordCoverage}%
                </h2>
              </div>

            </div>

            {/* MATCHED SKILLS */}
            <div>
              <h3 className="mb-2 font-semibold">
                Matched Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {analysis.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* MISSING SKILLS */}
            <div>
              <h3 className="mb-2 font-semibold">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* STRENGTHS */}
            <div>
              <h3 className="mb-2 font-semibold">
                Strengths
              </h3>

              <ul className="list-disc pl-5">
                {analysis.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {/* WEAKNESSES */}
            <div>
              <h3 className="mb-2 font-semibold">
                Weaknesses
              </h3>

              <ul className="list-disc pl-5">
                {analysis.weaknesses.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {/* SUGGESTIONS */}
            <div>
              <h3 className="mb-2 font-semibold">
                Suggestions
              </h3>

              <ul className="list-disc pl-5">
                {analysis.suggestions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {/* SUMMARY */}
            <div>
              <h3 className="mb-2 font-semibold">
                Summary
              </h3>

              <div className="rounded-lg border bg-gray-50 p-4">
                {analysis.summary}
              </div>
            </div>

          </CardContent>
        </Card>
      )}

    </div>
  );
}