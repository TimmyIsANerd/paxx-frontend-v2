"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const currencies = ["usdc", "solana"];

const quantityOptions = ["Unlimited", "Limited"];

export default function NewProductModal({ onClose, currency, processForm }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    currency: currency,
    quantity: 0,
    isPhysicalProduct: false,
    unlimited: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for unlimited select
    if (name === "unlimited") {
      setFormData((prev) => ({
        ...prev,
        unlimited: value === "unlimited",
        // Reset quantity to 0 when switching to unlimited
        quantity: value === "unlimited" ? 0 : prev.quantity,
      }));
      return;
    }

    // Default handling for other inputs
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processForm(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#131B2C] w-full max-w-xl rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            New Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="The name of your product"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Increase sales with a vivid product description that gives customers a reason to buy"
              rows={4}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Price
            </label>
            <div className="flex gap-3">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Quantity
            </label>
            <div className="space-y-3">
              <select
                id="unlimited"
                name="unlimited"
                value={formData.unlimited ? "unlimited" : "limited"}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {quantityOptions.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>

              {!formData.unlimited && (
                <div className="space-y-2">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Available quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter available quantity"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Physical Product Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              This product contains one or more physical goods
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isPhysicalProduct"
                checked={formData.isPhysicalProduct}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#005BFE] to-[#00A1FE] text-white rounded-lg font-medium hover:opacity-90 transition-opacity relative group flex justify-center"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#005BFE]/50 to-[#00A1FE]/50 opacity-0 group-hover:opacity-100 blur-xl rounded-lg transition-opacity" />
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
