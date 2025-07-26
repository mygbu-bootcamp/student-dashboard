import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
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

const SkillsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("skills");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { toast } = useToast();

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
      status: "Enrolled"
    },
    {
      id: 2,
      name: "IoT Innovation Lab",
      description: "Internet of Things projects and prototyping",
      capacity: 20,
      enrolled: 12,
      mentor: "Prof. Rajesh Kumar",
      schedule: "Tue, Thu - 3:00 PM",
      status: "Available"
    },
    {
      id: 3,
      name: "FinTech Lab",
      description: "Financial technology solutions",
      capacity: 15,
      enrolled: 15,
      mentor: "Dr. Anjali Verma",
      schedule: "Wed, Fri - 4:00 PM",
      status: "Waitlist"
    },
    {
      id: 4,
      name: "Cybersecurity Lab",
      description: "Information security and ethical hacking",
      capacity: 20,
      enrolled: 8,
      mentor: "Mr. Vikram Singh",
      schedule: "Mon, Thu - 1:00 PM",
      status: "Available"
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          <TabsTrigger value="skills" className="text-xs sm:text-sm py-1 sm:py-2">
            <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            My Skills
          </TabsTrigger>
          <TabsTrigger value="labs" className="text-xs sm:text-sm py-1 sm:py-2">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Labs
          </TabsTrigger>
          <TabsTrigger value="rural" className="text-xs sm:text-sm py-1 sm:py-2">
            <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Rural
          </TabsTrigger>
          <TabsTrigger value="badges" className="text-xs sm:text-sm py-1 sm:py-2">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Badges
          </TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-blue-500" />
                  Current Skills
                </CardTitle>
                <CardDescription>Track your skill development progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-green-500" />
                  Add New Skill
                </CardTitle>
                <CardDescription>Tag skills with courses or projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Skill Name</label>
                  <Input placeholder="e.g., Python Programming" className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Category</label>
                  <select className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-xs sm:text-sm">
                    <option>Technical</option>
                    <option>Soft Skills</option>
                    <option>Leadership</option>
                    <option>Communication</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Current Level</label>
                  <select className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-xs sm:text-sm">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Associated Project/Course</label>
                  <Input placeholder="Link to project or course" className="text-xs sm:text-sm" />
                </div>
                <Button 
                  onClick={handleSkillAdd} 
                  className="w-full py-2 text-xs sm:text-sm bg-black text-white"
                >
                  <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  Add Skill
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Labs Tab */}
        <TabsContent value="labs" className="space-y-6">
          {/* Filter Controls - Mobile */}
          <div className="sm:hidden">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between"
              onClick={toggleMobileFilters}
            >
              <span>Filter Labs</span>
              {showMobileFilters ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            
            {showMobileFilters && (
              <Card className="mt-2">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Lab Type</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg text-xs">
                      <option>All Labs</option>
                      <option>Technical</option>
                      <option>Research</option>
                      <option>Interdisciplinary</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Availability</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg text-xs">
                      <option>All Statuses</option>
                      <option>Available</option>
                      <option>Waitlist</option>
                      <option>Enrolled</option>
                    </select>
                  </div>
                  <Button variant="outline" className="w-full text-xs">
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Filter Controls - Desktop */}
          <div className="hidden sm:flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search labs..." className="text-sm" />
            </div>
            <select className="p-2 border rounded-lg text-sm">
              <option>All Labs</option>
              <option>Technical</option>
              <option>Research</option>
              <option>Interdisciplinary</option>
            </select>
            <select className="p-2 border border-gray-200 rounded-lg text-sm">
              <option>All Statuses</option>
              <option>Available</option>
              <option>Waitlist</option>
              <option>Enrolled</option>
            </select>
            <Button variant="outline" className="text-sm">
              Apply Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {innovationLabs.map((lab) => (
              <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">{lab.name}</span>
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
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{lab.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-600">Mentor:</span>
                      <p className="font-medium">{lab.mentor}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Schedule:</span>
                      <p className="font-medium">{lab.schedule}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Enrollment</span>
                      <span>
                        {lab.enrolled}/{lab.capacity}
                      </span>
                    </div>
                    <Progress value={(lab.enrolled / lab.capacity) * 100} className="h-2" />
                  </div>
                  <Button
                    onClick={() => handleLabRegistration(lab.name)}
                    disabled={lab.status === "Enrolled" || lab.status === "Waitlist"}
                    className="w-full py-2 text-xs sm:text-sm bg-black text-white"
                    size="sm"
                  >
                    {lab.status === "Enrolled"
                      ? "Already Enrolled"
                      : lab.status === "Waitlist"
                      ? "Join Waitlist"
                      : "Register Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rural Innovation Tab */}
        <TabsContent value="rural" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  My Rural Innovation Projects
                </CardTitle>
                <CardDescription>Track your social impact initiatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-blue-500" />
                  Submit New Project
                </CardTitle>
                <CardDescription>Share your rural innovation solution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Project Title</label>
                  <Input placeholder="e.g., Smart Farming Solution" className="text-xs sm:text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Impact Category</label>
                  <select className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-xs sm:text-sm">
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
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-xs sm:text-sm" 
                    rows={3} 
                    placeholder="Describe your innovation..." 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Upload Demo Video</label>
                  <Button variant="outline" className="w-full py-2 text-xs sm:text-sm">
                    <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Choose Video File
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Upload Logbook</label>
                  <Button variant="outline" className="w-full py-2 text-xs sm:text-sm">
                    <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Choose PDF File
                  </Button>
                </div>
                <Button 
                  onClick={handleProjectSubmit} 
                  className="w-full py-2 text-xs sm:text-sm"
                >
                  Submit Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {badges.map((badge, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-shadow ${
                  badge.earned
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <CardContent className="p-4 sm:p-6 text-center">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsModule;