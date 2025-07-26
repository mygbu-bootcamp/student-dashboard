import { useState } from "react";
import {
  Bell,
  Calendar,
  DollarSign,
  Heart,
  GraduationCap,
  Settings,
  Search,
  Filter,
  Archive,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import * as React from "react";

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
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { parentProps: props });
        }
        return child;
      })}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ className = "", value, parentProps, children, ...props }, ref) => {
    const { value: contextValue, onValueChange } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    const handleClick = () => {
      onValueChange(value);
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={handleClick}
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none ${
          isActive
            ? "bg-white text-black "
            : "text-muted-foreground hover:text-foreground"
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
  ({ className = "", value, children, ...props }, ref) => {
    const { value: contextValue } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    return isActive ? (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-4 px-4 sm:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    ) : null;
  }
);
TabsContent.displayName = "TabsContent";


const NotificationsModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    push: true,
    email: true,
    sms: false,
    academic: "All",
    finance: "Important Only",
    event: "All",
    wellness: "Daily",
  });

  // Mock notification data
  const [notifications, setNotifications] = useState([
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
  ]);

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

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleNotificationSettingChange = (setting, value) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
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
              <Bell className=" h-6 w-6 sm:h-7 sm:w-7 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-6 sm:-top-3 sm:-right-0 bg-red-500 text-xs text-white h-5 w-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 sm:mt-2">{unreadCount} unread</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-2 sm:p-4 text-center">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-red-600">
              {notifications.filter(n => n.priority === "High").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">High Priority</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-2 sm:p-4 text-center">
            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-yellow-600">
              {notifications.filter(n => n.priority === "Medium").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Medium Priority</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-2 sm:p-4 text-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-green-600">
              {notifications.filter(n => n.actionable).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Actionable</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-2 sm:p-4 text-center">
            <Archive className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mx-auto mb-1 sm:mb-2" />
            <div className="text-base sm:text-lg font-bold text-gray-600">
              {notifications.filter(n => n.read).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Read</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 text-xs sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
                <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button
                onClick={handleMarkAllRead}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <span className="hidden sm:inline">Mark All Read</span>
                <span className="sm:hidden">Read All</span>
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Selector */}
      <div className="sm:hidden">
        <button
          className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
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
        </button>

        {showMobileMenu && (
          <div className="mt-2 space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                  activeTab === category.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setActiveTab(category.id);
                  setShowMobileMenu(false);
                }}
              >
                <div className="flex items-center">
                  {category.label}
                  {category.count > 0 && (
                    <span className="ml-1 inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800">
                      {category.count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Category Tabs */}
      <div className="hidden sm:block">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                <div className="flex items-center">
                  {category.label}
                  {category.count > 0 && (
                    <span className="ml-1 inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800">
                      {category.count}
                    </span>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>


      {/* Notifications List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-gray-300 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-1 sm:mb-2">No notifications found</h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "You're all caught up!"}
              </p>
            </div>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            const PriorityIcon = getPriorityIcon(notification.priority);

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border ${
                  !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                } `}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-1.5 sm:p-2 rounded-full bg-gray-100 ${notification.color}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1">
                            <h4 className={`font-medium text-sm sm:text-base ${
                              !notification.read ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500">
                            <span>{notification.date} at {notification.time}</span>
                            <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium">
                              {notification.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 ${
                            getPriorityColor(notification.priority)
                          }`}>
                            <PriorityIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span className="text-xs font-medium">{notification.priority}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex gap-1 sm:gap-2">
                          {notification.actionable && (
                            <button className="inline-flex items-center rounded-md border border-transparent bg-black px-3 py-1.5 text-xs sm:text-sm font-medium text-white  hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                              <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              {notification.actionText}
                            </button>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>

                        <div className="flex gap-0.5 sm:gap-1">
                          <button className="rounded-md p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <Archive className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="rounded-md p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-transparent px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-sm sm:text-base font-medium leading-6 text-gray-900 flex items-center">
                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                Notification Preferences
              </h3>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">Customize how you receive notifications</p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-sm sm:text-base">Notification Methods</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Push Notifications</span>
                  <button
                    onClick={() => handleNotificationSettingChange("push", !notificationSettings.push)}
                    className={`inline-flex items-center rounded-md border ${
                      notificationSettings.push ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-700'
                    } px-3 py-1 text-xs sm:text-sm font-medium hover:opacity-80`}
                  >
                    {notificationSettings.push ? "Enabled" : "Disabled"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Email Notifications</span>
                  <button
                    onClick={() => handleNotificationSettingChange("email", !notificationSettings.email)}
                    className={`inline-flex items-center rounded-md border ${
                      notificationSettings.email ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-700'
                    } px-3 py-1 text-xs sm:text-sm font-medium hover:opacity-80`}
                  >
                    {notificationSettings.email ? "Enabled" : "Disabled"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">SMS Alerts</span>
                  <button
                    onClick={() => handleNotificationSettingChange("sms", !notificationSettings.sms)}
                    className={`inline-flex items-center rounded-md border ${
                      notificationSettings.sms ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-700'
                    } px-3 py-1 text-xs sm:text-sm font-medium hover:opacity-80`}
                  >
                    {notificationSettings.sms ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-sm sm:text-base">Category Preferences</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Academic Reminders</span>
                  <select
                    value={notificationSettings.academic}
                    onChange={(e) => handleNotificationSettingChange("academic", e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="Important Only">Important Only</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Fee Notifications</span>
                  <select
                    value={notificationSettings.finance}
                    onChange={(e) => handleNotificationSettingChange("finance", e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="Important Only">Important Only</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Event Updates</span>
                  <select
                    value={notificationSettings.event}
                    onChange={(e) => handleNotificationSettingChange("event", e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="Important Only">Important Only</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">Wellness Reminders</span>
                  <select
                    value={notificationSettings.wellness}
                    onChange={(e) => handleNotificationSettingChange("wellness", e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Never">Never</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModule;