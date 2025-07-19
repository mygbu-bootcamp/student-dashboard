import React from 'react';
import { Calendar, Eye, AlertTriangle } from "lucide-react";

const AttendanceActions = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-transparent">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <p className="text-sm text-gray-500">Manage your attendance and requests</p>
      </div>
      <div className="p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Apply for Leave Button */}
          <button className="w-full border border-gray-200 rounded-md p-4 flex items-center justify-center h-auto
                             hover:shadow-lg hover:border-blue-300 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-medium">Apply for Leave</p>
              <p className="text-sm text-gray-600">Submit absence request</p>
            </div>
          </button>

          {/* View Detailed Report Button */}
          <button className="w-full border border-gray-200 rounded-md p-4 flex items-center justify-center h-auto
                             hover:shadow-lg hover:border-green-300 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-center">
              <Eye className="h-6 w-6 mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-medium">View Detailed Report</p>
              <p className="text-sm text-gray-600">Month-wise breakdown</p>
            </div>
          </button>

          {/* Improvement Plan Button */}
          <button className="w-full border border-gray-200 rounded-md p-4 flex items-center justify-center h-auto
                             hover:shadow-lg hover:border-orange-300 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-medium">Improvement Plan</p>
              <p className="text-sm text-gray-600">Get attendance tips</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceActions;