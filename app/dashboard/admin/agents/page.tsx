'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Users,
  Search,
  MoreVertical,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  TicketPercent,
  Briefcase,
  UserCircle
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { getUserData } from '@/lib/auth';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/display/table';
import { Badge } from '@/components/ui/display/badge';
import { Avatar, AvatarFallback } from '@/components/ui/display/avatar';
import { Input } from '@/components/ui/inputs/input';
import { adminNavItems } from '@/lib/admin-nav-items';

export default function AgentsPage() {
  const [agentList, setAgentList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const data = getUserData();
    setUser(data);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await adminService.getAgents();
        setAgentList(data);

      } catch (error) {
        console.error('Error fetching agents data:', error);
        toast.error('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAgents = agentList.filter(agent => 
    (agent.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (agent.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin User"}
      userEmail={user?.email || "admin@questtours.com"}
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
          <p className="text-gray-500">Manage your travel agents, their performance, and listings.</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search agents..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Add New Agent</Button>
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Total Tours</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell><div className="h-10 w-40 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-16 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-24 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-10 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-20 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-10 bg-gray-100 rounded ml-auto"></div></TableCell>
                    </TableRow>
                  ))
                ) : filteredAgents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                      No agents found matching "{searchQuery}".
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                              {agent.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-gray-500">{agent.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          agent.status === 'Active' ? 'default' :
                            agent.status === 'Inactive' ? 'secondary' : 'destructive'
                        }>
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{agent.joined}</TableCell>
                      <TableCell>{agent.totalTours}</TableCell>
                      <TableCell className="font-medium text-orange-600">{agent.totalEarnings}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

