"use client"

import { Check } from "lucide-react"

interface CheckoutProgressProps {
  currentStep: number
  steps: {
    number: number
    title: string
    description: string
  }[]
}

export function CheckoutProgress({ currentStep, steps }: CheckoutProgressProps) {
  return (
    <div className="w-full bg-white border-b border-femfuel-rose/10 py-4 md:py-6">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number
            const isCurrent = currentStep === step.number
            const isUpcoming = currentStep < step.number

            return (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : isCurrent
                        ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm md:text-base">{step.number}</span>
                    )}
                  </div>

                  {/* Step Label - Hidden on mobile */}
                  <div className="mt-2 text-center hidden md:block">
                    <p
                      className={`text-sm font-semibold ${
                        isCurrent
                          ? "text-femfuel-rose"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-femfuel-medium mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 mt-0 md:-mt-16">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-600"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Step Label */}
        <div className="mt-4 text-center md:hidden">
          <p className="text-sm font-semibold text-femfuel-rose">
            {steps.find(s => s.number === currentStep)?.title}
          </p>
          <p className="text-xs text-femfuel-medium mt-1">
            {steps.find(s => s.number === currentStep)?.description}
          </p>
        </div>
      </div>
    </div>
  )
}
