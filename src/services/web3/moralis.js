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
