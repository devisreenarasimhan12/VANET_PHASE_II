// Mock data for the Rescue Mesh Emergency Dashboard

export interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  type: 'rescue' | 'police' | 'fire' | 'ambulance';
  status: 'active' | 'responding' | 'offline';
}

export interface PanicAlert {
  id: string;
  deviceID: string;
  location: string;
  lat: number;
  lng: number;
  timestamp: string;
  priority: 'high' | 'critical';
  status: 'new' | 'acknowledged' | 'responding';
}

export interface DisasterArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'forest' | 'abandoned_building' | 'landslide_prone' | 'fire_prone';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  lastIncident?: string;
}

export interface ComplainedArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  userCount: number;
  percentage: number;
  color: string;
  complaintType: 'fire' | 'flood' | 'structural' | 'medical' | 'other';
}

export interface LogEntry {
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

// Generate mock vehicles
export const mockVehicles: Vehicle[] = [
  { id: 'R-001', lat: 11.9416, lng: 79.8083, type: 'rescue', status: 'active' }, // Puducherry Central
  { id: 'P-047', lat: 11.9500, lng: 79.8200, type: 'police', status: 'responding' }, // Auroville Forest
  { id: 'F-023', lat: 11.9300, lng: 79.7900, type: 'fire', status: 'active' }, // Ousteri Lake Forest
  { id: 'A-015', lat: 11.9600, lng: 79.8000, type: 'ambulance', status: 'responding' }, // Botanical Gardens
  { id: 'R-008', lat: 11.9200, lng: 79.7800, type: 'rescue', status: 'offline' }, // Chunnambar Forest
  { id: 'P-092', lat: 11.9700, lng: 79.8300, type: 'police', status: 'active' }, // Kalapet Forest
];

// Generate mock panic alerts
export const mockPanicAlerts: PanicAlert[] = [
  {
    id: 'PA-001',
    deviceID: 'DEV-7892',
    location: 'Auroville Forest',
    lat: 11.9500,
    lng: 79.8200,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
    priority: 'critical',
    status: 'new'
  },
  {
    id: 'PA-002',
    deviceID: 'DEV-4521',
    location: 'Ousteri Lake Forest',
    lat: 11.9300,
    lng: 79.7900,
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(), // 12 minutes ago
    priority: 'high',
    status: 'acknowledged'
  },
  {
    id: 'PA-003',
    deviceID: 'DEV-1337',
    location: 'Chunnambar Forest',
    lat: 11.9200,
    lng: 79.7800,
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
    priority: 'critical',
    status: 'responding'
  },
  {
    id: 'PA-004',
    deviceID: 'DEV-9876',
    location: 'Kalapet Forest',
    lat: 11.9700, 
    lng: 79.8300,
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(), // 8 minutes ago
    priority: 'high',
    status: 'new'
  }
];

// Generate mock disaster areas in Pondicherry and Tamil Nadu
export const mockDisasterAreas: DisasterArea[] = [
  // Forests
  {
    id: 'DA-001',
    name: 'Auroville Forest',
    lat: 11.9500,
    lng: 79.8200,
    type: 'forest',
    riskLevel: 'high',
    description: 'Dense forest area prone to fires during dry season',
    lastIncident: '2024-01-15'
  },
  {
    id: 'DA-002',
    name: 'Ousteri Lake Forest',
    lat: 11.9300,
    lng: 79.7900,
    type: 'forest',
    riskLevel: 'medium',
    description: 'Wetland forest with fire risk during summer',
    lastIncident: '2023-12-20'
  },
  {
    id: 'DA-003',
    name: 'Chunnambar Forest',
    lat: 11.9200,
    lng: 79.7800,
    type: 'forest',
    riskLevel: 'high',
    description: 'Coastal forest vulnerable to storms and fires',
    lastIncident: '2024-01-08'
  },
  {
    id: 'DA-004',
    name: 'Kalapet Forest',
    lat: 11.9700,
    lng: 79.8300,
    type: 'forest',
    riskLevel: 'medium',
    description: 'Urban forest with moderate fire risk',
    lastIncident: '2023-11-15'
  },
  {
    id: 'DA-005',
    name: 'Mudaliarkuppam Forest',
    lat: 11.8800,
    lng: 79.7500,
    type: 'forest',
    riskLevel: 'critical',
    description: 'Dense mangrove forest with high fire risk',
    lastIncident: '2024-01-20'
  },
  {
    id: 'DA-006',
    name: 'Villianur Forest',
    lat: 11.9800,
    lng: 79.7800,
    type: 'forest',
    riskLevel: 'high',
    description: 'Hill forest prone to landslides during monsoon',
    lastIncident: '2024-01-12'
  },
  
  // Abandoned Buildings
  {
    id: 'DA-007',
    name: 'Old French Quarter Building',
    lat: 11.9450,
    lng: 79.8100,
    type: 'abandoned_building',
    riskLevel: 'high',
    description: 'Historic building with structural instability',
    lastIncident: '2024-01-10'
  },
  {
    id: 'DA-008',
    name: 'Abandoned Textile Mill',
    lat: 11.9350,
    lng: 79.7950,
    type: 'abandoned_building',
    riskLevel: 'critical',
    description: 'Large industrial building with fire hazards',
    lastIncident: '2024-01-18'
  },
  {
    id: 'DA-009',
    name: 'Old Railway Station',
    lat: 11.9550,
    lng: 79.8150,
    type: 'abandoned_building',
    riskLevel: 'medium',
    description: 'Abandoned station building with structural issues',
    lastIncident: '2023-12-25'
  },
  
  // Landslide Prone Areas
  {
    id: 'DA-010',
    name: 'Villianur Hills',
    lat: 11.9850,
    lng: 79.7850,
    type: 'landslide_prone',
    riskLevel: 'critical',
    description: 'Steep hills with loose soil during monsoon',
    lastIncident: '2024-01-05'
  },
  {
    id: 'DA-011',
    name: 'Auroville Hills',
    lat: 11.9550,
    lng: 79.8250,
    type: 'landslide_prone',
    riskLevel: 'high',
    description: 'Hilly terrain vulnerable to soil erosion',
    lastIncident: '2024-01-14'
  },
  {
    id: 'DA-012',
    name: 'Kalapet Coastal Cliffs',
    lat: 11.9750,
    lng: 79.8350,
    type: 'landslide_prone',
    riskLevel: 'high',
    description: 'Coastal cliffs prone to erosion and landslides',
    lastIncident: '2024-01-02'
  },
  
  // Fire Prone Areas
  {
    id: 'DA-013',
    name: 'Industrial Zone East',
    lat: 11.9250,
    lng: 79.8000,
    type: 'fire_prone',
    riskLevel: 'critical',
    description: 'Industrial area with flammable materials',
    lastIncident: '2024-01-19'
  },
  {
    id: 'DA-014',
    name: 'Market District',
    lat: 11.9400,
    lng: 79.8050,
    type: 'fire_prone',
    riskLevel: 'high',
    description: 'Dense market area with electrical hazards',
    lastIncident: '2024-01-16'
  },
  {
    id: 'DA-015',
    name: 'Residential Complex North',
    lat: 11.9650,
    lng: 79.8100,
    type: 'fire_prone',
    riskLevel: 'medium',
    description: 'High-rise residential area with fire risk',
    lastIncident: '2023-12-30'
  }
];

// Calculate complained area percentages
const calculateZonePercentages = (zones: Omit<ComplainedArea, 'percentage'>[]): ComplainedArea[] => {
  const total = zones.reduce((sum, zone) => sum + zone.userCount, 0);
  return zones.map(zone => ({
    ...zone,
    percentage: Math.round((zone.userCount / total) * 100)
  }));
};

// Generate mock complained areas
export const mockComplainedAreas: ComplainedArea[] = calculateZonePercentages([
  {
    id: 'CA-A',
    name: 'Auroville Forest',
    lat: 11.9500,
    lng: 79.8200,
    radius: 800,
    userCount: 42,
    color: '#3b82f6',
    complaintType: 'fire'
  },
  {
    id: 'CA-B',
    name: 'Ousteri Lake Forest',
    lat: 11.9300,
    lng: 79.7900,
    radius: 600,
    userCount: 28,
    color: '#f59e0b',
    complaintType: 'flood'
  },
  {
    id: 'CA-C',
    name: 'Chunnambar Forest',
    lat: 11.9200,
    lng: 79.7800,
    radius: 700,
    userCount: 35,
    color: '#10b981',
    complaintType: 'structural'
  },
  {
    id: 'CA-D',
    name: 'Old Textile Mill',
    lat: 11.9350,
    lng: 79.7950,
    radius: 500,
    userCount: 18,
    color: '#ef4444',
    complaintType: 'fire'
  },
  {
    id: 'CA-E',
    name: 'Villianur Hills',
    lat: 11.9850,
    lng: 79.7850,
    radius: 900,
    userCount: 31,
    color: '#8b5cf6',
    complaintType: 'structural'
  }
]);

// Generate mock detection logs
const generateMockLogs = (): LogEntry[] => {
  const deviceIDs = ['DEV-7892', 'DEV-4521', 'DEV-1337', 'DEV-9876', 'DEV-2468', 'DEV-1357'];
  const locations = ['Auroville Forest', 'Ousteri Lake Forest', 'Chunnambar Forest', 'Kalapet Forest', 'Botanical Gardens', 'Puducherry Beach'];
  const eventTypes: LogEntry['eventType'][] = ['detection', 'heartbeat', 'alert', 'response'];
  
  const logs: LogEntry[] = [];
  
  for (let i = 0; i < 50; i++) {
    const timestamp = new Date(Date.now() - Math.random() * 3600000 * 24); // Random time within last 24 hours
    
    const randomDevice = deviceIDs[Math.floor(Math.random() * deviceIDs.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomLat = 11.9 + (Math.random() - 0.5) * 0.1; // Puducherry area
    const randomLng = 79.8 + (Math.random() - 0.5) * 0.1;
    
    logs.push({
      id: `LOG-${String(i + 1).padStart(3, '0')}`,
      deviceID: randomDevice,
      signalStrength: Math.floor(Math.random() * 50) - 100, // -100 to -50 dBm
      timestamp: timestamp.toISOString(),
      eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      location: Math.random() > 0.3 ? randomLocation : undefined,
      status: Math.random() > 0.7 ? 'current' : Math.random() > 0.5 ? 'reconnecting' : 'lost',
      coordinates: {
        lat: randomLat,
        lng: randomLng
      }
    });
  }
  
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockLogs: LogEntry[] = generateMockLogs();