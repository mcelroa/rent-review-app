import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleProperty } from "../../services/core/properties";
import { deleteReview, getReviews } from "../../services/core/reviews";
import { isAuthenticated } from "../../services/auth/requests";
import ReviewCard from "../../components/ReviewCard";
import Navbar from "../../components/Navbar";

const PropertyDetails = () => {
  const { propertyId } = useParams();

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();

  // Function to fetch property details and reviews
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch property details
      const propertyData = await getSingleProperty(propertyId);
      setProperty(propertyData);

      // Fetch reviews for the property
      const reviewsData = await getReviews(propertyId);
      setReviews(reviewsData);
    } catch (error) {
      setError("Failed to load property details or reviews.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [propertyId]);

  const handleDelete = async (reviewId) => {
    setLoading(true);
    try {
      const response = await deleteReview(reviewId, user._id, token);

      if (response.error) {
        setError(response.error);
      } else {
        const updatedReviews = await getReviews(propertyId);
        setReviews(updatedReviews);
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred while deleting the review.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {property && (
        <div className="p-4 sm:px-6 md:px-8 lg:px-12">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {property.address}
          </h1>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12">
        <hr className="my-4 border-gray-300" />

        <h2 className="text-xl font-semibold sm:text-2xl">Reviews</h2>

        {loading && (
          <p className="text-lg font-semibold text-teal-700 sm:text-xl">
            Loading...
          </p>
        )}

        {error && <div className="text-md text-red-500">{error}</div>}

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} handleDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p className="mb-3 text-sm text-gray-600 sm:text-base">
            No reviews for this property yet.
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            className="rounded-md bg-teal-700 px-3 py-2 text-sm text-white hover:bg-teal-600 sm:text-base"
            to={`/add/review/${propertyId}`}
          >
            Add Review
          </Link>

          <Link
            className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-700 sm:text-base"
            to={`/`}
          >
            Back to search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
