import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  Users,
  Trophy,
  Heart,
  Bell,
  TrendingUp,
  Target,
  Store,
  Award,
  Lightbulb,
  Star
} from "lucide-react";
import NewsSection from "../pages/NewsSection";

const DashboardHome = ({ user }) => {
  const navigate = useNavigate();
  const [currentThought] = useState(() => {
    const thoughts = [
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Believe you can and you're halfway there. - Theodore Roosevelt"
    ];
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  });

  const quickStats = [
    { title: "Attendance", value: "89%", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Pending Tasks", value: "5", icon: Clock, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Wellness Score", value: "8.4/10", icon: Heart, color: "text-pink-600", bgColor: "bg-pink-100" },
    { title: "Notifications", value: "8", icon: Bell, color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  const upcomingEvents = [
    { title: "Machine Learning Assignment", due: "2024-03-28", type: "Assignment", urgent: true },
    { title: "Mid-semester Exams", due: "2024-04-05", type: "Exam", urgent: false },
    { title: "Tech Fest Registration", due: "2024-03-30", type: "Event", urgent: true },
    { title: "Library Book Return", due: "2024-03-29", type: "Library", urgent: false }
  ];

  const skillsAchievements = [
    { title: "AI/ML Lab Certification", progress: 85, badge: "Advanced", color: "bg-blue-500" },
    { title: "IoT Innovation Project", progress: 70, badge: "In Progress", color: "bg-yellow-500" },
    { title: "Cybersecurity Workshop", progress: 100, badge: "Completed", color: "bg-green-500" }
  ];

  const clubParticipation = [
    { club: "CodeCrafters Club", role: "Technical Lead", hours: 25, impact: "High" },
    { club: "NSS Unit", role: "Volunteer", hours: 40, impact: "Community Service" },
    { club: "Innovation Cell", role: "Member", hours: 15, impact: "Research" }
  ];

  const quickActions = [
    { title: "Check Attendance", icon: CheckCircle, color: "text-blue-500", action: "attendance" },
    { title: "Innovation Labs", icon: Lightbulb, color: "text-yellow-500", action: "skills" },
    { title: "Wellness Check", icon: Heart, color: "text-pink-500", action: "wellness" },
    { title: "GBU Store", icon: Store, color: "text-purple-500", action: "store" },
    { title: "Document Vault", icon: BookOpen, color: "text-green-500", action: "documents" },
    { title: "Task Manager", icon: Target, color: "text-indigo-500", action: "goals" },
    { title: "Hostel Services", icon: Users, color: "text-orange-500", action: "hostel" },
    { title: "Placement Portal", icon: Trophy, color: "text-red-500", action: "placement" }
  ];

  // Custom Card component
  const Card = ({ children, className = "", ...props }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );

  const CardHeader = ({ children, className = "" }) => (
    <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
  );

  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>{children}</div>
  );

  // Custom Badge component
  const Badge = ({ children, variant = "default", className = "", ...props }) => {
    const variants = {
      default: "bg-gray-100 text-gray-800",
      destructive: "bg-red-100 text-red-800",
      secondary: "bg-blue-100 text-blue-800",
      outline: "border border-gray-200 bg-transparent text-gray-800"
    };
    
    return (
      <span 
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  };

  // Custom Button component
  const Button = ({ children, variant = "default", className = "", ...props }) => {
    const variants = {
      default: "bg-gray-900 text-white hover:bg-gray-800",
      outline: "border border-gray-200 bg-white text-gray-700 ",
      secondary: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700"
    };
    
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="space-y-6 font-sans"> {/* Added font-sans for consistent font */}
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Hi, {user?.name || "Student"}! Welcome back to MyGBU Smart Campus 👋</h1>
          <p className="text-blue-100">Ready to continue your journey of learning and innovation?</p>
        </div>
      </div>

      {/* Thought of the Day */}
      <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">💡 Thought of the Day</h3>
              <p className="text-gray-700 italic leading-relaxed">{currentThought}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills & Achievements */}
        <Card>
          <CardHeader className="border-b border-transparent">
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              Skills & Innovation Labs
            </CardTitle>
            <CardDescription>Your learning progress and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsAchievements.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{skill.title}</h4>
                    {/* Updated Badge to dynamically match progress bar color for 'Advanced' */}
                    <Badge 
                      className={`${skill.badge === "Advanced" ? skill.color : "bg-gray-100 text-gray-800"} text-white`}
                    >
                      {skill.badge}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${skill.color}`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{skill.progress}% Complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Club Participation */}
        <Card>
          <CardHeader className="border-b border-transparent">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-500" />
              Club Participation & Social Impact
            </CardTitle>
            <CardDescription>Your community engagement and leadership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clubParticipation.map((club, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{club.club}</h4>
                    <p className="text-xs text-gray-600">{club.role} • {club.hours} hours</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {club.impact}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="border-b border-transparent">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Stay on top of your important tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${event.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-600">Due: {event.due}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={event.urgent ? "destructive" : "secondary"} className="text-xs">
                      {event.type}
                    </Badge>
                    {event.urgent && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placement Updates */}
        <Card>
          <CardHeader className="border-b border-transparent">
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-orange-500" />
              Placement & Career Updates
            </CardTitle>
            <CardDescription>Latest opportunities and career guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                <h4 className="font-medium text-sm text-green-800">New Job Opening</h4>
                <p className="text-xs text-green-600">Software Developer at TechCorp - Apply by March 30</p>
              </div>
              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                <h4 className="font-medium text-sm text-blue-800">Career Counseling</h4>
                <p className="text-xs text-blue-600">Book your session with industry mentors</p>
              </div>
              <div className="p-3 rounded-lg border border-purple-200 bg-purple-50">
                <h4 className="font-medium text-sm text-purple-800">Skill Assessment</h4>
                <p className="text-xs text-purple-600">Complete your technical assessment - 85% done</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader className="border-b border-transparent">
          <CardTitle>Quick Access Hub</CardTitle>
          <CardDescription>Access your most-used services and tools</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button 
                  key={index}
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center 
                             transform transition-transform duration-200 hover:scale-105 cursor-pointer" // Added animation and cursor
                  onClick={() => navigate(`/${action.action}`)}
                >
                  <Icon className={`h-6 w-6 mb-2 ${action.color}`} />
                  <span className="text-sm text-center">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
     <NewsSection /> 
    </div>
  );
};

export default DashboardHome;