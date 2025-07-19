// src/components/StatsCard.js
import React from 'react';
import {
  CheckCircle, Clock, Heart, Bell, // Import the icons you used in quickStats
  // Add any other Lucide icons you might want to use in the future stats cards
} from "lucide-react";

// Helper components (optional, but good for consistency)
// You might already have these in a shared UI library if you built one.
const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// The main StatsCard component
const StatsCard = ({ title, value, icon: Icon, color, bgColor, className = "", ...props }) => {
  // Ensure Icon is a valid React component (e.g., from Lucide)
  const IconComponent = Icon || null; // Fallback if no icon is provided

  return (
    <Card className={`transition-all duration-200 ease-in-out hover:shadow-md ${className}`} {...props}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          {IconComponent && ( // Only render icon div if IconComponent exists
            <div className={`p-3 rounded-full ${bgColor}`}>
              <IconComponent className={`h-6 w-6 ${color}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;