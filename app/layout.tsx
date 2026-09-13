import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dual-Engine Single-Page Resume Builder',
  description:
    'Single-page resume builder featuring Dual-Engine (ATS Classic & Modern Clean), hard 1-page auto-fit enforcement, Google XYZ formula live bullet analyzer, and JD keyword matcher.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Roboto:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-900/5 text-slate-900 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
