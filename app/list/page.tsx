'use client';

import { Box, Button, Container, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { MarkedLocation } from '@/types/markedLocation';
import { FiEdit } from 'react-icons/fi';
import { BsTrash2 } from 'react-icons/bs';

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
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Locations</Heading>
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
            <Box flex={1}>
              <Text fontWeight="bold">{location.name}</Text>
              <Text fontSize="sm" color="gray.600">
                Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
              </Text>
            </Box>
            <IconButton onClick={() => handleEdit(location.id)} colorScheme="blue" variant="ghost">
              <FiEdit size={20} />
            </IconButton>
            <IconButton onClick={() => handleDelete(location.id)} colorScheme="red" variant="ghost">
              <BsTrash2 size={20} />
            </IconButton>
          </Flex>
        ))}
        {MarkedLocations.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No locations added yet.</Text>
            <Button mt={4} colorScheme="blue" onClick={() => router.push('/add')}>
              Add Location
            </Button>
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default ListPage;
