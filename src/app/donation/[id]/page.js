"use client";

import { useState } from "react";
import { PaymentLayout } from "@/components/Payment/payment-layout";

const predefinedAmounts = ["5.00", "10.00", "25.00", "50.00"];

export default function DonationPaymentPage() {
  const [amount, setAmount] = useState("10.00");
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
    }
  };

  return (
    <PaymentLayout
      title="Support Our Project"
      amount={isCustom ? customAmount || "0.00" : amount}
      currency="USDC"
      paymentType="Donation"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {predefinedAmounts.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setAmount(preset);
                setIsCustom(false);
              }}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                amount === preset && !isCustom
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Custom amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            onFocus={() => setIsCustom(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
        </div>

        <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Donate Now
        </button>
      </div>
    </PaymentLayout>
  );
}
