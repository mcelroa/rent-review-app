import { useState } from "react";
import { isAuthenticated } from "../../services/auth/requests";
import { createProperty } from "../../services/core/properties";

const AddProperty = () => {
  const [values, setValues] = useState({
    address: "",
    city: "",
    error: "",
    success: false,
  });

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
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="eg. 123, Your street Name, Apartment No., etc..."
            value={address}
            onChange={handleChange("address")}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="Dublin"
            value={city}
            onChange={handleChange("city")}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    );
  };

  return (
    <div>
      {success && <span>Property added successfully</span>}
      {!success && <span>{error}</span>}
      {addPropertyForm()}
    </div>
  );
};

export default AddProperty;
