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
          <h3 className="text-gray-900 font-bold text-2xl mb-2 text-center">
            Sign In
          </h3>
          <input
            className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold mb-2"
            onChange={handleChange("email")}
            value={email}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold mb-2"
            onChange={handleChange("password")}
            value={password}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="w-full bg-teal-700 p-1.5 rounded-sm text-white font-semibold"
          onClick={handleSubmit}
          type="submit"
        >
          Sign In
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
    <div className="p-8">
      {error && (
        <div className="text-teal-700 font-semibold mb-5 text-center">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-teal-700 font-semibold mb-5 text-center">
          Loading...
        </div>
      )}
      {signinForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
