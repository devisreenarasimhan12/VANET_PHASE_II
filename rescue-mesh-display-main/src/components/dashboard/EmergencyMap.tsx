import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  type: 'rescue' | 'police' | 'fire' | 'ambulance';
  status: 'active' | 'responding' | 'offline';
}

interface PanicAlert {
  id: string;
  deviceID: string;
  lat: number;
  lng: number;
  timestamp: string;
  priority: 'high' | 'critical';
}

interface ComplainedArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  userCount: number;
  complaintType: 'fire' | 'flood' | 'structural' | 'medical' | 'other';
}

interface DisasterArea {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'forest' | 'abandoned_building' | 'landslide_prone' | 'fire_prone';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  lastIncident?: string;
}

interface EmergencyMapProps {
  vehicles: Vehicle[];
  panicAlerts: PanicAlert[];
  complainedAreas: ComplainedArea[];
  disasterAreas?: DisasterArea[];
  showLegend?: boolean;
  legendPlacement?: 'overlay' | 'below';
}

const EmergencyMap = ({ vehicles, panicAlerts, complainedAreas, disasterAreas = [], showLegend = false, legendPlacement = 'overlay' }: EmergencyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLegendVisible, setIsLegendVisible] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Puducherry
    const map = L.map(mapRef.current, {
      center: [11.9416, 79.8083],
      zoom: 12,
      zoomControl: true,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Dark tile layer for emergency theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      maxZoom: 19,
    }).addTo(map);

    // Custom icons
    const createVehicleIcon = (type: string, status: string) => {
      const color = status === 'active' ? '#22c55e' : status === 'responding' ? '#f59e0b' : '#6b7280';
      return L.divIcon({
        html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        className: 'vehicle-marker',
      });
    };

    const panicIcon = L.divIcon({
      html: '<div style="background: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(239,68,68,0.6); animation: pulse 2s infinite;"></div>',
      iconSize: [22, 22],
      className: 'panic-marker',
    });

    // Disaster area icons
    const createDisasterIcon = (type: string, riskLevel: string) => {
      let color = '#6b7280';
      let size = 14;
      
      switch (type) {
        case 'forest':
          color = riskLevel === 'critical' ? '#dc2626' : riskLevel === 'high' ? '#ea580c' : '#d97706';
          break;
        case 'abandoned_building':
          color = riskLevel === 'critical' ? '#7c2d12' : riskLevel === 'high' ? '#92400e' : '#a16207';
          break;
        case 'landslide_prone':
          color = riskLevel === 'critical' ? '#581c87' : riskLevel === 'high' ? '#7c3aed' : '#a855f7';
          break;
        case 'fire_prone':
          color = riskLevel === 'critical' ? '#991b1b' : riskLevel === 'high' ? '#dc2626' : '#ef4444';
          break;
      }
      
      return L.divIcon({
        html: `<div style="background: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [size + 4, size + 4],
        className: 'disaster-marker',
      });
    };

    // Add vehicles
    vehicles.forEach((vehicle) => {
      const marker = L.marker([vehicle.lat, vehicle.lng], {
        icon: createVehicleIcon(vehicle.type, vehicle.status),
      }).addTo(map);
      
      marker.bindPopup(`
        <div class="text-sm">
          <strong>${vehicle.type.toUpperCase()} ${vehicle.id}</strong><br/>
          Status: <span style="color: ${vehicle.status === 'active' ? '#22c55e' : vehicle.status === 'responding' ? '#f59e0b' : '#6b7280'}">${vehicle.status}</span><br/>
          Location: ${vehicle.lat.toFixed(4)}, ${vehicle.lng.toFixed(4)}
        </div>
      `);
    });

    // Add panic alerts
    panicAlerts.forEach((alert) => {
      const marker = L.marker([alert.lat, alert.lng], { icon: panicIcon }).addTo(map);
      marker.bindPopup(`
        <div class="text-sm">
          <strong style="color: #ef4444">PANIC ALERT</strong><br/>
          Device: ${alert.deviceID}<br/>
          Priority: ${alert.priority.toUpperCase()}<br/>
          Time: ${new Date(alert.timestamp).toLocaleTimeString()}
        </div>
      `);
    });

    // Add complained areas
    complainedAreas.forEach((area) => {
      const circle = L.circle([area.lat, area.lng], {
        radius: area.radius,
        fillColor: '#3b82f6',
        color: '#60a5fa',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.2,
      }).addTo(map);

      circle.bindPopup(`
        <div class="text-sm">
          <strong>${area.name}</strong><br/>
          Complaint Type: ${area.complaintType.toUpperCase()}<br/>
          Estimated affected: ${area.userCount}<br/>
          Radius: ${area.radius}m
        </div>
      `);
    });

    // Add disaster areas
    disasterAreas.forEach((area) => {
      const marker = L.marker([area.lat, area.lng], {
        icon: createDisasterIcon(area.type, area.riskLevel),
      }).addTo(map);
      
      marker.bindPopup(`
        <div class="text-sm">
          <strong>${area.name}</strong><br/>
          Type: ${area.type.replace('_', ' ').toUpperCase()}<br/>
          Risk Level: <span style="color: ${area.riskLevel === 'critical' ? '#dc2626' : area.riskLevel === 'high' ? '#ea580c' : area.riskLevel === 'medium' ? '#d97706' : '#65a30d'}">${area.riskLevel.toUpperCase()}</span><br/>
          Description: ${area.description}<br/>
          ${area.lastIncident ? `Last Incident: ${area.lastIncident}` : ''}
        </div>
      `);
    });

    // Add scale control
    L.control.scale({ imperial: false }).addTo(map);

    // Fit map to all data points for better UX
    const allLatLngs: L.LatLngExpression[] = [];
    vehicles.forEach(v => allLatLngs.push([v.lat, v.lng]));
    panicAlerts.forEach(a => allLatLngs.push([a.lat, a.lng]));
    complainedAreas.forEach(z => allLatLngs.push([z.lat, z.lng]));
    disasterAreas.forEach(d => allLatLngs.push([d.lat, d.lng]));

    if (allLatLngs.length > 0) {
      const bounds = L.latLngBounds(allLatLngs as L.LatLngExpression[]);
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
    }

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.remove();
    };
  }, [vehicles, panicAlerts, complainedAreas, disasterAreas]);

  return (
    <>
      <div className="h-full w-full relative overflow-hidden z-[1]">
        <div ref={mapRef} className="h-full w-full rounded-lg" />
        
        {/* Legend Toggle Button */}
        <button
          onClick={() => setIsLegendVisible(!isLegendVisible)}
          className="absolute top-4 right-4 bg-panel/90 backdrop-blur border border-panel-border rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-panel/80 transition-colors z-[1100] shadow-lg"
        >
          {isLegendVisible ? 'Hide Legend' : 'Legend'}
        </button>
        
        {/* Legend Overlay */}
        {isLegendVisible && (
          <div className="absolute top-16 right-4 bg-panel/90 backdrop-blur border border-panel-border rounded-lg p-3 shadow-lg max-w-xs z-[1050]">
            <div className="text-sm font-semibold text-foreground mb-2 tracking-wide">Legend</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-status-online rounded-full border border-foreground/20"></div>
                <span>Active Vehicle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emergency-warning rounded-full border border-foreground/20"></div>
                <span>Responding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emergency-critical rounded-full border border-foreground/20 animate-pulse"></div>
                <span>Panic Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emergency-info/30 border-2 border-emergency-info rounded-full"></div>
                <span>Complained Area</span>
              </div>
              <div className="border-t border-panel-border pt-2 mt-2">
                <div className="font-medium mb-1">Disaster Areas:</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full border border-foreground/20"></div>
                  <span>Forest (High Risk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-800 rounded-full border border-foreground/20"></div>
                  <span>Abandoned Building</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full border border-foreground/20"></div>
                  <span>Landslide Prone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-800 rounded-full border border-foreground/20"></div>
                  <span>Fire Prone</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmergencyMap;