"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Truck, MapPin, Clock, Phone, Star, Shield, RotateCcw, Sparkles, Gift, Smartphone, Plus, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LocationModal } from "@/components/location-modal"
import { UserMenu } from "@/components/user-menu"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { UserLocation } from "@/types/delivery"
import { toast } from "sonner"
import type { PaymentMethod } from "@/contexts/auth-context"

type CheckoutStep = "delivery" | "payment" | "review" | "processing" | "success"

interface OrderData {
  phone: string
  deliveryNotes: string
  paymentMethod: "cash" | "card" | "apple_pay" | string
  cardDetails?: {
    number: string
    expiry: string
    cvv: string
    name: string
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user, addPaymentMethod } = useAuth()
  const {
    cart,
    itemCount,
    subtotal,
    total,
    getCartItems,
    userLocation,
    setUserLocation,
    clearCart
  } = useCart()

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("delivery")
  const [orderData, setOrderData] = useState<OrderData>({
    phone: "",
    deliveryNotes: "",
    paymentMethod: "cash"
  })
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [processingStep, setProcessingStep] = useState("")
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cardFormData, setCardFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    brand: "visa" as const
  })

  const cartItems = getCartItems()
  const MOTO_DELIVERY_FEE = 300
  const ITBIS_RATE = 0.18 // 18% ITBIS tax
  const itbisAmount = subtotal * ITBIS_RATE
  const finalTotal = subtotal + itbisAmount + MOTO_DELIVERY_FEE

  // Redirect if cart is empty
  useEffect(() => {
    if (itemCount === 0) {
      router.push("/shop")
    }
  }, [itemCount, router])

  const steps = [
    { id: "delivery", label: "Entrega", description: "Confirma tu ubicación", icon: MapPin },
    { id: "payment", label: "Pago", description: "Método de pago", icon: CreditCard },
    { id: "review", label: "Confirmar", description: "Revisar pedido", icon: Check },
  ]

  const formatPrice = (price: number) => `RD$${price.toLocaleString()}`

  const handleLocationUpdate = (location: UserLocation) => {
    setUserLocation(location)
    setShowLocationModal(false)
  }

  const handleNextStep = () => {
    if (currentStep === "delivery" && (!userLocation || !orderData.phone)) {
      return
    }

    const stepOrder: CheckoutStep[] = ["delivery", "payment", "review", "processing", "success"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const handlePreviousStep = () => {
    const stepOrder = ["delivery", "payment", "review"] as const
    const currentIndex = stepOrder.indexOf(currentStep as typeof stepOrder[number])
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setCurrentStep("processing")
    setProcessingProgress(0)

    // Step 1: Validating payment
    setProcessingStep("Validando método de pago...")
    setProcessingProgress(20)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Step 2: Processing payment
    setProcessingStep("Procesando pago...")
    setProcessingProgress(45)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Step 3: Creating order
    setProcessingStep("Creando tu pedido...")
    setProcessingProgress(70)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Step 4: Confirming delivery
    setProcessingStep("Confirmando entrega...")
    setProcessingProgress(90)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Step 5: Complete
    setProcessingStep("¡Pedido confirmado!")
    setProcessingProgress(100)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate order number
    const orderNum = `FF${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)

    // Clear cart and show success
    await clearCart()
    setCurrentStep("success")
    setIsProcessing(false)
  }

  // Card handling functions
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setCardFormData(prev => ({ ...prev, expiryDate: value }))
  }

  const handleAddCard = async () => {
    if (!cardFormData.cardNumber || !cardFormData.expiryDate || !cardFormData.cvv || !cardFormData.cardHolderName) {
      toast.error("Por favor completa todos los campos")
      return
    }

    setIsAddingCard(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newPaymentMethod: Omit<PaymentMethod, "id"> = {
        type: "card",
        cardNumber: cardFormData.cardNumber.slice(-4), // Only store last 4 digits
        expiryDate: cardFormData.expiryDate,
        cardHolderName: cardFormData.cardHolderName,
        brand: cardFormData.brand,
        isDefault: !user?.paymentMethods || user.paymentMethods.length === 0
      }

      addPaymentMethod(newPaymentMethod)
      setShowAddCardModal(false)
      setCardFormData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolderName: "",
        brand: "visa"
      })
      toast.success("Tarjeta agregada exitosamente")
    } catch (error) {
      toast.error("Error al agregar la tarjeta")
    } finally {
      setIsAddingCard(false)
    }
  }

  const handleNewCardSelection = () => {
    setShowAddCardModal(true)
  }

  // Helper function to get payment method display text
  const getPaymentMethodDisplay = () => {
    if (orderData.paymentMethod === "cash") {
      return "Contra Entrega"
    } else if (orderData.paymentMethod === "apple_pay") {
      return "Apple Pay"
    } else if (orderData.paymentMethod === "card") {
      return "Tarjeta de Crédito/Débito"
    } else if (orderData.paymentMethod.startsWith("saved_card_")) {
      // Find the specific saved card
      const cardId = orderData.paymentMethod.replace("saved_card_", "")
      const savedCard = user?.paymentMethods?.find(card => card.id === cardId)
      if (savedCard) {
        const brandName = savedCard.brand === 'visa' ? 'Visa' :
                         savedCard.brand === 'mastercard' ? 'Mastercard' :
                         savedCard.brand === 'amex' ? 'American Express' : 'Tarjeta'
        return `${brandName} ••••${savedCard.cardNumber}`
      }
      return "Tarjeta"
    }
    return "No especificado"
  }

  if (itemCount === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-femfuel-rose/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-femfuel-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-femfuel-rose/3 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Panel - Brand Experience */}
        <div className="w-3/5 relative flex flex-col justify-center items-center p-12 text-gray-800">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => currentStep === "delivery" ? router.back() : handlePreviousStep()}
            className="absolute top-8 left-8 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === "delivery" ? "Volver a la tienda" : "Anterior"}
          </Button>

          {/* Profile Dropdown */}
          <div className="absolute top-8 right-8">
            <UserMenu />
          </div>

          {/* Progress Steps */}
          {currentStep !== "processing" && currentStep !== "success" && (
            <div className="absolute top-20 right-8 flex items-center gap-3">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index
                const StepIcon = step.icon

                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted ? "bg-femfuel-rose border-femfuel-rose text-white" :
                      isActive ? "border-femfuel-rose text-femfuel-rose bg-femfuel-rose/10" :
                      "border-gray-300 text-gray-400"
                    }`}>
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`ml-3 mr-3 h-0.5 w-8 transition-all ${
                        isCompleted ? "bg-femfuel-rose" : "bg-gray-300"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-lg text-center space-y-8 z-10">
            {currentStep === "delivery" && (
              <>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-femfuel-rose/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Truck className="h-10 w-10 text-femfuel-rose" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    ¡Ya casi tienes tu belleza!
                  </h1>
                  <p className="text-xl text-gray-600">
                    Confirma tu ubicación para recibir tus productos de belleza favoritos
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-femfuel-rose/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-femfuel-rose" />
                    </div>
                    <p className="text-sm text-gray-700">30-60 min</p>
                    <p className="text-xs text-gray-500">Entrega rápida</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-femfuel-rose/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-femfuel-rose" />
                    </div>
                    <p className="text-sm text-gray-700">100% Seguro</p>
                    <p className="text-xs text-gray-500">Pago protegido</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-femfuel-rose/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <RotateCcw className="h-6 w-6 text-femfuel-rose" />
                    </div>
                    <p className="text-sm text-gray-700">30 días</p>
                    <p className="text-xs text-gray-500">Garantía</p>
                  </div>
                </div>
              </>
            )}

            {currentStep === "payment" && (
              <>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-femfuel-rose/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <CreditCard className="h-10 w-10 text-femfuel-rose" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    Método de pago
                  </h1>
                  <p className="text-xl text-gray-600">
                    Elige cómo prefieres pagar tu pedido
                  </p>
                </div>
              </>
            )}

            {currentStep === "review" && (
              <>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-femfuel-rose/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-femfuel-rose" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    ¡Perfecto!
                  </h1>
                  <p className="text-xl text-gray-600">
                    Revisa los detalles de tu pedido antes de confirmar
                  </p>
                </div>
              </>
            )}

            {currentStep === "processing" && (
              <div className="space-y-8">
                <div className="w-24 h-24 bg-femfuel-rose/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-femfuel-rose"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Procesando tu pedido...
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {processingStep || "Estamos preparando todo para ti"}
                  </p>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full max-w-md mx-auto">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                      <span className="text-femfuel-rose font-semibold">{processingProgress}%</span>
                      <span>Completado</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-femfuel-rose via-pink-500 to-femfuel-purple h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative"
                        style={{
                          width: `${processingProgress}%`,
                          boxShadow: '0 0 20px rgba(185, 28, 92, 0.4)'
                        }}
                      >
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Progress steps indicator */}
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                      <span className={processingProgress >= 20 ? "text-femfuel-rose font-medium" : ""}>Validando</span>
                      <span className={processingProgress >= 45 ? "text-femfuel-rose font-medium" : ""}>Procesando</span>
                      <span className={processingProgress >= 70 ? "text-femfuel-rose font-medium" : ""}>Creando</span>
                      <span className={processingProgress >= 90 ? "text-femfuel-rose font-medium" : ""}>Confirmando</span>
                      <span className={processingProgress >= 100 ? "text-femfuel-rose font-medium" : ""}>Listo</span>
                    </div>
                  </div>

                  {/* Security Message */}
                  <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">Tu pago está encriptado y seguro</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === "success" && (
              <div className="space-y-8 relative">
                {/* Confetti Animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className={`confetti confetti-${i + 1}`} />
                  ))}
                </div>

                <div className="w-24 h-24 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto animate-success-scale animate-success-pulse">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                      className="animate-checkmark-draw"
                      style={{
                        strokeDasharray: 30,
                        strokeDashoffset: 30
                      }}
                    />
                  </svg>
                </div>

                <div className="animate-celebration-bounce">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    ¡Pedido confirmado! 🎉
                  </h1>
                  <p className="text-xl text-gray-700 mb-2 flex items-center justify-center gap-2">
                    Pedido #{orderNumber}
                    <button
                      onClick={() => navigator.clipboard.writeText(orderNumber)}
                      className="text-femfuel-rose hover:text-femfuel-rose/80 text-sm ml-2 px-2 py-1 rounded bg-femfuel-rose/10 hover:bg-femfuel-rose/20 transition-colors"
                      title="Copiar número de pedido"
                    >
                      Copiar
                    </button>
                  </p>
                  <p className="text-gray-600 mb-4">
                    Tu moto está en camino. Te notificaremos cuando esté cerca.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-green-500 rounded-full">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-green-800 font-semibold text-lg">Entrega en 30-60 minutos</span>
                  </div>
                  <p className="text-green-700 text-center">
                    Recibirás notificaciones en tiempo real del estado de tu pedido
                  </p>

                  {/* Customer Service Quick Access */}
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-green-600 text-sm text-center">
                      ¿Necesitas ayuda? Contáctanos al{' '}
                      <a href="tel:+18095551234" className="font-semibold underline">
                        (809) 555-1234
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Product Images */}
          <div className="absolute inset-0 pointer-events-none">
            {cartItems.slice(0, 3).map((item, index) => {
              const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
              const positions = [
                "top-1/4 left-12 rotate-12",
                "bottom-1/3 left-20 -rotate-6",
                "top-1/3 right-16 rotate-6"
              ]

              return (
                <div
                  key={item.productId}
                  className={`absolute ${positions[index]} w-24 h-24 opacity-20 animate-float`}
                  style={{
                    animationDelay: `${index * 1000}ms`,
                    animationDuration: '6s'
                  }}
                >
                  <img
                    src={primaryImage?.url || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-2/5 bg-white/95 backdrop-blur-xl border-l border-gray-200 flex flex-col shadow-2xl">
          {/* Form Header */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStep === "delivery" ? "Información de entrega" :
               currentStep === "payment" ? "Método de pago" :
               currentStep === "review" ? "Revisar pedido" :
               currentStep === "processing" ? "Procesando pedido" :
               currentStep === "success" ? "Pedido confirmado" : ""}
            </h2>
            <p className="text-gray-600">
              {itemCount} producto{itemCount !== 1 ? "s" : ""} • {formatPrice(finalTotal)}
            </p>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {(currentStep === "processing" || currentStep === "success") && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Productos ({itemCount})</h4>
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                      return (
                        <div key={item.productId} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <img
                            src={primaryImage?.url || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                            <p className="text-xs text-gray-600">{item.product.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-femfuel-rose">{formatPrice(item.product.price * item.quantity)}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Detalles de Entrega</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dirección:</span>
                      <span className="text-gray-800 text-right max-w-xs">{userLocation?.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teléfono:</span>
                      <span className="text-gray-800">{orderData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="text-gray-800">Entrega en Moto (30-60 min)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pago:</span>
                      <span className="text-gray-800">
                        {getPaymentMethodDisplay()}
                      </span>
                    </div>
                    {orderData.deliveryNotes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Notas:</span>
                        <span className="text-gray-800 text-right max-w-xs">{orderData.deliveryNotes}</span>
                      </div>
                    )}
                    {currentStep === "success" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Número de pedido:</span>
                        <span className="text-femfuel-rose font-semibold">#{orderNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === "delivery" && (
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <Label className="text-gray-800 font-medium mb-3 block">Dirección de Entrega</Label>
                  {userLocation ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800">{userLocation.district}</p>
                            <p className="text-sm text-green-700">{userLocation.address}</p>
                            <p className="text-sm text-green-600">{userLocation.city}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowLocationModal(true)}
                          className="text-femfuel-rose hover:bg-green-100"
                        >
                          Cambiar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowLocationModal(true)}
                      className="w-full glassmorphism-button-perfect font-semibold h-12"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Seleccionar Ubicación
                    </Button>
                  )}
                </div>

                {/* Delivery Option */}
                <div>
                  <Label className="text-gray-800 font-medium mb-3 block">Método de Entrega</Label>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">Entrega en Moto</p>
                          <p className="text-sm text-blue-700">30-60 minutos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-800">{formatPrice(MOTO_DELIVERY_FEE)}</p>
                        <Badge className="bg-blue-100 text-blue-800 text-xs border-0 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Rápido
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-800 font-medium">Número de Teléfono</Label>
                    <div className="mt-2 relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(809) 123-4567"
                        value={orderData.phone}
                        onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-femfuel-rose focus:ring-femfuel-rose"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-gray-800 font-medium">Notas de Entrega (Opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Ej: Apartamento 3B, tocar timbre"
                      value={orderData.deliveryNotes}
                      onChange={(e) => setOrderData(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                      className="mt-2 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-femfuel-rose focus:ring-femfuel-rose"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="space-y-6">
                <RadioGroup
                  value={orderData.paymentMethod}
                  onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentMethod: value as "cash" | "card" | "apple_pay" }))}
                >
                  <div className="space-y-4">
                    {/* Cash Option */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="cash" id="cash" className="border-green-400 text-green-600" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">$</div>
                            </div>
                            <div>
                              <p className="font-medium text-green-800">Pago Contra Entrega</p>
                              <p className="text-sm text-green-700">Paga en efectivo cuando recibas tu pedido</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>

                    {/* Saved Cards Section */}
                    {user?.paymentMethods && user.paymentMethods.length > 0 ? (
                      <div className="space-y-3">
                        {user.paymentMethods.map((paymentMethod) => (
                          <div key={paymentMethod.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value={`saved_card_${paymentMethod.id}`} id={`saved_card_${paymentMethod.id}`} className="border-blue-500 text-blue-600" />
                              <Label htmlFor={`saved_card_${paymentMethod.id}`} className="flex-1 cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                      {paymentMethod.brand === 'visa' ? 'VISA' : paymentMethod.brand === 'mastercard' ? 'MC' : 'CARD'}
                                    </div>
                                    <div>
                                      <p className="font-medium text-blue-800">
                                        {paymentMethod.brand === 'visa' ? 'Visa' :
                                         paymentMethod.brand === 'mastercard' ? 'Mastercard' :
                                         paymentMethod.brand === 'amex' ? 'American Express' : 'Tarjeta'} ••••{paymentMethod.cardNumber}
                                      </p>
                                      <p className="text-sm text-blue-700">{paymentMethod.cardHolderName}</p>
                                    </div>
                                  </div>
                                  {paymentMethod.isDefault && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                      Principal
                                    </Badge>
                                  )}
                                </div>
                              </Label>
                            </div>
                          </div>
                        ))}

                        {/* Subtle Add New Card Link */}
                        <div className="pt-3">
                          <button
                            onClick={handleNewCardSelection}
                            className="flex items-center gap-2 text-femfuel-rose hover:text-femfuel-rose/80 text-sm font-medium transition-colors duration-200 group"
                          >
                            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            Agregar nueva tarjeta
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* No Saved Cards - Show Simple Card Option */
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="card" id="card" className="border-blue-500 text-blue-600" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Tarjeta de Crédito/Débito</p>
                                <p className="text-sm text-blue-700">Visa, Mastercard, American Express</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    )}

                    {/* Apple Pay Option */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="apple_pay" id="apple_pay" className="border-white text-white" />
                        <Label htmlFor="apple_pay" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <Smartphone className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-white">Apple Pay</p>
                              <p className="text-sm text-gray-300">Pago rápido y seguro con Touch ID</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Productos ({itemCount})</h4>
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                      return (
                        <div key={item.productId} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <img
                            src={primaryImage?.url || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                            <p className="text-xs text-gray-600">{item.product.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-femfuel-rose">{formatPrice(item.product.price * item.quantity)}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Detalles de Entrega</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dirección:</span>
                      <span className="text-gray-800 text-right max-w-xs">{userLocation?.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teléfono:</span>
                      <span className="text-gray-800">{orderData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="text-gray-800">Entrega en Moto (30-60 min)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pago:</span>
                      <span className="text-gray-800">
                        {getPaymentMethodDisplay()}
                      </span>
                    </div>
                    {orderData.deliveryNotes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Notas:</span>
                        <span className="text-gray-800 text-right max-w-xs">{orderData.deliveryNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {(currentStep !== "processing" && currentStep !== "success") && (
            <div className="p-8 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ITBIS (18%)</span>
                  <span>{formatPrice(itbisAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío (Moto)</span>
                  <span>{formatPrice(MOTO_DELIVERY_FEE)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-800">Total</span>
                    <span className="text-femfuel-rose">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {(currentStep === "delivery" || currentStep === "payment" || currentStep === "review") && (
                <div className="flex gap-3">
                  {currentStep !== "delivery" && (
                    <Button
                      variant="ghost"
                      onClick={handlePreviousStep}
                      className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100"
                    >
                      Anterior
                    </Button>
                  )}
                  <Button
                    onClick={currentStep === "review" ? handlePlaceOrder : handleNextStep}
                    disabled={
                      (currentStep === "delivery" && (!userLocation || !orderData.phone)) ||
                      isProcessing
                    }
                    className="flex-1 glassmorphism-button-perfect font-semibold h-12"
                  >
                    {currentStep === "review" ? "Confirmar Pedido" : "Continuar"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Order Summary for Processing/Success States */}
          {(currentStep === "processing" || currentStep === "success") && (
            <div className="p-8 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ITBIS (18%)</span>
                  <span>{formatPrice(itbisAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío (Moto)</span>
                  <span>{formatPrice(MOTO_DELIVERY_FEE)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-800">Total</span>
                    <span className="text-femfuel-rose">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {currentStep === "success" && (
                <div className="space-y-4">
                  {/* Primary Action */}
                  <Button
                    onClick={() => router.push("/shop")}
                    className="w-full bg-femfuel-rose hover:bg-femfuel-rose/90 text-white font-semibold h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    🛍️ Continuar Comprando
                  </Button>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/profile?section=orders")}
                      className="h-12 text-gray-700 border-gray-300 hover:bg-gray-50 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      📦 Mis Pedidos
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const text = `¡Acabo de hacer un pedido en FemFuel Beauty! 💄✨ Pedido #${orderNumber}`;
                        if (navigator.share) {
                          navigator.share({
                            title: 'FemFuel Beauty - Pedido Confirmado',
                            text: text,
                            url: window.location.origin
                          });
                        } else {
                          navigator.clipboard.writeText(text);
                          toast.success("Copiado al portapapeles");
                        }
                      }}
                      className="h-12 text-gray-700 border-gray-300 hover:bg-gray-50 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Compartir
                    </Button>
                  </div>

                  {/* Quick Customer Service */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500 mb-3">
                      ¿Algo no está bien con tu pedido?
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => window.open('tel:+18095551234')}
                      className="w-full text-femfuel-rose hover:bg-femfuel-rose/5 font-medium h-10"
                    >
                      📞 Soporte Inmediato
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen">
        {/* Mobile Header */}
        <div className="p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => currentStep === "delivery" ? router.back() : handlePreviousStep()}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === "delivery" ? "Tienda" : "Anterior"}
          </Button>

          {currentStep !== "processing" && currentStep !== "success" && (
            <div className="text-gray-800 text-sm">
              Paso {steps.findIndex(s => s.id === currentStep) + 1} de {steps.length}
            </div>
          )}
        </div>

        {/* Mobile Content */}
        <div className="px-4 pb-24">
          <div className="max-w-md mx-auto">
            {/* Step Content - Same as desktop but adapted for mobile */}
            {currentStep === "delivery" && (
              <div className="space-y-6 text-gray-800">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-femfuel-rose/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Truck className="h-8 w-8 text-femfuel-rose" />
                  </div>
                  <h1 className="text-2xl font-bold">Información de entrega</h1>
                  <p className="text-gray-600">{itemCount} producto{itemCount !== 1 ? "s" : ""} • {formatPrice(finalTotal)}</p>
                </div>

                {/* Mobile form content - same as desktop */}
                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <Label className="text-gray-800 font-medium mb-3 block">Dirección de Entrega</Label>
                    {userLocation ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-green-800">{userLocation.district}</p>
                              <p className="text-sm text-green-700">{userLocation.address}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowLocationModal(true)}
                            className="text-femfuel-rose hover:bg-green-100"
                          >
                            Cambiar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowLocationModal(true)}
                        className="w-full glassmorphism-button-perfect font-semibold h-12"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Seleccionar Ubicación
                      </Button>
                    )}
                  </div>

                  {/* Moto Delivery */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">Entrega en Moto</p>
                          <p className="text-sm text-blue-700">30-60 minutos</p>
                        </div>
                      </div>
                      <p className="font-semibold text-blue-800">{formatPrice(MOTO_DELIVERY_FEE)}</p>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <Label htmlFor="phone-mobile" className="text-gray-800 font-medium">Número de Teléfono</Label>
                    <div className="mt-2 relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone-mobile"
                        type="tel"
                        placeholder="(809) 123-4567"
                        value={orderData.phone}
                        onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-femfuel-rose h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other mobile steps would follow similar pattern */}
            {/* Payment, Review, Processing, Success - adapted for mobile */}
          </div>
        </div>

        {/* Mobile Action Bar */}
        {currentStep !== "processing" && currentStep !== "success" && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
            <div className="flex gap-3">
              {currentStep !== "delivery" && (
                <Button
                  variant="ghost"
                  onClick={handlePreviousStep}
                  className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100 h-12"
                >
                  Anterior
                </Button>
              )}
              <Button
                onClick={currentStep === "review" ? handlePlaceOrder : handleNextStep}
                disabled={
                  (currentStep === "delivery" && (!userLocation || !orderData.phone)) ||
                  isProcessing
                }
                className="flex-1 glassmorphism-button-perfect font-semibold h-12"
              >
                {currentStep === "review" ? "Confirmar Pedido" : "Continuar"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationUpdate={handleLocationUpdate}
        currentLocation={userLocation}
      />

      {/* Add Card Modal */}
      <Dialog open={showAddCardModal} onOpenChange={setShowAddCardModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Tarjeta</DialogTitle>
            <DialogDescription>
              Agrega una nueva tarjeta de crédito o débito para usar en tu pedido
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardFormData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardFormData.expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardFormData.cvv}
                  onChange={(e) => setCardFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                  maxLength={4}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardHolderName">Nombre del Titular</Label>
              <Input
                id="cardHolderName"
                placeholder="Nombre como aparece en la tarjeta"
                value={cardFormData.cardHolderName}
                onChange={(e) => setCardFormData(prev => ({ ...prev, cardHolderName: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="brand">Tipo de Tarjeta</Label>
              <Select value={cardFormData.brand} onValueChange={(value) => setCardFormData(prev => ({ ...prev, brand: value as any }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCardModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCard} disabled={isAddingCard} className="bg-femfuel-rose hover:bg-femfuel-rose/90">
              {isAddingCard ? "Agregando..." : "Agregar Tarjeta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Navigation - only show on non-checkout steps */}
      {currentStep === "success" && (
        <MobileNavigation activeTab="shop" />
      )}
    </div>
  )
}