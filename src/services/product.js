import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.usepaxx.xyz"
    : "http://localhost:1338";

export async function addProduct(storeId, payload, token) {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/product/${storeId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProduct(productId, payload, token) {
  try {
    const response = await axios.patch(
      `${baseURL}/api/v1/product/${productId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId, token) {
  try {
    const response = await axios.delete(
      `${baseURL}/api/v1/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
