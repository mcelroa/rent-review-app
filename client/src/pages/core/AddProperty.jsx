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

  return (
    <>
      <Navbar showAddProperty={false} />
      <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md sm:p-8">
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Add Property
          </h3>

          {/* Success & Error Messages */}
          {success && (
            <div className="mb-5 text-center font-semibold text-teal-700">
              Property added successfully! <br />
              Add Reviews to it{" "}
              <Link
                to={`/property/${newPropertyId}`}
                className="text-teal-600 underline"
              >
                here
              </Link>
            </div>
          )}
          {!success && error && (
            <div className="mb-5 text-center font-semibold text-red-500">
              {error}
            </div>
          )}

          {/* Property Form */}
          <form className="space-y-4">
            <div>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                type="text"
                placeholder="Address"
                value={address}
                onChange={handleChange("address")}
              />
            </div>
            <div>
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                type="text"
                placeholder="City"
                value={city}
                onChange={handleChange("city")}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 sm:text-base"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
