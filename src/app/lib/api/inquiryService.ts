import { Dayjs } from 'dayjs';

interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  eventDate: string; 
  eventType: string;
  numGuests: string;
  budget: string;
  message: string;
}

interface InquiryApiResponse {
  message: string;
}

export const submitInquiry = async (formData: {
  name: string;
  email: string;
  phone: string;
  eventDate: Dayjs | null;
  eventType: string;
  numGuests: string;
  budget: string;
  message: string;
}): Promise<InquiryApiResponse> => {
  const payload: InquiryPayload = {
    ...formData,
    eventDate: formData.eventDate ? formData.eventDate.format('YYYY-MM-DD') : '',
  };

  const response = await fetch('/api/submit-inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: InquiryApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit inquiry.');
  }

  return data;
};