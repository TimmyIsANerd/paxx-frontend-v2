"use client";

import { useState } from "react";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import { getFirstName } from "@/utils/lib";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
    { name: "Payments", icon: CreditCardIcon, href: "/dashboard/payments" },
    {
      name: "Transactions",
      icon: BanknotesIcon,
      href: "/dashboard/transactions",
    },
    { name: "Store", icon: ShoppingBagIcon, href: "/dashboard/store" },
    { name: "Settings", icon: Cog6ToothIcon, href: "/dashboard/settings" },
    { name: "Logout", icon: ArrowRightOnRectangleIcon, href: "/logout" },
  ];

  return (
    <div className="hidden md:flex h-screen">
      <div className="flex flex-col w-64 bg-[#0B0F1C] text-white">
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo/paxx-logo.png"
              className="w-[45%] h-[45%]"
              alt=""
            />
          </div>
        </div>
        {/* Search */}
        {/* <div className="px-4 mt-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for..."
              className="w-full bg-[#131B2C] text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div> */}

        <nav className="flex-1 mt-6">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-lg rounded-lg hover:bg-[#131B2C] transition-colors
                  ${
                    pathname === item.href
                      ? "text-[#005BFE] bg-[#131B2C] border-[#005BFE] border-l-4"
                      : "text-gray-300"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t border-[#131B2C]">
          <a
            href="/settings/account"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#131B2C] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005BFE] to-[#005BFE]/40" />
            <div className="flex-1">
              <div className="text-sm font-medium">
                {user ? getFirstName(user?.fullName) : "..."}
              </div>
              <div className="text-xs text-gray-400">Account settings</div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
