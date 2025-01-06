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
    try {
      await onUpdate(formData);
      toast.success("Successfully updated payment link");
      onClose();
    } catch (error) {
      toast.error("Failed to update payment link");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#131B2C] rounded-lg shadow-lg p-5 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">
          Update Payment Link
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Custom Link
            </label>
            <input
              type="text"
              value={formData.customLink}
              onChange={(e) =>
                setFormData({ ...formData, customLink: e.target.value })
              }
              className="w-full bg-[#0B0F1C] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter custom link"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Redirect After Payment
            </label>
            <input
              type="text"
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
