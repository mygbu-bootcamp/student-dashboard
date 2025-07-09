import React, { useState } from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Users,
  UploadCloud,
  Star,
} from "lucide-react";

const Placement = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "Job Portal", "Resume Builder", "Alumni Mentors"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-blue-700 mx-6 px-8 py-8 text-white rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">Placement & Career Center</h1>
        <p className="text-base opacity-90">Your gateway to internships, jobs, and career guidance</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-around bg-white shadow-md mx-6 px-8 py-4 mt-4 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-6 font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {activeTab === "Dashboard" && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryCard icon={<Briefcase size={28} className="text-blue-500" />} label="Applications" count="3" />
              <SummaryCard icon={<CheckCircle size={28} className="text-green-500" />} label="Selected" count="1" />
              <SummaryCard icon={<Clock size={28} className="text-orange-500" />} label="Pending" count="2" />
              <SummaryCard icon={<Users size={28} className="text-purple-500" />} label="Mentors" count="5" />
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-1">Recent Applications</h2>
              <p className="text-gray-500 text-sm mb-6">Track your job and internship applications</p>
              <div className="space-y-4">
                <ApplicationCard
                  title="Software Developer"
                  company="TCS"
                  package="₹3.5 LPA"
                  date="2024-03-15"
                  status="Applied"
                  type="Full-time"
                />
                <ApplicationCard
                  title="System Engineer"
                  company="Infosys"
                  package="₹4.0 LPA"
                  date="2024-03-20"
                  status="Interview Scheduled"
                  type="Full-time"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "Job Portal" && (
          <>
            <JobPortalCard
              role="Software Engineer Intern"
              company="Microsoft"
              location="Bangalore"
              package="₹50,000/month"
              deadline="2024-04-15"
              skills={["Python", "React", "Database"]}
              match="92%"
              type="Internship"
            />
            <JobPortalCard
              role="Cloud Support Engineer"
              company="Amazon"
              location="Hyderabad"
              package="₹6.5 LPA"
              deadline="2024-04-20"
              skills={["Cloud", "Linux", "Networking"]}
              match="85%"
              type="Full-time"
            />
          </>
        )}

        {activeTab === "Resume Builder" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <UploadCloud size={40} className="mx-auto text-blue-600 mb-4" />
              <p className="mb-2">Upload your resume (PDF, DOC)</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Choose File</button>
              <button className="mt-4 block w-full bg-gray-800 text-white py-2 rounded">Update Resume</button>
            </div>

            {/* Resume Analysis */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-1">Resume Analysis</h3>
              <p className="text-gray-500 text-sm mb-6">AI-powered resume insights</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Overall Score</span>
                  <span className="text-green-600 font-semibold">85/100</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">ATS Compatibility</span>
                  <span className="text-blue-600 font-semibold">Good</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Skill Matches</span>
                  <span className="text-purple-600 font-semibold">12/15</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Suggestions:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Add more technical skills
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Include project quantifications
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Update contact information
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Alumni Mentors" && (
          <div className="grid md:grid-cols-3 gap-6">
            <MentorCard name="Priya Sharma" company="Microsoft" title="Senior Software Engineer" rating="4.8" experience="8 years" sessions="12" tag="Full Stack Development" />
            <MentorCard name="Rahul Gupta" company="Amazon" title="Product Manager" rating="4.9" experience="6 years" sessions="8" tag="Product Management" />
            <MentorCard name="Anjali Verma" company="Google" title="Data Scientist" rating="4.7" experience="5 years" sessions="15" tag="Machine Learning" />
          </div>
        )}
      </div>
    </div>
  );
};

// Components

const SummaryCard = ({ icon, label, count }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col items-center">
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-bold">{count}</div>
    <div className="text-gray-500">{label}</div>
  </div>
);

const ApplicationCard = ({ title, company, package: pkg, date, status, type }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
    <div className="flex-1">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{company} • {pkg}</p>
      <p className="text-sm text-gray-500">Applied: {date}</p>
    </div>
    <div className="text-right">
      <div className="mb-2">
        <span className="inline-block text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{status}</span>
      </div>
      <div className="text-xs text-gray-500">{type}</div>
    </div>
  </div>
);

const JobPortalCard = ({ role, company, location, package: pkg, deadline, skills, match, type }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm space-y-3">
    <div className="flex justify-between">
      <div>
        <h3 className="text-lg font-semibold">{role}</h3>
        <p className="text-sm text-gray-600">{company} • {location}</p>
        <p className="text-sm mt-1">Package: {pkg}</p>
        <p className="text-sm text-gray-500">Deadline: {deadline}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map(skill => (
            <span key={skill} className="text-xs bg-gray-200 px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <p className="text-yellow-600 font-bold">{match} Match</p>
        <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">{type}</span>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <button className="bg-gray-900 text-white px-4 py-2 rounded w-5/5">Apply Now</button>
      <div className="flex gap-2">
        <button className="border border-gray-300 px-4 py-2 rounded flex-1">View Details</button>
        <button className="border border-gray-300 px-4 py-2 rounded flex-1">Save</button>
      </div>
    </div>
  </div>
);

const MentorCard = ({ name, company, title, experience, sessions, rating, tag }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
    <div className="text-5xl mb-2">👤</div>
    <h3 className="font-semibold">{name}</h3>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-sm text-gray-600">{company}</p>
    <p className="text-sm mt-2">Experience: <strong>{experience}</strong></p>
    <p className="text-sm">Sessions: <strong>{sessions}</strong></p>
    <p className="text-sm mb-2 flex items-center justify-center gap-1">
      <Star size={16} className="text-yellow-500" /> {rating}
    </p>
    <span className="inline-block bg-gray-200 text-sm px-3 py-1 rounded-full mb-3">{tag}</span>
    <button className="bg-gray-900 text-white px-4 py-2 rounded w-full">Connect</button>
  </div>
);

export default Placement;