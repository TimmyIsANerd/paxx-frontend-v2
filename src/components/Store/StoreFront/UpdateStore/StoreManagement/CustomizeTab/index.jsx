"use client";

import { Switch } from "@headlessui/react";
import { PaintBrushIcon } from "@heroicons/react/24/outline";

export default function CustomizeTab() {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Preview */}
      <div className="bg-[#006D97] rounded-xl p-8 relative">
        <button className="absolute top-4 left-4 px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
          <PaintBrushIcon className="w-4 h-4 inline-block mr-2" />
          Change color
        </button>
        <div className="text-center text-white mt-16 space-y-2">
          <h2 className="text-2xl font-semibold">Test</h2>
          <p>Welcome to Pax Store Front</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square bg-white/10 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Status</h3>
          <Switch
            checked={true}
            onChange={() => {}}
            className="bg-emerald-500 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
          </Switch>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Shareable Link</h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value="paystack.shop/usepaxxtest"
              readOnly
              className="flex-1 px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400"
            />
            <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Welcome Message</h3>
          <div className="space-y-2">
            <input
              type="text"
              value="Welcome to Pax Store Front"
              className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              Edit
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">
            About your business
          </h3>
          <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
