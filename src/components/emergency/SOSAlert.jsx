
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useToast } from "../../hooks/use-toast";
import { AlertTriangle, Phone, Users, Settings, MapPin } from "lucide-react";

const SOSAlert = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const { toast } = useToast();

  const emergencyContacts = [
    { id: 1, name: "Campus Security", phone: "+91-9876543210", type: "Security", priority: 1 },
    { id: 2, name: "Dr. Priya Sharma (Mentor)", phone: "+91-9876543211", type: "Mentor", priority: 2 },
    { id: 3, name: "Hostel Warden", phone: "+91-9876543212", type: "Warden", priority: 3 },
    { id: 4, name: "Emergency Services", phone: "112", type: "Emergency", priority: 1 }
  ];

  const handleSOSActivate = () => {
    setIsSOSActive(true);
    setShowSOSDialog(false);
    
    // Mock GPS location
    const mockLocation = "Block A, GBU Campus, Greater Noida";
    
    toast({
      title: "🚨 SOS Alert Activated",
      description: `Emergency alert sent to all contacts. Location: ${mockLocation}`,
      variant: "destructive"
    });

    // Auto-deactivate after 5 minutes (for demo)
    setTimeout(() => {
      setIsSOSActive(false);
      toast({
        title: "SOS Alert Deactivated",
        description: "Emergency alert has been automatically deactivated."
      });
    }, 300000);
  };

  const handleSOSCancel = () => {
    if (isSOSActive) {
      setIsSOSActive(false);
      toast({
        title: "SOS Alert Cancelled",
        description: "Emergency alert has been cancelled successfully."
      });
    }
    setShowSOSDialog(false);
  };

  return (
    <>
      {/* SOS Button - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          variant={isSOSActive ? "destructive" : "default"}
          className={`rounded-full w-16 h-16 shadow-lg ${
            isSOSActive 
              ? "bg-red-600 hover:bg-red-700 animate-pulse" 
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={() => setShowSOSDialog(true)}
        >
          <AlertTriangle className="h-8 w-8" />
        </Button>
      </div>

      {/* SOS Dialog */}
      {showSOSDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-red-600">
                <AlertTriangle className="mr-2 h-6 w-6" />
                Emergency SOS Alert
              </CardTitle>
              <CardDescription>
                This will immediately notify your emergency contacts and campus security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Emergency Type Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Type:</label>
                <select className="w-full p-2 border rounded-lg">
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
                <label className="text-sm font-medium mb-2 block">Additional Message (Optional):</label>
                <textarea 
                  className="w-full p-2 border rounded-lg" 
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
                      <Badge variant="outline">{contact.type}</Badge>
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
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleSOSCancel}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={handleSOSActivate}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Send SOS Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active SOS Status */}
      {isSOSActive && (
        <div className="fixed top-4 left-4 right-4 z-40">
          <Card className="border-red-500 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
                  <div>
                    <p className="font-medium text-red-800">SOS Alert Active</p>
                    <p className="text-sm text-red-600">Emergency contacts have been notified</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleSOSCancel}
                  className="border-red-300 text-red-600 hover:bg-red-100"
                >
                  Cancel Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SOSAlert;
