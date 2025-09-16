"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface PaymentMethod {
  id: string
  type: "card" | "apple_pay" | "cash"
  cardNumber?: string // Last 4 digits for display
  expiryDate?: string
  cardHolderName?: string
  brand?: "visa" | "mastercard" | "amex" | "discover"
  isDefault?: boolean
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  serviceImage?: string
  vendorId: string
  vendorName: string
  vendorLogo?: string
  vendorRating?: number
  professionalId?: string
  professionalName?: string
  date: Date
  time: string
  duration: number
  price: number
  addons: Array<{
    id: string
    name: string
    price: number
    duration?: number
  }>
  paymentMethod: PaymentMethod
  status: "confirmed" | "upcoming" | "completed" | "cancelled"
  notes?: string
  bookingReference: string
  createdAt: Date
}

interface BookingContextType {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "bookingReference" | "createdAt">) => Booking
  updateBooking: (id: string, updates: Partial<Booking>) => void
  cancelBooking: (id: string) => void
  getUpcomingBookings: () => Booking[]
  getBookingById: (id: string) => Booking | undefined
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

// Generate booking reference number
const generateBookingReference = (): string => {
  const prefix = "FF"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])

  const addBooking = (bookingData: Omit<Booking, "id" | "bookingReference" | "createdAt">): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substring(2, 9),
      bookingReference: generateBookingReference(),
      createdAt: new Date(),
      status: "confirmed"
    }

    setBookings(prev => [newBooking, ...prev])
    return newBooking
  }

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    )
  }

  const cancelBooking = (id: string) => {
    updateBooking(id, { status: "cancelled" })
  }

  const getUpcomingBookings = () => {
    const now = new Date()
    return bookings.filter(booking => {
      const bookingDateTime = new Date(booking.date)
      const [hours, minutes] = booking.time.split(':').map(Number)
      bookingDateTime.setHours(hours, minutes)

      return bookingDateTime > now && booking.status === "confirmed"
    }).sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
  }

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id)
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBooking,
        cancelBooking,
        getUpcomingBookings,
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}