import { useState } from "react";
import { Toaster } from "../src/components/toaster";
import { Toaster as Sonner } from "../src/components/sonner";
import { TooltipProvider } from "../src/components/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import { AuthProvider } from "./hooks/AuthContext";
import ProtectedRoute from "./hooks/ProtectedRoute";

// Pages
import LoginScreen from "./components/LoginScreen";
import MainDashboard from "./components/MainDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnderDevLogin from "./components/underdevelopmentLogin";

// Quick Access Pages
import Attendance from "./pages/AttendanceModule";
import Skills from "./pages/SkillsModule";
import Wellness from "./pages/WellnessModule";
import Store from "./pages/GBUStoreModule";
import Documents from "./pages/DocumentVaultModule";
import Goals from "./pages/GoalTrackerModule";
import Hostel from "./pages/HostelMessModule";
import Placement from "./pages/PlacementModule";

const queryClient = new QueryClient();

const App = () => {
  const [showDevLogin, setShowDevLogin] = useState(true);

  const handleDevLogin = () => {
    setShowDevLogin(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            {showDevLogin ? (
              <UnderDevLogin onLogin={handleDevLogin} />
            ) : (
              <Routes>
                {/* Public Routes */}
                <Route path="*" element={<LoginScreen />} />
                <Route path="*" element={<Index />} />

                {/* Protected Routes */}
                <Route path="/dashboard"element={
                    <ProtectedRoute>
                      <MainDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    <ProtectedRoute>
                      <Attendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/skills"
                  element={
                    <ProtectedRoute>
                      <Skills />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wellness"
                  element={
                    <ProtectedRoute>
                      <Wellness />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/store"
                  element={
                    <ProtectedRoute>
                      <Store />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/documents"
                  element={
                    <ProtectedRoute>
                      <Documents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <ProtectedRoute>
                      <Goals />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hostel"
                  element={
                    <ProtectedRoute>
                      <Hostel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/placement"
                  element={
                    <ProtectedRoute>
                      <Placement />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
