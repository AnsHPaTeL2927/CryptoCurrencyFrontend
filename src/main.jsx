import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./pages/context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
console.log("All env variables:", import.meta.env);
console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
