"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Truck, MapPin, Heart, Package, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LocationModal } from "@/components/location-modal"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/contexts/cart-context"
import { mockProducts } from "@/data/products"
import { UserLocation } from "@/types/delivery"

// Mock order data (will be replaced with real data from backend)
// Using actual FemFuel Beauty products from catalog
const mockOrders = [
  {
    id: "FEM-00001234",
    date: "2025-11-25",
    status: "delivered",
    total: 7780,
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
    deliveryAddress: "Av. Winston Churchill, Piantini, Santo Domingo"
  },
  {
    id: "FEM-00001189",
    date: "2025-11-20",
    status: "pending",
    total: 5580,
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
    deliveryAddress: "Av. Abraham Lincoln, La Julia, Santo Domingo"
  },
  {
    id: "FEM-00001098",
    date: "2025-11-15",
    status: "cancelled",
    total: 4680,
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
    deliveryAddress: "Calle El Conde, Zona Colonial, Santo Domingo"
  }
]

export default function CartPage() {
  const router = useRouter()
  const {
    cart,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItems,
    userLocation,
    setUserLocation
  } = useCart()

  const [showLocationModal, setShowLocationModal] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [activeTab, setActiveTab] = useState("cart")
  const cartItems = getCartItems()

  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          label: 'Entregado',
          icon: CheckCircle2,
          className: 'bg-green-50 text-green-700 border-green-200'
        }
      case 'pending':
        return {
          label: 'En camino',
          icon: Truck,
          className: 'bg-blue-50 text-blue-700 border-blue-200'
        }
      case 'cancelled':
        return {
          label: 'Cancelado',
          icon: XCircle,
          className: 'bg-red-50 text-red-700 border-red-200'
        }
      default:
        return {
          label: 'Procesando',
          icon: Clock,
          className: 'bg-orange-50 text-orange-700 border-orange-200'
        }
    }
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    await updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId)
  }

  const handleClearCart = async () => {
    await clearCart()
  }

  const handleLocationUpdate = (location: UserLocation) => {
    setUserLocation(location)
    setShowLocationModal(false)
  }

  const handleBack = () => {
    router.back()
  }

  const handleContinueShopping = () => {
    router.push("/shop")
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  const handleReorder = (orderId: string) => {
    // TODO: Implement reorder functionality
  }

  const handleViewOrderDetails = (orderId: string) => {
    // TODO: Navigate to order details page
    router.push(`/orders/${orderId}`)
  }

  const isDeliveryAvailable = userLocation?.isServiceable

  // Related/suggested products
  const suggestedProducts = mockProducts
    .filter(p => p.availability.inStock && !cartItems.find(item => item.productId === p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      {/* Cart page content relies on SmartHeader from layout */}

      <div className="max-w-4xl mx-auto px-4 lg:pt-24 pb-6">
        {/* Tabs for Cart and Orders */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="cart" className="flex-1 min-h-[48px]">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Mi Carrito {cartItems.length > 0 && `(${itemCount})`}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex-1 min-h-[48px]">
              <Package className="h-4 w-4 mr-2" />
              Mis Pedidos
            </TabsTrigger>
          </TabsList>

          {/* Cart Tab */}
          <TabsContent value="cart" className="mt-0">
            {cartItems.length === 0 ? (
              // Empty Cart
              <div className="text-center py-20 px-4">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-femfuel-light rounded-full mb-6 shadow-lg">
                  <ShoppingBag className="h-12 w-12 text-femfuel-medium" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
                  Tu carrito está vacío
                </h2>
                <p className="text-base md:text-lg text-femfuel-medium mb-8 max-w-md mx-auto">
                  Descubre nuestra increíble colección de productos de belleza premium
                </p>
                <Button
                  onClick={handleContinueShopping}
                  className="min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white px-8 text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                >
                  Explorar Productos
                </Button>

                {/* Show recent orders if cart is empty */}
                {mockOrders.length > 0 && (
                  <div className="mt-12">
                    <p className="text-sm text-femfuel-medium mb-4">
                      ¿Buscas tus pedidos anteriores?
                    </p>
                    <Button
                      onClick={() => setActiveTab("orders")}
                      variant="outline"
                      className="min-h-[44px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose active:border-femfuel-rose"
                    >
                      Ver Mis Pedidos
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Location Info */}
                  <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-femfuel-light rounded-full flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-femfuel-rose" />
                          </div>
                          <div>
                            <p className="font-bold text-femfuel-dark">
                              {userLocation ? userLocation.district : "Ubicación no seleccionada"}
                            </p>
                            {userLocation && (
                              <p className="text-sm text-femfuel-medium">
                                {userLocation.address}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isDeliveryAvailable ? (
                            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                              <Truck className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-bold text-green-700">Entrega disponible</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
                              <span className="text-sm font-bold text-red-700">Entrega no disponible</span>
                            </div>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => setShowLocationModal(true)}
                            className="min-h-[44px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose active:border-femfuel-rose transition-all duration-300 text-sm"
                          >
                            Cambiar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Items Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark">
                      Productos ({itemCount})
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={handleClearCart}
                      className="min-h-[44px] text-red-600 hover:text-red-700 active:text-red-700 hover:bg-red-50 active:bg-red-50 font-semibold text-sm"
                    >
                      Vaciar carrito
                    </Button>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]

                      return (
                        <Card key={item.productId} className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              {/* Product Image */}
                              <div className="relative">
                                <img
                                  src={primaryImage?.url || "/placeholder.svg?height=120&width=120&query=beauty product"}
                                  alt={primaryImage?.alt || item.product.name}
                                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0 cursor-pointer transition-transform duration-300 shadow-md active:scale-95"
                                  onClick={() => router.push(`/shop/product/${item.product.slug}`)}
                                />
                                {item.product.isOnSale && (
                                  <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs shadow-lg">
                                    Oferta
                                  </Badge>
                                )}
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-femfuel-medium uppercase tracking-wide mb-1 font-bold">
                                      {item.product.brand}
                                    </p>
                                    <h3
                                      className="font-bold text-femfuel-dark hover:text-femfuel-rose cursor-pointer transition-colors"
                                      onClick={() => router.push(`/shop/product/${item.product.slug}`)}
                                    >
                                      {item.product.name}
                                    </h3>
                                    {item.product.volume && (
                                      <p className="text-sm text-femfuel-light mt-1">
                                        {item.product.volume}
                                      </p>
                                    )}
                                    {item.product.shortDescription && (
                                      <p className="text-sm text-femfuel-medium mt-2 line-clamp-2">
                                        {item.product.shortDescription}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleRemoveItem(item.productId)}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-red-500 hover:text-red-700 active:text-red-700 hover:bg-red-50 active:bg-red-50"
                                    aria-label="Eliminar producto"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </div>

                                {/* Stock Status */}
                                {item.product.availability.stockQuantity <= item.product.availability.lowStockThreshold && (
                                  <p className="text-sm text-orange-600 mb-3">
                                    ¡Solo quedan {item.product.availability.stockQuantity} unidades!
                                  </p>
                                )}

                                {/* Price and Quantity */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border-2 border-femfuel-rose/20 rounded-lg bg-white shadow-sm">
                                      <Button
                                        variant="ghost"
                                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-femfuel-light active:bg-femfuel-light"
                                        aria-label="Disminuir cantidad"
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <span className="px-4 py-2 text-center min-w-[3rem] font-bold">
                                        {item.quantity}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                        disabled={item.quantity >= item.product.availability.stockQuantity}
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-femfuel-light active:bg-femfuel-light"
                                        aria-label="Aumentar cantidad"
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>

                                    {/* Unit Price */}
                                    <div className="text-sm text-femfuel-medium">
                                      {formatPrice(item.product.price)} por unidad
                                    </div>
                                  </div>

                                  {/* Total Price */}
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-black">
                                      {formatPrice(item.product.price * item.quantity)}
                                    </p>
                                    {item.product.originalPrice && (
                                      <p className="text-sm text-femfuel-light line-through">
                                        {formatPrice(item.product.originalPrice * item.quantity)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Summary Card */}
                    <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-femfuel-dark">
                          Resumen del pedido
                        </h3>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-femfuel-medium">Subtotal ({itemCount} productos)</span>
                            <span className="font-medium text-femfuel-dark">{formatPrice(subtotal)}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-femfuel-medium">Envío</span>
                            <span className="font-medium text-femfuel-dark">
                              {deliveryFee === 0 ? (
                                <span className="text-green-600">Gratis</span>
                              ) : (
                                formatPrice(deliveryFee)
                              )}
                            </span>
                          </div>

                          <Separator />

                          <div className="flex justify-between text-lg">
                            <span className="font-semibold text-femfuel-dark">Total</span>
                            <span className="font-bold text-black">{formatPrice(total)}</span>
                          </div>
                        </div>

                        {/* Coupon Code */}
                        <div className="pt-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Código de descuento"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="flex-1 min-h-[44px]"
                            />
                            <Button variant="outline" className="min-h-[44px] text-sm">
                              Aplicar
                            </Button>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        {isDeliveryAvailable && userLocation?.deliveryZone && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Truck className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-800">Entrega disponible</span>
                            </div>
                            <p className="text-sm text-green-700">
                              Tiempo estimado: {userLocation.deliveryZone.deliveryOptions[0]?.estimatedTime || "1-2 horas"}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                          <Button
                            onClick={handleCheckout}
                            disabled={!isDeliveryAvailable}
                            className="w-full min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                          >
                            {isDeliveryAvailable ? "Proceder al pago" : "Entrega no disponible"}
                          </Button>

                          <Button
                            onClick={handleContinueShopping}
                            variant="outline"
                            className="w-full min-h-[44px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose active:border-femfuel-rose font-semibold rounded-full transition-all duration-300"
                          >
                            Continuar comprando
                          </Button>

                          {!isDeliveryAvailable && (
                            <p className="text-sm text-center text-red-600 font-semibold">
                              Selecciona una ubicación con entrega disponible
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Products */}
            {cartItems.length > 0 && suggestedProducts.length > 0 && (
              <div className="mt-16">
                <Separator className="mb-8" />
                <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-8">
                  También te podría interesar
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {suggestedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-0">
            {mockOrders.length === 0 ? (
              // Empty Orders State
              <div className="text-center py-20 px-4">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-femfuel-light rounded-full mb-6 shadow-lg">
                  <Package className="h-12 w-12 text-femfuel-medium" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
                  No tienes pedidos
                </h2>
                <p className="text-base md:text-lg text-femfuel-medium mb-8 max-w-md mx-auto">
                  Tus pedidos anteriores aparecerán aquí
                </p>
                <Button
                  onClick={handleContinueShopping}
                  className="min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white px-8 text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                >
                  Explorar Productos
                </Button>
              </div>
            ) : (
              // Orders List
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark">
                    Historial de Pedidos
                  </h2>
                  <p className="text-sm text-femfuel-medium">
                    {mockOrders.length} {mockOrders.length === 1 ? 'pedido' : 'pedidos'}
                  </p>
                </div>

                {mockOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status)
                  const StatusIcon = statusConfig.icon

                  return (
                    <Card key={order.id} className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        {/* Order Header */}
                        <div className="flex items-start justify-between mb-4 pb-4 border-b border-femfuel-rose/10">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-femfuel-dark">
                                Pedido #{order.id}
                              </h3>
                              <Badge className={`${statusConfig.className} border font-semibold`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-femfuel-medium">
                              {formatDate(order.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-femfuel-dark">
                              {formatPrice(order.total)}
                            </p>
                            <p className="text-sm text-femfuel-medium">
                              {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                  src={item.image || "/placeholder.svg?height=64&width=64"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-femfuel-dark text-sm line-clamp-1">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-femfuel-medium">
                                  {item.brand}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-femfuel-dark">
                                  x{item.quantity}
                                </p>
                                <p className="text-xs text-femfuel-medium">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-femfuel-light/30 rounded-lg p-3 mb-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-femfuel-rose mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-femfuel-medium mb-1">Dirección de entrega</p>
                              <p className="text-sm font-medium text-femfuel-dark">
                                {order.deliveryAddress}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleViewOrderDetails(order.id)}
                            variant="outline"
                            className="flex-1 min-h-[44px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose active:border-femfuel-rose font-semibold"
                          >
                            Ver Detalles
                          </Button>
                          {order.status === 'delivered' && (
                            <Button
                              onClick={() => handleReorder(order.id)}
                              className="flex-1 min-h-[44px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white font-semibold active:scale-95 transition-transform"
                            >
                              Volver a Pedir
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
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
