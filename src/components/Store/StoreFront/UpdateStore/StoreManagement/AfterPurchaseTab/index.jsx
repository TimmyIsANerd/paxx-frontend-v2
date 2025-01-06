"use client";

import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function AfterPurchaseTab({ store }) {
  const [editable, setEditable] = useState(false);

  return (
    <div className="max-w-3xl space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            Redirect after payment
            <InformationCircleIcon className="w-5 h-5 text-gray-400" />
          </h3>
          <input
            type="url"
            value="https://zorinaethar.xyz"
            className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            Success message
            <InformationCircleIcon className="w-5 h-5 text-gray-400" />
          </h3>
          <input
            type="text"
            value="Thank you for the Purchase"
            className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
}
