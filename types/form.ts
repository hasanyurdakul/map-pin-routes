export interface LocationFormValues {
  name: string;
  color: string;
  position?: [number, number] | null;
}

export interface LocationFormProps {
  onSubmit: (values: LocationFormValues) => void;
  onSuccess?: () => void;
  initialPosition?: [number, number] | null;
  initialValues?: Partial<LocationFormValues>;
  submitButtonText?: string;
}

export interface FormFieldProps {
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<unknown>) => void;
    onBlur: (e: React.FocusEvent<unknown>) => void;
  };
  meta: {
    touched: boolean;
    error?: string;
  };
}

export interface MarkedLocation {
  id: string;
  name: string;
  color: string;
  latitude: number;
  longitude: number;
}
