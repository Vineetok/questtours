import { api } from './api';
import type { Ticket } from '@/lib/types';

export interface TicketData {
  subject: string;
  description: string;
  priority: string;
}

export const ticketService = {
  createTicket: (data: TicketData) => {
    return api.post<Ticket>('/tickets', data);
  },
  
  getUserTickets: () => {
    return api.get<Ticket[]>('/tickets/my');
  },
  
  getAllTickets: () => {
    return api.get<Ticket[]>('/tickets/all');
  },
  
  updateTicketStatus: (id: number, data: { status?: string, priority?: string }) => {
    return api.request<Ticket>(`/tickets/${id}`, {
      method: 'PATCH',
      body: data
    });
  }
};
