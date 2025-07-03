import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import {
  User,
  Calendar,
  FileText,
  BarChart3,
  Settings,
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
  MessageSquare
} from "lucide-react";

// Removed TypeScript interface, now props are dynamically accepted

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
  onLogout,
}) => {
  return (
    <>
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
              <img
               src="https://tse4.mm.bing.net/th/id/OIP.lAzYxJcn7HVBTnCM80d-IwHaHw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"  // <-- adjust the path if needed
               alt="GBU Logo"
               className="w-8 h-8 object-contain"
               />
               <span className="font-semibold text-gray-900 hidden lg:block">MyGBU</span>

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

          {/* User info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="bg-blue-100 text-blue-900">
                  {user?.name?.charAt(0) || "S"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.studentId}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeModule === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeModule === item.id
                        ? "bg-blue-900 text-white hover:bg-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
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
              className="w-full justify-start text-gray-700 hover:bg-gray-100"
              onClick={onLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
