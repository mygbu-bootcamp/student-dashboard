import React from "react";
import {
  FileText,
  Download,
  Clock,
  AlertTriangle,
  Calendar,
  QrCode,
  Award,
  TrendingUp,
  ClipboardList, 
  Star 
} from "lucide-react";
import StatsCard from '../components/Statscard'; 

const ExamsModule = ({ user }) => {
  const upcomingExams = [
    {
      subject: "Data Structures",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Block A-101",
      status: "Registered",
      eligible: true,
    },
    {
      subject: "Machine Learning",
      date: "2024-02-18",
      time: "2:00 PM",
      venue: "Block B-205",
      status: "Registered",
      eligible: true,
    },
    {
      subject: "Software Engineering",
      date: "2024-02-20",
      time: "10:00 AM",
      venue: "Block C-301",
      status: "Pending",
      eligible: false,
    },
    {
      subject: "Computer Networks",
      date: "2024-02-22",
      time: "2:00 PM",
      venue: "Block A-102",
      status: "Not Registered",
      eligible: false,
    },
  ];

  const semesterResults = [
    { semester: "Semester 7", sgpa: 8.5, cgpa: 8.2, status: "Published", year: "2023-24" },
    { semester: "Semester 6", sgpa: 8.8, cgpa: 8.1, status: "Published", year: "2023-24" },
    { semester: "Semester 5", sgpa: 7.9, cgpa: 7.8, status: "Published", year: "2022-23" },
    { semester: "Semester 4", sgpa: 8.3, cgpa: 7.7, status: "Published", year: "2022-23" },
    { semester: "Semester 2", sgpa: 7.5, cgpa: 7.2, status: "Published", year: "2021-22" },
    { semester: "Semester 1", sgpa: 7.0, cgpa: 7.0, status: "Published", year: "2021-22" },
  ];

  const subjectGrades = [
    { subject: "Data Structures", credits: 4, grade: "A", points: 9, marks: 87 },
    { subject: "Machine Learning", credits: 3, grade: "A+", points: 10, marks: 92 },
    { subject: "Software Engineering", credits: 3, grade: "B+", points: 8, marks: 78 },
    { subject: "Database Management", credits: 4, grade: "A", points: 9, marks: 85 },
    { subject: "Technical Communication", credits: 2, grade: "A+", points: 10, marks: 95 }
  ];

  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Registered":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Not Registered":
        return "bg-red-100 text-red-800";
      case "Published":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to determine grade badge color
  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "bg-green-100 text-green-800";
    if (grade.includes("B")) return "bg-blue-100 text-blue-800";
    if (grade.includes("C")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Group semester results by year
  const groupedSemesterResults = semesterResults.reduce((acc, result) => {
    if (!acc[result.year]) {
      acc[result.year] = {
        latestSGPA: result.sgpa, // Assuming the first encounter for a year is the latest (if sorted descending)
        semesters: []
      };
    }
    acc[result.year].semesters.push(result);
    return acc;
  }, {});

  // Sort years in descending order (e.g., "2023-24" before "2022-23")
  const sortedYears = Object.keys(groupedSemesterResults).sort().reverse();

  // Calculate stats for the StatsCard
  const currentCGPA = semesterResults.length > 0 ? semesterResults[0].cgpa : 'N/A';
  const lastSGPA = semesterResults.length > 0 ? semesterResults[0].sgpa : 'N/A';
  const registeredExams = upcomingExams.filter(exam => exam.status === "Registered").length;
  const pendingExams = upcomingExams.filter(exam => exam.status === "Pending" || exam.status === "Not Registered").length;


  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 py-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Exams & Results</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage exam registration and view academic results
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent h-10 px-4 py-2 w-full sm:w-auto
          hover:scale-105 duration-200 cursor-pointer shadow-sm hover:shadow-md">
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </button>
      </div>

      {/* Overview Cards using StatsCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Current CGPA"
          value={currentCGPA}
          icon={Award}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Last SGPA"
          value={lastSGPA}
          icon={TrendingUp}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Registered Exams"
          value={registeredExams}
          icon={FileText}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatsCard
          title="Pending Exams"
          value={pendingExams}
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
      </div>

      {/* Upcoming Exams & Latest Results */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upcoming Exams Card */}
        <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center text-lg font-semibold leading-none tracking-tight">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Upcoming Exams
            </div>
            <p className="text-sm text-muted-foreground">Register for exams and download admit cards</p>
          </div>
          <div className="p-6 space-y-4">
            {upcomingExams.map((exam, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <h3 className="font-medium">{exam.subject}</h3>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📅 {exam.date} at {exam.time}</p>
                  <p>📍 {exam.venue}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {exam.status === "Not Registered" && (
                    <button
                      disabled={!exam.eligible}
                      className={`inline-flex items-center bg-gray-800 text-white justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 flex-1
                      hover:scale-105 duration-200 cursor-pointer shadow-sm hover:shadow-md ${!exam.eligible ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {exam.eligible ? "Register" : "Ineligible"}
                    </button>
                  )}
                  {exam.status === "Registered" && (
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 flex-1 sm:flex-none
                      hover:scale-105 duration-200 cursor-pointer shadow-sm hover:shadow-md">
                      <QrCode className="mr-1 h-4 w-4" />
                      Admit Card
                    </button>
                  )}
                  {exam.status === "Pending" && (
                    <button disabled className="inline-flex bg-gray-800 text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3 flex-1
                      opacity-50 cursor-not-allowed">
                      Clear Dues
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Results Card */}
        <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center text-lg font-semibold leading-none tracking-tight">
              <Award className="mr-2 h-5 w-5 text-green-500" />
              Latest Results - Semester 7
            </div>
            <p className="text-sm text-muted-foreground">Subject-wise grades and performance</p>
          </div>
          <div className="p-6 space-y-3">
            {subjectGrades.map((subj, i) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border border-gray-200 rounded-lg gap-2 shadow-sm">
                <div>
                  <p className="font-medium">{subj.subject}</p>
                  <p className="text-sm text-gray-600">{subj.credits} Credits • {subj.marks} Marks</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getGradeColor(subj.grade)}`}>
                    {subj.grade}
                  </span>
                  <p className="text-xs text-gray-500 mt-1 text-right">{subj.points} Points</p>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center shadow-inner">
              <span className="font-medium">Semester GPA:</span>
              <span className="text-xl font-bold text-blue-600">8.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Progress Card (Restructured) */}
      <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Academic Progress</h3>
          <p className="text-sm text-muted-foreground">Semester-wise performance and CGPA trend</p>
        </div>
        <div className="p-6 space-y-6">
          {sortedYears.map((year, yearIndex) => (
            <div key={yearIndex} className="border border-gray-200 rounded-lg p-4 shadow-md bg-gray-50">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h4 className="font-semibold text-lg text-gray-800">{year}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Latest CGPA:</span>
                  <span className="font-bold text-xl text-blue-600">{groupedSemesterResults[year].semesters[0]?.cgpa || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-3">
                {groupedSemesterResults[year].semesters
                  .sort((a, b) => {
                    const semA = parseInt(a.semester.match(/\d+/)[0]);
                    const semB = parseInt(b.semester.match(/\d+/)[0]);
                    return semB - semA;
                  })
                  .map((res, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border border-gray-100 rounded-lg gap-4 bg-white shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-center sm:text-left">
                          <p className="font-medium">{res.semester}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(res.status)}`}>
                          {res.status}
                        </span>
                      </div>
                      <div className="flex justify-between gap-6 w-full sm:w-auto text-sm text-gray-600">
                        <div className="text-center">
                          <p>SGPA</p>
                          <p className="font-bold text-lg">{res.sgpa}</p>
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3
                          hover:scale-105 duration-200 cursor-pointer shadow-sm hover:shadow-md">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Exam-related services and requests</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Apply for Revaluation Button */}
            <button className="inline-flex flex-col items-center justify-center rounded-md text-sm font-medium ring-offset-background duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground p-4 h-auto text-center
              hover:-translate-y-1 hover:border-blue-500 shadow-sm cursor-pointer">
              <FileText className="h-6 w-6 mb-2 text-blue-500" />
              <p className="font-medium">Apply for Revaluation</p>
              <p className="text-sm text-gray-600">Request grade review</p>
            </button>
            {/* Backlog Registration Button */}
            <button className="inline-flex flex-col items-center justify-center rounded-md text-sm font-medium ring-offset-background duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground p-4 h-auto text-center
              hover:-translate-y-1 hover:border-orange-500 shadow-sm cursor-pointer">
              <AlertTriangle className="h-6 w-6 mb-2 text-orange-500" />
              <p className="font-medium">Backlog Registration</p>
              <p className="text-sm text-gray-600">Register for failed subjects</p>
            </button>
            {/* Grade Card Button */}
            <button className="inline-flex flex-col items-center justify-center rounded-md text-sm font-medium ring-offset-background duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground p-4 h-auto text-center
              hover:-translate-y-1 hover:border-green-500 shadow-sm cursor-pointer">
              <Award className="h-6 w-6 mb-2 text-green-500" />
              <p className="font-medium">Grade Card</p>
              <p className="text-sm text-gray-600">Download official transcript</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsModule;