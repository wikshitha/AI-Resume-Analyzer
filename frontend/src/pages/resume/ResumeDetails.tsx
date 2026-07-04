import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";

type Resume = {
  id: string;
  fileName: string;
  fileUrl: string;
  extractedText: string;
  createdAt: string;
};

export default function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resume/${id}`);
        setResume(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResume();
  }, [id]);

  if (!resume) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {resume.fileName}
      </h1>

      <p className="text-sm text-gray-500">
        Uploaded: {new Date(resume.createdAt).toLocaleString()}
      </p>

      <div className="border p-4 rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-2">
          Extracted Text
        </h2>
        <p className="text-sm whitespace-pre-wrap">
          {resume.extractedText}
        </p>
      </div>
    </div>
  );
}