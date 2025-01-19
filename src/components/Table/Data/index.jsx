import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import UpdateModal from "@/components/UpdateModal";
import { useAuth } from "@/context/AuthContext";
import { getLink, updateLink } from "@/services/links";
import { MdContentCopy } from "react-icons/md";
import { baseUrl } from "@/config";
import { toast } from "react-toastify";

export default function DataTable({ links, handleDelete, loadLinks }) {
  const { push } = useRouter();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const loadLinkById = async (id) => {
    setLoading(true);
    try {
      const response = await getLink(id, token);
      setSelectedLink(response);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (link) => {
    await loadLinkById(link.id);
    setUpdateModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    console.log(updatedData);
    try {
      await updateLink(updatedData.id, updatedData, token);
      loadLinks();
      setUpdateModalOpen(false);
    } finally {
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast("Link copied");
  };

  return (
    <>
      {!loading && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          initialData={selectedLink}
          onUpdate={handleUpdate}
        />
      )}

      <div className="w-full bg-[#0B0F1C] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-200">
            <thead className="text-xs uppercase bg-[#131B2C] border-b border-gray-700">
              <tr>
                <th className="px-4 py-3">Page name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="md:px-4 px-16 py-3">Link type</th>
                <th className="px-4 py-3">Currency</th>
                <th className="md:px-4 px-10 py-3">Preview</th>
                <th className="px-4 py-3">Date created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-700 hover:bg-[#131B2C] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{row.pageName}</td>
                  <td className="px-4 py-3">{row.amount}</td>
                  <td className="px-4 py-3 ">
                    <span
                      className={`px-2 py-1 rounded-full w-full text-xs ${
                        row.linkType === "One-Time Payment"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {row.linkType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-center uppercase">
                      {row.currency}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/${
                        row.linkType === "One-Time Payment"
                          ? "one-time"
                          : "donation"
                      }/preview/${row.customLink ? row.customLink : row.id}`}
                      className="px-3 w-full py-1 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700 transition-colors"
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
                      <button
                        className="p-1 hover:text-purple-500 transition-colors"
                        onClick={() => handleEditClick(row)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 hover:text-red-500 transition-colors"
                        onClick={() => handleDelete(row.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 hover:text-blue-500 transition-colors"
                        onClick={() =>
                          handleCopy(
                            `${baseUrl}/link/${
                              row.customLink ? row.customLink : row.id
                            }`
                          )
                        }
                      >
                        <MdContentCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
