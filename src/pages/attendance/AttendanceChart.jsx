import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AttendanceChart = ({ attendanceData }) => {
  const chartData = attendanceData.map(item => ({
    subject: item.subject.split(' ')[0] + ' ' + item.subject.split(' ')[1],
    percentage: item.percentage,
    fill: item.percentage < 75 ? "#ef4444" : "#1e40af"
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Attendance Visualization</h2>
        <p className="text-sm text-gray-500">Graphical representation of your attendance</p>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{
              bottom: 70 // Increased bottom margin to accommodate labels
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="subject" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              tick={{ fontSize: 12 }} // Slightly smaller font for better fit
            />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar 
              dataKey="percentage" 
              fill="#1e40af"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend - kept exactly the same */}
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
    </div>
  );
};

export default AttendanceChart;