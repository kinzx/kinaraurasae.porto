import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Kinar Aurasae | Portfolio',
  description: 'Monochrome personal portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col selection:bg-white/20 selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
