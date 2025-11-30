"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { mockProducts } from "@/data/products"

interface ShopCartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShopCartDrawer({ open, onOpenChange }: ShopCartDrawerProps) {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, subtotal, getCartItems } = useCart()

  // Get cart items with product details
  const cartItemsWithDetails = getCartItems()

  const handleCheckout = () => {
    onOpenChange(false)
    router.push('/shop/checkout')
  }

  const handleContinueShopping = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl md:text-2xl font-bold text-femfuel-dark font-serif flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 md:h-5 md:w-5 text-femfuel-rose flex-shrink-0" />
              Tu Carrito
            </SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 active:bg-gray-100 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-femfuel-medium mt-1">
            {cartItemsWithDetails.length} {cartItemsWithDetails.length === 1 ? 'producto' : 'productos'}
          </p>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          {cartItemsWithDetails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-sm text-femfuel-medium mb-6">
                ¡Agrega productos para comenzar tu compra!
              </p>
              <Button
                onClick={handleContinueShopping}
                className="min-h-[44px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white"
              >
                Explorar Productos
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItemsWithDetails.map(item => {
                if (!item.product) return null

                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-femfuel-rose/30 transition-all"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.product.images[0]?.url || '/placeholder.png'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-femfuel-dark text-sm line-clamp-2 mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-femfuel-medium mb-2">
                        {item.product.brand}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="min-w-[44px] min-h-[44px] rounded-full border border-gray-300 hover:border-femfuel-rose active:border-femfuel-rose hover:bg-femfuel-light active:bg-femfuel-light flex items-center justify-center transition-all"
                            disabled={item.quantity <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="min-w-[44px] min-h-[44px] rounded-full border border-gray-300 hover:border-femfuel-rose active:border-femfuel-rose hover:bg-femfuel-light active:bg-femfuel-light flex items-center justify-center transition-all"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-femfuel-rose text-sm">
                            RD${(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-femfuel-medium">
                              RD${item.product.price.toLocaleString()} c/u
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="self-start min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-red-50 active:bg-red-50 rounded-full transition-colors"
                      aria-label="Eliminar producto del carrito"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer with Subtotal and Actions */}
        {cartItemsWithDetails.length > 0 && (
          <div className="border-t border-gray-200 p-4 md:p-6 space-y-4 bg-gray-50">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-femfuel-medium">Subtotal</span>
                <span className="font-semibold text-femfuel-dark">
                  RD${subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-femfuel-medium">
                Envío e impuestos calculados al finalizar la compra
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleCheckout}
                className="w-full min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold rounded-full shadow-lg active:scale-95 transition-all duration-300"
              >
                Proceder al Pago
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => {
                  onOpenChange(false)
                  router.push('/cart')
                }}
                variant="outline"
                className="w-full min-h-[44px] border-2 border-femfuel-rose/30 text-femfuel-dark hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose active:border-femfuel-rose font-semibold rounded-full transition-all duration-300"
              >
                Ver Carrito Completo
              </Button>

              <Button
                onClick={handleContinueShopping}
                variant="ghost"
                className="w-full min-h-[44px] text-femfuel-medium hover:text-femfuel-dark hover:bg-femfuel-light/30 active:bg-femfuel-light/30 font-semibold rounded-full"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
