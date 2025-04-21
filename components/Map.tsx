'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapProps } from '@/types/map';
import { LocationMarker } from './map/LocationMarker';
import { MapMarkers } from './map/MapMarkers';
import { RoutePolyline } from './map/RoutePolyline';
import { MAP_CONSTANTS } from '@/utils/constants';

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
      iconRetinaUrl: MAP_CONSTANTS.MARKER_ICONS.RETINA_URL,
      iconUrl: MAP_CONSTANTS.MARKER_ICONS.ICON_URL,
      shadowUrl: MAP_CONSTANTS.MARKER_ICONS.SHADOW_URL,
    });
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution={MAP_CONSTANTS.TILE_LAYER.ATTRIBUTION}
        url={MAP_CONSTANTS.TILE_LAYER.URL}
      />
      <LocationMarker onMarkerPlaced={onMarkerPlaced} />
      <MapMarkers markers={markers} />
      {drawRoute && <RoutePolyline markers={markers} />}
    </MapContainer>
  );
}
