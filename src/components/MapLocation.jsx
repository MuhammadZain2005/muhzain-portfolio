import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin } from 'lucide-react';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibXVoemFpbjA1IiwiYSI6ImNtZ2V2b2ozYTAxc2oyanB3YjVqcGpoOHUifQ.HR0Oo24im4uPCD_OPNrqqQ';

export const MapLocation = ({ 
  primaryLocation = "Lahore, Pakistan",
  locations = [
    { name: "Lahore, Pakistan", label: "LHR, PK", coordinates: [74.3587, 31.5204], color: '#ff6b35' }
  ],
  initialLocationIndex = 0,
  status = "Open to Opportunities",
  availability = "Remote • Hybrid • On-site"
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [activeLocation, setActiveLocation] = useState(initialLocationIndex);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    console.log('Initializing Mapbox map...');
    console.log('Access token:', mapboxgl.accessToken ? 'Set ✓' : 'Missing ✗');
    console.log('Container:', mapContainer.current);
    console.log('Locations:', locations);

    try {
      // Use initial location index to center map
      const centerCoordinates = locations.length > initialLocationIndex
        ? locations[initialLocationIndex].coordinates 
        : locations[0]?.coordinates || [74.3587, 31.5204];

      // Start zoomed in on the initial location
      const zoomLevel = 10;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: centerCoordinates,
        zoom: zoomLevel,
        interactive: true,
        attributionControl: false,
        logoPosition: 'bottom-right'
      });

      console.log('Map instance created:', map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each location
      locations.forEach((location, index) => {
        const marker = new mapboxgl.Marker({ 
          color: location.color || '#ff6b35',
          scale: 0.8
        })
          .setLngLat(location.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<div style="color: #000; padding: 4px; font-weight: 600;">${location.name}</div>`)
          )
          .addTo(map.current);
        
        console.log(`Marker ${index + 1} added:`, location.name);
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully! ✓');
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error event:', e);
        setMapError(true);
      });
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setMapError(true);
    }

    return () => {
      console.log('Cleaning up map...');
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Empty dependency array - only initialize once

  const flyToLocation = (index) => {
    if (!map.current) return;
    
    const location = locations[index];
    setActiveLocation(index);
    
    map.current.flyTo({
      center: location.coordinates,
      zoom: 10,
      duration: 2000,
      essential: true
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold leading-none mb-1">{primaryLocation}</h3>
          <p className="text-xs text-muted-foreground leading-none">{availability}</p>
        </div>
      </div>
      
      <div 
        ref={mapContainer} 
        className="w-full rounded-xl overflow-hidden bg-secondary/50 relative"
        style={{ height: '250px' }}
      >
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm z-10">
            <div className="text-center p-4">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Map view unavailable</p>
              <p className="text-xs text-muted-foreground mt-1">Check console for details</p>
            </div>
          </div>
        )}
      </div>

      {/* Location Buttons */}
      <div className="mt-3 flex gap-2">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => flyToLocation(index)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeLocation === index
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            }`}
          >
            <span 
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: location.color }}
            />
            {location.label || location.name}
          </button>
        ))}
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Status:</span>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {status}
        </span>
      </div>
    </div>
  );
};

