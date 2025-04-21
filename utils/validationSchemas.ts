import * as Yup from 'yup';

export const locationFormValidationSchema = Yup.object({
  name: Yup.string().required('Location name is required'),
  color: Yup.string().required('Color is required'),
});
