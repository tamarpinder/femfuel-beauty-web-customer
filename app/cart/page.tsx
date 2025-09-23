"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Truck, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { MobileNavigation } from "@/components/mobile-navigation"
import { LocationModal } from "@/components/location-modal"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/contexts/cart-context"
import { mockProducts } from "@/data/products"
import { UserLocation } from "@/types/delivery"

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
  const cartItems = getCartItems()

  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
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

  const isDeliveryAvailable = userLocation?.isServiceable

  // Related/suggested products
  const suggestedProducts = mockProducts
    .filter(p => p.availability.inStock && !cartItems.find(item => item.productId === p.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">{/* Cart page content relies on SmartHeader from layout */}

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-femfuel-dark mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-femfuel-medium mb-8 max-w-md mx-auto">
              Descubre nuestra increíble colección de productos de belleza premium
            </p>
            <Button
              onClick={handleContinueShopping}
              className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white px-8 py-3"
            >
              Explorar Productos
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-femfuel-medium" />
                      <div>
                        <p className="font-medium text-femfuel-dark">
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
                        <Badge className="bg-green-100 text-green-800">
                          <Truck className="h-4 w-4 mr-2" />
                          Entrega disponible
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          Entrega no disponible
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLocationModal(true)}
                      >
                        Cambiar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Items Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-femfuel-dark">
                  Productos ({itemCount})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  Vaciar carrito
                </Button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                  
                  return (
                    <Card key={item.productId} className="shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Product Image */}
                          <div className="relative">
                            <img
                              src={primaryImage?.url || "/placeholder.svg?height=120&width=120&query=beauty product"}
                              alt={primaryImage?.alt || item.product.name}
                              className="w-24 h-24 rounded-lg object-cover flex-shrink-0 cursor-pointer"
                              onClick={() => router.push(`/shop/product/${item.product.slug}`)}
                            />
                            {item.product.isOnSale && (
                              <Badge className="absolute -top-2 -left-2 bg-red-500 text-white text-xs">
                                Oferta
                              </Badge>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-femfuel-medium uppercase tracking-wide mb-1">
                                  {item.product.brand}
                                </p>
                                <h3 
                                  className="font-semibold text-femfuel-dark hover:text-femfuel-rose cursor-pointer transition-colors"
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
                                size="sm"
                                onClick={() => handleRemoveItem(item.productId)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
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
                                <div className="flex items-center border border-gray-200 rounded-lg">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="px-3 py-2"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                    disabled={item.quantity >= item.product.availability.stockQuantity}
                                    className="px-3 py-2"
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
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-femfuel-dark">
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
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
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
                        className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white py-3 font-semibold"
                      >
                        {isDeliveryAvailable ? "Proceder al pago" : "Entrega no disponible"}
                      </Button>
                      
                      <Button
                        onClick={handleContinueShopping}
                        variant="outline"
                        className="w-full"
                      >
                        Continuar comprando
                      </Button>

                      {!isDeliveryAvailable && (
                        <p className="text-sm text-center text-red-600">
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
          <div className="mt-12">
            <Separator className="mb-8" />
            <h3 className="text-xl font-semibold text-femfuel-dark mb-6">
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