import { API_BASE_URL } from "../../config";

export const getAllProperties = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProperty = async (propertyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property/${propertyId}`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createProperty = async (property, userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(property),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const searchProperties = async (query) => {

  if (!query) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/properties/?search=${query}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
