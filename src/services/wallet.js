import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.usepaxx.xyz"
    : "http://localhost:1338";


export async function withdraw(payload, bearerToken) {
  try {
    const response = await axios.post(`${baseURL}/api/v1/withdrawal`, payload, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
