import React, { useState } from 'react';
import { Eye, LogOut } from 'lucide-react';

export default function ClubsSocieties() {
  const [tab, setTab] = useState('My Clubs');

  const tabs = ['My Clubs', 'Discover', 'Events', 'My Activity', 'Achievements'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white p-6 rounded-xl shadow mb-4">
        <h1 className="text-2xl font-bold">Clubs & Societies</h1>
        <p className="text-sm">Connect, collaborate, and contribute to campus life</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b mt-2 px-4 text-sm font-medium">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-3 px-4 focus:outline-none ${tab === t ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* My Clubs */}
      {tab === 'My Clubs' && (
        <div className="grid md:grid-cols-3 gap-4 p-4">
          {[
            {
              name: 'Tech Innovation Club',
              role: 'Member',
              joined: '2024-01-15',
              status: 'Active',
              events: 5,
              hours: 25,
              desc: 'Fostering technological innovation and entrepreneurship'
            },
            {
              name: 'Literary Society',
              role: 'Coordinator',
              joined: '2023-09-10',
              status: 'Active',
              events: 8,
              hours: 40,
              desc: 'Promoting literature, writing, and creative expression'
            },
            {
              name: 'Environmental Club',
              role: 'Volunteer',
              joined: '2024-02-20',
              status: 'Active',
              events: 3,
              hours: 15,
              desc: 'Creating awareness about environmental conservation'
            }
          ].map((club) => (
            <div key={club.name} className="bg-white p-4 shadow rounded space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{club.name}</h2>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{club.role}</span>
              </div>
              <p className="text-sm text-gray-600">{club.desc}</p>
              <div className="text-sm">
                <p><strong>Joined:</strong> {club.joined}</p>
                <p><strong>Status:</strong> <span className="text-green-600">✔ {club.status}</span></p>
                <p><strong>Events:</strong> {club.events}</p>
                <p><strong>Hours:</strong> {club.hours}</p>
              </div>
              <div className="flex justify-between mt-2">
                <button className="flex items-center gap-1 text-sm px-3 py-1 bg-gray-100 rounded shadow"><Eye size={14}/> View Details</button>
                <button className="text-white bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded">Leave Club</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discover */}
      {tab === 'Discover' && (
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <input className="p-2 border rounded w-full max-w-xs" placeholder="Search clubs..." />
            <button className="ml-4 px-4 py-2 bg-white border rounded shadow text-sm">Filter by Category</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: 'Robotics Club',
                tag: 'Technical',
                desc: 'Build and program robots for competitions and projects',
                members: 45,
                time: 'Every Saturday 2–5 PM',
                req: 'Basic programming knowledge preferred'
              },
              {
                name: 'Photography Club',
                tag: 'Arts',
                desc: 'Capture moments and develop photography skills',
                members: 32,
                time: 'Every Sunday 10 AM–12 PM',
                req: 'Own camera (DSLR/Smartphone)'
              },
              {
                name: 'Debate Society',
                tag: 'Academic',
                desc: 'Enhance public speaking and argumentation skills',
                members: 28,
                time: 'Every Wednesday 4–6 PM',
                req: 'Good communication skills'
              }
            ].map((club) => (
              <div key={club.name} className="bg-white p-4 rounded shadow space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{club.name}</h2>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{club.tag}</span>
                </div>
                <p className="text-sm text-gray-600">{club.desc}</p>
                <p className="text-sm">👥 {club.members} members</p>
                <p className="text-sm">🕒 {club.time}</p>
                <p className="text-sm text-blue-700 bg-blue-50 px-2 py-1 rounded"><strong>Requirements:</strong> {club.req}</p>
                <button className="w-full mt-2 bg-black text-white py-1 rounded">+ Join Club</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
