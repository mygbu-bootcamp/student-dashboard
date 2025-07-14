import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Input } from "../components/ui/input";
import {
  Book,
  Search,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  User
} from "lucide-react";

const LibraryModule = ({ user }) => {
  const issuedBooks = [
    { title: "Data Structures and Algorithms", author: "Thomas Cormen", issueDate: "2024-01-10", dueDate: "2024-02-10", status: "Active", renewals: 1 },
    { title: "Machine Learning Yearning", author: "Andrew Ng", issueDate: "2024-01-15", dueDate: "2024-02-15", status: "Active", renewals: 0 },
    { title: "Clean Code", author: "Robert Martin", issueDate: "2024-01-05", dueDate: "2024-02-05", status: "Overdue", renewals: 2 },
    { title: "System Design Interview", author: "Alex Xu", issueDate: "2024-01-20", dueDate: "2024-02-20", status: "Active", renewals: 0 }
  ];

  const reservedBooks = [
    { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", position: 2, estimatedDate: "2024-03-01" },
    { title: "Design Patterns", author: "Gang of Four", position: 1, estimatedDate: "2024-02-25" }
  ];

  const digitalResources = [
    { title: "IEEE Xplore Digital Library", type: "Database", access: "Full Access" },
    { title: "ACM Digital Library", type: "Database", access: "Full Access" },
    { title: "Springer eBooks", type: "eBooks", access: "Limited" },
    { title: "O'Reilly Learning Platform", type: "Platform", access: "Full Access" }
  ];

  const fines = [
    { book: "Clean Code", days: 5, amount: 50, status: "Pending" },
    { book: "Introduction to Algorithms", days: 2, amount: 20, status: "Paid" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Overdue": return "bg-red-100 text-red-800";
      case "Reserved": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Paid": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const overdueBooks = issuedBooks.filter(book => book.status === "Overdue");
  const activeBooks = issuedBooks.filter(book => book.status === "Active");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library Services</h1>
          <p className="text-gray-600">Manage your books, access digital resources, and track fines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Library Card
          </Button>
        </div>
      </div>

      {/* Library Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Books Issued</p>
                <p className="text-2xl font-bold text-blue-600">{issuedBooks.length}</p>
              </div>
              <Book className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Books Reserved</p>
                <p className="text-2xl font-bold text-purple-600">{reservedBooks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Books</p>
                <p className="text-2xl font-bold text-red-600">{overdueBooks.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Fines</p>
                <p className="text-2xl font-bold text-orange-600">₹{fines.reduce((sum, fine) => sum + fine.amount, 0)}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {overdueBooks.length > 0 && (
        <Alert className="border border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Overdue Alert:</strong> You have {overdueBooks.length} overdue book(s). 
            Please return them immediately to avoid additional fines.
          </AlertDescription>
        </Alert>
      )}

      {/* Book Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-blue-500" />
            Search Library Catalog
          </CardTitle>
          <CardDescription>Find books, journals, and digital resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Search by title, author, or ISBN..." 
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issued Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-green-500" />
              Currently Issued Books
            </CardTitle>
            <CardDescription>Books currently in your possession</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issuedBooks.map((book, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{book.title}</h3>
                    <Badge className={getStatusColor(book.status)}>
                      {book.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <div className="text-xs text-gray-500 space-y-1 mb-3">
                    <p>📅 Issued: {book.issueDate}</p>
                    <p>⏰ Due: {book.dueDate}</p>
                    <p>🔄 Renewals: {book.renewals}/3</p>
                  </div>
                  <div className="flex gap-2">
                    {book.renewals < 3 && book.status === "Active" && (
                      <Button size="sm" variant="outline">
                        Renew
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Return
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reserved Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-purple-500" />
              Reserved Books
            </CardTitle>
            <CardDescription>Books waiting for you in the queue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservedBooks.map((book, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{book.title}</h3>
                    <Badge className="bg-purple-100 text-purple-800">
                      Position #{book.position}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <div className="text-xs text-gray-500 mb-3">
                    <p>📅 Estimated availability: {book.estimatedDate}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Cancel Reservation
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Digital Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Resources</CardTitle>
          <CardDescription>Access online databases, eBooks, and learning platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {digitalResources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-sm text-gray-600">{resource.type}</p>
                </div>
                <div className="text-right">
                  <Badge className={resource.access === "Full Access" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {resource.access}
                  </Badge>
                  <Button size="sm" variant="outline" className="mt-2 ml-2">
                    Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fines & Penalties */}
      {fines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
              Fines & Penalties
            </CardTitle>
            <CardDescription>Outstanding and paid fines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fines.map((fine, index) => (
                <div key={index} className="flex items-center justify-between p-3  border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{fine.book}</p>
                    <p className="text-xs text-gray-600">{fine.days} days overdue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">₹{fine.amount}</p>
                    <Badge className={getStatusColor(fine.status)}>
                      {fine.status}
                    </Badge>
                  </div>
                  {fine.status === "Pending" && (
                    <Button size="sm" className="ml-2">
                      Pay Fine
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common library services and requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
              <div className="text-center">
                <Book className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="font-medium">Request New Book</p>
                <p className="text-sm text-gray-600">Suggest books for library</p>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
              <div className="text-center">
                <User className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="font-medium">Inter-Library Loan</p>
                <p className="text-sm text-gray-600">Borrow from other libraries</p>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="font-medium">Study Room Booking</p>
                <p className="text-sm text-gray-600">Reserve group study spaces</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryModule;