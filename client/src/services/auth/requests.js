import { API_BASE_URL } from "../../config"

export const signup = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of signup: ", error);
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (error) {
    console.error("Catch block of signup: ", error);
  }
};