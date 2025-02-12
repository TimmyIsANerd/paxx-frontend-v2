import { useState, useEffect } from "react";
import { getWalletUSDCBalance } from "@/services/web3/moralis";

export const useTokenBalance = ({ network, walletAddress }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        setLoading(true);
        const balanceResponse = await getWalletUSDCBalance(
          network,
          walletAddress
        );

        setBalance(balanceResponse);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch balance"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTokenBalance();
  }, [network, walletAddress]);

  return { balance, loading, error };
};
