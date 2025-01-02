"use client";

import {
  InformationCircleIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function DeliveryTab() {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-[#131B2C] rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-6">Delivery Fields</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-200">Delivery Address</span>
            </div>
            <div className="px-3 py-1 bg-gray-700/50 rounded text-sm text-gray-300">
              Required
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PencilIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-200">Delivery Note</span>
            </div>
            <div className="px-3 py-1 bg-gray-700/50 rounded text-sm text-gray-300">
              Optional
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
        <InformationCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-500">
          Important: Please specify the regions to which you physically deliver
          orders.
        </p>
      </div>

      <div className="bg-[#131B2C] rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Delivery Fees</h3>
        <p className="text-sm text-gray-400 mb-6">
          Set up custom delivery fees for each location you deliver to.
        </p>
        <button className="text-blue-500 hover:text-blue-400 transition-colors text-sm">
          + Add delivery fee
        </button>
      </div>
    </div>
  );
}
