'use client';

import { Box, Container, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { MarkedLocation } from '@/types/markedLocation';

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
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
}

function sortLocationsByDistance(
  locations: MarkedLocation[],
  currentLat: number,
  currentLon: number
): MarkedLocation[] {
  return [...locations].sort((a, b) => {
    const distA = calculateDistance(currentLat, currentLon, a.latitude, a.longitude);
    const distB = calculateDistance(currentLat, currentLon, b.latitude, b.longitude);
    return distA - distB;
  });
}

export default function RouteDisplay() {
  const locations = useMarkedLocationStore(state => state.MarkedLocations);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [sortedLocations, setSortedLocations] = useState<MarkedLocation[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos: [number, number] = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(pos);

          if (locations.length > 0) {
            const sorted = sortLocationsByDistance(locations, pos[0], pos[1]);
            setSortedLocations(sorted);
          }
        },
        () => {
          // If geolocation fails, use a default position (Ankara)
          const defaultPos: [number, number] = [39.9334, 32.8597];
          setCurrentPosition(defaultPos);

          if (locations.length > 0) {
            const sorted = sortLocationsByDistance(locations, defaultPos[0], defaultPos[1]);
            setSortedLocations(sorted);
          }
        }
      );
    }
  }, [locations]);

  const center = currentPosition || [39.9334, 32.8597];
  const markers = sortedLocations.map(loc => ({
    position: [loc.latitude, loc.longitude] as [number, number],
    color: loc.color,
    name: loc.name,
  }));

  if (currentPosition) {
    markers.unshift({
      position: currentPosition,
      color: '#000000', // Black color for current position
      name: 'Current Location',
    });
  }

  return (
    <Container maxW="6xl" py={8}>
      <Heading size="lg" mb={6}>
        Route Display
      </Heading>
      <Box h="600px" w="100%">
        <MapWithNoSSR center={center} zoom={13} markers={markers} drawRoute={true} />
      </Box>
    </Container>
  );
}
