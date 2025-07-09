import React, { useState } from "react";
import { PlusCircle, ClipboardList, Target, Calendar, Edit, Trash2, TrendingUp } from "lucide-react";

export default function GoalsBoard() {
  const tabs = ["Kanban Board", "Goals", "Add New"];
  const [activeTab, setActiveTab] = useState("Kanban Board");

  const [tasks, setTasks] = useState([
    {
      title: "Complete Machine Learning Assignment",
      description: "Finish the neural network project for CS-401",
      due: "2024-03-25",
      priority: "High",
      category: "Academic",
      tags: ["Assignment", "CS-401"],
      column: "To Do",
    },
    {
      title: "Database Project Development",
      description: "Building a library management system",
      due: "2024-04-02",
      priority: "Medium",
      category: "Academic",
      tags: ["Project", "Database"],
      column: "In Progress",
    },
  ]);

  const [goals, setGoals] = useState([
    {
      title: "Achieve 85% Academic Average",
      description: "Maintain high GPA throughout the semester",
      type: "Academic",
      deadline: "2024-06-30",
      current: 82,
      target: 85,
      tasks: ["Complete all assignments", "Attend all classes", "Regular study schedule"],
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due: "",
    priority: "Medium",
    category: "Personal",
  });

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    type: "Academic",
    deadline: "",
    target: "",
  });

  const addTask = () => {
    setTasks([...tasks, { ...newTask, column: "To Do", tags: [], priority: newTask.priority }]);
    setNewTask({ title: "", description: "", due: "", priority: "Medium", category: "Personal" });
    setActiveTab("Kanban Board");
  };

  const addGoal = () => {
    setGoals([
      ...goals,
      {
        ...newGoal,
        current: 0,
        tasks: [],
      },
    ]);
    setNewGoal({ title: "", description: "", type: "Academic", deadline: "", target: "" });
    setActiveTab("Goals");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-6 rounded-xl mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Goals & Task Tracker</h1>
          <p className="text-sm text-indigo-200">Manage your tasks and achieve your goals systematically</p>
        </div>
        <div className="bg-purple-500 px-4 py-2 rounded-full text-sm font-semibold">Tasks Today: {tasks.length}</div>
      </div>

      {/* Tabs */}
    <div className="flex justify-center flex-wrap bg-white rounded shadow px-2 py-2 mb-6 mx-4 sm:mx-6 gap-60 lg:mx-8 gap-6">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 text-base rounded-lg font-medium transition-all ${
        activeTab === tab
          ? 'bg-white text-black shadow font-semibold'
          : 'text-gray-500 hover:text-black'
      }`}
    >
      {tab}
    </button>
  ))}
</div>


      {/* Kanban Board */}
      {activeTab === "Kanban Board" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["To Do", "In Progress", "Done"].map((column) => (
            <div key={column}>
              <h2 className="text-lg font-semibold mb-3">{column}</h2>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.column === column)
                  .map((task, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="text-xs text-gray-500 mb-2">Due: {task.due}</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{task.category}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Goals View */}
      {activeTab === "Goals" && (
        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
                <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">{goal.type}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">Progress: {goal.current}/{goal.target} ({Math.round((goal.current / goal.target) * 100)}%)</p>
              <p className="text-sm text-gray-600">🗓️ Deadline: {goal.deadline}</p>
              <p className="font-medium text-sm">Related Tasks:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {goal.tasks.map((task, j) => (
                  <li key={j}>{task}</li>
                ))}
              </ul>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded flex items-center gap-1 text-sm">
                  <Edit size={16} /> Edit Goal
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded flex items-center gap-1 text-sm">
                  <TrendingUp size={16} /> Update Progress
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Task / Goal */}
      {activeTab === "Add New" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Task */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold">Add New Task</h3>
            <input
              placeholder="Task Title"
              className="w-full border rounded px-4 py-2"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full border rounded px-4 py-2"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <div className="flex gap-4">
              <select
                className="w-full border rounded px-4 py-2"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                className="w-full border rounded px-4 py-2"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option>Academic</option>
                <option>Personal</option>
                <option>Career</option>
              </select>
            </div>
            <input
              type="date"
              className="w-full border rounded px-4 py-2"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
            />
            <button
              onClick={addTask}
              className="w-full bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-800"
            >
              <PlusCircle size={18} /> Add Task
            </button>
          </div>

          {/* Add Goal */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold">Add New Goal</h3>
            <input
              placeholder="Goal Title"
              className="w-full border rounded px-4 py-2"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full border rounded px-4 py-2"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            />
            <div className="flex gap-4">
              <select
                className="w-full border rounded px-4 py-2"
                value={newGoal.type}
                onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
              >
                <option>Academic</option>
                <option>Career</option>
                <option>Social</option>
              </select>
              <input
                type="date"
                className="w-full border rounded px-4 py-2"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>
            <input
              placeholder="Target Value (e.g., 85)"
              className="w-full border rounded px-4 py-2"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
            <button
              onClick={addGoal}
              className="w-full bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-800"
            >
              <PlusCircle size={18} /> Create Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
