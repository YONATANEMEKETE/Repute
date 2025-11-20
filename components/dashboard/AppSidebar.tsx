'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, ChevronRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import SidebarUserCard from '@/components/dashboard/SidebarUserCard';
import xicon from '@/public/icons/x.svg';
import instagramicon from '@/public/icons/instagram.svg';
import tiktokicon from '@/public/icons/tiktok .svg';
import youtubeicon from '@/public/icons/youtube.svg';
import linkedinicon from '@/public/icons/linkedin.svg';
import githubicon from '@/public/icons/github.svg';

// Platform items with their respective icons
const platformItems = [
  {
    name: 'X',
    icon: <Image src={xicon} alt="X" width={20} height={20} />,
    href: '/dashboard/platforms/x',
  },
  {
    name: 'Instagram',
    icon: <Image src={instagramicon} alt="Instagram" width={20} height={20} />,
    href: '/dashboard/platforms/instagram',
  },
  {
    name: 'TikTok',
    icon: <Image src={tiktokicon} alt="TikTok" width={20} height={20} />,
    href: '/dashboard/platforms/tiktok',
  },
  {
    name: 'YouTube',
    icon: <Image src={youtubeicon} alt="YouTube" width={20} height={20} />,
    href: '/dashboard/platforms/youtube',
  },
  {
    name: 'LinkedIn',
    icon: <Image src={linkedinicon} alt="LinkedIn" width={20} height={20} />,
    href: '/dashboard/platforms/linkedin',
  },
  {
    name: 'GitHub',
    icon: <Image src={githubicon} alt="GitHub" width={20} height={20} />,
    href: '/dashboard/platforms/github',
  },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center"
        >
          <Image
            src="/main-logo-rounded.png"
            alt="Repute Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-main font-semibold text-lg text-sidebar-foreground">
              Repute
            </span>
            <span className="text-xs text-muted-foreground">
              Personal Brand Manager
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {/* Dashboard Link */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-main">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Platforms Collapsible */}
          <Collapsible
            defaultOpen={true}
            className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip="Platforms"
                  className="cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 transition-transform [group-data-[state=open]/collapsible:rotate-90]" />
                  <span className="font-main font-medium">Platforms</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {platformItems.map((platform) => (
                    <SidebarMenuSubItem key={platform.name}>
                      <SidebarMenuSubButton asChild>
                        <Link href={platform.href}>
                          {platform.icon as React.ReactNode}
                          <span>{platform.name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarUserCard />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
