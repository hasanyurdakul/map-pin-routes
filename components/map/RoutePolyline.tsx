import { Polyline } from 'react-leaflet';
import { MapMarker } from '@/types/map';
import { getMarkerPosition } from '@/utils/mapUtils';
import { MAP_CONSTANTS } from '@/utils/constants';

interface RoutePolylineProps {
  markers: MapMarker[];
}

export const RoutePolyline = ({ markers }: RoutePolylineProps) => {
  if (markers.length <= 1) return null;

  const routePositions = markers.map(marker => getMarkerPosition(marker));

  return (
    <Polyline
      positions={routePositions}
      color={MAP_CONSTANTS.ROUTE.COLOR}
      weight={MAP_CONSTANTS.ROUTE.WEIGHT}
      opacity={MAP_CONSTANTS.ROUTE.OPACITY}
    />
  );
};
