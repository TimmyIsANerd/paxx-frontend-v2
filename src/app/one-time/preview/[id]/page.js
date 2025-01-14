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
import TestModeModal from "@/components/Modal/TestMode";
import WalletConnectModal from "@/components/Modal/WalletConnectModal";

const helios_key = process.env.NEXT_PUBLIC_HELIOS_API_KEY;
const REVENUE_WALLET = process.env.NEXT_PUBLIC_REVENUE_WALLET_MULTISIG;

// Centralize configuration
const CONFIG_TOKEN = {
  MAINNET_USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  TESTNET_USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
};

export default function OneTimePaymentPage() {
  const [pageData, setPageData] = useState();
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const param = usePathname();
  const { push } = useRouter();
  const rpc = getRPC(pageData?.userMode, helios_key);
  const { connect, connected, connecting, publicKey, disconnect } = useWallet();
  const { connection } = useConnection();
  const [testMode, setTestMode] = useState(
    pageData?.userMode === "live" ? false : true
  );
  const [showWalletSelectModal, setshowWalletSelectModal] = useState(
    !connected
  );
  const [showPreviewAlert, setPreviewAlert] = useState(true);

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

  const handlePayment = () => {
    const redirectAfterPayment = pageData?.redirectAfterPayment;
    toast("Transaction Successful");

    setTimeout(() => {
      if (redirectAfterPayment) {
        toast("Redirecting...");
      }
    }, 3000);
    push(redirectAfterPayment);
  };

  const handleConnect = () => {
    setshowWalletSelectModal(false);
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <>
      {testMode ? (
        <TestModeModal isOpen={testMode} onClose={() => setTestMode(false)} />
      ) : null}
      <WalletConnectModal
        isOpen={showWalletSelectModal}
        onClose={() => setshowWalletSelectModal(false)}
        handleWalletConnect={handleConnect}
      />
      <PaymentLayout
        title={pageData?.pageName}
        amount={isCustom ? customAmount || "0.00" : pageData?.amount}
        currency={pageData?.currency?.toUpperCase()}
        paymentType="One-Time Payment"
        img={pageData?.image}
        walletAddress={publicKey?.toString()}
        tokenBalance={usdcBalance}
        currentWalletBalance={0}
        description={pageData?.description}
      >
        <div className="flex flex-col space-y-4">
          {connected ? (
            <>
              <button
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition duration-200"
                type="button"
                onClick={handlePayment}
              >
                Pay
              </button>
              <button
                className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition duration-200"
                type="button"
                onClick={handleDisconnect}
              >
                Disconnect Wallet
              </button>
            </>
          ) : (
            <button
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition duration-200 flex justify-center"
              type="button"
              onClick={() => setshowWalletSelectModal(true)}
            >
              {connecting ? <Loading /> : "Connect"}
            </button>
          )}
        </div>
      </PaymentLayout>
    </>
  );
}
