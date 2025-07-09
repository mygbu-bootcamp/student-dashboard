import React from "react";
import {
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  Book,
  Lightbulb,
  Heart,
  Bell,
  Briefcase,
  ExternalLink,
} from "lucide-react";

export default function DashboardMainContent() {
  return (
    <div className="bg-[#f8f9fb] min-h-screen text-gray-900 px-4 sm:px-6 md:px-8 py-6">
      {/* Header Gradient Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden mb-6">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Hi, Aarav Sharma! Welcome back to MyGBU Smart Campus 👋
          </h1>
          <p className="text-lg opacity-90">
            Ready to continue your journey of learning and innovation?
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Thought of the Day */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2 text-gray-900 flex items-center gap-2">
              ⭐ Thought of the Day
            </h2>
            <p className="italic text-gray-700 text-base leading-relaxed">
              Innovation distinguishes between a leader and a follower. – <span className="font-semibold">Steve Jobs</span>
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards - Horizontal Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Attendance",
            value: "89%",
            icon: <CheckCircle className="w-7 h-7" />,
            color: "text-green-600",
            bgIcon: "bg-green-100",
            bgCard: "bg-white",
          },
          {
            label: "Pending Tasks",
            value: "5",
            icon: <Clock className="w-7 h-7" />,
            color: "text-orange-600",
            bgIcon: "bg-orange-100",
            bgCard: "bg-white",
          },
          {
            label: "Wellness Score",
            value: "8.4/10",
            icon: <Heart className="w-7 h-7" />,
            color: "text-pink-600",
            bgIcon: "bg-pink-100",
            bgCard: "bg-white",
          },
          {
            label: "Notifications",
            value: "8",
            icon: <Bell className="w-7 h-7" />,
            color: "text-purple-600",
            bgIcon: "bg-purple-100",
            bgCard: "bg-white",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`${item.bgCard} rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">{item.label}</span>
              <div className={`${item.bgIcon} ${item.color} p-3 rounded-full`}>
                {item.icon}
              </div>
            </div>
            <div className={`text-3xl font-bold ${item.color} mb-1`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Today's Classes + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-8">
          <Card
            title="Today's Classes"
            icon={<Calendar className="text-blue-500 w-5 h-5" />}
            className="h-full"
          >
            {[
              {
                subject: "Data Structures",
                time: "9:00 AM",
                room: "Room 301A",
                status: "Ongoing",
                bg: "bg-blue-50",
              },
              {
                subject: "Machine Learning",
                time: "11:00 AM",
                room: "Lab 204",
                status: "Next",
                bg: "bg-yellow-50",
              },
              {
                subject: "Software Engineering",
                time: "2:00 PM",
                room: "Room 305",
                status: "Upcoming",
                bg: "bg-green-50",
              },
            ].map((cls, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${cls.bg} flex justify-between items-center mb-2`}
              >
                <div>
                  <h3 className="font-medium">{cls.subject}</h3>
                  <p className="text-sm text-gray-600">{cls.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{cls.time}</p>
                  <p className="text-xs text-gray-500">{cls.status}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card title="Pending Tasks" icon={<Clock className="text-orange-500 w-5 h-5" />}>
            {[
              {
                title: "ML Assignment #3",
                desc: "Neural Networks",
                badge: "Due Today",
                badgeColor: "bg-red-500 text-white",
                cardBg: "bg-red-50",
                borderColor: "border-red-400",
              },
              {
                title: "Project Proposal",
                desc: "Software Engineering",
                badge: "Due Tomorrow",
                badgeColor: "bg-blue-100 text-blue-800",
                cardBg: "bg-yellow-50",
                borderColor: "border-yellow-400",
              },
              {
                title: "Resume Update",
                desc: "Placement Portal",
                badge: "This Week",
                badgeColor: "border border-gray-300 text-gray-800",
                cardBg: "bg-green-50",
                borderColor: "border-green-400",
              },
            ].map((task, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl ${task.cardBg} ${task.borderColor} border-l-4 mb-3`}
              >
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-700">{task.desc}</p>
                <span
                  className={`absolute top-3 right-4 text-xs px-3 py-1 rounded-full ${task.badgeColor}`}
                >
                  {task.badge}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
      {/* Skills, Clubs, Deadlines, Career Updates */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  {/* Skills & Innovation Labs */}
  <Card title="Skills & Innovation Labs" icon={<Lightbulb className="text-yellow-500 w-5 h-5" />}>
    {[
      { title: "AI/ML Lab Certification", percent: 85, status: "Advanced", color: "bg-blue-600", tag: "bg-blue-100 text-blue-800" },
      { title: "IoT Innovation Project", percent: 70, status: "In Progress", color: "bg-yellow-500", tag: "bg-yellow-100 text-yellow-800" },
      { title: "Cybersecurity Workshop", percent: 100, status: "Completed", color: "bg-green-600", tag: "bg-green-100 text-green-800" }
    ].map((item, i) => (
      <div key={i} className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm">{item.title}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${item.tag}`}>{item.status}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
        </div>
      </div>
    ))}
  </Card>

  {/* Club Participation */}
  <Card title="Club Participation & Social Impact" icon={<Heart className="text-pink-500 w-5 h-5" />}>
    {[
      { name: "CodeCrafters Club", role: "Technical Lead • 25 hours", tag: "High", tagColor: "bg-gray-100 text-gray-900" },
      { name: "NSS Unit", role: "Volunteer • 40 hours", tag: "Community Service", tagColor: "bg-gray-100 text-gray-900" },
      { name: "Innovation Cell", role: "Member • 15 hours", tag: "Research", tagColor: "bg-gray-100 text-gray-900" }
    ].map((club, i) => (
      <div key={i} className="flex justify-between items-center mb-3">
        <div>
          <p className="font-medium text-sm">{club.name}</p>
          <p className="text-sm text-gray-600">{club.role}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${club.tagColor}`}>{club.tag}</span>
      </div>
    ))}
  </Card>

  {/* Upcoming Deadlines */}
  <Card title="Upcoming Deadlines" icon={<Calendar className="text-indigo-500 w-5 h-5" />}>
    {[
      { title: "Machine Learning Assignment", date: "2024-03-28", type: "Assignment", color: "bg-red-100 text-red-800" },
      { title: "Mid-semester Exams", date: "2024-04-05", type: "Exam", color: "bg-blue-100 text-blue-800" },
      { title: "Tech Fest Registration", date: "2024-03-30", type: "Event", color: "bg-red-100 text-red-800" }
    ].map((deadline, i) => (
      <div key={i} className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400 mb-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{deadline.title}</h3>
            <p className="text-xs text-gray-600">Due: {deadline.date}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${deadline.color}`}>{deadline.type}</span>
        </div>
      </div>
    ))}
  </Card>

  {/* Placement & Career Updates */}
  <Card title="Placement & Career Updates" icon={<TrendingUp className="text-orange-500 w-5 h-5" />}>
    <div className="mb-3 bg-green-50 border-l-4 border-green-400 p-3 rounded-lg">
      <p className="font-semibold text-green-800">New Job Opening</p>
      <p className="text-sm text-gray-700">Software Developer at TechCorp - Apply by March 30</p>
    </div>
    <div className="mb-3 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-lg">
      <p className="font-semibold text-blue-800">Career Counseling</p>
      <p className="text-sm text-gray-700">Book your session with industry mentors</p>
    </div>
    <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-lg">
      <p className="font-semibold text-purple-800">Skill Assessment</p>
      <p className="text-sm text-gray-700">Complete your technical assessment - 85% done</p>
    </div>
  </Card>
</div>


      {/* University Achievements */}
      <div className="mt-6">
        <Card
          title="University Achievements & Highlights"
          icon={<TrendingUp className="text-yellow-500 w-5 h-5" />}
        >
          <p className="text-sm text-gray-500 mb-4">
            Celebrating excellence in academics, research, and innovation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                tag: "National Level",
                tagColor: "bg-black text-white",
                title: "GBU Students Win National Hackathon",
                desc: "Team 'InnovateGBU' secures first place in the National Innovation Challenge 2024",
                date: "March 15, 2024",
              },
              {
                tag: "Faculty Achievement",
                tagColor: "bg-gray-100 text-gray-800",
                title: "Research Paper Published in IEEE",
                desc: "Dr. Priya Sharma's research on AI in Agriculture featured in prestigious journal",
                date: "March 12, 2024",
              },
              {
                tag: "University News",
                tagColor: "bg-gray-100 text-gray-800",
                title: "GBU Innovation Lab Launched",
                desc: "State-of-the-art AI/ML and IoT research facility inaugurated by Hon'ble Vice Chancellor",
                date: "March 10, 2024",
              },
            ].map((highlight, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-36 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <TrendingUp className="text-blue-600 w-10 h-10" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${highlight.tagColor}`}
                    >
                      {highlight.tag}
                    </span>
                    <span className="text-xs text-gray-500">
                      {highlight.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-600">{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Events & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-6">
          <Card
            title="Upcoming Events & Competitions"
            icon={<Calendar className="text-blue-500 w-5 h-5" />}
          >
            <p className="text-sm text-gray-500 mb-4">
              Don't miss out on exciting opportunities
            </p>
            {[
              {
                title: "Tech Fest 2024 - Technovation",
                desc: "Annual technical festival featuring coding competitions, workshops, and industry talks",
                date: "April 5–7, 2024",
                tag: "Technical Event",
                icon: <Lightbulb className="text-blue-500 w-5 h-5" />,
                button: "Open",
              },
              {
                title: "Industry Placement Drive",
                desc: "Multi-company recruitment drive for final year students across all branches",
                date: "March 25–30, 2024",
                tag: "Placement",
                icon: <Briefcase className="text-blue-500 w-5 h-5" />,
                button: "Apply Now",
              },
              {
                title: "NSS Community Service Week",
                desc: "Volunteer for rural development and social awareness programs",
                date: "April 1–8, 2024",
                tag: "Social Impact",
                icon: <Heart className="text-blue-500 w-5 h-5" />,
                button: "Open",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border rounded-xl p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="pt-1">{event.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      {event.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{event.date}</span>
                    <button className="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center gap-1">
                      {event.button} <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card
            title="Important Announcements"
            icon={<Bell className="text-orange-500 w-5 h-5" />}
          >
            <p className="text-sm text-gray-500 mb-4">
              Stay updated with university notices
            </p>
            {[
              {
                title: "Mid-Semester Exam Schedule Released",
                desc: "Check your exam timetable and prepare accordingly",
                date: "March 20, 2024",
                tags: ["Academic", "Urgent"],
                bg: "bg-red-50",
                textColor: "text-red-800",
              },
              {
                title: "New Course Registration Open",
                desc: "Register for elective courses for next semester",
                date: "March 18, 2024",
                tags: ["Registration"],
                bg: "bg-gray-50",
                textColor: "text-gray-800",
              },
              {
                title: "Scholarship Applications Due",
                desc: "Merit-based scholarship applications close on March 30",
                date: "March 15, 2024",
                tags: ["Financial Aid", "Urgent"],
                bg: "bg-red-50",
                textColor: "text-red-800",
              },
            ].map((a, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 mb-4 ${a.bg} border border-gray-200 hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{a.title}</h3>
                  <div className="flex gap-1 flex-wrap">
                    {a.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          tag === "Urgent"
                            ? "bg-red-600 text-white"
                            : "bg-white border border-gray-300"
                        } ${a.textColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{a.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{a.date}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ title, icon, children, className = "" }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
