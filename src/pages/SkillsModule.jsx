import React, { useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import {
  Award,
  Upload,
  Star,
  Trophy,
  Users,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  Settings,
  BookOpen,
  Zap,
  Target,
  ChevronDown,
  ChevronUp
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
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none ${
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

const SkillsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("skills");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [labTypeFilter, setLabTypeFilter] = useState("All Labs");
  const [availabilityFilter, setAvailabilityFilter] = useState("All Statuses");
  const [filteredLabs, setFilteredLabs] = useState([]);

  const userSkills = [
    { id: 1, name: "React Development", level: "Advanced", progress: 85, category: "Technical", verified: true },
    { id: 2, name: "Machine Learning", level: "Intermediate", progress: 65, category: "Technical", verified: false },
    { id: 3, name: "Project Management", level: "Beginner", progress: 30, category: "Soft Skills", verified: true },
    { id: 4, name: "Data Analysis", level: "Intermediate", progress: 70, category: "Technical", verified: true }
  ];

  const innovationLabs = [
    {
      id: 1,
      name: "AI & Machine Learning Lab",
      description: "Advanced AI research and development",
      capacity: 25,
      enrolled: 18,
      mentor: "Dr. Priya Sharma",
      schedule: "Mon, Wed, Fri - 2:00 PM",
      status: "Enrolled",
      type: "Technical"
    },
    {
      id: 2,
      name: "IoT Innovation Lab",
      description: "Internet of Things projects and prototyping",
      capacity: 20,
      enrolled: 12,
      mentor: "Prof. Rajesh Kumar",
      schedule: "Tue, Thu - 3:00 PM",
      status: "Available",
      type: "Technical"
    },
    {
      id: 3,
      name: "FinTech Lab",
      description: "Financial technology solutions and interdisciplinary research",
      capacity: 15,
      enrolled: 15,
      mentor: "Dr. Anjali Verma",
      schedule: "Wed, Fri - 4:00 PM",
      status: "Waitlist",
      type: "Interdisciplinary"
    },
    {
      id: 4,
      name: "Cybersecurity Lab",
      description: "Information security and ethical hacking research",
      capacity: 20,
      enrolled: 8,
      mentor: "Mr. Vikram Singh",
      schedule: "Mon, Thu - 1:00 PM",
      status: "Available",
      type: "Research"
    }
  ];

  const ruralInnovations = [
    {
      id: 1,
      title: "Smart Irrigation System",
      status: "Submitted",
      date: "2024-03-15",
      mentor: "Dr. Priya Sharma",
      impact: "Water Conservation",
      badge: "Innovation Pioneer"
    },
    {
      id: 2,
      title: "Rural Healthcare App",
      status: "In Progress",
      date: "2024-03-10",
      mentor: "Prof. Rajesh Kumar",
      impact: "Healthcare Access",
      badge: "Health Champion"
    }
  ];

  const badges = [
    { name: "Code Ninja", description: "Completed 10+ coding projects", earned: true, date: "2024-02-15" },
    { name: "Innovation Pioneer", description: "Submitted rural innovation project", earned: true, date: "2024-03-15" },
    { name: "Team Player", description: "Collaborated on 5+ team projects", earned: false, date: null },
    { name: "Research Scholar", description: "Published research paper", earned: false, date: null }
  ];

  useEffect(() => {
    const filtered = innovationLabs.filter((lab) => {
      const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lab.mentor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = labTypeFilter === "All Labs" || lab.type === labTypeFilter;
      
      const matchesAvailability = availabilityFilter === "All Statuses" || 
                                lab.status === availabilityFilter;
      
      return matchesSearch && matchesType && matchesAvailability;
    });
    
    setFilteredLabs(filtered);
  }, [searchTerm, labTypeFilter, availabilityFilter]);

  const handleSkillAdd = () => {
    toast({
      title: "Skill Added",
      description: "New skill has been added to your profile successfully!"
    });
  };

  const handleLabRegistration = (labName) => {
    toast({
      title: "Registration Successful",
      description: `You have been registered for ${labName}!`
    });
  };

  const handleProjectSubmit = () => {
    toast({
      title: "Project Submitted",
      description: "Your rural innovation project has been submitted for review!"
    });
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const Progress = ({ value, className = "" }) => {
    return (
      <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
        <div
          className="bg-black h-2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  const Badge = ({ children, variant = "default", className = "" }) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
    const variantClasses = {
      default: "bg-black text-white",
      secondary: "bg-gray-100 text-gray-800 border border-gray-300",
      destructive: "bg-red-100 text-red-800 border border-red-200"
    };
    
    return (
      <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
          Skills Development & Innovation Labs
        </h1>
        <p className="text-purple-100 text-sm sm:text-base lg:text-lg">
          Enhance your skills and participate in cutting-edge research
        </p>
      </div>

      {/* Main Tabs */}
      <div className="space-y-6">
        <Tabs defaultValue="skills" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="skills">
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-4 w-4" />
                <span>My Skills</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="labs">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Labs</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="rural">
              <div className="flex items-center justify-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Rural</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="badges">
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Badges</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Current Skills Card */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-5 w-5 text-black" />
                      <h2 className="text-lg font-semibold">Current Skills</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Track your skill development progress</p>
                    
                    <div className="space-y-4">
                      {userSkills.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant={skill.verified ? "default" : "secondary"} className="text-xs sm:text-sm">
                                {skill.level}
                              </Badge>
                              {skill.verified && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />}
                            </div>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                          <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                            <span>{skill.category}</span>
                            <span>{skill.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add New Skill Card */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Plus className="h-5 w-5 text-black" />
                      <h2 className="text-lg font-semibold">Add New Skill</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Tag skills with courses or projects</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Skill Name</label>
                        <input
                          placeholder="e.g., Python Programming"
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs sm:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Category</label>
                        <select className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs sm:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                          <option>Technical</option>
                          <option>Soft Skills</option>
                          <option>Leadership</option>
                          <option>Communication</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Current Level</label>
                        <select className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs sm:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>Expert</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Associated Project/Course</label>
                        <input
                          placeholder="Link to project or course"
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs sm:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={handleSkillAdd}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-9 px-4 py-2 w-full hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      Add Skill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Labs Tab */}
          <TabsContent value="labs">
            <div className="space-y-6">
              {/* Filter Controls - Mobile */}
              <div className="sm:hidden">
                <button
                  onClick={toggleMobileFilters}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full cursor-pointer"
                >
                  <span>Filter Labs</span>
                  {showMobileFilters ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </button>
                
                {showMobileFilters && (
                  <div className="bg-white rounded-lg border border-gray-200 mt-2">
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Lab Type</label>
                        <select
                          value={labTypeFilter}
                          onChange={(e) => setLabTypeFilter(e.target.value)}
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                          <option>All Labs</option>
                          <option>Technical</option>
                          <option>Research</option>
                          <option>Interdisciplinary</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium">Availability</label>
                        <select
                          value={availabilityFilter}
                          onChange={(e) => setAvailabilityFilter(e.target.value)}
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                          <option>All Statuses</option>
                          <option>Available</option>
                          <option>Waitlist</option>
                          <option>Enrolled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Filter Controls - Desktop */}
              <div className="hidden sm:flex gap-4">
                <div className="flex-1">
                  <input
                    placeholder="Search labs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <select
                  value={labTypeFilter}
                  onChange={(e) => setLabTypeFilter(e.target.value)}
                  className="flex h-9 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  <option>All Labs</option>
                  <option>Technical</option>
                  <option>Research</option>
                  <option>Interdisciplinary</option>
                </select>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="flex h-9 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  <option>All Statuses</option>
                  <option>Available</option>
                  <option>Waitlist</option>
                  <option>Enrolled</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                Showing {filteredLabs.length} of {innovationLabs.length} labs
              </div>

              {/* Labs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredLabs.length > 0 ? (
                  filteredLabs.map((lab) => (
                    <div key={lab.id} className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                      <div className="p-6 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm sm:text-base font-semibold">{lab.name}</h3>
                          <Badge
                            variant={
                              lab.status === "Enrolled"
                                ? "default"
                                : lab.status === "Available"
                                ? "secondary"
                                : "destructive"
                            }
                            className="text-xs sm:text-sm"
                          >
                            {lab.status}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4">{lab.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-4">
                          <div>
                            <span className="text-gray-600">Mentor:</span>
                            <p className="font-medium">{lab.mentor}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Schedule:</span>
                            <p className="font-medium">{lab.schedule}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span>Enrollment</span>
                            <span>
                              {lab.enrolled}/{lab.capacity}
                            </span>
                          </div>
                          <Progress value={(lab.enrolled / lab.capacity) * 100} className="h-2" />
                        </div>
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <button
                          onClick={() => handleLabRegistration(lab.name)}
                          disabled={lab.status === "Enrolled" || lab.status === "Waitlist"}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-9 px-4 py-2 w-full disabled:bg-gray-300 disabled:text-gray-500 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                        >
                          {lab.status === "Enrolled"
                            ? "Already Enrolled"
                            : lab.status === "Waitlist"
                            ? "Join Waitlist"
                            : "Register Now"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No labs match your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Rural Innovation Tab */}
          <TabsContent value="rural">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* My Rural Innovation Projects */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-5 w-5 text-black" />
                      <h2 className="text-lg font-semibold">My Rural Innovation Projects</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Track your social impact initiatives</p>
                    
                    <div className="space-y-4">
                      {ruralInnovations.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm sm:text-base">{project.title}</h4>
                            <Badge 
                              variant={project.status === "Submitted" ? "default" : "secondary"}
                              className="text-xs sm:text-sm"
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                            <p>Mentor: {project.mentor}</p>
                            <p>Impact Area: {project.impact}</p>
                            <p>Date: {project.date}</p>
                            {project.badge && (
                              <div className="flex items-center mt-2">
                                <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
                                <span className="text-yellow-600 font-medium text-xs sm:text-sm">{project.badge}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit New Project */}
                <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Upload className="h-5 w-5 text-black" />
                      <h2 className="text-lg font-semibold">Submit New Project</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Share your rural innovation solution</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Project Title</label>
                        <input
                          placeholder="e.g., Smart Farming Solution"
                          className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs sm:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Impact Category</label>
                        <select className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-xs sm:text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                          <option>Agriculture</option>
                          <option>Healthcare</option>
                          <option>Education</option>
                          <option>Water Conservation</option>
                          <option>Energy</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Project Description</label>
                        <textarea 
                          className="flex min-h-[60px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-xs sm:text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          rows={3} 
                          placeholder="Describe your innovation..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Upload Demo Video</label>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">
                          <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Choose Video File
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">Upload Logbook</label>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">
                          <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Choose PDF File
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={handleProjectSubmit}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-9 px-4 py-2 w-full hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg border ${
                      badge.earned
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-gray-200 bg-gray-50"
                    } shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full`}
                  >
                    <div className="p-4 sm:p-6 text-center flex-grow">
                      <div
                        className={`p-3 rounded-full inline-block mb-3 ${
                          badge.earned ? "bg-yellow-100" : "bg-gray-100"
                        }`}
                      >
                        <Trophy
                          className={`h-6 w-6 sm:h-8 sm:w-8 ${
                            badge.earned ? "text-yellow-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <h3
                        className={`font-medium mb-2 text-sm sm:text-base ${
                          badge.earned ? "text-yellow-800" : "text-gray-600"
                        }`}
                      >
                        {badge.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">
                        {badge.description}
                      </p>
                      {badge.earned ? (
                        <div className="text-xs text-yellow-600">
                          Earned on {badge.date}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">Not yet earned</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsModule;