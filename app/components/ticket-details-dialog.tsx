'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";
import { Badge } from '@/components/ui/display/badge';
import { Button } from '@/components/ui/inputs/button';
import { ticketService } from '@/services/ticketService';
import { toast } from 'sonner';

interface TicketDetailsDialogProps {
  ticket: any;
  trigger: React.ReactNode;
  onUpdate?: () => void;
}

export function TicketDetailsDialog({ ticket, trigger, onUpdate }: TicketDetailsDialogProps) {
  const [loading, setLoading] = React.useState(false);

  const handleUpdateStatus = async (status: string) => {
    setLoading(true);
    try {
      // Use numeric ID
      const numericId = typeof ticket.id === 'string' && ticket.id.startsWith('T-') 
        ? parseInt(ticket.id.replace('T-', '')) 
        : ticket.id;
        
      await ticketService.updateTicketStatus(numericId, { status });
      toast.success('Ticket status updated');
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={
              ticket.priority === 'Urgent' ? 'destructive' :
              ticket.priority === 'High' ? 'default' : 'secondary'
            }>
              {ticket.priority} Priority
            </Badge>
            <span className="text-xs text-gray-500">{ticket.date}</span>
          </div>
          <DialogTitle className="text-2xl">{ticket.subject}</DialogTitle>
          <DialogDescription>
            Raised by: {ticket.customer_name || ticket.customer} ({ticket.customer_email || 'N/A'})
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Description</h4>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {ticket.description || "No description provided."}
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <h4 className="text-sm font-semibold">Update Status</h4>
          <div className="flex flex-wrap gap-2">
            {['Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
              <Button 
                key={status}
                variant={ticket.status === status ? 'default' : 'outline'}
                size="sm"
                disabled={loading}
                onClick={() => handleUpdateStatus(status)}
                className={ticket.status === status ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
