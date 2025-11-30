"use client"

import { useState, useEffect } from "react"
import { CreditCard, Banknote, Building2, Smartphone, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/auth-context"

export type PaymentMethod = "cash" | "card" | "transfer" | "mobile" | "saved-card"

export interface PaymentInfo {
  method: PaymentMethod
  savedCardId?: string
}

interface PaymentStepProps {
  initialData?: PaymentInfo
  onNext: (data: PaymentInfo) => void
  onBack: () => void
}

const paymentMethods = [
  {
    id: "cash" as PaymentMethod,
    name: "Pago Contra Entrega",
    description: "Paga en efectivo cuando recibas tu pedido",
    icon: Banknote,
    popular: true
  },
  {
    id: "card" as PaymentMethod,
    name: "Tarjeta de Crédito/Débito",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    popular: false
  },
  {
    id: "transfer" as PaymentMethod,
    name: "Transferencia Bancaria",
    description: "Transferencia directa a nuestra cuenta",
    icon: Building2,
    popular: false
  },
  {
    id: "mobile" as PaymentMethod,
    name: "Pago Móvil",
    description: "Paga con tu billetera digital",
    icon: Smartphone,
    popular: false
  }
]

export function PaymentStep({ initialData, onNext, onBack }: PaymentStepProps) {
  const { user } = useAuth()
  const defaultCard = user?.paymentMethods?.find(pm => pm.isDefault)

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    initialData?.method || (defaultCard ? "saved-card" : "cash")
  )
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    initialData?.savedCardId || defaultCard?.id
  )

  // Auto-select default saved card on mount
  useEffect(() => {
    if (!initialData && defaultCard) {
      setSelectedMethod("saved-card")
      setSelectedCardId(defaultCard.id)
    }
  }, [defaultCard, initialData])

  const handleMethodChange = (method: PaymentMethod) => {
    setSelectedMethod(method)
    if (method !== "saved-card") {
      setSelectedCardId(undefined)
    }
  }

  const handleSavedCardSelect = (cardId: string) => {
    setSelectedMethod("saved-card")
    setSelectedCardId(cardId)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      method: selectedMethod,
      savedCardId: selectedMethod === "saved-card" ? selectedCardId : undefined
    })
  }

  const getBrandIcon = (brand?: string) => {
    // You can add brand logos here later
    return "💳"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-femfuel-rose/10">
        <div className="p-3 bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 rounded-full">
          <CreditCard className="h-6 w-6 text-femfuel-rose" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-femfuel-dark font-serif">
            Método de Pago
          </h2>
          <p className="text-sm text-femfuel-medium">
            Elige cómo prefieres pagar
          </p>
        </div>
      </div>

      {/* Saved Payment Methods */}
      {user?.paymentMethods && user.paymentMethods.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-femfuel-dark uppercase tracking-wide flex items-center gap-2">
            <Star className="h-4 w-4 text-femfuel-rose" />
            Métodos de Pago Guardados
          </h3>
          {user.paymentMethods.map((card) => {
            const isSelected = selectedMethod === "saved-card" && selectedCardId === card.id

            return (
              <div key={card.id} className="relative">
                <label
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md"
                      : "border-gray-200 hover:border-green-400 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSavedCardSelect(card.id)}
                >
                  {/* Custom Radio */}
                  <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                    isSelected ? "border-green-500 bg-green-500" : "border-gray-300"
                  }`}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>

                  {/* Card Icon */}
                  <div className={`p-3 rounded-lg transition-colors ${
                    isSelected ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}>
                    <CreditCard className="h-5 w-5" />
                  </div>

                  {/* Card Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold ${
                        isSelected ? "text-green-900" : "text-femfuel-dark"
                      }`}>
                        {card.brand?.toUpperCase()} •••• {card.cardNumber}
                      </span>
                      {card.isDefault && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-xs font-bold rounded-full">
                          Predeterminado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-femfuel-medium">
                      {card.cardHolderName} • Expira {card.expiryDate}
                    </p>
                  </div>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </label>
              </div>
            )
          })}
        </div>
      )}

      {/* Other Payment Methods */}
      {user?.paymentMethods && user.paymentMethods.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-femfuel-medium">O usa otro método</span>
          </div>
        </div>
      )}

      <RadioGroup value={selectedMethod} onValueChange={(value) => handleMethodChange(value as PaymentMethod)}>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            const isSelected = selectedMethod === method.id

            return (
              <div key={method.id} className="relative">
                <label
                  htmlFor={method.id}
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-femfuel-rose bg-gradient-to-r from-femfuel-rose/5 to-pink-500/5 shadow-md"
                      : "border-gray-200 hover:border-femfuel-rose/30 hover:bg-gray-50"
                  }`}
                >
                  {/* Radio Button */}
                  <RadioGroupItem value={method.id} id={method.id} className="mt-1" />

                  {/* Icon */}
                  <div className={`p-3 rounded-lg transition-colors ${
                    isSelected ? "bg-femfuel-rose text-white" : "bg-gray-100 text-femfuel-medium"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold ${
                        isSelected ? "text-femfuel-rose" : "text-femfuel-dark"
                      }`}>
                        {method.name}
                      </span>
                      {method.popular && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-xs font-bold rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-femfuel-medium">
                      {method.description}
                    </p>
                  </div>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-femfuel-rose rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </label>
              </div>
            )
          })}
        </div>
      </RadioGroup>

      {/* Payment Method Info */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Información de Pago
            </p>
            <p className="text-xs text-blue-700">
              {selectedMethod === "cash" && "El pago se realizará al momento de recibir tu pedido. Asegúrate de tener el monto exacto disponible."}
              {selectedMethod === "card" && "Serás redirigido a nuestra pasarela de pago segura para completar la transacción."}
              {selectedMethod === "transfer" && "Recibirás instrucciones de transferencia por email después de confirmar tu pedido."}
              {selectedMethod === "mobile" && "Te contactaremos para coordinar el pago móvil después de confirmar tu pedido."}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 border-2 border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light/30"
        >
          Volver
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold shadow-lg"
        >
          Revisar Orden
        </Button>
      </div>
    </form>
  )
}
