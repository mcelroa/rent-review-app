import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="my-2 rounded-lg bg-white p-2 shadow-lg">
      <div className="mb-3">
        <h3 className="text-xs font-medium text-teal-700 sm:text-sm">
          {property.address}
        </h3>
        <p className="text-xs text-gray-600 sm:text-sm">{property.city}</p>
      </div>
      <div className="flex justify-end">
        <Link
          className="rounded-sm bg-teal-700 p-1 text-xs font-semibold text-white hover:cursor-pointer hover:bg-teal-600 sm:text-sm"
          to={`/property/${property._id}`}
        >
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
