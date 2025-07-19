import React,{ useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Download,
  Edit,
  Plus,
  Verified,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Clock,
  CircleDollarSign
} from "lucide-react";

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
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none transition-all duration-200 ease-in-out cursor-pointer
          ${isActive
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
        className={`mt-4 px-4 sm:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    ) : null;
  }
);
TabsContent.displayName = "TabsContent";

const ProfileModule = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@gbu.ac.in",
    phone: "+91 9876543210",
    address: "Greater Noida, UP, India",
    about: "Computer Science student passionate about AI/ML and software development. Active in coding competitions and technical projects.",
    skills: ["Python", "Java", "React", "Machine Learning", "Data Structures"],
    certifications: [
      { name: "Machine Learning Specialization", provider: "Coursera", date: "2023", verified: true },
      { name: "AWS Cloud Practitioner", provider: "Amazon", date: "2024", verified: true },
      { name: "Google Data Analytics", provider: "Google", date: "2023", verified: false }
    ],
    achievements: [
      "Dean's List - Semester 5",
      "Winner - CodeFest 2023",
      "Best Project Award - Software Engineering"
    ]
  });

  const user = {
    name: "Aarav Sharma",
    email: "aarav.sharma@gbu.ac.in",
    programme: "B.Tech",
    branch: "Computer Science & Engineering",
    semester: "6th",
    studentId: "2021BCS001",
    photo:"A"
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const addSkill = () => {
    const skill = prompt("Enter new skill:");
    if (skill) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile & Resume</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your profile and build your academic resume</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto cursor-pointer hover:scale-[1.02] hover:shadow-md">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download Resume</span>
            <span className="sm:hidden">Resume</span>
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 hover:bg-blue-800 text-white h-10 px-4 py-2 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-md"
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Mobile Tab Selector */}
      <div className="sm:hidden">
        <button
          className="inline-flex items-center justify-between rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.01] hover:shadow-sm"
          onClick={toggleMobileMenu}
        >
          <span>
            {activeTab === "profile" && "Profile Info"}
            {activeTab === "academic" && "Academic Details"}
            {activeTab === "resume" && "Resume Builder"}
          </span>
          {showMobileMenu ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </button>

        {showMobileMenu && (
          <div className="mt-2 space-y-1">
            <button
              className={`inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 w-full transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.01] hover:shadow-sm
                ${activeTab === "profile" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "hover:bg-accent hover:text-accent-foreground"}`}
              onClick={() => {
                setActiveTab("profile");
                setShowMobileMenu(false);
              }}
            >
              Profile Info
            </button>
            <button
              className={`inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 w-full transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.01] hover:shadow-sm
                ${activeTab === "academic" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "hover:bg-accent hover:text-accent-foreground"}`}
              onClick={() => {
                setActiveTab("academic");
                setShowMobileMenu(false);
              }}
            >
              Academic Details
            </button>
            <button
              className={`inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 w-full transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.01] hover:shadow-sm
                ${activeTab === "resume" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "hover:bg-accent hover:text-accent-foreground"}`}
              onClick={() => {
                setActiveTab("resume");
                setShowMobileMenu(false);
              }}
            >
              Resume Builder
            </button>
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <div className="hidden sm:block">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Details</TabsTrigger>
            <TabsTrigger value="resume">Resume Builder</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Profile Info Tab */}
      <Tabs value={activeTab}>
        <TabsContent value="profile">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight">Personal Information</h3>
                <p className="text-sm text-muted-foreground">Your basic profile information</p>
              </div>
              <div className="p-6 pt-0">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex flex-col items-center space-y-4 w-full sm:w-auto">
                    <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full bg-blue-100 items-center justify-center">
                      <User className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
                    </div>

                    {isEditing && (
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-sm">
                        Change Photo
                      </button>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          value={profileData.email}
                          disabled
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                      <textarea
                        value={profileData.about}
                        onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                        disabled={!isEditing}
                        className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 hover:bg-blue-800 text-white h-10 px-4 py-2 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold leading-none tracking-tight">Skills</h3>
                    <p className="text-sm text-muted-foreground">Your technical and soft skills</p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={addSkill}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-sm"
                    >
                      <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Add Skill
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 text-sm bg-gray-100 text-gray-700"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          className="ml-2 text-red-500 hover:text-red-700 transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.1]"
                          onClick={() => {
                            setProfileData(prev => ({
                              ...prev,
                              skills: prev.skills.filter((_, i) => i !== index)
                            }));
                          }}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Academic Details Tab */}
        <TabsContent value="academic">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight">Academic Information</h3>
                <p className="text-sm text-muted-foreground">Your current academic details</p>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.programme}</p>
                      <p className="text-sm text-gray-600">{user?.branch}</p>
                    </div>
                  </div>
                  {/* Semester with Calendar icon */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Semester {user?.semester}</p>
                      <p className="text-sm text-gray-600">Current</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.studentId}</p>
                      <p className="text-sm text-gray-600">Student ID</p>
                    </div>
                  </div>
                  {/* Academic Year with Clock icon */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Academic Year</p>
                      <p className="text-lg font-semibold text-gray-900">2021-2025</p>
                    </div>
                  </div>
                 
                  {/* Credits Completed with CreditCard icon */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Credits Completed</p>
                      <p className="text-3xl font-bold text-blue-600">142/160</p>
                    </div>
                  </div>
                   {/* CGPA with a new icon - CircleDollarSign (can be changed) */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                      <CircleDollarSign className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">CGPA</p>
                      <p className="text-3xl font-bold text-green-600">8.5/10.0</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold leading-none tracking-tight">Certifications</h3>
                    <p className="text-sm text-muted-foreground">Your professional certifications</p>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </button>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg bg-white gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Award className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{cert.name}</p>
                          <p className="text-sm text-gray-600">{cert.provider} • {cert.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 self-end sm:self-auto">
                        {cert.verified && (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700 hover:bg-green-200">
                            <Verified className="mr-1 h-3 w-3" />
                            Verified
                          </span>
                        )}
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02]">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Resume Builder Tab */}
        <TabsContent value="resume">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 g-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight">Resume Builder</h3>
                <p className="text-sm text-muted-foreground">Auto-generated academic resume based on your profile</p>
              </div>
              <div className="p-6 pt-0">
                <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 shadow-sm max-w-3xl mx-auto">
                  {/* Resume Preview */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
                    <p className="text-base lg:text-lg text-gray-600 mb-1">{user?.programme} - {user?.branch}</p>
                    <p className="text-sm text-gray-500">{profileData.email} • {profileData.phone}</p>
                  </div>

                  <div className="border-t border-gray-200 my-6"></div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{profileData.about}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                      <div className="space-y-2">
                        <p className="font-semibold text-base">{user?.programme} in {user?.branch}</p>
                        <p className="text-sm text-gray-600">Gautam Buddha University • CGPA: 8.5/10.0</p>
                        <p className="text-sm text-gray-600">Expected Graduation: 2025</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                      <ul className="space-y-2">
                        {profileData.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-md">
                    <Edit className="mr-2 h-4 w-4" />
                    Customize Template
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 hover:bg-blue-800 text-white h-10 px-4 py-2 w-full sm:w-auto transition-all duration-200 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-md">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileModule;