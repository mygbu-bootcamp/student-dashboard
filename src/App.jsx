import { useState } from "react";
import { Toaster } from "./components/toaster"; // Assuming this path is correct
import { Toaster as Sonner } from "./components/sonner"; // Assuming this path is correct
import { TooltipProvider } from "./components/tooltip"; // Assuming this path is correct
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import ProtectedRoute from "./hooks/ProtectedRoute";
import LoginScreen from "./components/LoginScreen";
import MainDashboard from "./components/MainDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnderDevLogin from "./components/underdevelopmentLogin";
import ComingSoon from "./pages/Comingsoon"; // Import the ComingSoon component

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
                {/* Assign specific paths to avoid conflicts with multiple path="*" */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/" element={<Index />} />
                <Route path="/coming-soon" element={<ComingSoon />} /> {/* New route for ComingSoon */}

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <MainDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all for any unmatched routes - should be the last route */}
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