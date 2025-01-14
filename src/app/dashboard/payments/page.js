"use client";
import { useEffect, useState } from "react";
import TableHeader from "@/components/Table/Header";
import DataTable from "@/components/Table/Data";
import { getAllLinks, deleteLink } from "@/services/links";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export default function PaymentsPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    document.title = "Paxx Payments | Payment Links";
    loadLinks();
  }, [token]);

  async function loadLinks() {
    setLoading(true);
    try {
      const data = await getAllLinks(token);
      setLinks(data);
      console.log(data);
    } catch (error) {
      if (error && error.response) {
        toast(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteLink(id, token);

      toast("Successfully deleted");
      loadLinks();
    } catch (error) {
      if (error && error.response) {
        toast(error.response.data.message);
      } else {
        toast("Server Error... Please Try Again Later");
      }
    }
  }

  return (
    <div className="w-full my-3 p-3">
      <TableHeader />
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <DataTable links={links} handleDelete={handleDelete} loadLinks={loadLinks} />
      )}
    </div>
  );
}
