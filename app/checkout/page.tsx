"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Truck, MapPin, Clock, Phone, Star, Shield, RotateCcw, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LocationModal } from "@/components/location-modal"
import { useCart } from "@/contexts/cart-context"
import { UserLocation } from "@/types/delivery"

type CheckoutStep = "delivery" | "payment" | "review" | "processing" | "success"

interface OrderData {
  phone: string
  deliveryNotes: string
  paymentMethod: "cash" | "card"
  cardDetails?: {
    number: string
    expiry: string
    cvv: string
    name: string
  }
}

export default function CheckoutPage() {
  const router = useRouter()
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

  const cartItems = getCartItems()
  const MOTO_DELIVERY_FEE = 300
  const finalTotal = subtotal + MOTO_DELIVERY_FEE

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
    const stepOrder: CheckoutStep[] = ["delivery", "payment", "review"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setCurrentStep("processing")

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Generate order number
    const orderNum = `FF${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)

    // Clear cart and show success
    await clearCart()
    setCurrentStep("success")
    setIsProcessing(false)
  }

  if (itemCount === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-rose via-[#9333ea] to-[#3b82f6] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-femfuel-gold/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Panel - Brand Experience */}
        <div className="w-3/5 relative flex flex-col justify-center items-center p-12 text-white">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => currentStep === "delivery" ? router.back() : handlePreviousStep()}
            className="absolute top-8 left-8 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === "delivery" ? "Volver a la tienda" : "Anterior"}
          </Button>

          {/* Progress Steps */}
          {currentStep !== "processing" && currentStep !== "success" && (
            <div className="absolute top-8 right-8 flex items-center gap-3">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index
                const StepIcon = step.icon

                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted ? "bg-white border-white text-femfuel-rose" :
                      isActive ? "border-white text-white bg-white/20" :
                      "border-white/40 text-white/40"
                    }`}>
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`ml-3 mr-3 h-0.5 w-8 transition-all ${
                        isCompleted ? "bg-white" : "bg-white/20"
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
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Truck className="h-10 w-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    ¡Ya casi tienes tu belleza!
                  </h1>
                  <p className="text-xl text-white/80">
                    Confirma tu ubicación para recibir tus productos de belleza favoritos
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-white/80">30-60 min</p>
                    <p className="text-xs text-white/60">Entrega rápida</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-white/80">100% Seguro</p>
                    <p className="text-xs text-white/60">Pago protegido</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <RotateCcw className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-white/80">30 días</p>
                    <p className="text-xs text-white/60">Garantía</p>
                  </div>
                </div>
              </>
            )}

            {currentStep === "payment" && (
              <>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <CreditCard className="h-10 w-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Método de pago
                  </h1>
                  <p className="text-xl text-white/80">
                    Elige cómo prefieres pagar tu pedido
                  </p>
                </div>
              </>
            )}

            {currentStep === "review" && (
              <>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    ¡Perfecto!
                  </h1>
                  <p className="text-xl text-white/80">
                    Revisa los detalles de tu pedido antes de confirmar
                  </p>
                </div>
              </>
            )}

            {currentStep === "processing" && (
              <div className="space-y-8">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
                    Procesando tu pedido...
                  </h1>
                  <p className="text-xl text-white/80">
                    Estamos preparando todo para ti
                  </p>
                </div>
              </div>
            )}

            {currentStep === "success" && (
              <div className="space-y-8">
                <div className="w-24 h-24 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                  <Check className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
                    ¡Pedido confirmado!
                  </h1>
                  <p className="text-xl text-white/80 mb-2">
                    Pedido #{orderNumber}
                  </p>
                  <p className="text-white/60">
                    Tu moto está en camino. Te notificaremos cuando esté cerca.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Truck className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Entrega en 30-60 minutos</span>
                  </div>
                  <p className="text-white/60 text-sm">
                    Recibirás notificaciones en tiempo real del estado de tu pedido
                  </p>
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
        <div className="w-2/5 bg-white/10 backdrop-blur-xl border-l border-white/20 flex flex-col">
          {/* Form Header */}
          <div className="p-8 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentStep === "delivery" ? "Información de entrega" :
               currentStep === "payment" ? "Método de pago" :
               currentStep === "review" ? "Revisar pedido" : ""}
            </h2>
            <p className="text-white/60">
              {itemCount} producto{itemCount !== 1 ? "s" : ""} • {formatPrice(finalTotal)}
            </p>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {currentStep === "delivery" && (
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <Label className="text-white font-medium mb-3 block">Dirección de Entrega</Label>
                  {userLocation ? (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-femfuel-gold mt-0.5" />
                          <div>
                            <p className="font-medium text-white">{userLocation.district}</p>
                            <p className="text-sm text-white/70">{userLocation.address}</p>
                            <p className="text-sm text-white/50">{userLocation.city}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowLocationModal(true)}
                          className="text-femfuel-gold hover:bg-white/10"
                        >
                          Cambiar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowLocationModal(true)}
                      className="w-full bg-femfuel-gold hover:bg-femfuel-gold/90 text-femfuel-dark font-semibold h-12"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Seleccionar Ubicación
                    </Button>
                  )}
                </div>

                {/* Delivery Option */}
                <div>
                  <Label className="text-white font-medium mb-3 block">Método de Entrega</Label>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-femfuel-gold/20 rounded-lg">
                          <Truck className="h-5 w-5 text-femfuel-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Entrega en Moto</p>
                          <p className="text-sm text-white/70">30-60 minutos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-femfuel-gold">{formatPrice(MOTO_DELIVERY_FEE)}</p>
                        <Badge className="bg-femfuel-gold/20 text-femfuel-gold text-xs border-0 mt-1">
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
                    <Label htmlFor="phone" className="text-white font-medium">Número de Teléfono</Label>
                    <div className="mt-2 relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(809) 123-4567"
                        value={orderData.phone}
                        onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-femfuel-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white font-medium">Notas de Entrega (Opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Ej: Apartamento 3B, tocar timbre"
                      value={orderData.deliveryNotes}
                      onChange={(e) => setOrderData(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                      className="mt-2 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-femfuel-gold"
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
                  onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentMethod: value as "cash" | "card" }))}
                >
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="cash" id="cash" className="border-white/30 text-femfuel-gold" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                              <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">$</div>
                            </div>
                            <div>
                              <p className="font-medium text-white">Pago Contra Entrega</p>
                              <p className="text-sm text-white/70">Paga en efectivo cuando recibas tu pedido</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 opacity-50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" disabled className="border-white/20" />
                        <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <CreditCard className="h-5 w-5 text-white/40" />
                            </div>
                            <div>
                              <p className="font-medium text-white/40">Tarjeta de Crédito/Débito</p>
                              <p className="text-sm text-white/30">Próximamente disponible</p>
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
                  <h4 className="font-medium text-white mb-4">Productos ({itemCount})</h4>
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                      return (
                        <div key={item.productId} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                          <img
                            src={primaryImage?.url || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">{item.product.name}</p>
                            <p className="text-xs text-white/60">{item.product.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-femfuel-gold">{formatPrice(item.product.price * item.quantity)}</p>
                            <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-medium text-white mb-4">Detalles de Entrega</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Dirección:</span>
                      <span className="text-white text-right max-w-xs">{userLocation?.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Teléfono:</span>
                      <span className="text-white">{orderData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Método:</span>
                      <span className="text-white">Entrega en Moto (30-60 min)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Pago:</span>
                      <span className="text-white">{orderData.paymentMethod === "cash" ? "Contra Entrega" : "Tarjeta"}</span>
                    </div>
                    {orderData.deliveryNotes && (
                      <div className="flex justify-between">
                        <span className="text-white/70">Notas:</span>
                        <span className="text-white text-right max-w-xs">{orderData.deliveryNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="p-8 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/70">
                <span>Subtotal ({itemCount} productos)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Envío (Moto)</span>
                <span>{formatPrice(MOTO_DELIVERY_FEE)}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-femfuel-gold">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {currentStep !== "processing" && currentStep !== "success" && (
              <div className="flex gap-3">
                {currentStep !== "delivery" && (
                  <Button
                    variant="ghost"
                    onClick={handlePreviousStep}
                    className="flex-1 text-white border-white/20 hover:bg-white/10"
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
                  className="flex-1 bg-femfuel-gold hover:bg-femfuel-gold/90 text-femfuel-dark font-semibold h-12"
                >
                  {currentStep === "review" ? "Confirmar Pedido" : "Continuar"}
                </Button>
              </div>
            )}

            {currentStep === "success" && (
              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/shop")}
                  className="w-full bg-femfuel-gold hover:bg-femfuel-gold/90 text-femfuel-dark font-semibold h-12"
                >
                  Continuar Comprando
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/profile")}
                  className="w-full text-white border-white/20 hover:bg-white/10"
                >
                  Ver Mis Pedidos
                </Button>
              </div>
            )}
          </div>
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
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === "delivery" ? "Tienda" : "Anterior"}
          </Button>

          {currentStep !== "processing" && currentStep !== "success" && (
            <div className="text-white text-sm">
              Paso {steps.findIndex(s => s.id === currentStep) + 1} de {steps.length}
            </div>
          )}
        </div>

        {/* Mobile Content */}
        <div className="px-4 pb-24">
          <div className="max-w-md mx-auto">
            {/* Step Content - Same as desktop but adapted for mobile */}
            {currentStep === "delivery" && (
              <div className="space-y-6 text-white">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold">Información de entrega</h1>
                  <p className="text-white/80">{itemCount} producto{itemCount !== 1 ? "s" : ""} • {formatPrice(finalTotal)}</p>
                </div>

                {/* Mobile form content - same as desktop */}
                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <Label className="text-white font-medium mb-3 block">Dirección de Entrega</Label>
                    {userLocation ? (
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-femfuel-gold mt-0.5" />
                            <div>
                              <p className="font-medium text-white">{userLocation.district}</p>
                              <p className="text-sm text-white/70">{userLocation.address}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowLocationModal(true)}
                            className="text-femfuel-gold"
                          >
                            Cambiar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowLocationModal(true)}
                        className="w-full bg-femfuel-gold hover:bg-femfuel-gold/90 text-femfuel-dark font-semibold h-12"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Seleccionar Ubicación
                      </Button>
                    )}
                  </div>

                  {/* Moto Delivery */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-femfuel-gold/20 rounded-lg">
                          <Truck className="h-5 w-5 text-femfuel-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Entrega en Moto</p>
                          <p className="text-sm text-white/70">30-60 minutos</p>
                        </div>
                      </div>
                      <p className="font-semibold text-femfuel-gold">{formatPrice(MOTO_DELIVERY_FEE)}</p>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <Label htmlFor="phone-mobile" className="text-white font-medium">Número de Teléfono</Label>
                    <div className="mt-2 relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="phone-mobile"
                        type="tel"
                        placeholder="(809) 123-4567"
                        value={orderData.phone}
                        onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 h-12"
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
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-xl border-t border-white/20">
            <div className="flex gap-3">
              {currentStep !== "delivery" && (
                <Button
                  variant="ghost"
                  onClick={handlePreviousStep}
                  className="flex-1 text-white border-white/20 hover:bg-white/10 h-12"
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
                className="flex-1 bg-femfuel-gold hover:bg-femfuel-gold/90 text-femfuel-dark font-semibold h-12"
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

      {/* Mobile Navigation - only show on non-checkout steps */}
      {currentStep === "success" && (
        <MobileNavigation activeTab="shop" />
      )}
    </div>
  )
}