import { useState } from "react";
import { Button } from "../components/ui/button";
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

// Removed TypeScript interface; props are accepted dynamically

const MainDashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardHome user={user} />;
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
        return <DashboardHome user={user} />;
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
