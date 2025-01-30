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
    <div>
      <Navbar />
      {property && (
        <div className="p-4">
          <h1 className="text-gray-900 text-2xl font-bold">
            {property.address}
          </h1>
        </div>
      )}
      <div className="px-4">
        <hr />
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {loading && (
          <p className="text-xl font-semibold text-teal-700">Loading...</p>
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
          className="bg-teal-700 hover:bg-teal-600 p-1.5 text-white rounded-sm text-sm mr-1"
          to={`/add/review/${propertyId}`}
        >
          Add Review
        </Link>
        <Link
          className="bg-gray-900 hover:bg-gray-700 p-1.5 text-white rounded-sm text-sm"
          to={`/`}
        >
          Back to search
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetails;
