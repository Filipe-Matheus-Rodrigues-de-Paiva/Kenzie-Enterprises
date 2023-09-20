import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from '@/contexts/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kenzie Empresas',
  description: 'Gerencie o RH de sua empresa',
  authors: [{ name: 'Filipe' }],
  keywords: ['NextJS 13.4', 'Full-stack', 'Kenzie Academy Brasil'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
