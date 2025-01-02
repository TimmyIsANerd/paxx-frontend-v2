"use client";

import { useState } from "react";
import { UserIcon, KeyIcon, TrashIcon } from "@heroicons/react/24/outline";
import ProfileForm from "./forms/profile-form.jsx";
import PasswordForm from "./forms/password-form";
import DeleteAccountForm from "./forms/delete-account-form";

const tabs = [
  { id: "profile", label: "Profile Information", icon: UserIcon },
  { id: "password", label: "Change Password", icon: KeyIcon },
  { id: "delete", label: "Delete Account", icon: TrashIcon },
];

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-900 p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 blur-3xl" />

              {/* Content */}
              <div className="relative p-6">
                {activeTab === "profile" && <ProfileForm />}
                {activeTab === "password" && <PasswordForm />}
                {activeTab === "delete" && <DeleteAccountForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
