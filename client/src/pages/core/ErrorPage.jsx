import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700">Uh-oh!</h1>
        <p className="mt-4 text-2xl">
          Something went wrong. Please try again later.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-teal-700 px-6 py-2 text-white shadow-md transition hover:bg-teal-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
