import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { BookingProvider } from "@/contexts/booking-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "FemFuel Beauty - Tu belleza, redefinida",
  description: "Conecta con los mejores profesionales de belleza en República Dominicana",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Handle potential translation classes that might be added by browser extensions
  const htmlClasses = `${inter.variable} antialiased`
  
  return (
    <html lang="es" className={htmlClasses} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              <BookingProvider>
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
