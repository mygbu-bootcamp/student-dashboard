import * as React from "react";
import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Download,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Custom UI Components
const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"; // Added transition-all duration-200

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:scale-95", // Added active:scale-95
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 active:scale-95", // Added active:scale-95
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:scale-95", // Added active:scale-95
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:scale-95" // Added active:scale-95
  };

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", disabled = false, ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${disabled ? 'bg-gray-50 text-gray-500' : ''} ${className}`}
    disabled={disabled}
    {...props}
  />
);

// Added Select component
const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`} // Added border and transition
    {...props}
  >
    {children}
  </select>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "bg-transparent border border-gray-300 text-gray-700"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Progress = ({ value = 0, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="h-full bg-black transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// Improved Tabs Implementation
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

const TabsList = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex h-[48px] items-center justify-between rounded-xl bg-[#f1f5f9] p-1 ${className}`}
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
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ className = "", value, parentProps, children, ...props }, ref) => {
    const { value: contextValue, onValueChange } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    const handleClick = () => {
      onValueChange(value);
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={handleClick}
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none transition-all duration-200 ${ // Added transition
          isActive
            ? "bg-white text-black shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
  ({ className = "", value, children, ...props }, ref) => {
    const { value: contextValue } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    return isActive ? (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-4 px-4 sm:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    ) : null;
  }
);
TabsContent.displayName = "TabsContent";

const AcademicModule = ({ user = {
  studentId: "2021BCS001",
  name: "Aarav Sharma",
  programme: "B.Tech",
  branch: "Computer Science & Engineering",
  semester: "6"
} }) => {
  const [selectedSemester, setSelectedSemester] = useState("6");
  const [activeTab, setActiveTab] = useState("registration");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Course registration, timetable, and academic progress</p>
        </div>
        <Button className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white">
          <Download className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Download Transcript</span>
          <span className="sm:hidden">Transcript</span>
        </Button>
      </div>

      {/* Mobile Tab Selector */}
      <div className="sm:hidden">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={toggleMobileMenu}
        >
          <span>
            {activeTab === "registration" && "Registration"}
            {activeTab === "courses" && "Courses"}
            {activeTab === "timetable" && "Timetable"}
            {activeTab === "progress" && "Progress"}
          </span>
          {showMobileMenu ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>

        {showMobileMenu && (
          <div className="mt-2 space-y-1">
            <Button
              variant={activeTab === "registration" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("registration");
                setShowMobileMenu(false);
              }}
            >
              Registration
            </Button>
            <Button
              variant={activeTab === "courses" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("courses");
                setShowMobileMenu(false);
              }}
            >
              Courses
            </Button>
            <Button
              variant={activeTab === "timetable" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("timetable");
                setShowMobileMenu(false);
              }}
            >
              Timetable
            </Button>
            <Button
              variant={activeTab === "progress" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("progress");
                setShowMobileMenu(false);
              }}
            >
              Progress
            </Button>
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <div className="hidden sm:block">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Registration Tab */}
      {activeTab === "registration" && (
        <div className="space-y-6">
          <Card className="">
            <CardHeader className="pb-4 border-b border-transparent">
              <CardTitle className="flex items-center text-xl">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Semester Registration - Spring 2024
              </CardTitle>
              <CardDescription className="text-gray-500">Complete your semester registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Student Info */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-900">Student Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                      <Input value={user?.studentId} disabled className="bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <Input value={user?.name} disabled className="bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Programme</label>
                      <Input value={user?.programme} disabled className="bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                      <Input value={user?.branch} disabled className="bg-gray-50" />
                    </div>
                  </div>
                </div>

                {/* Registration Fields */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-900">Registration Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
                      <Input placeholder="Enter current address" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <Input placeholder="Enter contact number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                      <Input placeholder="Enter Aadhar number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
                      <Input placeholder="Enter guardian name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Contact</label>
                      <Input placeholder="Enter guardian contact" />
                    </div>
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

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
                <Button variant="outline" className="w-full sm:w-auto">Save Draft</Button>
                <Button className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white">
                  Submit Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="border-b border-transparent">
                <CardTitle>Current Subjects - Semester {user?.semester}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjects.map(subject => (
                  <div key={subject.code} className="p-3 border border-gray-200 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-gray-600">{subject.code}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={subject.type === "Core" ? "default" : "secondary"}>
                          {subject.type}
                        </Badge>
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
              <CardHeader className="border-b border-transparent">
                <CardTitle>Available Electives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Replaced <select> with custom Select component */}
                <Select>
                  <option value="">Filter by prerequisite</option>
                  <option value="cgpa8">CGPA &gt; 8.0</option>
                  <option value="cgpa7.5">CGPA &gt; 7.5</option>
                  <option value="cgpa7">CGPA &gt; 7.0</option>
                </Select>
                {electiveOptions.map(elective => (
                  <div key={elective.code} className="p-3 border border-gray-200 rounded-lg space-y-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{elective.name}</p>
                        <p className="text-sm text-gray-600">{elective.code}</p>
                      </div>
                      <p className="font-medium">{elective.credits} Credits</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{elective.prerequisite}</span>
                      <Button size="sm" variant="outline">Select</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === "timetable" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-transparent">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Weekly Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timetable.map(day => (
                  <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4">{day.day}</h3>
                    <div className="space-y-2">
                      {day.slots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg ">
                          <div className="flex items-center space-x-4">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{slot.time}</span>
                            <span className="text-sm font-medium">{slot.subject}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={slot.type === "Lab" ? "secondary" : "outline"}>
                              {slot.type}
                            </Badge>
                            <span className="text-sm text-gray-600">{slot.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === "progress" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="border-b border-transparent">
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
                <div className="space-y-3">
                  {[82, 84, 86, 83, 87].map((val, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Semester {i + 1}</span>
                        <span>{(val / 10).toFixed(1)}</span>
                      </div>
                      <Progress value={val} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b border-transparent">
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
                <div className="space-y-3">
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
                </div>
                <div className="p-3 mt-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    On track for graduation! 18 credits remaining.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicModule;