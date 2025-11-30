"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CheckCircle2, MapPin, CreditCard, Package, Edit, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { ShippingInfo } from "./shipping-step"
import { PaymentInfo } from "./payment-step"
import { toast } from "sonner"

interface ReviewStepProps {
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  onBack: () => void
  onEditShipping: () => void
  onEditPayment: () => void
}

const paymentMethodNames: Record<string, string> = {
  cash: "Pago Contra Entrega",
  card: "Tarjeta de Crédito/Débito",
  transfer: "Transferencia Bancaria",
  mobile: "Pago Móvil"
}

export function ReviewStep({
  shippingInfo,
  paymentInfo,
  onBack,
  onEditShipping,
  onEditPayment
}: ReviewStepProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { getCartItems, subtotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const cartItems = getCartItems()
  const shippingCost = shippingInfo.shippingCost
  const taxRate = 0.18 // 18% ITBIS
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  // Get saved card details if using saved payment method
  const savedCard = paymentInfo.method === "saved-card" && paymentInfo.savedCardId
    ? user?.paymentMethods?.find(pm => pm.id === paymentInfo.savedCardId)
    : null

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Show success animation
      setShowSuccess(true)

      // Wait for success animation
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generate order number
      const orderNumber = `FEM-${Date.now()}`

      // Save order data to localStorage for confirmation page
      const orderData = {
        orderNumber,
        items: cartItems,
        shippingInfo,
        paymentInfo,
        subtotal,
        shippingCost,
        tax,
        total,
        orderDate: new Date().toISOString()
      }

      localStorage.setItem('last-order', JSON.stringify(orderData))

      // Clear cart
      clearCart()

      // Clear checkout data
      localStorage.removeItem('checkout-shipping')
      localStorage.removeItem('checkout-payment')

      // Small delay to ensure localStorage write completes
      await new Promise(resolve => setTimeout(resolve, 100))

      // Redirect to order confirmation
      router.push(`/shop/order-confirmation?order=${orderNumber}`)
    } catch (error) {
      toast.error("Error al procesar el pedido. Intenta nuevamente.")
      setIsSubmitting(false)
      setShowSuccess(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-femfuel-rose/10">
        <div className="p-3 bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 rounded-full">
          <CheckCircle2 className="h-6 w-6 text-femfuel-rose" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-femfuel-dark font-serif">
            Revisar tu Pedido
          </h2>
          <p className="text-sm text-femfuel-medium">
            Confirma que todo esté correcto
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl border-2 border-femfuel-rose/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-femfuel-rose" />
            <h3 className="font-bold text-femfuel-dark">
              Productos ({cartItems.length})
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {cartItems.map(item => {
            if (!item.product) return null

            return (
              <div
                key={item.productId}
                className="flex gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]?.url || '/placeholder.png'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-femfuel-dark line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-femfuel-medium">{item.product.brand}</p>
                  <div className="flex items-center justify-between mt-1">
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
      </div>

      {/* Shipping Information */}
      <div className="bg-white rounded-xl border-2 border-femfuel-rose/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-femfuel-rose" />
            <h3 className="font-bold text-femfuel-dark">Información de Envío</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditShipping}
            className="text-femfuel-rose hover:text-femfuel-rose/80"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-femfuel-dark">
            {shippingInfo.firstName} {shippingInfo.lastName}
          </p>
          <p className="text-femfuel-medium">{shippingInfo.email}</p>
          <p className="text-femfuel-medium">{shippingInfo.phone}</p>
          <p className="text-femfuel-medium">
            {shippingInfo.address}
          </p>
          <p className="text-femfuel-medium">
            {shippingInfo.city}, {shippingInfo.province}
            {shippingInfo.postalCode && ` ${shippingInfo.postalCode}`}
          </p>
          {shippingInfo.deliveryInstructions && (
            <p className="text-femfuel-medium italic pt-2 border-t border-gray-200">
              Instrucciones: {shippingInfo.deliveryInstructions}
            </p>
          )}
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white rounded-xl border-2 border-femfuel-rose/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-femfuel-rose" />
            <h3 className="font-bold text-femfuel-dark">Método de Envío</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditShipping}
            className="text-femfuel-rose hover:text-femfuel-rose/80"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-femfuel-dark">
            Entrega por Moto
          </p>
          <p className="text-sm font-bold text-femfuel-rose">
            RD${shippingInfo.shippingCost.toLocaleString()}
          </p>
        </div>
        <p className="text-xs text-femfuel-medium mt-1">
          Pedidos realizados antes de las 4:00PM serán entregados el mismo día
        </p>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-xl border-2 border-femfuel-rose/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-femfuel-rose" />
            <h3 className="font-bold text-femfuel-dark">Método de Pago</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEditPayment}
            className="text-femfuel-rose hover:text-femfuel-rose/80"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
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
            {paymentMethodNames[paymentInfo.method]}
          </p>
        )}
      </div>

      {/* Order Total */}
      <div className="bg-gradient-to-r from-femfuel-rose/5 to-pink-500/5 rounded-xl border-2 border-femfuel-rose/20 p-6">
        <h3 className="font-bold text-femfuel-dark mb-4">Resumen del Pedido</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-femfuel-medium">Subtotal</span>
            <span className="font-semibold text-femfuel-dark">
              RD${subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-femfuel-medium">Envío</span>
            <span className="font-semibold text-femfuel-dark">
              RD${shippingCost.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-femfuel-medium">ITBIS (18%)</span>
            <span className="font-semibold text-femfuel-dark">
              RD${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="pt-3 border-t-2 border-femfuel-rose/20">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-femfuel-dark">Total</span>
              <span className="text-2xl font-bold text-femfuel-rose">
                RD${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 border-2 border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light/30"
        >
          Volver
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold shadow-lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Procesando...
            </>
          ) : (
            "Confirmar Pedido"
          )}
        </Button>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-femfuel-medium">
        Al confirmar tu pedido, aceptas nuestros{" "}
        <a href="/terms" className="text-femfuel-rose hover:underline">
          Términos y Condiciones
        </a>{" "}
        y{" "}
        <a href="/privacy" className="text-femfuel-rose hover:underline">
          Política de Privacidad
        </a>
      </p>

      {/* Payment Processing Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {!showSuccess ? (
              /* Processing Animation */
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  {/* Spinning credit card icon */}
                  <div className="absolute inset-0 flex items-center justify-center animate-spin">
                    <CreditCard className="h-12 w-12 text-femfuel-rose" />
                  </div>
                  {/* Pulsing circle */}
                  <div className="absolute inset-0 rounded-full border-4 border-femfuel-rose/20 animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-femfuel-dark mb-2 font-serif">
                  Procesando tu pago...
                </h3>
                <p className="text-femfuel-medium">
                  Por favor espera mientras confirmamos tu pedido
                </p>
                {/* Loading dots */}
                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-femfuel-rose rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-femfuel-rose rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-femfuel-rose rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : (
              /* Success Animation */
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  {/* Success checkmark with animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-[scale-in_0.3s_ease-out]">
                      <CheckCircle2 className="h-16 w-16 text-white animate-[check-draw_0.5s_ease-out]" />
                    </div>
                  </div>
                  {/* Success ripple */}
                  <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2 font-serif">
                  ¡Pago exitoso!
                </h3>
                <p className="text-femfuel-medium">
                  Redirigiendo a la confirmación...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
