"use client"

import { useState, useEffect, useMemo } from "react"
import { Calendar, Clock, MapPin, Phone, CreditCard, Check, MessageCircle, Navigation, Star, User, Gift, AlertCircle, Plus, Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EnhancedBookingCalendar } from "@/components/enhanced-booking-calendar"
import { ProfessionalSelector } from "@/components/professional-selector"
import { BookingConfiguration } from "@/components/booking-configuration"
import { getMultiDayAvailability } from "@/lib/vendor-scheduling"
import { format } from "date-fns"
import { VendorAdapter } from "@/lib/vendor-adapter"
import type { VendorService, Professional, ServiceAddon } from "@/types/vendor"
import type { MarketplaceService } from "@/components/service-card"
import { useAuth } from "@/contexts/auth-context"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service: VendorService | MarketplaceService | null
  vendorName?: string
  vendorRating?: number
  vendorId?: string
  onBookingComplete?: (booking: any) => void
}

type BookingStep = "professional" | "configuration" | "details" | "payment" | "confirmation"

interface BookingData {
  date: Date | undefined
  time: string
  professional: Professional | null
  selectedAddons: ServiceAddon[]
  notes: string
  paymentMethod: "card" | "cash" | "apple_pay"
}

export function BookingModal({ isOpen, onClose, service, vendorName, vendorRating, vendorId, onBookingComplete }: BookingModalProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState<BookingStep>("professional")
  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    time: "",
    professional: null,
    selectedAddons: [],
    notes: "",
    paymentMethod: "card",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [quickAvailability, setQuickAvailability] = useState<Array<{date: Date, time: string}>>([])
  const [error, setError] = useState<string | null>(null)

  // Error boundary and validation
  useEffect(() => {
    if (isOpen && !service) {
      setError("No se pudo cargar la información del servicio")
      console.error("❌ BookingModal opened without service data")
    } else if (isOpen && !vendorId && !vendorName) {
      setError("No se pudo identificar el proveedor")
      console.error("❌ BookingModal opened without vendor identification")
    } else {
      setError(null)
    }
  }, [isOpen, service, vendorId, vendorName])

  // Get vendor data using unified adapter (handles both data sources)
  const vendor = vendorId ? VendorAdapter.findVendor(vendorId) : null
  
  // Set error if vendor not found
  useEffect(() => {
    if (isOpen && vendorId && !vendor) {
      setError(`No se pudo encontrar el proveedor (ID: ${vendorId})`)
    }
  }, [isOpen, vendorId, vendor])
  
  const professionals = vendor?.professionals || []
  
  // Additional service-specific professional filtering
  const serviceProfessionals = useMemo(() => {
    if (!professionals.length || !service) return professionals
    
    // Filter professionals who have specialties matching the service
    const serviceName = service.name || ""
    const relevantProfessionals = professionals.filter(prof => {
      if (!prof.specialties || prof.specialties.length === 0) return true // Include if no specialties defined
      
      // Check if professional has specialties relevant to the service
      const hasRelevantSpecialty = prof.specialties.some(specialty => 
        serviceName.toLowerCase().includes(specialty.toLowerCase()) ||
        specialty.toLowerCase().includes("keratina") ||
        specialty.toLowerCase().includes("tratamiento") ||
        specialty.toLowerCase().includes("alisado")
      )
      
      return hasRelevantSpecialty
    })
    
    // If no professionals match specialties, return all (avoid empty list)
    return relevantProfessionals.length > 0 ? relevantProfessionals : professionals
  }, [professionals, service])

  // Calculate pricing
  const basePrice = typeof service?.price === 'number' ? service.price : parseInt(service?.price?.toString() || '0')
  const totalAddonPrice = bookingData.selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
  const totalAddonDuration = bookingData.selectedAddons.reduce((sum, addon) => sum + (addon.duration || 0), 0)
  const serviceDuration = typeof service?.duration === 'number' ? service.duration : parseInt(service?.duration?.toString() || '60')
  const totalDuration = serviceDuration + totalAddonDuration
  const totalPrice = basePrice + totalAddonPrice

  // Load quick availability preview
  useEffect(() => {
    
    if (service && vendorId) {
      const serviceDuration = typeof service.duration === 'number' ? service.duration : parseInt(service.duration?.toString() || '60')
      
      const availability = getMultiDayAvailability(vendorId, serviceDuration, new Date(), 7)
      
      const quickSlots: Array<{date: Date, time: string}> = []
      
      for (const day of availability) {
        if (day.status === 'available' && day.availableSlots > 0) {
          const availableTimes = day.timeSlots
            .filter(slot => slot.available)
            .slice(0, 2) // Take first 2 available times
          
          availableTimes.forEach(slot => {
            quickSlots.push({
              date: day.date,
              time: slot.time
            })
          })
          
          if (quickSlots.length >= 3) break // Stop after 3 quick options
        }
      }
      
      setQuickAvailability(quickSlots)
    }
  }, [service, vendorId])

  const handleDateSelect = (date: Date | undefined) => {
    setBookingData((prev) => ({ ...prev, date }))
  }

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }))
  }

  const handleProfessionalSelect = (professional: Professional | null) => {
    setBookingData((prev) => ({ ...prev, professional }))
  }

  const handleAddonsChange = (selectedAddons: ServiceAddon[]) => {
    setBookingData((prev) => ({ ...prev, selectedAddons }))
  }

  const handleNext = () => {
    if (currentStep === "professional") {
      setCurrentStep("configuration")
    } else if (currentStep === "configuration" && bookingData.date && bookingData.time) {
      setCurrentStep("details")
    } else if (currentStep === "details") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      handleBooking()
    }

    // Scroll to top of modal on step change
    setTimeout(() => {
      const dialogContent = document.querySelector('[role="dialog"]')
      if (dialogContent) {
        dialogContent.scrollTop = 0
      }
    }, 100)
  }

  const handleBack = () => {
    if (currentStep === "configuration") {
      setCurrentStep("professional")
    } else if (currentStep === "details") {
      setCurrentStep("configuration")
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
    setCurrentStep("professional")
    setBookingData({
      date: undefined,
      time: "",
      professional: null,
      selectedAddons: [],
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
      <DialogContent className="w-[calc(100vw-1rem)] max-w-[96vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-auto px-3 sm:px-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg sm:text-xl font-bold text-femfuel-dark">
            {currentStep === "confirmation" ? "¡Reserva Confirmada!" : "Reservar Servicio"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-femfuel-medium">
            {currentStep === "confirmation" 
              ? "Tu cita ha sido programada exitosamente" 
              : "Selecciona tu profesional preferido y programa tu cita"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar - Only show when not in confirmation step */}
        {currentStep !== "confirmation" && (
          <div className="mb-6 px-1 sm:px-0">
            {/* Mobile: Compact centered step info */}
            <div className="sm:hidden text-center mb-4">
              <div className="text-sm font-medium text-femfuel-dark mb-2">
                Paso {currentStep === "professional" ? "1" : currentStep === "configuration" ? "2" : currentStep === "details" ? "3" : "4"} de 4
              </div>
              <div className="text-xs text-femfuel-medium mb-1">
                {currentStep === "professional" ? "Profesional" : currentStep === "configuration" ? "Fecha y Hora" : currentStep === "details" ? "Detalles" : "Pago"}
              </div>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-femfuel-dark">
                  Paso {currentStep === "professional" ? "1" : currentStep === "configuration" ? "2" : currentStep === "details" ? "3" : "4"} de 4
                </span>
                <span className="text-xs text-femfuel-medium">
                  {currentStep === "professional" ? "Profesional" : currentStep === "configuration" ? "Fecha y Hora" : currentStep === "details" ? "Detalles" : "Pago"}
                </span>
              </div>
              <span className="text-xs text-femfuel-medium">
                {currentStep === "professional" ? "25%" : currentStep === "configuration" ? "50%" : currentStep === "details" ? "75%" : "100%"}
              </span>
            </div>

            {/* Progress bar with dots for mobile, continuous bar for desktop */}
            <div className="relative">
              {/* Desktop continuous bar */}
              <div className="hidden sm:block">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-femfuel-rose via-pink-500 to-purple-500 rounded-full transition-all duration-700 ease-in-out shadow-sm"
                    style={{
                      width: currentStep === "professional" ? "25%" :
                             currentStep === "configuration" ? "50%" :
                             currentStep === "details" ? "75%" : "100%"
                    }}
                  />
                </div>
              </div>

              {/* Mobile: Enhanced progress bar with gradient */}
              <div className="sm:hidden">
                <div className="max-w-64 mx-auto">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-femfuel-rose via-pink-500 to-purple-500 rounded-full transition-all duration-700 ease-in-out shadow-sm"
                      style={{
                        width: currentStep === "professional" ? "25%" :
                               currentStep === "configuration" ? "50%" :
                               currentStep === "details" ? "75%" : "100%"
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-femfuel-medium px-1">
                    <span className={currentStep === "professional" ? "text-femfuel-rose font-bold" : ""}>1</span>
                    <span className={currentStep === "configuration" ? "text-femfuel-rose font-bold" : ""}>2</span>
                    <span className={currentStep === "details" ? "text-femfuel-rose font-bold" : ""}>3</span>
                    <span className={currentStep === "payment" ? "text-femfuel-rose font-bold" : ""}>4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 mx-1 sm:mx-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800">Error</h4>
                  <p className="text-red-700">{error}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClose}
                    className="mt-2 border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Summary */}
        <Card className="mb-6 border-femfuel-rose/10 shadow-md mx-1 sm:mx-0">
          <CardContent className="p-4 sm:p-5">
            {/* Enhanced Vendor Header - Centered and Compact */}
            <div className="text-center mb-3 pb-2 border-b border-femfuel-light">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
                <span className="text-sm font-medium text-femfuel-dark">
                  {vendorName || "Beauty Studio"}
                </span>
                {vendorRating && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs ml-2">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {vendorRating}
                  </Badge>
                )}
              </div>
            </div>

            {/* Service Info - Centered */}
            <div className="mb-4 text-center">
              <h3 className="text-base sm:text-lg font-bold text-femfuel-dark mb-2 line-clamp-2 break-words">{service.name}</h3>
              <p className="text-xs sm:text-sm text-femfuel-medium mb-3 line-clamp-2 break-words">
                Manicure profesional con cuidado de cutículas
              </p>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark text-xs sm:text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.duration} min
                </Badge>
                <span className="text-lg sm:text-xl font-bold text-femfuel-rose break-words">
                  {typeof service.price === 'number' ? `RD$${service.price.toLocaleString()}` : service.price}
                </span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === "professional" && (
          <ProfessionalSelector
            professionals={serviceProfessionals}
            selectedProfessionalId={bookingData.professional?.id}
            onProfessionalSelect={handleProfessionalSelect}
          />
        )}

        {currentStep === "configuration" && (
          <BookingConfiguration
            selectedProfessional={bookingData.professional}
            vendorId={vendorId || 'beauty-studio-rd'}
            serviceDuration={typeof service?.duration === 'number' ? service.duration : parseInt(service?.duration?.toString() || '60')}
            basePrice={typeof service?.price === 'number' ? service.price : parseInt(service?.price?.toString() || '0')}
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            selectedAddons={bookingData.selectedAddons}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
            onAddonsChange={handleAddonsChange}
            onProfessionalChange={() => setCurrentStep("professional")}
          />
        )}

        {currentStep === "details" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-femfuel-dark">
                Detalles de tu Reserva
              </h3>
              <p className="text-sm sm:text-base text-femfuel-medium">
                Revisa y confirma todos los detalles de tu cita
              </p>
            </div>

            {/* Vendor Information */}
            <Card className="border-femfuel-rose/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  {vendorName || vendor?.name || "Salon & Ubicación"}
                  {vendorRating && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {vendorRating}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs sm:text-sm">
                        <MapPin className="h-4 w-4 text-femfuel-medium flex-shrink-0 mt-0.5" />
                        <span className="text-femfuel-dark line-clamp-2">
                          {vendor?.location?.address || "Av. Winston Churchill 1234"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Navigation className="h-4 w-4 text-femfuel-medium" />
                        <span className="text-femfuel-medium">
                          {vendor?.location?.district || "Piantini"} • {vendor?.location?.distance || "1.2km"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-femfuel-medium" />
                        <span className="text-femfuel-medium">
                          {vendor?.contact?.phone || "+1 809-555-0123"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button 
                        className="glassmorphism-button-perfect flex items-center gap-2 text-sm"
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(vendor?.location?.address || "Av. Winston Churchill 1234, Santo Domingo")}`, '_blank')}
                      >
                        <MapPin className="h-4 w-4" />
                        Ver en Mapa
                      </button>
                      <Button 
                        size="sm" 
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => window.open(`https://wa.me/${vendor?.contact?.whatsapp?.replace(/[^\d]/g, '') || "18095550123"}?text=Hola, tengo una cita reservada`, '_blank')}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Professional - Compact Design */}
            {bookingData.professional && (
              <Card className="border-femfuel-purple/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-10 w-10 border border-femfuel-light">
                        <AvatarImage
                          src={bookingData.professional.image}
                          alt={bookingData.professional.name}
                        />
                        <AvatarFallback className="bg-femfuel-light text-femfuel-rose text-sm font-bold">
                          {bookingData.professional.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-femfuel-dark text-sm truncate">{bookingData.professional.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-femfuel-medium">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{bookingData.professional.rating}</span>
                            <span>•</span>
                            <span>{bookingData.professional.yearsExperience}+ años</span>
                          </div>
                        </div>
                        <div className="text-xs text-femfuel-medium truncate">
                          {bookingData.professional.specialties.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 h-7"
                      onClick={() => setCurrentStep("professional")}
                    >
                      Cambiar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appointment Details */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                  <Check className="h-5 w-5" />
                  Cita Confirmada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {bookingData.date?.toLocaleDateString("es-DO", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {bookingData.time} - {
                            // Calculate end time
                            (() => {
                              if (!bookingData.time) return ''
                              const [hours, minutes] = bookingData.time.split(':').map(Number)
                              const endMinutes = hours * 60 + minutes + totalDuration
                              const endHours = Math.floor(endMinutes / 60)
                              const endMins = endMinutes % 60
                              return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
                            })()
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (!bookingData.date || !bookingData.time) return
                          const startDate = new Date(bookingData.date)
                          const [hours, minutes] = bookingData.time.split(":").map(Number)
                          startDate.setHours(hours, minutes)
                          const endDate = new Date(startDate)
                          endDate.setMinutes(endDate.getMinutes() + totalDuration)
                          
                          const event = {
                            title: `${service?.name}${bookingData.professional ? ` - ${bookingData.professional.name}` : ''}`,
                            start: startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
                            end: endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
                            description: `Servicio de belleza reservado a través de FemFuel Beauty`,
                          }
                          
                          const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}`
                          window.open(calendarUrl, "_blank")
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar al calendario
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services & Add-ons */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  Servicios y Complementos
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentStep("configuration")}
                  >
                    Modificar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Base Service */}
                  <div className="flex items-center justify-between p-3 bg-femfuel-light/30 rounded-lg">
                    <div>
                      <h5 className="font-medium text-femfuel-dark">{service?.name}</h5>
                      <p className="text-sm text-femfuel-medium">{serviceDuration} minutos</p>
                    </div>
                    <span className="font-bold text-femfuel-rose">
                      RD${basePrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Add-ons */}
                  {bookingData.selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-3 border border-femfuel-purple/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-femfuel-purple" />
                        <div>
                          <h6 className="font-medium text-femfuel-dark">{addon.name}</h6>
                          <p className="text-sm text-femfuel-medium">
                            +{addon.duration || 0} min
                            {bookingData.professional && bookingData.professional.recommendedAddons.some(ra => ra.id === addon.id) && 
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                ⭐ Recomendado por {bookingData.professional.name}
                              </span>
                            }
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-femfuel-purple">
                        +RD${addon.price.toLocaleString()}
                      </span>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg">
                      <div>
                        <span className="font-bold text-femfuel-dark">Total</span>
                        <p className="text-sm text-femfuel-medium">
                          Duración total: {totalDuration} minutos
                        </p>
                      </div>
                      <span className="font-bold text-femfuel-rose text-xl">
                        RD${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Solicitudes Especiales</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="notes"
                  placeholder="Alergias, preferencias de color, estilo específico, etc."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData((prev) => ({ ...prev, notes: e.target.value }))}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Preparation Tips */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                  <AlertCircle className="h-5 w-5" />
                  Preparación Recomendada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Retira el esmalte anterior si lo tienes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Llega 5 minutos antes de tu cita</span>
                  </div>
                  {bookingData.selectedAddons.some(addon => addon.name.toLowerCase().includes('art')) && (
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Trae fotos de referencia para nail art si tienes ideas específicas</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Hidrата tus cutículas la noche anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-orange-800 mb-1">Política de cancelación:</p>
                    <p className="text-orange-700">
                      Puedes cancelar o reprogramar tu cita hasta 24 horas antes sin costo. 
                      Cancelaciones con menos de 24 horas de anticipación pueden tener un cargo del 50%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "payment" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-femfuel-dark mb-2">Métodos de Pago</h3>
              <p className="text-sm text-femfuel-medium">Elige tu forma de pago preferida</p>
            </div>

            {/* Payment Methods with Glassmorphism */}
            <div className="space-y-2 sm:space-y-3">
              {/* Apple Pay */}
              <div
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                  bookingData.paymentMethod === "apple_pay" 
                    ? "ring-2 ring-femfuel-rose shadow-xl" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: "apple_pay" }))}
              >
                <div className="relative bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-femfuel-dark text-sm sm:text-base">Apple Pay</p>
                        <p className="text-xs sm:text-sm text-femfuel-medium">Pago instantáneo y seguro</p>
                      </div>
                    </div>
                    {bookingData.paymentMethod === "apple_pay" && (
                      <div className="w-8 h-8 bg-femfuel-rose rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Credit/Debit Card with Glassmorphism */}
              <div
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                  bookingData.paymentMethod === "card" 
                    ? "ring-2 ring-femfuel-rose shadow-xl" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: "card" }))}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl backdrop-blur-sm"></div>
                <div className="relative bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-femfuel-dark text-sm sm:text-base">Tarjeta Crédito/Débito</p>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded">Visa</span>
                          <span className="text-xs bg-red-100 text-red-700 px-1.5 sm:px-2 py-0.5 rounded">Mastercard</span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 rounded">Amex</span>
                        </div>
                      </div>
                    </div>
                    {bookingData.paymentMethod === "card" && (
                      <div className="w-8 h-8 bg-femfuel-rose rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pay at Salon with Glassmorphism */}
              <div
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                  bookingData.paymentMethod === "cash" 
                    ? "ring-2 ring-green-500 shadow-xl" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: "cash" }))}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl backdrop-blur-sm"></div>
                <div className="relative bg-white/60 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-femfuel-dark text-sm sm:text-base">Pagar en el Salón</p>
                        <p className="text-xs sm:text-sm text-femfuel-medium">Efectivo o tarjeta física</p>
                      </div>
                    </div>
                    {bookingData.paymentMethod === "cash" && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Price Breakdown */}
            <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Resumen de Pago</span>
                  <Badge variant="outline" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Incluye impuestos
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Service Base Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-femfuel-medium">Servicio base</span>
                    <span className="text-femfuel-dark font-medium">
                      RD${typeof service?.price === 'number' ? service.price.toLocaleString() : parseInt(service?.price?.toString().replace(/[^\d]/g, '') || '0').toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Platform Commission */}
                  <div className="flex justify-between items-center">
                    <span className="text-femfuel-medium flex items-center gap-1">
                      Comisión plataforma
                      <span className="text-xs bg-femfuel-purple text-femfuel-rose px-1.5 py-0.5 rounded">8%</span>
                    </span>
                    <span className="text-femfuel-dark">
                      RD${Math.round((typeof service?.price === 'number' ? service.price : parseInt(service?.price?.toString().replace(/[^\d]/g, '') || '0')) * 0.08).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* ITBIS Tax */}
                  <div className="flex justify-between items-center">
                    <span className="text-femfuel-medium flex items-center gap-1">
                      ITBIS
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">18%</span>
                    </span>
                    <span className="text-femfuel-dark">
                      RD${Math.round((typeof service?.price === 'number' ? service.price : parseInt(service?.price?.toString().replace(/[^\d]/g, '') || '0')) * 1.08 * 0.18).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Addons if any */}
                  {bookingData.selectedAddons.length > 0 && (
                    <>
                      <Separator className="my-2" />
                      {bookingData.selectedAddons.map((addon, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-femfuel-medium text-sm">+ {addon.name}</span>
                          <span className="text-femfuel-dark text-sm">
                            RD${addon.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                  
                  <Separator className="my-3" />
                  
                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-femfuel-dark">Total a pagar</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-femfuel-rose">
                        RD${Math.round(
                          ((typeof service?.price === 'number' ? service.price : parseInt(service?.price?.toString().replace(/[^\d]/g, '') || '0')) * 1.08 * 1.18) +
                          bookingData.selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
                        ).toLocaleString()}
                      </span>
                      <p className="text-xs text-femfuel-medium mt-1">
                        {bookingData.paymentMethod === "apple_pay" ? "Pago instantáneo" : 
                         bookingData.paymentMethod === "card" ? "Pago seguro" : 
                         "Pagar al llegar"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-femfuel-medium">
              <Check className="h-3 w-3 text-green-500" />
              <span>Pago 100% seguro y encriptado</span>
            </div>
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

            <div className="flex flex-col sm:flex-row gap-3 px-2 sm:px-0">
              <Button variant="outline" className="flex-1 bg-transparent min-h-[44px]" onClick={handleWhatsAppConfirmation}>
                <Phone className="h-4 w-4 mr-2" />
                Confirmar por WhatsApp
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent min-h-[44px]" onClick={handleAddToCalendar}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar al calendario
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {currentStep !== "confirmation" && (
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 px-2 sm:px-0">
            <Button variant="outline" className="min-h-[44px] w-full sm:w-auto" onClick={currentStep === "professional" ? handleClose : handleBack}>
              {currentStep === "professional" ? "Cancelar" : "Atrás"}
            </Button>
            <Button
              className="bg-femfuel-rose hover:bg-[#9f1853] min-h-[44px] w-full sm:w-auto"
              onClick={handleNext}
              disabled={(currentStep === "configuration" && (!bookingData.date || !bookingData.time)) || isLoading}
            >
              {isLoading ? "Procesando..." : currentStep === "payment" ? "Confirmar reserva" : "Continuar"}
            </Button>
          </div>
        )}

        {currentStep === "confirmation" && (
          <div className="pt-6 px-2 sm:px-0">
            <Button className="w-full bg-femfuel-rose hover:bg-[#9f1853] min-h-[44px]" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
