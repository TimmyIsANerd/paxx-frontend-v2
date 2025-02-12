"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { getWalletData } from "@/services/profile";
import { toast } from "react-toastify";

export const WalletContext = createContext({
  walletAddress: "",
  dashboardData: null,
  getLatestBalance: () => {},
});

export const WalletContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [cookies] = useCookies(["paxx_user"]);
  const [token] = useState(cookies.paxx_user);
  const [dashboardData, setDashboardData] = useState(null);

  async function getBalances() {
    try {
      const data = await getWalletData(token);
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const paxx_user = window.localStorage.getItem("paxx_user");
    if (paxx_user) {
      const parsedData = JSON.parse(paxx_user);
      setWalletAddress(parsedData.walletAddress);
    }

    getBalances();
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletAddress, dashboardData, getLatestBalance: getBalances }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
