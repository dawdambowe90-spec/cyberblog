import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://cyberblog.vercel.app'),
  title: {
    template: '%s | Cyberblog',
    default: 'Cyberblog - Exploring the Future of Tech & AI',
  },
  description: 'Cyberblog is a premium platform for deep tech insights, featuring AI-assisted writing and real-time analytics.',
  keywords: ['nextjs blog platform', 'ai-powered blog', 'cyberpunk ui blog', 'deep tech', 'future technology'],
  openGraph: {
    title: 'Cyberblog',
    description: 'Exploring the future of technology through bytes and logic.',
    url: 'https://cyberblog.vercel.app',
    siteName: 'Cyberblog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyberblog',
    description: 'Exploring the future of tech and AI.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-400">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
