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
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Subject-wise Attendance</h2>
        <p className="text-sm text-gray-500">Detailed attendance breakdown for each subject</p>
      </div>

      {/* Content */}
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
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(subject.status)}`}>
                  {subject.percentage.toFixed(1)}%
                </span>
                <p className="text-xs text-gray-500 mt-1">{subject.status}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full rounded ${
                  subject.percentage < 75
                    ? "bg-red-500"
                    : subject.percentage < 85
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${subject.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectAttendanceList;
