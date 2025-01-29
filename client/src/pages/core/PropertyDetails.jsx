import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleProperty } from "../../services/core/properties";
import { getReviews } from "../../services/core/reviews";

const PropertyDetails = () => {
  const { propertyId } = useParams();

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch property details and reviews when the component mounts
  useEffect(() => {
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

    fetchData();
  }, [propertyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {property && (
        <div>
          <h1>{property.address}</h1>
        </div>
      )}

      <div>
        <h2>Reviews</h2>
        <hr />
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id}>
              <p>{review.comment}</p>
              <div>
                <p>Rating: {review.rating}/5</p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No reviews for this property yet.</p>
        )}
      </div>
      <div>
        <button>
          <Link to={`/add/review/${propertyId}`}>Add Review</Link>
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
