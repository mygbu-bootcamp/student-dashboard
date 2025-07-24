import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../pages/Dashboard";
import ProfileModule from "../pages/ProfileModule";
import AcademicModule from "../pages/AcademicModule";
import AttendanceModule from "../pages/AttendanceModule";
import AssignmentsModule from "../pages/AssignmentsModule";
import ExamsModule from "../pages/ExamsModule";
import FeesModule from "../pages/FeesModule";
import LibraryModule from "../pages/LibraryModule";
import SkillsModule from "../pages/SkillsModule";
import PlacementModule from "../pages/PlacementModule";
import WellnessModule from "../pages/WellnessModule";
import DocumentVaultModule from "../pages/DocumentVaultModule";
import ClubsModule from "../pages/ClubsModule";
import NotificationsModule from "../pages/NotificationsModule";
import GBUStoreModule from "../pages/GBUStoreModule";
import SocialImpactModule from "../pages/SocialImpactModule";
import GoalTrackerModule from "../pages/GoalTrackerModule";
import HostelMessModule from "../pages/HostelMessModule";
import GrievanceModule from "../pages/GrievanceModule";
import SOSAlert from "../components/emergency/SOSAlert";
import { Menu } from "lucide-react";

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
    ghost: "hover:bg-gray-100 hover:text-gray-900",
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

const MainDashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardHome user={user} onNavigate={setActiveModule} />; // Passed setActiveModule as onNavigate
      case "profile":
        return <ProfileModule user={user} />;
      case "academic":
        return <AcademicModule user={user} />;
      case "attendance":
        return <AttendanceModule user={user} />;
      case "assignments":
        return <AssignmentsModule user={user} />;
      case "exams":
        return <ExamsModule user={user} />;
      case "fees":
        return <FeesModule user={user} />;
      case "library":
        return <LibraryModule user={user} />;
      case "skills":
        return <SkillsModule user={user} />;
      case "placement":
        return <PlacementModule user={user} />;
      case "wellness":
        return <WellnessModule user={user} />;
      case "clubs":
        return <ClubsModule user={user} />;
      case "documents":
        return <DocumentVaultModule user={user} />;
      case "notifications":
        return <NotificationsModule user={user} />;
      case "store":
        return <GBUStoreModule user={user} />;
      case "social":
        return <SocialImpactModule user={user} />;
      case "goals":
        return <GoalTrackerModule user={user} />;
      case "hostel":
        return <HostelMessModule user={user} />;
      case "grievance":
        return <GrievanceModule user={user} />;
      default:
        return <DashboardHome user={user} onNavigate={setActiveModule} />; // Passed setActiveModule as onNavigate
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onLogout={onLogout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="font-semibold text-gray-900">MyGBU Smart Campus</h1>
          <div className="w-10" />
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderActiveModule()}
        </main>
      </div>

      {/* SOS Emergency Alert - Available on all pages */}
      <SOSAlert />
    </div>
  );
};

export default MainDashboard;