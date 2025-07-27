import '../App.css';
import { useState, useEffect } from 'react';

const GOOGLE_MAP_API = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const MapView = ({ properties, selectedProperty, onMarkerClick }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Load Google Maps Script
  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) return resolve();

        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          existingScript.addEventListener('load', resolve);
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadScript()
      .then(() => {
        const mapElement = document.getElementById('map');
        const newMap = new window.google.maps.Map(mapElement, {
          center: { lat: 40.7128, lng: -74.0060 }, // Default center (NYC)
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });
        setMap(newMap);
      })
      .catch((err) => console.error('Google Maps script failed:', err));
  }, []);

  // Update markers whenever properties change
  useEffect(() => {
    if (!map || !window.google) return;

    // Clear old markers
    markers.forEach(marker => marker.setMap(null));

    // Add new markers
    const newMarkers = properties.map(property => {
      const marker = new window.google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map,
        title: property.title,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(35, 35)
        }
      });

      // Info Window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-size:14px; font-weight:bold;">
            ${property.title}
          </div>
          <div style="font-size:12px;">${property.address}</div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        onMarkerClick(property);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, properties]);

  // Pan to selected property
  useEffect(() => {
    if (map && selectedProperty) {
      map.panTo({ lat: selectedProperty.lat, lng: selectedProperty.lng });
      map.setZoom(14);
    }
  }, [selectedProperty, map]);

  return (
    <div id="map" className="map-container" style={{ height: '500px', borderRadius: '10px' }}>
      {/* Google Map renders here */}
    </div>
  );
};

export default MapView;

