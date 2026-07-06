import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash, } from "react-icons/fa";

import api from "@/services/api";

import { Button } from "@/components/ui/button";

type Resume = {
  id: string;
  fileName: string;
  createdAt: string;
};

export default function ResumeHistory() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume");
      setResumes(res.data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/resume/${id}`);

      setResumes((prev) =>
        prev.filter((resume) => resume.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete resume:", error);
      alert("Failed to delete resume.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Resume History
        </h1>

        <Button onClick={() => navigate("/upload")}>
          Upload Resume
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">
            No resumes uploaded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {resume.fileName}
                </h2>

                <p className="text-sm text-gray-500">
                  Uploaded on{" "}
                  {new Date(
                    resume.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">

                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/resume/${resume.id}`)
                  }
                >
                  <FaEye className="mr-2" />
                  View
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    handleDelete(resume.id)
                  }
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </Button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}