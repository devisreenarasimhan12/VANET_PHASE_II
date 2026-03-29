import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Signal, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LogEntry {
  id: string;
  deviceID: string;
  signalStrength: number;
  timestamp: string;
  eventType: 'detection' | 'heartbeat' | 'alert' | 'response';
  location?: string;
}

interface LogsTableProps {
  logs: LogEntry[];
}

const LogsTable = ({ logs }: LogsTableProps) => {
  const [displayLogs, setDisplayLogs] = useState(logs);

  // Sort logs by timestamp (newest first)
  const sortedLogs = [...displayLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getSignalColor = (strength: number) => {
    if (strength >= -50) return 'text-status-online';
    if (strength >= -70) return 'text-emergency-warning';
    return 'text-emergency-critical';
  };

  const getSignalBars = (strength: number) => {
    const bars = Math.max(1, Math.min(4, Math.floor((strength + 100) / 12.5)));
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 h-${i + 2} ${
          i < bars 
            ? getSignalColor(strength).replace('text-', 'bg-') 
            : 'bg-muted'
        } rounded-sm`}
      />
    ));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'detection': return 'bg-emergency-info text-white';
      case 'heartbeat': return 'bg-status-online text-white';
      case 'alert': return 'bg-emergency-critical text-white';
      case 'response': return 'bg-emergency-warning text-black';
      default: return 'bg-muted text-muted-foreground';
    }
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

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayLogs(logs);
    }, 5000);

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <Card className="h-full bg-panel border-panel-border">
      <CardHeader className="bg-panel-header border-b border-panel-border">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-emergency-info" />
          Detection Logs
          <Badge variant="outline" className="ml-auto">
            {sortedLogs.length} entries
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <ScrollArea className="h-full">
          {sortedLogs.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No detection logs available</p>
            </div>
          ) : (
            <div className="divide-y divide-panel-border">
              {sortedLogs.map((log, index) => (
                <div
                  key={log.id}
                  className={`p-4 hover:bg-panel-header/50 transition-colors ${
                    index === 0 ? 'bg-panel-header/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getEventTypeColor(log.eventType)} variant="secondary">
                        {log.eventType.toUpperCase()}
                      </Badge>
                      <span className="font-mono text-sm font-medium">
                        {log.deviceID}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatRelativeTime(log.timestamp)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Signal className="h-3 w-3 text-muted-foreground" />
                        <span className={`text-sm font-mono ${getSignalColor(log.signalStrength)}`}>
                          {log.signalStrength} dBm
                        </span>
                      </div>
                      
                      <div className="flex items-end gap-px h-4">
                        {getSignalBars(log.signalStrength)}
                      </div>

                      {log.location && (
                        <span className="text-xs text-muted-foreground">
                          {log.location}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono text-muted-foreground">
                      {formatTime(log.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LogsTable;