import { useState, useEffect, useRef } from "react"; // Import useRef
import { AlertTriangle, MapPin } from "lucide-react";

const SOSAlert = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Ref to hold the timeout ID for the document click listener
  const clickListenerTimeoutRef = useRef(null);

  const emergencyContacts = [
    { id: 1, name: "Campus Security", phone: "+91-9876543210", type: "Security", priority: 1 },
    { id: 2, name: "Dr. Priya Sharma (Mentor)", phone: "+91-9876543211", type: "Mentor", priority: 2 },
    { id: 3, name: "Hostel Warden", phone: "+91-9876543212", type: "Warden", priority: 3 },
    { id: 4, name: "Emergency Services", phone: "112", type: "Emergency", priority: 1 }
  ];

  const showToastMessage = (message, isError = false) => {
    setToastMessage(message);
    setShowToast(true);
    // The automatic timeout for the toast will still apply
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleSOSActivate = () => {
    setIsSOSActive(true);
    setShowSOSDialog(false);

    // Mock GPS location
    const mockLocation = "Block A, GBU Campus, Greater Noida";

    // Auto-deactivate after 5 minutes (for demo)
    setTimeout(() => {
      setIsSOSActive(false);
      showToastMessage("SOS Alert Deactivated - Emergency alert has been automatically deactivated.");
    }, 300000); // 300000 milliseconds = 5 minutes
  };

  const handleSOSCancel = () => {
    if (isSOSActive) {
      setIsSOSActive(false);
      showToastMessage("SOS Alert Cancelled - Emergency alert has been cancelled successfully.");
    }
    setShowSOSDialog(false);
  };

  // Handler to close dialog when clicking outside the card
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSOSDialog(false);
    }
  };

  // useEffect to handle toast closure on outside click
  useEffect(() => {
    const handleDocumentClick = () => {
      // Only close if the toast is currently visible
      if (showToast) {
        setShowToast(false);
      }
    };

    if (showToast) {
      // Clear any existing timeout to prevent multiple listeners
      if (clickListenerTimeoutRef.current) {
        clearTimeout(clickListenerTimeoutRef.current);
      }

      // Attach the listener with a small delay to prevent immediate closure
      // due to the same click that opened it.
      clickListenerTimeoutRef.current = setTimeout(() => {
        document.addEventListener("click", handleDocumentClick);
      }, 0); // A timeout of 0ms defers the execution to the next event loop tick
    }

    // Cleanup function
    return () => {
      // Clear the timeout if it hasn't fired yet
      if (clickListenerTimeoutRef.current) {
        clearTimeout(clickListenerTimeoutRef.current);
      }
      // Remove the event listener
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showToast]); // Dependency array: re-run effect when showToast changes

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {toastMessage.split(' - ')[0]}
                </p>
                <p className="text-sm text-gray-500">
                  {toastMessage.split(' - ')[1] || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOS Button - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className={`rounded-full w-16 h-16 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer
            ${isSOSActive
              ? "bg-red-600 hover:bg-red-700 animate-ping-strong"
              : "bg-red-500 hover:bg-red-600 animate-pulse-slow"
            }
            hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
          onClick={() => setShowSOSDialog(true)}
        >
          <AlertTriangle className="h-10 w-10 text-white" />
        </button>
      </div>

      {/* SOS Dialog */}
      {showSOSDialog && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="p-6 pb-4 text-center">
              <div className="flex items-center justify-center text-red-600 mb-2">
                <AlertTriangle className="mr-2 h-6 w-6" />
                <h2 className="text-xl font-semibold">Emergency SOS Alert</h2>
              </div>
              <p className="text-gray-600 text-sm">
                This will immediately notify your emergency contacts and campus security.
              </p>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 space-y-4">
              {/* Emergency Type Selection */}
              <div>
                <label htmlFor="emergency-type" className="text-sm font-medium mb-2 block">Emergency Type:</label>
                <select id="emergency-type" className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer">
                  <option>Medical Emergency</option>
                  <option>Security Threat</option>
                  <option>Fire Emergency</option>
                  <option>Natural Disaster</option>
                  <option>Personal Safety</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="additional-message" className="text-sm font-medium mb-2 block">Additional Message (Optional):</label>
                <textarea
                  id="additional-message"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none cursor-text"
                  rows={3}
                  placeholder="Describe the emergency situation..."
                />
              </div>

              {/* Location Info */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Your Location:</span>
                </div>
                <p className="text-sm text-gray-600">Block A, GBU Campus, Greater Noida</p>
                <p className="text-xs text-gray-500">GPS coordinates will be shared automatically</p>
              </div>

              {/* Emergency Contacts Preview */}
              <div>
                <p className="text-sm font-medium mb-2">Will notify:</p>
                <div className="space-y-1">
                  {emergencyContacts.slice(0, 3).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between text-sm">
                      <span>{contact.name}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs border">
                        {contact.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Warning:</strong> False emergency alerts may result in disciplinary action and fine deduction from GBU Wallet.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer
                              hover:shadow-md hover:scale-102 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  onClick={handleSOSCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out flex items-center justify-center cursor-pointer
                              hover:shadow-lg hover:scale-102 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={handleSOSActivate}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Send SOS Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active SOS Status */}
      {isSOSActive && (
        <div className="fixed top-4 left-4 right-4 z-40">
          <div className="bg-red-50 border border-red-500 rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
                  <div>
                    <p className="font-medium text-red-800">SOS Alert Active</p>
                    <p className="text-sm text-red-600">Emergency contacts have been notified</p>
                  </div>
                </div>
                <button
                  className="px-3 py-1 text-sm border border-red-300 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer
                              hover:shadow-md hover:scale-102 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
                  onClick={handleSOSCancel}
                >
                  Cancel Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSAlert;