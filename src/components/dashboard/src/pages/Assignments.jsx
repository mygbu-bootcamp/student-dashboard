import React, { useState } from "react";
import {
  Bell,
  User,
  UploadCloud,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  BarChart2,
  Eye,
  MessageCircle,
  Upload,
  Star,
} from "lucide-react";

const Assignments = () => {
  const [activeTab, setActiveTab] = useState("Assignments");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl font-bold text-black">Assignments & Projects</h1>
              <p className="text-gray-600 mt-1">Track your assignments, submissions, and project progress</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
                Submit Assignment
              </button>
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
              <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-black mt-1">1</p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-black mt-1">1</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold text-blue-600">84%</p>
                    <Star className="w-5 h-5 text-blue-600 fill-current" />
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <BarChart2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projects</p>
                  <p className="text-2xl font-bold text-black mt-1">2</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <ClipboardList className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex gap-8 px-6 border-b">
          {["Assignments", "Projects", "Submissions"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab 
                  ? "text-black border-b-2 border-black" 
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Based on Tab */}
      <div className="px-6 mt-6 space-y-6">
        {activeTab === "Assignments" && (
          <>
            {/* Assignment 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-red-400 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-black">Neural Networks Implementation</h2>
                  <p className="text-gray-600 mt-1">Machine Learning</p>
                  <p className="mt-3 text-gray-700">
                    Implement a neural network from scratch using Python and NumPy.
                  </p>
                  <div className="mt-3 text-sm text-gray-500">Due: January 25, 2024</div>
                </div>
                <div className="flex gap-2 ml-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">High Priority</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Pending</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <UploadCloud className="w-4 h-4" /> Submit
                </button>
                <button className="border border-gray-300 px-6 py-2 rounded-lg text-black hover:bg-gray-50 transition-colors">View Details</button>
              </div>
            </div>

            {/* Assignment 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-green-400 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-black">Database Design Project</h2>
                  <p className="text-gray-600 mt-1">Database Management</p>
                  <p className="mt-3 text-gray-700">
                    Design and implement a complete database system for a library management system.
                  </p>
                  <div className="mt-3 text-sm text-gray-500">Due: January 30, 2024</div>
                </div>
                <div className="flex gap-2 ml-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Medium Priority</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Submitted</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-black">Score: 84%</span>
                  <span className="text-sm text-gray-500">Graded</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "84%" }}></div>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-black font-medium">Faculty Feedback:</p>
                  <p className="text-sm text-gray-700 mt-1">Good implementation, but could improve normalization.</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="border border-gray-300 px-6 py-2 rounded-lg text-black hover:bg-gray-50 transition-colors">View Details</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "Projects" && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-black">Smart Campus Management System</h2>
                  <p className="text-gray-600 mt-1">Mentor: Dr. Amit Sharma</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">In Progress</span>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-black">Overall Progress</span>
                  <span className="text-sm font-medium text-black">40%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { name: "Requirements Analysis", status: "Completed", color: "green", due: "1/15/2024" },
                  { name: "System Design", status: "Completed", color: "green", due: "2/1/2024" },
                  { name: "Implementation", status: "In Progress", color: "blue", due: "3/15/2024" },
                  { name: "Testing", status: "Pending", color: "gray", due: "4/1/2024" },
                  { name: "Deployment", status: "Pending", color: "gray", due: "4/15/2024" },
                ].map((phase) => (
                  <div key={phase.name} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          phase.color === "green"
                            ? "bg-green-500"
                            : phase.color === "blue"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <p className="font-medium text-black">{phase.name}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full font-medium ${
                          phase.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : phase.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {phase.status}
                      </span>
                      <span className="text-gray-500">Due: {phase.due}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Team Members Section within the same card */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-black mb-4">Team Members</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { name: "Aarav Sharma", role: "Team Lead", avatar: "AS" },
                    { name: "Priya Singh", role: "Developer", avatar: "PS" },
                    { name: "Rahul Kumar", role: "Designer", avatar: "RK" }
                  ].map((member) => (
                    <div key={member.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-black">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Update Progress
                  </button>
                  <button className="border border-gray-300 px-6 py-2 rounded-lg text-black hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="border border-gray-300 px-6 py-2 rounded-lg text-black hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Team Chat
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Submissions" && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-black mb-6">Submit New Assignment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Assignment Title</label>
                <input
                  type="text"
                  placeholder="Enter assignment title"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Comments/Notes</label>
                <textarea
                  rows="4"
                  placeholder="Add any additional comments or notes"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
                <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-black font-medium">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">Supported: PDF, DOC, DOCX, ZIP (Max 10MB)</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Submit Assignment</button>
                <button className="border border-gray-300 px-6 py-3 rounded-lg text-black hover:bg-gray-50 transition-colors">Save Draft</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;