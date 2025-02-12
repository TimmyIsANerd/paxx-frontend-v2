import axios from "axios";

export async function getWalletSolanaBalance(network, address) {
  try {
    const response = await axios.get(
      `https://solana-gateway.moralis.io/account/${network}/${address}/balance`,
      {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getWalletUSDCBalance(network, walletAddress) {
  try {
    const response = await axios.get(
      `https://solana-gateway.moralis.io/account/${networkType}/${walletAddress}/tokens`,
      {
        headers: { "X-API-Key": MORALIS_API_KEY },
      }
    );

    // Centralize configuration
    const CONFIG_TOKEN = {
      MAINNET_USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      TESTNET_USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    };

    const usdcContractAddress =
      network === "mainnet"
        ? CONFIG_TOKEN.MAINNET_USDC
        : CONFIG_TOKEN.TESTNET_USDC;

    const tokenList = response.data;
    const usdcAccount = tokenList.find(
      (token) => token.mint === usdcContractAddress
    );
    const usdcBalance = usdcAccount
      ? Number(usdcAccount.amount).toFixed(2)
      : "0.00";

    return usdcBalance;
  } catch (error) {
    sails.log.error("Error fetching token list:", error.message);
    throw new Error("Failed to fetch token list");
  }
}
