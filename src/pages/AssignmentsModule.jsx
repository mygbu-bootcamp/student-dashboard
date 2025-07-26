import React, { useState, useRef } from "react";
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
import StatsCard from '../components/Statscard'; 
import { useNavigate } from 'react-router-dom';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    default: "bg-blue-900 text-white hover:bg-blue-800 hover:scale-[1.02] hover:shadow-md",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:scale-[1.02] hover:shadow-sm",
    ghost: "text-gray-600 hover:bg-gray-100 hover:scale-[1.02] hover:shadow-sm"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700"
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Progress Component
const Progress = ({ value = 0, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="h-full bg-black transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// Input Components
const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Tabs Components
const TabsContext = React.createContext();

const Tabs = ({ defaultValue, value: propValue, onValueChange, children, ...props }) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : localValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) setLocalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className="w-full" {...props}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`w-full flex h-12 items-center justify-between rounded-xl bg-gray-100 p-1 ${className}`}
      role="tablist"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { parentProps: props });
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({
  className = "",
  value,
  parentProps,
  children,
  ...props
}) => {
  const { value: contextValue, onValueChange } = React.useContext(TabsContext);
  const isActive = value === contextValue;

  const handleClick = () => {
    onValueChange(value);
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={handleClick}
      className={`flex-1 inline-flex items-center cursor-pointer justify-center rounded-lg h-10 text-sm font-medium transition-colors focus:outline-none ${
        isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ className = "", value, children, ...props }) => {
  const { value: contextValue } = React.useContext(TabsContext);
  const isActive = value === contextValue;

  return isActive ? (
    <div
      role="tabpanel"
      className={`mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  ) : null;
};

const AssignmentsModule = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("assignments");
  const fileInputRef = useRef(null); // Create a ref for the file input
  const navigate = useNavigate(); // Initialize useNavigate hook

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
  // Handle case where no assignments are graded to avoid division by zero
  const averageScore = completedAssignments > 0
    ? (assignments.filter(a => a.obtainedMarks !== null).reduce((sum, a) => sum + (a.obtainedMarks / a.maxMarks) * 100, 0) / completedAssignments).toFixed(0)
    : 0; // Default to 0 if no graded assignments

  // Handler for file upload area click
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleSubmitAssignment = () => {
    // You'd typically send the selectedFile to a backend here.
    console.log("Submitting assignment:", selectedFile?.name || "No file selected");
    // Optionally, clear the selected file after submission
    setSelectedFile(null);
    alert("Assignment submitted (simulation)! Check console for file info.");
  };
  const handleComingSoon = () => {
    navigate('/coming-soon'); // Ensure your router is configured for '/coming-soon'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments & Projects</h1>
          <p className="text-gray-600">Track your assignments, submissions, and project progress</p>
        </div>
      </div>

      {/* Quick Stats using StatsCard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Pending"
          value={pendingAssignments}
          icon={AlertTriangle}
          color="text-red-600"
          bgColor="bg-red-100"
        />
        <StatsCard
          title="Completed"
          value={completedAssignments}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={Star}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Projects"
          value={projects.length}
          icon={ClipboardList}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    <Button
                      size="sm"
                      className="bg-blue-900 text-white"
                      onClick={() => setActiveTab("submissions")} // Navigate to submissions tab
                    >
                      <Upload className="mr-2 h-3 w-3" />
                      Submit
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleComingSoon}>
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  {assignment.status === "Graded" && (
                    <Button variant="outline" size="sm" onClick={handleComingSoon}>
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
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
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
                  <Button size="sm" className="bg-blue-900 text-white" onClick={handleComingSoon}>
                    Update Progress
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleComingSoon}>
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleComingSoon}>
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
                  <label htmlFor="assignmentTitle" className="text-sm font-medium text-gray-700">Assignment Title</label>
                  <Input id="assignmentTitle" placeholder="Select assignment to submit" className="mt-1" />
                </div>

                <div>
                  <label htmlFor="commentsNotes" className="text-sm font-medium text-gray-700">Comments/Notes</label>
                  <Textarea id="commentsNotes" placeholder="Add any additional comments or notes" className="mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Upload Files</label>
                  <div
                    className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer"
                    onClick={handleFileUploadClick} // Add onClick to trigger file input
                  >
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
                      ref={fileInputRef} // Attach ref to the input
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      // You might want to add accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip"
                      // for better file type filtering in the file explorer
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
                  <Button className="bg-blue-900 text-white" onClick={handleSubmitAssignment}>
                    Submit Assignment
                  </Button>
                  <Button variant="outline" onClick={handleComingSoon}>
                    Save Draft
                  </Button>
                </div>
              </div> {/* This div should be closed if opened for space-y-4 */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentsModule;