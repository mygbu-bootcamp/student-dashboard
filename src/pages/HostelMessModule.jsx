import React, { useState } from "react";
import {
  Building,
  Utensils,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail
} from "lucide-react";
import StatsCard from "../components/Statscard";
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-6 pb-2 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-600 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-4 ${className}`}>
    {children}
  </div>
);

// Custom Badge Component (re-used from previous turn, adjusted for new variants)
const Badge = ({ children, className, variant = 'default' }) => {
  let variantClasses = "";
  switch (variant) {
    case 'secondary':
      variantClasses = "bg-gray-100 text-gray-800";
      break;
    case 'destructive':
      variantClasses = "bg-red-100 text-red-800";
      break;
    case 'outline':
      variantClasses = "border border-gray-300 text-gray-700";
      break;
    case 'default':
    default:
      variantClasses = "bg-blue-100 text-blue-800";
      break;
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

// Custom Button Component (updated with animations and cursor)
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case 'outline':
      variantClasses = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md";
      break;
    case 'black':
      variantClasses = "bg-black text-white hover:bg-black/70 hover:shadow-md hover:scale-105";
      break;
    default:
      variantClasses = "bg-black text-white hover:bg-black/80 hover:shadow-md hover:scale-105";
      break;
  }

  switch (size) {
    case 'sm':
      sizeClasses = "h-8 px-3 py-1";
      break;
    case 'lg':
      sizeClasses = "h-12 px-6 py-3";
      break;
    case 'icon':
      sizeClasses = "h-10 w-10";
      break;
    default:
      sizeClasses = "h-10 px-4 py-2";
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Custom Input Component (re-used from previous turn)
const Input = ({ className, type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Custom Textarea Component
const Textarea = ({ className, ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// New Tabs Components using React Context
const TabsContext = React.createContext();

const Tabs = ({ defaultValue, value: propValue, onValueChange, children, ...props }) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : localValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) setLocalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className="w-full" {...props}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex h-[48px] items-center justify-between rounded-xl bg-[#f1f5f9] p-1 ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
});

const TabsTrigger = React.forwardRef(({ className = "", children, value, ...props }, ref) => {
  const { value: activeTab, onValueChange } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 h-full cursor-pointer ${
        isActive ? "bg-white text-gray-900 shadow hover:scale-[1.02]" : "text-gray-500 hover:text-gray-900 hover:scale-[1.02]"
      } ${className}`}
      onClick={() => onValueChange(value)}
      role="tab"
      aria-selected={isActive}
      id={`tab-${value}`}
      aria-controls={`tabpanel-${value}`}
      {...props}
    >
      {children}
    </button>
  );
});

