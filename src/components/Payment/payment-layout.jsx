"use client";

import { LockClosedIcon } from "@heroicons/react/24/solid";

export function PaymentLayout({
  children,
  title,
  amount,
  currency,
  paymentType,
  walletAddress = "5g6N...MxUF",
}) {
  return (
    <div className="min-h-screen bg-[#5B21B6] p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>

        <div className="mt-8 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">{amount}</span>
            <span className="text-2xl font-semibold text-gray-900">
              {currency}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Your Wallet:</div>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              {walletAddress}
            </div>
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {paymentType}
            </div>
          </div>

          {children}

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <LockClosedIcon className="w-4 h-4" />
            <span>Payment processed securely</span>
          </div>
        </div>
      </div>
    </div>
  );
}
