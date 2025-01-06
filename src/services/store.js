import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.usepaxx.xyz"
    : "http://localhost:1338";

export const storeUrl =
  process.env.NODE_ENV === "production"
    ? "https://store.usepaxx.xyz"
    : "http://localhost:3001";
export async function getAllStores(token) {
  try {
    const response = await axios.get(`${baseURL}/api/v1/stores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStore(id, token) {
  try {
    const response = await axios.get(`${baseURL}/api/v1/store/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function createStore(payload, token) {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/store/create`,
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

export async function updateStore(id, payload, token) {
  try {
    const response = await axios.put(
      `${baseURL}/api/v1/store/update/${id}`,
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

export async function deleteStore(id, token) {
  try {
    const response = await axios.delete(`${baseURL}/api/v1/store/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function switchStatus(id, payload, token) {
  try {
    const response = await axios.patch(
      `${baseURL}/api/v1/store/status/${id}`,
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
