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
      console.error("Unexpected error:", error); // Log the error for debugging
    }
  };

  return (
    <>
      <div>
        {success && (
          <span>
            Account created! Sign In <Link to="/signin">Here</Link>
          </span>
        )}
        {!success && <span>{error}</span>}
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange("name")}
          value={name}
        />
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={handleChange("email")}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={handleChange("password")}
        />
      </div>
      <button onClick={handleSubmit}>Sign Up</button>
    </>
  );
};

export default Signup;
