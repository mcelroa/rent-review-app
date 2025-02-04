import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import { API_BASE_URL } from "../../config";

const EmailVerification = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Track if verification was successful

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/verify-email/${userId}`, {
          signal,
        });
        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
          setIsVerified(true); // Mark verification as successful
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setMessage("Verification failed. Please try again.");
        }
      }
    };

    if (userId) {
      verifyEmail();
    }

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return (
    <div>
      <h1>{message}</h1>
      {isVerified && (
        <p>
          <Link to="/signin">Click here to log in</Link>{" "}
          {/* Link to login page */}
        </p>
      )}
    </div>
  );
};

export default EmailVerification;
