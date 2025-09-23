"use client"

import { useEffect, useState, useRef } from "react"
import { Check, CreditCard, Calendar, Sparkles, Star, MapPin, Clock, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/price-utils"

interface ProcessingOverlayProps {
  isVisible: boolean
  onComplete?: () => void
  bookingData?: {
    serviceName?: string
    vendorName?: string
    date?: string
    time?: string
    price?: number
    bookingReference?: string
  }
  // Enhanced props for integrated success state
  fullBookingData?: any
  onNavigate?: (destination: 'bookings' | 'home' | 'new-booking') => void
}

const steps = [
  {
    id: "payment",
    label: "Procesando pago seguro",
    subtitle: "Verificando método de pago...",
    icon: CreditCard,
    duration: 2000
  },
  {
    id: "booking",
    label: "Confirmando disponibilidad",
    subtitle: "Reservando tu cita...",
    icon: Calendar,
    duration: 2000
  },
  {
    id: "success",
    label: "Reserva Confirmada",
    subtitle: "Todo listo para tu cita",
    icon: Check,
    duration: 1500
  }
]

export function ProcessingOverlay({ isVisible, onComplete, bookingData, fullBookingData, onNavigate }: ProcessingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showNavigationState, setShowNavigationState] = useState(false)
  const [progress, setProgress] = useState(0)
  const animationRunningRef = useRef(false)

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0)
      setShowSuccess(false)
      setShowNavigationState(false)
      setProgress(0)
      animationRunningRef.current = false
      return
    }

    // Prevent multiple concurrent animations using ref
    if (animationRunningRef.current) {
      return
    }

    animationRunningRef.current = true

    let progressInterval: NodeJS.Timeout
    let stepTimeout: NodeJS.Timeout

    // Animate progress smoothly
    progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (steps.reduce((acc, step) => acc + step.duration, 0) / 50)
        return Math.min(prev + increment, 100)
      })
    }, 50)

    // Progress through steps
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => {
          stepTimeout = setTimeout(resolve, steps[i].duration)
        })
      }

      // Show success state
      setShowSuccess(true)

      setTimeout(() => {
        if (onNavigate) {
          setShowNavigationState(true)
          // Don't call onComplete - keep overlay visible for user choice
        } else {
          animationRunningRef.current = false
          onComplete?.()
        }
      }, 1500)
    }

    processSteps()

    return () => {
      clearInterval(progressInterval)
      clearTimeout(stepTimeout)
      animationRunningRef.current = false
    }
  }, [isVisible]) // Only depend on isVisible to prevent restart loops

  if (!isVisible) return null

  const CurrentIcon = steps[currentStep]?.icon || Check

  return (
    <div className="fixed inset-0 z-[9999] h-screen h-dvh overflow-hidden">
      {/* Full-screen gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-femfuel-rose to-orange-500 animate-in fade-in-0 duration-700" />


      {/* Modern responsive container - content-driven height */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-12">
        {/* Main content card with flexible height */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 animate-in zoom-in-95 duration-700 min-h-fit max-h-[calc(100vh-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto scrollbar-hide">

          {/* Logo and branding */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">FemFuel Beauty</div>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto" />
          </div>

          {/* Progress visualization */}
          <div className="relative mb-4 sm:mb-6 md:mb-8">
            {/* Large circular progress - responsive sizing */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 192 192">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88 - (progress / 100) * 2 * Math.PI * 88}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {showSuccess ? (
                  <div className="text-center animate-in zoom-in-50 duration-700">
                    <div className="relative">
                      <Check className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 text-white mx-auto mb-1 sm:mb-2 animate-in zoom-in-75 duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full border-4 border-white/30 animate-ping" />
                      </div>
                    </div>
                    <div className="text-white text-base sm:text-lg font-bold">Confirmado</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <CurrentIcon
                      className={cn(
                        "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white mx-auto mb-2 sm:mb-3 transition-all duration-500",
                        currentStep === 0 ? "animate-pulse" :
                        currentStep === 1 ? "animate-bounce" :
                        "animate-spin"
                      )}
                    />
                    <div className="text-white text-base sm:text-lg font-semibold">
                      {Math.round(progress)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step information */}
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
              {showSuccess ? "Reserva Confirmada" : steps[currentStep]?.label}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm">
              {showSuccess ? "Todo listo para tu cita de belleza" : steps[currentStep]?.subtitle}
            </p>
          </div>

          {/* Booking details - shown during processing only, hidden in navigation state */}
          {bookingData && !showNavigationState && (
            <div className="bg-white/10 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 md:mb-6 border border-white/20">
              <div className="space-y-3">
                {bookingData.serviceName && (
                  <div className="flex items-center gap-3 text-white">
                    <Sparkles className="h-4 w-4 text-pink-300" />
                    <span className="font-medium">{bookingData.serviceName}</span>
                  </div>
                )}
                {bookingData.vendorName && (
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="h-4 w-4 text-purple-300" />
                    <span>{bookingData.vendorName}</span>
                  </div>
                )}
                {bookingData.date && bookingData.time && (
                  <div className="flex items-center gap-3 text-white">
                    <Clock className="h-4 w-4 text-orange-300" />
                    <span>{bookingData.date} - {bookingData.time}</span>
                  </div>
                )}
                {bookingData.price && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      RD${bookingData.price.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step indicators */}
          {!showSuccess && (
            <div className="flex justify-center gap-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    index <= currentStep
                      ? "bg-white w-8"
                      : "bg-white/30 w-4"
                  )}
                />
              ))}
            </div>
          )}

          {/* Success extras */}
          {showSuccess && bookingData?.bookingReference && (
            <div className="text-center mt-2 sm:mt-3 md:mt-4">
              <div className="bg-white/20 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 inline-block">
                <div className="text-white/80 text-xs">Código de reserva</div>
                <div className="text-white font-bold text-sm sm:text-lg">{bookingData.bookingReference}</div>
              </div>
            </div>
          )}

          {/* Integrated Navigation State - Glassmorphic Buttons */}
          {showNavigationState && (
            <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-2 sm:mt-3 md:mt-4 animate-in slide-in-from-bottom-4 duration-700">
              {/* Enhanced booking details */}
              <div className="bg-white/10 rounded-2xl p-2.5 sm:p-3 border border-white/20 backdrop-blur-md">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-300" />
                    <span className="font-medium text-xs sm:text-sm">{fullBookingData?.service?.name || fullBookingData?.serviceName || bookingData?.serviceName || 'Servicio de Belleza'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-300" />
                    <span className="text-xs sm:text-sm">{fullBookingData?.vendorName || bookingData?.vendorName || 'Salon de Belleza'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-300" />
                    <span className="text-xs sm:text-sm">{fullBookingData?.date?.toLocaleDateString?.('es-DO') || bookingData?.date || 'Fecha'} - {fullBookingData?.time || bookingData?.time || 'Hora'}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">
                      {formatPrice(fullBookingData?.totalPrice || fullBookingData?.price || bookingData?.price || 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="text-center">
                <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1">¿Qué hacer ahora?</h3>
                <p className="text-white/80 text-xs mb-2 sm:mb-3 md:mb-4">Elige tu próxima acción</p>
              </div>

              {/* Enhanced Glassmorphic Navigation Buttons */}
              <div className="space-y-2 sm:space-y-3">
                {/* Primary Action - Ver Mis Citas */}
                <button
                  onClick={() => {
                    onNavigate?.('bookings')
                  }}
                  className="relative z-10 w-full bg-white/20 hover:bg-femfuel-rose backdrop-blur-md
                           border border-white/30 hover:border-femfuel-rose rounded-xl p-3 sm:p-4
                           text-white font-semibold transition-all duration-300 ease-out
                           hover:scale-105 hover:shadow-2xl hover:shadow-femfuel-rose/50
                           active:scale-95 group transform cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-femfuel-rose focus:ring-offset-2
                           hover:brightness-110"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out" />
                    <span className="text-sm sm:text-base group-hover:tracking-wide transition-all duration-300 ease-out group-hover:font-bold">Ver Mis Citas</span>
                  </div>
                  {/* Enhanced hover feedback */}
                  <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Secondary Action - Inicio */}
                <button
                  onClick={() => {
                    onNavigate?.('home')
                  }}
                  className="relative z-10 w-full bg-white/15 hover:bg-white/40 backdrop-blur-md
                           border border-white/20 hover:border-white/80 rounded-xl p-3 sm:p-4
                           text-white font-medium transition-all duration-300 ease-out
                           hover:scale-105 hover:shadow-xl hover:shadow-white/50
                           active:scale-95 group transform cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
                           hover:brightness-110"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Home className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300 ease-out" />
                    <span className="text-sm sm:text-base group-hover:tracking-wide transition-all duration-300 ease-out group-hover:font-semibold">Volver al Inicio</span>
                  </div>
                  {/* Enhanced hover feedback */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Loading states for button interactions */}
                <div className="text-center mt-2">
                  <p className="text-white/60 text-xs">
                    Toca cualquier botón para continuar
                  </p>
                </div>
              </div>
            </div>
          )}
          </div>

          {/* Success celebration effects */}
          {showSuccess && (
            <>
              {/* Expanding rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-4 border-white/20 animate-ping" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full border-4 border-white/10 animate-ping"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  )
}