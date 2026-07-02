import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <BrowserRouter>
     <AuthProvider>
       <App />
       <Toaster richColors position="top-right" />
     </AuthProvider>
     </BrowserRouter>
  </StrictMode>
);