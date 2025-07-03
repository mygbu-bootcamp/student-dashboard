import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Heart, 
  Users, 
  Award, 
  Clock,
  MapPin,
  Plus,
  Calendar,
  CheckCircle,
  Star,
  Trophy,
  Upload,
  Eye
} from "lucide-react";

const SocialImpactModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    hours: "",
    location: "",
    date: ""
  });

  // Mock data
  const userStats = {
    totalHours: 156,
    activitiesCompleted: 23,
    rank: 12,
    badgesEarned: 8,
    impactScore: 890
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
      impact: "Environmental Conservation"
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
      impact: "Health & Wellness"
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
      impact: "Education & Skill Development"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Arjun Patel", hours: 245, activities: 34, score: 1250 },
    { rank: 2, name: "Priya Sharma", hours: 223, activities: 31, score: 1180 },
    { rank: 3, name: "Rohit Kumar", hours: 198, activities: 28, score: 1050 },
    { rank: 4, name: "Sneha Gupta", hours: 187, activities: 26, score: 980 },
    { rank: 5, name: "Amit Singh", hours: 172, activities: 24, score: 920 },
    { rank: 12, name: "You", hours: userStats.totalHours, activities: userStats.activitiesCompleted, score: userStats.impactScore }
  ];

  const badges = [
    { id: 1, name: "Environmental Champion", description: "50+ hours in environmental activities", earned: true, icon: "🌱" },
    { id: 2, name: "Health Advocate", description: "30+ hours in health initiatives", earned: true, icon: "🏥" },
    { id: 3, name: "Education Pioneer", description: "40+ hours in education programs", earned: true, icon: "📚" },
    { id: 4, name: "Community Leader", description: "Led 5+ community projects", earned: false, icon: "👥" },
    { id: 5, name: "Impact Maker", description: "1000+ impact score", earned: false, icon: "⭐" }
  ];

  const programs = [
    {
      id: 1,
      name: "NSS (National Service Scheme)",
      description: "Community service and social development activities",
      enrolled: true,
      officer: "Dr. Priya Sharma",
      coordinator: "Arjun Patel",
      members: 45
    },
    {
      id: 2,
      name: "NCC (National Cadet Corps)",
      description: "Character building and leadership development",
      enrolled: false,
      officer: "Major Rajesh Singh",
      coordinator: "Rohit Kumar",
      members: 38
    }
  ];

  const handleSubmitActivity = () => {
    console.log("Submitting new activity:", newActivity);
    setNewActivity({
      title: "",
      description: "",
      hours: "",
      location: "",
      date: ""
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "text-green-600 bg-green-100";
      case "Pending": return "text-yellow-600 bg-yellow-100";
      case "Rejected": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Social Impact & Community Service</h1>
            <p className="text-green-100">Track your NSS/NCC activities and community contributions</p>
          </div>
          <div className="text-center">
            <Heart className="h-12 w-12 text-white mb-2" />
            <div className="bg-white/20 rounded-lg p-2">
              <div className="text-sm text-green-100">Impact Score</div>
              <div className="text-lg font-bold">{userStats.impactScore}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">{userStats.totalHours}</div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">{userStats.activitiesCompleted}</div>
            <div className="text-sm text-gray-600">Activities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-600">#{userStats.rank}</div>
            <div className="text-sm text-gray-600">Rank</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{userStats.badgesEarned}</div>
            <div className="text-sm text-gray-600">Badges</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-600">{userStats.impactScore}</div>
            <div className="text-sm text-gray-600">Impact Score</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest community service contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.hours} hours • {activity.date}</p>
                        <Badge className={`mt-1 ${getStatusColor(activity.status)}`} variant="outline">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Programs</CardTitle>
                <CardDescription>Your active service programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs.filter(p => p.enrolled).map((program) => (
                    <div key={program.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{program.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <div>Officer: {program.officer}</div>
                          <div>Coordinator: {program.coordinator}</div>
                        </div>
                        <Badge>{program.members} members</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          {/* Add New Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Log New Activity</CardTitle>
              <CardDescription>Record your community service activities for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Title</label>
                  <Input
                    placeholder="e.g., Tree Plantation Drive"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hours Contributed</label>
                  <Input
                    type="number"
                    placeholder="8"
                    value={newActivity.hours}
                    onChange={(e) => setNewActivity({...newActivity, hours: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="e.g., Community Park, Sector 12"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe your activity and impact..."
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={handleSubmitActivity}>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit for Approval
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Activities</CardTitle>
              <CardDescription>Track all your community service activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{activity.title}</h4>
                          <p className="text-gray-600 mb-2">{activity.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {activity.hours} hours
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {activity.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {activity.location}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`mb-2 ${getStatusColor(activity.status)}`} variant="outline">
                            {activity.status}
                          </Badge>
                          <div className="text-sm text-gray-500">
                            <div>Role: {activity.role}</div>
                            <div>Officer: {activity.officer}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{activity.impact}</Badge>
                          {activity.certificate && (
                            <div className="flex items-center text-green-600">
                              <Award className="h-4 w-4 mr-1" />
                              <span className="text-sm">Certificate Available</span>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          {activity.certificate && (
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Download Certificate
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

        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {programs.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Program Officer:</span>
                      <span>{program.officer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Student Coordinator:</span>
                      <span>{program.coordinator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Active Members:</span>
                      <Badge>{program.members}</Badge>
                    </div>
                    <div className="pt-3">
                      {program.enrolled ? (
                        <Badge className="text-green-600 bg-green-100">Enrolled</Badge>
                      ) : (
                        <Button size="sm">
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

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Impact Leaderboard</CardTitle>
              <CardDescription>Top contributors in social service activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((person) => (
                  <div 
                    key={person.rank} 
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      person.name === "You" ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        person.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"
                      }`}>
                        {person.rank <= 3 ? "🏆" : person.rank}
                      </div>
                      <div>
                        <div className={`font-medium ${person.name === "You" ? "text-blue-600" : ""}`}>
                          {person.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {person.hours} hours • {person.activities} activities
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{person.score}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
              <CardDescription>Unlock badges as you contribute to the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge) => (
                  <Card key={badge.id} className={`${badge.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"}`}>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h4 className={`font-medium mb-2 ${badge.earned ? "text-yellow-800" : "text-gray-500"}`}>
                        {badge.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      {badge.earned ? (
                        <Badge className="text-yellow-600 bg-yellow-100">Earned</Badge>
                      ) : (
                        <Badge variant="outline">Not Earned</Badge>
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
  );
};

export default SocialImpactModule;