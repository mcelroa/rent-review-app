import { useState } from "react";
import { isAuthenticated } from "../../services/auth/requests";
import { createReview } from "../../services/core/reviews";
import { Link, useParams } from "react-router-dom";

const AddReview = () => {
  const { propertyId } = useParams();

  const [values, setValues] = useState({
    comment: "",
    rating: null,
    error: "",
    success: false,
  });

  const ratings = [1, 2, 3, 4, 5];

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
      <form className="mb-4">
        <h2 className="text-gray-900 font-bold text-3xl">
          Add <span className="text-teal-700">Review</span>
        </h2>
        <div className="w-full">
          <textarea
            rows={7}
            className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold"
            placeholder="Type review here"
            type="text"
            value={comment}
            onChange={handleChange("comment")}
          />
        </div>
        <div className="mb-2">
          <h4 className="font-semibold">Leave a rating</h4>
          {ratings.map((r, i) => (
            <i
              onClick={() => setValues({ ...values, rating: r })}
              key={i}
              className={`text-xl cursor-pointer ${
                rating >= r
                  ? "fa-solid fa-star text-teal-700" // Filled star when selected
                  : "fa-regular fa-star text-gray-900 hover:text-teal-700" // Empty star when not selected
              }`}
            ></i>
          ))}
        </div>
        <hr />
        <button
          className="hover:cursor-pointer bg-teal-700 text-white font-semibold text-sm rounded-sm p-1.5 mt-2 hover:bg-teal-600 mr-1"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <Link
          to={`/property/${propertyId}`}
          className="bg-gray-900 hover:bg-gray-700 p-1.5 text-white rounded-sm text-sm"
        >
          Back to reviews
        </Link>
      </form>
    );
  };

  return (
    <div className="p-4">
      {AddReviewForm()}
      {success && (
        <span className="text-teal-700 text-xl font-semibold">
          Review added successfully
        </span>
      )}
      {!success && (
        <span className="text-red-500 text-xl font-semibold">{error}</span>
      )}
    </div>
  );
};

export default AddReview;
