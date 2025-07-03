import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  ClipboardList,
  Upload,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Eye,
  Download,
  Star,
  MessageSquare
} from "lucide-react";

const AssignmentsModule = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const assignments = [
    {
      id: 1,
      title: "Neural Networks Implementation",
      subject: "Machine Learning",
      dueDate: "2024-01-25",
      submittedDate: null,
      status: "Pending",
      priority: "High",
      description: "Implement a neural network from scratch using Python and NumPy",
      maxMarks: 100,
      obtainedMarks: null,
      feedback: null
    },
    {
      id: 2,
      title: "Database Design Project",
      subject: "Database Management",
      dueDate: "2024-01-30",
      submittedDate: "2024-01-20",
      status: "Submitted",
      priority: "Medium",
      description: "Design and implement a complete database system for a library management system",
      maxMarks: 50,
      obtainedMarks: 42,
      feedback: "Good implementation, but could improve normalization"
    },
    {
      id: 3,
      title: "Software Requirements Document",
      subject: "Software Engineering",
      dueDate: "2024-02-05",
      submittedDate: null,
      status: "In Progress",
      priority: "Medium",
      description: "Create a comprehensive SRS document for an e-commerce application",
      maxMarks: 75,
      obtainedMarks: null,
      feedback: null
    },
    {
      id: 4,
      title: "Network Security Analysis",
      subject: "Computer Networks",
      dueDate: "2024-01-18",
      submittedDate: "2024-01-17",
      status: "Graded",
      priority: "High",
      description: "Analyze various network security protocols and their implementations",
      maxMarks: 100,
      obtainedMarks: 85,
      feedback: "Excellent analysis of security protocols. Well researched and presented."
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Smart Campus Management System",
      subject: "Software Engineering",
      phases: [
        { name: "Requirements Analysis", status: "Completed", dueDate: "2024-01-15" },
        { name: "System Design", status: "Completed", dueDate: "2024-02-01" },
        { name: "Implementation", status: "In Progress", dueDate: "2024-03-15" },
        { name: "Testing", status: "Pending", dueDate: "2024-04-01" },
        { name: "Deployment", status: "Pending", dueDate: "2024-04-15" }
      ],
      progress: 40,
      teamMembers: ["Aarav Sharma", "Priya Singh", "Rahul Kumar"],
      mentor: "Dr. Amit Sharma"
    },
    {
      id: 2,
      title: "AI-Powered Crop Monitoring",
      subject: "Machine Learning",
      phases: [
        { name: "Literature Review", status: "Completed", dueDate: "2024-01-10" },
        { name: "Data Collection", status: "Completed", dueDate: "2024-01-25" },
        { name: "Model Development", status: "In Progress", dueDate: "2024-02-20" },
        { name: "Validation", status: "Pending", dueDate: "2024-03-10" },
        { name: "Documentation", status: "Pending", dueDate: "2024-03-25" }
      ],
      progress: 35,
      teamMembers: ["Aarav Sharma", "Anita Patel"],
      mentor: "Dr. Meera Gupta"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Submitted": return "bg-blue-100 text-blue-800";
      case "Graded": return "bg-green-100 text-green-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const pendingAssignments = assignments.filter(a => a.status === "Pending").length;
  const completedAssignments = assignments.filter(a => a.status === "Graded").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments & Projects</h1>
          <p className="text-gray-600">Track your assignments, submissions, and project progress</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Upload className="mr-2 h-4 w-4" />
          Submit Assignment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-red-600">{pendingAssignments}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedAssignments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-blue-600">84%</p>
              </div>
              <Star className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-purple-600">2</p>
              </div>
              <ClipboardList className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="w-full">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.subject}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{assignment.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  {assignment.submittedDate && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Max Marks: {assignment.maxMarks}</span>
                  </div>
                </div>

                {assignment.obtainedMarks && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Score</span>
                      <span className="text-sm font-medium">{assignment.obtainedMarks}/{assignment.maxMarks}</span>
                    </div>
                    <Progress value={(assignment.obtainedMarks / assignment.maxMarks) * 100} className="h-2" />
                  </div>
                )}

                {assignment.feedback && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Faculty Feedback</p>
                        <p className="text-sm text-blue-700">{assignment.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {assignment.status === "Pending" && (
                    <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                      <Upload className="mr-2 h-3 w-3" />
                      Submit
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  {assignment.status === "Graded" && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.subject} • Mentor: {project.mentor}</CardDescription>
                  </div>
                  <Badge variant="outline">{project.progress}% Complete</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">Project Phases</h4>
                  <div className="space-y-3">
                    {project.phases.map((phase, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            phase.status === "Completed" ? "bg-green-500" :
                            phase.status === "In Progress" ? "bg-yellow-500" : "bg-gray-300"
                          }`} />
                          <span className="font-medium">{phase.name}</span>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(phase.status)}>
                            {phase.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {new Date(phase.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.teamMembers.map((member, index) => (
                      <Badge key={index} variant="secondary">{member}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                    Update Progress
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-3 w-3" />
                    Team Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Assignment</CardTitle>
              <CardDescription>Upload your assignment files and submit for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Assignment Title</label>
                  <Input placeholder="Select assignment to submit" className="mt-1" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Comments/Notes</label>
                  <Textarea placeholder="Add any additional comments or notes" className="mt-1" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Upload Files</label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, DOC, DOCX, ZIP (Max 10MB)
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  {selectedFile && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
                      <span className="text-sm text-blue-800">{selectedFile.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                        ×
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    Submit Assignment
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentsModule;