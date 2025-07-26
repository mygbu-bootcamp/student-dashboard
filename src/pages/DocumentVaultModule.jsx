import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Upload,
  Search,
  Filter,
} from "lucide-react";

// Custom Card Component
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

// Custom Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default: "bg-blue-500 text-white active:bg-blue-800 hover:scale-105 hover:shadow-lg",
    destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 hover:scale-105 hover:shadow-lg",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 hover:scale-105 hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 hover:scale-105 hover:shadow-lg",
    ghost: "hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 hover:scale-105 hover:shadow-lg",
    link: "text-blue-600 underline-offset-4 hover:underline active:text-blue-800",
  };

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    default: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
    destructive: "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
    outline: "text-gray-800 border-gray-200",
    secondary: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Custom Input Component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// DocumentVaultModule Component
const DocumentVaultModule = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDocumentType, setActiveDocumentType] = useState("All");

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
      downloadable: true,
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
      downloadable: true,
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
      downloadable: true,
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
      downloadable: true,
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
      downloadable: true,
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
      downloadable: true,
    },
  ];

  const documentTypes = ["All", "Identity", "Academic", "Examination", "Financial", "Services"];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearchTerm =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDocumentType = activeDocumentType === "All" || doc.type === activeDocumentType;
    return matchesSearchTerm && matchesDocumentType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expiring Soon":
        return "secondary";
      case "Expired":
        return "destructive";
      default:
        return "outline";
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
      <div className="bg-gradient-to-r from-gray-700 to-gray-300 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Document Vault</h1>
        <p className="text-gray-100">Securely store and manage all your academic documents</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4 h-18">
          <div className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h- w-3 sm:h-4 sm:w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 sm:pl-10 text-xs sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black  focus:border-black"
                />
              </div>
              <div className="flex gap-1 sm:gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
        {documentTypes.map((type, index) => (
          <Button
            key={index}
            variant={activeDocumentType === type ? "default" : "outline"}
            className={`h-auto p-4 ${
              activeDocumentType === type ? "hover:bg-blue active:bg-blue-500" : ""
            }`}
            onClick={() => setActiveDocumentType(type)}
          >
            <div className="text-center">
              <FileText
                className={`h-6 w-6 mx-auto mb-2 ${
                  activeDocumentType === type ? "text-white" : "text-blue-500"
                }`}
              />
              <p className="text-sm text-v font-medium">{type}</p>
              <p className="text-xs text-white">
                {type === "All" ? documents.length : documents.filter((d) => d.type === type).length}{" "}
                docs
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
            <Card
              key={doc.id}
              className={`flex flex-col ${
                expiryWarning === "Expired"
                  ? "border-red-200 bg-red-50"
                  : expiryWarning
                  ? "border-yellow-200 bg-yellow-50"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                </div>
                <CardTitle className="text-lg">{doc.name}</CardTitle>
                <CardDescription>{doc.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
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
                  <div
                    className={`p-2 rounded-lg flex items-center ${
                      expiryWarning === "Expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{expiryWarning}</span>
                  </div>
                )}
              </CardContent>
              <div className="p-6 pt-0 mt-auto"> {/* Added mt-auto here */}
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
              </div>
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
              <label htmlFor="document-type" className="block text-sm font-medium mb-2">
                Document Type
              </label>
              <select
                id="document-type"
                className="block w-full p-2 border border-gray-200 rounded-lg"
              >
                {" "}
                {/* Added 'block' and ensured full border */}
                <option>Select document type</option>
                <option>Transcript</option>
                <option>Character Certificate</option>
                <option>Migration Certificate</option>
                <option>Course Completion Certificate</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-2">
                Priority
              </label>
              <select
                id="priority"
                className="block w-full p-2 border border-gray-200 rounded-lg"
              >
                {" "}
                {/* Added 'block' and ensured full border */}
                <option >Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="additional-notes" className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                id="additional-notes"
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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