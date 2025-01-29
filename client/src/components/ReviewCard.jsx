const ReviewCard = ({ review, handleDelete }) => {
  return (
    <div className="bg-white shadow-lg p-2 rounded-md mb-3">
      <div className="mb-3">
        <p className="text-gray-900 font-semibold break-words">
          {review.comment}
        </p>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
        </div>
        <button
          className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold p-1 rounded hover:cursor-pointer"
          onClick={() => handleDelete(review._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
