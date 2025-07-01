import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Target, 
  Plus, 
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  PlayCircle,
  Star,
  TrendingUp,
  Edit,
  Trash2
} from "lucide-react";

// Removed TypeScript interface and type annotations

const GoalTrackerModule = ({ user }) => {
  const [activeTab, setActiveTab] = useState("kanban");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    category: "Personal"
  });

  // Mock tasks data organized by status
  const tasks = {
    todo: [
      {
        id: 1,
        title: "Complete Machine Learning Assignment",
        description: "Finish the neural network project for CS-401",
        priority: "High",
        dueDate: "2024-03-25",
        category: "Academic",
        tags: ["Assignment", "CS-401"],
        linkedTo: "assignments"
      },
      {
        id: 2,
        title: "Prepare for Placement Interview",
        description: "Practice coding problems and system design",
        priority: "High",
        dueDate: "2024-03-28",
        category: "Career",
        tags: ["Interview", "Coding"],
        linkedTo: "placement"
      },
      {
        id: 3,
        title: "Join Photography Club Event",
        description: "Attend the weekend photography workshop",
        priority: "Low",
        dueDate: "2024-03-30",
        category: "Extracurricular",
        tags: ["Club", "Photography"],
        linkedTo: "clubs"
      }
    ],
    inProgress: [
      {
        id: 4,
        title: "Database Project Development",
        description: "Building a library management system",
        priority: "Medium",
        dueDate: "2024-04-02",
        category: "Academic",
        tags: ["Project", "Database"],
        linkedTo: "academic",
        progress: 65
      },
      {
        id: 5,
        title: "Daily Wellness Tracking",
        description: "Maintain consistent health monitoring",
        priority: "Medium",
        dueDate: "2024-04-15",
        category: "Health",
        tags: ["Wellness", "Daily"],
        linkedTo: "wellness",
        progress: 45
      }
    ],
    done: [
      {
        id: 6,
        title: "Submit Fee Payment",
        description: "Completed semester fee payment",
        priority: "High",
        dueDate: "2024-03-15",
        category: "Administrative",
        tags: ["Fee", "Payment"],
        linkedTo: "fees",
        completedDate: "2024-03-14"
      },
      {
        id: 7,
        title: "Library Book Return",
        description: "Returned 'Data Structures' book",
        priority: "Medium",
        dueDate: "2024-03-18",
        category: "Academic",
        tags: ["Library", "Books"],
        linkedTo: "library",
        completedDate: "2024-03-17"
      }
    ]
  };

  // Mock goals data
  const goals = [
    {
      id: 1,
      title: "Achieve 85% Academic Average",
      description: "Maintain high GPA throughout the semester",
      type: "Academic",
      target: 85,
      current: 82,
      deadline: "2024-06-30",
      status: "In Progress",
      tasks: ["Complete all assignments", "Attend all classes", "Regular study schedule"]
    },
    {
      id: 2,
      title: "Get Placed in Top IT Company",
      description: "Secure a software engineering position",
      type: "Career",
      target: 1,
      current: 0,
      deadline: "2024-12-31",
      status: "In Progress",
      tasks: ["Build strong portfolio", "Practice coding", "Network with professionals"]
    },
    {
      id: 3,
      title: "Complete 100 Hours of Community Service",
      description: "Contribute to NSS activities and social causes",
      type: "Social",
      target: 100,
      current: 65,
      deadline: "2024-08-31",
      status: "In Progress",
      tasks: ["Join NSS activities", "Volunteer for events", "Lead community projects"]
    }
  ];

  const categories = ["All", "Academic", "Career", "Health", "Extracurricular", "Personal", "Administrative"];
  const priorities = ["Low", "Medium", "High"];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const addNewTask = () => {
    console.log("Adding new task:", newTask);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      category: "Personal"
    });
  };

  // Converted TaskCard to plain JS props
  const TaskCard = ({ task }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <Badge className={`text-xs ${getPriorityColor(task.priority)}`} variant="outline">
            {task.priority}
          </Badge>
        </div>
        
        <p className="text-xs text-gray-600 mb-3">{task.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {task.dueDate}
          </div>
          <Badge variant="outline" className="text-xs">{task.category}</Badge>
        </div>
        
        {task.progress && (
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full" 
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          {task.linkedTo && (
            <Badge variant="outline" className="text-xs">
              Linked: {task.linkedTo}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Goals & Task Tracker</h1>
            <p className="text-indigo-100">Manage your tasks and achieve your goals systematically</p>
          </div>
          <div className="text-center">
            <Target className="h-12 w-12 text-white mb-2" />
            <div className="bg-white/20 rounded-lg p-2">
              <div className="text-sm text-indigo-100">Tasks Today</div>
              <div className="text-lg font-bold">{tasks.todo.length + tasks.inProgress.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Circle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">{tasks.todo.length}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PlayCircle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-600">{tasks.inProgress.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">{tasks.done.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{goals.length}</div>
            <div className="text-sm text-gray-600">Active Goals</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-6">
          {/* Kanban Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* To Do Column */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Circle className="h-5 w-5 text-blue-500 mr-2" />
                  To Do ({tasks.todo.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {tasks.todo.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>

            {/* In Progress Column */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <PlayCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  In Progress ({tasks.inProgress.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {tasks.inProgress.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>

            {/* Done Column */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Done ({tasks.done.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {tasks.done.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{goal.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{goal.current}/{goal.target} ({Math.round((goal.current/goal.target)*100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(goal.current/goal.target)*100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Deadline */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Deadline: {goal.deadline}
                    </div>
                    
                    {/* Related Tasks */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">Related Tasks:</h5>
                      <ul className="space-y-1">
                        {goal.tasks.map((task, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Goal
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Update Progress
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Task */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>Create a new task to track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Task Title</label>
                    <Input
                      placeholder="Enter task title..."
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe your task..."
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={newTask.category}
                        onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      >
                        {categories.filter(c => c !== "All").map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <Input 
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={addNewTask} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Add New Goal */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Goal</CardTitle>
                <CardDescription>Set a new long-term goal to achieve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Goal Title</label>
                    <Input placeholder="Enter your goal..." />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Describe your goal..." />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Academic</option>
                        <option>Career</option>
                        <option>Health</option>
                        <option>Social</option>
                        <option>Personal</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Target Deadline</label>
                      <Input type="date" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Target Value</label>
                    <Input type="number" placeholder="e.g., 85 (for percentage)" />
                  </div>
                  
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalTrackerModule;