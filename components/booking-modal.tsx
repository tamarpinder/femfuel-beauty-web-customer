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
import type { Service } from "@/components/service-card"
import { useAuth } from "@/contexts/auth-context"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service: Service | null
  onBookingComplete?: (booking: any) => void
}

type BookingStep = "datetime" | "details" | "payment" | "confirmation"

interface BookingData {
  date: Date | undefined
  time: string
  notes: string
  paymentMethod: "card" | "cash"
}

export function BookingModal({ isOpen, onClose, service, onBookingComplete }: BookingModalProps) {
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

    const message = `Hola! He reservado el servicio "${service.name}" en ${service.vendor} para el ${bookingData.date.toLocaleDateString("es-DO")} a las ${bookingData.time}. ¡Gracias!`
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
      title: `${service.name} - ${service.vendor}`,
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
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                alt={service.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-femfuel-dark">{service.name}</h3>
                <p className="text-sm text-femfuel-medium">{service.vendor}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary" className="bg-femfuel-purple">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.duration} min
                  </Badge>
                  <span className="font-bold text-femfuel-rose">{service.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === "datetime" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-femfuel-dark mb-4">Selecciona fecha y hora</h3>

              {/* Calendar */}
              <div className="mb-6">
                <Label className="text-femfuel-dark mb-2 block">Fecha</Label>
                <CalendarComponent
                  mode="single"
                  selected={bookingData.date}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border"
                />
              </div>

              {/* Time Slots */}
              {bookingData.date && (
                <div>
                  <Label className="text-femfuel-dark mb-2 block">Hora disponible</Label>
                  <div className="grid grid-cols-4 gap-2">
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
                </div>
              )}
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
                    <span className="text-femfuel-dark">{service.vendor}</span>
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
                    <span className="text-femfuel-dark">{service.vendor}</span>
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
