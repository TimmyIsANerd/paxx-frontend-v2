"use client";
import { useAuth } from "@/context/AuthContext";
import { getFirstName } from "@/utils/lib";
import Link from "next/link";
import DashboardStats from "@/components/Dashboard/Stats";
import OnboardingSection from "@/components/Dashboard/Onboarding";

export default function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="w-full my-3 p-3">
      <OnboardingSection
        firstName={user ? getFirstName(user.fullName) : "..."}
      />
      <DashboardStats />
    </div>
  );
}
