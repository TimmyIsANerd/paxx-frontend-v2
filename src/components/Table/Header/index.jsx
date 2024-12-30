import Link from "next/link";

export default function TableHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-white">Payment Links</h2>
      <div className="flex items-center gap-4">
        <select className="bg-[#131B2C] text-gray-200 text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-purple-500">
          <option>Jan 2024</option>
          <option>Feb 2024</option>
          <option>Mar 2024</option>
        </select>
        <Link
          href="/dashboard/payments/create"
          className="bg-gradient-to-br from-[#005BFE] to-[#00A1FE] text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Create Payment Link
        </Link>
      </div>
    </div>
  );
}
