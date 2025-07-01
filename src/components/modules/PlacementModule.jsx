import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useToast } from "../../hooks/use-toast";
import { 
  Briefcase,
  Upload,
  Star,
  Users,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  Settings,
  BookOpen,
  Search,
  Filter,
  Bell
} from "lucide-react";

const PlacementModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // Mock data
  const jobApplications = [
    {
      id: 1,
      company: "TCS",
      position: "Software Developer",
      status: "Applied",
      appliedDate: "2024-03-15",
      package: "₹3.5 LPA",
      type: "Full-time"
    },
    {
      id: 2,
      company: "Infosys",
      position: "System Engineer",
      status: "Interview Scheduled",
      appliedDate: "2024-03-10",
      package: "₹4.0 LPA",
      type: "Full-time"
    },
    {
      id: 3,
      company: "Wipro",
      position: "Data Analyst Intern",
      status: "Selected",
      appliedDate: "2024-02-28",
      package: "₹15,000/month",
      type: "Internship"
    }
  ];

  const availableJobs = [
    {
      id: 1,
      company: "Microsoft",
      position: "Software Engineer Intern",
      package: "₹50,000/month",
      location: "Bangalore",
      type: "Internship",
      deadline: "2024-04-15",
      requirements: ["Python", "React", "Database"],
      matchScore: 92
    },
    {
      id: 2,
      company: "Amazon",
      position: "Cloud Support Engineer",
      package: "₹6.5 LPA",
      location: "Hyderabad",
      type: "Full-time",
      deadline: "2024-04-20",
      requirements: ["AWS", "Linux", "Python"],
      matchScore: 85
    },
    {
      id: 3,
      company: "Google",
      position: "Product Management Intern",
      package: "₹80,000/month",
      location: "Gurgaon",
      type: "Internship",
      deadline: "2024-04-10",
      requirements: ["Analytics", "Product Strategy", "Communication"],
      matchScore: 78
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Priya Sharma",
      company: "Microsoft",
      position: "Senior Software Engineer",
      experience: "8 years",
      specialization: "Full Stack Development",
      sessions: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: "Rahul Gupta",
      company: "Amazon",
      position: "Product Manager",
      experience: "6 years",
      specialization: "Product Management",
      sessions: 8,
      rating: 4.9
    },
    {
      id: 3,
      name: "Anjali Verma",
      company: "Google",
      position: "Data Scientist",
      experience: "5 years",
      specialization: "Machine Learning",
      sessions: 15,
      rating: 4.7
    }
  ];

  const handleJobApply = (jobId) => {
    toast({
      title: "Application Submitted",
      description: "Your job application has been submitted successfully!"
    });
  };

  const handleResumeUpload = () => {
    toast({
      title: "Resume Updated",
      description: "Your resume has been uploaded and updated successfully!"
    });
  };

  const handleMentorConnect = (mentorName) => {
    toast({
      title: "Mentor Request Sent",
      description: `Your mentorship request has been sent to ${mentorName}!`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Placement & Career Center</h1>
        <p className="text-green-100">Your gateway to internships, jobs, and career guidance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="jobs">Job Portal</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
          <TabsTrigger value="mentors">Alumni Mentors</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Briefcase className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">Selected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">2</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Mentors</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your job and internship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{app.position}</h4>
                      <p className="text-sm text-gray-600">{app.company} • {app.package}</p>
                      <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={app.status === "Selected" ? "default" : "secondary"}>
                        {app.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{app.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search jobs, companies, skills..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Job Alerts
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{job.position}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{job.matchScore}% Match</span>
                      </div>
                      <Badge variant={job.type === "Internship" ? "secondary" : "default"}>
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Package:</span>
                      <p className="font-medium">{job.package}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Deadline:</span>
                      <p className="font-medium">{job.deadline}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Required Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.requirements.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleJobApply(job.id)} className="flex-1">
                      Apply Now
                    </Button>
                    <Button variant="outline">View Details</Button>
                    <Button variant="outline">Save</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5 text-blue-500" />
                  Resume Upload
                </CardTitle>
                <CardDescription>Upload and manage your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload your resume (PDF, DOC)</p>
                  <Button variant="outline">Choose File</Button>
                </div>
                <Button onClick={handleResumeUpload} className="w-full">
                  Update Resume
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
                <CardDescription>AI-powered resume insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Score</span>
                    <span className="font-bold text-green-600">85/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ATS Compatibility</span>
                    <span className="font-bold text-blue-600">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Skill Matches</span>
                    <span className="font-bold text-purple-600">12/15</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Suggestions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Add more technical skills</li>
                    <li>• Include project quantifications</li>
                    <li>• Update contact information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.position}</p>
                    <p className="text-sm text-gray-500">{mentor.company}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{mentor.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium">{mentor.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {mentor.specialization}
                    </Badge>
                  </div>

                  <Button 
                    onClick={() => handleMentorConnect(mentor.name)}
                    className="w-full"
                  >
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlacementModule;