"use client";

import { useState, useRef } from "react";
import { Switch } from "@headlessui/react";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaImage,
} from "react-icons/fa";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useEffect } from "react";
import { storeBaseUrl } from "@/config";
import { toast } from "react-toastify";
import { updateStore } from "@/services/store";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { countries } from "@/config";

const colorOptions = [
  { name: "Teal", value: "#1C4C4E" },
  { name: "Blue", value: "#0066CC" },
  { name: "Orange", value: "#FF9900" },
  { name: "Coral", value: "#FF6B4A" },
  { name: "Pink", value: "#FF6B8B" },
  { name: "Purple", value: "#6B4E9E" },
];

export default function CustomizeTab({ store, reloadStore }) {
  const brandColor = store?.brandColor || "#1C4C4E";
  const [selectedColor, setSelectedColor] = useState(brandColor);
  const [customColor, setCustomColor] = useState(colorOptions[0].value);
  const [editShareableLink, setEditShareableLink] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    whatsApp: store.whatsApp ? store.whatsApp : "",
    phoneNumber: store.phoneNumber ? store.phoneNumber : "",
    emailAddress: store.emailAddress ? store.emailAddress : "",
  });

  const [socialMedia, setSocialMedia] = useState({
    twitter: store.twitter ? store.twitter : "",
    instagram: store.instagram ? store.instagram : "",
    facebook: store.facebook ? store.facebook : "",
  });

  const [storeLink, setShareableLink] = useState(store.storeLink);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedCountryCodeWA, setSelectedCountryCodeWA] = useState(
    countries[0].code
  );
  const [selectedCountryCodePH, setSelectedCountryCodePH] = useState(
    countries[0].code
  );
  const [showWADropdown, setShowWADropdown] = useState(false);
  const [storeStatus, setStoreStatus] = useState(false);
  const { token } = useAuth();
  const [storeLogo, setStoreLogo] = useState("");
  const fileInputRef = useRef(null);
  const [newLogo, setNewLogo] = useState(store.storeLogo ? false : true);
  const [editWelcomeMessage, setEditWelcomeMessage] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(store.welcomeMessage);
  const [editStoreDescription, setEditStoreDescription] = useState(false);
  const [storeDescription, setStoreDescription] = useState(
    store.storeDescription
  );
  const [isEditingSocialMedia, setIsEditingSocialMedia] = useState(false);

  useEffect(() => {
    setSelectedColor(brandColor);
  }, [customColor]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  async function handleContactSubmission(e) {
    try {
      await updateStore(store.id, contactInfo, token);
      toast("Contact Updated Successfully");
      reloadStore();
    } catch (error) {
      toast("Contact Update Failed");
      console.error(error);
    }
  }

  async function handleSetWelcomeMessage(e) {
    e.preventDefault();
    if (!welcomeMessage) {
      toast.error("Please enter a welcome message");
    }

    try {
      await updateStore(store.id, { welcomeMessage }, token);
      toast("Welcome Message Updated Successfully");
      reloadStore();
      setEditWelcomeMessage(false);
    } catch (error) {
      toast("Welcome Message Update Failed");
      console.error(error);
    }
  }

  async function handleSetStoreDescription() {
    if (!storeDescription) {
      toast.error("Please enter a store description");
    }

    try {
      await updateStore(store.id, { storeDescription }, token);
      toast("Store Description Updated Successfully");
      reloadStore();
      setEditStoreDescription(false);
    } catch (error) {
      toast("Store Description Update Failed");
      console.error(error);
    }
    F;
  }

  async function handleStoreStatusChange(checked) {
    try {
      await updateStore(store.id, { status: checked }, token);
      setStoreStatus(checked);
      toast(`Store status updated successfully`);
      reloadStore();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSetStoreLink() {
    if (storeLink === "") {
      const urlRegex = new RegExp(/^(http|https):\/\/[^ "]+$/);
      if (!urlRegex.test(storeLink)) {
        toast.error("Please enter a valid link");
        return;
      }
      return;
    }

    try {
      await updateStore(store.id, { storeLink }, token);
      toast("Store link updated successfully");
      reloadStore();
      setEditShareableLink(false);
    } catch (error) {
      if (error && error.response) {
        if (error.response.status === 409) {
          toast.error("Store link already exists");
        }
      }
      console.error(error);
    }
  }

  function handleStoreLinkCopy(link) {
    navigator.clipboard.writeText(link);
    toast("Copied");
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds max of 2MB", {
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
          setStoreLogo(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleLogoUpload = async () => {
    if (storeLogo === "") {
      toast.error("Please select a logo");
      return;
    }
    try {
      await updateStore(store.id, { storeLogo }, token);
      toast(`Logo updated successfully`);
      reloadStore();
      setNewLogo(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to save social media links
  async function handleSaveSocialMedia() {
    try {
      await updateStore(store.id, { socialMedia }, token);
      toast("Social Media Links Updated Successfully");
      reloadStore();
    } catch (error) {
      toast("Failed to Update Social Media Links");
      console.error(error);
    }
  }

  // Function to toggle edit state
  const toggleEditSocialMedia = () => {
    setIsEditingSocialMedia(!isEditingSocialMedia);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Preview */}
      <div
        style={{ backgroundColor: customColor }}
        className="rounded-xl p-8 relative h-fit"
      >
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
            <div className="flex md:items-center gap-4 md:flex-row flex-col items-start">
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
          <h3 className="text-lg font-medium text-white">Store Logo</h3>
          <div className="w-fit">
            {store.storeLogo && !newLogo && (
              <>
                {" "}
                <img
                  src={store.storeLogo}
                  className="w-[290px] h-full rounded-md"
                />
                <button
                  onClick={() => setNewLogo(true)}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
                >
                  Change Logo
                </button>
              </>
            )}
          </div>
          {newLogo && (
            <>
              <div
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 transition-all hover:border-purple-500 focus-within:border-purple-500 cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="flex flex-col items-center">
                  <FaImage className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-400 text-center mb-2">
                    {storeLogo ? "Logo File Selected" : "Click to Upload Image"}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    This image will be displayed on your store.
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
              <div className="flex gap-x-3">
                <button
                  onClick={handleLogoUpload}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Upload Image
                </button>
                {store.storeLogo && newLogo && (
                  <button
                    className="px-6 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                    onClick={() => setNewLogo(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Status</h3>
          <Switch
            checked={storeStatus}
            onChange={handleStoreStatusChange}
            className="bg-blue-500 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
          </Switch>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Shareable Link</h3>
          <form className="flex items-start gap-4 flex-col">
            {editShareableLink ? (
              <input
                type="text"
                value={storeLink}
                onChange={(e) => setShareableLink(e.target.value)}
                className={`flex-1 px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 w-full`}
              />
            ) : (
              <Link
                href={`${storeBaseUrl}/${store.storeLink}`}
                className="text-blue-500"
              >{`${storeBaseUrl}/${store.storeLink}`}</Link>
            )}
            {editShareableLink ? (
              <div className="space-x-3 flex">
                <button
                  className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  type="button"
                  onClick={handleSetStoreLink}
                >
                  Save
                </button>

                <button
                  className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  onClick={() => setEditShareableLink(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="space-x-3 flex">
                <button
                  className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  onClick={() => {
                    setEditShareableLink(true);
                  }}
                  type="button"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStoreLinkCopy(`${storeBaseUrl}/${store.storeLink}`)
                  }
                  className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Welcome Message</h3>
          <form onSubmit={handleSetWelcomeMessage} className="space-y-2">
            {editWelcomeMessage ? (
              <>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <>
                  <button
                    type="submit"
                    className="px-4 mr-3 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditWelcomeMessage(false)}
                    className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </>
              </>
            ) : (
              <>
                <p className="text-gray-400">{welcomeMessage}</p>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  onClick={() => setEditWelcomeMessage(true)}
                >
                  Edit
                </button>
              </>
            )}
          </form>
        </div>

        <form className="space-y-4">
          <h3 className="text-lg font-medium text-white">
            About your business
          </h3>
          {editStoreDescription ? (
            <>
              <input
                type="text"
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleSetStoreDescription}
                className="px-4 mr-3 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditStoreDescription(false)}
                className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-400">{storeDescription}</p>
              <button
                type="button"
                className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                onClick={() => setEditStoreDescription(true)}
              >
                Edit
              </button>
            </>
          )}
        </form>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Contact</h3>
          <div className="flex flex-col space-y-2">
            <div>
              <label className="text-gray-400">WhatsApp</label>
              <div className="flex items-center">
                <div
                  className="mr-2 px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white group relative"
                  onClick={() => setShowWADropdown(!showWADropdown)}
                >
                  <span>{selectedCountryCodeWA}</span>
                  {showWADropdown && (
                    <div className="absolute top-3 mt-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white max-h-[150px] overflow-auto">
                      {countries.map((country, index) => {
                        return (
                          <div
                            onClick={() =>
                              setSelectedCountryCodeWA(country.code)
                            }
                            key={index}
                            className="px-4 py-2 hover:bg-gray-700"
                          >
                            {country.code}/{country.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="WhatsApp number"
                  value={contactInfo.whatsApp}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      whatsApp: `${selectedCountryCodeWA}${e.target.value}`,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400">Phone Number</label>
              <div className="flex items-center">
                <select className="mr-2 px-2 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white">
                  <option value="+234">+234</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400">Email</label>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                Save
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Social Media</h3>
          {isEditingSocialMedia ? (
            <form className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-400">Instagram</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={socialMedia.instagram}
                    onChange={(e) =>
                      setSocialMedia({
                        ...socialMedia,
                        instagram: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="instagram.com/username"
                  />
                  <button
                    type="button"
                    className="text-blue-500 ml-2"
                    onClick={() => handleDelete("instagram")}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-400">Facebook</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={socialMedia.facebook}
                    onChange={(e) =>
                      setSocialMedia({
                        ...socialMedia,
                        facebook: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="facebook.com/username"
                  />
                  <button
                    type="button"
                    className="text-blue-500 ml-2"
                    onClick={() => handleDelete("facebook")}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-400">Twitter</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={socialMedia.twitter}
                    onChange={(e) =>
                      setSocialMedia({
                        ...socialMedia,
                        twitter: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="twitter.com/username"
                  />
                  <button
                    type="button"
                    className="text-blue-500 ml-2"
                    onClick={() => handleDelete("twitter")}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSocialMedia}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={toggleEditSocialMedia}
                  className="ml-2 px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Twitter:</span>
                <span className="text-white">{socialMedia.twitter}</span>
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={toggleEditSocialMedia}
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Instagram:</span>
                <span className="text-white">{socialMedia.instagram}</span>
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={toggleEditSocialMedia}
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Facebook:</span>
                <span className="text-white">{socialMedia.facebook}</span>
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={toggleEditSocialMedia}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
