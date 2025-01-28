import { API_BASE_URL } from '../config'

export const getAllProperties = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};