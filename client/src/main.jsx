import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes";
import { LoadingProvider } from "./components/LoadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <Routes />
    </LoadingProvider>
  </StrictMode>,
);
