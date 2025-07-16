import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { 
  Heart,
  Calendar,
  CheckCircle,
  Clock,
  Settings,
  Star,
  Plus,
  Users,
  Bell, Frown,
  Meh,
  Smile,
  SmilePlus,
  Laugh
} from "lucide-react";

const WellnessModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedMood, setSelectedMood] = useState("");
  const { toast } = useToast();

  // Mock data
  const wellnessStats = {
    weeklyMoodAverage: 7.2,
    sleepAverage: 6.5,
    screenTimeDaily: 8.2,
    stepsToday: 6847,
    checkInStreak: 12
  };

const moodOptions = [
  { icon: Frown, label: "Very Sad", value: 1 },
  { icon: Meh, label: "Sad", value: 2 },
  { icon: Smile, label: "Okay", value: 3 },
  { icon: SmilePlus, label: "Good", value: 4 },
  { icon: Laugh, label: "Great", value: 5 },
  { icon: Star, label: "Excellent", value: 6 }
];

  const recentMoods = [
    { date: "2024-03-25", mood: 4, note: "Good productive day" },
    { date: "2024-03-24", mood: 3, note: "Feeling stressed about exams" },
    { date: "2024-03-23", mood: 5, note: "Great day with friends" },
    { date: "2024-03-22", mood: 4, note: "Normal day" }
  ];

  const sleepData = [
    { date: "2024-03-25", hours: 7.5, quality: "Good" },
    { date: "2024-03-24", hours: 6.0, quality: "Poor" },
    { date: "2024-03-23", hours: 8.0, quality: "Excellent" },
    { date: "2024-03-22", hours: 6.5, quality: "Fair" }
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Stress Management",
      rating: 4.9,
      sessions: 45,
      status: "Available"
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      specialization: "Academic Counseling",
      rating: 4.8,
      sessions: 32,
      status: "Busy"
    },
    {
      id: 3,
      name: "Ms. Anjali Verma",
      specialization: "Life Coaching",
      rating: 4.7,
      sessions: 28,
      status: "Available"
    }
  ];

  const handleMoodSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Mood Logged",
      description: "Your daily mood check-in has been recorded successfully!"
    });
    setSelectedMood("");
  };

  const handleMentorConnect = (mentorName) => {
    toast({
      title: "Mentor Request Sent",
      description: `Your wellness consultation request has been sent to ${mentorName}!`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-900 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Wellness & Mental Health</h1>
        <p className="text-pink-100">Track your well-being and maintain a healthy lifestyle</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="mood">Mood Journal</TabsTrigger>
          <TabsTrigger value="health">Health Sync</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-pink-600">{wellnessStats.weeklyMoodAverage}</div>
                <div className="text-sm text-gray-600">Mood Average</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{wellnessStats.sleepAverage}h</div>
                <div className="text-sm text-gray-600">Sleep Average</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{wellnessStats.screenTimeDaily}h</div>
                <div className="text-sm text-gray-600">Screen Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{wellnessStats.stepsToday}</div>
                <div className="text-sm text-gray-600">Steps Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{wellnessStats.checkInStreak}</div>
                <div className="text-sm text-gray-600">Check-in Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
            <Button variant="outline" className="h-auto p-4" onClick={() => setActiveTab("mood")}>
              <div className="text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                <p className="font-medium">Daily Mood Check-in</p>
                <p className="text-sm text-gray-600">Log how you're feeling</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4" onClick={() => setActiveTab("health")}>
              <div className="text-center">
                <Settings className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="font-medium">Sync Health Data</p>
                <p className="text-sm text-gray-600">Connect fitness apps</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4" onClick={() => setActiveTab("support")}>
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="font-medium">Get Support</p>
                <p className="text-sm text-gray-600">Talk to a counselor</p>
              </div>
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Mood Entries</CardTitle>
                <CardDescription>Your mood tracking history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMoods.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {
  (() => {
    const MoodIcon = moodOptions.find(m => m.value === entry.mood)?.icon;
    return MoodIcon ? <MoodIcon className="h-5 w-5 text-gray-600" /> : null;
  })()
}

                        <div>
                          <p className="font-medium">{entry.date}</p>
                          <p className="text-sm text-gray-600">{entry.note}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{entry.mood}/6</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Tracking</CardTitle>
                <CardDescription>Your sleep pattern analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sleepData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{entry.date}</p>
                        <p className="text-sm text-gray-600">{entry.hours} hours</p>
                      </div>
                      <Badge variant={entry.quality === "Excellent" ? "default" : entry.quality === "Good" ? "secondary" : "outline"}>
                        {entry.quality}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mood" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Mood Check-in</CardTitle>
              <CardDescription>How are you feeling today? Your emotions matter.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Select your mood:</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
  {moodOptions.map((mood) => (
    <Button
      key={mood.value}
      variant={selectedMood === mood.value.toString() ? "default" : "outline"}
      className="h-auto p-4 flex flex-col items-center"
      onClick={() => setSelectedMood(mood.value.toString())}
    >
      <mood.icon className="h-6 w-6 mb-2" />
      <span className="text-xs">{mood.label}</span>
    </Button>
  ))}
</div>

              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">What's on your mind? (Optional)</label>
                <textarea 
                  className="w-full p-3 border border-gray-200 rounded-lg" 
                  rows={3}
                  placeholder="Share what's making you feel this way..."
                />
              </div>

              <Button onClick={handleMoodSubmit} className="w-full bg-black text-white">
                <Plus className="mr-2 h-4 w-4" />
                Log Today's Mood
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Apps</CardTitle>
                <CardDescription>Sync your health and fitness data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Apple Health</p>
                      <p className="text-sm text-gray-600">Syncing steps, sleep, heart rate</p>
                    </div>
                  </div>
                  <Badge variant="tertiary">Connected</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Google Fit</p>
                      <p className="text-sm text-gray-600">Activity tracking</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Fitbit</p>
                      <p className="text-sm text-gray-600">Comprehensive health tracking</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Goals</CardTitle>
                <CardDescription>Set and track your wellness objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Daily Steps</span>
                    <span className="text-sm text-gray-600">6,847 / 10,000</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Sleep Goal</span>
                    <span className="text-sm text-gray-600">6.5 / 8 hours</span>
                  </div>
                  <Progress value={81} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Screen Time Limit</span>
                    <span className="text-sm text-gray-600">8.2 / 6 hours</span>
                  </div>
                  <Progress value={100} className="h-2 bg-red-100" />
                </div>

                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Adjust Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Crisis Support</CardTitle>
                <CardDescription>Immediate help when you need it most</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full bg-red-500 text-white">
                  <Bell className="mr-2 h-4 w-4" />
                  Emergency Mental Health Support
                </Button>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>National Helpline:</strong> 1800-123-4567</p>
                  <p><strong>Campus Counselor:</strong> Available 24/7</p>
                  <p><strong>Peer Support:</strong> Student volunteers</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Mentors</CardTitle>
                <CardDescription>Professional counselors and life coaches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mentors.map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{mentor.name}</h4>
                        <p className="text-sm text-gray-600">{mentor.specialization}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{mentor.rating} • {mentor.sessions} sessions</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={mentor.status === "Available" ? "default" : "secondary"}
                        className="bg-black text-white"
                        onClick={() => handleMentorConnect(mentor.name)}
                        disabled={mentor.status !== "Available"}
                      >
                        {mentor.status === "Available" ? "Connect" : "Busy"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellnessModule;