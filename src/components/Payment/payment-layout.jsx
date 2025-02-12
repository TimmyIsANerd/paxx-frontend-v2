"use client";

import { LockClosedIcon } from "@heroicons/react/24/solid";

export function PaymentLayout({
  children,
  title,
  amount,
  currency,
  paymentType,
  walletAddress,
  img,
  description,
}) {
  return (
    <div className="bg-[#5B21B6] min-h-screen flex flex-col justify-between">
      <div className="flex justify-center items-center px-6 bg-black/80 py-3">
        <img src="/images/logo/paxx-logo.png" className="" alt="" />
      </div>
      <div className="flex p-6 md:flex-row flex-col items-center gap-3 justify-center">
        <div className="max-w-2xl shadow-2xl max-h-full">
          <img
            src={img}
            alt=""
            className="w-auto h-full object-contain md:block hidden"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-black">{description}</p>

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
                {walletAddress
                  ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                  : "..."}
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
      <div className="flex items-center justify-center bg-black/80 py-3">
        <p className="">Powered by Paxx</p>
      </div>
    </div>
  );
}
