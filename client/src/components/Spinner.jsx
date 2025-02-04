import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClipLoader size={50} color="#3498db" />
    </div>
  );
};

export default LoadingSpinner;
