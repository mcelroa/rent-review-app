import { API_BASE_URL } from "../../config";

export const getReviews = async (propertyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${propertyId}`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (review, userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/review/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(review),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (reviewId, userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/review/${reviewId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};