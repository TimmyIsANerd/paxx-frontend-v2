const rpc = {
  devnet: `https://devnet.helius-rpc.com/?api-key=`,
  mainnet: `https://mainnet.helius-rpc.com/?api-key=`,
};

export function getRPC(mode, key) {
  if (mode === "live") {
    return `${rpc.mainnet}${key}`;
  } else {
    return `${rpc.devnet}${key}`;
  }
}
