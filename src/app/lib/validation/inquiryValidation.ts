import dayjs, { Dayjs } from 'dayjs';

interface FormDataField {
  name: string;
  email: string;
  phone: string;
  eventDate: Dayjs | null;
  eventType: string;
  numGuests: string;
  budget: string;
  message: string;
}

export const validateField = (fieldName: string, value: string | Dayjs | null): string => {
  let error = '';
  switch (fieldName) {
    case 'name':
      if (typeof value !== 'string' || !value.trim()) error = 'Name is required.';
      break;
    case 'email':
      if (typeof value !== 'string' || !value.trim()) error = 'Email is required.';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email address is invalid.';
      break;
    case 'eventDate':
      if (!value) error = 'Event date is required.';
      else if (dayjs(value).isBefore(dayjs(), 'day')) error = 'Event date must be in the future.';
      break;
    case 'eventType':
      if (typeof value !== 'string' || !value) error = 'Event type is required.';
      break;
    case 'numGuests':
      if (typeof value !== 'string' || !value || parseInt(value) < 1) error = 'Number of guests must be at least 1.';
      break;
    default:
      break;
  }
  return error;
};

export const validateAllInquiryFields = (formData: FormDataField): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const fieldsToValidate = ['name', 'email', 'eventDate', 'eventType', 'numGuests'];

  fieldsToValidate.forEach(field => {
    const value = formData[field as keyof FormDataField];
    const error = validateField(field, value);
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
};