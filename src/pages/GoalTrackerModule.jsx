import { useState } from "react";
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
  Trash2,
  Heart,
  Bell,
} from "lucide-react";
import * as React from "react";
import StatsCard from "../components/Statscard"; 

const TabsContext = React.createContext();

const Tabs = ({ defaultValue, value: propValue, onValueChange, children, ...props }) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : localValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) setLocalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className="w-full" {...props}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex h-[48px] items-center justify-between rounded-xl bg-[#f1f5f9] p-1 ${className}`}
      role="tablist"
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { parentProps: props });
        }
        return child;
      })}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ className = "", value, parentProps, children, ...props }, ref) => {
    const { value: contextValue, onValueChange } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    const handleClick = () => {
      onValueChange(value);
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={handleClick}
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none transition-all duration-200 ease-in-out cursor-pointer
         ${isActive
            ? "bg-white text-black shadow-sm" // Active tabs retain shadow but no scale on hover
            : "text-muted-foreground hover:text-foreground " // Inactive tabs get hover effects
          } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
  ({ className = "", value, children, ...props }, ref) => {
    const { value: contextValue } = React.useContext(TabsContext);
    const isActive = value === contextValue;

    return isActive ? (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-4 px-4 sm:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    ) : null;
  }
);
TabsContent.displayName = "TabsContent";

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

  const TaskCard = ({ task }) => (
    // Added fixed height and flex properties for equal length cards
    <div className="mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden h-[200px] flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <p className="text-xs text-gray-600 mb-3">{task.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {task.dueDate}
          </div>
          <span className="text-xs px-2 py-1 rounded-full border border-gray-200">{task.category}</span>
        </div>

        {task.progress && (
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-black h-1 rounded-full"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 rounded-full border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 pt-0 flex justify-between items-center"> {/* Adjusted padding */}
        <div className="flex space-x-1">
          <button className="p-1 rounded-md transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-100 hover:shadow-sm hover:scale-[1.05]">
            <Edit className="h-3 w-3" />
          </button>
          <button className="p-1 rounded-md transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-100 hover:shadow-sm hover:scale-[1.05]">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
        {task.linkedTo && (
          <span className="text-xs px-2 py-1 rounded-full border border-gray-200">
            Linked: {task.linkedTo}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Goals & Task Tracker</h1>
            <p className="text-indigo-100">
              Manage your tasks and achieve your goals systematically
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-2 flex flex-col items-center text-center">
              <Target className="h-8 w-8 text-white mb-2" />
              <div className="text-sm text-indigo-100">Tasks Today</div>
              <div className="text-lg font-bold">
                {tasks.todo.length + tasks.inProgress.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats using StatsCard component */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="To Do"
          value={tasks.todo.length}
          icon={Circle}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="In Progress"
          value={tasks.inProgress.length}
          icon={PlayCircle}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
        />
        <StatsCard
          title="Completed"
          value={tasks.done.length}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Active Goals"
          value={goals.length}
          icon={Star}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="kanban" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="add">Add New</TabsTrigger>
          </TabsList>
          <TabsContent value="kanban">
            <div className="space-y-6">
              {/* Kanban Board */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* To Do Column */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg flex items-center">
                      <Circle className="h-5 w-5 text-blue-500 mr-2" />
                      To Do ({tasks.todo.length})
                    </h3>
                  </div>
                  <div className="p-4">
                    {tasks.todo.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg flex items-center">
                      <PlayCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      In Progress ({tasks.inProgress.length})
                    </h3>
                  </div>
                  <div className="p-4">
                    {tasks.inProgress.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>

                {/* Done Column */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Done ({tasks.done.length})
                    </h3>
                  </div>
                  <div className="p-4">
                    {tasks.done.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{goal.title}</h3>
                          <p className="text-sm text-gray-500">{goal.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full border border-gray-200">
                          {goal.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{goal.current}/{goal.target} ({Math.round((goal.current / goal.target) * 100)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-black h-2 rounded-full"
                              style={{ width: `${(goal.current / goal.target) * 100}%` }}
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
                          <button className="px-3 py-1 text-sm border border-gray-200 rounded-md flex items-center transition-all duration-200 ease-in-out cursor-pointer hover:shadow-sm hover:scale-[1.02]">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Goal
                          </button>
                          <button className="px-3 py-1 text-sm border border-gray-200 rounded-md flex items-center transition-all duration-200 ease-in-out cursor-pointer hover:shadow-sm hover:scale-[1.02]">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Update Progress
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add New Task */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Add New Task</h3>
                    <p className="text-sm text-gray-500">Create a new task to track your progress</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Task Title</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="Enter task title..."
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="Describe your task..."
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <select
                            className="w-full p-2 border border-gray-200 rounded-md"
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                          >
                            {priorities.map((priority) => (
                              <option key={priority} value={priority}>{priority}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Category</label>
                          <select
                            className="w-full p-2 border border-gray-200 rounded-md"
                            value={newTask.category}
                            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                          >
                            {categories.filter(c => c !== "All").map((category) => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Due Date</label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        />
                      </div>

                      <button
                        onClick={addNewTask}
                        className="w-full p-2 bg-black text-white rounded-md flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-black/70 hover:shadow-md hover:scale-[1.01]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add New Goal */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Add New Goal</h3>
                    <p className="text-sm text-gray-500">Set a new long-term goal to achieve</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Goal Title</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="Enter your goal..."
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="Describe your goal..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <select className="w-full p-2 border border-gray-200 rounded-md">
                            <option>Academic</option>
                            <option>Career</option>
                            <option>Health</option>
                            <option>Social</option>
                            <option>Personal</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Target Deadline</label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-200 rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Target Value</label>
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="e.g., 85 (for percentage)"
                        />
                      </div>

                      <button className="w-full p-2 bg-black text-white rounded-md flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer hover:bg-black/70 hover:shadow-md hover:scale-[1.01]">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Goal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GoalTrackerModule;