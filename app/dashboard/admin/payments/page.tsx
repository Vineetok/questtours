'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { transactions } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { adminNavItems } from '@/lib/admin-nav-items';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/display/table';
import { Badge } from '@/components/ui/display/badge';
import { Input } from '@/components/ui/inputs/input';

export default function PaymentsPage() {
  return (
    <DashboardLayout
      role="admin"
      userName="Admin User"
      userEmail="admin@questtours.com"
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-gray-500">Track transactions, process refunds, and monitor payment status.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              New Transaction
            </Button>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-none shadow-sm bg-green-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-700 font-medium">Successful Payments</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                ₹84,200
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600 font-medium">+12.5% from last week</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-yellow-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-yellow-700 font-medium">Pending Processing</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                ₹12,400
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-yellow-600 font-medium">8 transactions waiting</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-red-50/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-red-700 font-medium">Refunds Processed</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                ₹4,100
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-red-600 font-medium">3 refunds this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Transaction Logs</CardTitle>
                <CardDescription>A detailed list of all system transactions.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by ID or customer..."
                    className="pl-9 bg-white"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {tx.type === 'Payment' ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDownLeft className="h-3 w-3 text-red-600" />
                        )}
                        <span className={tx.type === 'Payment' ? 'text-green-700' : 'text-red-700'}>
                          {tx.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{tx.method}</TableCell>
                    <TableCell>
                      <Badge variant={
                        tx.status === 'Success' ? 'default' :
                          tx.status === 'Pending' ? 'secondary' :
                            tx.status === 'Failed' ? 'destructive' : 'outline'
                      }>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">{tx.date}</TableCell>
                    <TableCell className={`text-right font-semibold ${tx.type === 'Refund' ? 'text-red-600' : ''}`}>
                      {tx.type === 'Refund' ? '-' : ''}{tx.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      {tx.status === 'Success' && tx.type === 'Payment' && (
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          Refund
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

