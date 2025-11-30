"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { useCart } from "@/contexts/cart-context"
import { LocationModal } from "@/components/location-modal"
import { UserLocation } from "@/types/delivery"
import { formatPrice } from "@/lib/price-utils"

interface CartDrawerProps {
  children: React.ReactNode
}

export function CartDrawer({ children }: CartDrawerProps) {
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
    setUserLocation,
    isCartOpen,
    setIsCartOpen
  } = useCart()
  
  const [showLocationModal, setShowLocationModal] = useState(false)
  const cartItems = getCartItems()


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

  const handleViewCart = () => {
    setIsCartOpen(false)
    router.push("/cart")
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push("/checkout")
  }

  const isDeliveryAvailable = userLocation?.isServiceable

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-4 py-4 border-b">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center gap-2 text-base md:text-lg">
                  <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                  Tu Carrito ({itemCount})
                </SheetTitle>
                {cartItems.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={handleClearCart}
                    className="min-h-[44px] text-red-600 hover:text-red-700 active:text-red-700 hover:bg-red-50 active:bg-red-50 text-sm"
                  >
                    Vaciar
                  </Button>
                )}
              </div>
            </SheetHeader>

            {/* Cart Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {cartItems.length === 0 ? (
                // Empty Cart
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-femfuel-medium mb-6">
                      Agrega productos increíbles de belleza a tu carrito
                    </p>
                    <Button
                      onClick={() => {
                        setIsCartOpen(false)
                        router.push("/shop")
                      }}
                      className="min-h-[44px] bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                    >
                      Explorar Productos
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Location Info */}
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-femfuel-medium" />
                        <div>
                          <p className="text-sm font-medium text-femfuel-dark">
                            {userLocation ? userLocation.district : "Ubicación no seleccionada"}
                          </p>
                          {userLocation && (
                            <p className="text-xs text-femfuel-medium">
                              {userLocation.city}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isDeliveryAvailable ? (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Truck className="h-3 w-3 mr-1" />
                            Disponible
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            No disponible
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          onClick={() => setShowLocationModal(true)}
                          className="min-h-[44px] text-xs text-femfuel-rose hover:text-femfuel-rose-hover active:text-femfuel-rose-hover"
                        >
                          Cambiar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.map((item) => {
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
                      
                      return (
                        <Card key={item.productId} className="shadow-sm">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              {/* Product Image */}
                              <OptimizedImage
                                src={primaryImage?.url || "/placeholder.svg?height=60&width=60&query=beauty product"}
                                alt={primaryImage?.alt || item.product.name}
                                width={60}
                                height={60}
                                className="w-15 h-15 rounded-lg flex-shrink-0"
                                context="product"
                              />

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs text-femfuel-medium uppercase tracking-wide truncate">
                                      {item.product.brand}
                                    </p>
                                    <h4 className="font-medium text-femfuel-dark text-sm leading-tight truncate">
                                      {item.product.name}
                                    </h4>
                                    {item.product.volume && (
                                      <p className="text-xs text-femfuel-light">
                                        {item.product.volume}
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

                                {/* Quantity and Price */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center border border-gray-200 rounded-md">
                                    <Button
                                      variant="ghost"
                                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                                      aria-label="Disminuir cantidad"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                      disabled={item.quantity >= item.product.availability.stockQuantity}
                                      className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                                      aria-label="Aumentar cantidad"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  
                                  <div className="text-right">
                                    <p className="font-semibold text-black">
                                      {formatPrice(item.product.price * item.quantity)}
                                    </p>
                                    {item.quantity > 1 && (
                                      <p className="text-xs text-femfuel-light">
                                        {formatPrice(item.product.price)} c/u
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Stock Warning */}
                                {item.product.availability.stockQuantity <= item.product.availability.lowStockThreshold && (
                                  <p className="text-xs text-orange-600 mt-1">
                                    ¡Solo quedan {item.product.availability.stockQuantity}!
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t bg-gray-50 p-4 space-y-4">
                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-femfuel-medium">Subtotal ({itemCount} productos)</span>
                        <span className="font-medium text-femfuel-dark">{formatPrice(subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
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
                      
                      <div className="flex justify-between">
                        <span className="font-semibold text-femfuel-dark">Total</span>
                        <span className="font-bold text-black text-lg">{formatPrice(total)}</span>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    {isDeliveryAvailable && userLocation?.deliveryZone && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              Entrega disponible
                            </p>
                            <p className="text-xs text-green-700">
                              Recibirás tu pedido en {userLocation.deliveryZone.deliveryOptions[0]?.estimatedTime || "1-2 horas"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleViewCart}
                        variant="outline"
                        className="w-full min-h-[44px]"
                      >
                        Ver carrito completo
                      </Button>

                      <Button
                        onClick={handleCheckout}
                        disabled={!isDeliveryAvailable}
                        className="w-full min-h-[48px] bg-femfuel-rose hover:bg-femfuel-rose-hover text-white font-semibold active:scale-95 transition-transform"
                      >
                        {isDeliveryAvailable ? "Proceder al pago" : "Entrega no disponible"}
                      </Button>

                      {!isDeliveryAvailable && (
                        <p className="text-xs text-center text-red-600">
                          Selecciona una ubicación con entrega disponible para continuar
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationUpdate={handleLocationUpdate}
        currentLocation={userLocation}
      />
    </>
  )
}