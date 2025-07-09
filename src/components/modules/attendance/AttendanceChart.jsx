import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AttendanceChart = ({ attendanceData }) => {
  const chartData = attendanceData.map(item => ({
    subject: item.subject.split(' ')[0] + ' ' + item.subject.split(' ')[1],
    percentage: item.percentage,
    fill: item.percentage < 75 ? "#ef4444" : "#1e40af"
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Visualization</CardTitle>
        <CardDescription>Graphical representation of your attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar 
              dataKey="percentage" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Safe (≥85%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
            <span>Warning (75-85%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Critical (&lt;75%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
