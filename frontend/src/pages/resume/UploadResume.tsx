import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import api from "@/services/api";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", file);

      await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume uploaded successfully!");
      setFile(null);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Upload Resume
        </h1>

        <p className="text-gray-500">
          Upload your latest resume in PDF format.
        </p>
      </div>

      <div className="border-2 border-dashed rounded-lg p-10 text-center">
       <label
  htmlFor="resume"
  className="cursor-pointer block p-10 border-2 border-dashed rounded-lg hover:bg-gray-50"
>
  {file
    ? file.name
    : "Click to choose a PDF resume"}
</label>

<input
  id="resume"
  type="file"
  accept=".pdf"
  hidden
  onChange={handleFileChange}
/>

        {file && (
          <p className="mt-4 text-sm">
            Selected: <strong>{file.name}</strong>
          </p>
        )}
      </div>

      <Button
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </Button>
    </div>
  );
}