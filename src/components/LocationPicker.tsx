import { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLocation?: string;
}

const LocationPicker = ({ onLocationSelect, initialLocation }: LocationPickerProps) => {
  const [location, setLocation] = useState(initialLocation || '');
  const [loading, setLoading] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on India
    map.current = L.map(mapContainer.current).setView([20.5937, 78.9629], 5);

    // Restrict map to India bounds
    map.current.setMaxBounds(INDIA_BOUNDS);
    map.current.setMinZoom(5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map.current);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Check if location is within India
          if (latitude >= 6.5 && latitude <= 35.5 && longitude >= 68.1 && longitude <= 97.4) {
            map.current?.setView([latitude, longitude], 13);
            
            // Add marker at current location
            marker.current = L.marker([latitude, longitude]).addTo(map.current!);
            
            // Reverse geocode
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
              .then(res => res.json())
              .then(data => {
                const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                setLocation(address);
                onLocationSelect(latitude, longitude, address);
                setLoading(false);
              })
              .catch(() => {
                const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                setLocation(address);
                onLocationSelect(latitude, longitude, address);
                setLoading(false);
              });
          } else {
            toast({
              title: 'Location outside India',
              description: 'Your location is outside India. Please select a location within India.',
              variant: 'destructive',
            });
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: 'Location access denied',
            description: 'Please click on the map to select your location.',
          });
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      toast({
        title: 'Geolocation not supported',
        description: 'Please click on the map to select your location.',
      });
      setLoading(false);
    }

    // Add click handler
    map.current.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      // Check if clicked location is within India
      if (lat < 6.5 || lat > 35.5 || lng < 68.1 || lng > 97.4) {
        toast({
          title: 'Invalid location',
          description: 'Please select a location within India.',
          variant: 'destructive',
        });
        return;
      }

      // Add or update marker
      if (marker.current) {
        marker.current.setLatLng([lat, lng]);
      } else {
        marker.current = L.marker([lat, lng]).addTo(map.current!);
      }

      // Use Nominatim (OpenStreetMap) for reverse geocoding
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setLocation(address);
          onLocationSelect(lat, lng, address);
        })
        .catch(() => {
          const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setLocation(address);
          onLocationSelect(lat, lng, address);
        });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onLocationSelect, toast]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={loading ? "Getting your location..." : "Click on map to select location"}
          className="pl-10"
          disabled={loading}
        />
        {loading && (
          <Loader2 className="absolute right-3 top-3 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>
      <div ref={mapContainer} style={{ height: '300px', width: '100%' }} className="rounded-lg border" />
      <p className="text-xs text-muted-foreground">
        🇮🇳 Map restricted to India. {loading ? 'Detecting your location...' : 'Click anywhere to update location.'}
      </p>
    </div>
  );
};

export default LocationPicker;
