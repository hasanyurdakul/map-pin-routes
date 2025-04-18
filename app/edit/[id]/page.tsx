'use client';

import {
  Box,
  Button,
  ColorPicker,
  Container,
  Field,
  Flex,
  HStack,
  Input,
  parseColor,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field as FormikField } from 'formik';
import * as Yup from 'yup';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMarkedLocationStore } from '@/store/useMarkedLocationStore';
import { toaster } from '@/components/ui/toaster';

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const validationSchema = Yup.object({
  name: Yup.string().required('Location name is required'),
  color: Yup.string().required('Color is required'),
});

export default function EditLocation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const location = useMarkedLocationStore(state =>
    state.MarkedLocations.find(loc => loc.id === id)
  );
  const updateMarkedLocation = useMarkedLocationStore(state => state.updateMarkedLocation);

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [initialValues, setInitialValues] = useState({ name: '', color: '#FF0000' });
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (location) {
      setInitialValues({
        name: location.name,
        color: location.color,
      });
      setPosition([location.latitude, location.longitude]);
      setMapReady(true);
    }
  }, [location]);

  if (!location) {
    return (
      <Container maxW="6xl" py={8}>
        <Box textAlign="center">Location not found</Box>
      </Container>
    );
  }

  const handleFormSubmit = (values: { name: string; color: string }) => {
    if (!position) {
      toaster.create({
        title: 'Error',
        description: 'Please select a location on the map',
        type: 'error',
      });
      return;
    }

    updateMarkedLocation(id, {
      name: values.name,
      color: values.color,
      latitude: position[0],
      longitude: position[1],
    });

    toaster.create({
      title: 'Success',
      description: 'Location updated successfully',
      type: 'success',
    });

    router.push('/list');
  };

  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6}>
        {mapReady && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize={true}
          >
            {({ setFieldValue, values }) => (
              <>
                <Box h="400px" w="100%">
                  <MapWithNoSSR
                    center={position || [39.9334, 32.8597]}
                    zoom={13}
                    onMarkerPlaced={setPosition}
                    markers={position ? [{ position, color: values.color }] : []}
                  />
                </Box>

                <Flex w="100%" justify="center">
                  <Box w="100%" maxW="500px">
                    <Form>
                      <HStack width="100%" gap={2}>
                        <FormikField name="name">
                          {({ field, meta }: any) => (
                            <Field.Root invalid={meta.touched && meta.error} required flexGrow={1}>
                              <Input {...field} placeholder="Enter location name" />
                            </Field.Root>
                          )}
                        </FormikField>
                        <FormikField name="color">
                          {({ field, meta }: any) => (
                            <Field.Root invalid={meta.touched && meta.error} required>
                              <ColorPicker.Root
                                value={parseColor(field.value)}
                                onValueChange={color => {
                                  setFieldValue('color', color.valueAsString);
                                }}
                              >
                                <ColorPicker.HiddenInput />
                                <ColorPicker.Control>
                                  <ColorPicker.Trigger />
                                </ColorPicker.Control>
                                <Portal>
                                  <ColorPicker.Positioner>
                                    <ColorPicker.Content>
                                      <ColorPicker.Area />
                                      <HStack>
                                        <ColorPicker.EyeDropper size="xs" variant="outline" />
                                        <ColorPicker.Sliders />
                                      </HStack>
                                    </ColorPicker.Content>
                                  </ColorPicker.Positioner>
                                </Portal>
                              </ColorPicker.Root>
                              <Field.ErrorText>{meta.error}</Field.ErrorText>
                            </Field.Root>
                          )}
                        </FormikField>
                        <Button type="submit" colorPalette="blue">
                          Update Location
                        </Button>
                      </HStack>
                    </Form>
                  </Box>
                </Flex>
              </>
            )}
          </Formik>
        )}
      </VStack>
    </Container>
  );
}
