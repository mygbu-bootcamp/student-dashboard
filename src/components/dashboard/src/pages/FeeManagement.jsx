import React, { useState } from "react";
import { 
  Download, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wallet, 
  Building2, 
  Smartphone, 
  Globe,
  Calendar,
  Receipt,
  TrendingUp,
  PieChart,
  DollarSign,
  ArrowRight,
  Bell,
  Eye,
  Filter
} from "lucide-react";

const FeeManagement = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayNow = (fee) => {
    setSelectedPayment(fee);
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-gray-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
              <p className="text-gray-600 text-sm">Manage your payments and track fee status</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Download size={16} />
              Download Statement
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">+5.2%</span>
            </div>
            <p className="text-gray-600 text-sm">Total Fee</p>
            <p className="text-2xl font-bold text-blue-600">₹1,38,000</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">94.2%</span>
            </div>
            <p className="text-gray-600 text-sm">Amount Paid</p>
            <p className="text-2xl font-bold text-green-600">₹1,30,000</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-red-600">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">2 payments</span>
            </div>
            <p className="text-gray-600 text-sm">Pending Amount</p>
            <p className="text-2xl font-bold text-red-600">₹8,000</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">On track</span>
            </div>
            <p className="text-gray-600 text-sm">Payment Progress</p>
            <p className="text-2xl font-bold text-purple-600">94%</p>
          </div>
        </div>

        {/* Payment Alert */}
        <div className="mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <span className="font-medium text-orange-800">Payment Due: </span>
              <span className="text-orange-700">You have ₹8,000 pending. Please complete your payment to avoid registration blocks.</span>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">
              Pay Now
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Current Semester Fees */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Current Semester Fees</h2>
                </div>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Semester 7 - Academic Year 2023-24
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {[
                { label: "Tuition Fee", amount: 85000, paid: 85000, status: "Paid", dueDate: "2024-01-15" },
                { label: "Hostel Fee", amount: 25000, paid: 25000, status: "Paid", dueDate: "2024-01-20" },
                { label: "Mess Fee", amount: 12000, paid: 4000, status: "Partial", dueDate: "2024-01-25" },
                { label: "Library Fee", amount: 2000, paid: 0, status: "Pending", dueDate: "2024-01-30" },
                { label: "Lab Fee", amount: 8000, paid: 8000, status: "Paid", dueDate: "2024-01-15" }
              ].map((fee, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{fee.label}</h4>
                      <p className="text-sm text-gray-600">Amount: ₹{fee.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Due: {fee.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        fee.status === "Paid" ? "bg-green-100 text-green-800" :
                        fee.status === "Partial" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {fee.status}
                      </span>
                    </div>
                  </div>
                  {fee.status === "Paid" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-full"></div>
                    </div>
                  )}
                  {fee.status === "Partial" && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-600 h-2 rounded-full" 
                          style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">Paid: ₹{fee.paid.toLocaleString()}</p>
                    </div>
                  )}
                  {fee.status === "Pending" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full w-0"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
                </div>
                <p className="text-sm text-gray-600">Your payment transaction history</p>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {[
                { desc: "Tuition Fee - Semester 7", date: "2024-01-15", method: "UPI", amount: "₹85,000", receiptId: "REC001" },
                { desc: "Hostel Fee - Semester 7", date: "2024-01-20", method: "Net Banking", amount: "₹25,000", receiptId: "REC002" },
                { desc: "Mess Fee - Partial Payment", date: "2024-01-25", method: "UPI", amount: "₹12,000", receiptId: "REC003" }
              ].map((payment, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{payment.desc}</p>
                    <p className="text-sm text-gray-600">{payment.date} • {payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{payment.amount}</p>
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                      <Download size={12} />
                      {payment.receiptId}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Structure Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Fee Structure - Semester 7</h2>
              <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                Detailed breakdown of semester charges
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {[
                { item: "Tuition Fee", description: "Academic charges for semester", value: 85000 },
                { item: "Development Fee", description: "Infrastructure development", value: 5000 },
                { item: "Library Fee", description: "Library services and books", value: 2000 },
                { item: "Lab Fee", description: "Laboratory equipment and materials", value: 8000 },
                { item: "Sports Fee", description: "Sports facilities and equipment", value: 1500 },
                { item: "Medical Fee", description: "Health center services", value: 1000 }
              ].map((fee, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{fee.item}</p>
                    <p className="text-sm text-gray-600">{fee.description}</p>
                  </div>
                  <p className="font-semibold text-gray-900">₹{fee.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Semester Fee:</span>
                <span className="text-xl font-bold text-blue-600">₹1,02,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment Options</h2>
            <p className="text-sm text-gray-600">Choose your preferred payment method</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "UPI Payment",
                  description: "Pay via UPI apps",
                  icon: Smartphone,
                  color: "text-blue-600"
                },
                {
                  title: "Net Banking",
                  description: "Direct bank transfer",
                  icon: Building2,
                  color: "text-green-600"
                },
                {
                  title: "Offline Payment",
                  description: "Pay at university counter",
                  icon: Globe,
                  color: "text-purple-600"
                }
              ].map((option, index) => (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:border-gray-300">
                  <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center ${option.color}`}>
                    <option.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Confirmation</h3>
              <p className="text-gray-600">Complete your payment securely</p>
            </div>
            
            {selectedPayment && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-medium text-gray-900">{selectedPayment.label}</p>
                <p className="text-xl font-bold text-blue-600 mt-1">₹{selectedPayment.amount.toLocaleString()}</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;