import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, User, GraduationCap, FileText, BarChart3, ClipboardList,
  CreditCard, BookOpen, FlaskConical, Briefcase, Heart, Users,
  LogOut, ChevronDown, ChevronUp, Calendar, MessageCircle, Award,
  Settings, Search, Bell, Menu, X, Code, Music, Trophy, HandHeart,
  Sun, Moon
} from 'lucide-react';

export default function MyGBUSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedSections, setExpandedSections] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(3);

  const menuItems = [
    { icon: Home, label: 'Dashboard', route: '/dashboard' },
    { icon: User, label: 'Profile & Resume', route: '/profile' },
    { icon: GraduationCap, label: 'Academic', route: '/academic', badge: '2' },
    { icon: FileText, label: 'Assignments', route: '/assignments', badge: '5' },
    { icon: BarChart3, label: 'Attendance', route: '/attendance' },
    { icon: ClipboardList, label: 'Exams & Results', route: '/exams-results' },
    { icon: CreditCard, label: 'Fee Management', route: '/fee-management', badge: '!' },
    { icon: BookOpen, label: 'Library', route: '/library' },
    { icon: FlaskConical, label: 'Skills & Labs', route: '/skills-labs' },
    { icon: Briefcase, label: 'Placement', route: '/placement', badge: 'NEW' },
    { icon: Heart, label: 'Wellness', route: '/wellness' },
    {
      icon: Users, label: 'Clubs & Societies', route: '/clubs-societies',
    },
    { icon: Calendar, label: 'Notifications', route: '/notification' },
    { icon: MessageCircle, label: 'GBU Store', route: '/store', badge: '12' },
    { icon: Award, label: 'Social Impacts', route: '/impacts' },
    { icon: Settings, label: 'Goals and Tasks', route: '/goals' },
    { icon: FileText, label: 'Documents', route: '/documents' },
    { icon: FileText, label: 'Hostels and Mess', route: '/hostels' }
  ];

  // Auto-expand section if sub-route is directly accessed
  useEffect(() => {
    for (const item of menuItems) {
      if (item.subItems) {
        if (item.subItems.some(sub => location.pathname === sub.route)) {
          setExpandedSections(prev => ({ ...prev, [item.label]: true }));
        }
      }
    }
  }, [location.pathname]);

  const getCurrentActiveItem = () => {
    for (const item of menuItems) {
      if (item.subItems) {
        for (const sub of item.subItems) {
          if (location.pathname === sub.route) return sub.label;
        }
      }
      if (location.pathname === item.route) return item.label;
    }
    return 'Dashboard';
  };

  const activeItem = getCurrentActiveItem();

  const handleItemClick = (route, label) => {
    const item = menuItems.find(i => i.label === label);
    navigate(route);
    if (item?.expandable) {
      setExpandedSections(prev => ({
        ...prev,
        [label]: !prev[label]
      }));
    } else {
      setExpandedSections({});
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.subItems && item.subItems.some(sub =>
      sub.label.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  const themeClasses = isDarkMode
    ? 'bg-gray-900 text-white border-gray-700'
    : 'bg-white text-gray-800 border-gray-200';

  const hoverClasses = isDarkMode
    ? 'hover:bg-gray-800'
    : 'hover:bg-gray-50';

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} ${themeClasses} shadow-xl h-screen flex flex-col transition-all duration-300 border-r`}>
      {/* Header */}
      <div className={`${themeClasses} shadow-sm border-b px-4 py-4 flex-shrink-0`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
           <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
           <img
           src="https://images.sftcdn.net/images/t_app-icon-m/p/2e411ad1-5bbf-45a1-8572-784168d5e7fd/2853991569/gbu-timetables-logo"
           alt="Logo"
           className="w-full h-full object-cover"
           />
           </div>

            {!isCollapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MyGBU
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {!isCollapsed && (
              <>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg ${hoverClasses}`}>
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <div className="relative">
                  <button className={`p-2 rounded-lg ${hoverClasses}`}>
                    <Bell className="w-4 h-4" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className={`p-2 rounded-lg ${hoverClasses}`}>
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="p-4 border-b flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center ring-2 ring-blue-300">
              <span className="text-blue-700 font-bold text-lg">A</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-bold text-sm">Aarav Sharma</h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2021BCS001</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {filteredMenuItems.map((item, index) => (
          <div key={index}>
            <div
              className={`group flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${activeItem === item.label
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-[1.02]'
                : `${hoverClasses} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                }`}
              onClick={() => handleItemClick(item.route, item.label)}
              title={isCollapsed ? item.label : ''}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${activeItem === item.label ? 'text-white' : ''}`} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </div>
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.badge === '!' ? 'bg-red-500 text-white' : item.badge === 'NEW' ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.expandable && (
                    <div className="p-1">
                      {expandedSections[item.label] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sub Items */}
            {!isCollapsed && item.expandable && expandedSections[item.label] && (
              <div className={`ml-4 mt-2 mb-2 p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-all ${activeItem === subItem.label ? 'bg-blue-100 text-blue-700 font-medium' : hoverClasses}`}
                    onClick={() => navigate(subItem.route)}
                  >
                    <div className="flex items-center space-x-3">
                      <subItem.icon className="w-4 h-4" />
                      <span className="text-sm">{subItem.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      {subItem.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className={`border-t ${themeClasses} flex-shrink-0 p-2`}>
        <div
          className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg cursor-pointer ${hoverClasses} group`}
          title={isCollapsed ? 'Logout' : ''}
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" />
          {!isCollapsed && (
            <span className="font-medium text-red-500 group-hover:text-red-600 transition-colors">
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
