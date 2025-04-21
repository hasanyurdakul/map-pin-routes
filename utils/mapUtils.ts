import { MapMarker } from '@/types/map';
import { COORDINATE_PRECISION } from './constants';

export const formatCoordinate = (coordinate: number): string => {
  return coordinate.toFixed(COORDINATE_PRECISION);
};

export const getMarkerPosition = (marker: MapMarker): [number, number] => {
  return [marker.latitude ?? marker.position[0], marker.longitude ?? marker.position[1]];
};

export const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = (coord1[0] * Math.PI) / 180;
  const lat2 = (coord2[0] * Math.PI) / 180;
  const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180;
  const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
