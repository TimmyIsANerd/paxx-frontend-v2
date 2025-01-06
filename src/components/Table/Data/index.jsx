import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

export default function DataTable({ links, handleDelete }) {
  const { push } = useRouter();
  return (
    <div className="w-full bg-[#0B0F1C] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-xs uppercase bg-[#131B2C] border-b border-gray-700">
            <tr>
              <th className="px-4 py-3">Page name</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Link type</th>
              <th className="px-4 py-3">Currency</th>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Date created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((row, index) => (
              <tr
                key={row.id}
                className="border-b border-gray-700 hover:bg-[#131B2C] transition-colors"
              >
                <td className="px-4 py-3 font-medium">{row.pageName}</td>
                <td className="px-4 py-3">{row.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      row.linkType === "One-Time Payment"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {row.linkType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-center uppercase">{row.currency}</span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/${
                      row.linkType === "One-Time Payment"
                        ? "one-time"
                        : "donation"
                    }/preview/${row.customLink ? row.customLink : row.id}`}
                    className="px-3 py-1 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700 transition-colors"
                    target="_blank"
                  >
                    Preview page
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {format(new Date(row.createdAt), "MM/dd/yyyy")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:text-purple-500 transition-colors">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:text-red-500 transition-colors"
                      onClick={() => handleDelete(row.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
