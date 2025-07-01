import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  FileText,
  Download,
  Clock,
  AlertTriangle,
  Calendar,
  QrCode,
  Award,
  TrendingUp
} from "lucide-react";

const ExamsModule = ({ user }) => {
  const upcomingExams = [
    {
      subject: "Data Structures",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Block A-101",
      status: "Registered",
      eligible: true
    },
    {
      subject: "Machine Learning",
      date: "2024-02-18",
      time: "2:00 PM",
      venue: "Block B-205",
      status: "Registered",
      eligible: true
    },
    {
      subject: "Software Engineering",
      date: "2024-02-20",
      time: "10:00 AM",
      venue: "Block C-301",
      status: "Pending",
      eligible: false
    },
    {
      subject: "Computer Networks",
      date: "2024-02-22",
      time: "2:00 PM",
      venue: "Block A-102",
      status: "Not Registered",
      eligible: false
    }
  ];

  const semesterResults = [
    { semester: "Semester 7", sgpa: 8.5, cgpa: 8.2, status: "Published", year: "2023-24" },
    { semester: "Semester 6", sgpa: 8.8, cgpa: 8.1, status: "Published", year: "2023-24" },
    { semester: "Semester 5", sgpa: 7.9, cgpa: 7.8, status: "Published", year: "2022-23" },
    { semester: "Semester 4", sgpa: 8.3, cgpa: 7.7, status: "Published", year: "2022-23" }
  ];

  const subjectGrades = [
    { subject: "Data Structures", credits: 4, grade: "A", points: 9, marks: 87 },
    { subject: "Machine Learning", credits: 3, grade: "A+", points: 10, marks: 92 },
    { subject: "Software Engineering", credits: 3, grade: "B+", points: 8, marks: 78 },
    { subject: "Database Management", credits: 4, grade: "A", points: 9, marks: 85 },
    { subject: "Technical Communication", credits: 2, grade: "A+", points: 10, marks: 95 }
  ];

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

  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "bg-green-100 text-green-800";
    if (grade.includes("B")) return "bg-blue-100 text-blue-800";
    if (grade.includes("C")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exams & Results</h1>
          <p className="text-gray-600">Manage exam registration and view academic results</p>
        </div>
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Current CGPA</p><p className="text-2xl font-bold text-blue-600">8.2</p></div><Award className="h-8 w-8 text-blue-500" /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Last SGPA</p><p className="text-2xl font-bold text-green-600">8.5</p></div><TrendingUp className="h-8 w-8 text-green-500" /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Registered Exams</p><p className="text-2xl font-bold text-purple-600">2</p></div><FileText className="h-8 w-8 text-purple-500" /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Pending Exams</p><p className="text-2xl font-bold text-orange-600">2</p></div><Clock className="h-8 w-8 text-orange-500" /></div></CardContent></Card>
      </div>

      {/* Exams and Latest Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Calendar className="mr-2 h-5 w-5 text-blue-500" />Upcoming Exams</CardTitle><CardDescription>Register for exams and download admit cards</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2"><h3 className="font-medium">{exam.subject}</h3><Badge className={getStatusColor(exam.status)}>{exam.status}</Badge></div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p>📅 {exam.date} at {exam.time}</p>
                    <p>📍 {exam.venue}</p>
                  </div>
                  <div className="flex gap-2">
                    {exam.status === "Not Registered" && (
                      <Button size="sm" disabled={!exam.eligible} className="flex-1">
                        {exam.eligible ? "Register" : "Ineligible"}
                      </Button>
                    )}
                    {exam.status === "Registered" && (
                      <Button size="sm" variant="outline" className="flex items-center">
                        <QrCode className="mr-1 h-4 w-4" />Admit Card
                      </Button>
                    )}
                    {exam.status === "Pending" && (
                      <Button size="sm" variant="secondary" disabled>Clear Dues</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center"><Award className="mr-2 h-5 w-5 text-green-500" />Latest Results - Semester 7</CardTitle><CardDescription>Subject-wise grades and performance</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjectGrades.map((subj, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{subj.subject}</p>
                    <p className="text-sm text-gray-600">{subj.credits} Credits • {subj.marks} Marks</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getGradeColor(subj.grade)}>{subj.grade}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{subj.points} Points</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
              <span className="font-medium">Semester GPA:</span>
              <span className="text-xl font-bold text-blue-600">8.5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester-wise Results */}
      <Card>
        <CardHeader><CardTitle>Academic Progress</CardTitle><CardDescription>Semester-wise performance and CGPA trend</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {semesterResults.map((res, i) => (
              <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center"><p className="font-medium">{res.semester}</p><p className="text-sm text-gray-600">{res.year}</p></div>
                  <Badge className={getStatusColor(res.status)}>{res.status}</Badge>
                </div>
                <div className="text-right space-x-6">
                  <span><p className="text-sm text-gray-600">SGPA</p><p className="font-bold text-lg">{res.sgpa}</p></span>
                  <span><p className="text-sm text-gray-600">CGPA</p><p className="font-bold text-lg">{res.cgpa}</p></span>
                  <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle><CardDescription>Exam-related services and requests</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center justify-center p-4 h-auto">
              <FileText className="h-6 w-6 mb-2 text-blue-500" />
              <p className="font-medium">Apply for Revaluation</p>
              <p className="text-sm text-gray-600">Request grade review</p>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center p-4 h-auto">
              <AlertTriangle className="h-6 w-6 mb-2 text-orange-500" />
              <p className="font-medium">Backlog Registration</p>
              <p className="text-sm text-gray-600">Register for failed subjects</p>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center p-4 h-auto">
              <Award className="h-6 w-6 mb-2 text-green-500" />
              <p className="font-medium">Grade Card</p>
              <p className="text-sm text-gray-600">Download official transcript</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamsModule;
