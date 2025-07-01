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
  CheckCircle
} from "lucide-react";

const NotificationsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Notifications & Alerts</h1>
            <p className="text-blue-100">Stay updated with important announcements and reminders</p>
          </div>
          <div className="text-center">
            <div className="relative">
              <Bell className="h-12 w-12 text-white" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <p className="text-sm text-blue-100 mt-2">{unreadCount} unread</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-red-600">
              {notifications.filter(n => n.priority === "High").length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Info className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-600">
              {notifications.filter(n => n.priority === "Medium").length}
            </div>
            <div className="text-sm text-gray-600">Medium Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">
              {notifications.filter(n => n.actionable).length}
            </div>
            <div className="text-sm text-gray-600">Actionable</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Archive className="h-6 w-6 text-gray-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-600">
              {notifications.filter(n => n.read).length}
            </div>
            <div className="text-sm text-gray-600">Read</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No notifications found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try adjusting your search terms" : "You're all caught up!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const PriorityIcon = getPriorityIcon(notification.priority);
              
              return (
                <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{notification.date} at {notification.time}</span>
                              <Badge variant="outline">{notification.category}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full flex items-center space-x-1 ${getPriorityColor(notification.priority)}`}>
                              <PriorityIcon className="h-3 w-3" />
                              <span className="text-xs font-medium">{notification.priority}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {notification.actionable && (
                              <Button size="sm" variant="default">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                {notification.actionText}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button size="sm" variant="outline">
                                Mark as Read
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
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
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-gray-500" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Customize how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Notification Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Notifications</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Alerts</span>
                  <Button variant="outline" size="sm">Disabled</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Category Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Academic Reminders</span>
                  <Button variant="outline" size="sm">All</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fee Notifications</span>
                  <Button variant="outline" size="sm">Important Only</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Event Updates</span>
                  <Button variant="outline" size="sm">All</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wellness Reminders</span>
                  <Button variant="outline" size="sm">Daily</Button>
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