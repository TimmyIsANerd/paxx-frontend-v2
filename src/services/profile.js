import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_NODE_ENV;

export async function getWalletData(bearerToken) {
  try {
    const response = await axios.get(`${baseURL}/api/v1/dashboard`, {
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

export async function getProfile(bearerToken) {
  try {
    const response = await axios.get(`${baseURL}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
