"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { HexColorPicker, HexColorInput } from "react-colorful";

const colorOptions = [
  { name: "Teal", value: "#1C4C4E" },
  { name: "Blue", value: "#0066CC" },
  { name: "Orange", value: "#FF9900" },
  { name: "Coral", value: "#FF6B4A" },
  { name: "Pink", value: "#FF6B8B" },
  { name: "Purple", value: "#6B4E9E" },
];

export default function CustomizeTab({ store }) {
  const brandColor = store?.brandColor || "#006D97";
  const [selectedColor, setSelectedColor] = useState(brandColor);
  const [customColor, setCustomColor] = useState("#786B9C");
  const [editShareableLink, setEditShareableLink] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    whatsapp: "7059381812",
    phone: "9164183371",
    email: "adefeyitimi@gmail.com",
  });
  const [socialMedia, setSocialMedia] = useState({
    twitter: "@lordaethar",
    instagram: "@lordaethar",
    facebook: "timmyzorin",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+234");

  const handleContactChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setSocialMedia((prev) => ({ ...prev, [platform]: value }));
  };

  const handleDelete = (field) => {
    if (field in contactInfo) {
      handleContactChange(field, "");
    } else {
      handleSocialMediaChange(field, "");
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Preview */}
      <div className={`bg-[${selectedColor}] rounded-xl p-8 relative`}>
        <button className="absolute top-4 left-4 px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
          <PaintBrushIcon className="w-4 h-4 inline-block mr-2" />
          Change color
        </button>
        <div className="text-center text-white mt-16 space-y-2">
          <h2 className="text-2xl font-semibold">Test</h2>
          <p>Welcome to Pax Store Front</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square bg-white/10 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-8">
        {/* Color Selector */}
        <div className="bg-white dark:bg-[#131B2C] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Brand Colors
          </h3>
          <div className="relative">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Change color
              </button>
              <div className="flex items-center gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.value === color.value
                        ? "border-blue-500 scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    aria-label="Add custom color"
                  >
                    <PlusIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </button>

                  {showColorPicker && (
                    <div className="absolute z-10 top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                      <HexColorPicker
                        color={customColor}
                        onChange={setCustomColor}
                        className="mb-3"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Hex
                        </span>
                        <HexColorInput
                          color={customColor}
                          onChange={setCustomColor}
                          prefixed
                          className="w-24 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Status</h3>
          <Switch
            checked={true}
            onChange={() => {}}
            className="bg-blue-500 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
          </Switch>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Shareable Link</h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value="https://store.usepaxx.xyz/usepaxxtest"
              readOnly
              className="flex-1 px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400"
            />
            <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Welcome Message</h3>
          <div className="space-y-2">
            <input
              type="text"
              value="Welcome to Pax Store Front"
              className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
              Edit
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">
            About your business
          </h3>
          <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
