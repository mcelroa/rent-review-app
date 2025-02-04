import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import AddProperty from "./pages/core/AddProperty";
import PropertyDetails from "./pages/core/PropertyDetails";
import AddReview from "./pages/core/AddReview";

import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";

import EmailVerification from "./pages/core/EmailVerification";

import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
        <Route path="/verify-email/:userId" element={<EmailVerification />} />

        <Route
          path="/add/property"
          element={
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          }
        />

        <Route
          path="/add/review/:propertyId"
          element={
            <PrivateRoute>
              <AddReview />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
