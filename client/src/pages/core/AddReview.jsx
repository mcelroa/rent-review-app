import { useState } from "react";
import { isAuthenticated } from "../../services/auth/requests";
import { createReview } from "../../services/core/reviews";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

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
        token,
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

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Add <span className="text-teal-700">Review</span>
          </h2>

          {/* Review Form */}
          <form className="space-y-4">
            <div>
              <textarea
                rows={6}
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Type your review here..."
                value={comment}
                onChange={handleChange("comment")}
              />
            </div>

            {/* Star Rating */}
            <div>
              <h4 className="mb-1 text-lg font-semibold">Leave a rating</h4>
              <div className="flex gap-1">
                {ratings.map((r) => (
                  <i
                    key={r}
                    onClick={() => setValues({ ...values, rating: r })}
                    className={`cursor-pointer text-2xl transition-all ${
                      rating >= r
                        ? "fa-solid fa-star text-teal-700"
                        : "fa-regular fa-star text-gray-500 hover:text-teal-500"
                    }`}
                  ></i>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 sm:text-base"
              >
                Submit
              </button>
              <Link
                to={`/property/${propertyId}`}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:text-base"
              >
                Back to Reviews
              </Link>
            </div>
          </form>

          {/* Success & Error Messages */}
          {success && (
            <p className="mt-4 text-lg font-semibold text-teal-700">
              Review added successfully!
            </p>
          )}
          {!success && error && (
            <p className="mt-4 text-lg font-semibold text-red-500">{error}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddReview;
