'use client';

import { Container, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { toaster } from '@/components/ui/toaster';
import { LocationForm } from '@/components/forms/LocationForm';
import { LocationFormValues, MarkedLocation } from '@/types/form';

interface EditPageProps {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: EditPageProps) => {
  const router = useRouter();
  const [location, setLocation] = useState<MarkedLocation | null>(null);
  const store = useMarkedLocationStore();

  useEffect(() => {
    const locationData = store.getMarkedLocation(params.id);
    if (!locationData) {
      toaster.create({
        title: 'Error',
        description: 'Location not found',
        type: 'error',
      });
      router.push('/list');
      return;
    }
    setLocation(locationData);
  }, [params.id, router, store]);

  const handleFormSubmit = (values: LocationFormValues) => {
    if (!values.position) {
      toaster.create({
        title: 'Error',
        description: 'Please select a location on the map',
        type: 'error',
      });
      return;
    }

    store.updateMarkedLocation(params.id, {
      name: values.name,
      color: values.color,
      latitude: values.position[0],
      longitude: values.position[1],
    });

    toaster.create({
      title: 'Success',
      description: 'Location updated successfully',
      type: 'success',
    });

    router.push('/list');
  };

  if (!location) {
    return null;
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6}>
        <LocationForm
          onSubmit={handleFormSubmit}
          initialValues={{
            name: location.name,
            color: location.color,
            position: [location.latitude, location.longitude],
          }}
          submitButtonText="Update Location"
        />
      </VStack>
    </Container>
  );
};

export default EditPage;
