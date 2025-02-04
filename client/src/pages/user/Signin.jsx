import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signin, setJwt } from "../../services/auth/requests";
import Navbar from "../../components/Navbar";

const Signin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
  });

  const { email, password, error, loading, redirect } = values;

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value, error: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return; // Prevent multiple submissions

    setValues((prev) => ({ ...prev, loading: true }));

    try {
      const response = await signin({ email, password });

      if (response.error) {
        setValues((prev) => ({
          ...prev,
          error: response.error,
          loading: false,
        }));
      } else {
        setJwt(response, () => {
          setValues((prev) => ({ ...prev, redirect: true }));
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setValues((prev) => ({
        ...prev,
        error: "Something went wrong. Please try again later.",
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md sm:p-8">
          <h3 className="mb-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Sign In
          </h3>

          {/* Error & Loading Messages */}
          {error && (
            <div className="mb-4 text-center font-semibold text-red-500">
              {error}
            </div>
          )}
          {loading && (
            <div className="mb-4 text-center font-semibold text-teal-700">
              Loading...
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <input
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleChange("email")}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleChange("password")}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
            <button
              className={`w-full rounded-sm bg-teal-700 p-2 text-sm font-semibold text-white hover:bg-teal-600 sm:text-base ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
