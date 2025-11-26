import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
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
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className={`${manrope.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
