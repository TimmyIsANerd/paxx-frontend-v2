"use client";

import { useEffect, useState } from "react";
import {
  FolderIcon,
  DocumentTextIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import BalanceOverview from "../BalanceOverview";
import { useRouter } from "next/navigation";
import { Switch } from "@headlessui/react";
import TestModeModal from "@/components/Modal/TestMode";
import MaintenanceMode from "@/components/Modal/MaintenanceMode";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { getProfile, switchMode } from "@/services/profile";
import { toast } from "react-toastify";

const features = [
  {
    icon: FolderIcon,
    title: "Receive Payment",
    description:
      "Receive payment from your customers using our links, no code required",
    buttonText: "Create Payment Link",
    primary: true,
    url: "/dashboard/payments/create",
  },
  {
    icon: DocumentTextIcon,
    title: "Create & Send Invoices",
    description: "Create and send invoices to your customers with ease",
    buttonText: "Create Invoices",
    url: "/dashboard/invoices/create",
  },
  {
    icon: ChartBarIcon,
    title: "Start Selling Online",
    description:
      "Create a free online store, Accept payments in SOL & other SPL Compatible Tokens",
    buttonText: "Create Store",
    url: "/dashboard/store/create",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Paxx POS",
    description:
      "Collect Crypto Payments in-person, Start Selling in Person at your preferred Locations",
    buttonText: "Get Started",
    url: "",
  },
];

export default function OnboardingSection({ firstName }) {
  const [showOptions, setShowOptions] = useState(true);
  const { push } = useRouter();
  const { user, token, updateProfile } = useAuth();
  const { getLatestBalance } = useWallet();
  const [isLive, setIsLive] = useState(false);

  const [testMode, setTestMode] = useState(false);
  // const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);

  async function getCurrentProfile() {
    const response = await getProfile(token);
    const { data } = response;
    if (data.userMode === "live") {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  }

  useEffect(() => {
    getCurrentProfile();
  }, []);

  async function handleStatusChange() {
    try {
      await switchMode(token, !isLive);
      setIsLive(!isLive);
      toast.success(`System in ${isLive ? "Test Mode" : "Live Mode"}`);
      await getCurrentProfile();
      await getLatestBalance();
    } catch (error) {
      toast.error(error.response.message);
    }
  }

  return (
    <>
      <TestModeModal isOpen={testMode} onClose={() => setTestMode(false)} />
      {/* <MaintenanceMode
        isOpen={showDevelopmentModal}
        onClose={() => setShowDevelopmentModal(false)}
      /> */}
      <div className="relative w-full max-w-full mx-auto p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:cursor-pointer">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-3">
            <h3 className="font-bold text-4xl">Welcome Back, {firstName}</h3>
            <p className="text-xl text-[#AEB9E1] font-normal opacity-90">
              Let's Get You Started...
            </p>
          </div>
        </div>

        {showOptions && (
          <div
            className="absolute top-5 right-5"
            onClick={() => setShowOptions(!showOptions)}
          >
            <XMarkIcon className="w-5 h-5" />
          </div>
        )}

        <div className="flex items-center mb-4 justify-end">
          <span className="mr-2 text-lg">
            {isLive ? "Live Mode" : "Test Mode"}
          </span>
          <Switch
            checked={isLive}
            onChange={handleStatusChange}
            className={`${
              isLive ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                isLive ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        </div>

        {showOptions && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white dark:bg-[#131B2C] rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>

                  {feature.primary && feature.url ? (
                    <button
                      onClick={() => push(feature.url)}
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white `}
                    >
                      {feature.buttonText}
                    </button>
                  ) : (
                    <button
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                        feature.primary
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {feature.buttonText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <BalanceOverview />
      </div>
    </>
  );
}
