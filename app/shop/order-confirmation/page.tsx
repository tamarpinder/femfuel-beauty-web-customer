"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ShopHeader } from "@/components/shop/shop-header"
import { CheckCircle2, Package, MapPin, CreditCard, Truck, Calendar, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ShippingInfo } from "@/components/shop/checkout/shipping-step"
import type { PaymentInfo } from "@/components/shop/checkout/payment-step"
import type { CartItem, Product } from "@/types/product"

type OrderItem = CartItem & { product: Product }

interface OrderData {
  orderNumber: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  orderDate: string
}

const paymentMethodNames: Record<string, string> = {
  cash: "Pago Contra Entrega",
  card: "Tarjeta de Crédito/Débito",
  transfer: "Transferencia Bancaria",
  mobile: "Pago Móvil"
}

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Give a moment for everything to load
    const loadOrderData = () => {
      const savedOrder = localStorage.getItem('last-order')

      if (savedOrder) {
        try {
          const data = JSON.parse(savedOrder)
          setOrderData(data)
          setIsLoading(false)
        } catch (error) {
          console.error('Error parsing order data:', error)
          setIsLoading(false)
          router.push('/shop')
        }
      } else {
        // No order data found
        setIsLoading(false)
        // Only redirect if we truly have no order number
        if (!orderNumber) {
          router.push('/shop')
        }
      }
    }

    // Small delay to ensure localStorage is ready
    const timer = setTimeout(loadOrderData, 100)
    return () => clearTimeout(timer)
  }, [orderNumber, router])

  if (isLoading) {
    return (
      <>
        <ShopHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-femfuel-rose border-t-transparent mx-auto mb-4"></div>
            <p className="text-femfuel-medium">Cargando confirmación...</p>
          </div>
        </div>
      </>
    )
  }

  if (!orderData) {
    return (
      <>
        <ShopHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-femfuel-medium">No se encontró información del pedido</p>
            <Button
              onClick={() => router.push('/shop')}
              className="mt-4 bg-gradient-to-r from-femfuel-rose to-pink-600 text-white"
            >
              Volver a la Tienda
            </Button>
          </div>
        </div>
      </>
    )
  }

  const estimatedDeliveryDate = new Date()
  estimatedDeliveryDate.setHours(16, 0, 0, 0) // 4:00 PM today
  const currentTime = new Date()

  // If it's past 4 PM or order was placed after 4 PM, delivery is tomorrow
  if (currentTime.getHours() >= 16) {
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 1)
  }

  const savedCard = orderData.paymentInfo.method === "saved-card"
    ? JSON.parse(localStorage.getItem('mockCustomerUser') || '{}')?.paymentMethods?.find(
        (pm: any) => pm.id === orderData.paymentInfo.savedCardId
      )
    : null

  return (
    <>
      {/* Shop Header */}
      <ShopHeader />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-femfuel-light/30 to-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Hero */}
          <div className="text-center mb-12 animate-[fade-in_0.5s_ease-out]">
            {/* Success Icon */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-[scale-in_0.5s_ease-out]">
                  <CheckCircle2 className="h-20 w-20 text-white" strokeWidth={2.5} />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl animate-pulse"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-4 font-serif">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-lg text-femfuel-medium mb-2">
              Gracias por tu compra
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 px-6 py-3 rounded-full border-2 border-femfuel-rose/20">
              <Package className="h-5 w-5 text-femfuel-rose" />
              <span className="font-bold text-femfuel-dark">
                Orden #{orderData.orderNumber}
              </span>
            </div>
          </div>

          {/* Delivery Estimate */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500 rounded-full">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 text-lg mb-1">
                  Entrega Estimada
                </h3>
                <p className="text-green-700 text-lg font-semibold">
                  {estimatedDeliveryDate.toLocaleDateString('es-DO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {currentTime.getHours() < 16
                    ? "Tu pedido será entregado hoy antes de las 8:00 PM"
                    : "Tu pedido será entregado mañana"}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Confirmación enviada por email
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Hemos enviado los detalles de tu pedido a {orderData.shippingInfo.email}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column: Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-2xl border-2 border-femfuel-rose/10 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-femfuel-rose/10">
                  <Package className="h-5 w-5 text-femfuel-rose" />
                  <h3 className="font-bold text-femfuel-dark text-lg">
                    Productos Ordenados
                  </h3>
                  <Badge className="ml-auto bg-gradient-to-r from-femfuel-rose to-pink-600 text-white">
                    {orderData.items.length} {orderData.items.length === 1 ? 'producto' : 'productos'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {orderData.items.map(item => {
                    if (!item.product) return null

                    return (
                      <div
                        key={item.productId}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image
                            src={item.product.images[0]?.url || '/placeholder.png'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-femfuel-dark line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-femfuel-medium mt-1">
                            {item.product.brand}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-femfuel-medium">
                              Cantidad: {item.quantity}
                            </span>
                            <span className="font-bold text-femfuel-rose">
                              RD${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-2xl border-2 border-femfuel-rose/10 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-femfuel-rose" />
                  <h3 className="font-bold text-femfuel-dark text-lg">
                    Información de Entrega
                  </h3>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-femfuel-dark">
                    {orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}
                  </p>
                  <p className="text-femfuel-medium">{orderData.shippingInfo.phone}</p>
                  <p className="text-femfuel-medium">
                    {orderData.shippingInfo.address}
                  </p>
                  <p className="text-femfuel-medium">
                    {orderData.shippingInfo.city}, {orderData.shippingInfo.province}
                    {orderData.shippingInfo.postalCode && ` ${orderData.shippingInfo.postalCode}`}
                  </p>
                  {orderData.shippingInfo.deliveryInstructions && (
                    <p className="text-femfuel-medium italic pt-2 border-t border-gray-200">
                      Instrucciones: {orderData.shippingInfo.deliveryInstructions}
                    </p>
                  )}
                </div>

                {/* Shipping Method */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-femfuel-rose" />
                      <span className="text-sm font-semibold text-femfuel-dark">
                        Entrega por Moto
                      </span>
                    </div>
                    <span className="text-sm font-bold text-femfuel-rose">
                      RD${orderData.shippingCost.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-femfuel-medium mt-1">
                    Pedidos realizados antes de las 4:00PM serán entregados el mismo día
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl border-2 border-femfuel-rose/10 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-femfuel-rose" />
                  <h3 className="font-bold text-femfuel-dark text-lg">
                    Método de Pago
                  </h3>
                </div>

                {savedCard ? (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-femfuel-dark">
                      {savedCard.brand?.toUpperCase()} •••• {savedCard.cardNumber}
                    </p>
                    <p className="text-xs text-femfuel-medium">
                      {savedCard.cardHolderName} • Expira {savedCard.expiryDate}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-femfuel-dark">
                    {paymentMethodNames[orderData.paymentInfo.method]}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-femfuel-rose/5 to-pink-500/5 rounded-2xl border-2 border-femfuel-rose/20 p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-femfuel-dark text-lg mb-4">
                  Resumen del Pedido
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Subtotal</span>
                    <span className="font-semibold text-femfuel-dark">
                      RD${orderData.subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Envío</span>
                    <span className="font-semibold text-femfuel-dark">
                      RD${orderData.shippingCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">ITBIS (18%)</span>
                    <span className="font-semibold text-femfuel-dark">
                      RD${orderData.tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="pt-3 border-t-2 border-femfuel-rose/20">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-femfuel-dark">Total</span>
                      <span className="text-2xl font-bold text-femfuel-rose">
                        RD${orderData.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-white rounded-2xl border-2 border-femfuel-rose/10 p-6 mb-8 shadow-sm">
            <h3 className="font-bold text-femfuel-dark text-lg mb-4">
              ¿Qué sigue?
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-femfuel-rose text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-femfuel-dark">Preparando tu pedido</p>
                  <p className="text-sm text-femfuel-medium">
                    Estamos empacando tus productos con cuidado
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-femfuel-rose text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-femfuel-dark">En camino</p>
                  <p className="text-sm text-femfuel-medium">
                    Nuestro motorista saldrá a entregarte tu pedido
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-femfuel-rose text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-femfuel-dark">Entregado</p>
                  <p className="text-sm text-femfuel-medium">
                    ¡Disfruta tus productos FemFuel Beauty!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500 rounded-full">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 text-lg mb-2">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-purple-700 text-sm mb-3">
                  Nuestro equipo está disponible para asistirte
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-600" />
                    <span className="text-purple-900 font-semibold">+1 (809) 555-0100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-600" />
                    <span className="text-purple-900 font-semibold">soporte@femfuelbeauty.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => router.push('/shop')}
              className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold shadow-lg h-12"
            >
              Seguir Comprando
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => router.push('/profile?section=orders')}
              variant="outline"
              className="flex-1 border-2 border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light/30 h-12"
            >
              Ver Mis Pedidos
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
