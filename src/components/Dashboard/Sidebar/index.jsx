"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
  { name: "Payments", icon: CreditCardIcon, href: "/dashboard/payments" },
  { name: "Payouts", icon: ArrowsRightLeftIcon, href: "/dashboard/payouts" },
  { name: "Store", icon: ShoppingBagIcon, href: "/dashboard/store" },
  { name: "Settings", icon: Cog6ToothIcon, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { logOut } = useAuth();




  return (
    <div className="md:flex h-screen w-64 flex-col bg-[#0B0F1C] hidden">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <img
          src="/images/logo/paxx-logo.png"
          className="w-[45%] h-[45%]"
          alt=""
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className={`group relative flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-white bg-blue-500/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* Glow effect */}
              {isActive && (
                <div className="absolute inset-0 rounded-lg bg-blue-500/20 blur-xl" />
              )}

              {/* Content */}
              <div className="relative flex items-center">
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span className="font-medium">{item.name}</span>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full" />
              )}
            </Link>
          );
        })}
        <button
          className={`group relative flex items-center px-3 py-2 rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5 w-full`}
          onClick={logOut}
        >
          <div className="relative flex items-center">
            <ArrowRightOnRectangleIcon
              className={`mr-3 h-5 w-5 transition-colors }`}
            />

            <span className="font-medium">Logout</span>
          </div>
        </button>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/5 p-3">
        <Link
          href="/dashboard/settings"
          className="group flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
              T
            </div>
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0B0F1C] bg-green-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-200">Timmy</p>
            <p className="text-xs text-gray-500">Account settings</p>
          </div>
          <ChevronRightIcon className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
        </Link>
      </div>
    </div>
  );
}
