'use client';

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/display/table';
import { Button } from '@/components/ui/inputs/button';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/display/dropdown-menu';
import Image from 'next/image';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onView?: (item: T) => void;
  isLoading?: boolean;
}

export function DataManagementTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onView,
  isLoading 
}: DataManagementTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className={col.className}>{col.header}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-32 text-center text-gray-500">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col, idx) => (
                  <TableCell key={idx} className={col.className}>
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-gray-100">
                      {onView && (
                        <DropdownMenuItem onClick={() => onView(item)} className="gap-2 cursor-pointer">
                          <Eye className="h-4 w-4 text-blue-500" /> View Details
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onEdit(item)} className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4 text-amber-500" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(item)} className="gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer font-medium">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
