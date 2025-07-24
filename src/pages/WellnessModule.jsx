import { useState, useEffect, useRef } from "react"; // Import useEffect and useRef
import * as React from "react"; // Import React for the Tabs components
import {
  Heart,
  Calendar,
  CheckCircle,
  Clock,
  Settings,
  Star,
  Plus,
  Users,
  Bell,
  Frown,
  Meh,
  Smile,
  SmilePlus,
  Laugh,
} from "lucide-react";
import StatsCard from "../components/Statscard";

const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const messageBoxRef = useRef(null); // Create a ref for the message box

  const bgColor = type === "destructive" ? "bg-red-500" : "bg-green-500";
  const textColor = "text-white";

  // Effect to handle clicks outside the message box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageBoxRef.current && !messageBoxRef.current.contains(event.target)) {
        onClose(); // Close the message box if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // Re-run if onClose changes

  return (
    <div
      ref={messageBoxRef} // Attach the ref to the message box div
      // Changed position to top-middle, added transform for centering
      className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center justify-between z-50 ${bgColor} ${textColor}`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-white opacity-90 hover:opacity-100">
        &times;
      </button>
    </div>
  );
};

// --- New Tabs Components Integrated Directly ---

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
        className={`flex-1 h-8px inline-flex items-center cursor-pointer justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none ${
          isActive
            ? "bg-white text-black"
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


const WellnessModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMood, setSelectedMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [message, setMessage] = useState(null);

  // Mock data
  const wellnessStats = {
    weeklyMoodAverage: 7.2,
    sleepAverage: 6.5,
    screenTimeDaily: 8.2,
    stepsToday: 6847,
    checkInStreak: 12,
  };

  const moodOptions = [
    { icon: Frown, label: "Very Sad", value: 1 },
    { icon: Meh, label: "Sad", value: 2 },
    { icon: Smile, label: "Okay", value: 3 },
    { icon: SmilePlus, label: "Good", value: 4 },
    { icon: Laugh, label: "Great", value: 5 },
    { icon: Star, label: "Excellent", value: 6 },
  ];

  const recentMoods = [
    { date: "2024-03-25", mood: 4, note: "Good productive day" },
    { date: "2024-03-24", mood: 3, note: "Feeling stressed about exams" },
    { date: "2024-03-23", mood: 5, note: "Great day with friends" },
    { date: "2024-03-22", mood: 4, note: "Normal day" },
  ];

  const sleepData = [
    { date: "2024-03-25", hours: 7.5, quality: "Good" },
    { date: "2024-03-24", hours: 6.0, quality: "Poor" },
    { date: "2024-03-23", hours: 8.0, quality: "Excellent" },
    { date: "2024-03-22", hours: 6.5, quality: "Fair" },
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Stress Management",
      rating: 4.9,
      sessions: 45,
      status: "Available",
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      specialization: "Academic Counseling",
      rating: 4.8,
      sessions: 32,
      status: "Busy",
    },
    {
      id: 3,
      name: "Ms. Anjali Verma",
      specialization: "Life Coaching",
      rating: 4.7,
      sessions: 28,
      status: "Available",
    },
  ];

  const showMessage = (msg, type = "default") => {
    setMessage({ text: msg, type })
  };

  const handleMoodSubmit = () => {
    if (!selectedMood) {
      showMessage(
        "Please select a mood. Choose how you're feeling today before submitting.",
        "destructive"
      );
      return;
    }

    // In a real app, you would send selectedMood and moodNote to a backend
    console.log("Mood Logged:", { mood: selectedMood, note: moodNote });

    showMessage("Your daily mood check-in has been recorded successfully!", "success"); // Changed type to "success" for consistency
  
    setSelectedMood("");
    setMoodNote("");
  };

  const handleMentorConnect = (mentorName) => {
    showMessage(
      `Your wellness consultation request has been sent to ${mentorName}!`, "success"
    ); // Changed type to "success"
  };

  // Generic Card Component (replaces shadcn/ui Card)
  const CustomCard = ({ children, className }) => (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-950 ${className}`}
    >
      {children}
    </div>
  );

  // Generic CardHeader Component
  const CustomCardHeader = ({ children, className }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );

  // Generic CardTitle Component
  const CustomCardTitle = ({ children, className }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );

  // Generic CardDescription Component
  const CustomCardDescription = ({ children, className }) => (
    <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
  );

  // Generic CardContent Component
  const CustomCardContent = ({ children, className }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  );

  // Generic Button Component (replaces shadcn/ui Button)
  const CustomButton = ({
    children,
    variant = "default",
    size = "md",
    className,
    onClick,
    disabled,
    ...props
  }) => {
    let baseStyle =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyle = "";
    let sizeStyle = "";

    switch (variant) {
      case "default":
        variantStyle = "bg-black text-white hover:bg-black/70 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200";
        break;
      case "destructive":
        variantStyle = "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200";
        break;
      case "outline":
        variantStyle = "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200";
        break;
      case "secondary":
        variantStyle = "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200";
        break;
      case "ghost":
        variantStyle = "hover:bg-gray-100 hover:text-gray-900";
        break;
      case "link":
        variantStyle = "text-gray-900 underline-offset-4 hover:underline";
        break;
      case "tertiary": // Custom variant for badges
        variantStyle = "bg-purple-100 text-purple-700";
        break;
      default:
        variantStyle = "bg-black text-white hover:bg-black/70 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200";
    }

    switch (size) {
      case "default":
        sizeStyle = "h-10 px-4 py-2";
        break;
      case "sm":
        sizeStyle = "h-9 rounded-md px-3";
        break;
      case "lg":
        sizeStyle = "h-11 rounded-md px-8";
        break;
      case "icon":
        sizeStyle = "h-10 w-10";
        break;
      case "md": // Custom size for general buttons
        sizeStyle = "h-10 px-4 py-2";
        break;
      case "full": // Custom size for full width buttons
        sizeStyle = "h-10 px-4 py-2 w-full";
        break;
      case "auto": // Custom size for buttons with auto height/padding
        sizeStyle = "p-4";
        break;
      default:
        sizeStyle = "h-10 px-4 py-2";
    }

    return (
      <button
        className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Generic Badge Component (replaces shadcn/ui Badge)
  const CustomBadge = ({ children, variant = "default", className }) => {
    let baseStyle =
      "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2";
    let variantStyle = "";

    switch (variant) {
      case "default":
        variantStyle = "border-transparent bg-gray-900 text-white hover:bg-gray-900/80";
        break;
      case "secondary":
        variantStyle = "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80";
        break;
      case "destructive":
        variantStyle = "border-transparent bg-red-500 text-white hover:bg-red-500/80";
        break;
      case "outline":
        variantStyle = "text-gray-950";
        break;
      case "tertiary": // Custom variant for connected apps
        variantStyle = "bg-emerald-100 text-emerald-700";
        break;
      default:
        variantStyle = "border-transparent bg-gray-900 text-white hover:bg-gray-900/80";
    }

    return (
      <span className={`${baseStyle} ${variantStyle} ${className}`}>
        {children}
      </span>
    );
  };
  const CustomProgress = ({ value, className }) => {
    const progressValue = Math.max(0, Math.min(100, value)); 
    return (
      <div
        className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      >
        <div
          className="h-full w-full flex-1 bg-gray-900 transition-all"
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6 p-1 md:p-0 font-inter">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-900 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Wellness & Mental Health
        </h1>
        <p className="text-pink-100 text-sm md:text-base">
          Track your well-being and maintain a healthy lifestyle
        </p>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="mood">
            Mood Journal
          </TabsTrigger>
          <TabsTrigger value="health">
            Health Sync
          </TabsTrigger>
          <TabsTrigger value="support">
            Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatsCard
              title="Mood Average"
              value={wellnessStats.weeklyMoodAverage}
              icon={Heart}
              color="text-pink-600"
              bgColor="bg-pink-100"
            />
            <StatsCard
              title="Sleep Average"
              value={`${wellnessStats.sleepAverage}h`}
              icon={Clock}
              color="text-blue-600"
              bgColor="bg-blue-100"
            />
            <StatsCard
              title="Screen Time"
              value={`${wellnessStats.screenTimeDaily}h`}
              icon={Settings}
              color="text-orange-600"
              bgColor="bg-orange-100"
            />
            <StatsCard
              title="Steps Today"
              value={wellnessStats.stepsToday}
              icon={CheckCircle}
              color="text-green-600"
              bgColor="bg-green-100"
            />
            <StatsCard
              title="Check-in Streak"
              value={wellnessStats.checkInStreak}
              icon={Star}
              color="text-purple-600"
              bgColor="bg-purple-100"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg">
            <CustomButton
              variant="outline"
              size="auto"
              className="group hover:border-pink-500" // Add group and hover class
              onClick={() => setActiveTab("mood")}
            >
              <div className="text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-pink-500 group-hover:scale-110 transition-transform duration-200" />
                <p className="font-medium">Daily Mood Check-in</p>
                <p className="text-sm text-gray-600">Log how you're feeling</p>
              </div>
            </CustomButton>
            <CustomButton
              variant="outline"
              size="auto"
              className="group hover:border-blue-500" // Add group and hover class
              onClick={() => setActiveTab("health")}
            >
              <div className="text-center">
                <Settings className="h-6 w-6 mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                <p className="font-medium">Sync Health Data</p>
                <p className="text-sm text-gray-600">Connect fitness apps</p>
              </div>
            </CustomButton>
            <CustomButton
              variant="outline"
              size="auto"
              className="group hover:border-green-500" // Add group and hover class
              onClick={() => setActiveTab("support")}
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform duration-200" />
                <p className="font-medium">Get Support</p>
                <p className="text-sm text-gray-600">Talk to a counselor</p>
              </div>
            </CustomButton>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Recent Mood Entries</CustomCardTitle>
                <CustomCardDescription>
                  Your mood tracking history
                </CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-3">
                  {recentMoods.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const MoodIcon = moodOptions.find(
                            (m) => m.value === entry.mood
                          )?.icon;
                          return MoodIcon ? (
                            <MoodIcon className="h-5 w-5 text-gray-600" />
                          ) : null;
                        })()}

                        <div>
                          <p className="font-medium">{entry.date}</p>
                          <p className="text-sm text-gray-600">
                            {entry.note}
                          </p>
                        </div>
                      </div>
                      <CustomBadge variant="outline">
                        {entry.mood}/6
                      </CustomBadge>
                    </div>
                  ))}
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Sleep Tracking</CustomCardTitle>
                <CustomCardDescription>
                  Your sleep pattern analysis
                </CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-3">
                  {sleepData.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{entry.date}</p>
                        <p className="text-sm text-gray-600">
                          {entry.hours} hours
                        </p>
                      </div>
                      <CustomBadge
                        variant={
                          entry.quality === "Excellent"
                            ? "default"
                            : entry.quality === "Good"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {entry.quality}
                      </CustomBadge>
                    </div>
                  ))}
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>
        </TabsContent>

        <TabsContent value="mood" className="space-y-6">
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Daily Mood Check-in</CustomCardTitle>
              <CustomCardDescription>
                How are you feeling today? Your emotions matter.
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Select your mood:
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {moodOptions.map((mood) => (
                    <CustomButton
                      key={mood.value}
                      variant={
                        selectedMood === mood.value.toString()
                          ? "default"
                          : "outline"
                      }
                      size="auto"
                      className="flex flex-col items-center"
                      onClick={() => setSelectedMood(mood.value.toString())}
                    >
                      <mood.icon className="h-6 w-6 mb-2" />
                      <span className="text-xs">{mood.label}</span>
                    </CustomButton>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  What's on your mind? (Optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-950"
                  rows={3}
                  placeholder="Share what's making you feel this way..."
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                />
              </div>

              <CustomButton onClick={handleMoodSubmit} size="full">
                <Plus className="mr-2 h-4 w-4" />
                Log Today's Mood
              </CustomButton>
            </CustomCardContent>
          </CustomCard>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Connected Apps</CustomCardTitle>
                <CustomCardDescription>
                  Sync your health and fitness data
                </CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Apple Health</p>
                      <p className="text-sm text-gray-600">
                        Syncing steps, sleep, heart rate
                      </p>
                    </div>
                  </div>
                  <CustomBadge variant="tertiary">Connected</CustomBadge>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Google Fit</p>
                      <p className="text-sm text-gray-600">
                        Activity tracking
                      </p>
                    </div>
                  </div>
                  <CustomButton variant="outline" size="sm">
                    Connect
                  </CustomButton>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Fitbit</p>
                      <p className="text-sm text-gray-600">
                        Comprehensive health tracking
                      </p>
                    </div>
                  </div>
                  <CustomButton variant="outline" size="sm">
                    Connect
                  </CustomButton>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Health Goals</CustomCardTitle>
                <CustomCardDescription>
                  Set and track your wellness objectives
                </CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Daily Steps</span>
                    <span className="text-sm text-gray-600">
                      6,847 / 10,000
                    </span>
                  </div>
                  <CustomProgress value={68} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Sleep Goal</span>
                    <span className="text-sm text-gray-600">
                      6.5 / 8 hours
                    </span>
                  </div>
                  <CustomProgress value={81} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Screen Time Limit
                    </span>
                    <span className="text-sm text-gray-600">
                      8.2 / 6 hours
                    </span>
                  </div>
                  <CustomProgress value={100} className="h-2 bg-red-100" />
                </div>

                <CustomButton variant="outline" size="full">
                  <Settings className="mr-2 h-4 w-4" />
                  Adjust Goals
                </CustomButton>
              </CustomCardContent>
            </CustomCard>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Crisis Support</CustomCardTitle>
                <CustomCardDescription>
                  Immediate help when you need it most
                </CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <CustomButton variant="destructive" size="full">
                  <Bell className="mr-2 h-4 w-4" />
                  Emergency Mental Health Support
                </CustomButton>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>National Helpline:</strong> 1800-123-4567
                  </p>
                  <p>
                    <strong>Campus Counselor:</strong> Available 24/7
                  </p>
                  <p>
                    <strong>Peer Support:</strong> Student volunteers
                  </p>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Wellness Mentors</CustomCardTitle>
                <CustomCardDescription>
                  Professional counselors and life coaches
                </CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-3">
                  {mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{mentor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {mentor.specialization}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">
                            {mentor.rating} • {mentor.sessions} sessions
                          </span>
                        </div>
                      </div>
                      <CustomButton
                        size="sm"
                        variant={
                          mentor.status === "Available" ? "default" : "secondary"
                        }
                        onClick={() => handleMentorConnect(mentor.name)}
                        disabled={mentor.status !== "Available"}
                      >
                        {mentor.status === "Available" ? "Connect" : "Busy"}
                      </CustomButton>
                    </div>
                  ))}
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>
        </TabsContent>
      </Tabs>
      <MessageBox
        message={message ? message.text : null}
        type={message ? message.type : null}
        onClose={() => setMessage(null)}
      />
    </div>
  );
};

export default WellnessModule;