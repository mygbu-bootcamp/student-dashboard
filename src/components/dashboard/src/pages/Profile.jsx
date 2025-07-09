import React, { useState } from "react";
import { Download, Edit, User, GraduationCap, FileText, Award, Mail, Phone, MapPin, Calendar, Star, ChevronRight } from "lucide-react";

const tabs = ["Profile Info", "Academic Details", "Resume Builder"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile Info");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with glassmorphism effect */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-200/50 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Profile & Resume
              </h1>
              <p className="text-sm text-gray-500">Manage your academic profile</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <Download size={16} className="group-hover:animate-bounce" />
              Download Resume
            </button>
            <button className="px-5 py-2.5 bg-white text-gray-700 rounded-xl font-medium flex items-center gap-2 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Enhanced Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl p-1 shadow-lg border border-gray-100">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`relative px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {index === 0 && <User size={16} className="inline mr-2" />}
                {index === 1 && <GraduationCap size={16} className="inline mr-2" />}
                {index === 2 && <FileText size={16} className="inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        {activeTab === "Profile Info" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-black">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  Personal Information
                </h2>
                
                <div className="flex flex-col lg:flex-row gap-8 ">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                        A
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", value: "Aarav Sharma", icon: User },
                      { label: "Email", value: "aarav.sharma@gbu.ac.in", icon: Mail },
                      { label: "Phone", value: "+91 9876543210", icon: Phone },
                      { label: "Address", value: "Greater Noida, UP, India", icon: MapPin },
                    ].map((field, i) => (
                      <div key={i} className="group">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                          <field.icon size={14} />
                          {field.label}
                        </label>
                        <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                          <p className="font-medium text-gray-900">{field.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">About Me</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      Computer Science student passionate about AI/ML and software development. Active in coding competitions and technical projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-black">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Python", "Java", "React", "Machine Learning", "Data Structures"].map((skill, index) => (
                  <span 
                    key={skill} 
                    className="group px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl font-medium border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {skill}
                    <ChevronRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Academic Details */}
        {activeTab === "Academic Details" && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Academic Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-12 -translate-x-12"></div>
              <div className="relative">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-black">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  Academic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "Degree", value: "B.Tech", subtitle: "Computer Science & Engineering", color: "blue" },
                    { label: "CGPA", value: "8.5/10.0", subtitle: "Excellent Performance", color: "green" },
                    { label: "Current Semester", value: "6th", subtitle: "Final Year", color: "purple" },
                    { label: "Credits", value: "142/160", subtitle: "88% Completed", color: "orange" },
                    { label: "Student ID", value: "2021BCS001", subtitle: "Batch 2021", color: "indigo" },
                    { label: "Expected Graduation", value: "2025", subtitle: "Academic Year 2021–2025", color: "pink" },
                  ].map((item, i) => (
                    <div key={i} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200">
                      <div className={`w-12 h-12 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{item.label}</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">{item.value}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-black">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                Certifications & Achievements
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Machine Learning Specialization", provider: "Coursera", year: "2023", level: "Advanced" },
                  { name: "AWS Cloud Practitioner", provider: "Amazon", year: "2024", level: "Professional" },
                  { name: "Google Data Analytics", provider: "Google", year: "2023", level: "Intermediate" },
                ].map((cert, index) => (
                  <div 
                    key={cert.name} 
                    className="group p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{cert.name}</h4>
                        <p className="text-gray-600 mt-1">{cert.provider} • {cert.year}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {cert.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Verified
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resume Builder */}
        {activeTab === "Resume Builder" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Resume Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="text-center">
                  <h3 className="text-4xl font-bold mb-2">Aarav Sharma</h3>
                  <p className="text-blue-100 text-lg mb-4">Computer Science & Engineering Student</p>
                  <div className="flex justify-center items-center gap-6 text-sm">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      aarav.sharma@gbu.ac.in
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone size={16} />
                      +91 9876543210
                    </span>
                  </div>
                </div>
              </div>

              {/* Resume Content */}
              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-100">About</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Computer Science student passionate about AI/ML and software development. Active in coding
                    competitions and technical projects with a strong foundation in algorithms and data structures.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-100">Education</h4>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="font-semibold text-black">B.Tech in Computer Science & Engineering</p>
                    <p className="text-gray-600">Gautam Buddha University</p>
                    <p className="text-blue-600 font-medium">CGPA: 8.5/10.0 • Expected Graduation: 2025</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-100">Technical Skills</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Python", "Java", "React", "Machine Learning", "Data Structures", "Algorithms", "Database Management"].map((skill) => (
                      <span key={skill} className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-4 py-2 rounded-xl font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-100">Key Achievements</h4>
                  <div className="space-y-3">
                    {[
                      "🏆 Dean's List – Semester 5 (Top 10% of class)",
                      "🥇 Winner – CodeFest 2023 (Programming Competition)",
                      "🏅 Best Project Award – Software Engineering Course",
                      "📜 Multiple Industry Certifications (AWS, Google, Coursera)"
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg">{achievement.split(' ')[0]}</span>
                        <span className="text-gray-700">{achievement.slice(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-6">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-3 mx-auto hover:shadow-xl hover:scale-105 transition-all duration-200">
                    <Download size={20} className="group-hover:animate-bounce" />
                    Download Professional Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;