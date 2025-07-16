import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import {
  CreditCard,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Receipt,
  DollarSign,
  Calendar
} from "lucide-react";

const FeesModule = ({ user }) => {
  const currentFees = [
    { category: "Tuition Fee", amount: 85000, paid: 85000, dueDate: "2024-01-15", status: "Paid" },
    { category: "Hostel Fee", amount: 25000, paid: 25000, dueDate: "2024-01-20", status: "Paid" },
    { category: "Mess Fee", amount: 18000, paid: 12000, dueDate: "2024-02-01", status: "Partial" },
    { category: "Library Fee", amount: 2000, paid: 0, dueDate: "2024-02-10", status: "Pending" },
    { category: "Lab Fee", amount: 8000, paid: 8000, dueDate: "2024-01-30", status: "Paid" }
  ];

  const paymentHistory = [
    { date: "2024-01-15", description: "Tuition Fee - Semester 7", amount: 85000, method: "UPI", receipt: "REC001" },
    { date: "2024-01-20", description: "Hostel Fee - Semester 7", amount: 25000, method: "Net Banking", receipt: "REC002" },
    { date: "2024-01-25", description: "Mess Fee - Partial Payment", amount: 12000, method: "UPI", receipt: "REC003" },
    { date: "2024-01-30", description: "Lab Fee - Semester 7", amount: 8000, method: "Card", receipt: "REC004" }
  ];

  const feeStructure = [
    { item: "Tuition Fee", amount: 85000, description: "Academic charges for semester" },
    { item: "Development Fee", amount: 5000, description: "Infrastructure development" },
    { item: "Library Fee", amount: 2000, description: "Library services and books" },
    { item: "Lab Fee", amount: 8000, description: "Laboratory equipment and materials" },
    { item: "Sports Fee", amount: 1500, description: "Sports facilities and equipment" },
    { item: "Medical Fee", amount: 1000, description: "Health center services" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Partial": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-red-100 text-red-800";
      case "Overdue": return "bg-red-200 text-red-900";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = currentFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = currentFees.reduce((sum, fee) => sum + fee.paid, 0);
  const pendingAmount = totalAmount - totalPaid;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600">Manage your payments and track fee status</p>
        </div>
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </Button>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Fee</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payment Progress</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round((totalPaid/totalAmount)*100)}%</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Alert */}
      {pendingAmount > 0 && (
        <Alert className="border border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Payment Due:</strong> You have ₹{pendingAmount.toLocaleString()} pending. 
            Please complete your payment to avoid registration blocks.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Semester Fees */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5 text-blue-500" />
              Current Semester Fees
            </CardTitle>
            <CardDescription>Semester 7 - Academic Year 2023-24</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentFees.map((fee, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{fee.category}</h3>
                    <Badge className={getStatusColor(fee.status)}>
                      {fee.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Amount: ₹{fee.amount.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">Paid: ₹{fee.paid.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(fee.paid / fee.amount) * 100} 
                    className="h-2 mb-2"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Due: {fee.dueDate}</span>
                    {fee.status !== "Paid" && (
                      <Button size="sm" className="ml-2">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-green-500" />
              Recent Payments
            </CardTitle>
            <CardDescription>Your payment transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{payment.description}</p>
                    <p className="text-xs text-gray-600">{payment.date} • {payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      {payment.receipt}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Structure - Semester 7</CardTitle>
          <CardDescription>Detailed breakdown of semester charges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feeStructure.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{item.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Semester Fee:</span>
                <span className="font-bold text-xl text-blue-600">₹{feeStructure.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
              <div className="text-center">
                <CreditCard className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="font-medium">UPI Payment</p>
                <p className="text-sm text-gray-600">Pay via UPI apps</p>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
              <div className="text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="font-medium">Net Banking</p>
                <p className="text-sm text-gray-600">Direct bank transfer</p>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-center p-4 h-auto">
              <div className="text-center">
                <Receipt className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="font-medium">Offline Payment</p>
                <p className="text-sm text-gray-600">Pay at university counter</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeesModule;