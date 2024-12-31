"use client";

import { useState } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function StoreHeader({ openStore }) {
  const [searchQuery, setSearchQuery] = useState("");
  //   const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 w-full my-3 justify-between">
      {/* Search Input */}
      <div className="flex-1 relative group max-w-lg w-full">
        <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 rounded-lg blur-xl transition-opacity" />
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 bg-white dark:bg-[#131B2C] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* New Storefront Button */}
      <button
        onClick={openStore}
        className="bg-gradient-to-br from-[#005BFE] to-[#00A1FE] text-white px-4 py-2 rounded-lg text-sm transition-colors"
      >
        New Storefront
      </button>
    </div>
  );
}
