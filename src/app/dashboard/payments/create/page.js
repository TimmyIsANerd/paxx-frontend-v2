"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import QRCode from "react-qr-code";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from 'next/link';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DAS_API_URL || 'https://paxx-das.onrender.com',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

api.interceptors.request.use(
  (config) => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      response: error.response,
      request: error.request,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// Validation helpers
const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
const isValidBase58 = (str) => base58Regex.test(str);

const isValidKeypairString = (str) => {
  try {
    const keypairArray = JSON.parse(str);
    return Array.isArray(keypairArray) && 
           keypairArray.length === 64 && 
           keypairArray.every(num => typeof num === 'number' && num >= 0 && num <= 255);
  } catch {
    return false;
  }
};

function PaymentSuccessModal({ isOpen, onClose, paymentLink }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !paymentLink) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink.url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#131B2C] rounded-lg p-4 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Payment Link Created!</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0B0F1C] rounded-lg p-3">
            <p className="text-xs text-gray-400">Payment Link</p>
            <div className="flex items-center justify-between">
              <p className="text-white text-sm truncate">{paymentLink.url}</p>
              <button
                onClick={handleCopy}
                className="ml-2 px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex justify-center bg-white p-3 rounded-lg">
            <QRCode
              value={paymentLink.url}
              size={150}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox="0 0 256 256"
            />
          </div>

          <div className="bg-[#0B0F1C] rounded-lg p-3">
            <p className="text-xs text-gray-400">Transaction Signature</p>
            <p className="text-white text-xs break-all">{paymentLink.signature}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [formData, setFormData] = useState({
    walletAddress: "",
    walletKeypair: "",
    options: {
      amount: "",
      network: "devnet"
    }
  });

  const validateForm = () => {
    if (!isValidBase58(formData.walletAddress)) {
      throw new Error("Invalid wallet address format");
    }

    if (!isValidKeypairString(formData.walletKeypair)) {
      throw new Error("Invalid keypair format. Must be a valid array of 64 numbers");
    }

    if (isNaN(Number(formData.options.amount)) || Number(formData.options.amount) <= 0) {
      throw new Error("Amount must be a positive number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      validateForm();

      // Prepare the payload exactly as in a successful Insomnia request
      const payload = {
        walletAddress: formData.walletAddress,
        walletKeypair: formData.walletKeypair, 
        options: {
          amount: Number(formData.options.amount),
          network: formData.options.network
        }
      };

      // Make the API request
      const { data } = await api.post("/das/create/tiplink", payload);

      const linkWithTimestamp = {
        ...data,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const savedLinks = JSON.parse(localStorage.getItem("paymentLinks") || "[]");
      localStorage.setItem(
        "paymentLinks",
        JSON.stringify([linkWithTimestamp, ...savedLinks])
      );

      setCreatedLink(data);
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        walletAddress: "",
        walletKeypair: "",
        options: {
          amount: "",
          network: "devnet"
        }
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create payment link";
      toast.error(errorMessage);
      console.error("Error creating payment link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#131B2C] rounded-lg p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Create Payment Link
            </h2>
            <Link
              href="/dashboard/payments/history"
              className="px-4 py-2 bg-[#1F2937] text-white text-sm rounded-md hover:bg-[#374151] transition-colors flex items-center gap-2"
            >
              View History
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Wallet Address
              </label>
              <input
                type="text"
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your Solana wallet address"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Wallet Keypair
              </label>
              <textarea
                value={formData.walletKeypair}
                onChange={(e) => setFormData({ ...formData, walletKeypair: e.target.value })}
                className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                placeholder="Enter your wallet keypair array (e.g., [183,215,75,...])"
                required
              />
              <p className="text-xs text-gray-400">
                Enter the keypair as an array of 64 numbers, exactly as shown in the example
              </p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Amount
              </label>
              <input
                type="number"
                step="any"
                value={formData.options.amount}
                onChange={(e) => setFormData({
                  ...formData,
                  options: { ...formData.options, amount: e.target.value }
                })}
                className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Network
              </label>
              <select
                value={formData.options.network}
                onChange={(e) => setFormData({
                  ...formData,
                  options: { ...formData.options, network: e.target.value }
                })}
                className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="devnet">Devnet</option>
                <option value="mainnet">Mainnet</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Payment Link"}
            </button>
          </form>
        </div>
      </div>

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        paymentLink={createdLink}
      />
    </div>
  );
}