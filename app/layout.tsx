import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Tienda DID - Tu tienda de barrio en línea",
  description: "Tienda de barrio en Bosconia, Cesar. Productos frescos, bebidas, abarrotes y más. Envío a domicilio gratis o recoge en tienda.",
  keywords: ["tienda", "barrio", "Bosconia", "Cesar", "productos", "bebidas", "abarrotes", "domicilio"],
  authors: [{ name: "Tienda DID" }],
  openGraph: {
    title: "Tienda DID - Tu tienda de barrio en línea",
    description: "Productos frescos, bebidas, abarrotes y más. Envío a domicilio gratis.",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.className} antialiased bg-slate-50 text-slate-900`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
