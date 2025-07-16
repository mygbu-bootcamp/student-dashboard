import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertTriangle, Download } from "lucide-react";
import AttendanceStatsCards from "./attendance/AttendanceStatsCards";
import AttendanceChart from "./attendance/AttendanceChart";
import SubjectAttendanceList from "./attendance/SubjectAttendanceList";
import AbsenceHistory from "./attendance/AbsenceHistory";
import AttendanceActions from "./attendance/AttendanceActions";

// Remove TypeScript interface and type annotations

const AttendanceModule = ({ user }) => {
  const attendanceData = [
    { subject: "Data Structures", present: 28, total: 32, percentage: 87.5, status: "Safe" },
    { subject: "Machine Learning", present: 24, total: 30, percentage: 80.0, status: "Safe" },
    { subject: "Software Engineering", present: 22, total: 28, percentage: 78.6, status: "Warning" },
    { subject: "Computer Networks", present: 20, total: 29, percentage: 69.0, status: "Critical" },
    { subject: "Database Management", present: 26, total: 31, percentage: 83.9, status: "Safe" },
    { subject: "Technical Communication", present: 18, total: 20, percentage: 90.0, status: "Safe" }
  ];

  const absentHistory = [
    { date: "2024-01-15", subject: "Computer Networks", reason: "Medical Leave", status: "Approved" },
    { date: "2024-01-12", subject: "Software Engineering", reason: "Family Emergency", status: "Approved" },
    { date: "2024-01-08", subject: "Computer Networks", reason: "Sick", status: "Pending" },
    { date: "2024-01-05", subject: "Machine Learning", reason: "Technical Issues", status: "Approved" }
  ];

  const criticalSubjects = attendanceData.filter(item => item.percentage < 75);
  const overallAttendance = attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Dashboard</h1>
          <p className="text-gray-600">Track your class attendance and maintain academic requirements</p>
        </div>
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Alert for low attendance */}
      {criticalSubjects.length > 0 && (
        <Alert className="border border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Attendance Alert:</strong> You have {criticalSubjects.length} subject(s) with attendance below 75%. 
            Immediate action required to avoid academic penalties.
          </AlertDescription>
        </Alert>
      )}

      {/* Overall Stats */}
      <AttendanceStatsCards
        overallAttendance={overallAttendance}
        totalClasses={170}
        classesAttended={138}
        criticalSubjects={criticalSubjects.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Attendance */}
        <SubjectAttendanceList attendanceData={attendanceData} />

        {/* Attendance Chart */}
        <AttendanceChart attendanceData={attendanceData} />
      </div>

      {/* Absence History */}
      <AbsenceHistory absentHistory={absentHistory} />

      {/* Actions */}
      <AttendanceActions />
    </div>
  );
};

export default AttendanceModule;