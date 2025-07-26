import React,{ useState } from "react";
import { useToast } from "../hooks/use-toast";
import { 
  MessageSquare, 
  Upload, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Bell,
  Star,
  Eye,
  RotateCcw,
  Send
} from "lucide-react";

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
        className={`flex-1 h-8px inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-4 focus:outline-none ${
          isActive
            ? "bg-white text-black shadow-sm"
            : "text-muted-foreground hover:text-foreground"
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

const GrievanceModule = ({ user }) => {
  const { toast } = useToast();
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  
  // Form state for new grievance
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    isAnonymous: false,
    attachments: []
  });

  // Mock data for demonstration
  const [grievances, setGrievances] = useState([
    {
      id: "GRV2025-0001",
      category: "Hostel",
      description: "WiFi connectivity issues in Block A, Room 201. The connection keeps dropping frequently during online classes.",
      status: "Under Review",
      dateSubmitted: "2024-03-15",
      assignedAuthority: "IT Services",
      isAnonymous: false,
      responses: [
        {
          id: "1",
          message: "We have received your complaint and assigned it to our technical team for immediate review.",
          from: "IT Admin",
          timestamp: "2024-03-15 14:30",
          isAdmin: true
        }
      ]
    },
    {
      id: "GRV2025-0002",
      category: "Academic",
      description: "Request for re-evaluation of mid-semester examination marks for Computer Networks subject.",
      status: "Resolved",
      dateSubmitted: "2024-03-10",
      assignedAuthority: "Academic Department",
      isAnonymous: false,
      responses: [
        {
          id: "1",
          message: "Your re-evaluation request has been processed. Updated marks will be reflected in the portal within 24 hours.",
          from: "Academic Office",
          timestamp: "2024-03-12 11:00",
          isAdmin: true
        }
      ],
      resolution: "Re-evaluation completed. Marks updated successfully.",
      rating: 5,
      feedback: "Quick resolution, very satisfied with the process."
    }
  ]);

  const categories = [
    "Academic",
    "Hostel",
    "Mess",
    "Admin",
    "Exam Cell",
    "IT Services",
    "Security",
    "Others"
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Under Review':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Reopened':
        return <RotateCcw className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    const variantClasses = {
      'Submitted': 'bg-gray-100 text-gray-800',
      'Under Review': 'bg-blue-100 text-blue-800',
      'Resolved': 'border border-green-200 text-green-800',
      'Reopened': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[status]}`}>
        {status}
      </span>
    );
  };

  const handleSubmitGrievance = () => {
    if (!formData.category || !formData.description || formData.description.length < 100) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields. Description must be at least 100 words.",
        variant: "destructive",
      });
      return;
    }

    const newGrievance = {
      id: `GRV2025-${String(grievances.length + 1).padStart(4, '0')}`,
      category: formData.category,
      description: formData.description,
      status: 'Submitted',
      dateSubmitted: new Date().toISOString().split('T')[0],
      isAnonymous: formData.isAnonymous,
      responses: []
    };

    setGrievances([newGrievance, ...grievances]);
    setFormData({ category: "", description: "", isAnonymous: false, attachments: [] });
    
    toast({
      title: "Grievance Submitted Successfully",
      description: `Your grievance has been submitted with ID: ${newGrievance.id}`,
    });
  };

  const activeGrievancesCount = grievances.filter(g => g.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grievance - Raise a Concern</h1>
          <p className="text-gray-600 mt-1">Submit and track your grievances for quick resolution</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{activeGrievancesCount}</div>
          <div className="text-sm text-gray-500">Active Issues</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                New Grievance
              </div>
            </TabsTrigger>
            <TabsTrigger value="history">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                History & Status
              </div>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </div>
            </TabsTrigger>
          </TabsList>

          {/* New Grievance Submission */}
          <TabsContent value="new">
            <div className="bg-white rounded-lg ">
              <div className="p-6 border-b border-transparent">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Submit New Grievance
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Please provide detailed information about your concern for faster resolution
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Grievance Category *</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description * (Minimum 100 words)</label>
                  <textarea
                    id="description"
                    placeholder="Please describe your grievance in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px] mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="text-sm text-gray-500">
                    {formData.description.split(' ').filter(word => word.length > 0).length} words
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <input
                        id="attachments"
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setFormData(prev => ({ ...prev, attachments: files }));
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('attachments')?.click()}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Choose Files
                      </button>
                      <p className="text-sm text-gray-500 mt-1">
                        Max 3 files: PDF, PNG, JPG (5MB each)
                      </p>
                    </div>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="h-4 w-4" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-center">
                  <input
                    id="anonymous"
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                    Submit anonymously (Your identity will be hidden from the handler)
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmitGrievance}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Grievance
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Grievance History */}
          <TabsContent value="history">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-transparent">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Grievance History & Status
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Track the status and progress of your submitted grievances
                </p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grievance ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Authority</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {grievances.map((grievance) => (
                        <tr key={grievance.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grievance.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grievance.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grievance.dateSubmitted}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(grievance.status)}
                              {getStatusBadge(grievance.status)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grievance.assignedAuthority || 'Pending Assignment'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedGrievance(grievance)}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </button>
                              {grievance.status === 'Resolved' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = grievances.map(g => 
                                      g.id === grievance.id ? { ...g, status: 'Reopened' } : g
                                    );
                                    setGrievances(updated);
                                    toast({
                                      title: "Grievance Reopened",
                                      description: "Your grievance has been reopened for review.",
                                    });
                                  }}
                                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <RotateCcw className="h-4 w-4 mr-1" />
                                  Reopen
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grievance Details Modal */}
              {selectedGrievance && (
                <div className="mt-6 bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-transparent">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Grievance Details - {selectedGrievance.id}</h2>
                      <button
                        type="button"
                        onClick={() => setSelectedGrievance(null)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-semibold">Category:</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedGrievance.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-semibold">Description:</label>
                      <p className="mt-1 text-sm text-gray-700">{selectedGrievance.description}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-semibold">Status:</label>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(selectedGrievance.status)}
                        {getStatusBadge(selectedGrievance.status)}
                      </div>
                    </div>
                    
                    {/* Responses Thread */}
                    {selectedGrievance.responses.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-semibold">Responses & Updates:</label>
                        <div className="space-y-3 mt-2">
                          {selectedGrievance.responses.map((response) => (
                            <div key={response.id} className={`p-3 rounded-lg ${response.isAdmin ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                              <div className="flex justify-between items-start">
                                <div className="font-medium text-sm">{response.from}</div>
                                <div className="text-xs text-gray-500">{response.timestamp}</div>
                              </div>
                              <p className="text-sm mt-1">{response.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resolution and Feedback */}
                    {selectedGrievance.status === 'Resolved' && selectedGrievance.resolution && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-semibold">Resolution:</label>
                        <p className="text-green-700 bg-green-50 p-3 rounded-lg mt-1">{selectedGrievance.resolution}</p>
                        
                        {selectedGrievance.rating && (
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 font-semibold">Your Rating:</label>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= selectedGrievance.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">({selectedGrievance.rating}/5)</span>
                            </div>
                            {selectedGrievance.feedback && (
                              <p className="text-sm text-gray-600 mt-1">{selectedGrievance.feedback}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-transparent">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Notifications & Responses
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Recent updates and notifications for your grievances
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {grievances.map((grievance) => (
                    <div key={grievance.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{grievance.id}</div>
                        <div className="text-sm text-gray-500">{grievance.dateSubmitted}</div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(grievance.status)}
                        <span className="text-sm">Status updated to: {grievance.status}</span>
                      </div>
                      {grievance.responses.length > 0 && (
                        <div className="text-sm text-gray-600">
                          Latest response from {grievance.responses[grievance.responses.length - 1].from}
                        </div>
                      )}
                      {grievance.status !== 'Resolved' && (
                        <div className="text-xs text-orange-600 mt-2">
                          🕒 SLA: 3 days remaining for resolution
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {grievances.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <p>No notifications yet</p>
                      <p className="text-sm">Notifications will appear here when there are updates to your grievances</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GrievanceModule;