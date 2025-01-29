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
    console.log("Catch block of signup: ", error);
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
    console.log("Catch block of signup: ", error);
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('jwt')
    next()
  }

  try {
    await fetch(`${API_BASE_URL}/signout`, {
      method: 'GET'
    })

  } catch (error) {
    console.log(error)
  }
}

export const setJwt = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('jwt', JSON.stringify(data))
    next()
  }
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}
