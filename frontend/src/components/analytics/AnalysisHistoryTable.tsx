import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

type Analysis = {
  id: string;
  fileName: string;
  atsScore: number;
  jobMatchScore: number;
  createdAt: string;
};

type Props = {
  history: Analysis[];
};

export default function AnalysisHistoryTable({
  history,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Resume
            </th>

            <th>ATS</th>

            <th>Job Match</th>

            <th>Date</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {history.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="p-10 text-center text-gray-500"
              >
                No AI analyses found.
              </td>

            </tr>

          ) : (

            history.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4">
                  {item.fileName}
                </td>

                <td className="text-center">
                  {item.atsScore}%
                </td>

                <td className="text-center">
                  {item.jobMatchScore}%
                </td>

                <td className="text-center">
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="text-center">

                  <button
                    onClick={() =>
                      navigate(`/analysis/${item.id}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}