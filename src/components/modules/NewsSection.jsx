import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Calendar, Trophy, Users, Lightbulb, Award, ExternalLink } from "lucide-react";

const NewsSection = () => {
  const achievements = [
    {
      id: 1,
      title: "GBU Students Win National Hackathon",
      description: "Team 'InnovateGBU' secures first place in the National Innovation Challenge 2024",
      category: "Achievement",
      date: "March 15, 2024",
      image: "/api/placeholder/300/200",
      badge: "National Level",
      type: "student"
    },
    {
      id: 2,
      title: "Research Paper Published in IEEE",
      description: "Dr. Priya Sharma's research on AI in Agriculture featured in prestigious journal",
      category: "Research",
      date: "March 12, 2024",
      image: "/api/placeholder/300/200",
      badge: "Faculty Achievement",
      type: "faculty"
    },
    {
      id: 3,
      title: "GBU Innovation Lab Launched",
      description: "State-of-the-art AI/ML and IoT research facility inaugurated by Hon'ble Vice Chancellor",
      category: "Infrastructure",
      date: "March 10, 2024",
      image: "/api/placeholder/300/200",
      badge: "University News",
      type: "university"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Fest 2024 - Technovation",
      description: "Annual technical festival featuring coding competitions, workshops, and industry talks",
      date: "April 5-7, 2024",
      registration: "Open",
      category: "Technical Event",
      icon: Lightbulb
    },
    {
      id: 2,
      title: "Industry Placement Drive",
      description: "Multi-company recruitment drive for final year students across all branches",
      date: "March 25-30, 2024",
      registration: "Apply Now",
      category: "Placement",
      icon: Trophy
    },
    {
      id: 3,
      title: "NSS Community Service Week",
      description: "Volunteer for rural development and social awareness programs",
      date: "April 1-8, 2024",
      registration: "Open",
      category: "Social Impact",
      icon: Users
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Mid-Semester Exam Schedule Released",
      description: "Check your exam timetable and prepare accordingly",
      type: "Academic",
      urgent: true,
      date: "March 20, 2024"
    },
    {
      id: 2,
      title: "New Course Registration Open",
      description: "Register for elective courses for next semester",
      type: "Registration",
      urgent: false,
      date: "March 18, 2024"
    },
    {
      id: 3,
      title: "Scholarship Applications Due",
      description: "Merit-based scholarship applications close on March 30",
      type: "Financial Aid",
      urgent: true,
      date: "March 15, 2024"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Achievements Carousel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-500" />
            University Achievements & Highlights
          </CardTitle>
          <CardDescription>Celebrating excellence in academics, research, and innovation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-blue-600" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={achievement.type === 'student' ? 'default' : achievement.type === 'faculty' ? 'secondary' : 'outline'}>
                      {achievement.badge}
                    </Badge>
                    <span className="text-xs text-gray-500">{achievement.date}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Upcoming Events & Competitions
            </CardTitle>
            <CardDescription>Don't miss out on exciting opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{event.date}</span>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          {event.registration}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-orange-500" />
              Important Announcements
            </CardTitle>
            <CardDescription>Stay updated with university notices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className={`p-3 rounded-lg border ${
                    announcement.urgent 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{announcement.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={announcement.urgent ? "destructive" : "secondary"} className="text-xs">
                        {announcement.type}
                      </Badge>
                      {announcement.urgent && (
                        <span className="text-xs text-red-600 font-medium">Urgent</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{announcement.description}</p>
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Footer */}
      <Card className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🚀 Ready to Shape Your Future?</h3>
          <p className="text-blue-100 mb-4">
            Join thousands of GBU students who are already transforming their dreams into reality through innovation, dedication, and smart learning.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              #InnovateWithGBU
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              #SmartCampus
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              #FutureReady
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsSection;
