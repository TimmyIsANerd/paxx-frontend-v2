import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { withdraw } from "@/services/wallet";
import { useWallet } from "@/context/WalletContext";

export default function SendModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usdc");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { getLatestBalance, dashboardData: wallet } = useWallet();
  const [selectedBalance, setSelectedBalance] = useState(
    wallet?.USDCBalance || 0
  );

  function clearFields() {
    setAmount("");
    setCurrency("usdc");
    setAddrerss("");
  }

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (currency === "solana" && amount > Number(wallet.totalSolBalance)) {
      toast("Insufficient SOL balance");
      return;
    }

    if (currency === "usdc" && amount > Number(wallet.USDCBalance)) {
      toast("Insufficient USDC balance");
      return;
    }

    setLoading(true);
    const payload = {
      amount,
      token: currency,
      destinationAddress: address,
    };

    try {
      await withdraw(payload, token);
      toast.success(`Successfully sent ${amount} ${currency} to ${address}`);
      await getLatestBalance();
      clearFields();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  function setMaxAmount() {
    if (currency === "usdc") {
      setAmount(wallet.USDCBalance);
    } else {
      setAmount(wallet.totalSolBalance);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#131B2C] rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Send Crypto</h2>
        <p className="text-right">
          Balance : {selectedBalance}{" "}
          <span className="uppercase">{currency}</span>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2A3C] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              min={0}
              step={0.01}
              required
              S
            />
            <button
              className="bg-purple-400 uppercase text-black flex items-center justify-center rounded-md font-semibold
             p-1 text-sm absolute right-2 top-8 z-20"
              onClick={setMaxAmount}
              type="button"
            >
              max
            </button>
          </div>
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => {
                const selectedCurrency = e.target.value;
                setCurrency(selectedCurrency);
                if (selectedCurrency === "usdc") {
                  setSelectedBalance(wallet.USDCBalance);
                } else {
                  setSelectedBalance(wallet.totalSolBalance);
                }
              }}
              className="w-full px-3 py-2 bg-[#1F2A3C] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="usdc">USDC</option>
              <option value="solana">SOL</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Recipient Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-[#1F2A3C] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter wallet address"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors inline-flex justify-center items-center"
          >
            {loading ? <Loading /> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
