import { Field, Input } from '@chakra-ui/react';
import { FormFieldProps } from '@/types/form';

export const LocationNameField = ({ field, meta }: FormFieldProps) => (
  <Field.Root invalid={meta.touched && !meta.error} required flexGrow={1}>
    <Input {...field} placeholder="Enter location name" />
  </Field.Root>
);
