'use client';

import React from 'react';
import Link from 'next/link';
import { User, Settings, LogOut, ChevronsUpDown } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarUserCardProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
}

const SidebarUserCard = ({ user }: SidebarUserCardProps) => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD',
  };

  const userData = user || defaultUser;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-myaccent text-white font-main font-semibold">
                {userData.initials}
              </div>
              <div className="flex flex-col items-start flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
                <span className="font-main font-semibold text-sidebar-foreground">
                  {userData.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userData.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto w-4 h-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            side="top"
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-main">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="flex items-center cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarUserCard;
