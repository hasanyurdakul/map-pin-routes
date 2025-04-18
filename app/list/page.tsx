'use client';

import { Box, Button, Container, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { MarkedLocation } from '@/types/markedLocation';
import { FiEdit } from 'react-icons/fi';
import { BsTrash2 } from 'react-icons/bs';
import { ColoredMapMarker } from '@/components/ColoredMapMarker';
import Image from 'next/image';
import { LuMapPin } from 'react-icons/lu';

const ListPage = () => {
  const router = useRouter();
  const { MarkedLocations, removeMarkedLocation } = useMarkedLocationStore();

  const handleDelete = (id: string) => {
    removeMarkedLocation(id);
    toaster.create({
      title: 'Location deleted.',
      type: 'success',
      duration: 2000,
      closable: true,
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6}>
        <Flex alignItems="center" justifyContent="space-between">
          <Box as={'p'}>Locations</Box>
          <Button p={2} colorPalette={'blue'} onClick={() => router.push('/route')} variant="solid">
            Show Route
          </Button>
        </Flex>
      </Heading>
      <Flex direction="column" gap={4}>
        {MarkedLocations.map((location: MarkedLocation) => (
          <Flex
            key={location.id}
            p={4}
            borderRadius="lg"
            alignItems="center"
            gap={4}
            border={'1px solid #E2E8F0'}
          >
            <div>
              <LuMapPin color={location.color} />
            </div>
            <Box flex={1}>
              <Text fontWeight="bold">{location.name}</Text>
              <Text fontSize="sm" color="gray.600">
                Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
              </Text>
            </Box>
            <IconButton onClick={() => handleEdit(location.id)} colorPalette="blue" variant="ghost">
              <FiEdit size={20} />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(location.id)}
              colorPalette="red"
              variant="ghost"
            >
              <BsTrash2 size={20} />
            </IconButton>
          </Flex>
        ))}
        {MarkedLocations.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No locations added yet.</Text>
            <Button mt={4} colorPalette="blue" onClick={() => router.push('/add')}>
              Add Location
            </Button>
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default ListPage;
