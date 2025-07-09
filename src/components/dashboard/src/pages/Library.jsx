import React, { useState } from "react";
import { Search, BookOpen, Clock, AlertTriangle, CreditCard, Download, Users, Calendar, Star, Filter, Bell } from "lucide-react";

const LibraryServices = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Library Services
                </h1>
                <p className="text-sm text-gray-600">Manage your books, access digital resources, and track fines</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Library Card</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/60 backdrop-blur-sm p-1 rounded-xl border border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'digital', label: 'Digital Resources', icon: Download },
            { id: 'reservations', label: 'Reservations', icon: Calendar },
            { id: 'fines', label: 'Fines', icon: CreditCard }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Enhanced Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
          {/* Search */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search books, authors, or topics..."
              />
            </div>
          </div>

          {/* Stats Cards */}
          {[
            { label: 'Books Issued', value: '4', color: 'blue', icon: BookOpen },
            { label: 'Books Returned', value: '2', color: 'green', icon: BookOpen },
            { label: 'Overdue', value: '1', color: 'red', icon: AlertTriangle },
            { label: 'Total Fines', value: '₹70', color: 'orange', icon: CreditCard }
          ].map(({ label, value, color, icon: Icon }, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className={`text-2xl font-bold ${
                    color === 'red' ? 'text-red-600' : 
                    color === 'green' ? 'text-green-600' :
                    color === 'orange' ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  color === 'red' ? 'bg-red-100 text-red-600' :
                  color === 'green' ? 'bg-green-100 text-green-600' :
                  color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Alert */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-1">Overdue Alert</h3>
              <p className="text-red-700">You have 1 overdue book. Please return it immediately to avoid additional fines.</p>
              <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Currently Issued Books */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Currently Issued Books</h2>
                  <Filter className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  ["Data Structures and Algorithms", "Mark Allen", "2024-06-01", "2024-06-21", "Active", 4.8],
                  ["Machine Learning", "Andrew Ng", "2024-05-20", "2024-06-10", "Overdue", 4.9],
                  ["Clean Code", "Robert C. Martin", "2024-06-10", "2024-07-01", "Active", 4.7],
                  ["System Design Interview", "Alex Xu", "2024-06-05", "2024-06-25", "Active", 4.6]
                ].map(([title, author, issueDate, dueDate, status, rating], i) => (
                  <div key={i} className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{title}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">by {author}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Issued: {issueDate}</span>
                          <span>Due: {dueDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          status === 'Overdue' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {status}
                        </span>
                        <div className="flex space-x-2 mt-3">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 transition-colors">
                            Renew
                          </button>
                          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-400 transition-colors">
                            Return
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserved Books */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <h2 className="text-xl font-bold text-gray-900">Reserved Books</h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  ["Artificial Intelligence", "Stuart Russell", "2024-07-01", 1],
                  ["Design Patterns", "Erich Gamma", "2024-07-05", 2]
                ].map(([title, author, available, position], i) => (
                  <div key={i} className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                        <p className="text-sm text-gray-600 mb-2">by {author}</p>
                        <p className="text-xs text-gray-500">Expected: {available}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium mb-2">
                          Position #{position}
                        </div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'digital' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50">
              <h2 className="text-xl font-bold text-gray-900">Digital Resources</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["IEEE Xplore Digital Library", "Full Access", "green"],
                  ["Springer eBooks", "Limited", "yellow"],
                  ["ACM Digital Library", "Full Access", "green"],
                  ["GitHub Learning Platform", "Full Access", "green"]
                ].map(([platform, access, color], i) => (
                  <div key={i} className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{platform}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                          color === 'green' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {access}
                        </span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Access
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fines' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
              <h2 className="text-xl font-bold text-gray-900">Fines & Penalties</h2>
            </div>
            <div className="p-6 space-y-4">
              {[
                ["Clean Code", "Pending", "₹70"],
                ["System Design", "Paid", "₹0"]
              ].map(([book, status, fine], i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">{book}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      status === 'Pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{fine}</p>
                    {status === "Pending" && (
                      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors mt-2">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Request New Book", desc: "Suggest a book for the library", icon: BookOpen, color: "blue" },
            { title: "Reserve Library Seat", desc: "Reserve reading/study space", icon: Users, color: "green" },
            { title: "Reading Room Booking", desc: "Reserve group study rooms", icon: Calendar, color: "purple" }
          ].map(({ title, desc, icon: Icon, color }, i) => (
            <div key={i} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${
                  color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryServices;