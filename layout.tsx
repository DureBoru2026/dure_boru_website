import type {Metadata} from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'DURE-BORU AI - Modern Customer Service & Digital Resource Platform',
  description: 'Intelligent customer service and digital resource hub recommending premium promotional products, templates, e-books, AI tools, and more.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-brand-text bg-brand-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
