import { useState } from "react";
import { signup } from "../../services/auth/requests";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup({ name, email, password });

      if (response.error) {
        setValues({ ...values, error: response.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    } catch (error) {
      // Handle unexpected errors
      setValues({
        ...values,
        error: "Something went wrong. Please try again later.",
        success: false,
      });
      console.log("Unexpected error:", error); // Log the error for debugging
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md sm:p-8">
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Sign Up
          </h3>

          {/* Success & Error Messages */}
          {success && (
            <div className="mb-5 text-center font-semibold text-teal-700">
              Account created! Sign In{" "}
              <Link
                to="/signin"
                className="font-semibold text-teal-600 underline"
              >
                Here
              </Link>
            </div>
          )}
          {!success && error && (
            <div className="mb-5 text-center font-semibold text-red-500">
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 sm:text-base"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
