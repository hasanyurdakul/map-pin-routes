import { useMapEvents } from 'react-leaflet';
import { LocationMarkerProps } from '@/types/map';

export const LocationMarker = ({ onMarkerPlaced }: LocationMarkerProps) => {
  useMapEvents({
    click(e) {
      if (onMarkerPlaced) {
        onMarkerPlaced([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};
