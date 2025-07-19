import React, { useState } from 'react';
import {
  Book,
  Search,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  User,
  XCircle // Added for clear search icon
} from "lucide-react";
import StatsCard from '../components/Statscard'; 

// Custom Card Component
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl border border-gray-200  hover:shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-6 pb-2 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-600 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-4 ${className}`}>
    {children}
  </div>
);

// Custom Badge Component
const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// Custom Button Component
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  // Added transition-all duration-200 ease-in-out for scale and shadow animation
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case 'outline':
      variantClasses = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:scale-[1.02] hover:shadow-sm";
      break;
    case 'black': // Custom variant for black button
      variantClasses = "bg-black text-white hover:bg-black/70 hover:scale-[1.02] hover:shadow-md";
      break;
    default:
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] hover:shadow-md";
      break;
  }

  switch (size) {
    case 'sm':
      sizeClasses = "h-8 px-3 py-1";
      break;
    case 'lg':
      sizeClasses = "h-12 px-6 py-3";
      break;
    case 'icon':
      sizeClasses = "h-10 w-10";
      break;
    default:
      sizeClasses = "h-10 px-4 py-2";
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Custom Alert Component
const Alert = ({ children, className }) => (
  <div className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 - hover:shadow-md ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children, className }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
    {children}
  </div>
);

// Custom Input Component
const Input = ({ className, type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const LibraryModule = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter books based on search query
  const filterBooks = (books, query) => {
    if (!query) {
      return books;
    }
    const lowerCaseQuery = query.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const filteredIssuedBooks = filterBooks(issuedBooks, searchQuery);
  const filteredReservedBooks = filterBooks(reservedBooks, searchQuery);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

      {/* Library Summary using StatsCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Books Issued"
          value={issuedBooks.length}
          icon={Book}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Books Reserved"
          value={reservedBooks.length}
          icon={Clock}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatsCard
          title="Overdue Books"
          value={overdueBooks.length}
          icon={AlertTriangle}
          color="text-red-600"
          bgColor="bg-red-100"
        />
        <StatsCard
          title="Total Fines"
          value={`₹${fines.reduce((sum, fine) => sum + fine.amount, 0)}`}
          icon={Calendar}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="flex items-center justify-center"
              >
                <XCircle className="h-4 w-4 text-gray-500" />
              </Button>
            )}
            <Button variant="black" className="flex items-center">
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
              {filteredIssuedBooks.length > 0 ? (
                filteredIssuedBooks.map((book, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4  hover:shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
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
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No issued books found matching your search.</p>
              )}
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
              {filteredReservedBooks.length > 0 ? (
                filteredReservedBooks.map((book, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
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
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No reserved books found matching your search.</p>
              )}
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
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg  hover:shadow-sm">
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-sm text-gray-600">{resource.type}</p>
                </div>
                <div className="text-left sm:text-right flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Badge className={resource.access === "Full Access" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {resource.access}
                  </Badge>
                  <Button size="sm" variant="outline">
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
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm">
                  <div className="flex-1 mb-2 sm:mb-0">
                    <p className="font-medium text-sm">{fine.book}</p>
                    <p className="text-xs text-gray-600">{fine.days} days overdue</p>
                  </div>
                  <div className="text-left sm:text-right flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <p className="font-bold text-red-600">₹{fine.amount}</p>
                    <Badge className={getStatusColor(fine.status)}>
                      {fine.status}
                    </Badge>
                    {fine.status === "Pending" && (
                      <Button size="sm" variant="black">
                        Pay Fine
                      </Button>
                    )}
                  </div>
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
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto hover:scale-[1.02] hover:border-blue-500">
              <div className="text-center">
                <Book className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="font-medium">Request New Book</p>
                <p className="text-sm text-gray-600">Suggest books for library</p>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto hover:scale-[1.02] hover:border-green-500">
              <div className="text-center">
                <User className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="font-medium">Inter-Library Loan</p>
                <p className="text-sm text-gray-600">Borrow from other libraries</p>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto hover:scale-[1.02] hover:border-purple-500">
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