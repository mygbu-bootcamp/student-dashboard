import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Users, 
  Calendar, 
  Trophy, 
  Upload, 
  Clock,
  MapPin,
  Star,
  Award,
  CheckCircle,
  Plus,
  Search,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const ClubsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("my-clubs");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock data for clubs
  const myClubs = [
    {
      id: 1,
      name: "Tech Innovation Club",
      role: "Member",
      joinDate: "2024-01-15",
      status: "Active",
      events: 5,
      hours: 25,
      description: "Fostering technological innovation and entrepreneurship"
    },
    {
      id: 2,
      name: "Literary Society",
      role: "Coordinator",
      joinDate: "2023-09-10",
      status: "Active",
      events: 8,
      hours: 40,
      description: "Promoting literature, writing, and creative expression"
    },
    {
      id: 3,
      name: "Environmental Club",
      role: "Volunteer",
      joinDate: "2024-02-20",
      status: "Active",
      events: 3,
      hours: 15,
      description: "Creating awareness about environmental conservation"
    }
  ];

  const availableClubs = [
    {
      id: 4,
      name: "Robotics Club",
      members: 45,
      category: "Technical",
      description: "Build and program robots for competitions and projects",
      requirements: "Basic programming knowledge preferred",
      meetingTime: "Every Saturday 2-5 PM"
    },
    {
      id: 5,
      name: "Photography Club",
      members: 32,
      category: "Arts",
      description: "Capture moments and develop photography skills",
      requirements: "Own camera (DSLR/Smartphone)",
      meetingTime: "Every Sunday 10 AM-12 PM"
    },
    {
      id: 6,
      name: "Debate Society",
      members: 28,
      category: "Academic",
      description: "Enhance public speaking and argumentation skills",
      requirements: "Good communication skills",
      meetingTime: "Every Wednesday 4-6 PM"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Talk: AI in Healthcare",
      club: "Tech Innovation Club",
      date: "2024-04-10",
      time: "3:00 PM - 5:00 PM",
      venue: "Auditorium A",
      status: "Registered",
      type: "Workshop",
      maxParticipants: 100,
      registered: 67
    },
    {
      id: 2,
      title: "Poetry Evening",
      club: "Literary Society",
      date: "2024-04-12",
      time: "6:00 PM - 8:00 PM",
      venue: "Conference Hall",
      status: "Not Registered",
      type: "Cultural",
      maxParticipants: 50,
      registered: 23
    },
    {
      id: 3,
      title: "Tree Plantation Drive",
      club: "Environmental Club",
      date: "2024-04-15",
      time: "7:00 AM - 11:00 AM",
      venue: "Campus Grounds",
      status: "Registered",
      type: "Service",
      maxParticipants: 200,
      registered: 156
    }
  ];

  const myParticipation = [
    {
      id: 1,
      eventName: "Annual Tech Fest",
      club: "Tech Innovation Club",
      date: "2024-03-20",
      role: "Participant",
      hours: 8,
      status: "Completed",
      certificate: true,
      feedback: "Excellent organization and learning experience"
    },
    {
      id: 2,
      eventName: "Inter-college Debate",
      club: "Literary Society",
      date: "2024-03-15",
      role: "Coordinator",
      hours: 12,
      status: "Completed",
      certificate: true,
      feedback: "Successfully managed the event logistics"
    },
    {
      id: 3,
      eventName: "Clean Campus Campaign",
      club: "Environmental Club",
      date: "2024-03-10",
      role: "Volunteer",
      hours: 4,
      status: "Pending Approval",
      certificate: false,
      feedback: ""
    }
  ];

  const achievements = [
    {
      title: "Outstanding Coordinator",
      club: "Literary Society",
      date: "2024-03-01",
      description: "For exceptional leadership in organizing inter-college events"
    },
    {
      title: "Active Participant",
      club: "Tech Innovation Club",
      date: "2024-02-15",
      description: "For consistent participation in club activities"
    },
    {
      title: "Environmental Champion",
      club: "Environmental Club",
      date: "2024-01-20",
      description: "For leading sustainability initiatives on campus"
    }
  ];

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Clubs & Societies</h1>
        <p className="text-indigo-100 text-sm sm:text-base">Connect, collaborate, and contribute to campus life</p>
      </div>

      {/* Mobile Tab Selector */}
      <div className="sm:hidden">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={toggleMobileMenu}
        >
          <span>
            {activeTab === "my-clubs" && "My Clubs"}
            {activeTab === "discover" && "Discover"}
            {activeTab === "events" && "Events"}
            {activeTab === "participation" && "My Activity"}
            {activeTab === "achievements" && "Achievements"}
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
              variant={activeTab === "my-clubs" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("my-clubs");
                setShowMobileMenu(false);
              }}
            >
              My Clubs
            </Button>
            <Button 
              variant={activeTab === "discover" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("discover");
                setShowMobileMenu(false);
              }}
            >
              Discover
            </Button>
            <Button 
              variant={activeTab === "events" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("events");
                setShowMobileMenu(false);
              }}
            >
              Events
            </Button>
            <Button 
              variant={activeTab === "participation" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("participation");
                setShowMobileMenu(false);
              }}
            >
              My Activity
            </Button>
            <Button 
              variant={activeTab === "achievements" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("achievements");
                setShowMobileMenu(false);
              }}
            >
              Achievements
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Tabs Navigation */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="hidden sm:block"
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="my-clubs">My Clubs</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="participation">My Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* My Clubs Tab */}
      {(activeTab === "my-clubs") && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {myClubs.map((club) => (
              <Card key={club.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500" />
                    <Badge variant={club.role === "Coordinator" ? "default" : "secondary"} className="text-xs sm:text-sm">
                      {club.role}
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{club.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{club.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div>
                        <p className="text-gray-500">Joined</p>
                        <p className="font-medium">{club.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                          <span>{club.status}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">Events</p>
                        <p className="font-medium">{club.events}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hours</p>
                        <p className="font-medium">{club.hours}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs sm:text-sm">
                        <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Details
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1 text-xs sm:text-sm">
                        Leave
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discover Clubs Tab */}
      {(activeTab === "discover") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input placeholder="Search clubs..." className="pl-8 sm:pl-10 text-xs sm:text-sm" />
            </div>
            <Button variant="outline" className="text-xs sm:text-sm">
              Filter by Category
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {availableClubs.map((club) => (
              <Card key={club.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                    <Badge variant="outline" className="text-xs sm:text-sm">{club.category}</Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{club.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{club.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="text-xs sm:text-sm space-y-1 sm:space-y-2">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 sm:mr-2" />
                        <span>{club.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-1 sm:mr-2" />
                        <span>{club.meetingTime}</span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-800">
                        <strong>Requirements:</strong> {club.requirements}
                      </p>
                    </div>
                    <Button className="w-full text-xs sm:text-sm">
                      <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Join Club
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {(activeTab === "events") && (
        <div className="space-y-6">
          <div className="space-y-3 sm:space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold">{event.title}</h3>
                        <Badge variant={event.status === "Registered" ? "default" : "outline"} className="text-xs sm:text-sm">
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{event.club}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <Badge variant="secondary" className="text-xs sm:text-sm">{event.type}</Badge>
                        <span className="text-gray-600">
                          {event.registered}/{event.maxParticipants} registered
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <Button variant={event.status === "Registered" ? "secondary" : "default"} className="text-xs sm:text-sm">
                      {event.status === "Registered" ? "Registered" : "Register"}
                    </Button>
                    <Button variant="outline" className="text-xs sm:text-sm">Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* My Activity Tab */}
      {(activeTab === "participation") && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">12</div>
                <div className="text-xs sm:text-sm text-gray-600">Events Participated</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-blue-600">80</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-purple-600">8</div>
                <div className="text-xs sm:text-sm text-gray-600">Certificates Earned</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {myParticipation.map((participation) => (
              <Card key={participation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1">{participation.eventName}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{participation.club}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                        <span>Date: {participation.date}</span>
                        <span>Role: {participation.role}</span>
                        <span>Hours: {participation.hours}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 sm:gap-2 mt-2 sm:mt-0">
                      <Badge variant={
                        participation.status === "Completed" ? "default" :
                        participation.status === "Pending Approval" ? "secondary" : "outline"
                      } className="text-xs sm:text-sm">
                        {participation.status}
                      </Badge>
                      {participation.certificate && (
                        <Badge variant="outline" className="text-xs sm:text-sm text-green-600">
                          Certificate Available
                        </Badge>
                      )}
                    </div>
                  </div>
                  {participation.feedback && (
                    <div className="bg-green-50 p-2 sm:p-3 rounded-lg mb-2 sm:mb-3">
                      <p className="text-xs sm:text-sm text-green-800">
                        <strong>Feedback:</strong> {participation.feedback}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-1 sm:gap-2">
                    {participation.certificate && (
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                        <Award className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Certificate
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                      <Upload className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Upload Proof
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {(activeTab === "achievements") && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-yellow-200 bg-yellow-50 hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <Award className="h-8 w-8 sm:h-10 sm:h-12 text-yellow-600 mx-auto mb-2 sm:mb-3" />
                    <h3 className="font-semibold text-base sm:text-lg">{achievement.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{achievement.club}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">{achievement.description}</p>
                    <Badge variant="secondary" className="text-xs sm:text-sm">{achievement.date}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubsModule;