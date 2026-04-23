import { api } from './api';
import { Enquiry } from '@/lib/types';

export interface EnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const enquiryService = {
  submitEnquiry: (data: EnquiryData) => {
    return api.post<{ message: string; enquiry: Enquiry }>('/admin/enquiries', data);
  }
};
