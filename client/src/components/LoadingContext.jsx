import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [load, setLoad] = useState(false);

  const showLoading = () => setLoad(true);
  const hideLoading = () => setLoad(false);

  return (
    <LoadingContext.Provider value={{ load, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
