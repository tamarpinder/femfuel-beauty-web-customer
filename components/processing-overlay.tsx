"use client"

import { useEffect, useState } from "react"
import { Check, CreditCard, Calendar, Sparkles, Star, MapPin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

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
}

const steps = [
  {
    id: "payment",
    label: "Procesando pago seguro",
    subtitle: "Verificando método de pago...",
    icon: CreditCard,
    duration: 1000
  },
  {
    id: "booking",
    label: "Confirmando disponibilidad",
    subtitle: "Reservando tu cita...",
    icon: Calendar,
    duration: 1000
  },
  {
    id: "success",
    label: "Reserva Confirmada",
    subtitle: "Todo listo para tu cita",
    icon: Check,
    duration: 800
  }
]

export function ProcessingOverlay({ isVisible, onComplete, bookingData }: ProcessingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0)
      setShowSuccess(false)
      setProgress(0)
      return
    }

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
        onComplete?.()
      }, 800)
    }

    processSteps()

    return () => {
      clearInterval(progressInterval)
      clearTimeout(stepTimeout)
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  const CurrentIcon = steps[currentStep]?.icon || Check
  const circumference = 2 * Math.PI * 60 // radius = 60

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Full-screen gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-femfuel-rose to-orange-500 animate-in fade-in-0 duration-700" />

      {/* Animated background patterns */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 animate-in zoom-in-95 duration-700">

          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-white mb-2">FemFuel Beauty</div>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto" />
          </div>

          {/* Progress visualization */}
          <div className="relative mb-8">
            {/* Large circular progress */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full -rotate-90 transform">
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
                      <Check className="h-20 w-20 text-white mx-auto mb-2 animate-in zoom-in-75 duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-white/30 animate-ping" />
                      </div>
                    </div>
                    <div className="text-white text-lg font-bold">Confirmado</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <CurrentIcon
                      className={cn(
                        "h-16 w-16 text-white mx-auto mb-3 transition-all duration-500",
                        currentStep === 0 ? "animate-pulse" :
                        currentStep === 1 ? "animate-bounce" :
                        "animate-spin"
                      )}
                    />
                    <div className="text-white text-lg font-semibold">
                      {Math.round(progress)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step information */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {showSuccess ? "Reserva Confirmada" : steps[currentStep]?.label}
            </h2>
            <p className="text-white/80 text-sm">
              {showSuccess ? "Todo listo para tu cita de belleza" : steps[currentStep]?.subtitle}
            </p>
          </div>

          {/* Booking details - shown during processing and success */}
          {bookingData && (
            <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/20">
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
            <div className="text-center mt-4">
              <div className="bg-white/20 rounded-lg px-4 py-2 inline-block">
                <div className="text-white/80 text-xs">Código de reserva</div>
                <div className="text-white font-bold text-lg">{bookingData.bookingReference}</div>
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

            {/* Floating celebration particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full animate-bounce"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}