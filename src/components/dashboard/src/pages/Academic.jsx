import React, { useState } from "react";
import { GraduationCap, Download, Calendar, BookOpen, TrendingUp, Users, Clock, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const tabs = ["Registration", "Courses", "Timetable", "Progress"];

const Academic = () => {
  const [activeTab, setActiveTab] = useState("Registration");

  const tabStyle = (tab) =>
    `px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
      activeTab === tab 
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900">
      {/* Header with glassmorphism effect */}
      <header className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Academic Portal
                </h1>
                <p className="text-sm text-gray-500">Student Management System</p>
              </div>
            </div>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <Download className="w-4 h-4 mr-2 inline-block group-hover:animate-bounce" />
              Download Transcript
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <nav className="flex space-x-2 mb-8 p-2 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tabStyle(tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Registration" && <Users className="w-4 h-4 mr-2 inline-block" />}
              {tab === "Courses" && <BookOpen className="w-4 h-4 mr-2 inline-block" />}
              {tab === "Timetable" && <Calendar className="w-4 h-4 mr-2 inline-block" />}
              {tab === "Progress" && <TrendingUp className="w-4 h-4 mr-2 inline-block" />}
              {tab}
            </button>
          ))}
        </nav>

        {/* Registration Tab */}
        {activeTab === "Registration" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Semester Registration - Spring 2024
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Information</h3>
                  {[
                    { label: "Roll Number", value: "2021BCS001", disabled: true },
                    { label: "Full Name", value: "Aarav Sharma", disabled: true },
                    { label: "Programme", value: "B.Tech", disabled: true },
                    { label: "Branch", value: "Computer Science & Engineering", disabled: true }
                  ].map((field, idx) => (
                    <div key={idx} className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                      <input 
                        disabled={field.disabled}
                        value={field.value}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 group-hover:border-blue-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
                  {[
                    { label: "Current Address", placeholder: "Enter your current address" },
                    { label: "Contact Number", placeholder: "Enter your contact number" },
                    { label: "Aadhar Number", placeholder: "Enter your Aadhar number" },
                    { label: "Guardian Name", placeholder: "Enter guardian's name" },
                    { label: "Guardian Contact", placeholder: "Enter guardian's contact" }
                  ].map((field, idx) => (
                    <div key={idx} className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                      <input 
                        placeholder={field.placeholder}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 group-hover:border-blue-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee Status */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Fee Payment Status - Cleared</p>
                    <p className="text-green-700">All fees for Semester 6 have been cleared. Registration is enabled.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8">
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                  Save Draft
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                  Submit Registration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "Courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            {/* Current Subjects */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Current Subjects - Semester 6
              </h2>
              <div className="space-y-4">
                {["Data Structures & Algorithms", "Machine Learning", "Software Engineering", "Computer Networks", "Database Management", "Technical Communication"].map((subj, index) => (
                  <div key={index} className="group p-5 border-2 border-gray-200 rounded-2xl transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{subj}</p>
                        <p className="text-sm text-gray-500 mt-1">Core Subject • 4 Credits</p>
                      </div>
                      <div className="text-right">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Current Grade</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Electives */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Available Electives
              </h2>
              <div className="space-y-4">
                {["Artificial Intelligence", "Blockchain Technology", "Cloud Computing", "Cybersecurity"].map((elec, index) => (
                  <div key={index} className="group p-5 border-2 border-gray-200 rounded-2xl transition-all duration-300 hover:border-black hover:shadow-lg hover:shadow-purple-500/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{elec}</p>
                        <p className="text-sm text-gray-500 mt-1">Elective • 3 Credits</p>
                      </div>
                      <button className="px-6 py-2 bg-black text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timetable Tab */}
        {activeTab === "Timetable" && (
  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-2 text-gray-800 flex items-center">
      <Calendar className="w-6 h-6 mr-2 text-blue-600" />
      Weekly Timetable
    </h2>
    <p className="text-gray-500 mb-6">Your class schedule for the current semester</p>

    <div className="space-y-10">
      {[
        {
          day: "Monday",
          slots: [
            { time: "9:00–10:00", subject: "Machine Learning", type: "Lab", room: "Lab 204" },
            { time: "10:00–11:00", subject: "Data Structures", type: "Theory", room: "Room 301" },
            { time: "11:00–12:00", subject: "Software Engineering", type: "Theory", room: "Room 205" },
          ],
        },
        {
          day: "Tuesday",
          slots: [
            { time: "9:00–10:00", subject: "Computer Networks", type: "Theory", room: "Room 302" },
            { time: "10:00–11:00", subject: "Database Management", type: "Lab", room: "Lab 201" },
            { time: "2:00–3:00", subject: "Technical Communication", type: "Theory", room: "Room 101" },
          ],
        },
        {
          day: "Wednesday",
          slots: [
            { time: "9:00–10:00", subject: "Data Structures", type: "Theory", room: "Room 301" },
          ],
        },
      ].map((dayBlock, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{dayBlock.day}</h3>
          <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            {dayBlock.slots.map((slot, i) => (
              <div key={i} className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center space-x-4 text-gray-800">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{slot.time}</span>
                  <span className="text-sm">{slot.subject}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${slot.type === "Lab"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-800"
                    }`}>
                    {slot.type}
                  </span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{slot.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        {/* Progress Tab */}
        {activeTab === "Progress" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            {/* Academic Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Academic Progress
                </h2>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl">
                    <span className="text-4xl font-bold text-white">8.5</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-600 shadow-lg">
                    CGPA
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5"].map((sem, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{sem}</span>
                      <span className="text-sm font-bold text-green-600">8.{idx + 3}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${80 + idx * 4}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Credit Progress
                </h2>
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>

              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">142</div>
                      <div className="text-sm text-white/80">/160</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-600 shadow-lg">
                    Credits
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Core Subjects", progress: 95 },
                  { label: "Electives", progress: 80 },
                  { label: "Project Work", progress: 60 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-bold text-blue-600">{item.progress}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">On track for graduation!</p>
                    <p className="text-sm text-green-700">18 credits remaining to complete your degree.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Academic;