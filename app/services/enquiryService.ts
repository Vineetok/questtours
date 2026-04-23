import { api } from './api';

export interface EnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const enquiryService = {
  submitEnquiry: (data: EnquiryData) => {
    return api.post<any>('/admin/enquiries', data);
  }
};
