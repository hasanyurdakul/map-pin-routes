import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { Container } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <Container fluid centerContent>
            <Navbar />
            {/* Page Content  */}
            <Container maxW={'4xl'} fluid minHeight={'100vh'} p={{ base: 2, md: 4 }}>
              {children}
            </Container>
          </Container>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
