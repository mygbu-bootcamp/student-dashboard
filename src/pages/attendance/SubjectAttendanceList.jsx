import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";

const SubjectAttendanceList = ({ attendanceData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Safe": return "text-green-600 bg-green-100";
      case "Warning": return "text-yellow-600 bg-yellow-100";
      case "Critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Attendance</CardTitle>
        <CardDescription>Detailed attendance breakdown for each subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attendanceData.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{subject.subject}</p>
                  <p className="text-sm text-gray-600">
                    {subject.present}/{subject.total} classes attended
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(subject.status)}>
                    {subject.percentage.toFixed(1)}%
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{subject.status}</p>
                </div>
              </div>
              <Progress 
                value={subject.percentage} 
                className={`h-2 ${
                  subject.percentage < 75 ? '[&>div]:bg-red-500' : 
                  subject.percentage < 85 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
                }`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectAttendanceList;
