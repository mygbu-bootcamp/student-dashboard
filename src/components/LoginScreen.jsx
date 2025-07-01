import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Mail, Lock, User, GraduationCap, Star, Globe } from "lucide-react";

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleLogin = () => {
    const userData = {
      name: "Aarav Sharma",
      email: "aarav.sharma@gbu.ac.in",
      studentId: "2021BCS001",
      programme: "B.Tech",
      branch: "Computer Science & Engineering",
      semester: "6th",
      photo: "/api/placeholder/150/150"
    };
    onLogin(userData);
  };

  const handleOAuthLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex min-h-screen">
        {/* Left - Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
            <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full" />
            <div className="absolute bottom-20 left-20 w-20 h-20 border border-white rounded-full" />
          </div>
          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
            <div className="mb-8">
                <img
               src="https://tse4.mm.bing.net/th/id/OIP.lAzYxJcn7HVBTnCM80d-IwHaHw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"  // <-- adjust the path if needed
               alt="GBU Logo"
               className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl"
               />
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">Gautam Buddha University</h1>
                <p className="text-xl text-blue-100 italic mb-6">Transforming Lives Through Innovation</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">Welcome to MyGBU Smart Campus</h2>
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                Your digital gateway to learning, innovation, and success. Access your academic journey,
                connect with peers, and unlock your potential in our smart campus ecosystem.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-blue-100">Track academic progress & achievements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-300" />
                  <span className="text-blue-100">Connect with innovation labs & startups</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="text-blue-100">Access wellness & placement services</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2">MyGBU Smart Campus</h1>
              <p className="text-gray-600">Gautam Buddha University</p>
            </div>

            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl text-blue-900 font-semibold">Student Portal</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to access your academic dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="email" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-blue-50">
                    <TabsTrigger value="email" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                      Email Login
                    </TabsTrigger>
                    <TabsTrigger value="student-id" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                      Student ID
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="student@gbu.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleLogin}
                      className="w-full h-11 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg shadow-lg transition-all duration-200"
                    >
                      Sign In to MyGBU
                    </Button>
                  </TabsContent>

                  <TabsContent value="student-id" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Student ID</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="e.g., 2021BCS001"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleLogin}
                        className="w-full h-11 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg shadow-lg transition-all duration-200"
                      >
                        Send OTP
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* OAuth */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-3 text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleOAuthLogin("Google")}
                      className="h-11 border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleOAuthLogin("Microsoft")}
                      className="h-11 border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#f25022" d="M1 1h10v10H1z"/>
                        <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                        <path fill="#7fba00" d="M1 13h10v10H1z"/>
                        <path fill="#ffb900" d="M13 13h10v10H13z"/>
                      </svg>
                      Microsoft
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <a href="#" className="text-sm text-blue-900 hover:text-blue-700 font-medium transition-colors duration-200">
                    Forgot your password?
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>© 2024 Gautam Buddha University. All rights reserved.</p>
              <p className="mt-1">Secure login powered by MyGBU Smart Campus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
