import React, { useState } from 'react';
import { Bell, Filter, Trash2, Settings, CheckCircle, AlertTriangle, Info, Mail } from 'lucide-react';

const navTabs = ['All', 'Academic', 'Finance', 'Events', 'Wellness', 'Admin'];

const notificationsData = [
  {
    id: 1,
    title: 'Fee Payment Due',
    category: 'Finance',
    priority: 'High',
    date: '2024-03-25 at 10:30 AM',
    content: 'Your semester fee payment is due on April 15, 2024. Please pay to avoid late charges.',
    action: 'Pay Now',
    icon: '$'
  },
  {
    id: 2,
    title: 'Assignment Submission Reminder',
    category: 'Academic',
    priority: 'Medium',
    date: '2024-03-24 at 2:15 PM',
    content: "Machine Learning assignment is due tomorrow. Don't forget to submit your project.",
    action: 'View Assignment',
    icon: '📘'
  },
  {
    id: 3,
    title: 'Event Registration Open',
    category: 'Events',
    priority: 'Low',
    date: '2024-03-23 at 9:00 AM',
    content: 'Tech Fest 2024 registration is now open. Early bird discount available until March 30.',
    action: 'Register',
    icon: '📅'
  }
];

export default function Notifications() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [preferences, setPreferences] = useState({
    push: true,
    email: true,
    sms: false,
    academic: true,
    fee: true,
    event: false,
    wellness: true
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredNotifications =
    selectedTab === 'All'
      ? notificationsData
      : notificationsData.filter((n) => n.category === selectedTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black">
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Notifications & Alerts</h1>
            <p className="text-sm">Stay updated with important announcements and reminders</p>
          </div>
          <div className="relative">
            <Bell className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">2</div>
            <p className="text-sm text-right mt-1">2 unread</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center my-6">
        <div className="bg-white p-4 shadow rounded">
          <AlertTriangle className="mx-auto text-red-500" />
          <p className="font-bold text-lg">2</p>
          <p>High Priority</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <Info className="mx-auto text-yellow-500" />
          <p className="font-bold text-lg">2</p>
          <p>Medium Priority</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <CheckCircle className="mx-auto text-green-500" />
          <p className="font-bold text-lg">6</p>
          <p>Actionable</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <Mail className="mx-auto text-purple-500" />
          <p className="font-bold text-lg">4</p>
          <p>Read</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 my-4">
        <input type="text" placeholder="Search notifications..." className="flex-1 p-2 border rounded" />
        <button className="bg-white border px-4 py-2 rounded shadow"><Filter size={16} /></button>
        <button className="bg-white border px-4 py-2 rounded shadow">Mark All Read</button>
        <button className="bg-white border px-4 py-2 rounded shadow"><Settings size={16} /></button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4 border-b pb-2">
        {navTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`w-full px-4 py-2 rounded-full text-sm text-center ${
              selectedTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {tab} <span className="ml-1 text-xs">{tab === 'All' ? notificationsData.length : notificationsData.filter(n => n.category === tab).length}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((note) => (
            <div key={note.id} className="bg-blue-50 p-4 rounded shadow border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="text-xl">{note.icon}</span>
                  <div>
                    <h2 className="font-semibold text-black">{note.title} <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full"></span></h2>
                    <p className="text-sm text-black">{note.content}</p>
                    <p className="text-xs text-gray-600 mt-1">{note.date} <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">{note.category}</span></p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${note.priority === 'High' ? 'bg-red-100 text-red-700' : note.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>{note.priority}</span>
                  <button className="text-gray-400 hover:text-black"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-black text-white px-4 py-1 rounded text-sm">{note.action}</button>
                <button className="bg-gray-100 px-4 py-1 rounded text-sm">Mark as Read</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">No notifications</div>
        )}
      </div>

      <div className="mt-12 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-black">Notification Preferences</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-medium mb-2 text-black">Notification Methods</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-black">Push Notifications</span>
                <button onClick={() => togglePreference('push')} className={`px-4 py-1 rounded ${preferences.push ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.push ? 'Enabled' : 'Disabled'}</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Email Notifications</span>
                <button onClick={() => togglePreference('email')} className={`px-4 py-1 rounded ${preferences.email ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.email ? 'Enabled' : 'Disabled'}</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">SMS Alerts</span>
                <button onClick={() => togglePreference('sms')} className={`px-4 py-1 rounded ${preferences.sms ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.sms ? 'Enabled' : 'Disabled'}</button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2 text-black">Category Preferences</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-black">Academic Reminders</span>
                <button onClick={() => togglePreference('academic')} className={`px-4 py-1 rounded ${preferences.academic ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.academic ? 'Enabled' : 'Disabled'}</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Fee Notifications</span>
                <button onClick={() => togglePreference('fee')} className={`px-4 py-1 rounded ${preferences.fee ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.fee ? 'Enabled' : 'Disabled'}</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Event Updates</span>
                <button onClick={() => togglePreference('event')} className={`px-4 py-1 rounded ${preferences.event ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.event ? 'Enabled' : 'Disabled'}</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">Wellness Reminders</span>
                <button onClick={() => togglePreference('wellness')} className={`px-4 py-1 rounded ${preferences.wellness ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{preferences.wellness ? 'Enabled' : 'Disabled'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
