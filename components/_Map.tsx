'use client';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

const Map = ({ center, zoom, onMarkerPlaced, markers = [], drawRoute = false }: MapProps) => {
  useEffect(() => {
    // Fix for default icon not showing
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/assets/icons/map-marker.svg',
      iconUrl: '/assets/icons/map-marker.svg',
      shadowUrl: null,
    });
  }, []);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
