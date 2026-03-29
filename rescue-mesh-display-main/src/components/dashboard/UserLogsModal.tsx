import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, MapPin, Signal, Activity } from 'lucide-react';

interface UserLog {
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

interface UserLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceID: string;
  logs: UserLog[];
}

const UserLogsModal = ({ isOpen, onClose, deviceID, logs }: UserLogsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-status-online text-white';
      case 'lost': return 'bg-emergency-critical text-white';
      case 'reconnecting': return 'bg-emergency-warning text-black';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSignalColor = (strength: number) => {
    if (strength >= -50) return 'text-status-online';
    if (strength >= -70) return 'text-emergency-warning';
    return 'text-emergency-critical';
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  // Limit to 50 logs max
  const displayLogs = logs.slice(0, 50);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emergency-info" />
            Device Logs: {deviceID}
            <Badge variant="outline" className="ml-auto">
              {displayLogs.length} logs
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-3">
            {displayLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border border-panel-border rounded-lg hover:bg-panel-header/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(log.status)} variant="secondary">
                      {log.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs">
                      {log.eventType.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(log.timestamp)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Serial Number:</span>
                      <span className="font-mono">{log.id}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">Location:</span>
                      <span>{log.location || 'Unknown'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Coordinates:</span>
                      <span className="font-mono text-xs">
                        {log.coordinates.lat.toFixed(6)}, {log.coordinates.lng.toFixed(6)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Time:</span>
                      <span className="font-mono">{formatTime(log.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Signal className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">Signal:</span>
                      <span className={`font-mono ${getSignalColor(log.signalStrength)}`}>
                        {log.signalStrength} dBm
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Event:</span>
                      <span className="capitalize">{log.eventType}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UserLogsModal; 