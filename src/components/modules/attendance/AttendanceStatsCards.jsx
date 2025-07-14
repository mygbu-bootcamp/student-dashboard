import { Card, CardContent } from "../../../components/ui/card";
import { BarChart3, Calendar, CheckCircle, AlertTriangle } from "lucide-react";

const AttendanceStatsCards = ({ 
  overallAttendance, 
  totalClasses, 
  classesAttended, 
  criticalSubjects 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-blue-600">{overallAttendance.toFixed(1)}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-green-600">{totalClasses}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Classes Attended</p>
              <p className="text-2xl font-bold text-purple-600">{classesAttended}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Subjects</p>
              <p className="text-2xl font-bold text-red-600">{criticalSubjects}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStatsCards;