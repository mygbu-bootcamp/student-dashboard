import React, { useState } from "react";
import {
  Building2, Users2, Star, Utensils, User, Mail, Phone,
  Wifi, BookOpen, Dumbbell, Home, ShieldCheck, Clock,
  CheckCircle, Send, ThumbsUp, MessageCircle,
} from "lucide-react";

export default function Hostels() {
  const tabs = ["Hostel Info", "Mess Menu", "Leave Requests", "Feedback"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Hostel & Mess Services</h1>
          <p className="text-sm text-red-200">Manage your accommodation and dining services</p>
        </div>
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="bg-white text-red-700 font-semibold px-4 py-1.5 rounded-lg shadow">Room A-301</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-10 px-6">
  <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex flex-wrap justify-center max-w-5xl gap-30 w-full">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
          activeTab === tab
            ? "bg-red-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
</div>



      {/* Tab Content */}
      {activeTab === "Hostel Info" && <HostelInfoSection />}
      {activeTab === "Mess Menu" && <MessMenuSection />}
      {activeTab === "Leave Requests" && <LeaveRequestsSection />}
      {activeTab === "Feedback" && <FeedbackSection />}
    </div>
  );
}

// Hostel Info
function HostelInfoSection() {
  return (
    <div className="space-y-6">
      {/* Room Info & Warden */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Room Details">
          <Detail label="Block" value="Block A" />
          <Detail label="Room" value="A-301" />
          <Detail label="Floor" value="3rd Floor" />
          <Detail label="Type" value="Triple Sharing" />
          <div className="col-span-2 mt-4">
            <p className="font-medium mb-2">Roommates:</p>
            <ul className="ml-2 space-y-1 text-gray-700">
              <li className="flex items-center gap-2"><User className="w-4 h-4" /> Rahul Sharma</li>
              <li className="flex items-center gap-2"><User className="w-4 h-4" /> Amit Kumar</li>
            </ul>
          </div>
        </Card>

        <Card title="Warden Contact">
          <p className="flex items-center gap-2"><User className="w-4 h-4" /> Dr. Priya Singh (Block Warden)</p>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91-9876543210</p>
          <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> priya.singh@gbu.ac.in</p>
          <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700">
            <ShieldCheck className="w-4 h-4" /> Contact Warden
          </button>
        </Card>
      </div>

      {/* Facilities */}
      <Card title="Block Facilities">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <Facility label="WiFi" icon={<Wifi />} />
          <Facility label="Study Hall" icon={<BookOpen />} />
          <Facility label="Gym" icon={<Dumbbell />} />
          <Facility label="Laundry" icon={<Home />} />
          <Facility label="Common Room" icon={<Home />} />
        </div>
      </Card>
    </div>
  );
}

// Mess Menu
function MessMenuSection() {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  return (
    <div className="space-y-6">
      <Card title="🍽️ Today's Menu">
        <p className="text-sm text-gray-500 mb-4">{today}</p>
        {["Breakfast", "Lunch", "Dinner"].map((meal) => (
          <div key={meal} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{meal}</h3>
              <span className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {meal === "Breakfast" ? "7–9 AM" : meal === "Lunch" ? "12–2 PM" : "7–9 PM"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {(meal === "Breakfast"
                ? ["Aloo Paratha", "Curd", "Pickle", "Tea/Coffee"]
                : meal === "Lunch"
                ? ["Rice", "Dal", "Mixed Veg", "Roti", "Salad"]
                : ["Rajma", "Rice", "Roti", "Pickle", "Sweet Dish"]
              ).map((item) => (
                <span key={item} className="bg-gray-100 px-3 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// Leave Requests
function LeaveRequestsSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");

  const history = [
    { from: "2024-06-10", to: "2024-06-13", reason: "Medical Checkup", status: "Approved" },
    { from: "2024-05-22", to: "2024-05-25", reason: "Family Function", status: "Pending" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Submit Leave Request">
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="From Date"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="To Date"
            />
          </div>
          <textarea
            rows="4"
            placeholder="Reason for Leave"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <button className="w-full bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700">
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </Card>

      <Card title="Leave History">
        <div className="space-y-3 text-sm">
          {history.map((entry, i) => (
            <div key={i} className="p-3 rounded-lg border bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {entry.from} to {entry.to}
                </p>
                <p className="text-gray-600">{entry.reason}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  entry.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feedback
// Feedback
function FeedbackSection() {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");

  const recentFeedbacks = [
    { rating: 5, comment: "Food quality has improved a lot recently!", user: "Rahul Sharma" },
    { rating: 3, comment: "Rice was undercooked yesterday.", user: "Amit Kumar" },
    { rating: 4, comment: "Good variety but sometimes lacks spice.", user: "Neha Verma" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Submit Mess Feedback">
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <ThumbsUp
                key={i}
                className={`w-6 h-6 cursor-pointer ${
                  i <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(i)}
              />
            ))}
            <span className="ml-2 text-sm text-gray-700">({rating}/5)</span>
          </div>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your feedback..."
            className="w-full border rounded-lg px-4 py-2"
          />
          <button className="w-full bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-700">
            <MessageCircle className="w-4 h-4" /> Submit Feedback
          </button>
        </div>
      </Card>

      <Card title="Recent Feedbacks">
        <div className="space-y-4 text-sm">
          {recentFeedbacks.map((fb, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">{fb.user}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <ThumbsUp
                      key={idx}
                      className={`w-4 h-4 ${idx < fb.rating ? "text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{fb.comment}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Components
function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
function Facility({ icon, label }) {
  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 border-green-200 text-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}
function Detail({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}
