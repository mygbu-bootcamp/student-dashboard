import { useState, useEffect } from "react";
import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
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
import UnderDevLogin from "./components/underdevelopmentLogin"; // import your component

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
                {/* Public routes */}
                <Route path="*" element={<LoginScreen />} />
                <Route path="*" element={<Index />} />

                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <MainDashboard />
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
