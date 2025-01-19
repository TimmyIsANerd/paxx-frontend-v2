export const payBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pay.usepaxx.xyz"
    : "http://localhost:3002";

export const storeBaseUrl = 
  process.env.NODE_ENV === "production"
    ? "https://store.usepaxx.xyz" : "http://localhost:3001"