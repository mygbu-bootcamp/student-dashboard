import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Upload,
  Search,
  Filter
} from "lucide-react";

const DocumentVaultModule = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock document data
  const documents = [
    {
      id: 1,
      name: "Student ID Card",
      type: "Identity",
      uploadDate: "2024-01-15",
      expiryDate: "2026-01-15",
      status: "Active",
      fileSize: "2.3 MB",
      format: "PDF",
      verified: true,
      downloadable: true
    },
    {
      id: 2,
      name: "Semester 1 Admit Card",
      type: "Examination",
      uploadDate: "2024-03-01",
      expiryDate: null,
      status: "Active",
      fileSize: "1.8 MB",
      format: "PDF",
      verified: true,
      downloadable: true
    },
    {
      id: 3,
      name: "Bonafide Certificate",
      type: "Academic",
      uploadDate: "2024-02-20",
      expiryDate: "2024-08-20",
      status: "Expiring Soon",
      fileSize: "1.2 MB",
      format: "PDF",
      verified: true,
      downloadable: true
    },
    {
      id: 4,
      name: "Semester 1 Marksheet",
      type: "Academic",
      uploadDate: "2024-02-01",
      expiryDate: null,
      status: "Active",
      fileSize: "956 KB",
      format: "PDF",
      verified: true,
      downloadable: true
    },
    {
      id: 5,
      name: "Library Card",
      type: "Services",
      uploadDate: "2024-01-10",
      expiryDate: "2024-12-31",
      status: "Active",
      fileSize: "1.5 MB",
      format: "PDF",
      verified: true,
      downloadable: true
    },
    {
      id: 6,
      name: "Fee Receipt - Semester 2",
      type: "Financial",
      uploadDate: "2024-03-15",
      expiryDate: null,
      status: "Active",
      fileSize: "800 KB",
      format: "PDF",
      verified: true,
      downloadable: true
    }
  ];

  const documentTypes = ["All", "Identity", "Academic", "Examination", "Financial", "Services"];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "default";
      case "Expiring Soon": return "secondary";
      case "Expired": return "destructive";
      default: return "outline";
    }
  };

  const getExpiryWarning = (expiryDate) => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
      return `Expires in ${daysUntilExpiry} days`;
    } else if (daysUntilExpiry <= 0) {
      return "Expired";
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Document Vault</h1>
        <p className="text-gray-100">Securely store and manage all your academic documents</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {documentTypes.map((type, index) => (
          <Button key={index} variant="outline" className="h-auto p-4">
            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium">{type}</p>
              <p className="text-xs text-gray-500">
                {type === "All" ? documents.length : documents.filter(d => d.type === type).length} docs
              </p>
            </div>
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => {
          const expiryWarning = getExpiryWarning(doc.expiryDate);
          
          return (
            <Card key={doc.id} className={`${expiryWarning === "Expired" ? 'border-red-200 bg-red-50' : expiryWarning ? 'border-yellow-200 bg-yellow-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <Badge variant={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{doc.name}</CardTitle>
                <CardDescription>{doc.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Format</p>
                    <p className="font-medium">{doc.format}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-medium">{doc.fileSize}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Uploaded</p>
                    <p className="font-medium">{doc.uploadDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <div className="flex items-center">
                      {doc.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                      )}
                      <span className="text-sm">{doc.verified ? "Verified" : "Pending"}</span>
                    </div>
                  </div>
                </div>

                {expiryWarning && (
                  <div className={`p-2 rounded-lg flex items-center ${
                    expiryWarning === "Expired" 
                      ? "bg-red-100 text-red-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{expiryWarning}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upload New Document */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5 text-blue-500" />
            Request New Document
          </CardTitle>
          <CardDescription>Request admin to upload additional documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document Type</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg">
                <option>Select document type</option>
                <option>Transcript</option>
                <option>Character Certificate</option>
                <option>Migration Certificate</option>
                <option>Course Completion Certificate</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <textarea 
                className="w-full p-2 border border-gray-200 rounded-lg" 
                rows={3}
                placeholder="Provide any additional information about the document request..."
              />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Submit Document Request
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVaultModule;