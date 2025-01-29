import { useState } from "react";
import { isAuthenticated } from "../../services/auth/requests";
import { createReview } from "../../services/core/reviews";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { propertyId } = useParams();

  const [values, setValues] = useState({
    comment: "",
    rating: 0,
    error: "",
    success: false,
  });

  const { comment, rating, error, success } = values;
  const { user, token } = isAuthenticated();

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createReview(
        { propertyId, rating, comment },
        user._id,
        token
      );

      if (response.error) {
        setValues({ ...values, error: response.error, success: false });
      } else {
        setValues({
          comment: "",
          rating: 0,
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

  const AddReviewForm = () => {
    return (
      <form>
        <div>
          <label>Comment</label>
          <textarea
            type="text"
            value={comment}
            onChange={handleChange("comment")}
          />
        </div>
        <div>
          <label>Rating between 1-5</label>
          <input
            type="number"
            value={rating}
            onChange={handleChange("rating")}
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
      {success && <span>Review added successfully</span>}
      {!success && <span>{error}</span>}
      {AddReviewForm()}
    </div>
  );
};

export default AddReview;
