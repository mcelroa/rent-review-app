import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, setJwt } from "../../services/auth/requests";

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
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    try {
      const response = await signin({ email, password });

      if (response.error) {
        setValues({ ...values, error: response.error, loading: false });
      } else {
        setJwt(response, () => {
          setValues({
            ...values,
            redirect: true,
          });
        });
      }
    } catch (error) {
      // Handle unexpected errors
      setValues({
        ...values,
        error: "Something went wrong. Please try again later.",
      });
      console.log("Unexpected error:", error);
    }
  };

  const signinForm = () => {
    return (
      <form>
        <div>
          <h3>Sign In</h3>
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
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  };

  const redirectUser = () => {
    if (redirect) {
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
