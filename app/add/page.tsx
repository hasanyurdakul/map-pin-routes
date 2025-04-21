'use client';

import { Container, VStack } from '@chakra-ui/react';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { toaster } from '@/components/ui/toaster';
import { LocationForm } from '@/components/forms/LocationForm';
import { LocationFormValues } from '@/types/form';

const AddPage = () => {
  const addMarkedLocation = useMarkedLocationStore(state => state.addMarkedLocation);

  const handleFormSubmit = (values: LocationFormValues) => {
    if (!values.position) {
      toaster.create({
        title: 'Error',
        description: 'Please select a location on the map',
        type: 'error',
      });
      return;
    }

    addMarkedLocation({
      name: values.name,
      color: values.color,
      latitude: values.position[0],
      longitude: values.position[1],
    });

    toaster.create({
      title: 'Success',
      description: 'Location added successfully',
      type: 'success',
    });
  };

  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6}>
        <LocationForm onSubmit={handleFormSubmit} />
      </VStack>
    </Container>
  );
};

export default AddPage;
