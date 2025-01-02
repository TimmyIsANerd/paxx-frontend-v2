import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SendModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDC");
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#131B2C] rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Send Crypto</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2A3C] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min={0}
              step={0.01}
            />
          </div>
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2A3C] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USDC">USDC</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Recipient Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2A3C] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter wallet address"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
