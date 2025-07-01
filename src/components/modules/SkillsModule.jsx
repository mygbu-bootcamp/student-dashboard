import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { useToast } from "../../hooks/use-toast";
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
  Target
} from "lucide-react";

const SkillsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("skills");
  const { toast } = useToast();

  // Mock data for skills and labs
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Skills Development & Innovation Labs</h1>
        <p className="text-purple-100">Enhance your skills and participate in cutting-edge research</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">My Skills</TabsTrigger>
          <TabsTrigger value="labs">Innovation Labs</TabsTrigger>
          <TabsTrigger value="rural">Rural Innovation</TabsTrigger>
          <TabsTrigger value="badges">Badges & Awards</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
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
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={skill.verified ? "default" : "secondary"}>
                          {skill.level}
                        </Badge>
                        {skill.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{skill.category}</span>
                      <span>{skill.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-green-500" />
                  Add New Skill
                </CardTitle>
                <CardDescription>Tag skills with courses or projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skill Name</label>
                  <Input placeholder="e.g., Python Programming" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Technical</option>
                    <option>Soft Skills</option>
                    <option>Leadership</option>
                    <option>Communication</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Level</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Associated Project/Course</label>
                  <Input placeholder="Link to project or course" />
                </div>
                <Button onClick={handleSkillAdd} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="labs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {innovationLabs.map((lab) => (
              <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{lab.name}</span>
                    <Badge variant={lab.status === "Enrolled" ? "default" : lab.status === "Available" ? "secondary" : "destructive"}>
                      {lab.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{lab.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
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
                    <div className="flex justify-between text-sm">
                      <span>Enrollment</span>
                      <span>{lab.enrolled}/{lab.capacity}</span>
                    </div>
                    <Progress value={(lab.enrolled / lab.capacity) * 100} className="h-2" />
                  </div>
                  <Button 
                    onClick={() => handleLabRegistration(lab.name)}
                    disabled={lab.status === "Enrolled" || lab.status === "Waitlist"}
                    className="w-full"
                  >
                    {lab.status === "Enrolled" ? "Already Enrolled" : 
                     lab.status === "Waitlist" ? "Join Waitlist" : "Register Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rural" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-green-500" />
                  My Rural Innovation Projects
                </CardTitle>
                <CardDescription>Track your social impact initiatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ruralInnovations.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{project.title}</h4>
                      <Badge variant={project.status === "Submitted" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Mentor: {project.mentor}</p>
                      <p>Impact Area: {project.impact}</p>
                      <p>Date: {project.date}</p>
                      {project.badge && (
                        <div className="flex items-center mt-2">
                          <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-600 font-medium">{project.badge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-blue-500" />
                  Submit New Project
                </CardTitle>
                <CardDescription>Share your rural innovation solution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Title</label>
                  <Input placeholder="e.g., Smart Farming Solution" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Impact Category</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Agriculture</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Water Conservation</option>
                    <option>Energy</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Description</label>
                  <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="Describe your innovation..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Demo Video</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Video File
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Logbook</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose PDF File
                  </Button>
                </div>
                <Button onClick={handleProjectSubmit} className="w-full">
                  Submit Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <Card key={index} className={`${badge.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                <CardContent className="p-4 text-center">
                  <div className={`p-3 rounded-full inline-block mb-3 ${badge.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    <Trophy className={`h-8 w-8 ${badge.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`font-medium mb-2 ${badge.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                    {badge.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  {badge.earned ? (
                    <div className="text-xs text-yellow-600">
                      Earned on {badge.date}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      Not yet earned
                    </div>
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