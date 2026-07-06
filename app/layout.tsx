import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
