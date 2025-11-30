"use client"

import Image from "next/image"
import { ShoppingBag, Tag, Truck, Calculator } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"

interface CheckoutCartSummaryProps {
  shippingCost?: number
  taxRate?: number
}

export function CheckoutCartSummary({
  shippingCost = 0,
  taxRate = 0.18 // 18% ITBIS
}: CheckoutCartSummaryProps) {
  const { getCartItems, subtotal, itemCount } = useCart()
  const cartItems = getCartItems()

  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  return (
    <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border-2 border-femfuel-rose/10 md:sticky md:top-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-femfuel-rose/10">
        <ShoppingBag className="h-5 w-5 md:h-4 md:w-4 text-femfuel-rose flex-shrink-0" />
        <h3 className="font-bold text-femfuel-dark text-base md:text-lg">
          Resumen del Pedido
        </h3>
        <Badge className="ml-auto bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-xs">
          {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
        </Badge>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {cartItems.map(item => {
          if (!item.product) return null

          return (
            <div
              key={item.productId}
              className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={item.product.images[0]?.url || '/placeholder.png'}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-femfuel-dark line-clamp-2">
                  {item.product.name}
                </p>
                <p className="text-xs text-femfuel-medium mt-1">
                  {item.product.brand}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-femfuel-medium">
                    Cantidad: {item.quantity}
                  </span>
                  <span className="text-sm font-bold text-femfuel-rose">
                    RD${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t border-femfuel-rose/10">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-femfuel-medium" />
            <span className="text-femfuel-medium">Subtotal</span>
          </div>
          <span className="font-semibold text-femfuel-dark">
            RD${subtotal.toLocaleString()}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-femfuel-medium" />
            <span className="text-femfuel-medium">Envío</span>
          </div>
          <span className="font-semibold text-femfuel-dark">
            {shippingCost === 0 ? (
              <span className="text-green-600 font-bold">Gratis</span>
            ) : (
              `RD$${shippingCost.toLocaleString()}`
            )}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-femfuel-medium" />
            <span className="text-femfuel-medium">ITBIS (18%)</span>
          </div>
          <span className="font-semibold text-femfuel-dark">
            RD${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        {/* Total */}
        <div className="pt-3 border-t border-femfuel-rose/10">
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg font-bold text-femfuel-dark">Total</span>
            <span className="text-xl md:text-2xl font-bold text-femfuel-rose">
              RD${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-4 pt-4 border-t border-femfuel-rose/10">
        <div className="flex items-center gap-2 text-xs text-femfuel-medium">
          <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Pago seguro y protegido</span>
        </div>
      </div>
    </div>
  )
}
