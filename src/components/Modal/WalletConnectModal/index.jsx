import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import { SolflareWalletName } from "@solana/wallet-adapter-solflare";

export default function WalletConnectModal({
  isOpen,
  onClose,
  handleWalletConnect,
}) {
  const { select, wallets, connecting } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState(null);

  useEffect(() => {
    if (selectedWallet) {
      select(selectedWallet.adapter.name);
    }
  }, [selectedWallet, select]);

  const handleWalletSelect = (wallet) => {
    select(wallet.adapter.name)
    setSelectedWallet(wallet);
    handleWalletConnect(wallet);
    if (!connecting) {
      onClose();
    }
  };

  const supportedWallets = wallets.filter(
    (wallet) =>
      wallet.adapter.name === PhantomWalletName ||
      wallet.adapter.name === SolflareWalletName
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 bg-opacity-90 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-purple-500"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">
              Select a wallet to connect to this dapp:
            </p>
            <div className="space-y-4">
              {supportedWallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => handleWalletSelect(wallet)}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-between"
                >
                  <span>{wallet.adapter.name}</span>
                  {wallet.adapter.icon && (
                    <img
                      src={wallet.adapter.icon}
                      alt={`${wallet.adapter.name} icon`}
                      className="w-6 h-6"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
