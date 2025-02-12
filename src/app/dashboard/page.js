"use client";
import { useAuth } from "@/context/AuthContext";
import { getFirstName } from "@/utils/lib";
import Link from "next/link";
import DashboardStats from "@/components/Dashboard/Stats";
import OnboardingSection from "@/components/Dashboard/Onboarding";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";

export default function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="w-full my-3 p-3 max-h-screen overflow-y-auto">
      <OnboardingSection
        firstName={user ? getFirstName(user.fullName) : "..."}
        user={user}
      />
      {/* <TransactionHistory /> */}
    </div>
  );
}
