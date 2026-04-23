import { api } from './api';

export interface TicketData {
  subject: string;
  description: string;
  priority: string;
}

export const ticketService = {
  createTicket: (data: TicketData) => {
    return api.post<any>('/tickets', data);
  },
  
  getUserTickets: () => {
    return api.get<any[]>('/tickets/my');
  },
  
  getAllTickets: () => {
    return api.get<any[]>('/tickets/all');
  },
  
  updateTicketStatus: (id: number, data: { status?: string, priority?: string }) => {
    return api.request<any>(`/tickets/${id}`, {
      method: 'PATCH',
      body: data
    });
  }
};
