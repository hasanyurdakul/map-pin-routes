'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ColoredMapMarker } from './ColoredMapMarker';

interface MapProps {
  center: [number, number];
  zoom: number;
  onMarkerPlaced?: (position: [number, number]) => void;
  markers?: Array<{
    position: [number, number];
    color: string;
    name?: string;
    latitude?: number;
    longitude?: number;
  }>;
  drawRoute?: boolean;
}

const LocationMarker = ({ onMarkerPlaced }: Partial<MapProps>) => {
  useMapEvents({
    click(e) {
      if (onMarkerPlaced) {
        onMarkerPlaced([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

export default function Map({
  center,
  zoom,
  onMarkerPlaced,
  markers = [],
  drawRoute = false,
}: MapProps) {
  useEffect(() => {
    // Fix for the missing marker icon issue
    delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
  }, []);

  // Create route line coordinates if drawRoute is true
  const routePositions =
    drawRoute && markers.length > 0
      ? markers.map(
          marker =>
            [marker.latitude ?? marker.position[0], marker.longitude ?? marker.position[1]] as [
              number,
              number
            ]
        )
      : [];

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onMarkerPlaced={onMarkerPlaced} />
      {markers.map((marker, index) => {
        const position: [number, number] = [
          marker.latitude ?? marker.position[0],
          marker.longitude ?? marker.position[1],
        ];
        return (
          <Marker key={index} position={position} icon={ColoredMapMarker(marker.color)}>
            {marker.name && (
              <Popup className="custom-popup" closeButton={false} offset={[120, -20]}>
                <div style={{ padding: '8px', minWidth: '200px' }}>
                  <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                    {marker.name}
                  </strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    <div>Latitude: {position[0].toFixed(6)}</div>
                    <div>Longitude: {position[1].toFixed(6)}</div>
                  </div>
                </div>
              </Popup>
            )}
          </Marker>
        );
      })}
      {drawRoute && routePositions.length > 1 && (
        <Polyline positions={routePositions} color="#2196F3" weight={3} opacity={0.7} />
      )}
    </MapContainer>
  );
}
