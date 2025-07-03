import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  Heart, 
  GraduationCap,
  Settings,
  Search,
  Filter,
  MailOpen,
  Archive,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const NotificationsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "Fee Payment Due",
      message: "Your semester fee payment is due on April 15, 2024. Please pay to avoid late charges.",
      category: "Finance",
      priority: "High",
      date: "2024-03-25",
      time: "10:30 AM",
      read: false,
      actionable: true,
      actionText: "Pay Now",
      icon: DollarSign,
      color: "text-red-500"
    },
    {
      id: 2,
      title: "Assignment Submission Reminder",
      message: "Machine Learning assignment is due tomorrow. Don't forget to submit your project.",
      category: "Academic",
      priority: "Medium",
      date: "2024-03-24",
      time: "2:15 PM",
      read: false,
      actionable: true,
      actionText: "View Assignment",
      icon: GraduationCap,
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "Event Registration Open",
      message: "Tech Fest 2024 registration is now open. Early bird discount available until March 30.",
      category: "Event",
      priority: "Low",
      date: "2024-03-23",
      time: "9:00 AM",
      read: true,
      actionable: true,
      actionText: "Register",
      icon: Calendar,
      color: "text-green-500"
    },
    {
      id: 4,
      title: "Wellness Check-in Reminder",
      message: "You haven't logged your wellness data for 3 days. How are you feeling today?",
      category: "Wellness",
      priority: "Low",
      date: "2024-03-22",
      time: "8:00 AM",
      read: true,
      actionable: true,
      actionText: "Check-in Now",
      icon: Heart,
      color: "text-pink-500"
    },
    {
      id: 5,
      title: "Library Book Due",
      message: "'Introduction to AI' is due for return on March 28, 2024.",
      category: "Academic",
      priority: "Medium",
      date: "2024-03-21",
      time: "11:45 AM",
      read: true,
      actionable: true,
      actionText: "Renew Book",
      icon: GraduationCap,
      color: "text-purple-500"
    },
    {
      id: 6,
      title: "Exam Schedule Released",
      message: "Mid-semester examination schedule has been published. Check your exam portal.",
      category: "Academic",
      priority: "High",
      date: "2024-03-20",
      time: "3:30 PM",
      read: true,
      actionable: true,
      actionText: "View Schedule",
      icon: GraduationCap,
      color: "text-orange-500"
    }
  ];

  const categories = [
    { id: "all", label: "All", count: notifications.length },
    { id: "Academic", label: "Academic", count: notifications.filter(n => n.category === "Academic").length },
    { id: "Finance", label: "Finance", count: notifications.filter(n => n.category === "Finance").length },
    { id: "Event", label: "Events", count: notifications.filter(n => n.category === "Event").length },
    { id: "Wellness", label: "Wellness", count: notifications.filter(n => n.category === "Wellness").length },
    { id: "Admin", label: "Admin", count: notifications.filter(n => n.category === "Admin").length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || notification.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High": return AlertTriangle;
      case "Medium": return Info;
      case "Low": return CheckCircle;
      default: return Bell;
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Notifications & Alerts</h1>
            <p className="text-blue-100 text-sm sm:text-base">Stay updated with important announcements and reminders</p>
          </div>
          <div className="text-center">
            <div className="relative">
              <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 sm:mt-2">{unreadCount} unread</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-red-600">
              {notifications.filter(n => n.priority === "High").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-yellow-600">
              {notifications.filter(n => n.priority === "Medium").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Medium Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-green-600">
              {notifications.filter(n => n.actionable).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Actionable</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 sm:p-4 text-center">
            <Archive className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-gray-600">
              {notifications.filter(n => n.read).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Read</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm"
              />
            </div>
            <div className="flex gap-1 sm:gap-2">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Mark All Read</span>
                <span className="sm:hidden">Read All</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Category Selector */}
      <div className="sm:hidden">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={toggleMobileMenu}
        >
          <span>
            {categories.find(cat => cat.id === activeTab)?.label || "All"}
          </span>
          {showMobileMenu ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
        
        {showMobileMenu && (
          <div className="mt-2 space-y-1">
            {categories.map((category) => (
              <Button 
                key={category.id}
                variant={activeTab === category.id ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab(category.id);
                  setShowMobileMenu(false);
                }}
              >
                {category.label}
                {category.count > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Category Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="hidden sm:block"
      >
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="relative">
              {category.label}
              {category.count > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Notifications List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-6 sm:p-8 text-center">
              <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-gray-300 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-1 sm:mb-2">No notifications found</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "You're all caught up!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            const PriorityIcon = getPriorityIcon(notification.priority);
            
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50' : ''} hover:shadow-md transition-shadow`}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-1.5 sm:p-2 rounded-full bg-gray-100 ${notification.color}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <h4 className={`font-medium text-sm sm:text-base ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500">
                            <span>{notification.date} at {notification.time}</span>
                            <Badge variant="outline" className="text-xs">{notification.category}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 ${getPriorityColor(notification.priority)}`}>
                            <PriorityIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span className="text-xs font-medium">{notification.priority}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex gap-1 sm:gap-2">
                          {notification.actionable && (
                            <Button size="sm" variant="default" className="text-xs sm:text-sm">
                              <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              {notification.actionText}
                            </Button>
                          )}
                          {!notification.read && (
                            <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                              Mark as Read
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex gap-0.5 sm:gap-1">
                          <Button size="sm" variant="ghost" className="p-1.5 sm:p-2">
                            <Archive className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-1.5 sm:p-2">
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm sm:text-base">
            <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            Notification Preferences
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Customize how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-sm sm:text-base">Notification Methods</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Push Notifications</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Email Notifications</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">SMS Alerts</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">Disabled</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-sm sm:text-base">Category Preferences</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Academic Reminders</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">All</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Fee Notifications</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">Important Only</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Event Updates</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">All</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Wellness Reminders</span>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">Daily</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsModule;