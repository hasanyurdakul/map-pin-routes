import { MarkedLocation } from '@/types/markedLocation';

/**
 * Calculates the distance between two points on Earth using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Sorts locations by distance from a given point
 * @param locations Array of locations to sort
 * @param currentLat Current latitude
 * @param currentLon Current longitude
 * @returns Sorted array of locations
 */
export const sortLocationsByDistance = (
  locations: MarkedLocation[],
  currentLat: number,
  currentLon: number
): MarkedLocation[] => {
  return [...locations].sort((a, b) => {
    const distA = calculateDistance(currentLat, currentLon, a.latitude, a.longitude);
    const distB = calculateDistance(currentLat, currentLon, b.latitude, b.longitude);
    return distA - distB;
  });
};

export const DEFAULT_MAP_CONFIG = {
  CENTER: [39.9334, 32.8597] as [number, number], // Ankara coordinates
  ZOOM: 13,
  GEOLOCATION: {
    TIMEOUT: 5000,
    MAX_AGE: 0,
    HIGH_ACCURACY: true,
  },
  CURRENT_LOCATION_MARKER: {
    COLOR: '#000000',
    NAME: 'Current Location',
  },
} as const;
