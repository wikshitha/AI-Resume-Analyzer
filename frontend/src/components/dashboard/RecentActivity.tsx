import {
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

type Resume = {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatchScore: number;
  createdAt: string;
};

type Props = {
  resumes: Resume[];
};

export default function RecentActivity({
  resumes,
}: Props) {
  const getStatus = (score: number) => {
    if (score >= 90)
      return {
        text: "Excellent",
        color:
          "bg-green-100 text-green-700",
      };

    if (score >= 75)
      return {
        text: "Good",
        color:
          "bg-blue-100 text-blue-700",
      };

    if (score >= 60)
      return {
        text: "Average",
        color:
          "bg-yellow-100 text-yellow-700",
      };

    return {
      text: "Needs Work",
      color:
        "bg-red-100 text-red-700",
    };
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">

      <div className="mb-5 flex items-center gap-2">

        <FaClock />

        <h2 className="text-xl font-semibold">
          Recent AI Activity
        </h2>

      </div>

      {resumes.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No analyses available.
        </div>
      ) : (
        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Resume
              </th>

              <th>ATS</th>

              <th>Match</th>

              <th>Date</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {resumes.map((resume) => {
              const status = getStatus(
                resume.atsScore
              );

              return (
                <tr
                  key={resume.id}
                  className="border-b"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2">

                      <FaCheckCircle className="text-blue-600" />

                      {resume.fileName}

                    </div>
                  </td>

                  <td>
                    {resume.atsScore}%
                  </td>

                  <td>
                    {resume.jobMatchScore}%
                  </td>

                  <td>
                    {new Date(
                      resume.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
                    >
                      {status.text}
                    </span>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>
      )}

    </div>
  );
}