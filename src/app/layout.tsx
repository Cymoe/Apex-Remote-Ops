import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-mono',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "APEX Remote Operations - Master Location-Independent Business",
  description: "The Remote Operations Certification That Generated $2M+ in Revenue. Learn to build scalable, sellable location-independent businesses with PADI-style progression and AI mentorship.",
  keywords: "remote operations, location independent business, remote contractor, business exit strategy, remote team management, APEX certification",
  openGraph: {
    title: "APEX Remote Operations Certification",
    description: "Master remote operations like a PADI diver. Build your 7-figure location-independent contracting empire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans bg-carbon-black text-foreground`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              border: '1px solid #2A2A2A',
            },
          }}
        />
      </body>
    </html>
  );
}
