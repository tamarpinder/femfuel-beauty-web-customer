"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Truck, MapPin, Clock, User, Phone } from "lucide-react"
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
    { id: "delivery", label: "Entrega", icon: MapPin },
    { id: "payment", label: "Pago", icon: CreditCard },
    { id: "review", label: "Revisar", icon: Check },
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => currentStep === "delivery" ? router.back() : handlePreviousStep()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {currentStep === "delivery" ? "Volver" : "Anterior"}
                </span>
              </Button>
              <div>
                <h1 className="text-lg font-bold text-femfuel-dark">Finalizar Compra</h1>
                <p className="text-sm text-femfuel-medium">
                  {itemCount} producto{itemCount !== 1 ? "s" : ""} • {formatPrice(finalTotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Step Indicator */}
            {currentStep !== "processing" && currentStep !== "success" && (
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex justify-between items-center overflow-x-auto">
                    {steps.map((step, index) => {
                      const StepIcon = step.icon
                      const isActive = step.id === currentStep
                      const isCompleted = steps.findIndex(s => s.id === currentStep) > index

                      return (
                        <div key={step.id} className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            isCompleted ? "bg-femfuel-rose border-femfuel-rose text-white" :
                            isActive ? "border-femfuel-rose text-femfuel-rose" :
                            "border-gray-300 text-gray-400"
                          }`}>
                            {isCompleted ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <StepIcon className="h-5 w-5" />
                            )}
                          </div>
                          <span className={`ml-2 lg:ml-3 text-xs lg:text-sm font-medium ${
                            isActive || isCompleted ? "text-femfuel-dark" : "text-gray-400"
                          }`}>
                            {step.label}
                          </span>
                          {index < steps.length - 1 && (
                            <div className={`hidden sm:block ml-8 mr-8 h-0.5 w-16 ${
                              isCompleted ? "bg-femfuel-rose" : "bg-gray-200"
                            }`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step Content */}
            {currentStep === "delivery" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-femfuel-rose" />
                    Información de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  {/* Location */}
                  <div>
                    <Label className="text-base font-medium">Dirección de Entrega</Label>
                    {userLocation ? (
                      <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-lg">
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
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLocationModal(true)}
                            className="text-green-600 border-green-200"
                          >
                            Cambiar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <Button
                          onClick={() => setShowLocationModal(true)}
                          className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Seleccionar Ubicación
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Delivery Option */}
                  <div>
                    <Label className="text-base font-medium">Método de Entrega</Label>
                    <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Truck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Entrega en Moto</p>
                            <p className="text-sm text-blue-600">30-60 minutos</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-800">{formatPrice(MOTO_DELIVERY_FEE)}</p>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Rápido
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="phone">Número de Teléfono</Label>
                      <div className="mt-1 relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(809) 123-4567"
                          value={orderData.phone}
                          onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Notas de Entrega (Opcional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Ej: Apartamento 3B, tocar timbre"
                        value={orderData.deliveryNotes}
                        onChange={(e) => setOrderData(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-femfuel-rose" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <RadioGroup
                    value={orderData.paymentMethod}
                    onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentMethod: value as "cash" | "card" }))}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">$</div>
                            </div>
                            <div>
                              <p className="font-medium">Pago Contra Entrega</p>
                              <p className="text-sm text-gray-600">Paga en efectivo cuando recibas tu pedido</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                        <RadioGroupItem value="card" id="card" disabled />
                        <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400">Tarjeta de Crédito/Débito</p>
                              <p className="text-sm text-gray-400">Próximamente disponible</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {currentStep === "review" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-femfuel-rose" />
                    Revisar Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h4 className="font-medium mb-3">Productos ({itemCount})</h4>
                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                        return (
                          <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={primaryImage?.url || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-gray-600">{item.product.brand}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Detalles de Entrega</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Dirección:</span>
                        <span className="text-right max-w-xs">{userLocation?.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Teléfono:</span>
                        <span>{orderData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Método:</span>
                        <span>Entrega en Moto (30-60 min)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pago:</span>
                        <span>{orderData.paymentMethod === "cash" ? "Contra Entrega" : "Tarjeta"}</span>
                      </div>
                      {orderData.deliveryNotes && (
                        <div className="flex justify-between">
                          <span>Notas:</span>
                          <span className="text-right max-w-xs">{orderData.deliveryNotes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "processing" && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-femfuel-rose mx-auto mb-6"></div>
                  <h3 className="text-xl font-semibold text-femfuel-dark mb-2">Procesando tu pedido...</h3>
                  <p className="text-femfuel-medium">Esto tomará solo unos segundos</p>
                </CardContent>
              </Card>
            )}

            {currentStep === "success" && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-femfuel-dark mb-2">¡Pedido Confirmado!</h3>
                  <p className="text-lg text-femfuel-medium mb-6">Tu pedido #{orderNumber} ha sido procesado</p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Entrega estimada: 30-60 minutos</span>
                    </div>
                    <p className="text-sm text-blue-600">Te notificaremos cuando tu moto esté en camino</p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => router.push("/shop")}
                      className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white"
                    >
                      Continuar Comprando
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/profile")}
                      className="w-full"
                    >
                      Ver Mis Pedidos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {currentStep !== "processing" && currentStep !== "success" && (
              <div className="flex gap-3 pt-4 border-t lg:border-t-0 lg:pt-0">
                {currentStep !== "delivery" && (
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="flex-1 h-12 lg:h-10"
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
                  className="flex-1 bg-femfuel-rose hover:bg-[#9f1853] text-white h-12 lg:h-10"
                >
                  {currentStep === "review" ? "Confirmar Pedido" : "Continuar"}
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="lg:sticky lg:top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} productos)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío (Moto)</span>
                      <span>{formatPrice(MOTO_DELIVERY_FEE)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-femfuel-rose">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Cart Preview */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3 text-sm">Productos</h4>
                    <div className="space-y-2">
                      {cartItems.slice(0, 3).map((item) => {
                        const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                        return (
                          <div key={item.productId} className="flex items-center gap-2">
                            <img
                              src={primaryImage?.url || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{item.product.name}</p>
                            </div>
                            <span className="text-xs">×{item.quantity}</span>
                          </div>
                        )
                      })}
                      {cartItems.length > 3 && (
                        <p className="text-xs text-gray-500">+{cartItems.length - 3} más</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="shop" />

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationUpdate={handleLocationUpdate}
        currentLocation={userLocation}
      />
    </div>
  )
}