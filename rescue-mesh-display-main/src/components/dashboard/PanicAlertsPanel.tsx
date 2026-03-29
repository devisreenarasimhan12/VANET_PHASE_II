import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import UserLogsModal from './UserLogsModal';

interface LogEntry {
  id: string;
  deviceID: string;
  signalStrength: number;
  timestamp: string;
  eventType: 'detection' | 'heartbeat' | 'alert' | 'response';
  location?: string;
  status: 'current' | 'lost' | 'reconnecting';
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface PanicAlert {
  id: string;
  deviceID: string;
  location: string;
  lat: number;
  lng: number;
  timestamp: string;
  priority: 'high' | 'critical';
  status: 'new' | 'acknowledged' | 'responding';
}

interface PanicAlertsPanelProps {
  alerts: PanicAlert[];
  logs?: LogEntry[];
}

const PanicAlertsPanel = ({ alerts, logs = [] }: PanicAlertsPanelProps) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  // Sort alerts by timestamp (newest first) and priority
  const sortedAlerts = [...alerts].sort((a, b) => {
    const priorityWeight = { critical: 3, high: 2, medium: 1, low: 0 };
    const priorityDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const handleViewLogs = (deviceID: string) => {
    setSelectedDevice(deviceID);
    setIsLogsModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-emergency-critical text-white';
      case 'high': return 'bg-emergency-warning text-black';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-emergency-critical text-white';
      case 'acknowledged': return 'bg-emergency-warning text-black';
      case 'responding': return 'bg-status-online text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ${diffMinutes % 60}m ago`;
  };

  return (
    <Card className="h-full bg-panel border-panel-border">
      <CardHeader className="bg-panel-header border-b border-panel-border">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-emergency-critical" />
          Panic Alerts
          <Badge variant="destructive" className="ml-auto">
            {alerts.filter(a => a.status === 'new').length} NEW
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)] overflow-y-auto">
        {sortedAlerts.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No active panic alerts</p>
          </div>
        ) : (
          <div className="divide-y divide-panel-border">
            {sortedAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 hover:bg-panel-header/50 transition-colors cursor-pointer ${
                  alert.status === 'new' ? 'bg-emergency-critical/10' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(alert.priority)} variant="secondary">
                      {alert.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)} variant="outline">
                      {alert.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(alert.timestamp)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-mono text-sm font-medium">
                    Device: {alert.deviceID}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    {alert.lat.toFixed(6)}, {alert.lng.toFixed(6)}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => handleViewLogs(alert.deviceID)}
                    className="px-3 py-1 bg-emergency-info text-white text-xs rounded-md hover:bg-emergency-info/90 transition-colors"
                  >
                    View Logs
                  </button>
                  {alert.status === 'new' && (
                    <>
                      <button className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors">
                        Acknowledge
                      </button>
                      <button className="px-3 py-1 bg-emergency-warning text-black text-xs rounded-md hover:bg-emergency-warning/90 transition-colors">
                        Dispatch Unit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      {selectedDevice && (
        <UserLogsModal
          isOpen={isLogsModalOpen}
          onClose={() => {
            setIsLogsModalOpen(false);
            setSelectedDevice(null);
          }}
          deviceID={selectedDevice}
          logs={logs.filter(log => log.deviceID === selectedDevice)}
        />
      )}
    </Card>
  );
};

export default PanicAlertsPanel;