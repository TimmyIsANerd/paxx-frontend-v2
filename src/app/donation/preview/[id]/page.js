"use client";

import { useState, useEffect } from "react";
import { PaymentLayout } from "@/components/Payment/payment-layout";
import { usePathname, useRouter } from "next/navigation";
import { getLinkForPage } from "@/services/links";
import { getUUIDFromPath } from "@/utils/lib";
import { getRPC } from "@/services/rpc";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Loading from "@/components/Loading";
import { useTokenBalance } from "@/hooks/web3/useTokenBalance";
import { toast } from "react-toastify";

const helios_key = process.env.NEXT_PUBLIC_HELIOS_API_KEY;

// Centralize configuration
const CONFIG_TOKEN = {
  MAINNET_USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  TESTNET_USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
};

export default function DonationPaymentPage() {
  const [pageData, setPageData] = useState();
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const param = usePathname();
  const { push } = useRouter();
  const rpc = getRPC(pageData?.userMode, helios_key);
  const { connect, connected, connecting, publicKey } = useWallet();
  const { connection } = useConnection();

  const {
    balance: usdcBalance,
    error: usdcError,
    loading: usdcBalanceLoading,
  } = useTokenBalance({
    network: pageData?.userMode === "live" ? "mainnet" : "devnet",
    walletAddress: publicKey?.toString(),
  });

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
    }
  };

  async function loadPage() {
    try {
      const data = await getLinkForPage(getUUIDFromPath(param));
      setPageData(data);
      document.title = data ? data.pageName : "Paxx Payment Processing";
    } catch (error) {
      console.error("Error loading page data:", error);
    }
  }

  useEffect(() => {
    loadPage();
  }, [getUUIDFromPath(param)]);

  const handlePayment = async () => {
    toast("Payment successful!");
  };

  return (
    <PaymentLayout
      title={pageData?.pageName}
      amount={isCustom ? customAmount || "0.00" : pageData?.amount}
      currency={pageData?.currency?.toUpperCase()}
      paymentType="Donation"
      img={pageData?.image}
      walletAddress={publicKey?.toString()}
      tokenBalance={usdcBalance}
      currentWalletBalance={0}
      description="Your generous donation helps us continue our mission."
    >
      <form className="space-y-6">
        {showCustomAmount && (
          <div className="relative">
            <input
              type="text"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={() => setIsCustom(true)}
              className="w-full pl-6 text-black py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
              $
            </span>
          </div>
        )}
        <div>
          <button
            className="w-full py-3 text-purple-600 border-purple-600 border hover:text-white rounded-lg font-medium hover:bg-purple-700 transition duration-200"
            type="button"
            onClick={() => setShowCustomAmount(!showCustomAmount)}
          >
            Enter Custom Amount
          </button>
        </div>
        {/* <WalletMultiButton style={{}} /> */}
        <div className="flex flex-col space-y-4">
          {connected ? (
            <button
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition duration-200"
              type="button"
              onClick={handlePayment}
            >
              Pay
            </button>
          ) : (
            <button
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition duration-200 flex justify-center"
              type="button"
            >
              {connecting ? <Loading /> : "Connect"}
            </button>
          )}
        </div>
      </form>
    </PaymentLayout>
  );
}
