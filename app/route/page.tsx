'use client';

import { Box, Container, Heading, Spinner, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { RouteEmptyState } from '@/components/route/EmptyState';
import { DEFAULT_MAP_CONFIG, sortLocationsByDistance } from '@/utils/routeUtils';

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

export default function RouteDisplay() {
  const locations = useMarkedLocationStore(useCallback(state => state.MarkedLocations, []));
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      setCurrentPosition(DEFAULT_MAP_CONFIG.CENTER);
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
      setCurrentPosition(pos);
      setIsLoading(false);
      setError(null);
    };

    const errorHandler = (err: GeolocationPositionError) => {
      console.warn('Geolocation error:', err);
      setError('Could not get your location. Using default position.');
      setCurrentPosition(DEFAULT_MAP_CONFIG.CENTER);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: DEFAULT_MAP_CONFIG.GEOLOCATION.HIGH_ACCURACY,
      timeout: DEFAULT_MAP_CONFIG.GEOLOCATION.TIMEOUT,
      maximumAge: DEFAULT_MAP_CONFIG.GEOLOCATION.MAX_AGE,
    });
  }, []);

  const sortedLocations = useMemo(() => {
    if (!currentPosition || locations.length === 0) return locations;
    return sortLocationsByDistance(locations, currentPosition[0], currentPosition[1]);
  }, [currentPosition, locations]);

  const markers = useMemo(() => {
    const locationMarkers = sortedLocations.map(loc => ({
      position: [loc.latitude, loc.longitude] as [number, number],
      color: loc.color,
      name: loc.name,
    }));

    if (currentPosition) {
      locationMarkers.unshift({
        position: currentPosition,
        color: DEFAULT_MAP_CONFIG.CURRENT_LOCATION_MARKER.COLOR,
        name: DEFAULT_MAP_CONFIG.CURRENT_LOCATION_MARKER.NAME,
      });
    }

    return locationMarkers;
  }, [currentPosition, sortedLocations]);

  const center = currentPosition || DEFAULT_MAP_CONFIG.CENTER;

  return (
    <Container maxW="6xl" py={8}>
      <Heading size="lg" mb={6}>
        Route Display
      </Heading>
      {isLoading ? (
        <Box textAlign="center" py={8}>
          <Spinner size="xl" />
          <Text mt={4}>Getting your location...</Text>
        </Box>
      ) : (
        <>
          {error && (
            <Box mb={4} p={4} bg="red.50" color="red.600" borderRadius="md">
              {error}
            </Box>
          )}
          <Box h="600px" w="100%">
            <MapWithNoSSR
              center={center}
              zoom={DEFAULT_MAP_CONFIG.ZOOM}
              markers={markers}
              drawRoute={markers.length > 1}
            />
          </Box>
          {locations.length === 0 && <RouteEmptyState />}
        </>
      )}
    </Container>
  );
}
