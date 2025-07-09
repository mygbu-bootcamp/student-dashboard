import React, { useState } from 'react';
import { Plus, Star, Trophy, Users, Calendar, Clock, CheckCircle, AlertCircle, Upload, Award, Target, TrendingUp } from 'lucide-react';

export default function SkillsLabs() {
  const [activeTab, setActiveTab] = useState('skills');
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Technical',
    level: 'Beginner',
    link: ''
  });

  const tabClass = (tab) =>
    `px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
      activeTab === tab 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200'
    }`;

  const skillIcons = {
    'React Development': '⚛️',
    'Machine Learning': '🤖',
    'Project Management': '📊',
    'Data Analysis': '📈'
  };

  const getSkillColor = (percent) => {
    if (percent >= 80) return 'from-green-500 to-emerald-500';
    if (percent >= 60) return 'from-blue-500 to-cyan-500';
    if (percent >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      // Handle skill addition logic here
      setNewSkill({ name: '', category: 'Technical', level: 'Beginner', link: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skills Development & Innovation Labs
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Enhance your skills and participate in cutting-edge research
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-blue-800">Level 5 Innovator</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className={tabClass('skills')} onClick={() => setActiveTab('skills')}>
            <Target className="w-5 h-5" />
            My Skills
          </button>
          <button className={tabClass('labs')} onClick={() => setActiveTab('labs')}>
            <Users className="w-5 h-5" />
            Innovation Labs
          </button>
          <button className={tabClass('rural')} onClick={() => setActiveTab('rural')}>
            <TrendingUp className="w-5 h-5" />
            Rural Innovation
          </button>
          <button className={tabClass('badges')} onClick={() => setActiveTab('badges')}>
            <Award className="w-5 h-5" />
            Badges & Awards
          </button>
        </div>

        {/* Enhanced Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    Current Skills
                  </h2>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    4 Skills Tracked
                  </div>
                </div>
                
                <div className="grid gap-6">
                  {[{
                    name: 'React Development', level: 'Advanced', percent: 85, icon: '⚛️'
                  }, {
                    name: 'Machine Learning', level: 'Intermediate', percent: 65, icon: '🤖'
                  }, {
                    name: 'Project Management', level: 'Beginner', percent: 30, type: 'Soft Skills', icon: '📊'
                  }, {
                    name: 'Data Analysis', level: 'Intermediate', percent: 70, icon: '📈'
                  }].map((skill) => (
                    <div key={skill.name} className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {skill.type || 'Technical'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-700">{skill.level}</div>
                          <div className="text-lg font-bold text-gray-800">{skill.percent}%</div>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getSkillColor(skill.percent)} rounded-full transition-all duration-500 group-hover:scale-105`}
                          style={{ width: `${skill.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Add New Skill</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                    <input 
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                      placeholder="e.g., Python Programming" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Technical</option>
                      <option>Soft Skills</option>
                      <option>Creative</option>
                      <option>Leadership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level</label>
                    <select 
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Link (Optional)</label>
                    <input 
                      value={newSkill.link}
                      onChange={(e) => setNewSkill({...newSkill, link: e.target.value})}
                      placeholder="Link to project or course" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button 
                    onClick={handleAddSkill}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Innovation Labs */}
        {activeTab === 'labs' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {[{
              title: 'AI & Machine Learning Lab', 
              mentor: 'Dr. Priya Sharma', 
              schedule: 'Mon, Wed, Fri - 2:00 PM', 
              enrolled: true, 
              seats: '18/25',
              description: 'Explore cutting-edge AI algorithms and machine learning techniques',
              icon: '🤖',
              difficulty: 'Advanced'
            }, {
              title: 'IoT Innovation Lab', 
              mentor: 'Prof. Rajesh Kumar', 
              schedule: 'Tue, Thu - 3:00 PM', 
              enrolled: false, 
              seats: '12/25',
              description: 'Build smart devices and IoT solutions for real-world problems',
              icon: '🔌',
              difficulty: 'Intermediate'
            }, {
              title: 'FinTech Lab', 
              mentor: 'Dr. Anjali Verma', 
              schedule: 'Wed, Fri - 4:00 PM', 
              waitlist: true, 
              seats: '15/15',
              description: 'Develop financial technology solutions and blockchain applications',
              icon: '💳',
              difficulty: 'Advanced'
            }, {
              title: 'Cybersecurity Lab', 
              mentor: 'Mr. Vikram Singh', 
              schedule: 'Mon, Thu - 1:00 PM', 
              enrolled: false, 
              seats: '8/25',
              description: 'Learn ethical hacking and security best practices',
              icon: '🔒',
              difficulty: 'Intermediate'
            }].map((lab) => (
              <div key={lab.title} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{lab.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{lab.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          lab.difficulty === 'Advanced' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {lab.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">{lab.seats} enrolled</span>
                      </div>
                    </div>
                  </div>
                  {lab.enrolled && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Enrolled</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{lab.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Mentor: {lab.mentor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{lab.schedule}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Enrollment Progress</span>
                    <span>{lab.seats}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                      style={{ width: `${(parseInt(lab.seats.split('/')[0]) / parseInt(lab.seats.split('/')[1])) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  lab.enrolled 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : lab.waitlist
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                }`}>
                  {lab.enrolled ? 'Already Enrolled' : lab.waitlist ? 'Join Waitlist' : 'Register Now'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Rural Innovation */}
        {activeTab === 'rural' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">My Rural Innovation Projects</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">Smart Irrigation System</h3>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Submitted</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">An IoT-based irrigation system for water conservation in rural farms</p>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>Submitted on March 15, 2024</span>
                  </div>
                </div>
                
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">Rural Healthcare App</h3>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">In Progress</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Mobile app connecting rural patients with healthcare providers</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">65% Complete</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Submit New Project</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input 
                    placeholder="e.g., Smart Farming Assistant" 
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Agriculture</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Environment</option>
                    <option>Finance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                  <textarea 
                    placeholder="Describe your innovative solution for rural development..."
                    rows="4" 
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Documentation</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                      <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload project files, documents, or images</p>
                      <input type="file" className="hidden" multiple />
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Submit Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Badges */}
        {activeTab === 'badges' && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[{
              title: 'Code Ninja', 
              desc: 'Completed 10+ coding projects', 
              earned: true, 
              date: '2024-02-15',
              icon: '👨‍💻',
              rarity: 'Common'
            }, {
              title: 'Innovation Pioneer', 
              desc: 'Submitted rural innovation project', 
              earned: true, 
              date: '2024-03-15',
              icon: '🚀',
              rarity: 'Rare'
            }, {
              title: 'Team Player', 
              desc: 'Collaborated on 5+ team projects', 
              earned: false,
              icon: '🤝',
              rarity: 'Common',
              progress: 60
            }, {
              title: 'Research Scholar', 
              desc: 'Published research paper', 
              earned: false,
              icon: '📚',
              rarity: 'Epic',
              progress: 25
            }, {
              title: 'Mentor Master', 
              desc: 'Mentored 3+ junior developers', 
              earned: false,
              icon: '👨‍🏫',
              rarity: 'Rare',
              progress: 33
            }, {
              title: 'Lab Leader', 
              desc: 'Led an innovation lab project', 
              earned: false,
              icon: '🔬',
              rarity: 'Epic',
              progress: 0
            }].map((badge) => (
              <div key={badge.title} className={`relative p-6 rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                badge.earned 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 hover:border-yellow-400' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}>
                {badge.earned && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    badge.rarity === 'Epic' ? 'bg-purple-100 text-purple-600' :
                    badge.rarity === 'Rare' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {badge.rarity}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{badge.title}</h3>
                <p className="text-gray-600 text-sm text-center mb-4">{badge.desc}</p>
                
                {badge.earned ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Earned</span>
                    </div>
                    <p className="text-xs text-gray-500">{badge.date}</p>
                  </div>
                ) : (
                  <div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">{badge.progress || 0}% Complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}