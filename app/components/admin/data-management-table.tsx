'use client';

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/display/table';
import { Button } from '@/components/ui/inputs/button';
import { Edit, Trash2, Eye, MoreVertical, CheckSquare, Square, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/display/dropdown-menu';
import { Checkbox } from '@/components/ui/inputs/checkbox';

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
  onBulkDelete?: (ids: (string | number)[]) => void;
  onView?: (item: T) => void;
  isLoading?: boolean;
}

export function DataManagementTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onBulkDelete,
  onView,
  isLoading 
}: DataManagementTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(item => item.id));
    }
  };

  const toggleSelect = (id: string | number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (onBulkDelete && selectedIds.length > 0) {
      onBulkDelete(selectedIds);
      setSelectedIds([]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
              {selectedIds.length}
            </div>
            <p className="text-blue-900 font-bold">items selected</p>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleBulkDelete}
            className="rounded-xl gap-2 shadow-lg shadow-red-100"
          >
            <Trash size={16} /> Delete Selected
          </Button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedIds.length === data.length && data.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              {columns.map((col, idx) => (
                <TableHead key={idx} className={col.className}>{col.header}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="h-32 text-center text-gray-500 font-medium">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className={`transition-colors ${selectedIds.includes(item.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.includes(item.id)}
                      onCheckedChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
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
    </div>
  );
}
