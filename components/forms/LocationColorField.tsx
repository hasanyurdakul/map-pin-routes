import { ColorPicker, Field, HStack, Portal, parseColor } from '@chakra-ui/react';
import { FormFieldProps } from '@/types/form';

interface LocationColorFieldProps extends FormFieldProps {
  setFieldValue: (field: string, value: string) => void;
}

export const LocationColorField = ({ field, meta, setFieldValue }: LocationColorFieldProps) => (
  <Field.Root invalid={meta.touched && !meta.error} required>
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
);
