import type { Metadata } from 'next';
import { Geist, Geist_Mono, Mona_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Add this for better performance
  preload: true, // Add this for better performance
});

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
  display: 'swap', // Add this for better performance
  preload: true, // Add this for better performance
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap', // Add this for better performance
  preload: true, // Add this for better performance
});

export const metadata: Metadata = {
  title: 'Repute',
  description: 'Manage your reputation with Repute',
  keywords: [
    'reputation',
    'management',
    'reputation management',
    'reputation tracking',
    'reputation monitoring',
    'reputation score',
    'reputation management software',
    'reputation management system',
    'reputation management services',
    'reputation management company',
    'reputation management tool',
    'reputation management platform',
    'reputation management system',
    'reputation management services',
    'reputation management company',
    'reputation management tool',
    'reputation management platform',
    'reputation management system',
    'reputation management services',
    'reputation management company',
    'reputation management tool',
    'reputation management platform',
    'reputation management system',
    'reputation management services',
    'reputation management company',
    'reputation management tool',
    'reputation management platform',
  ],
  authors: [{ name: 'Repute', url: 'https://repute.com' }],
  creator: 'Repute',
  publisher: 'Repute',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${monaSans.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
