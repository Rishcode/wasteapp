import React from 'react';
import { Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function LocationCapture({ onGetLocation, location }) {
  return (
    <div className="mb-3">
      <Button onClick={onGetLocation} className="w-100" variant="secondary">
        Get Current Location
      </Button>
      {location && (
        <div className="map-container mt-3">
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lon]}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default LocationCapture;