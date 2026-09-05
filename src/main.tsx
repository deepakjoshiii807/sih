import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from '../vly-toolbar-readonly.tsx';
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import AuthPage from "./pages/Auth.tsx";
import LoginPage from "./pages/Login.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import FacultyDashboard from "./pages/FacultyDashboard.tsx";
import IndustryDashboard from "./pages/IndustryDashboard.tsx";
import InstitutionDashboard from "./pages/InstitutionDashboard.tsx";

class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode }, { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToolbarErrorBoundary>
      <VlyToolbar />
    </ToolbarErrorBoundary>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/industry" element={<IndustryDashboard />} />
        <Route path="/institution-admin" element={<InstitutionDashboard />} />

        </Routes>
      </BrowserRouter>
      <Toaster />
    </ConvexAuthProvider>
  </StrictMode>,
);
