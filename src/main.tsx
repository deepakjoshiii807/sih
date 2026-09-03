import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import CinematicHero from "./components/ui/cinematic-hero";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<CinematicHero />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
