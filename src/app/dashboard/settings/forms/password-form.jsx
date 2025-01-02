"use client";

import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function PasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const PasswordInput = ({ id, label, value, onChange, show, onToggle }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={show ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          className="block w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {show ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Change Password</h2>
        <p className="text-gray-400 mt-2">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <PasswordInput
            id="currentPassword"
            label="Current Password"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            show={showPasswords.current}
            onToggle={() =>
              setShowPasswords({
                ...showPasswords,
                current: !showPasswords.current,
              })
            }
          />

          <PasswordInput
            id="newPassword"
            label="New Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            show={showPasswords.new}
            onToggle={() =>
              setShowPasswords({ ...showPasswords, new: !showPasswords.new })
            }
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            show={showPasswords.confirm}
            onToggle={() =>
              setShowPasswords({
                ...showPasswords,
                confirm: !showPasswords.confirm,
              })
            }
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
