"use client";

import { useState, useRef } from "react";
import {
  BanknotesIcon,
  ArrowPathIcon,
  GiftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createLink } from "@/services/links";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const paymentTypes = [
  {
    id: "one-time",
    title: "One-Time Payment",
    description:
      "Create a payment link to receive one-time payments from your customers, with the flexibility to choose your preferred cryptocurrency.",
    icon: BanknotesIcon,
  },
  {
    id: "subscription",
    title: "Subscription",
    description:
      "For recurring payments or subscription plans, generate a custom link tailored to your needs, allowing payments in your selected crypto.",
    icon: ArrowPathIcon,
  },
  {
    id: "donation",
    title: "Donation",
    description:
      "Easily receive one-time donations for charitable causes or group goals through donation links, all in cryptocurrency.",
    icon: GiftIcon,
  },
];

export default function PaymentForm() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    pageName: "",
    priceType: "fixed",
    currency: "usdc",
    amount: 0,
    minAmount: 0,
    maxAmount: 0,
    description: "",
    image: null,
  });
  const fileInputRef = useRef(null);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleTypeSelect = (type) => {
    if (type === "Subscription") {
      toast.info("Feature in Development", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setSelectedType(type);
    if (type !== "Donation") {
      setFormData((prev) => ({
        ...prev,
        priceType: "fixed",
        amount: "",
        minAmount: 0,
        maxAmount: 0,
      }));
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      linkType: selectedType,
      amount:
        formData.priceType === "fixed" ? formData.amount : formData.minAmount,
    };

    try {
      await createLink(payload, token);
      toast.success("Successfully created payment link");
      push("/dashboard/payments");
    } catch (error) {
      if (error?.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Issues! Please Try Again Later");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePriceTypeChange = (type) => {
    setFormData({
      ...formData,
      priceType: type,
      amount: "",
      minAmount: 0,
      maxAmount: 0,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds max of 3MB", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        e.target.value = null;
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="w-full py-6 overflow-y-scroll max-h-screen">
      <div className="max-w-4xl mx-auto">
        {step === 1 ? (
          <div className="space-y-6 p-5">
            <h1 className="text-2xl font-bold text-white text-center mb-8">
              Select a payment link type to continue
            </h1>
            <div className="grid md:grid-cols-3 gap-6">
              {paymentTypes.map((type) => (
                <div
                  key={type.id}
                  className={`bg-[#131B2C] rounded-lg p-6 cursor-pointer transition-all ${
                    selectedType === type.title
                      ? "ring-2 ring-purple-500"
                      : "hover:bg-[#1a2235]"
                  }`}
                  onClick={() => handleTypeSelect(type.title)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                    <button
                      className={`w-full py-2 px-4 rounded-md transition-colors ${
                        selectedType === type.title
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {selectedType === type.title ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNext}
                disabled={!selectedType}
                className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              >
                Create Payment Link
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#131B2C] rounded-lg shadow-lg p-5 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                Create a {selectedType} Payment Link
              </h2>
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close form"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label
                  htmlFor="pageName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Page Name
                </label>
                <input
                  id="pageName"
                  type="text"
                  value={formData.pageName}
                  onChange={(e) =>
                    setFormData({ ...formData, pageName: e.target.value })
                  }
                  required
                  className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter page name"
                />
              </div>
              <div className="space-y-4">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-300"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="usdc">USDC</option>
                  <option value="solana">SOL</option>
                </select>
              </div>
              {selectedType === "Donation" && (
                <>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Price Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => handlePriceTypeChange("fixed")}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                          formData.priceType === "fixed"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        Fixed Price
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePriceTypeChange("custom")}
                        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                          formData.priceType === "custom"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        Custom Amount
                      </button>
                    </div>
                  </div>
                  {formData.priceType === "fixed" ? (
                    <div className="space-y-4">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Amount
                      </label>
                      <input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        required
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="minAmount"
                          className="block text-sm font-medium text-gray-300"
                        >
                          Minimum Amount
                        </label>
                        <input
                          id="minAmount"
                          type="number"
                          value={formData.minAmount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              minAmount: Number(e.target.value),
                            })
                          }
                          required
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="maxAmount"
                          className="block text-sm font-medium text-gray-300"
                        >
                          Maximum Amount (optional)
                        </label>
                        <input
                          id="maxAmount"
                          type="number"
                          value={formData.maxAmount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxAmount: Number(e.target.value),
                            })
                          }
                          placeholder="0.00"
                          className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              {selectedType !== "Donation" && (
                <div className="space-y-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Amount  
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
              )}
              <div className="space-y-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Enter description"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  Image
                </label>
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 transition-all hover:border-purple-500 focus-within:border-purple-500 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="flex flex-col items-center">
                    <FaImage className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-400 text-center mb-2">
                      {formData.image
                        ? "Image Uploaded"
                        : "Click to Upload Image"}
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      This image will be displayed on the social platforms where
                      this link is shared.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex justify-center"
                >
                  {loading ? <Loading /> : " Create Link"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
