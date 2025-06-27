import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';

import { submitInquiry } from '../lib/api/inquiryService';
import { validateField, validateAllInquiryFields } from '../lib/validation/inquiryValidation';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: Dayjs | null;
  eventType: string;
  numGuests: string;
  budget: string;
  message: string;
}

export const useInquiryForm = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: null,
    eventType: '',
    numGuests: '',
    budget: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: null,
      eventType: '',
      numGuests: '',
      budget: '',
      message: '',
    });
    setErrors({});
    setStatusMessage(null); 
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | Dayjs | null,
    fieldName?: string
  ) => {
    if (fieldName) {
      if (e && typeof e === 'object' && 'target' in e) {
        const target = e.target as { name: string; value: string };
        setFormData(prev => ({ ...prev, [target.name]: target.value }));
        const error = validateField(target.name, target.value);
        setErrors(prev => ({ ...prev, [target.name]: error }));
      } else {
        console.error("Error: Expected event object with 'target' when 'name' is provided.", e);
      }
    } else {
      const dateValue = e as Dayjs | null;
      setFormData(prev => ({ ...prev, eventDate: dateValue }));
      const error = validateField('eventDate', dateValue);
      setErrors(prev => ({ ...prev, eventDate: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    const newErrors = validateAllInquiryFields(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatusMessage({ type: 'error', message: 'Please correct the errors in the form.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ type: 'info', message: 'Submitting your inquiry...' });

    try {
      const data = await submitInquiry(formData);
      setStatusMessage({ type: 'success', message: data.message || 'Inquiry submitted successfully! We will contact you shortly.' });
      resetForm();
    } catch (error: unknown) { 
      console.error('Submission error:', error);
      if (error instanceof Error) {
        setStatusMessage({ type: 'error', message: error.message || 'There was an error submitting your inquiry. Please try again.' });
      } else {
        setStatusMessage({ type: 'error', message: 'An unexpected error occurred during submission. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    statusMessage,
    isSubmitting,
    errors,
  };
};