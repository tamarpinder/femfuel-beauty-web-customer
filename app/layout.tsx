import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { BookingProvider } from "@/contexts/booking-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/sonner"
import { SmartHeader } from "@/components/smart-header"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "FemFuel Beauty - Tu belleza, redefinida",
  description: "Conecta con los mejores profesionales de belleza en República Dominicana. Reserva servicios de uñas, maquillaje, cabello, spa y más. Miles de transformaciones, profesionales verificados.",
  keywords: ["belleza", "salón", "spa", "maquillaje", "uñas", "cabello", "República Dominicana", "Santo Domingo", "beauty", "nail salon"],
  authors: [{ name: "FemFuel Beauty" }],
  creator: "FemFuel Beauty",
  publisher: "FemFuel Beauty",
  openGraph: {
    type: "website",
    locale: "es_DO",
    title: "FemFuel Beauty - Tu belleza, redefinida",
    description: "Conecta con los mejores profesionales de belleza en República Dominicana",
    siteName: "FemFuel Beauty",
    images: [
      {
        url: "/femfuel-logo.png",
        width: 1200,
        height: 630,
        alt: "FemFuel Beauty Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FemFuel Beauty - Tu belleza, redefinida",
    description: "Conecta con los mejores profesionales de belleza en República Dominicana",
    images: ["/femfuel-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Handle potential translation classes that might be added by browser extensions
  const htmlClasses = `${inter.variable} ${playfair.variable} antialiased`

  return (
    <html lang="es" className={htmlClasses} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              <BookingProvider>
                <SmartHeader />
                {children}
                <Toaster />
              </BookingProvider>
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
