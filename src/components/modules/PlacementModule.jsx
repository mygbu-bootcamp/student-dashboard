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
  Bell,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const PlacementModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const jobApplications = [
    {
      id: 1,
      company: "TechCorp",
      position: "Frontend Developer",
      status: "Applied",
      date: "2023-05-15"
    },
    {
      id: 2,
      company: "DataSystems",
      position: "Data Analyst Intern",
      status: "Interview",
      date: "2023-05-20"
    }
  ];

  const availableJobs = [
    {
      id: 1,
      title: "Junior React Developer",
      company: "WebWorks",
      type: "Full-time",
      location: "Remote",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      type: "Internship",
      location: "New York, NY",
      posted: "1 week ago"
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Product Manager",
      company: "Google",
      expertise: "Product Management, Career Growth"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "Microsoft",
      expertise: "Technical Interviews, Coding"
    }
  ];

  const handleJobApply = (jobId) => {
    toast({ title: "Application Submitted", description: "Your job application has been submitted successfully!" });
  };

  const handleResumeUpload = () => {
    toast({ title: "Resume Updated", description: "Your resume has been uploaded and updated successfully!" });
  };

  const handleMentorConnect = (mentorName) => {
    toast({ title: "Mentor Request Sent", description: `Your mentorship request has been sent to ${mentorName}!` });
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-900 to-blue-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Placement & Career Center</h1>
        <p className="text-green-100 text-sm sm:text-base lg:text-lg">Your gateway to internships, jobs, and career guidance</p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          <TabsTrigger value="dashboard" className="text-xs sm:text-sm py-1 sm:py-2">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="jobs" className="text-xs sm:text-sm py-1 sm:py-2">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Job Portal
          </TabsTrigger>
          <TabsTrigger value="resume" className="text-xs sm:text-sm py-1 sm:py-2">
            <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Resume Builder
          </TabsTrigger>
          <TabsTrigger value="mentors" className="text-xs sm:text-sm py-1 sm:py-2">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Alumni Mentors
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">12</span>
                  <Briefcase className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">+2 from last month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">3</span>
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">+1 from last week</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resume Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">28</span>
                  <BookOpen className="h-6 w-6 text-purple-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">+5 from last week</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">5</span>
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Connected mentors</p>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your job and internship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobApplications.map((application) => (
                  <div key={application.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1 mb-2 sm:mb-0">
                      <h3 className="font-medium">{application.position}</h3>
                      <p className="text-sm text-muted-foreground">{application.company}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={application.status === "Interview" ? "default" : "secondary"}>
                        {application.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{application.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search jobs, companies, skills..." 
                    className="pl-10 w-full"
                  />
                </div>
                
                {/* Mobile filter toggle */}
                <Button 
                  variant="outline" 
                  className="sm:hidden flex items-center justify-between"
                  onClick={toggleMobileFilters}
                >
                  <span>Filters</span>
                  {showMobileFilters ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
                
                {/* Desktop filter buttons */}
                <div className="hidden sm:flex gap-2">
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Job Alerts
                  </Button>
                </div>
              </div>
              
              {/* Mobile filters dropdown */}
              {showMobileFilters && (
                <div className="mt-3 sm:hidden flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Jobs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Job Alerts
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {availableJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{job.company}</span>
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="text-xs sm:text-sm"
                        onClick={() => handleJobApply(job.id)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resume Tab */}
        <TabsContent value="resume" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>Keep your resume updated for better opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <Button className="mt-4" onClick={handleResumeUpload}>
                      Upload Resume
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last updated: May 12, 2023</span>
                    <Button variant="link" className="p-0 h-auto">
                      Download Current
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
                <CardDescription>Get feedback on your resume's strength</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">ATS Compatibility</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Keyword Optimization</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <Star className="mr-2 h-4 w-4" />
                      Get Professional Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mentors Tab */}
        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle>{mentor.name}</CardTitle>
                      <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium">Expertise</h4>
                      <p className="text-sm text-muted-foreground">{mentor.expertise}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleMentorConnect(mentor.name)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Request Mentorship
                    </Button>
                  </div>
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