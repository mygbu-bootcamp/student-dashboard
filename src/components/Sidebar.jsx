import { useNavigate } from "react-router-dom";
import {
  User,
  FileText,
  BarChart3,
  LogOut,
  Home,
  GraduationCap,
  ClipboardList,
  X,
  BookOpen,
  CreditCard,
  Award,
  Users,
  Heart,
  Store,
  Bell,
  Briefcase,
  Target,
  Building,
  HelpCircle,
  FolderOpen,
  MessageSquare,
} from "lucide-react";

// Inline Button component
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  onClick, 
  className = "", 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: " hover:text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  };
  
  const variantStyles = variants[variant] || variants.default;
  const sizeStyles = sizes[size] || sizes.default;
  
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "profile", label: "Profile & Resume", icon: User },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "attendance", label: "Attendance", icon: BarChart3 },
  { id: "exams", label: "Exams & Results", icon: FileText },
  { id: "fees", label: "Fee Management", icon: CreditCard },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "skills", label: "Skills & Labs", icon: Award },
  { id: "placement", label: "Placement", icon: Briefcase },
  { id: "wellness", label: "Wellness", icon: Heart },
  { id: "clubs", label: "Clubs & Societies", icon: Users },
  { id: "documents", label: "Document Vault", icon: FolderOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "store", label: "GBU Store", icon: Store },
  { id: "social", label: "Social Impact", icon: HelpCircle },
  { id: "goals", label: "Goals & Tasks", icon: Target },
  { id: "hostel", label: "Hostel & Mess", icon: Building },
  { id: "grievance", label: "Grievance", icon: MessageSquare },
];

const Sidebar = ({
  activeModule,
  setActiveModule,
  sidebarOpen,
  setSidebarOpen,
  user,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  // Provide fallback user data if none passed
  const displayUser = user || {
    name: "Aarav Sharma",
    studentId: "2021BCS001",
    photo: "A",
  };

  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-30 w-56 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.lAzYxJcn7HVBTnCM80d-IwHaHw"
                alt="GBU Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-gray-900 hidden lg:block">
                MyGBU
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {displayUser.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {displayUser.studentId}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-900 text-white" // Removed hover effect by setting same bg color
                      : "text-gray-800 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    setActiveModule(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;