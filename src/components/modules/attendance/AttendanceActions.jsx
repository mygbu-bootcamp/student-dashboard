import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Calendar, Eye, AlertTriangle } from "lucide-react";

const AttendanceActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your attendance and requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="font-medium">Apply for Leave</p>
              <p className="text-sm text-gray-600">Submit absence request</p>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
            <div className="text-center">
              <Eye className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="font-medium">View Detailed Report</p>
              <p className="text-sm text-gray-600">Month-wise breakdown</p>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <p className="font-medium">Improvement Plan</p>
              <p className="text-sm text-gray-600">Get attendance tips</p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceActions;