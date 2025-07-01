import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
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
  Verified
} from "lucide-react";

const ProfileModule = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
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

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile & Resume</h1>
          <p className="text-gray-600">Manage your profile and build your academic resume</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center bg-blue-900 hover:bg-blue-800"
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="academic">Academic Details</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user?.photo} />
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-900">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input
                        value={profileData.email}
                        disabled
                        className="mt-1 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <Input
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">About Me</label>
                    <Textarea
                      value={profileData.about}
                      onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-900 hover:bg-blue-800">
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Your technical and soft skills</CardDescription>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" onClick={addSkill}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
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
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your current academic details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{user?.programme}</p>
                      <p className="text-sm text-gray-600">{user?.branch}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Semester {user?.semester}</p>
                      <p className="text-sm text-gray-600">Current</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">{user?.studentId}</p>
                      <p className="text-sm text-gray-600">Student ID</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">CGPA</p>
                    <p className="text-2xl font-bold text-green-600">8.5/10.0</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Credits Completed</p>
                    <p className="text-2xl font-bold text-blue-600">142/160</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Academic Year</p>
                    <p className="text-lg font-medium">2021-2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Your professional certifications</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-gray-600">{cert.provider} • {cert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {cert.verified && (
                        <Badge variant="secondary" className="text-green-600">
                          <Verified className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>Auto-generated academic resume based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
                {/* Resume Preview */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600">{user?.programme} - {user?.branch}</p>
                  <p className="text-sm text-gray-500">{profileData.email} • {profileData.phone}</p>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{profileData.about}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                    <div className="space-y-2">
                      <p className="font-medium">{user?.programme} in {user?.branch}</p>
                      <p className="text-sm text-gray-600">Gautam Buddha University • CGPA: 8.5/10.0</p>
                      <p className="text-sm text-gray-600">Expected Graduation: 2025</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                    <ul className="space-y-1">
                      {profileData.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-700">• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Customize Template
                </Button>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileModule;