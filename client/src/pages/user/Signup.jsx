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
            <h3>Sign Up</h3>
            <input
              type="text"
              placeholder="Name"
              onChange={handleChange("name")}
              value={name}
            />
          </div>
          <div>
            <input
              value={email}
              type="email"
              placeholder="Email"
              onChange={handleChange("email")}
            />
          </div>
          <div>
            <input
              value={password}
              type="password"
              placeholder="Password"
              onChange={handleChange("password")}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </>
    );
  };

  return (
    <>
      {success && (
        <span>
          Account created! Sign In <Link to="/signin">Here</Link>
        </span>
      )}
      {!success && <span>{error}</span>}
      {signupForm()}
    </>
  );
};

export default Signup;
