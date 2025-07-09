import React, { useState } from 'react';
import { Heart, Clock, MonitorSmartphone, CheckCheck, Star, Settings, AlertTriangle, Smile, Link, ActivitySquare, Phone } from 'lucide-react';

export default function Wellness() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabs = ['Dashboard', 'Mood Journal', 'Health Sync', 'Support'];

  const tabClass = (tab) => `px-4 py-2 text-sm rounded-t ${activeTab === tab ? 'bg-white text-black font-semibold shadow' : 'text-gray-500'}`;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-900 to-purple-700 text-white p-6 rounded-xl shadow mb-4">
        <h1 className="text-2xl font-bold">Wellness & Mental Health</h1>
        <p className="text-sm">Track your well-being and maintain a healthy lifestyle</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-between bg-white rounded shadow px-2 py-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={tabClass(tab)}>{tab}</button>
        ))}
      </div>

        {activeTab === 'Dashboard' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <div className="bg-white text-center p-4 rounded shadow">
              <Heart className="mx-auto text-pink-500" />
              <p className="text-xl font-bold text-black">7.2</p>
              <p className="text-sm text-black">Mood Average</p>
            </div>
            <div className="bg-white text-center p-4 rounded shadow">
              <Clock className="mx-auto text-blue-500" />
              <p className="text-xl font-bold text-black">6.5h</p>
              <p className="text-sm text-black">Sleep Average</p>
            </div>
            <div className="bg-white text-center p-4 rounded shadow">
              <MonitorSmartphone className="mx-auto text-orange-500" />
              <p className="text-xl font-bold text-black">8.2h</p>
              <p className="text-sm text-black">Screen Time</p>
            </div>
            <div className="bg-white text-center p-4 rounded shadow">
              <CheckCheck className="mx-auto text-green-500" />
              <p className="text-xl font-bold text-black">6847</p>
              <p className="text-sm text-black">Steps Today</p>
            </div>
            <div className="bg-white text-center p-4 rounded shadow">
              <Star className="mx-auto text-purple-500" />
              <p className="text-xl font-bold text-black">12</p>
              <p className="text-sm text-black">Check-in Streak</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow text-center">
              <Heart className="mx-auto text-pink-600" />
              <p className="font-semibold mt-2 text-black">Daily Mood Check-in</p>
              <p className="text-sm text-black">Log how you're feeling</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <Settings className="mx-auto text-blue-600" />
              <p className="font-semibold mt-2 text-black">Sync Health Data</p>
              <p className="text-sm text-black">Connect fitness apps</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <AlertTriangle className="mx-auto text-green-600" />
              <p className="font-semibold mt-2 text-black">Get Support</p>
              <p className="text-sm text-black">Talk to a counselor</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Recent Mood Entries</h2>
              <p className="text-sm text-black mb-4">Your mood tracking history</p>
              {[{ date: '2024-03-25', mood: '😊', note: 'Good productive day', rating: '4/6' },
                { date: '2024-03-24', mood: '😟', note: 'Feeling stressed about exams', rating: '3/6' },
                { date: '2024-03-23', mood: '😃', note: 'Great day with friends', rating: '5/6' },
                { date: '2024-03-22', mood: '🙂', note: 'Normal day', rating: '4/6' }].map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-black">{entry.date}</p>
                    <p className="text-sm text-black">{entry.note}</p>
                  </div>
                  <span className="text-sm text-black">{entry.mood} {entry.rating}</span>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Sleep Tracking</h2>
              <p className="text-sm text-black mb-4">Your sleep pattern analysis</p>
              {[{ date: '2024-03-25', duration: '7.5 hours', tag: 'Good' },
                { date: '2024-03-24', duration: '6 hours', tag: 'Poor' },
                { date: '2024-03-23', duration: '8 hours', tag: 'Excellent' },
                { date: '2024-03-22', duration: '6.5 hours', tag: 'Fair' }].map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-black">{entry.date}</p>
                    <p className="text-sm text-black">{entry.duration}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${entry.tag === 'Excellent' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>{entry.tag}</span>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-black mb-2">Sleep Tracking</h2>
              <p className="text-sm text-black mb-4">Your sleep pattern analysis</p>
              {[{ date: '2024-03-25', duration: '7.5 hours', tag: 'Good' },
                { date: '2024-03-24', duration: '6 hours', tag: 'Poor' },
                { date: '2024-03-23', duration: '8 hours', tag: 'Excellent' },
                { date: '2024-03-22', duration: '6.5 hours', tag: 'Fair' }].map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-semibold text-black">{entry.date}</p>
                    <p className="text-sm text-gray-600">{entry.duration}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${entry.tag === 'Excellent' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{entry.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Mood Journal Tab */}
      {activeTab === 'Mood Journal' && (
        <div className="bg-white p-6 rounded shadow space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-black">Daily Mood Check-in</h2>
            <p className="text-sm text-gray-600">How are you feeling today? Your emotions matter.</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {["Very Sad", "Sad", "Okay", "Good", "Great", "Excellent"].map((mood, index) => (
              <div key={index} className="border rounded p-4 text-center text-black hover:shadow cursor-pointer">
                <p className="text-2xl">{['😢','😟','😐','😊','😄','🤩'][index]}</p>
                <p className="text-sm mt-1">{mood}</p>
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-black">What's on your mind? (Optional)</label>
            <textarea className="w-full mt-1 p-2 border rounded text-black" rows="3" placeholder="Share what's making you feel this way..."></textarea>
          </div>
          <button className="w-full bg-black text-white py-2 rounded font-semibold ">+ Log Today's Mood</button>
        </div>
      )}

      {/* Health Sync Tab */}
      {activeTab === 'Health Sync' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-black">Connected Apps</h2>
            <p className="text-sm text-gray-600 mb-4">Sync your health and fitness data</p>
            {[{ name: 'Apple Health', status: 'Connected', desc: 'Syncing steps, sleep, heart rate' },
              { name: 'Google Fit', status: 'Connect', desc: 'Activity tracking' },
              { name: 'Fitbit', status: 'Connect', desc: 'Comprehensive health tracking' }].map((app, idx) => (
              <div key={idx} className="flex justify-between items-center border rounded p-3 mb-2">
                <div>
                  <p className="font-semibold text-black">{app.name}</p>
                  <p className="text-sm text-gray-600">{app.desc}</p>
                </div>
                <button className={`text-sm px-3 py-1 rounded ${app.status === 'Connected' ? 'bg-black text-white' : 'bg-white border'}`}>{app.status}</button>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-black">Health Goals</h2>
            <p className="text-sm text-gray-600 mb-4">Set and track your wellness objectives</p>
            <div className="mb-2">
              <p className="text-sm text-black">Daily Steps</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-black h-2 rounded-full w-4/6"></div>
              </div>
              <p className="text-xs text-right text-black">6,847 / 10,000</p>
            </div>
            <div className="mb-2">
              <p className="text-sm text-black">Sleep Goal</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-black h-2 rounded-full w-5/6"></div>
              </div>
              <p className="text-xs text-right text-black">6.5 / 8 hours</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-black">Screen Time Limit</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-black h-2 rounded-full w-full"></div>
              </div>
              <p className="text-xs text-right text-black">8.2 / 6 hours</p>
            </div>
            <button className="w-full text-sm py-2 rounded border text-black border-gray-300 flex items-center justify-center gap-2"><Settings size={16}/> Adjust Goals</button>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'Support' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-black">Crisis Support</h2>
            <p className="text-sm text-gray-600 mb-2">Immediate help when you need it most</p>
            <button className="bg-red-500 text-white w-full py-2 rounded flex items-center justify-center gap-2"><AlertTriangle size={16}/> Emergency Mental Health Support</button>
            <ul className="mt-4 space-y-1 text-sm text-black">
              <li><strong>National Helpline:</strong> 1800-123-4567</li>
              <li><strong>Campus Counselor:</strong> Available 24/7</li>
              <li><strong>Peer Support:</strong> Student volunteers</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-black">Wellness Mentors</h2>
            <p className="text-sm text-gray-600 mb-4 ">Professional counselors and life coaches</p>
            {[{ name: 'Dr. Priya Sharma', field: 'Stress Management', rating: '4.9 ★', sessions: 45, status: 'Connect' },
              { name: 'Prof. Rajesh Kumar', field: 'Academic Counseling', rating: '4.8 ★', sessions: 32, status: 'Busy' },
              { name: 'Ms. Anjali Verma', field: 'Life Coaching', rating: '4.7 ★', sessions: 28, status: 'Connect' }].map((mentor, idx) => (
              <div key={idx} className="flex justify-between items-center border rounded p-3 mb-2">
                <div>
                  <p className="font-semibold text-black">{mentor.name}</p>
                  <p className="text-sm text-gray-600">{mentor.field}</p>
                  <p className="text-xs text-gray-500">{mentor.rating} • {mentor.sessions} sessions</p>
                </div>
                <button className={`text-sm px-3 py-1 rounded ${mentor.status === 'Connect' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>{mentor.status}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
