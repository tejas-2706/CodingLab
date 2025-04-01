import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
      <App />
    </BrowserRouter>
  </StrictMode>
);
