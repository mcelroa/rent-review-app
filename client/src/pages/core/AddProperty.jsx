import { useState } from "react";
import { isAuthenticated } from "../../services/auth/requests";
import { createProperty } from "../../services/core/properties";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AddProperty = () => {
  const [values, setValues] = useState({
    address: "",
    city: "",
    error: "",
    success: false,
  });

  const [newPropertyId, setNewPropertyId] = useState("");

  const { address, city, error, success } = values;
  const { user, token } = isAuthenticated();

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createProperty({ address, city }, user._id, token);

      if (response.error) {
        setValues({ ...values, error: response.error, success: false });
      } else {
        setNewPropertyId(response._id);
        setValues({
          address: "",
          city: "",
          error: "",
          success: true,
        });
      }
    } catch (error) {
      setValues({
        ...values,
        error: "An unexpected error has occurred. Please try again",
      });
      console.log(error);
    }
  };

  const addPropertyForm = () => {
    return (
      <form>
        <h3 className="text-gray-900 font-bold text-3xl mb-2">Add Property</h3>
        <div>
          <input
            className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold mb-2"
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleChange("address")}
          />
        </div>
        <div>
          <input
            className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold"
            type="text"
            placeholder="City"
            value={city}
            onChange={handleChange("city")}
          />
        </div>
        <button
          className="hover:cursor-pointer bg-teal-700 text-white font-semibold text-sm rounded-sm p-1.5 mt-2 hover:bg-teal-600 mr-1"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <>
      <Navbar showAddProperty={false} />
      <div className="p-4">
        {success && (
          <div className="text-gray-900 font-semibold mb-5 text-center">
            Property added successfully <br />
            Add Reviews to it{" "}
            <Link
              to={`/property/${newPropertyId}`}
              className="text-teal-600 underline"
            >
              here
            </Link>
          </div>
        )}
        {!success && (
          <div className="text-teal-700 font-semibold mb-5 text-center">
            {error}
          </div>
        )}
        {addPropertyForm()}
      </div>
    </>
  );
};

export default AddProperty;
