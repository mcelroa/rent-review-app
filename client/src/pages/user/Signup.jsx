import { useState } from "react";
import { signup } from "../../services/auth/requests";
import { Link } from "react-router-dom";

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

  const signupForm = () => {
    return (
      <>
        <form>
          <div>
            <h3 className="text-gray-900 font-bold text-2xl mb-2 text-center">
              Sign Up
            </h3>
            <input
              className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold mb-2"
              type="text"
              placeholder="Name"
              onChange={handleChange("name")}
              value={name}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold mb-2"
              value={email}
              type="email"
              placeholder="Email"
              onChange={handleChange("email")}
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold mb-2"
              value={password}
              type="password"
              placeholder="Password"
              onChange={handleChange("password")}
            />
          </div>
          <button
            className="w-full bg-teal-700 p-1.5 rounded-sm text-white font-semibold"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="p-8">
      {success && (
        <div className="text-gray-900 font-semibold mb-5 text-center">
          Account created! Sign In{" "}
          <Link
            className="text-teal-700 font-semibold mb-5 text-center"
            to="/signin"
          >
            Here
          </Link>
        </div>
      )}
      {!success && (
        <div className="text-teal-700 font-semibold mb-5 text-center">
          {error}
        </div>
      )}
      {signupForm()}
    </div>
  );
};

export default Signup;
