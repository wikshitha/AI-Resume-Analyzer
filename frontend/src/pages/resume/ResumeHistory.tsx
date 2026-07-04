import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import api from "@/services/api";

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

      setResumes((prev) => prev.filter((resume) => resume.id !== id));
    } catch (error) {
      console.error("Failed to delete resume:", error);
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
      <h1 className="mb-6 text-2xl font-bold">Resume History</h1>

      {resumes.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-gray-500">No resumes uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              <div>
                <h2 className="font-semibold">{resume.fileName}</h2>

                <p className="text-sm text-gray-500">
                  Uploaded on{" "}
                  {new Date(resume.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(`/resume/${resume.id}`)}
                  className="text-blue-600 transition hover:text-blue-800"
                  title="View Resume"
                >
                  <FaEye size={18} />
                </button>

                <button
                  onClick={() => handleDelete(resume.id)}
                  className="text-red-600 transition hover:text-red-800"
                  title="Delete Resume"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}