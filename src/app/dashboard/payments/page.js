"use client"
import { useEffect } from "react";
import TableHeader from "@/components/Table/Header";
import DataTable from "@/components/Table/Data";

export default function PaymentsPage() {
  useEffect(() => {
    document.title = "Paxx Payments | Payment Links";
  }, []);

  return (
    <div className="w-full my-3 p-3">
      <TableHeader />
      <DataTable />
    </div>
  );
}
