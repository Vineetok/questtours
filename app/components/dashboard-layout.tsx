'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogOut,
  Search,
  Bell,
} from 'lucide-react';
import { removeAuthToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { 
  User, 
  ChevronUp,
  Settings,
  UserCircle
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/navigation/sidebar';
import { Input } from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/inputs/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/display/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/display/dropdown-menu';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'customer' | 'agent';
  userName?: string;
  userEmail?: string;
  navItems: NavItem[];
}

export function DashboardLayout({ children, role, userName: initialUserName, userEmail: initialUserEmail, navItems }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const userName = user?.name || initialUserName || "User";
  const userEmail = user?.email || initialUserEmail || "";

  const handleLogout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    removeAuthToken();
    router.push('/');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50/50">
        <Sidebar variant="inset" collapsible="icon" className="border-r">
          <SidebarHeader className="h-16 flex items-center justify-between px-6 border-b">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                Q
              </div>
              <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">QuestTours</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-0">
            <SidebarGroup className="py-6">
              <SidebarGroupLabel className="px-6 mb-3 text-xs font-semibold text-gray-600 uppercase tracking-widest">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        tooltip={item.title}
                        className="mx-2 rounded-lg transition-all"
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton 
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl"
                    >
                      <Avatar className="h-8 w-8 rounded-lg border border-blue-100 shadow-sm">
                        <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                        <AvatarFallback className="rounded-lg bg-blue-50 text-blue-600 font-bold">
                          {userName[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ml-2">
                        <span className="truncate font-bold text-gray-900">{userName}</span>
                        <span className="truncate text-xs text-gray-500 font-medium">{userEmail}</span>
                      </div>
                      <ChevronUp className="ml-auto h-4 w-4 text-gray-400 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl p-2 shadow-xl border-gray-100"
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg border border-blue-50">
                          <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                          <AvatarFallback className="rounded-lg bg-blue-50 text-blue-600 font-bold">
                            {userName[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-bold text-gray-900">{userName}</span>
                          <span className="truncate text-xs text-gray-500">{userEmail}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/${role}/profile`} className="flex items-center gap-2 cursor-pointer rounded-lg py-2">
                        <UserCircle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-700">View Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg py-2">
                      <Settings className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-700">Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem 
                      onClick={() => handleLogout()}
                      className="flex items-center gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer rounded-lg py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-bold">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6 sticky top-0 z-10">
            <SidebarTrigger className="-ml-2" />
            <div className="flex-1">
              <div className="relative max-w-md hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-gray-50 pl-10 border-gray-200 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-colors rounded-lg"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar className="h-9 w-9 border-2 border-blue-200">
                      <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">{userName[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-semibold leading-none text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 capitalize mt-0.5">{role}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal py-3">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 break-all">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Account Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

