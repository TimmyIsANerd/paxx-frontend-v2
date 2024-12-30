"use client";
import { useAuth } from "@/context/AuthContext";
import { getFirstName } from "@/utils/lib";
import Link from "next/link";
import DashboardStats from "@/components/Dashboard/Stats";

export default function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="w-full my-3 p-3">
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h3 className="font-bold text-4xl">
            Welcome Back, {user ? getFirstName(user.fullName) : "..."}
          </h3>
          <p className="text-xl text-[#AEB9E1] font-normal opacity-90">
            Let's Get You Started...
          </p>
        </div>

        <Link
          href="/dashboard/payments/create"
          className="bg-gradient-to-br from-[#005BFE] to-[#00A1FE] text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Create Payment Link
        </Link>
      </div>
      <DashboardStats />
    </div>
  );
}
