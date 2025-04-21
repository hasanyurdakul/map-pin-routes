'use client';

import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toaster } from '@/components/ui/toaster';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { LocationListItem } from '@/components/list/LocationListItem';
import { EmptyState } from '@/components/list/EmptyState';

const ListPage = () => {
  const router = useRouter();
  const MarkedLocations = useMarkedLocationStore(useCallback(state => state.MarkedLocations, []));
  const deleteMarkedLocation = useMarkedLocationStore(
    useCallback(state => state.deleteMarkedLocation, [])
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteMarkedLocation(id);
      toaster.create({
        title: 'Location deleted.',
        type: 'success',
        duration: 2000,
        closable: true,
      });
    },
    [deleteMarkedLocation]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/edit/${id}`);
    },
    [router]
  );

  const handleAddLocation = useCallback(() => {
    router.push('/add');
  }, [router]);

  const handleShowRoute = useCallback(() => {
    router.push('/route');
  }, [router]);

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6}>
        <Flex alignItems="center" justifyContent="space-between">
          <Box as={'p'}>Locations</Box>
          <Button p={2} colorPalette={'blue'} onClick={handleShowRoute} variant="solid">
            Show Route
          </Button>
        </Flex>
      </Heading>
      <Flex direction="column" gap={4}>
        {MarkedLocations.map(location => (
          <LocationListItem
            key={location.id}
            location={location}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {MarkedLocations.length === 0 && <EmptyState onAddClick={handleAddLocation} />}
      </Flex>
    </Container>
  );
};

export default ListPage;
