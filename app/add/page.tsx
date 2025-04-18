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
import { useState } from 'react';
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

const AddPage = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const addMarkedLocation = useMarkedLocationStore(state => state.addMarkedLocation);

  const handleFormSubmit = (values: { name: string; color: string }, { resetForm }: any) => {
    if (!position) {
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
      latitude: position[0],
      longitude: position[1],
    });

    toaster.create({
      title: 'Success',
      description: 'Location added successfully',
      type: 'success',
    });

    resetForm();
    setPosition(null);
  };

  return (
    <Container maxW="6xl" py={8}>
      <VStack gap={6}>
        <Formik
          initialValues={{ name: '', color: '#FF0000' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ setFieldValue, values }) => (
            <>
              <Box h="400px" w="100%">
                <MapWithNoSSR
                  center={[39.9334, 32.8597]}
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
                        Add Location
                      </Button>
                    </HStack>
                  </Form>
                </Box>
              </Flex>
            </>
          )}
        </Formik>
      </VStack>
    </Container>
  );
};

export default AddPage;
