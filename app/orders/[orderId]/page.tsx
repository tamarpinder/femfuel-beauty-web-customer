"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Package, MapPin, CreditCard, Download, Phone, ShoppingBag, CheckCircle2, Truck, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

// Mock order data (same as cart page - will be replaced with API call)
const mockOrders = [
  {
    id: "FEM-00001234",
    date: "2025-11-25",
    orderTime: "14:30", // 2:30 PM - before 4 PM cutoff
    status: "delivered",
    total: 7780,
    subtotal: 7780,
    shipping: 0,
    tax: 0,
    deliveredDate: "2025-11-25", // Same day delivery (ordered before 4 PM)
    estimatedDelivery: "2025-11-25",
    paymentMethod: "Visa •••• 4242",
    trackingNumber: "FEM-TRACK-001234",
    items: [
      {
        id: "hero-featured-product-1",
        name: "Sérum Anti-Edad Premium Gold FemFuel",
        brand: "FemFuel Beauty",
        image: "/products/featured/hero-featured-product-1.png",
        quantity: 1,
        price: 4290
      },
      {
        id: "hero-featured-product-2",
        name: "Paleta de Sombras Signature FemFuel",
        brand: "FemFuel Beauty",
        image: "/products/featured/hero-featured-product-2.png",
        quantity: 1,
        price: 3490
      }
    ],
    deliveryAddress: {
      name: "María Rodríguez",
      street: "Av. Winston Churchill #1234",
      city: "Piantini",
      state: "Santo Domingo",
      zipCode: "10147",
      phone: "+1 (809) 555-1234"
    }
  },
  {
    id: "FEM-00001189",
    date: "2025-11-27",
    orderTime: "17:45", // 5:45 PM - after 4 PM cutoff
    status: "pending",
    total: 5580,
    subtotal: 5580,
    shipping: 0,
    tax: 0,
    estimatedDelivery: "2025-11-28", // Next day delivery (ordered after 4 PM)
    paymentMethod: "Mastercard •••• 5555",
    trackingNumber: "FEM-TRACK-001189",
    items: [
      {
        id: "hero-featured-product-4",
        name: "Base Líquida Cobertura HD FemFuel",
        brand: "FemFuel Beauty",
        image: "/products/featured/hero-featured-product-4.png",
        quantity: 1,
        price: 2690
      },
      {
        id: "hero-featured-product-3",
        name: "Mascarilla Capilar Keratina Intensiva",
        brand: "FemFuel Beauty",
        image: "/products/featured/hero-featured-product-3.png",
        quantity: 1,
        price: 2890
      }
    ],
    deliveryAddress: {
      name: "María Rodríguez",
      street: "Av. Winston Churchill #1234",
      city: "Piantini",
      state: "Santo Domingo",
      zipCode: "10147",
      phone: "+1 (809) 555-1234"
    }
  },
  {
    id: "FEM-00001098",
    date: "2025-11-15",
    orderTime: "10:20", // 10:20 AM - before 4 PM cutoff
    status: "cancelled",
    total: 4680,
    subtotal: 4680,
    shipping: 0,
    tax: 0,
    paymentMethod: "Visa •••• 4242",
    items: [
      {
        id: "serum-vitamin-c",
        name: "Sérum Vitamina C Iluminador FemFuel",
        brand: "FemFuel Beauty",
        image: "/products/skincare/serum-vitamin-c.png",
        quantity: 1,
        price: 2190
      },
      {
        id: "serum-retinol-night",
        name: "Sérum Retinol Reparación Nocturna FemFuel",
        brand: "FemFuel Beauty",
        image: "/products/skincare/serum-retinol-night.png",
        quantity: 1,
        price: 2490
      }
    ],
    deliveryAddress: {
      name: "María Rodríguez",
      street: "Av. Winston Churchill #1234",
      city: "Piantini",
      state: "Santo Domingo",
      zipCode: "10147",
      phone: "+1 (809) 555-1234"
    }
  }
]

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const orderId = params.orderId as string

  // Find the order
  const order = mockOrders.find(o => o.id === orderId)

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-femfuel-dark mb-2">Pedido no encontrado</h2>
          <p className="text-femfuel-medium mb-6">El pedido que buscas no existe</p>
          <Button
            onClick={() => router.push('/cart')}
            className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90"
          >
            Volver a Pedidos
          </Button>
        </div>
      </div>
    )
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          label: 'Entregado',
          icon: CheckCircle2,
          className: 'bg-green-50 text-green-700 border-green-200',
          progressSteps: 4
        }
      case 'pending':
        return {
          label: 'En camino',
          icon: Truck,
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          progressSteps: 3
        }
      case 'cancelled':
        return {
          label: 'Cancelado',
          icon: XCircle,
          className: 'bg-red-50 text-red-700 border-red-200',
          progressSteps: 0
        }
      default:
        return {
          label: 'Procesando',
          icon: Clock,
          className: 'bg-orange-50 text-orange-700 border-orange-200',
          progressSteps: 1
        }
    }
  }

  const statusConfig = getStatusConfig(order.status)
  const StatusIcon = statusConfig.icon

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleReorder = () => {
    // Add all items to cart
    order.items.forEach(item => {
      addToCart(item.id, item.quantity)
    })
    router.push('/cart')
  }

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download
    alert('Descargando factura...')
  }

  const handleContactSupport = () => {
    // TODO: Implement contact support
    router.push('/help')
  }

  // Timeline steps with same-day/next-day delivery logic
  const timelineSteps = [
    {
      label: 'Pedido realizado',
      date: order.date,
      time: order.orderTime,
      completed: true
    },
    {
      label: 'Confirmado y procesando',
      date: order.date,
      time: order.orderTime ? `${parseInt(order.orderTime.split(':')[0])}:${(parseInt(order.orderTime.split(':')[1]) + 5).toString().padStart(2, '0')}` : undefined,
      completed: statusConfig.progressSteps >= 2
    },
    {
      label: 'En camino',
      date: order.status === 'delivered' ? order.deliveredDate : order.estimatedDelivery,
      completed: statusConfig.progressSteps >= 3
    },
    {
      label: 'Entregado',
      date: order.deliveredDate,
      completed: statusConfig.progressSteps >= 4
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-24 pb-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/cart')}
            className="inline-flex items-center gap-2 text-femfuel-medium hover:text-femfuel-rose transition-colors duration-300 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Pedidos
          </button>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark font-serif mb-2">
                Pedido #{order.id}
              </h1>
              <p className="text-femfuel-medium">
                Realizado el {formatDate(order.date)} a las {order.orderTime}
              </p>
              {order.orderTime && (
                <p className="text-sm text-femfuel-medium mt-1">
                  {parseInt(order.orderTime.split(':')[0]) < 16
                    ? '✓ Entrega el mismo día (pedido antes de las 4:00 PM)'
                    : '✓ Entrega al día siguiente (pedido después de las 4:00 PM)'}
                </p>
              )}
            </div>
            <Badge className={`${statusConfig.className} border font-semibold text-lg px-4 py-2`}>
              <StatusIcon className="h-5 w-5 mr-2" />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            {order.status !== 'cancelled' && (
              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-femfuel-dark mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-femfuel-rose" />
                    Estado del Pedido
                  </h2>

                  <div className="relative">
                    {timelineSteps.map((step, index) => (
                      <div key={index} className="flex gap-4 mb-8 last:mb-0">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed
                              ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg'
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          {index < timelineSteps.length - 1 && (
                            <div className={`w-0.5 h-16 ${
                              step.completed ? 'bg-gradient-to-b from-femfuel-rose to-pink-600' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>

                        {/* Step Info */}
                        <div className="flex-1 pt-2">
                          <h3 className={`font-semibold ${
                            step.completed ? 'text-femfuel-dark' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </h3>
                          {step.date && step.completed && (
                            <p className="text-sm text-femfuel-medium mt-1">
                              {formatDate(step.date)}
                              {step.time && ` a las ${step.time}`}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.trackingNumber && order.status === 'pending' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-900 font-medium">
                        Número de seguimiento: <span className="font-bold">{order.trackingNumber}</span>
                      </p>
                    </div>
                  )}

                  {order.status === 'delivered' && order.deliveredDate && (
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-sm text-green-900 font-medium">
                        ✓ Entregado el {formatDate(order.deliveredDate)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-femfuel-dark mb-6 flex items-center gap-2">
                  <Package className="h-5 w-5 text-femfuel-rose" />
                  Productos ({order.items.length})
                </h2>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-femfuel-rose/30 transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-femfuel-dark text-base mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-femfuel-medium mb-2">
                          {item.brand}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-femfuel-medium">
                            Cantidad: <span className="font-semibold text-femfuel-dark">{item.quantity}</span>
                          </p>
                          <p className="font-bold text-femfuel-rose text-lg">
                            RD${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-femfuel-dark mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Subtotal</span>
                    <span className="font-semibold text-femfuel-dark">
                      RD${order.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Envío</span>
                    <span className="font-semibold text-green-600">
                      {order.shipping === 0 ? 'Gratis' : `RD$${order.shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-femfuel-medium">Impuestos</span>
                    <span className="font-semibold text-femfuel-dark">
                      RD${order.tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-femfuel-rose/10">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-femfuel-dark">Total</span>
                      <span className="text-2xl font-bold text-femfuel-rose">
                        RD${order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-1">
                    <CreditCard className="h-4 w-4" />
                    Método de pago
                  </div>
                  <p className="font-semibold text-femfuel-dark">
                    {order.paymentMethod}
                  </p>
                </div>

                {/* Delivery Address */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-2">
                    <MapPin className="h-4 w-4" />
                    Dirección de entrega
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-femfuel-dark">{order.deliveryAddress.name}</p>
                    <p className="text-femfuel-medium">{order.deliveryAddress.street}</p>
                    <p className="text-femfuel-medium">
                      {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                    </p>
                    <p className="text-femfuel-medium mt-1">{order.deliveryAddress.phone}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {order.status !== 'cancelled' && (
                    <Button
                      onClick={handleReorder}
                      className="w-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold py-3 rounded-full shadow-lg active:scale-95 transition-all duration-300"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Comprar de Nuevo
                    </Button>
                  )}

                  <Button
                    onClick={handleDownloadInvoice}
                    variant="outline"
                    className="w-full border-2 border-femfuel-rose/30 text-femfuel-dark hover:bg-femfuel-light hover:border-femfuel-rose font-semibold py-3 rounded-full transition-all duration-300"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Factura
                  </Button>

                  <Button
                    onClick={handleContactSupport}
                    variant="ghost"
                    className="w-full text-femfuel-medium hover:text-femfuel-dark hover:bg-femfuel-light/30 font-semibold py-3 rounded-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contactar Soporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
