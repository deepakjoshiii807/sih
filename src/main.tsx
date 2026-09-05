import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/django-auth";
import { VlyToolbar } from '../vly-toolbar-readonly.tsx';
import { Component, StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import AuthPage from "./pages/Auth.tsx";
import LoginPage from "./pages/Login.tsx";
import RequireRole from "./components/RequireRole.tsx";
import {
  LiveStudentDashboard,
  LiveFacultyDashboard,
  LiveIndustryDashboard,
  LiveInstitutionDashboard,
} from "./components/live/role-dashboards.tsx";

class ToolbarErrorBoundary extends Component<
  { children: ReactNode }, { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated, role-scoped dashboards (Django JWT) */}
        <Route
          path="/student"
          element={
            <RequireRole role="student">
              <LiveStudentDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/faculty"
          element={
            <RequireRole role="academician">
              <LiveFacultyDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/academician"
          element={
            <RequireRole role="academician">
              <LiveFacultyDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/industry"
          element={
            <RequireRole role="industry">
              <LiveIndustryDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/institution-admin"
          element={
            <RequireRole role="institutionAdmin">
              <LiveInstitutionDashboard />
            </RequireRole>
          }
        />

        </Routes>
      </BrowserRouter>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <Toaster />
    </AuthProvider>
  </StrictMode>,
);
