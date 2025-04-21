import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { Formik, Form, Field as FormikField, FieldProps, FormikHelpers } from 'formik';
import { LocationFormProps, LocationFormValues } from '@/types/form';
import { locationFormValidationSchema } from '@/utils/validationSchemas';
import { LocationNameField } from './LocationNameField';
import { LocationColorField } from './LocationColorField';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const DEFAULT_CENTER: [number, number] = [39.9334, 32.8597];
const DEFAULT_ZOOM = 13;
const DEFAULT_INITIAL_VALUES: LocationFormValues = {
  name: '',
  color: '#FF0000',
  position: null,
};

export const LocationForm = ({
  onSubmit,
  onSuccess,
  initialPosition = null,
  initialValues = DEFAULT_INITIAL_VALUES,
  submitButtonText = 'Add Location',
}: LocationFormProps) => {
  const handleSubmit = async (
    values: LocationFormValues,
    { resetForm }: FormikHelpers<LocationFormValues>
  ) => {
    onSubmit(values);
    if (onSuccess) {
      onSuccess();
    } else {
      resetForm({ values: DEFAULT_INITIAL_VALUES });
    }
  };

  const formInitialValues = {
    ...DEFAULT_INITIAL_VALUES,
    ...initialValues,
    position: initialPosition ?? initialValues.position,
  };

  return (
    <Formik<LocationFormValues>
      initialValues={formInitialValues}
      validationSchema={locationFormValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <>
          <Box h="400px" w="100%" mb={6}>
            <MapWithNoSSR
              center={values.position ? values.position : DEFAULT_CENTER}
              zoom={DEFAULT_ZOOM}
              onMarkerPlaced={position => setFieldValue('position', position)}
              markers={values.position ? [{ position: values.position, color: values.color }] : []}
            />
          </Box>

          <Flex w="100%" justify="center">
            <Box w="100%" maxW="500px">
              <Form>
                <HStack width="100%" gap={2}>
                  <FormikField name="name">
                    {({ field, meta }: FieldProps<string>) => (
                      <LocationNameField field={field} meta={meta} />
                    )}
                  </FormikField>
                  <FormikField name="color">
                    {({ field, meta }: FieldProps<string>) => (
                      <LocationColorField field={field} meta={meta} setFieldValue={setFieldValue} />
                    )}
                  </FormikField>
                  <Button type="submit" colorPalette="blue">
                    {submitButtonText}
                  </Button>
                </HStack>
              </Form>
            </Box>
          </Flex>
        </>
      )}
    </Formik>
  );
};
