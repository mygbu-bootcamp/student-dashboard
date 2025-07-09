import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Trophy, 
  Award, 
  Star, 
  Heart, 
  Plus, 
  Eye, 
  Download,
  Users,
  MapPin,
  Calendar,
  Leaf,
  BookOpen,
  UserCheck,
  Target
} from 'lucide-react';

const Impacts = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: Clock, label: 'Total Hours', value: '156', color: 'text-blue-600 bg-blue-50' },
    { icon: CheckCircle, label: 'Activities', value: '23', color: 'text-green-600 bg-green-50' },
    { icon: Trophy, label: 'Rank', value: '#12', color: 'text-amber-600 bg-amber-50' },
    { icon: Award, label: 'Badges', value: '8', color: 'text-purple-600 bg-purple-50' },
    { icon: Star, label: 'Impact Score', value: '890', color: 'text-orange-600 bg-orange-50' }
  ];

  const recentActivities = [
    {
      title: 'Tree Plantation Drive',
      hours: 8,
      date: '2024-03-15',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      title: 'Blood Donation Camp',
      hours: 12,
      date: '2024-03-10',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      title: 'Digital Literacy Workshop',
      hours: 6,
      date: '2024-03-20',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ];

  const leaderboard = [
    { name: 'Arjun Patel', hours: 245, activities: 34, points: 1250, rank: 1 },
    { name: 'Priya Sharma', hours: 223, activities: 31, points: 1180, rank: 2 },
    { name: 'Rohit Kumar', hours: 198, activities: 28, points: 1050, rank: 3 },
    { name: 'Sneha Gupta', hours: 187, activities: 26, points: 980, rank: 4 },
    { name: 'Amit Singh', hours: 172, activities: 24, points: 920, rank: 5 }
  ];

  const badges = [
    {
      title: 'Environmental Champion',
      description: '50+ hours in environmental activities',
      icon: Leaf,
      earned: true,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Health Advocate',
      description: '30+ hours in health initiatives',
      icon: Heart,
      earned: true,
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: 'Education Pioneer',
      description: '40+ hours in education programs',
      icon: BookOpen,
      earned: true,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Community Leader',
      description: 'Led 5+ community projects',
      icon: Users,
      earned: false,
      color: 'bg-gray-50 border-gray-200'
    },
    {
      title: 'Impact Maker',
      description: '1000+ impact score',
      icon: Target,
      earned: false,
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  const TabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Recent Activities and Enrolled Programs */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activities</h3>
                <p className="text-sm text-gray-600 mb-6">Your latest community service contributions</p>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.hours} hours • {activity.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrolled Programs</h3>
                <p className="text-sm text-gray-600 mb-6">Your active service programs</p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">NSS (National Service Scheme)</h4>
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full">45 members</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Community service and social development activities</p>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Officer:</span> Dr. Priya Sharma</p>
                      <p><span className="font-medium">Coordinator:</span> Arjun Patel</p>
                    </div>
                    <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Enrolled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-8">
            {/* Log New Activity Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Log New Activity</h3>
              <p className="text-sm text-gray-600 mb-6">Record your community service activities for approval</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Tree Plantation Drive"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours Contributed</label>
                  <input
                    type="number"
                    defaultValue="8"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Community Park, Sector 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows="4"
                  placeholder="Describe your activity and impact..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <button className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Submit for Approval
              </button>
            </div>

            {/* Your Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Activities</h3>
              <p className="text-sm text-gray-600 mb-6">Track all your community service activities</p>
              
              <div className="space-y-4">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">Tree Plantation Drive</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Approved</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Planted 50 saplings in the local community park</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          8 hours
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          2024-03-15
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Community Park, Sector 12
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-200">
                          Environmental Conservation
                        </span>
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">
                          Certificate Available
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Role: Volunteer</span>
                      <span className="text-xs text-gray-500">Officer: Dr. Priya Sharma</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {/* NSS Program */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">NSS (National Service Scheme)</h3>
              <p className="text-sm text-gray-600 mb-6">Community service and social development activities</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Program Officer:</span>
                  <span className="text-sm text-gray-900">Dr. Priya Sharma</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Student Coordinator:</span>
                  <span className="text-sm text-gray-900">Arjun Patel</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Active Members:</span>
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">45</span>
                </div>
              </div>
              
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                Enrolled
              </span>
            </div>

            {/* NCC Program */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">NCC (National Cadet Corps)</h3>
              <p className="text-sm text-gray-600 mb-6">Character building and leadership development</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Program Officer:</span>
                  <span className="text-sm text-gray-900">Major Rajesh Singh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Student Coordinator:</span>
                  <span className="text-sm text-gray-900">Rohit Kumar</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Active Members:</span>
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">38</span>
                </div>
              </div>
              
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Join Program
              </button>
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Impact Leaderboard</h3>
            <p className="text-sm text-gray-600 mb-6">Top contributors in social service activities</p>
            
            <div className="space-y-4">
              {leaderboard.map((person, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      person.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {person.rank <= 3 ? (
                        <Trophy className="w-4 h-4" />
                      ) : (
                        person.rank
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{person.name}</h4>
                      <p className="text-sm text-gray-600">{person.hours} hours • {person.activities} activities</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{person.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'badges':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievement Badges</h3>
              <p className="text-sm text-gray-600 mb-6">Unlock badges as you contribute to the community</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 transition-all ${
                  badge.earned 
                    ? `${badge.color} border-solid` 
                    : 'bg-gray-50 border-gray-200 border-dashed opacity-60'
                }`}>
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      badge.earned ? badge.color : 'bg-gray-200'
                    }`}>
                      <badge.icon className={`w-8 h-8 ${
                        badge.earned ? '' : 'text-gray-400'
                      }`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{badge.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      badge.earned 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {badge.earned ? 'Earned' : 'Not Earned'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
   <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl shadow mb-6 mx-4 sm:mx-6 lg:mx-8 mt-4">
  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold mb-2">Social Impact & Community Service</h1>
      <p className="text-blue-100 text-lg">Track your NSS/NCC activities and community contributions</p>
    </div>
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
      <Heart className="w-6 h-6" />
      <div className="text-right">
        <div className="text-sm opacity-80">Impact Score</div>
        <div className="text-2xl font-bold">890</div>
      </div>
    </div>
  </div>
</div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 mb-8">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4 shadow-sm`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-30">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 overflow-x-auto gap-35">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'activities', label: 'Activities' },
            { id: 'programs', label: 'Programs' },
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'badges', label: 'Badges' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <TabContent />
      </div>
    </div>
  );
};

export default Impacts;