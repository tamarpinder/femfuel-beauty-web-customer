"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Star, ArrowLeft, Smartphone, CreditCard, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EnhancedBookingCalendar } from "@/components/enhanced-booking-calendar"
import { ProfessionalSelector } from "@/components/professional-selector"
import { BookingConfiguration } from "@/components/booking-configuration"
import { VendorAdapter } from "@/lib/vendor-adapter"
import type { VendorService, Professional, ServiceAddon } from "@/types/vendor"
import type { MarketplaceService } from "@/components/service-card"
import { useAuth } from "@/contexts/auth-context"
import { useBooking } from "@/contexts/booking-context"
import { ProcessingOverlay } from "@/components/processing-overlay"
import { formatPrice } from "@/lib/price-utils"
import {
  BookingStep,
  BookingData,
  calculatePricing,
  getServiceProfessionals,
  loadQuickAvailability,
  createBookingForContext
} from "./booking/booking-utils"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  service: VendorService | MarketplaceService | null
  vendorName?: string
  vendorRating?: number
  vendorId?: string
  professionalName?: string
  professionalId?: string
  onBookingComplete?: (booking: any) => void
}

export function BookingModal({ isOpen, onClose, service, vendorName, vendorRating, vendorId, professionalName, professionalId, onBookingComplete }: BookingModalProps) {
  const router = useRouter()
  const { user, getDefaultPaymentMethod } = useAuth()
  const { addBooking } = useBooking()
  const [currentStep, setCurrentStep] = useState<BookingStep>("professional")
  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    time: "",
    professional: null,
    selectedAddons: [],
    notes: "",
    paymentMethod: "cash"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false)
  const [quickAvailability, setQuickAvailability] = useState<Array<{date: Date, time: string}>>([])
  const [error, setError] = useState<string | null>(null)
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState<string>('')
  const [completedBooking, setCompletedBooking] = useState<any>(null)

  // Use ref to avoid stale closures with booking data
  const completedBookingRef = useRef<any>(null)

  // Auto-select default payment method when modal opens
  useEffect(() => {
    if (isOpen && user?.paymentMethods) {
      const defaultCard = user.paymentMethods.find(pm => pm.type === 'card' && pm.isDefault)
      if (defaultCard) {
        setSelectedCardId(defaultCard.id)
        setBookingData(prev => ({ ...prev, paymentMethod: 'card' }))
      }
    }
  }, [isOpen, user?.paymentMethods])

  // Improved vendor ID resolution with fallbacks
  const resolvedVendorId = vendorId || (service as any)?.featuredProvider?.id || 'beauty-studio-rd'
  const vendor = VendorAdapter.findVendor(resolvedVendorId)
  const professionals = vendor?.professionals || []
  const serviceProfessionals = getServiceProfessionals(professionals, service)

  const pricing = calculatePricing(service, bookingData.selectedAddons)
  const { basePrice, totalPrice, serviceDuration, totalDuration, subtotal, commission, itbis } = pricing

  useEffect(() => {
    // Only load availability when modal is actually open
    if (!isOpen || !service?.id || !resolvedVendorId || quickAvailability.length > 0) return

    const availability = loadQuickAvailability(service, resolvedVendorId)
    setQuickAvailability(availability)
  }, [isOpen, service?.id, resolvedVendorId, quickAvailability.length])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuickAvailability([])
      setCurrentStep("professional")
      setBookingData({
        date: undefined,
        time: "",
        professional: null,
        selectedAddons: [],
        notes: "",
        paymentMethod: "cash"
      })
      setError(null)
      setIsLoading(false)
      setShowProcessingOverlay(false)
      setCompletedBooking(null)
      completedBookingRef.current = null
    }
  }, [isOpen])

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
    }
  }

  const handleBooking = async () => {
    if (!service || !user || !bookingData.date || !bookingData.time) return

    setIsLoading(true)
    setShowProcessingOverlay(true)

    // Wait for ProcessingOverlay to progress before creating booking
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const bookingForContext = createBookingForContext(
        service,
        bookingData,
        totalDuration,
        totalPrice,
        vendorId,
        vendorName,
        vendorRating,
        vendor,
        getDefaultPaymentMethod
      )

      await addBooking(bookingForContext)

      // Store in both ref and state to avoid stale closure issues and trigger re-renders
      completedBookingRef.current = bookingForContext
      setCompletedBooking(bookingForContext)

      // ProcessingOverlay will handle the rest via onComplete
    } catch (error) {
      console.error('❌ Booking error:', error)
      setError("Error al procesar la reserva. Por favor, intenta de nuevo.")
      setIsLoading(false)
      setShowProcessingOverlay(false)
    }
  }

  // Memoize processing overlay booking data to prevent restarts
  const processingBookingData = useMemo(() => ({
    serviceName: service?.name,
    vendorName: vendorName || vendor?.name,
    date: bookingData.date?.toLocaleDateString('es-DO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: bookingData.time,
    price: totalPrice,
    bookingReference: completedBookingRef.current?.bookingId || completedBookingRef.current?.bookingReference
  }), [service?.name, vendorName, vendor?.name, bookingData.date, bookingData.time, totalPrice])

  // Handler for integrated ProcessingOverlay navigation
  const handleProcessingNavigation = useCallback((destination: 'bookings' | 'home' | 'new-booking') => {

    // Close processing overlay and reset modal
    setShowProcessingOverlay(false)
    setIsLoading(false)

    // Pass booking data to parent and close modal
    const bookingData = completedBookingRef.current
    if (bookingData) {
      onBookingComplete?.(bookingData)
    }

    // Close the booking modal
    onClose()

    // Handle the actual navigation
    if (destination === 'bookings') {
      router.push('/bookings')
    } else if (destination === 'home') {
      router.push('/')
    }
  }, [router, onBookingComplete, onClose])

  // Fallback handler for old ProcessingOverlay behavior (if no navigation provided)
  const handleProcessingComplete = useCallback(() => {
    setShowProcessingOverlay(false)
    setIsLoading(false)

    const bookingData = completedBookingRef.current
    if (bookingData) {
      onBookingComplete?.(bookingData)
    }
  }, [onBookingComplete])


  const canContinue = () => {
    if (currentStep === "professional") {
      return bookingData.professional !== null
    } else if (currentStep === "configuration") {
      return bookingData.date && bookingData.time
    } else if (currentStep === "details") {
      return true
    } else if (currentStep === "payment") {
      return bookingData.paymentMethod !== null
    }
    return false
  }

  const getStepLabel = () => {
    const stepLabels = {
      professional: "Seleccionar Profesional",
      configuration: "Fecha y Hora",
      details: "Detalles de la Reserva",
      payment: "Método de Pago",
      confirmation: "Confirmación"
    }
    return stepLabels[currentStep]
  }

  if (!service) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {currentStep !== "professional" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="p-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <div>
                  <DialogTitle className="text-xl font-bold text-femfuel-dark">
                    {getStepLabel()}
                  </DialogTitle>
                  <DialogDescription className="text-femfuel-medium">
                    Completa los detalles de tu reserva
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Service Information */}
            <Card className="border-femfuel-rose/20 bg-gradient-to-r from-femfuel-light/30 to-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-femfuel-rose/10 rounded-xl flex items-center justify-center">
                      <Clock className="h-8 w-8 text-femfuel-rose" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-femfuel-dark mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-femfuel-medium line-clamp-2">
                        {service.description || "Manicure profesional con cuidado de cutículas"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark">
                      <Clock className="h-3 w-3 mr-1" />
                      {serviceDuration} min
                    </Badge>
                    <span className="text-xl font-bold text-black">
                      {formatPrice(basePrice)}
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
                vendorId={resolvedVendorId}
                serviceDuration={serviceDuration}
                basePrice={basePrice}
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                selectedAddons={bookingData.selectedAddons}
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
                onAddonsChange={handleAddonsChange}
                onProfessionalChange={() => setCurrentStep("professional")}
              />
            )}

            {/* Details Step - Booking Summary */}
            {currentStep === "details" && (
              <div className="space-y-4">
                <Card className="border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Resumen de tu Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Professional Info */}
                    {bookingData.professional && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={bookingData.professional.image} />
                          <AvatarFallback>{bookingData.professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-femfuel-dark">{bookingData.professional.name}</p>
                          <p className="text-sm text-femfuel-medium">{bookingData.professional.specialties?.join(', ')}</p>
                        </div>
                      </div>
                    )}

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-femfuel-rose" />
                      <div className="flex-1">
                        <p className="text-sm text-femfuel-medium">Fecha y Hora</p>
                        <p className="font-semibold text-femfuel-dark">
                          {bookingData.date ? bookingData.date.toLocaleDateString('es-DO', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : ''} - {bookingData.time}
                        </p>
                      </div>
                    </div>

                    {/* Service & Addons */}
                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-femfuel-dark">{service.name}</p>
                          <p className="text-sm text-femfuel-medium">{serviceDuration} min</p>
                        </div>
                        <span className="font-semibold text-black">{formatPrice(basePrice)}</span>
                      </div>

                      {bookingData.selectedAddons.length > 0 && (
                        <div className="pt-2 mt-2 border-t border-gray-200">
                          <p className="text-sm font-semibold text-femfuel-dark mb-2">Servicios adicionales:</p>
                          {bookingData.selectedAddons.map((addon) => (
                            <div key={addon.id} className="flex justify-between items-center py-1">
                              <span className="text-sm text-femfuel-medium">{addon.name}</span>
                              <span className="text-sm font-semibold text-black">+{formatPrice(addon.price)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Subtotal (Service + Add-ons only) */}
                    <div className="flex justify-between items-center p-3 bg-femfuel-rose/5 rounded-lg border border-femfuel-rose/20">
                      <div>
                        <p className="text-lg font-bold text-femfuel-dark">Subtotal Servicios</p>
                        <p className="text-sm text-femfuel-medium">Duración: {totalDuration} min</p>
                      </div>
                      <span className="text-2xl font-bold text-black">{formatPrice(subtotal)}</span>
                    </div>

                    {/* Tax Notice */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Nota:</span> Los impuestos y comisiones se mostrarán en el siguiente paso de pago.
                      </p>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-femfuel-dark">Notas adicionales (opcional)</label>
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-femfuel-rose"
                        rows={3}
                        placeholder="¿Alguna solicitud especial o información que debamos saber?"
                        value={bookingData.notes}
                        onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div className="space-y-4">
                <Card className="border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Método de Pago</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {/* Saved Cards Section - Show first if available */}
                      {user?.paymentMethods && user.paymentMethods.filter(pm => pm.type === 'card').length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-black text-sm">Tarjetas Guardadas</h4>
                          {user.paymentMethods.filter(pm => pm.type === 'card').map(card => (
                            <label key={card.id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                              style={{ borderColor: bookingData.paymentMethod === 'card' && selectedCardId === card.id ? 'var(--femfuel-rose)' : '#e5e7eb' }}>
                              <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={bookingData.paymentMethod === 'card' && selectedCardId === card.id}
                                onChange={() => {
                                  setBookingData(prev => ({ ...prev, paymentMethod: 'card' }))
                                  setSelectedCardId(card.id)
                                }}
                                className="mr-3"
                              />
                              <div className="flex items-center justify-between flex-1">
                                <div className="flex items-center gap-3">
                                  <CreditCard className="h-6 w-6 text-gray-600" />
                                  <div>
                                    <p className="font-medium text-black">•••• {card.cardNumber}</p>
                                    <p className="text-sm text-gray-500">{card.brand ? (card.brand.charAt(0).toUpperCase() + card.brand.slice(1)) : 'Tarjeta'} - Expira {card.expiryDate}</p>
                                  </div>
                                </div>
                                {card.isDefault && (
                                  <Badge className="bg-femfuel-light text-femfuel-dark text-xs">Predeterminada</Badge>
                                )}
                              </div>
                            </label>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full border-dashed border-gray-300 text-black hover:bg-gray-50 mt-2"
                            onClick={() => setShowAddCardModal(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar nueva tarjeta
                          </Button>
                        </div>
                      )}

                      {/* Add New Card Option - Show if no cards available */}
                      {(!user?.paymentMethods || user.paymentMethods.filter(pm => pm.type === 'card').length === 0) && (
                        <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                          style={{ borderColor: bookingData.paymentMethod === 'card' ? 'var(--femfuel-rose)' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={bookingData.paymentMethod === 'card'}
                            onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                            className="mr-3"
                          />
                          <div className="flex items-center justify-between flex-1">
                            <div>
                              <p className="font-semibold text-black">Tarjeta de Crédito/Débito</p>
                              <p className="text-sm text-gray-600">Pago seguro con tarjeta</p>
                            </div>
                            <CreditCard className="h-8 w-8 text-gray-700" />
                          </div>
                        </label>
                      )}

                      {/* Show add card button when card is selected but no card chosen */}
                      {bookingData.paymentMethod === 'card' && (!user?.paymentMethods || user.paymentMethods.filter(pm => pm.type === 'card').length === 0) && (
                        <div className="ml-8 mt-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full border-dashed border-gray-300 text-black hover:bg-gray-50"
                            onClick={() => setShowAddCardModal(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar tarjeta
                          </Button>
                        </div>
                      )}

                      {/* Cash Option */}
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                        style={{ borderColor: bookingData.paymentMethod === 'cash' ? 'var(--femfuel-rose)' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={bookingData.paymentMethod === 'cash'}
                          onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                          className="mr-3"
                        />
                        <div className="flex items-center justify-between flex-1">
                          <div>
                            <p className="font-semibold text-black">Efectivo</p>
                            <p className="text-sm text-gray-600">Pagar en el establecimiento</p>
                          </div>
                          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </label>

                      {/* Apple Pay Option */}
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                        style={{ borderColor: bookingData.paymentMethod === 'apple_pay' ? 'var(--femfuel-rose)' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="payment"
                          value="apple_pay"
                          checked={bookingData.paymentMethod === 'apple_pay'}
                          onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                          className="mr-3"
                        />
                        <div className="flex items-center justify-between flex-1">
                          <div>
                            <p className="font-semibold text-black">Apple Pay</p>
                            <p className="text-sm text-gray-600">Pago rápido y seguro</p>
                          </div>
                          <Smartphone className="h-8 w-8 text-femfuel-dark" />
                        </div>
                      </label>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Comisión (8%)</span>
                        <span className="font-semibold text-black">{formatPrice(commission)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">ITBIS (18%)</span>
                        <span className="font-semibold text-black">{formatPrice(itbis)}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-gray-300 flex justify-between items-center">
                        <span className="text-lg font-bold text-black">Total</span>
                        <span className="text-xl font-bold text-black">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="text-xs text-femfuel-medium text-center">
                      Al confirmar tu reserva, aceptas nuestros
                      <button className="text-femfuel-rose hover:underline mx-1">términos y condiciones</button>
                      y
                      <button className="text-femfuel-rose hover:underline mx-1">política de cancelación</button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}


            {/* Action Buttons */}
            <div className={`${
              currentStep === "configuration" && bookingData.date && bookingData.time
                ? "sticky bottom-0 bg-white border-t-2 border-femfuel-rose/20 shadow-lg z-10"
                : ""
            } flex justify-between pt-4 px-6 -mx-6 border-t border-gray-200`}>
              <div></div>
              <Button
                onClick={handleNext}
                disabled={!canContinue() || isLoading}
                className={`bg-femfuel-rose hover:bg-femfuel-rose/90 px-8 ${
                  currentStep === "configuration" && bookingData.date && bookingData.time
                    ? "animate-pulse shadow-lg"
                    : ""
                }`}
              >
                {isLoading ? "Procesando..." : currentStep === "payment" ? "Confirmar reserva" : "Continuar"}
              </Button>
            </div>

            {/* Mobile Sticky Continue Button for Configuration Step */}
            {currentStep === "configuration" && bookingData.date && bookingData.time && (
              <div className="block sm:hidden fixed bottom-20 left-4 right-4 z-50">
                <Button
                  onClick={handleNext}
                  disabled={!canContinue() || isLoading}
                  className="w-full bg-femfuel-rose hover:bg-femfuel-rose/90 h-12 text-base font-semibold shadow-xl border-2 border-white animate-bounce"
                >
                  ✅ Continuar con la Reserva
                </Button>
              </div>
            )}

          </div>
        </DialogContent>
      </Dialog>

      {/* Add Card Modal */}
      <Dialog open={showAddCardModal} onOpenChange={setShowAddCardModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Tarjeta</DialogTitle>
            <DialogDescription>
              Ingresa los detalles de tu tarjeta de crédito o débito
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-black mb-1">
                Número de tarjeta
              </label>
              <input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-black mb-1">
                  Fecha de vencimiento
                </label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/AA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                  maxLength={5}
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-black mb-1">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-black mb-1">
                Nombre del titular
              </label>
              <input
                id="cardholderName"
                type="text"
                placeholder="Juan Pérez"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-femfuel-rose"
              />
            </div>

            <div className="flex items-center">
              <input
                id="setDefault"
                type="checkbox"
                className="h-4 w-4 text-femfuel-rose border-gray-300 rounded focus:ring-femfuel-rose"
              />
              <label htmlFor="setDefault" className="ml-2 text-sm text-gray-600">
                Establecer como tarjeta predeterminada
              </label>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Tu información está segura y encriptada</span>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAddCardModal(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white"
              onClick={() => {
                // TODO: Add card logic
                setShowAddCardModal(false)
                // Show success message
              }}
            >
              Guardar Tarjeta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showProcessingOverlay && (
        <ProcessingOverlay
          isVisible={showProcessingOverlay}
          onComplete={handleProcessingComplete}
          bookingData={processingBookingData}
          fullBookingData={completedBooking}
          onNavigate={handleProcessingNavigation}
        />
      )}
    </>
  )
}