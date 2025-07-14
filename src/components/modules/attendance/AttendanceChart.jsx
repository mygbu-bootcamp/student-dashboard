import React from 'react';

const AttendanceChart = ({ attendanceData }) => {
  const defaultData = [
    { subject: 'Data Structures', percentage: 88 },
    { subject: 'Machine Learning', percentage: 80 },
    { subject: 'Software Engineering', percentage: 78 },
    { subject: 'Computer Networks', percentage: 68 },
    { subject: 'Database Management', percentage: 85 },
    { subject: 'Communication', percentage: 92 }
  ];

  const data = attendanceData || defaultData;

  const getBarClass = (percentage) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Attendance Visualization</h2>
        <p className="text-gray-600 text-sm">Graphical representation of your attendance</p>
      </div>

      <div className="relative">
        {/* Chart container */}
        <div className="relative h-80 mb-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* Grid lines */}
          <div className="absolute left-8 top-0 right-0 h-full">
            <div className="relative h-full">
              {[0, 25, 50, 75, 100].map((value) => (
                <div
                  key={value}
                  className="absolute w-full border-t border-gray-200"
                  style={{ bottom: `${value}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bars container */}
          <div className="absolute left-8 bottom-0 right-0 h-full flex items-end justify-between gap-2">
            {data.map((item, index) => (
              <div key={index} className="w-full max-w-16 flex flex-col items-center h-full">
                {/* Bar */}
                <div className="relative w-full group h-full flex items-end">
                  <div
                    className={`w-full rounded-t ${getBarClass(item.percentage)} transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${item.percentage}%` }}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.percentage}%
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex items-start justify-between gap-2 ml-8">
          {data.map((item, index) => (
            <div key={index} className="w-full max-w-16 text-center">
              <span className="text-xs text-gray-600 block break-words leading-tight">
                {item.subject}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
          <span>Safe (≥85%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
          <span>Warning (75–84%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
          <span>Critical (&lt;75%)</span>
        </div>
      </div>
    </div>
  );
};

// Example usage
const App = () => {
  const attendanceData = [
    { subject: 'Data Structures', percentage: 88 },
    { subject: 'Machine Learning', percentage: 80 },
    { subject: 'Software Engineering', percentage: 78 },
    { subject: 'Computer Networks', percentage: 68 },
    { subject: 'Database Management', percentage: 85 },
    { subject: 'Communication', percentage: 92 }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <AttendanceChart attendanceData={attendanceData} />
    </div>
  );
};

export default App;
