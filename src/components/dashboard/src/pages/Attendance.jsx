import React from "react";

const Attendance = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Dashboard</h1>
        <p className="text-gray-600">Track your class attendance and maintain academic requirements</p>
      </div>

      {/* Alert */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-lg mb-8 shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="ml-3">
            <strong>Attendance Alert:</strong> You have 1 subject(s) with attendance below 75%. Immediate action required to avoid academic penalties.
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Overall Attendance</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">81.5%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Classes</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">170</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Classes Attended</p>
              <p className="text-2xl font-bold text-green-600 mt-1">138</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Critical Subjects</p>
              <p className="text-2xl font-bold text-red-600 mt-1">1</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Attendance - Full Width with 2 columns */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Subject-wise Attendance
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            ["Data Structures", 27, 32, "Safe"],
            ["Machine Learning", 24, 30, "Safe"],
            ["Software Engineering", 22, 30, "Warning"],
            ["Computer Networks", 20, 29, "Critical"],
            ["Database Management", 26, 31, "Safe"],
            ["Technical Communication", 18, 20, "Safe"]
          ].map(([subject, attended, total, status], i) => {
            const percent = Math.round((attended / total) * 100);
            const color =
              percent >= 85
                ? "bg-gradient-to-r from-green-400 to-green-500"
                : percent >= 75
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                : "bg-gradient-to-r from-red-400 to-red-500";
            const textColor =
              percent >= 85
                ? "text-green-700"
                : percent >= 75
                ? "text-yellow-700"
                : "text-red-700";
            return (
              <div key={i} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{subject}</span>
                  <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                    {attended}/{total} classes
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className={`${color} h-3 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm font-semibold ${textColor}`}>{percent}%</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    status === "Safe" ? "bg-green-100 text-green-700" :
                    status === "Warning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>{status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Visualization - Full Width */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Attendance Visualization</h2>
          <p className="text-sm text-gray-500">Graphical representation of your attendance</p>
        </div>
        
        {/* Chart Container */}
        <div className="relative h-80 bg-white border border-gray-200 rounded-lg p-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-4 bottom-16 flex flex-col justify-between text-xs text-gray-500 w-8">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          
          {/* Grid lines */}
          <div className="absolute left-10 right-4 top-4 bottom-16">
            {[0, 25, 50, 75, 100].map((value, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-dashed border-gray-200"
                style={{ bottom: `${(value / 100) * 100}%` }}
              ></div>
            ))}
          </div>
          
          {/* Bars */}
          <div className="absolute left-10 right-4 top-4 bottom-16 flex items-end justify-between">
            {[
              ["Data Structures", 85],
              ["Machine Learning", 80],
              ["Software Engineering", 74],
              ["Computer Networks", 69],
              ["DB Management", 83],
              ["Tech Communication", 90],
            ].map(([label, percent], i) => {
              const color =
                percent >= 85
                  ? "#3b82f6"
                  : percent >= 75
                  ? "#3b82f6"
                  : "#ef4444";
              const height = (percent / 100) * 100;
              return (
                <div key={i} className="flex flex-col items-center group" style={{ width: "calc(100% / 6 - 8px)" }}>
                  <div className="relative w-full">
                    <div
                      className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        height: `${height * 2.4}px`,
                        backgroundColor: color,
                        minHeight: "4px"
                      }}
                    ></div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {percent}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* X-axis labels */}
          <div className="absolute left-10 right-4 bottom-0 h-16 flex items-start justify-between pt-2">
            {[
              "Data Structures",
              "Machine Learning", 
              "Software Engineering",
              "Computer Networks",
              "DB Management",
              "Tech Communication"
            ].map((label, i) => (
              <div key={i} className="text-xs text-gray-600 text-center leading-tight" style={{ width: "calc(100% / 6 - 8px)" }}>
                <div className="transform -rotate-45 origin-top-left whitespace-nowrap" style={{ transformOrigin: "left top" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 text-sm mt-4">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-700 font-medium">Safe (≥85%)</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
            <span className="text-gray-700 font-medium">Warning (75-85%)</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
            <span className="text-gray-700 font-medium">Critical (&lt;75%)</span>
          </div>
        </div>
      </div>

      {/* Recent Absence History */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Absence History
        </h2>
        <div className="space-y-4">
          {[
            ["Computer Networks", "Medical Leave", "Approved"],
            ["Software Engineering", "Family Emergency", "Approved"],
            ["Computer Networks", "Sick", "Pending"],
            ["Machine Learning", "Technical Issues", "Approved"]
          ].map(([subject, reason, status], i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-4 ${
                  status === "Approved" ? "bg-green-500" :
                  status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                }`}></div>
                <div>
                  <p className="font-semibold text-gray-800">{subject}</p>
                  <p className="text-sm text-gray-600">{reason}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                status === "Approved" ? "bg-green-100 text-green-700" :
                status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                "bg-red-100 text-red-700"
              }`}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-200">
              <svg className="w-8 h-8 text-blue-600 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="font-bold text-gray-900 mb-2">Apply for Leave</p>
            <p className="text-sm text-gray-600">Submit absence request with proper documentation</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="p-4 bg-purple-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-purple-100 transition-colors duration-200">
              <svg className="w-8 h-8 text-purple-600 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="font-bold text-gray-900 mb-2">View Detailed Report</p>
            <p className="text-sm text-gray-600">Month-wise breakdown and analytics</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="p-4 bg-red-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-red-100 transition-colors duration-200">
              <svg className="w-8 h-8 text-red-600 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-bold text-red-600 mb-2">Improvement Plan</p>
            <p className="text-sm text-gray-600">Get personalized attendance tips</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;