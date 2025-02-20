"use client";

import { useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { createStore } from "@/services/store";
import { useAuth } from "@/context/AuthContext";
import MaintenanceMode from "@/components/Modal/MaintenanceMode";

const currencies = ["usdc", "solana"];

export default function NewStorefrontModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    currency: "usdc",
    storeLink: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [showMaintenance, setShowMaintenance] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMaintenance(true);
    return;
    // e.preventDefault();
    // setLoading(true);

    // const payload = {
    //   storeName: formData.name,
    //   defaultCurrency: formData.currency,
    //   storeLink: formData.storeLink,
    // };

    // try {
    //   await createStore(payload, token);
    //   toast("Storefront Created Successfully");
    //   window.location.reload();
    // } catch (error) {
    //   if (error && error.response) {
    //     toast(error.response.data.message);
    //   } else {
    //     toast("Failed to Create Store... Please Try Again Later");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <MaintenanceMode
        isOpen={showMaintenance}
        onClose={() => setShowMaintenance(false)}
      />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="relative w-full max-w-md">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#005BFE]/20 to-[#00A1FE]/20 blur-xl opacity-50 rounded-2xl" />

          <div className="relative bg-[#131B2C] rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                New Storefront
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Store Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="The name of your store"
                  className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005BFE] focus:border-transparent text-white placeholder-gray-500 transition-all"
                  required
                />
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Currency
                </label>
                <div className="relative">
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#005BFE] focus:border-transparent text-white transition-all pr-10"
                    required
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Store Link */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Store Link
                </label>
                <div className="flex items-center">
                  <span className="px-4 py-2.5 bg-[#1F2937] border border-r-0 border-gray-700 rounded-l-lg text-gray-400">
                    store.usepaxx.xyz/
                  </span>
                  <input
                    type="text"
                    value={formData.storeLink}
                    onChange={(e) =>
                      setFormData({ ...formData, storeLink: e.target.value })
                    }
                    className="flex-1 px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#005BFE] focus:border-transparent text-white placeholder-gray-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#005BFE] to-[#00A1FE] text-white rounded-lg font-medium hover:opacity-90 transition-opacity relative group flex justify-center"
                  disabled={loading}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#005BFE]/50 to-[#00A1FE]/50 opacity-0 group-hover:opacity-100 blur-xl rounded-lg transition-opacity" />
                  {loading ? (
                    <Loading />
                  ) : (
                    <span className="relative">Create</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
