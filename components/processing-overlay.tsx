"use client"

import { useEffect, useState } from "react"
import { Check, CreditCard, Calendar, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessingOverlayProps {
  isVisible: boolean
  onComplete?: () => void
}

const steps = [
  {
    id: "payment",
    label: "Procesando pago",
    icon: CreditCard,
    duration: 800
  },
  {
    id: "booking",
    label: "Confirmando reserva",
    icon: Calendar,
    duration: 800
  },
  {
    id: "success",
    label: "¡Completado!",
    icon: Check,
    duration: 600
  }
]

export function ProcessingOverlay({ isVisible, onComplete }: ProcessingOverlayProps) {
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300">
      <div className="relative">
        {/* Background card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 max-w-sm mx-auto animate-in zoom-in-90 duration-500">
          {/* Circular Progress */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            {/* Progress Ring */}
            <svg className="absolute inset-0 -rotate-90 transform">
              <circle
                cx="80"
                cy="80"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="60"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                className={cn(
                  "transition-all duration-500 ease-out",
                  showSuccess ? "text-green-500" : "text-femfuel-rose"
                )}
                strokeLinecap="round"
              />
            </svg>

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {showSuccess ? (
                <div className="animate-in zoom-in-50 duration-500">
                  <div className="relative">
                    <Check className="h-16 w-16 text-green-500 animate-in zoom-in-75 duration-700" />
                    {/* Celebration particles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-20 w-20 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <CurrentIcon
                    className={cn(
                      "h-12 w-12 transition-all duration-300",
                      currentStep === 0 ? "text-blue-500 animate-pulse" :
                      currentStep === 1 ? "text-purple-500 animate-bounce" :
                      "text-green-500"
                    )}
                  />
                </div>
              )}
            </div>

            {/* Progress percentage */}
            {!showSuccess && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <span className="text-sm font-medium text-gray-500">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
          </div>

          {/* Step Label */}
          <div className="text-center space-y-2">
            <h3 className={cn(
              "text-xl font-bold transition-all duration-300",
              showSuccess ? "text-green-600" : "text-gray-800"
            )}>
              {showSuccess ? "¡Reserva Confirmada!" : steps[currentStep]?.label}
            </h3>

            {!showSuccess && (
              <p className="text-sm text-gray-500">
                Por favor espera un momento...
              </p>
            )}

            {/* Step indicators */}
            {!showSuccess && (
              <div className="flex justify-center gap-2 mt-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index <= currentStep
                        ? "bg-femfuel-rose w-8"
                        : "bg-gray-300 w-4"
                    )}
                  />
                ))}
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="animate-in slide-in-from-bottom-2 duration-500">
                <p className="text-sm text-gray-600 mb-2">
                  Tu reserva ha sido procesada exitosamente
                </p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ripple effects */}
        {showSuccess && (
          <>
            <div className="absolute inset-0 animate-ping">
              <div className="w-full h-full rounded-full border-4 border-green-300/50" />
            </div>
            <div className="absolute inset-0 animate-ping animation-delay-200">
              <div className="w-full h-full rounded-full border-4 border-green-300/30" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}