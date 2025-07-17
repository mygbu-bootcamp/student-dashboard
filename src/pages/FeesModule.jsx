import {
  CreditCard, Download, CheckCircle, Clock,
  AlertTriangle, Receipt, DollarSign
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
        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download Statement
        </button>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Fee", amount: totalAmount, color: "text-blue-600", icon: <DollarSign className="h-8 w-8 text-blue-500" /> },
          { label: "Amount Paid", amount: totalPaid, color: "text-green-600", icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
          { label: "Pending Amount", amount: pendingAmount, color: "text-red-600", icon: <Clock className="h-8 w-8 text-red-500" /> },
          { label: "Payment Progress", amount: Math.round((totalPaid / totalAmount) * 100) + "%", color: "text-purple-600", icon: <CreditCard className="h-8 w-8 text-purple-500" /> }
        ].map(({ label, amount, color, icon }, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-md p-4 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{typeof amount === 'number' ? `₹${amount.toLocaleString()}` : amount}</p>
              </div>
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* Alert */}
      {pendingAmount > 0 && (
        <div className="flex items-start p-4 border border-orange-200 bg-orange-50 rounded-md transition-all duration-200 ease-in-out hover:shadow-md">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-1 mr-3" />
          <p className="text-sm text-orange-800">
            <strong>Payment Due:</strong> You have ₹{pendingAmount.toLocaleString()} pending.
            Please complete your payment to avoid registration blocks.
          </p>
        </div>
      )}

      {/* Fee Structure */}
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="border-b border-transparent p-4">
          <h2 className="text-lg font-semibold">Fee Structure - Semester 7</h2>
          <p className="text-sm text-gray-500">Detailed breakdown of semester charges</p>
        </div>
        <div className="p-4 space-y-3">
          {feeStructure.map((item, index) => (
            <div key={index} className="flex justify-between items-start border border-gray-200 rounded-lg p-3 transition-all duration-200 ease-in-out hover:shadow-sm cursor-default">
              <div>
                <p className="font-medium">{item.item}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <p className="font-bold">₹{item.amount.toLocaleString()}</p>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
            <span className="font-bold text-lg">Total Semester Fee:</span>
            <span className="font-bold text-xl text-blue-600">
              ₹{feeStructure.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Semester Fees */}
        <div className="bg-white border border-gray-200 rounded-md">
          <div className="border-b border-transparent p-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Receipt className="h-5 w-5 text-blue-500 mr-2" />
              Current Semester Fees
            </h2>
            <p className="text-sm text-gray-500">Semester 7 - Academic Year 2023-24</p>
          </div>
          <div className="p-4 space-y-4">
            {currentFees.map((fee, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 transition-all duration-200 ease-in-out hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{fee.category}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(fee.status)}`}>
                    {fee.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Amount: ₹{fee.amount.toLocaleString()}</span>
                  <span>Paid: ₹{fee.paid.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Due: {fee.dueDate}</span>
                  {fee.status !== "Paid" && (
                    <button className="ml-2 px-2 py-1 text-sm border border-gray-200 rounded-md bg-black text-white hover:bg-gray-700 transition-all duration-200 ease-in-out cursor-pointer">Pay Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white border border-gray-200 rounded-md">
          <div className="border-b border-transparent p-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              Recent Payments
            </h2>
            <p className="text-sm text-gray-500">Your payment transaction history</p>
          </div>
          <div className="p-4 space-y-3">
            {paymentHistory.map((p, index) => (
              <div key={index} className="flex items-center justify-between border border-gray-200 p-3 rounded-lg transition-all duration-200 ease-in-out hover:shadow-sm">
                <div>
                  <p className="text-sm font-medium">{p.description}</p>
                  <p className="text-xs text-gray-500">{p.date} • {p.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-sm">₹{p.amount.toLocaleString()}</p>
                  <button className="text-xs text-blue-600 flex items-center hover:underline mt-1 cursor-pointer">
                    <Download className="h-3 w-3 mr-1" /> {p.receipt}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="border-b border-transparent p-4">
          <h2 className="text-lg font-semibold">Payment Options</h2>
          <p className="text-sm text-gray-500">Choose your preferred payment method</p>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <CreditCard className="h-6 w-6 mx-auto mb-2 text-blue-500" />, title: "UPI Payment", desc: "Pay via UPI apps" },
            { icon: <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />, title: "Net Banking", desc: "Direct bank transfer" },
            { icon: <Receipt className="h-6 w-6 mx-auto mb-2 text-purple-500" />, title: "Offline Payment", desc: "Pay at university counter" }
          ].map((option, index) => (
            <button key={index} className="w-full border border-gray-200 rounded-md p-4 text-center hover:shadow transition-all duration-200 ease-in-out hover:scale-[1.02] cursor-pointer">
              {option.icon}
              <p className="font-medium">{option.title}</p>
              <p className="text-sm text-gray-600">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeesModule;