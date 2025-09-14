"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { VendorService } from "@/types/vendor"
import type { Service } from "@/components/service-card"
import { useAuth } from "@/contexts/auth-context"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service: VendorService | Service | null
  vendorName?: string
  vendorRating?: number
  onBookingComplete?: (booking: any) => void
}

type BookingStep = "datetime" | "details" | "payment" | "confirmation"

interface BookingData {
  date: Date | undefined
  time: string
  notes: string
  paymentMethod: "card" | "cash"
}

export function BookingModal({ isOpen, onClose, service, vendorName, vendorRating, onBookingComplete }: BookingModalProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState<BookingStep>("datetime")
  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    time: "",
    notes: "",
    paymentMethod: "card",
  })
  const [isLoading, setIsLoading] = useState(false)

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ]

  const handleDateSelect = (date: Date | undefined) => {
    setBookingData((prev) => ({ ...prev, date }))
  }

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }))
  }

  const handleNext = () => {
    if (currentStep === "datetime" && bookingData.date && bookingData.time) {
      setCurrentStep("details")
    } else if (currentStep === "details") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      handleBooking()
    }
  }

  const handleBack = () => {
    if (currentStep === "details") {
      setCurrentStep("datetime")
    } else if (currentStep === "payment") {
      setCurrentStep("details")
    } else if (currentStep === "confirmation") {
      onClose()
    }
  }

  const handleBooking = async () => {
    if (!service || !user) return

    setIsLoading(true)
    try {
      // Mock booking API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        service,
        user,
        date: bookingData.date,
        time: bookingData.time,
        notes: bookingData.notes,
        paymentMethod: bookingData.paymentMethod,
        status: "confirmed",
        createdAt: new Date(),
      }

      setCurrentStep("confirmation")
      onBookingComplete?.(booking)
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppConfirmation = () => {
    if (!service || !bookingData.date || !bookingData.time) return

    const message = `Hola! He reservado el servicio "${service.name}" ${'featuredProvider' in service && service.featuredProvider ? `con ${service.featuredProvider.name}` : ''} para el ${bookingData.date.toLocaleDateString("es-DO")} a las ${bookingData.time}. ¡Gracias!`
    const whatsappUrl = `https://wa.me/18095550123?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleAddToCalendar = () => {
    if (!service || !bookingData.date || !bookingData.time) return

    const startDate = new Date(bookingData.date)
    const [hours, minutes] = bookingData.time.split(":").map(Number)
    startDate.setHours(hours, minutes)

    const endDate = new Date(startDate)
    const durationMinutes = typeof service.duration === 'string' ? parseInt(service.duration) : service.duration
    endDate.setMinutes(endDate.getMinutes() + durationMinutes)

    const event = {
      title: `${service.name}${'featuredProvider' in service && service.featuredProvider ? ` - ${service.featuredProvider.name}` : ''}`,
      start: startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
      end: endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
      description: `Servicio de belleza reservado a través de FemFuel Beauty`,
    }

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}`
    window.open(calendarUrl, "_blank")
  }

  const resetModal = () => {
    setCurrentStep("datetime")
    setBookingData({
      date: undefined,
      time: "",
      notes: "",
      paymentMethod: "card",
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!service) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-femfuel-dark">
            {currentStep === "confirmation" ? "¡Reserva Confirmada!" : "Reservar Servicio"}
          </DialogTitle>
        </DialogHeader>

        {/* Service Summary */}
        <Card className="mb-6 border-femfuel-rose/10 shadow-md">
          <CardContent className="p-5">
            {/* Enhanced Vendor Header with Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-femfuel-light">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
                <span className="text-sm font-medium text-femfuel-medium">
                  {vendorName || "Beauty Studio"}
                </span>
              </div>
              {vendorRating && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                  ⭐ {vendorRating}
                </Badge>
              )}
            </div>

            {/* Service Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                alt={service.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-femfuel-light"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-femfuel-dark mb-1">{service.name}</h3>
                <p className="text-sm text-femfuel-medium mb-2">
                  Manicure profesional con cuidado de cutículas
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.duration} min
                  </Badge>
                  <span className="text-xl font-bold text-femfuel-rose">
                    {typeof service.price === 'number' ? `RD$${service.price.toLocaleString()}` : service.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Availability Preview */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">📅 Próximos Disponibles:</span>
                <span className="text-xs text-green-600">+3 más</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                  Hoy 2:30 PM
                </Badge>
                <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                  Hoy 4:00 PM
                </Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1">
                  Mañana 10:00 AM
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === "datetime" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-femfuel-dark mb-4">Selecciona fecha y hora</h3>

            {/* Side-by-Side Layout: Calendar + Time Slots */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar Section */}
              <div>
                <Label className="text-femfuel-dark mb-2 block">Fecha</Label>
                <CalendarComponent
                  mode="single"
                  selected={bookingData.date}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border w-full"
                  modifiers={{
                    available: (date) => {
                      // Mock availability - alternate days as available
                      return date > new Date() && date.getDate() % 2 === 0
                    },
                    unavailable: (date) => {
                      // Mock unavailable - odd days (excluding disabled)
                      return date > new Date() && date.getDate() % 2 === 1 && date.getDay() !== 0
                    }
                  }}
                  modifiersStyles={{
                    available: {
                      position: 'relative'
                    },
                    unavailable: {
                      position: 'relative'
                    }
                  }}
                />
                <style jsx global>{`
                  .rdp-day_available::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 6px;
                    height: 6px;
                    background-color: #10b981;
                    border-radius: 50%;
                    opacity: 0.7;
                  }
                  .rdp-day_unavailable::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 6px;
                    height: 6px;
                    background-color: #ef4444;
                    border-radius: 50%;
                    opacity: 0.7;
                  }
                `}</style>
              </div>

              {/* Time Slots Section */}
              <div>
                <Label className="text-femfuel-dark mb-2 block">
                  {bookingData.date ? 'Horarios disponibles' : 'Selecciona una fecha primero'}
                </Label>
                {bookingData.date ? (
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={bookingData.time === time ? "default" : "outline"}
                        size="sm"
                        className={bookingData.time === time ? "bg-femfuel-rose hover:bg-[#9f1853]" : ""}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                    <p className="text-femfuel-medium text-sm">Primero selecciona una fecha</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === "details" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-femfuel-dark">Detalles de la reserva</h3>

            {/* Booking Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-femfuel-dark">
                      {bookingData.date?.toLocaleDateString("es-DO", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-femfuel-dark">{bookingData.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-femfuel-dark">
                      {'featuredProvider' in service && service.featuredProvider ? service.featuredProvider.name : 'Proveedor'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información del cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-femfuel-dark">{user?.name}</p>
                  <p className="text-femfuel-medium">{user?.email}</p>
                  <p className="text-femfuel-medium">{user?.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-femfuel-dark">
                Notas adicionales (opcional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Alguna preferencia especial o comentario..."
                value={bookingData.notes}
                onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {currentStep === "payment" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-femfuel-dark">Método de pago</h3>

            {/* Payment Methods */}
            <div className="space-y-3">
              <Card
                className={`cursor-pointer transition-colors ${bookingData.paymentMethod === "card" ? "ring-2 ring-femfuel-rose" : ""}`}
                onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: "card" }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-femfuel-medium" />
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Tarjeta de crédito/débito</p>
                      <p className="text-sm text-femfuel-medium">Pago seguro en línea</p>
                    </div>
                    {bookingData.paymentMethod === "card" && <Check className="h-5 w-5 text-femfuel-rose" />}
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-colors ${bookingData.paymentMethod === "cash" ? "ring-2 ring-femfuel-rose" : ""}`}
                onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: "cash" }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-femfuel-medium" />
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Pago en el salón</p>
                      <p className="text-sm text-femfuel-medium">Efectivo o tarjeta en el establecimiento</p>
                    </div>
                    {bookingData.paymentMethod === "cash" && <Check className="h-5 w-5 text-femfuel-rose" />}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-femfuel-medium">Servicio</span>
                    <span className="text-femfuel-dark">{service.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-femfuel-medium">Comisión de plataforma</span>
                    <span className="text-femfuel-dark">RD$0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-femfuel-dark">Total</span>
                    <span className="text-femfuel-rose">{service.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "confirmation" && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-2">¡Reserva confirmada!</h3>
              <p className="text-femfuel-medium">
                Tu cita ha sido reservada exitosamente. Recibirás una confirmación por WhatsApp.
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-femfuel-medium">Servicio:</span>
                    <span className="text-femfuel-dark">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-femfuel-medium">Salón:</span>
                    <span className="text-femfuel-dark">
                      {'featuredProvider' in service && service.featuredProvider ? service.featuredProvider.name : 'Proveedor'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-femfuel-medium">Fecha:</span>
                    <span className="text-femfuel-dark">{bookingData.date?.toLocaleDateString("es-DO")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-femfuel-medium">Hora:</span>
                    <span className="text-femfuel-dark">{bookingData.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleWhatsAppConfirmation}>
                <Phone className="h-4 w-4 mr-2" />
                Confirmar por WhatsApp
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleAddToCalendar}>
                <Calendar className="h-4 w-4 mr-2" />
                Agregar al calendario
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {currentStep !== "confirmation" && (
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={currentStep === "datetime" ? handleClose : handleBack}>
              {currentStep === "datetime" ? "Cancelar" : "Atrás"}
            </Button>
            <Button
              className="bg-femfuel-rose hover:bg-[#9f1853]"
              onClick={handleNext}
              disabled={(currentStep === "datetime" && (!bookingData.date || !bookingData.time)) || isLoading}
            >
              {isLoading ? "Procesando..." : currentStep === "payment" ? "Confirmar reserva" : "Continuar"}
            </Button>
          </div>
        )}

        {currentStep === "confirmation" && (
          <div className="pt-6">
            <Button className="w-full bg-femfuel-rose hover:bg-[#9f1853]" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
