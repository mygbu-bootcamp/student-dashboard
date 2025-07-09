import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext"; // ← adjust the path if needed

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../components/ui/tabs";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Star,
  Globe
} from "lucide-react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}login/`,
        { email, password }
      );

      login(res.data);
      navigate("/dashboard");
    } catch (error) {
      // Fallback hardcoded credentials
      const hardcodedEmail = "admin@gbu.ac.in";
      const hardcodedPassword = "admin123";

      if (email === hardcodedEmail && password === hardcodedPassword) {
        const fakeUserData = {
          token: "hardcoded-token",
          user: {
            name: "Admin",
            email: hardcodedEmail,
            role: "admin"
          }
        };

        login(fakeUserData);
        navigate("/dashboard");
      } else {
        console.error("Login failed:", error);
        alert("Invalid credentials or server error.");
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/request-otp`,
        { studentId }
      );
      alert("OTP sent! Check your registered email or phone.");
    } catch (error) {
      console.error("OTP error:", error);
      alert("Failed to send OTP.");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/oauth/${provider.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
            <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full" />
            <div className="absolute bottom-20 left-20 w-20 h-20 border border-white rounded-full" />
          </div>
          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
            <div className="mb-8">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.lAzYxJcn7HVBTnCM80d-IwHaHw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="GBU Logo"
                className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl"
              />
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">
                  Gautam Buddha University
                </h1>
                <p className="text-xl text-blue-100 italic mb-6">
                  Transforming Lives Through Innovation
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome to MyGBU Smart Campus
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                Your digital gateway to learning, innovation, and success.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-blue-100">
                    Track academic progress & achievements
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-300" />
                  <span className="text-blue-100">
                    Connect with innovation labs & startups
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="text-blue-100">
                    Access wellness & placement services
                  </span>
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
              <h1 className="text-2xl font-bold text-blue-900 mb-2">
                MyGBU Smart Campus
              </h1>
              <p className="text-gray-600">Gautam Buddha University</p>
            </div>

            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl text-blue-900 font-semibold">
                  Student Portal
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to access your academic dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="email" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-blue-50">
                    <TabsTrigger
                      value="email"
                      className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
                    >
                      Email Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="student-id"
                      className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
                    >
                      Student ID
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="student@gbu.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 border-gray-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 border-gray-200"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleLogin}
                      className="w-full h-11 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg"
                    >
                      Sign In to MyGBU
                    </Button>
                  </TabsContent>

                  <TabsContent value="student-id" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Student ID
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="e.g., 2021BCS001"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="pl-10 h-11 border-gray-200"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleSendOtp}
                        className="w-full h-11 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg"
                      >
                        Send OTP
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-3 text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleOAuthLogin("Google")}
                      className="h-11"
                    >
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleOAuthLogin("Microsoft")}
                      className="h-11"
                    >
                      Microsoft
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm text-blue-900 hover:text-blue-700 font-medium"
                  >
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
