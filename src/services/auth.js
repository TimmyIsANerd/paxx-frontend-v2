import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.usepaxx.xyz"
    : "http://localhost:1338";

export async function login(payload) {
  try {
    const response = await axios.post(`${baseURL}/api/v1/auth/login`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function register(payload) {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/auth/register`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function resendOTPCall(payload) {
  try {
    const response = await axios.post(`${baseURL}/api/v1/auth/resend`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function verifyOTPCall(payload) {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/auth/verify/email`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}