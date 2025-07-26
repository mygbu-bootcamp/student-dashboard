import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Clock, Eye } from "lucide-react";

const AbsenceHistory = ({ absentHistory }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-orange-500" />
          Recent Absence History
        </CardTitle>
        <CardDescription>Your recent absences and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {absentHistory.map((absence, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm font-medium">{new Date(absence.date).getDate()}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(absence.date).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{absence.subject}</p>
                  <p className="text-sm text-gray-600">{absence.reason}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={absence.status === "Approved" ? "default" : "secondary"}
                  className={absence.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                >
                  {absence.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AbsenceHistory;
