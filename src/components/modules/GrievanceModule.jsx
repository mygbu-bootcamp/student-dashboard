import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useToast } from "../../hooks/use-toast";
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

const GrievanceModule = ({ user }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new");
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
    const variants = {
      'Submitted': 'secondary',
      'Under Review': 'default',
      'Resolved': 'outline',
      'Reopened': 'destructive'
    };
    
    return <Badge variant={variants[status]}>{status}</Badge>;
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
    
    setActiveTab("history");
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            New Grievance
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            History & Status
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* New Grievance Submission */}
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Submit New Grievance
              </CardTitle>
              <CardDescription>
                Please provide detailed information about your concern for faster resolution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Grievance Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description * (Minimum 100 words)</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your grievance in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px]"
                />
                <div className="text-sm text-gray-500">
                  {formData.description.split(' ').filter(word => word.length > 0).length} words
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Input
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
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('attachments')?.click()}
                    >
                      Choose Files
                    </Button>
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: checked }))}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Submit anonymously (Your identity will be hidden from the handler)
                </Label>
              </div>

              {/* Submit Button */}
              <Button onClick={handleSubmitGrievance} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Grievance
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grievance History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Grievance History & Status
              </CardTitle>
              <CardDescription>
                Track the status and progress of your submitted grievances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grievance ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Authority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grievances.map((grievance) => (
                    <TableRow key={grievance.id}>
                      <TableCell className="font-medium">{grievance.id}</TableCell>
                      <TableCell>{grievance.category}</TableCell>
                      <TableCell>{grievance.dateSubmitted}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(grievance.status)}
                          {getStatusBadge(grievance.status)}
                        </div>
                      </TableCell>
                      <TableCell>{grievance.assignedAuthority || 'Pending Assignment'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedGrievance(grievance)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {grievance.status === 'Resolved' && (
                            <Button
                              variant="outline"
                              size="sm"
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
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Reopen
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Grievance Details Modal */}
          {selectedGrievance && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Grievance Details - {selectedGrievance.id}</CardTitle>
                  <Button variant="outline" onClick={() => setSelectedGrievance(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">Category:</Label>
                  <p>{selectedGrievance.category}</p>
                </div>
                <div>
                  <Label className="font-semibold">Description:</Label>
                  <p className="text-gray-700">{selectedGrievance.description}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status:</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedGrievance.status)}
                    {getStatusBadge(selectedGrievance.status)}
                  </div>
                </div>
                
                {/* Responses Thread */}
                {selectedGrievance.responses.length > 0 && (
                  <div>
                    <Label className="font-semibold">Responses & Updates:</Label>
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
                    <Label className="font-semibold">Resolution:</Label>
                    <p className="text-green-700 bg-green-50 p-3 rounded-lg mt-1">{selectedGrievance.resolution}</p>
                    
                    {selectedGrievance.rating && (
                      <div className="mt-3">
                        <Label className="font-semibold">Your Rating:</Label>
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
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Notifications & Responses
              </CardTitle>
              <CardDescription>
                Recent updates and notifications for your grievances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {grievances.map((grievance) => (
                  <div key={grievance.id} className="border rounded-lg p-4">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrievanceModule;