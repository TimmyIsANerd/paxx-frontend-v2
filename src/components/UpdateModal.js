"use client";

import { useState, useRef } from "react";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

export default function UpdateModal({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}) {
  const [formData, setFormData] = useState(initialData);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation for minAmount and maxAmount
    if (formData.minAmount > formData.maxAmount) {
      toast.error("Minimum amount cannot be greater than maximum amount", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      return; // Exit the function if validation fails
    }

    try {
      await onUpdate(formData);
      toast.success("Successfully updated payment link");
      onClose();
    } catch (error) {
      if (error && error.response) {
        toast(error.response.data.message);
      } else {
        toast.error("Failed to update payment link");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePriceTypeChange = (type) => {
    setFormData({
      ...formData,
      priceType: type,
      amount: 0,
      minAmount: 0,
      maxAmount: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 max-h-screen overflow-y-auto p-3">
      <div className="bg-[#131B2C] rounded-lg shadow-lg p-5 max-w-4xl mx-auto min-h-full absolute top-0 my-5">
        <h2 className="text-2xl font-bold text-white mb-4">
          Update Payment Link
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Page Name
            </label>
            <input
              type="text"
              value={formData.pageName}
              onChange={(e) =>
                setFormData({ ...formData, pageName: e.target.value })
              }
              required
              className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter page name"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="usdc">USDC</option>
              <option value="solana">SOL</option>
            </select>
          </div>
          {formData.linkType !== "Donation" && (
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
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          )}
          {formData.linkType === "Donation" && (
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
                      setFormData({
                        ...formData,
                        amount: Number(e.target.value),
                      })
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
          <div className="space-y-4">
            <label
              htmlFor="customLink"
              className="block text-sm font-medium text-gray-300"
            >
              Custom Link
            </label>
            <div className="flex items-center bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500">
              <span className="text-gray-300 mr-2">
                https://app.usepaxx.xyz/
              </span>
              <input
                id="customLink"
                type="text"
                value={formData.customLink}
                onChange={(e) =>
                  setFormData({ ...formData, customLink: e.target.value })
                }
                className="w-full bg-transparent border-none rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the custom link"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Redirect After Payment
            </label>
            <input
              type="url"
              value={formData.redirectAfterPayment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  redirectAfterPayment: e.target.value,
                })
              }
              className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter redirect URL"
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
                  {formData.image ? "Image Uploaded" : "Click to Upload Image"}
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
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex justify-center"
            >
              {loading ? <Loading /> : "Update Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
