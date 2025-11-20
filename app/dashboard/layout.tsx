'use client';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import AppSidebar from '@/components/dashboard/AppSidebar';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

// Helper function to format breadcrumb labels
const formatBreadcrumbLabel = (segment: string): string => {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const DashboardLayout = ({ children }: Props) => {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/dashboard',
      isLast: segments.length === 1,
    });

    // Add remaining segments
    let currentPath = '';
    for (let i = 1; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      breadcrumbs.push({
        label: formatBreadcrumbLabel(segments[i]),
        href: `/dashboard${currentPath}`,
        isLast: i === segments.length - 1,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-5 bg-background border-b">
          <SidebarTrigger className="cursor-pointer" />
          <Separator orientation="vertical" className="h-6" />
          <nav
            className="flex items-center text-sm text-muted-foreground font-main"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  {breadcrumb.isLast ? (
                    <span className="font-medium text-foreground">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <Link
                      href={breadcrumb.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {breadcrumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="flex-1 overflow-auto px-6 py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
