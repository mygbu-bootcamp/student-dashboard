import React, { useState } from "react";
import { Download, Eye, Filter, FileText } from "lucide-react";

const categories = [
  { name: "All", count: 6 },
  { name: "Identity", count: 1 },
  { name: "Academic", count: 2 },
  { name: "Examination", count: 1 },
  { name: "Financial", count: 1 },
  { name: "Services", count: 1 },
];

const documents = [
  {
    title: "Student ID Card",
    category: "Identity",
    size: "2.3 MB",
    uploaded: "2024-01-15",
    format: "PDF",
    status: "Verified",
    state: "Active",
  },
  {
    title: "Semester 1 Admit Card",
    category: "Examination",
    size: "1.8 MB",
    uploaded: "2024-03-01",
    format: "PDF",
    status: "Verified",
    state: "Active",
  },
  {
    title: "Bonafide Certificate",
    category: "Academic",
    size: "1.2 MB",
    uploaded: "2024-02-20",
    format: "PDF",
    status: "Verified",
    state: "Expired",
    warning: "Expiring Soon",
  },
  {
    title: "Semester 1 Marksheet",
    category: "Academic",
    size: "956 KB",
    uploaded: "2024-02-01",
    format: "PDF",
    status: "Verified",
    state: "Active",
  },
  {
    title: "Library Card",
    category: "Services",
    size: "1.5 MB",
    uploaded: "2024-01-10",
    format: "PDF",
    status: "Verified",
    state: "Expired",
  },
  {
    title: "Fee Receipt - Semester 2",
    category: "Financial",
    size: "800 KB",
    uploaded: "2024-03-15",
    format: "PDF",
    status: "Verified",
    state: "Active",
  },
];

export default function Documents() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDocuments = selectedCategory === "All"
    ? documents
    : documents.filter(doc => doc.category === selectedCategory);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Document Vault</h1>
      <p className="text-sm text-gray-600 mb-6">Securely store and manage all your academic documents</p>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <input
  type="text"
  placeholder="Search documents..."
  className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400"
/>

        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md text-black text-sm hover:bg-gray-100">
          <Filter className="w-4 h-4 text-black" />
          Filter
        </button>
      </div>

      {/* Category Filters */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`text-sm px-3 py-2 border rounded-lg ${
              selectedCategory === cat.name
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {cat.name} <span className="ml-1 text-xs text-gray-500">{cat.count} docs</span>
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
        {filteredDocuments.map((doc, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 shadow border ${
              doc.state === "Expired" ? "bg-red-50 border-red-200" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="font-semibold">{doc.title}</h2>
              </div>
              {doc.state === "Active" && (
                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">Active</span>
              )}
              {doc.warning && (
                <span className="text-xs text-yellow-700">{doc.warning}</span>
              )}
            </div>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p><strong>Format:</strong> {doc.format}</p>
              <p><strong>Size:</strong> {doc.size}</p>
              <p><strong>Uploaded:</strong> {doc.uploaded}</p>
              <p><strong>Status:</strong> ✅ {doc.status}</p>
            </div>
            {doc.state === "Expired" && (
              <p className="text-red-600 text-xs font-medium mb-2">⚠️ Expired</p>
            )}
            <div className="flex justify-between gap-2 text-sm">
              <button className="w-full flex items-center justify-center gap-1 border border-gray-300 rounded-md py-1 hover:bg-gray-100">
                <Eye className="w-4 h-4" /> View
              </button>
              <button className="w-full flex items-center justify-center gap-1 border border-gray-300 rounded-md py-1 hover:bg-gray-100">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

    {/* Request New Document */}
<div className="bg-white rounded-xl shadow-md p-6 space-y-4">
  <h2 className="text-lg font-semibold text-gray-800">📩 Request New Document</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-medium text-gray-800">Document Type</label>
      <select className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-800">
        <option>Select document type</option>
        <option>Bonafide</option>
        <option>Marksheet</option>
        <option>Fee Receipt</option>
      </select>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-800">Priority</label>
      <select className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-800">
        <option>Normal</option>
        <option>Urgent</option>
      </select>
    </div>
  </div>
  <div>
    <label className="text-sm font-medium text-gray-800">Additional Notes</label>
    <textarea
      rows="3"
      className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-800"
      placeholder="Provide any additional information about the document request..."
    />
  </div>
  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center gap-2">
    📤 Submit Document Request
  </button>
</div>
</div>
  );
}
