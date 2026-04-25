'use client';

import React, { useRef } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { parseCSV } from '@/lib/csv-parser';
import { toast } from 'sonner';


interface CSVUploadButtonProps<T> {
  onUpload: (data: T[]) => Promise<void>;
  label?: string;
  disabled?: boolean;
}

export function CSVUploadButton<T>({ onUpload, label = "Upload CSV", disabled }: CSVUploadButtonProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a valid CSV file');
      return;
    }

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        const data = parseCSV<T>(text);
        if (data.length === 0) {
          toast.error('No valid data found in CSV');
          return;
        }
        await onUpload(data);
        toast.success(`Successfully processed ${data.length} records`);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('CSV Parsing Error:', error);
      toast.error('Failed to parse CSV file');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        aria-label="CSV File Input"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing || disabled}
        className="gap-2 border-dashed border-2 hover:border-blue-600 hover:text-blue-600 transition-all"
      >
        {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
        {label}
      </Button>
    </div>
  );
}
