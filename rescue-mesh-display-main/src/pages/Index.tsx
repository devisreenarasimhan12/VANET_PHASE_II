import EmergencyMap from '@/components/dashboard/EmergencyMap';
import PanicAlertsPanel from '@/components/dashboard/PanicAlertsPanel';
import ComplainedAreasChart from '@/components/dashboard/ComplainedAreasChart';
import LogsTable from '@/components/dashboard/LogsTable';
import { mockVehicles, mockPanicAlerts, mockComplainedAreas, mockDisasterAreas, mockLogs } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, AlertTriangle, Users, Activity, ChevronRight, MapPin, FileText } from 'lucide-react';

const Index = () => {
  const activeAlerts = mockPanicAlerts.filter(alert => alert.status === 'new').length;
  const totalComplaints = mockComplainedAreas.reduce((sum, zone) => sum + zone.userCount, 0);
  const activeVehicles = mockVehicles.filter(vehicle => vehicle.status === 'active').length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-panel-border bg-panel-header">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radio className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Rescue Mesh Dashboard</h1>
                <p className="text-sm text-muted-foreground">VANET Emergency Response System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-status-online rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Online</span>
              </div>
              <Badge variant="outline" className="font-mono">
                {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-panel rounded-lg border border-panel-border">
              <AlertTriangle className="h-5 w-5 text-emergency-critical" />
              <div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
                <div className="text-lg font-bold text-emergency-critical">{activeAlerts}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-panel rounded-lg border border-panel-border">
              <Radio className="h-5 w-5 text-status-online" />
              <div>
                <div className="text-sm text-muted-foreground">Active Units</div>
                <div className="text-lg font-bold text-status-online">{activeVehicles}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-panel rounded-lg border border-panel-border">
              <Users className="h-5 w-5 text-emergency-info" />
              <div>
                <div className="text-sm text-muted-foreground">Complained Areas</div>
                <div className="text-lg font-bold text-emergency-info">{totalComplaints}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-panel rounded-lg border border-panel-border">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Detection Events</div>
                <div className="text-lg font-bold text-primary">{mockLogs.length}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard - Vertical Layout with Tabs */}
      <main className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Panic Alerts
            </TabsTrigger>
            <TabsTrigger value="survivors" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Complained Areas
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Detection Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map takes full height on left */}
              <div className="lg:col-span-1">
                <EmergencyMap 
                  vehicles={mockVehicles}
                  panicAlerts={mockPanicAlerts}
                  complainedAreas={mockComplainedAreas}
                  disasterAreas={mockDisasterAreas}
                />
              </div>
              
              {/* Quick overview on right */}
              <div className="lg:col-span-1 space-y-6">
                <div className="h-[300px]">
                  <PanicAlertsPanel alerts={mockPanicAlerts.slice(0, 3)} logs={mockLogs} />
                </div>
                <div className="h-[300px]">
                  <ComplainedAreasChart zones={mockComplainedAreas} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EmergencyMap 
                  vehicles={mockVehicles}
                  panicAlerts={mockPanicAlerts}
                  complainedAreas={mockComplainedAreas}
                  disasterAreas={mockDisasterAreas}
                />
              </div>
              <div className="lg:col-span-1">
                <PanicAlertsPanel alerts={mockPanicAlerts} logs={mockLogs} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="survivors" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-1">
                <EmergencyMap 
                  vehicles={mockVehicles}
                  panicAlerts={mockPanicAlerts}
                  complainedAreas={mockComplainedAreas}
                  disasterAreas={mockDisasterAreas}
                />
              </div>
              <div className="lg:col-span-1">
                <ComplainedAreasChart zones={mockComplainedAreas} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-0 relative z-[9999]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-[9999]">
              <div className="lg:col-span-1 h-[600px] map-container relative z-[1]">
                <EmergencyMap 
                  vehicles={mockVehicles}
                  panicAlerts={mockPanicAlerts}
                  complainedAreas={mockComplainedAreas}
                  disasterAreas={mockDisasterAreas}
                />
              </div>
              <div className="lg:col-span-1 h-[600px] logs-container relative z-[9999]">
                <LogsTable logs={mockLogs} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