const TabsContent = React.forwardRef(({ className = "", children, value, ...props }, ref) => {
  const { value: activeTab } = React.useContext(TabsContext);

  if (value !== activeTab) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${className}`}
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      {...props}
    >
      {children}
    </div>
  );
});


const HostelMessModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("hostel");
  const [feedback, setFeedback] = useState({ rating: 5, message: "" });
  const [leaveRequest, setLeaveRequest] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    emergency: false
  });

  // Mock hostel data
  const hostelInfo = {
    block: "Block A",
    room: "A-301",
    floor: "3rd Floor",
    roommates: ["Rahul Sharma", "Amit Kumar"],
    warden: {
      name: "Dr. Priya Singh",
      phone: "+91-9876543210",
      email: "priya.singh@gbu.ac.in"
    },
    facilities: ["WiFi", "Laundry", "Common Room", "Study Hall", "Gym"],
    roomType: "Triple Sharing",
    block_capacity: 120,
    occupied: 95
  };

  // Mock mess data
  const messMenu = {
    today: {
      day: "Monday",
      date: "March 25, 2024",
      breakfast: {
        time: "7:00 AM - 9:00 AM",
        items: ["Aloo Paratha", "Curd", "Pickle", "Tea/Coffee"]
      },
      lunch: {
        time: "12:00 PM - 2:00 PM",
        items: ["Rice", "Dal Tadka", "Mixed Veg", "Roti", "Salad"]
      },
      dinner: {
        time: "7:00 PM - 9:00 PM",
        items: ["Rajma", "Rice", "Roti", "Pickle", "Sweet Dish"]
      }
    },
    weekly: [
      { day: "Monday", special: "Rajma Rice" },
      { day: "Tuesday", special: "Chole Bhature" },
      { day: "Wednesday", special: "Paneer Curry" },
      { day: "Thursday", special: "Chicken Curry" },
      { day: "Friday", special: "Fish Fry" },
      { day: "Saturday", special: "Biryani" },
      { day: "Sunday", special: "Special Thali" }
    ]
  };

  // Mock leave requests
  const leaveHistory = [
    {
      id: 1,
      fromDate: "2024-03-20",
      toDate: "2024-03-22",
      reason: "Family function",
      status: "Approved",
      appliedDate: "2024-03-18",
      approvedBy: "Dr. Priya Singh"
    },
    {
      id: 2,
      fromDate: "2024-02-15",
      toDate: "2024-02-16",
      reason: "Medical checkup",
      status: "Approved",
      appliedDate: "2024-02-14",
      approvedBy: "Dr. Priya Singh"
    },
    {
      id: 3,
      fromDate: "2024-04-01",
      toDate: "2024-04-03",
      reason: "Home visit",
      status: "Pending",
      appliedDate: "2024-03-25",
      approvedBy: null
    }
  ];

  const messStats = {
    monthlyRating: 4.2,
    totalFeedbacks: 127,
    avgMealCost: 45,
    satisfaction: 85
  };

  const handleFeedbackSubmit = () => {
    console.log("Submitting feedback:", feedback);
    setFeedback({ rating: 5, message: "" });
  };

  const handleLeaveSubmit = () => {
    console.log("Submitting leave request:", leaveRequest);
    setLeaveRequest({
      fromDate: "",
      toDate: "",
      reason: "",
      emergency: false
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
    <div className="space-y-6 p-4 md:p-6 lg:p-0 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900 to-red-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Hostel & Mess Services</h1>
            <p className="text-orange-100">
              Manage your accommodation and dining services
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-2 flex flex-col items-center text-center">
              <Building className="h-8 w-8 text-white mb-2" />
              <div className="text-sm text-orange-100">Room</div>
              <div className="text-lg font-bold">{hostelInfo.room}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Updated with StatsCard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Block" 
          value={hostelInfo.block} 
          icon={Building} 
          color="text-blue-600" 
          bgColor="bg-blue-100"
        />
        <StatsCard 
          title="Occupancy" 
          value={`${hostelInfo.occupied}/${hostelInfo.block_capacity}`} 
          icon={Users} 
          color="text-green-600" 
          bgColor="bg-green-100"
        />
        <StatsCard 
          title="Mess Rating" 
          value={`${messStats.monthlyRating}/5`} 
          icon={Star} 
          color="text-yellow-600" 
          bgColor="bg-yellow-100"
        />
        <StatsCard 
          title="Avg Meal Cost" 
          value={`₹${messStats.avgMealCost}`} 
          icon={Utensils} 
          color="text-purple-600" 
          bgColor="bg-purple-100"
        />
      </div>

      <Tabs defaultValue="hostel" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="hostel">Hostel Info</TabsTrigger>
          <TabsTrigger value="mess">Mess Menu</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="hostel" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Room Details */}
            <Card>
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
                <CardDescription>Your hostel accommodation information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Block:</span>
                      <p className="text-gray-600">{hostelInfo.block}</p>
                    </div>
                    <div>
                      <span className="font-medium">Room:</span>
                      <p className="text-gray-600">{hostelInfo.room}</p>
                    </div>
                    <div>
                      <span className="font-medium">Floor:</span>
                      <p className="text-gray-600">{hostelInfo.floor}</p>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <p className="text-gray-600">{hostelInfo.roomType}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium">Roommates:</span>
                    <div className="mt-2 space-y-2">
                      {hostelInfo.roommates.map((roommate, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{roommate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warden Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Warden Contact</CardTitle>
                <CardDescription>Get in touch with your block warden</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{hostelInfo.warden.name}</p>
                      <p className="text-sm text-gray-600">Block Warden</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{hostelInfo.warden.phone}</p>
                      <p className="text-sm text-gray-600">Mobile</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{hostelInfo.warden.email}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-black text-white hover:scale-[1.02] transition-transform">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Warden
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Block Facilities</CardTitle>
                <CardDescription>Available amenities in your hostel block</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostelInfo.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mess" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Menu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5" />
                  Today's Menu
                </CardTitle>
                <CardDescription>
                  {messMenu.today.day}, {messMenu.today.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Breakfast</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {messMenu.today.breakfast.time}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {messMenu.today.breakfast.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">{item}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Lunch</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {messMenu.today.lunch.time}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {messMenu.today.lunch.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">{item}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Dinner</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {messMenu.today.dinner.time}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {messMenu.today.dinner.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">{item}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Specials */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Special Menu</CardTitle>
                <CardDescription>Special dishes for each day of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messMenu.weekly.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <span className="font-medium">{day.day}</span>
                      <Badge variant="outline" className="hover:bg-gray-100">{day.special}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mess Statistics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Mess Statistics</CardTitle>
                <CardDescription>Current month performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatsCard 
                    title="Average Rating" 
                    value={`${messStats.monthlyRating}/5`} 
                    icon={Star} 
                    color="text-yellow-600" 
                    bgColor="bg-yellow-100"
                  />
                  <StatsCard 
                    title="Total Feedbacks" 
                    value={messStats.totalFeedbacks} 
                    icon={Users} 
                    color="text-blue-600" 
                    bgColor="bg-blue-100"
                  />
                  <StatsCard 
                    title="Avg Meal Cost" 
                    value={`₹${messStats.avgMealCost}`} 
                    icon={Utensils} 
                    color="text-green-600" 
                    bgColor="bg-green-100"
                  />
                  <StatsCard 
                    title="Satisfaction" 
                    value={`${messStats.satisfaction}%`} 
                    icon={CheckCircle} 
                    color="text-purple-600" 
                    bgColor="bg-purple-100"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leave" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Leave Request */}
            <Card>
              <CardHeader>
                <CardTitle>Request Leave</CardTitle>
                <CardDescription>Submit a new hostel leave application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">From Date</label>
                      <Input
                        type="date"
                        value={leaveRequest.fromDate}
                        onChange={(e) => setLeaveRequest({...leaveRequest, fromDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">To Date</label>
                      <Input
                        type="date"
                        value={leaveRequest.toDate}
                        onChange={(e) => setLeaveRequest({...leaveRequest, toDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Reason for Leave</label>
                    <Textarea
                      placeholder="Please provide reason for your leave..."
                      value={leaveRequest.reason}
                      onChange={(e) => setLeaveRequest({...leaveRequest, reason: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emergency"
                      checked={leaveRequest.emergency}
                      onChange={(e) => setLeaveRequest({...leaveRequest, emergency: e.target.checked})}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="emergency" className="text-sm cursor-pointer">Emergency Leave</label>
                  </div>

                  <Button onClick={handleLeaveSubmit} className="w-full bg-black text-white hover:scale-[1.02] transition-transform">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Leave Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leave History */}
            <Card>
              <CardHeader>
                <CardTitle>Leave History</CardTitle>
                <CardDescription>Your previous leave applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveHistory.map((leave) => (
                    <Card key={leave.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-medium">
                              {leave.fromDate} to {leave.toDate}
                            </div>
                            <p className="text-sm text-gray-600">{leave.reason}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              Applied: {leave.appliedDate}
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(leave.status)} cursor-pointer`} variant="outline">
                            {leave.status}
                          </Badge>
                        </div>

                        {leave.approvedBy && (
                          <div className="text-xs text-gray-600">
                            Approved by: {leave.approvedBy}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submit Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Mess Feedback</CardTitle>
                <CardDescription>Rate your dining experience and suggest improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Overall Rating</label>
                    <div className="flex items-center space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer hover:scale-110 transition-transform ${
                            star <= feedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          onClick={() => setFeedback({...feedback, rating: star})}
                        />
                      ))}
                      <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Comments & Suggestions</label>
                    <Textarea
                      placeholder="Share your feedback about food quality, service, or suggestions..."
                      value={feedback.message}
                      onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                    />
                  </div>

                  <Button onClick={handleFeedbackSubmit} className="w-full bg-black text-white hover:scale-[1.02] transition-transform">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Community feedback from other students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Default Student</div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>4/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "The food quality has improved significantly this month. Really appreciate the variety in the menu."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">March 24, 2024</div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Default Student</div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>3/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Good taste but portions could be larger. Also, more South Indian options would be great."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">March 23, 2024</div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Default Student</div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>5/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Excellent service during lunch hours. The staff is very courteous and helpful."
                    </p>
                    <div className="text-xs text-gray-500 mt-2">March 22, 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostelMessModule;