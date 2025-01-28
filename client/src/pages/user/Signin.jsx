import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
} from "../../services/auth/requests";

const Signin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { email, password, error, loading } = values;

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    try {
      const response = await signin({ email, password });

      if (response.error) {
        setValues({ ...values, error: response.error, loading: false });
      } else {
        authenticate(response, () => {
          setValues({
            ...values,
          });
        });
      }
    } catch (error) {
      // Handle unexpected errors
      setValues({
        ...values,
        error: "Something went wrong. Please try again later.",
      });
      console.error("Unexpected error:", error);
    }
  };

  const signinForm = () => {
    return (
      <form>
        <div>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={clickSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  };

  const redirectUser = () => {
    if (isAuthenticated()) {
      navigate("/");
    }
    return null;
  };

  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {signinForm()}
      {redirectUser()}
    </>
  );
};

export default Signin;
