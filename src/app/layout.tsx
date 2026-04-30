import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guia de Profissionais & Serviços",
  description: "Encontre profissionais e serviços perto de você. Fisioterapia, pilates, pedreiro, lava jato e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              🗺️ GuiaPro
            </Link>
            <nav className="flex gap-4 text-sm font-medium">
              <Link href="/buscar" className="text-gray-600 hover:text-blue-600 transition-colors">Buscar</Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">Admin</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GuiaPro — Todos os direitos reservados
          </div>
        </footer>
      </body>
    </html>
  );
}
