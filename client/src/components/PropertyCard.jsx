import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="p-2 my-2 rounded-lg bg-white shadow-lg">
      <div className="mb-3">
        <h3 className="text-teal-700 font-medium">{property.address}</h3>
        <p className="text-sm text-gray-607">{property.city}</p>
      </div>
      <div className="flex justify-end">
        <Link
          className="bg-teal-700 hover:bg-teal-600 rounded-sm p-1 text-white text-sm font-semibold hover:cursor-pointer"
          to={`/property/${property._id}`}
        >
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
