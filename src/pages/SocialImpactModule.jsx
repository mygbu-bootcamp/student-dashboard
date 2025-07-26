import React, { useState } from "react";
import {
  Heart,
  Award,
  Clock,
  MapPin,
  Plus,
  Calendar,
  CheckCircle,
  Star,
  Trophy,
  Upload,
  Eye,
  Menu,
  X,
  Users,
  Leaf,
  Hospital,
  BookOpen,
  Bell
} from "lucide-react";
import StatsCard from "../components/Statscard"; 

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

const SocialImpactModule = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    hours: "",
    location: "",
    date: "",
  });

  // Mock data
  const userStats = {
    totalHours: 156,
    activitiesCompleted: 23,
    rank: 12,
    badgesEarned: 8,
    impactScore: 890,
  };

  const activities = [
    {
      id: 1,
      title: "Tree Plantation Drive",
      description: "Planted 50 saplings in the local community park",
      hours: 8,
      date: "2024-03-15",
      location: "Community Park, Sector 12",
      status: "Approved",
      role: "Volunteer",
      officer: "Dr. Priya Sharma",
      certificate: true,
      impact: "Environmental Conservation",
    },
    {
      id: 2,
      title: "Blood Donation Camp",
      description: "Organized and managed blood donation camp",
      hours: 12,
      date: "2024-03-10",
      location: "GBU Campus, Medical Center",
      status: "Approved",
      role: "Team Lead",
      officer: "Dr. Rajesh Kumar",
      certificate: true,
      impact: "Health & Wellness",
    },
    {
      id: 3,
      title: "Digital Literacy Workshop",
      description: "Teaching basic computer skills to elderly citizens",
      hours: 6,
      date: "2024-03-20",
      location: "Senior Citizens Center",
      status: "Pending",
      role: "Volunteer",
      officer: "Prof. Anita Singh",
      certificate: false,
      impact: "Education & Skill Development",
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Arjun Patel", hours: 245, activities: 34, score: 1250 },
    { rank: 2, name: "Priya Sharma", hours: 223, activities: 31, score: 1180 },
    { rank: 3, name: "Rohit Kumar", hours: 198, activities: 28, score: 1050 },
    { rank: 4, name: "Sneha Gupta", hours: 187, activities: 26, score: 980 },
    { rank: 5, name: "Amit Singh", hours: 172, activities: 24, score: 920 },
    {
      rank: 12,
      name: "You",
      hours: userStats.totalHours,
      activities: userStats.activitiesCompleted,
      score: userStats.impactScore,
    },
  ];

 const badges = [
  { id: 1, name: "Environmental Champion", description: "50+ hours in environmental activities", earned: true, icon: <Leaf className="w-6 h-6 text-green-600" /> },
  { id: 2, name: "Health Advocate", description: "30+ hours in health initiatives", earned: true, icon: <Hospital className="w-6 h-6 text-red-600" /> },
  { id: 3, name: "Education Pioneer", description: "40+ hours in education programs", earned: true, icon: <BookOpen className="w-6 h-6 text-blue-600" /> },
  { id: 4, name: "Community Leader", description: "Led 5+ community projects", earned: false, icon: <Users className="w-6 h-6 text-gray-500" /> },
  { id: 5, name: "Impact Maker", description: "1000+ impact score", earned: false, icon: <Star className="w-6 h-6 text-yellow-500" /> },
];

  const programs = [
    {
      id: 1,
      name: "NSS (National Service Scheme)",
      description: "Community service and social development activities",
      enrolled: true,
      officer: "Dr. Priya Sharma",
      coordinator: "Arjun Patel",
      members: 45,
    },
    {
      id: 2,
      name: "NCC (National Cadet Corps)",
      description: "Character building and leadership development",
      enrolled: false,
      officer: "Major Rajesh Singh",
      coordinator: "Rohit Kumar",
      members: 38,
    },
  ];

  const handleSubmitActivity = () => {
    console.log("Submitting new activity:", newActivity);
    setNewActivity({
      title: "",
      description: "",
      hours: "",
      location: "",
      date: "",
    });
  };

  const getStatusColorClasses = (status) => {
    switch (status) {
      case "Approved": return "text-green-600 bg-green-100";
      case "Pending": return "text-yellow-600 bg-yellow-100";
      case "Rejected": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "activities", label: "Activities" },
    { value: "programs", label: "Programs" },
    { value: "leaderboard", label: "Leaderboard" },
    { value: "badges", label: "Badges" }
  ];

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );

  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );

  const Button = ({ children, onClick, variant = "default", size = "default", className = "" }) => {
    let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
    let variantClasses = "";
    let sizeClasses = "";

    switch (variant) {
      case "default":
        variantClasses = "bg-black text-white shadow hover:bg-primary/90";
        break;
      case "outline":
        variantClasses = "border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground";
        break;
      case "ghost":
        variantClasses = "hover:bg-accent hover:text-accent-foreground";
        break;
    }

    switch (size) {
      case "default":
        sizeClasses = "h-9 px-4 py-2";
        break;
      case "sm":
        sizeClasses = "h-8 px-3 text-xs";
        break;
    }

    return (
      <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
        {children}
      </button>
    );
  };

  const Badge = ({ children, variant = "default", className = "" }) => {
    let baseClasses = "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer";
    let variantClasses = "";

    switch (variant) {
      case "default":
        variantClasses = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
        break;
      case "outline":
        variantClasses = "text-foreground";
        break;
    }

    return (
      <span className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </span>
    );
  };

  const Input = ({ value, onChange, placeholder, type = "text", className = "" }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );

  const Textarea = ({ value, onChange, placeholder, rows = 3, className = "" }) => (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ></textarea>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-1">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900 to-blue-700 rounded-lg p-4 sm:p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">Social Impact & Community Service</h1>
              <p className="text-green-100 text-sm sm:text-base">
                Track your NSS/NCC activities and community contributions
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-center sm:text-center gap-2 sm:gap-0">
              <div className="bg-white/20 rounded-lg p-2 sm:p-3 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow">
                <Heart className="h-8 w-8 sm:h-8 sm:w-8 text-white mb-1" />
                <div className="text-xs sm:text-sm text-green-100">Impact Score</div>
                <div className="text-lg sm:text-xl font-bold">{userStats.impactScore}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Updated with StatsCard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
          <StatsCard
            title="Total Hours"
            value={userStats.totalHours}
            icon={Clock}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Activities"
            value={userStats.activitiesCompleted}
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Rank"
            value={`#${userStats.rank}`}
            icon={Trophy}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatsCard
            title="Badges"
            value={userStats.badgesEarned}
            icon={Award}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
          <StatsCard
            title="Impact Score"
            value={userStats.impactScore}
            icon={Star}
            color="text-orange-600"
            bgColor="bg-orange-100"
            className="col-span-2 sm:col-span-3 lg:col-span-1"
          />
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          {/* Desktop Tab Navigation */}
          <TabsList className="hidden sm:flex">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs sm:text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mobile Tab Navigation */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold capitalize">
                {tabs.find(tab => tab.value === activeTab)?.label}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuMenuOpen(!isMobileMenuOpen)}
                className="hover:shadow-md"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
            
            {isMobileMenuOpen && (
              <Card className="mb-4 shadow-lg">
                <CardContent className="p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.value}
                        variant={activeTab === tab.value ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start text-xs hover:shadow-md"
                        onClick={() => {
                          setActiveTab(tab.value);
                          setIsMobileMenuMenuOpen(false);
                        }}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Activities */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">Recent Activities</CardTitle>
                  <CardDescription className="text-sm">Your latest community service contributions</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{activity.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{activity.hours} hours • {activity.date}</p>
                          <Badge className={`mt-1 text-xs ${getStatusColorClasses(activity.status)}`} variant="outline">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enrolled Programs */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">Enrolled Programs</CardTitle>
                  <CardDescription className="text-sm">Your active service programs</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {programs.filter(p => p.enrolled).map((program) => (
                      <div key={program.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <h4 className="font-medium mb-2 text-sm sm:text-base">{program.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">{program.description}</p>
                        <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                          <div className="text-xs sm:text-sm space-y-1">
                            <div className="flex justify-between sm:block">
                              <span className="font-medium">Officer:</span>
                              <span className="sm:ml-1">{program.officer}</span>
                            </div>
                            <div className="flex justify-between sm:block">
                              <span className="font-medium">Coordinator:</span>
                              <span className="sm:ml-1">{program.coordinator}</span>
                            </div>
                          </div>
                          <Badge className="text-xs hover:shadow-sm"><Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1"/>{program.members} members</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities">
            {/* Add New Activity */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Log New Activity</CardTitle>
                <CardDescription className="text-sm">Record your community service activities for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Activity Title</label>
                    <Input
                      placeholder="e.g., Tree Plantation Drive"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hours Contributed</label>
                    <Input
                      type="number"
                      placeholder="8"
                      value={newActivity.hours}
                      onChange={(e) => setNewActivity({...newActivity, hours: e.target.value})}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      placeholder="e.g., Community Park, Sector 12"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                      className="text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe your activity and impact..."
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                      className="text-sm"
                      rows={3}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button 
                      onClick={handleSubmitActivity} 
                      className="w-full sm:w-auto hover:shadow-lg"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Submit for Approval
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activities List */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Your Activities</CardTitle>
                <CardDescription className="text-sm">Track all your community service activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <Card key={activity.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm sm:text-lg">{activity.title}</h4>
                            <p className="text-gray-600 mb-2 text-xs sm:text-sm">{activity.description}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {activity.hours} hours
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {activity.date}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="truncate max-w-32 sm:max-w-none">{activity.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:flex-col sm:text-right gap-2 sm:gap-0">
                            <Badge className={`text-xs ${getStatusColorClasses(activity.status)} hover:shadow-sm`} variant="outline">
                              {activity.status}
                            </Badge>
                            <div className="text-xs sm:text-sm text-gray-500 sm:mt-2">
                              <div>Role: {activity.role}</div>
                              <div className="truncate max-w-32 sm:max-w-none">Officer: {activity.officer}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <Badge variant="outline" className="text-xs hover:shadow-sm">{activity.impact}</Badge>
                            {activity.certificate && (
                              <div className="flex items-center text-green-600">
                                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="text-xs sm:text-sm">Certificate Available</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none hover:shadow-sm">
                              <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="text-xs sm:text-sm">View</span>
                            </Button>
                            {activity.certificate && (
                              <Button variant="outline" size="sm" className="flex-1 sm:flex-none hover:shadow-sm">
                                <Upload className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm">Download</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {programs.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">{program.name}</CardTitle>
                    <CardDescription className="text-sm">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-medium text-sm flex-shrink-0">Program Officer:</span>
                        <span className="text-sm text-right">{program.officer}</span>
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-medium text-sm flex-shrink-0">Student Coordinator:</span>
                        <span className="text-sm text-right">{program.coordinator}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Active Members:</span>
                        <Badge className="text-xs hover:shadow-sm"><Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1"/>{program.members}</Badge>
                      </div>
                      <div className="pt-3">
                        {program.enrolled ? (
                          <Badge className="text-green-600 bg-green-100 text-xs hover:shadow-sm">Enrolled</Badge>
                        ) : (
                          <Button size="sm" className="w-full sm:w-auto hover:shadow-lg">
                            <Plus className="mr-2 h-4 w-4" />
                            Join Program
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Community Impact Leaderboard</CardTitle>
                <CardDescription className="text-sm">Top contributors in social service activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {leaderboard.map((person) => (
                    <div 
                      key={person.rank} 
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg ${
                        person.name === "You" ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                      } hover:shadow-md transition-shadow cursor-pointer`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                          person.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"
                        }`}>
                          {person.rank <= 3 ? "🏆" : person.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm sm:text-base truncate ${person.name === "You" ? "text-blue-600" : ""}`}>
                            {person.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {person.hours} hours • {person.activities} activities
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-sm sm:text-lg">{person.score}</div>
                        <div className="text-xs sm:text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Achievement Badges</CardTitle>
                <CardDescription className="text-sm">Unlock badges as you contribute to the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {badges.map((badge) => (
                    <Card key={badge.id} className={`${badge.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"} hover:shadow-md transition-shadow cursor-pointer`}>
                      <CardContent className="p-4 sm:p-6 text-center">
                       <div className="mb-2 sm:mb-3 flex justify-center">{badge.icon}</div>
                        <h4 className={`font-medium mb-2 text-sm sm:text-base ${badge.earned ? "text-yellow-800" : "text-gray-500"}`}>
                          {badge.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">{badge.description}</p>
                        {badge.earned ? (
                          <Badge className="text-yellow-600 bg-yellow-100 text-xs hover:shadow-sm">Earned</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs hover:shadow-sm">Not Earned</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialImpactModule;