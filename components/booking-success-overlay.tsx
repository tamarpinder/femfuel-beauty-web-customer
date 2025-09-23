"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Star, MapPin, Download, Share2, Home, Plus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/price-utils"
import { VendorService, Professional } from "@/types/vendor"
import { MarketplaceService } from "@/components/service-card"

interface BookingSuccessOverlayProps {
  isVisible: boolean
  onClose: () => void
  bookingData: {
    bookingId: string
    service: VendorService | MarketplaceService
    professional?: Professional
    date: Date
    time: string
    vendorName: string
    totalPrice: number
    totalDuration: number
  }
  onNavigate: (destination: 'bookings' | 'home' | 'new-booking') => void
}

export function BookingSuccessOverlay({ isVisible, onClose, bookingData, onNavigate }: BookingSuccessOverlayProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {

    if (isVisible) {
      setShowConfetti(true)
      // Auto-remove confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, bookingData])

  const handleAddToCalendar = () => {
    const date = bookingData.date || new Date()
    const time = bookingData.time || '09:00'
    const duration = (bookingData as any).totalDuration || (bookingData as any).duration || 60
    const serviceName = (bookingData as any).service?.name || (bookingData as any).serviceName || 'Servicio de Belleza'
    const vendorName = bookingData.vendorName || 'Salon de Belleza'

    const startDate = new Date(date)
    const [hours, minutes] = time.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes))

    const endDate = new Date(startDate.getTime() + duration * 60000)

    const event = {
      title: `${serviceName} - ${vendorName}`,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      details: `Cita de belleza: ${serviceName}${bookingData.professional ? ` con ${bookingData.professional.name}` : ''}\n\nUbicación: ${vendorName}\nID de Reserva: ${bookingData.bookingId || 'N/A'}`
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}`
    window.open(googleCalendarUrl, '_blank')
  }

  const handleShare = async () => {
    const serviceName = (bookingData as any).service?.name || (bookingData as any).serviceName || 'Servicio de Belleza'
    const date = bookingData.date || new Date()
    const time = bookingData.time || '09:00'

    const shareData = {
      title: '¡Reserva Confirmada!',
      text: `Mi cita de ${serviceName} está confirmada para el ${date.toLocaleDateString('es-DO')} a las ${time}`,
      url: window.location.origin
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert('Información copiada al portapapeles')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
      {/* Debug indicator */}
      <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 text-lg z-[10000] font-bold">
        SUCCESS OVERLAY VISIBLE - BUTTONS BELOW
      </div>

      {/* Fixed position navigation - ALWAYS VISIBLE */}
      <div className="fixed bottom-6 left-6 right-6 z-[10001]">
        <div className="max-w-md mx-auto space-y-3 bg-white border-4 border-green-500 p-4 rounded-xl shadow-2xl">
          <h3 className="text-lg font-bold text-center text-green-700">¿Qué hacer ahora?</h3>

          <Button
            onClick={() => {
              onNavigate('bookings')
            }}
            className="w-full bg-femfuel-rose hover:bg-femfuel-rose/90 text-white py-4 text-lg font-bold
                       transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl hover:shadow-femfuel-rose/50
                       active:scale-95 group hover:brightness-110"
          >
            <Calendar className="h-5 w-5 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out" />
            <span className="group-hover:tracking-wide transition-all duration-300 ease-out">Ver Mis Citas</span>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => {
                onNavigate('home')
              }}
              variant="outline"
              className="py-3 text-sm border-2 border-gray-300 hover:border-femfuel-rose hover:bg-femfuel-rose/10 hover:text-femfuel-rose
                         transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg
                         active:scale-95 group"
            >
              <Home className="h-4 w-4 mr-1 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300 ease-out" />
              <span className="group-hover:tracking-wide transition-all duration-300 ease-out">Inicio</span>
            </Button>
            <Button
              onClick={() => {
                onNavigate('new-booking')
              }}
              variant="outline"
              className="py-3 text-sm border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 hover:text-green-700
                         transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg
                         active:scale-95 group"
            >
              <Plus className="h-4 w-4 mr-1 group-hover:scale-125 group-hover:rotate-90 transition-all duration-300 ease-out" />
              <span className="group-hover:tracking-wide transition-all duration-300 ease-out">Nueva Cita</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-femfuel-light/20" />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#22c55e', '#ec4899', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-8">
        <div className="w-full max-w-2xl space-y-6">

          {/* Success Icon and Title */}
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-green-600 mb-3">
              ¡Reserva Confirmada!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Tu cita ha sido reservada exitosamente
            </p>
          </div>

          {/* Booking Reference */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-sm opacity-90 mb-2">Número de Reserva</p>
              <p className="text-3xl font-bold tracking-wider">{bookingData.bookingId || 'N/A'}</p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Detalles de tu Cita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Service */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-femfuel-rose/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-femfuel-rose" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{(bookingData as any).service?.name || (bookingData as any).serviceName || 'Servicio de Belleza'}</h3>
                  <p className="text-sm text-gray-600">{(bookingData as any).totalDuration || (bookingData as any).duration || 60} minutos</p>
                </div>
                <span className="font-bold text-green-600 text-lg">{formatPrice((bookingData as any).totalPrice || 0)}</span>
              </div>

              {/* Professional */}
              {bookingData.professional && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{bookingData.professional.name}</h3>
                    <p className="text-sm text-gray-600">Especialista</p>
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black">
                    {(bookingData.date || new Date()).toLocaleDateString('es-DO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <p className="text-sm text-gray-600">{bookingData.time || '09:00'}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{bookingData.vendorName || 'Salon de Belleza'}</h3>
                  <p className="text-sm text-gray-600">Salon de belleza</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-blue-200 shadow-lg">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCalendar}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Agregar al Calendario
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Actions - PROMINENT PLACEMENT */}
          <div className="space-y-4 bg-white border-4 border-green-500 p-6 rounded-xl shadow-2xl">
            <h3 className="text-xl font-bold text-center text-green-700 mb-4">¿Qué te gustaría hacer ahora?</h3>

            <Button
              onClick={() => {
                onNavigate('bookings')
              }}
              className="w-full bg-femfuel-rose hover:bg-femfuel-rose text-white py-6 text-xl font-bold
                         transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl hover:shadow-femfuel-rose/50
                         active:scale-95 group hover:brightness-110 cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-femfuel-rose focus:ring-offset-2"
            >
              <Calendar className="h-6 w-6 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out" />
              <span className="group-hover:tracking-wide transition-all duration-300 ease-out group-hover:font-black">Ver Mis Citas</span>
              {/* Enhanced hover feedback */}
              <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  onNavigate('home')
                }}
                variant="outline"
                className="py-4 text-lg border-2 border-gray-300 hover:border-femfuel-rose hover:bg-femfuel-rose/10 hover:text-femfuel-rose
                           transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl
                           active:scale-95 group cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-femfuel-rose focus:ring-offset-2"
              >
                <Home className="h-5 w-5 mr-2 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300 ease-out" />
                <span className="group-hover:tracking-wide transition-all duration-300 ease-out group-hover:font-bold">Volver al Inicio</span>
              </Button>
              <Button
                onClick={() => {
                  onNavigate('new-booking')
                }}
                variant="outline"
                className="py-4 text-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 hover:text-green-700
                           transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl
                           active:scale-95 group cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="h-5 w-5 mr-2 group-hover:scale-125 group-hover:rotate-90 transition-all duration-300 ease-out" />
                <span className="group-hover:tracking-wide transition-all duration-300 ease-out group-hover:font-bold">Reservar Otra Cita</span>
              </Button>
            </div>
          </div>

          {/* Important Information */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información Importante
              </h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Recibirás una confirmación por email</li>
                <li>• Te recordaremos tu cita 1 día antes</li>
                <li>• Llega 10 minutos antes de tu cita</li>
                <li>• Puedes reprogramar hasta 24 horas antes</li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}