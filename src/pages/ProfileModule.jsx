import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Download,
  Edit,
  Plus,
  Verified,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const ProfileModule = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@gbu.ac.in",
    phone: "+91 9876543210",
    address: "Greater Noida, UP, India",
    about: "Computer Science student passionate about AI/ML and software development. Active in coding competitions and technical projects.",
    skills: ["Python", "Java", "React", "Machine Learning", "Data Structures"],
    certifications: [
      { name: "Machine Learning Specialization", provider: "Coursera", date: "2023", verified: true },
      { name: "AWS Cloud Practitioner", provider: "Amazon", date: "2024", verified: true },
      { name: "Google Data Analytics", provider: "Google", date: "2023", verified: false }
    ],
    achievements: [
      "Dean's List - Semester 5",
      "Winner - CodeFest 2023",
      "Best Project Award - Software Engineering"
    ]
  });

  const user = {
    name: "Aarav Sharma",
    email: "aarav.sharma@gbu.ac.in",
    programme: "B.Tech",
    branch: "Computer Science & Engineering",
    semester: "6th",
    studentId: "2021BCS001",
    photo:"A"
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const addSkill = () => {
    const skill = prompt("Enter new skill:");
    if (skill) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile & Resume</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your profile and build your academic resume</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto justify-center sm:justify-start">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Download Resume</span>
            <span className="sm:hidden">Resume</span>
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white"
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {/* Mobile Tab Selector */}
      <div className="sm:hidden">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={toggleMobileMenu}
        >
          <span>
            {activeTab === "profile" && "Profile Info"}
            {activeTab === "academic" && "Academic Details"}
            {activeTab === "resume" && "Resume Builder"}
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
              variant={activeTab === "profile" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("profile");
                setShowMobileMenu(false);
              }}
            >
              Profile Info
            </Button>
            <Button 
              variant={activeTab === "academic" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("academic");
                setShowMobileMenu(false);
              }}
            >
              Academic Details
            </Button>
            <Button 
              variant={activeTab === "resume" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("resume");
                setShowMobileMenu(false);
              }}
            >
              Resume Builder
            </Button>
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="hidden sm:block"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="academic">Academic Details</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Profile Info Tab */}
      {(activeTab === "profile") && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
              <CardDescription className="text-gray-600">Your basic profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex flex-col items-center space-y-4 w-full sm:w-auto">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 bg-blue-100">
                    <AvatarImage src={user?.photo} />
                    <AvatarFallback className="text-2xl sm:text-3xl text-blue-600 font-semibold">
                      A
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Change Photo
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        value={profileData.email}
                        disabled
                        className="bg-gray-50 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <Input
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white border border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                    <Textarea
                      value={profileData.about}
                      onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-white border border-gray-300 min-h-[100px]"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white">
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-xl font-semibold">Skills</CardTitle>
                  <CardDescription className="text-gray-600">Your technical and soft skills</CardDescription>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" onClick={addSkill} className="w-full sm:w-auto">
                    <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Add Skill
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {skill}
                    {isEditing && (
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => {
                          setProfileData(prev => ({
                            ...prev,
                            skills: prev.skills.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Academic Details Tab */}
      {(activeTab === "academic") && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Academic Information</CardTitle>
              <CardDescription className="text-gray-600">Your current academic details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.programme}</p>
                      <p className="text-sm text-gray-600">{user?.branch}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Semester {user?.semester}</p>
                      <p className="text-sm text-gray-600">Current</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.studentId}</p>
                      <p className="text-sm text-gray-600">Student ID</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">CGPA</p>
                    <p className="text-3xl font-bold text-green-600">8.5/10.0</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Credits Completed</p>
                    <p className="text-3xl font-bold text-blue-600">142/160</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Academic Year</p>
                    <p className="text-lg font-semibold text-gray-900">2021-2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-xl font-semibold">Certifications</CardTitle>
                  <CardDescription className="text-gray-600">Your professional certifications</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg bg-white gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Award className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{cert.name}</p>
                        <p className="text-sm text-gray-600">{cert.provider} • {cert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      {cert.verified && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          <Verified className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="text-sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resume Builder Tab */}
      {(activeTab === "resume") && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Resume Builder</CardTitle>
              <CardDescription className="text-gray-600">Auto-generated academic resume based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 shadow-sm max-w-3xl mx-auto">
                {/* Resume Preview */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-1">{user?.programme} - {user?.branch}</p>
                  <p className="text-sm text-gray-500">{profileData.email} • {profileData.phone}</p>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{profileData.about}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                    <div className="space-y-2">
                      <p className="font-semibold text-base">{user?.programme} in {user?.branch}</p>
                      <p className="text-sm text-gray-600">Gautam Buddha University • CGPA: 8.5/10.0</p>
                      <p className="text-sm text-gray-600">Expected Graduation: 2025</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                    <ul className="space-y-2">
                      {profileData.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Edit className="mr-2 h-4 w-4" />
                  Customize Template
                </Button>
                <Button className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileModule;