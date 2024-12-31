"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const stores = [
  {
    id: 1,
    name: "Test",
    orders: 1,
    revenue: "USD 5,000.00",
    status: true,
  },
];

export default function StoreTable() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleToggleStatus = (id) => {
    console.log("Toggle status for store:", id);
  };

  return (
    <div className="w-full bg-white dark:bg-[#131B2C] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden relative">
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Orders
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Revenue
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Link
              </th>
              <th className="w-px"></th>
            </tr>
          </thead>
          <tbody className="relative">
            {stores.map((store) => (
              <tr
                key={store.id}
                className="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {store.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {store.orders}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {store.revenue}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Switch
                    checked={store.status}
                    onChange={() => handleToggleStatus(store.id)}
                    className={`${
                      store.status
                        ? "bg-blue-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        store.status ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Preview
                  </a>
                </td>
                <td className="px-6 py-4 relative">
                  <button
                    onClick={() => toggleDropdown(store.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                  </button>

                  {activeDropdown === store.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1F2937] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Edit Store
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        View Analytics
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Delete Store
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
