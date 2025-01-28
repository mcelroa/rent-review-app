import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import Home from "./pages/core/Home";

import Signup from "./pages/user/Signup";
import Signin from "./pages/user/Signin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
