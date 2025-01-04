"use client";

import { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import SendModal from "./SendModal";
import ReceiveModal from "./ReceiveModal";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import Loading from "@/components/Loading";

const actions = [
  {
    icon: ArrowUpIcon,
    label: "Send",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: ArrowDownIcon,
    label: "Receive",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: ArrowsRightLeftIcon,
    label: "Swap",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export default function BalanceOverview() {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const { user } = useAuth();
  const { dashboardData: dashboard } = useWallet();

  console.log("Dashboard Data: ", dashboard);

  const handleActionClick = (label) => {
    if (label === "Send") setSendModalOpen(true);
    if (label === "Receive") setReceiveModalOpen(true);
    if (label === "Swap") toast("Feature in Development");
  };

  return (
    <div className="w-full max-w-full mx-auto mb-8">
      <div className="relative group dark:bg-[#131B2C] backdrop-blur-xl rounded-2xl border border-white/10 p-8 overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 blur-3xl" />

        <div className="relative">
          {/* Balance Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">
                Total Balance (USDC)
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  ${dashboard ? Number(dashboard.USDCBalance).toFixed(0) : ""}
                </span>
                <span className="text-lg text-gray-400">
                  .{dashboard ? dashboard.USDCBalance.slice(-2) : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-500">
                  {dashboard ? dashboard.percentageIncreaseUSDC : ""}% from last
                  month
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">
                Total Balance (SOL)
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  {dashboard ? dashboard.totalSolBalance : ""}
                </span>
                <span className="text-lg text-gray-400">SOL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm text-blue-500">
                  ≈ ${dashboard ? dashboard.totalSolBalanceInUSD : ""}{" "}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(action.label)}
                className="relative group/button bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300"
              >
                {/* Button Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${action.color} opacity-0 group-hover/button:opacity-100 transition-opacity blur-xl`}
                />

                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {action.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <SendModal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
      />
      <ReceiveModal
        isOpen={receiveModalOpen}
        onClose={() => setReceiveModalOpen(false)}
        walletAddress={user ? user.wallet : ""}
      />
    </div>
  );
}
