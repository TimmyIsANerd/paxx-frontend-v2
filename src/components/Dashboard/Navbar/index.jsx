"use client";

import { useState } from "react";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
  { name: "Payments", icon: CreditCardIcon, href: "/dashboard/payments" },
  { name: "Payouts", icon: ArrowsRightLeftIcon, href: "/dashboard/payouts" },
  { name: "Store", icon: ShoppingBagIcon, href: "/dashboard/store" },
  { name: "Settings", icon: Cog6ToothIcon, href: "/dashboard/settings" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut } = useAuth();

  return (
    <nav className="bg-[#0B0F1C] text-white md:hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name (visible on all screen sizes) */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/images/logo/paxx-logo.png"
              className="w-[45%] h-[45%]"
              alt=""
            />
            {/* <span className="ml-2 text-lg font-semibold">Dashdark X</span> */}
          </div>

          {/* Desktop menu items (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-300 hover:text-white">
              <BellIcon className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-400" />
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#131B2C] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden on desktop) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-[#131B2C]"
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.name}
              </a>
            ))}
            <button className="flex items-center gap-3 px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-[#131B2C]">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
