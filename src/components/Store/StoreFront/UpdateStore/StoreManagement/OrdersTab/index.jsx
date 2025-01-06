"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function OrdersTab({ store }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {/* <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-400 bg-[#131B2C] rounded-lg border border-gray-800 hover:text-gray-300 transition-colors">
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div> */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search order ID or customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-[#131B2C] border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
          className="px-4 py-2 text-gray-400 bg-[#131B2C] rounded-lg border border-gray-800 hover:text-gray-300 transition-colors"
          onClick={() => toast("Feature in development")}
        >
          Export
        </button>
      </div>

      {/* Orders Table */}
      {store?.orders?.length > 0 ? (
        <div className="bg-[#131B2C] rounded-lg border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{order.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{order.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center">
          <h3 className="text-xl font-semibold text-white">No Orders</h3>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#131B2C] rounded-lg border border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Orders</h3>
          <p className="text-2xl font-semibold text-white">
            {store?.orders?.length}
          </p>
        </div>
        <div className="bg-[#131B2C] rounded-lg border border-gray-800 p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Revenue</h3>
          <p className="text-2xl font-semibold text-white">
            {store?.defaultCurrency?.toUpperCase()} {store?.revenue}
          </p>
        </div>
      </div>
    </div>
  );
}
