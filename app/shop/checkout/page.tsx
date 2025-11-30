"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShopHeader } from "@/components/shop/shop-header"
import { CheckoutProgress } from "@/components/shop/checkout/checkout-progress"
import { CheckoutCartSummary } from "@/components/shop/checkout/checkout-cart-summary"
import { ShippingStep, ShippingInfo } from "@/components/shop/checkout/shipping-step"
import { PaymentStep, PaymentInfo } from "@/components/shop/checkout/payment-step"
import { ReviewStep } from "@/components/shop/checkout/review-step"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

const checkoutSteps = [
  {
    number: 1,
    title: "Envío",
    description: "Información de entrega"
  },
  {
    number: 2,
    title: "Pago",
    description: "Método de pago"
  },
  {
    number: 3,
    title: "Revisar",
    description: "Confirmar pedido"
  }
]

export default function CheckoutPage() {
  const router = useRouter()
  const { itemCount } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (itemCount === 0) {
      toast.error("Tu carrito está vacío")
      router.push("/shop")
    }
  }, [itemCount, router])

  // Load saved data from localStorage
  useEffect(() => {
    const savedShipping = localStorage.getItem("checkout-shipping")
    const savedPayment = localStorage.getItem("checkout-payment")

    if (savedShipping) {
      setShippingInfo(JSON.parse(savedShipping))
    }
    if (savedPayment) {
      setPaymentInfo(JSON.parse(savedPayment))
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    if (shippingInfo) {
      localStorage.setItem("checkout-shipping", JSON.stringify(shippingInfo))
    }
  }, [shippingInfo])

  useEffect(() => {
    if (paymentInfo) {
      localStorage.setItem("checkout-payment", JSON.stringify(paymentInfo))
    }
  }, [paymentInfo])

  const handleShippingNext = (data: ShippingInfo) => {
    setShippingInfo(data)
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePaymentNext = (data: PaymentInfo) => {
    setPaymentInfo(data)
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEditShipping = () => {
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEditPayment = () => {
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Don't render if cart is empty
  if (itemCount === 0) {
    return null
  }

  return (
    <>
      {/* Shop Header */}
      <ShopHeader />

      {/* Progress Indicator */}
      <CheckoutProgress currentStep={currentStep} steps={checkoutSteps} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left: Checkout Steps */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ShippingStep
                initialData={shippingInfo || undefined}
                onNext={handleShippingNext}
              />
            )}

            {currentStep === 2 && (
              <PaymentStep
                initialData={paymentInfo || undefined}
                onNext={handlePaymentNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && shippingInfo && paymentInfo && (
              <ReviewStep
                shippingInfo={shippingInfo}
                paymentInfo={paymentInfo}
                onBack={handleBack}
                onEditShipping={handleEditShipping}
                onEditPayment={handleEditPayment}
              />
            )}
          </div>

          {/* Right: Cart Summary - Hidden on mobile when in review step */}
          <div className={`lg:col-span-1 ${currentStep === 3 ? 'hidden lg:block' : ''}`}>
            <CheckoutCartSummary shippingCost={shippingInfo?.shippingCost || 300} />
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="bg-gray-50 border-t border-gray-200 py-4 md:py-6 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-femfuel-medium">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 md:h-4 md:w-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Compra 100% Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 md:h-4 md:w-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Múltiples Métodos de Pago</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 md:h-4 md:w-4 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Entrega el Mismo Día</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
