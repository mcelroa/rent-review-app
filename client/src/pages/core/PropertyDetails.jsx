import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleProperty } from "../../services/core/properties";
import { deleteReview, getReviews } from "../../services/core/reviews";
import { isAuthenticated } from "../../services/auth/requests";
import ReviewCard from "../../components/ReviewCard";

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
    <div>
      {property && (
        <div className="p-4">
          <h1 className="text-gray-900 text-2xl font-bold">
            {property.address}
          </h1>
        </div>
      )}

      <div className="px-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {loading && (
          <p className="text-xl font-semibold text-teal-600">Loading...</p>
        )}
        {error && <div className="text-md text-red-500">{error}</div>}
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <ReviewCard key={i} review={r} handleDelete={handleDelete} />
          ))
        ) : (
          <p className="mb-3 text-gray-600">
            No reviews for this property yet.
          </p>
        )}
        <Link
          className="bg-teal-600 hover:bg-teal-500 p-1 text-white rounded-sm text-sm"
          to={`/add/review/${propertyId}`}
        >
          Add Review
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;
