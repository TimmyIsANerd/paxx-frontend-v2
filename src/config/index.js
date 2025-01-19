export const payBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pay.usepaxx.xyz"
    : "http://localhost:3003";
