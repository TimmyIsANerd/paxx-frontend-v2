import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.usepaxx.xyz"
    : "http://localhost:1338";

export async function createLink(payload, token) {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/link/create`,
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

export async function updateLink(id, payload, token) {
  try {
    const response = await axios.patch(
      `${baseURL}/api/v1/link/update/${id}`,
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

export async function getAllLinks(token) {
  try {
    const response = await axios.get(`${baseURL}/api/v1/links`, {
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

export async function getLink(id, token) {
  try {
    const response = await axios.get(`${baseURL}/api/v1/link/${id}`, {
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

export async function deleteLink(id, token) {
  try {
    const response = await axios.delete(`${baseURL}/api/v1/link/${id}`, {
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

export async function getLinkForPage(id) {
  try {
    const response = await axios.get(`/api/v1/link-data/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
