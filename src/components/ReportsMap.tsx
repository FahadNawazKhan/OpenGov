import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Report } from '@/types';
import { Card } from '@/components/ui/card';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// India's geographical boundaries
const INDIA_BOUNDS: L.LatLngBoundsExpression = [
  [6.5, 68.1],   // Southwest coordinates
  [35.5, 97.4]   // Northeast coordinates
];

interface ReportsMapProps {
  reports: Report[];
  onReportClick?: (reportId: string) => void;
}

const ReportsMap = ({ reports, onReportClick }: ReportsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Filter reports with valid coordinates within India
    const reportsWithCoords = reports.filter(r => 
      r.latitude && r.longitude &&
      r.latitude >= 6.5 && r.latitude <= 35.5 &&
      r.longitude >= 68.1 && r.longitude <= 97.4
    );
    
    // Calculate center based on reports or use India's center
    const center: [number, number] = reportsWithCoords.length > 0
      ? [reportsWithCoords[0].latitude!, reportsWithCoords[0].longitude!]
      : [20.5937, 78.9629]; // Center of India

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(center, 5);

      // Restrict map to India bounds
      map.current.setMaxBounds(INDIA_BOUNDS);
      map.current.setMinZoom(5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map.current);
    }

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Create custom colored markers
    const createColoredIcon = (status: Report['status']) => {
      const colors = {
        pending: '#f59e0b',
        in_progress: '#3b82f6',
        resolved: '#10b981',
        rejected: '#ef4444',
      };

      return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${colors[status]};
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    };

    // Add markers for reports with coordinates
    reportsWithCoords.forEach((report) => {
      const marker = L.marker([report.latitude!, report.longitude!], {
        icon: createColoredIcon(report.status),
      }).addTo(map.current!);

      marker.bindPopup(`
        <div style="padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${report.title}</h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${report.category}</p>
          <p style="font-size: 12px; text-transform: capitalize;">${report.status.replace('_', ' ')}</p>
        </div>
      `);

      marker.on('click', () => {
        onReportClick?.(report.id);
      });

      markers.current.push(marker);
    });

    // Fit bounds if there are reports
    if (reportsWithCoords.length > 0) {
      const bounds = L.latLngBounds(
        reportsWithCoords.map(r => [r.latitude!, r.longitude!] as [number, number])
      );
      map.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [reports, onReportClick]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <div ref={mapContainer} style={{ height: '400px', width: '100%' }} />
    </Card>
  );
};

export default ReportsMap;
