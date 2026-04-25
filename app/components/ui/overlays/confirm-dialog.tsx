'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
    DialogTitle,
} from '@/components/ui/overlays/dialog';
import { Button } from '@/components/ui/inputs/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'destructive' | 'primary';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'destructive',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              variant === 'destructive' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {variant === 'destructive' ? <Trash2 size={24} /> : <AlertTriangle size={24} />}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-black text-slate-900">{title}</DialogTitle>
              <DialogDescription className="text-slate-500 leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 flex flex-row items-center gap-3 border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-xl h-12 font-bold text-slate-600 hover:bg-slate-200"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={onConfirm}
            className={`flex-1 rounded-xl h-12 font-black shadow-lg ${
              variant === 'destructive' ? 'shadow-red-200 bg-red-600 hover:bg-red-700' : 'shadow-blue-200 bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
