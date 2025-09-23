"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Truck, MapPin, Clock, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LocationModal } from "@/components/location-modal"
import { UserMenu } from "@/components/user-menu"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { UserLocation } from "@/types/delivery"
import { AddCardModal } from "./add-card-modal"
import {
  CheckoutStep,
  OrderData,
  CardFormData,
  formatPrice,
  getPaymentMethodDisplay,
  handlePlaceOrder,
  handleAddCard,
} from "./checkout-utils"

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
  const [cardFormData, setCardFormData] = useState<CardFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    brand: "visa"
  })

  const cartItems = getCartItems()
  const MOTO_DELIVERY_FEE = 300
  const ITBIS_RATE = 0.18
  const itbisAmount = subtotal * ITBIS_RATE
  const finalTotal = subtotal + itbisAmount + MOTO_DELIVERY_FEE

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

  const handleNewCardSelection = () => {
    setShowAddCardModal(true)
  }

  const onHandlePlaceOrder = () => handlePlaceOrder(
    setIsProcessing,
    setCurrentStep,
    setProcessingProgress,
    setProcessingStep,
    setOrderNumber,
    clearCart
  )

  const onHandleAddCard = () => handleAddCard(
    cardFormData,
    addPaymentMethod,
    setShowAddCardModal,
    setCardFormData,
    setIsAddingCard,
    user
  )

  if (itemCount === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
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
                      isActive ? "border-femfuel-rose text-black bg-femfuel-rose/10" :
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
                    <Truck className="h-10 w-10 text-black" />
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
                      <Clock className="h-6 w-6 text-black" />
                    </div>
                    <p className="text-sm text-gray-700">30-60 min</p>
                    <p className="text-xs text-gray-500">Entrega rápida</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-femfuel-rose/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-black" />
                    </div>
                    <p className="text-sm text-gray-700">100% Seguro</p>
                    <p className="text-xs text-gray-500">Pago protegido</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-femfuel-rose/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <RotateCcw className="h-6 w-6 text-black" />
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
                    <CreditCard className="h-10 w-10 text-black" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    Método de pago
                  </h1>
                  <p className="text-xl text-gray-600">
                    Elige cómo prefieres pagar tu pedido
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8">
                  <div className="w-6 h-6 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">Tu pago está encriptado y seguro</span>
                </div>
              </>
            )}

            {currentStep === "success" && (
              <div className="space-y-8 relative">
                {/* Success animations and content would go here */}
                <div className="w-24 h-24 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
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
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    ¡Pedido confirmado! 🎉
                  </h1>
                  <p className="text-xl text-gray-700 mb-2 flex items-center justify-center gap-2">
                    Pedido #{orderNumber}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-2/5 bg-white/80 backdrop-blur-sm border-l border-gray-200/50 p-8 overflow-y-auto">
          {/* Delivery Step */}
          {currentStep === "delivery" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-femfuel-dark mb-2">Información de entrega</h2>
                <p className="text-femfuel-medium">Confirma los detalles de tu pedido</p>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-femfuel-dark">Ubicación de entrega</label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-black" />
                    <div>
                      <p className="font-medium text-femfuel-dark">
                        {userLocation?.district || "Ubicación no seleccionada"}
                      </p>
                      <p className="text-sm text-femfuel-medium">
                        {userLocation?.address || "Selecciona tu ubicación"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLocationModal(true)}
                    className="text-black border-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                  >
                    Cambiar
                  </Button>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-femfuel-dark">Teléfono de contacto *</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(809) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-femfuel-rose focus:border-femfuel-rose"
                  required
                />
              </div>

              {/* Delivery Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-femfuel-dark">Notas para el repartidor (opcional)</label>
                <textarea
                  value={orderData.deliveryNotes}
                  onChange={(e) => setOrderData(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                  placeholder="Ej: Apartamento 2B, portón azul, timbre rojo..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-femfuel-rose focus:border-femfuel-rose resize-none"
                />
              </div>

              {/* Cart Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-femfuel-dark">Resumen del pedido</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Productos ({itemCount})</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">ITBIS (18%)</span>
                    <span className="font-medium">{formatPrice(itbisAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Entrega</span>
                    <span className="font-medium">{formatPrice(MOTO_DELIVERY_FEE)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-femfuel-dark">Total</span>
                      <span className="font-bold text-black text-lg">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleNextStep}
                disabled={!userLocation || !orderData.phone}
                className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white py-3 font-semibold"
              >
                Continuar al pago
              </Button>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === "payment" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-femfuel-dark mb-2">Método de pago</h2>
                <p className="text-femfuel-medium">Elige cómo prefieres pagar</p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {/* Cash */}
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.paymentMethod === "cash"
                      ? "border-femfuel-rose bg-femfuel-rose/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: "cash" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      orderData.paymentMethod === "cash" ? "border-femfuel-rose" : "border-gray-300"
                    }`}>
                      {orderData.paymentMethod === "cash" && (
                        <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Contra Entrega</p>
                      <p className="text-sm text-femfuel-medium">Paga cuando recibas tu pedido</p>
                    </div>
                    <div className="text-2xl">💰</div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.paymentMethod === "card"
                      ? "border-femfuel-rose bg-femfuel-rose/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: "card" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      orderData.paymentMethod === "card" ? "border-femfuel-rose" : "border-gray-300"
                    }`}>
                      {orderData.paymentMethod === "card" && (
                        <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Tarjeta de Crédito/Débito</p>
                      <p className="text-sm text-femfuel-medium">Visa, Mastercard, American Express</p>
                    </div>
                    <CreditCard className="h-6 w-6 text-femfuel-medium" />
                  </div>
                </div>

                {/* Apple Pay */}
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.paymentMethod === "apple_pay"
                      ? "border-femfuel-rose bg-femfuel-rose/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: "apple_pay" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      orderData.paymentMethod === "apple_pay" ? "border-femfuel-rose" : "border-gray-300"
                    }`}>
                      {orderData.paymentMethod === "apple_pay" && (
                        <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Apple Pay</p>
                      <p className="text-sm text-femfuel-medium">Pago seguro con Touch ID o Face ID</p>
                    </div>
                    <div className="text-2xl">🍎</div>
                  </div>
                </div>
              </div>

              {/* Saved Cards */}
              {user?.paymentMethods && user.paymentMethods.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-femfuel-dark">Tarjetas guardadas</h3>
                  {user.paymentMethods.map((card: any) => (
                    <div
                      key={card.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        orderData.paymentMethod === `saved_card_${card.id}`
                          ? "border-femfuel-rose bg-femfuel-rose/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: `saved_card_${card.id}` }))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          orderData.paymentMethod === `saved_card_${card.id}` ? "border-femfuel-rose" : "border-gray-300"
                        }`}>
                          {orderData.paymentMethod === `saved_card_${card.id}` && (
                            <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-femfuel-dark">
                            {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} ••••{card.cardNumber}
                          </p>
                          <p className="text-sm text-femfuel-medium">{card.cardHolderName}</p>
                        </div>
                        <CreditCard className="h-5 w-5 text-femfuel-medium" />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={handleNewCardSelection}
                    className="w-full border-dashed border-femfuel-rose text-black hover:bg-femfuel-rose hover:text-white"
                  >
                    + Agregar nueva tarjeta
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="flex-1"
                >
                  Anterior
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                >
                  Revisar pedido
                </Button>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === "review" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-femfuel-dark mb-2">Confirmar pedido</h2>
                <p className="text-femfuel-medium">Revisa tu pedido antes de finalizar</p>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                <h3 className="font-semibold text-femfuel-dark">Productos</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                    return (
                      <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={primaryImage?.url || "/placeholder.svg?height=50&width=50&query=beauty product"}
                          alt={primaryImage?.alt || item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-femfuel-dark text-sm truncate">{item.product.name}</p>
                          <p className="text-xs text-femfuel-medium">{item.product.brand}</p>
                          <p className="text-xs text-femfuel-light">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-black">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-femfuel-dark">Detalles del pedido</h3>

                {/* Delivery Info */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-black" />
                    <span className="font-medium text-femfuel-dark">Entrega</span>
                  </div>
                  <p className="text-sm text-femfuel-medium">{userLocation?.address}</p>
                  <p className="text-sm text-femfuel-medium">Tel: {orderData.phone}</p>
                  {orderData.deliveryNotes && (
                    <p className="text-sm text-femfuel-medium">Notas: {orderData.deliveryNotes}</p>
                  )}
                </div>

                {/* Payment Info */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-black" />
                    <span className="font-medium text-femfuel-dark">Pago</span>
                  </div>
                  <p className="text-sm text-femfuel-medium">
                    {getPaymentMethodDisplay(orderData.paymentMethod, user)}
                  </p>
                </div>
              </div>

              {/* Final Total */}
              <div className="bg-femfuel-rose/5 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-femfuel-medium">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-femfuel-medium">ITBIS (18%)</span>
                  <span className="font-medium">{formatPrice(itbisAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-femfuel-medium">Entrega</span>
                  <span className="font-medium">{formatPrice(MOTO_DELIVERY_FEE)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-femfuel-dark text-lg">Total</span>
                    <span className="font-bold text-black text-xl">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="flex-1"
                >
                  Anterior
                </Button>
                <Button
                  onClick={onHandlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white font-semibold py-3"
                >
                  {isProcessing ? "Procesando..." : "Confirmar pedido"}
                </Button>
              </div>
            </div>
          )}

          {/* Processing Step */}
          {currentStep === "processing" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-femfuel-rose/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 border-4 border-femfuel-rose border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-femfuel-dark mb-2">{processingStep}</h3>
                  <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                    <div
                      className="bg-femfuel-rose h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-femfuel-medium mt-2">{processingProgress}% completado</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => currentStep === "delivery" ? router.back() : handlePreviousStep()}
              className="text-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === "delivery" ? "Volver" : "Anterior"}
            </Button>
            <h1 className="font-semibold text-femfuel-dark">Checkout</h1>
            <UserMenu />
          </div>

          {/* Mobile Progress */}
          {currentStep !== "processing" && currentStep !== "success" && (
            <div className="flex items-center gap-2 mt-4">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                      isCompleted ? "bg-femfuel-rose text-white" :
                      isActive ? "bg-femfuel-rose/10 text-black border-2 border-femfuel-rose" :
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded ${
                        isCompleted ? "bg-femfuel-rose" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentStep === "delivery" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-femfuel-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-black" />
                </div>
                <h2 className="text-xl font-bold text-femfuel-dark mb-2">Información de entrega</h2>
                <p className="text-femfuel-medium">Confirma los detalles de tu pedido</p>
              </div>

              {/* Mobile Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-femfuel-dark">Ubicación de entrega</label>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-black mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">
                        {userLocation?.district || "Ubicación no seleccionada"}
                      </p>
                      <p className="text-sm text-femfuel-medium">
                        {userLocation?.address || "Selecciona tu ubicación"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLocationModal(true)}
                    className="w-full text-black border-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                  >
                    Cambiar ubicación
                  </Button>
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-femfuel-dark">Teléfono de contacto *</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(809) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-femfuel-rose focus:border-femfuel-rose"
                  required
                />
              </div>

              {/* Mobile Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-femfuel-dark">Notas para el repartidor</label>
                <textarea
                  value={orderData.deliveryNotes}
                  onChange={(e) => setOrderData(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                  placeholder="Ej: Apartamento 2B, portón azul..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-femfuel-rose focus:border-femfuel-rose resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === "payment" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-femfuel-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-black" />
                </div>
                <h2 className="text-xl font-bold text-femfuel-dark mb-2">Método de pago</h2>
                <p className="text-femfuel-medium">Elige cómo prefieres pagar</p>
              </div>

              {/* Mobile Payment Methods */}
              <div className="space-y-3">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.paymentMethod === "cash"
                      ? "border-femfuel-rose bg-femfuel-rose/5"
                      : "border-gray-200"
                  }`}
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: "cash" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      orderData.paymentMethod === "cash" ? "border-femfuel-rose" : "border-gray-300"
                    }`}>
                      {orderData.paymentMethod === "cash" && (
                        <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Contra Entrega</p>
                      <p className="text-sm text-femfuel-medium">Paga cuando recibas tu pedido</p>
                    </div>
                    <div className="text-xl">💰</div>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.paymentMethod === "card"
                      ? "border-femfuel-rose bg-femfuel-rose/5"
                      : "border-gray-200"
                  }`}
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: "card" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      orderData.paymentMethod === "card" ? "border-femfuel-rose" : "border-gray-300"
                    }`}>
                      {orderData.paymentMethod === "card" && (
                        <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Tarjeta</p>
                      <p className="text-sm text-femfuel-medium">Visa, Mastercard, Amex</p>
                    </div>
                    <CreditCard className="h-5 w-5 text-femfuel-medium" />
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.paymentMethod === "apple_pay"
                      ? "border-femfuel-rose bg-femfuel-rose/5"
                      : "border-gray-200"
                  }`}
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: "apple_pay" }))}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      orderData.paymentMethod === "apple_pay" ? "border-femfuel-rose" : "border-gray-300"
                    }`}>
                      {orderData.paymentMethod === "apple_pay" && (
                        <div className="w-3 h-3 bg-femfuel-rose rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-femfuel-dark">Apple Pay</p>
                      <p className="text-sm text-femfuel-medium">Touch ID o Face ID</p>
                    </div>
                    <div className="text-xl">🍎</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "review" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-femfuel-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-black" />
                </div>
                <h2 className="text-xl font-bold text-femfuel-dark mb-2">Confirmar pedido</h2>
                <p className="text-femfuel-medium">Revisa antes de finalizar</p>
              </div>

              {/* Mobile Cart Items */}
              <div className="space-y-3">
                <h3 className="font-semibold text-femfuel-dark">Productos ({itemCount})</h3>
                {cartItems.map((item) => {
                  const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                  return (
                    <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={primaryImage?.url || "/placeholder.svg?height=40&width=40"}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-femfuel-dark text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-femfuel-medium">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-black text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Mobile Total */}
              <div className="bg-femfuel-rose/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ITBIS</span>
                  <span>{formatPrice(itbisAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Entrega</span>
                  <span>{formatPrice(MOTO_DELIVERY_FEE)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-femfuel-dark">Total</span>
                    <span className="text-black text-lg">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "processing" && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-femfuel-rose/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-6 h-6 border-4 border-femfuel-rose border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-femfuel-dark mb-2">{processingStep}</h3>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
                    <div
                      className="bg-femfuel-rose h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Actions */}
        {(currentStep === "delivery" || currentStep === "payment" || currentStep === "review") && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            {currentStep === "delivery" && (
              <Button
                onClick={handleNextStep}
                disabled={!userLocation || !orderData.phone}
                className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white py-3 font-semibold"
              >
                Continuar al pago
              </Button>
            )}
            {currentStep === "payment" && (
              <Button
                onClick={handleNextStep}
                className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white py-3 font-semibold"
              >
                Revisar pedido
              </Button>
            )}
            {currentStep === "review" && (
              <Button
                onClick={onHandlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white font-semibold py-3"
              >
                {isProcessing ? "Procesando..." : `Confirmar pedido - ${formatPrice(finalTotal)}`}
              </Button>
            )}
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
      <AddCardModal
        showAddCardModal={showAddCardModal}
        setShowAddCardModal={setShowAddCardModal}
        cardFormData={cardFormData}
        setCardFormData={setCardFormData}
        handleAddCard={onHandleAddCard}
        isAddingCard={isAddingCard}
      />

      {/* Mobile Navigation */}
      {currentStep === "success" && (
        <MobileNavigation activeTab="shop" />
      )}
    </div>
  )
}