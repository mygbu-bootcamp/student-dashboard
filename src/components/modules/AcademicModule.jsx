import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import {
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Download,
  CheckCircle,
  FileText
} from "lucide-react";

const AcademicModule = ({ user }) => {
  const [selectedSemester, setSelectedSemester] = useState("6");

  const subjects = [
    { code: "CSE301", name: "Data Structures & Algorithms", credits: 4, type: "Core", grade: "A", gpa: 9 },
    { code: "CSE302", name: "Machine Learning", credits: 3, type: "Core", grade: "A+", gpa: 10 },
    { code: "CSE303", name: "Software Engineering", credits: 3, type: "Core", grade: "B+", gpa: 8 },
    { code: "CSE304", name: "Computer Networks", credits: 4, type: "Core", grade: "A", gpa: 9 },
    { code: "CSE305", name: "Database Management", credits: 3, type: "Core", grade: "A", gpa: 9 },
    { code: "HUM201", name: "Technical Communication", credits: 2, type: "Elective", grade: "B+", gpa: 8 }
  ];

  const electiveOptions = [
    { code: "CSE401", name: "Artificial Intelligence", credits: 3, prerequisite: "CGPA > 8.0" },
    { code: "CSE402", name: "Blockchain Technology", credits: 3, prerequisite: "CGPA > 7.5" },
    { code: "CSE403", name: "Cloud Computing", credits: 3, prerequisite: "CGPA > 7.0" },
    { code: "CSE404", name: "Cybersecurity", credits: 3, prerequisite: "CGPA > 8.0" }
  ];

  const timetable = [
    { day: "Monday", slots: [
      { time: "9:00-10:00", subject: "Machine Learning", room: "Lab 204", type: "Lab" },
      { time: "10:00-11:00", subject: "Data Structures", room: "Room 301", type: "Theory" },
      { time: "11:00-12:00", subject: "Software Engineering", room: "Room 205", type: "Theory" }
    ]},
    { day: "Tuesday", slots: [
      { time: "9:00-10:00", subject: "Computer Networks", room: "Room 302", type: "Theory" },
      { time: "10:00-11:00", subject: "Database Management", room: "Lab 201", type: "Lab" },
      { time: "2:00-3:00", subject: "Technical Communication", room: "Room 101", type: "Theory" }
    ]},
    { day: "Wednesday", slots: [
      { time: "9:00-10:00", subject: "Data Structures", room: "Room 301", type: "Theory" },
      { time: "11:00-12:00", subject: "Machine Learning", room: "Room 304", type: "Theory" },
      { time: "2:00-4:00", subject: "Software Engineering", room: "Lab 205", type: "Lab" }
    ]}
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Management</h1>
          <p className="text-gray-600">Course registration, timetable, and academic progress</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        {/* Registration Tab */}
        <TabsContent value="registration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Semester Registration - Spring 2024
              </CardTitle>
              <CardDescription>Complete your semester registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Student Information</h3>
                  <div className="space-y-3">
                    <Input value={user?.studentId} disabled className="bg-gray-50" placeholder="Roll Number" />
                    <Input value={user?.name} disabled className="bg-gray-50" placeholder="Full Name" />
                    <Input value={user?.programme} disabled className="bg-gray-50" placeholder="Programme" />
                    <Input value={user?.branch} disabled className="bg-gray-50" placeholder="Branch" />
                  </div>
                </div>

                {/* Registration Fields */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Registration Details</h3>
                  <div className="space-y-3">
                    <Input placeholder="Enter current address" />
                    <Input placeholder="Enter contact number" />
                    <Input placeholder="Enter Aadhar number" />
                    <Input placeholder="Enter guardian name" />
                    <Input placeholder="Enter guardian contact" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium text-green-800">Fee Payment Status</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  All fees for Semester 6 have been cleared. Registration is enabled.
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline">Save Draft</Button>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  Submit Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Subjects - Semester {user?.semester}</CardTitle>
              </CardHeader>
              <CardContent>
                {subjects.map(subject => (
                  <div key={subject.code} className="p-3 border rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-gray-600">{subject.code}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={subject.type === "Core" ? "default" : "secondary"}>{subject.type}</Badge>
                        <p className="text-sm mt-1">{subject.credits} Credits</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Grade</span>
                      <span className="text-green-600 font-medium">{subject.grade}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Electives</CardTitle>
              </CardHeader>
              <CardContent>
                {electiveOptions.map(elective => (
                  <div key={elective.code} className="p-3 border rounded-lg space-y-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{elective.name}</p>
                        <p className="text-sm text-gray-600">{elective.code}</p>
                      </div>
                      <p className="text-sm font-medium">{elective.credits} Credits</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{elective.prerequisite}</span>
                      <Button size="sm" variant="outline">Select</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timetable Tab */}
        <TabsContent value="timetable">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Weekly Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timetable.map(day => (
                  <div key={day.day} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">{day.day}</h3>
                    {day.slots.map((slot, index) => (
                      <div key={index} className="flex justify-between p-2 bg-gray-50 rounded items-center">
                        <div className="flex space-x-3 items-center">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{slot.time}</span>
                          <span className="text-sm font-medium">{slot.subject}</span>
                        </div>
                        <div className="text-right">
                          <Badge variant={slot.type === "Lab" ? "secondary" : "outline"}>{slot.type}</Badge>
                          <p className="text-xs text-gray-500">{slot.room}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-green-600">8.5</p>
                  <p className="text-sm text-gray-600">Current CGPA</p>
                </div>
                {[82, 84, 86, 83, 87].map((val, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Semester {i + 1}</span>
                      <span>{(val / 10).toFixed(1)}</span>
                    </div>
                    <Progress value={val} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                  Credit Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-blue-600">142/160</p>
                  <p className="text-sm text-gray-600">Credits Completed</p>
                </div>
                {[
                  { label: "Core Subjects", value: "96/120", percent: 80 },
                  { label: "Electives", value: "30/25", percent: 100 },
                  { label: "Project Work", value: "16/15", percent: 100 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <Progress value={item.percent} className="h-2" />
                  </div>
                ))}
                <div className="p-3 mt-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    On track for graduation! 18 credits remaining.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicModule;
