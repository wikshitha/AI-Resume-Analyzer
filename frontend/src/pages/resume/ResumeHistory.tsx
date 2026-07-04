import { useEffect, useState } from "react";
import api from "@/services/api";

type Resume = {
  id: string;
  fileName: string;
  createdAt: string;
};

export default function ResumeHistory() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/resume");
        setResumes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) {
    return <p className="p-4">Loading resumes...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Resume History
      </h1>

      <div className="space-y-3">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">
                {resume.fileName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(resume.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}