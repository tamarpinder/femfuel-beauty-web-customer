"use client"

import { useState, useEffect } from "react"
import { X, Star, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  // Close on ESC key - must be before early return
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
      return () => window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const allImages = product.images.length > 0 ? product.images : []
  const formatPrice = (price: number) => `RD$${price.toLocaleString()}`

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(product.id, quantity)
  }

  const handleViewFullDetails = () => {
    onClose()
    router.push(`/shop/product/${product.slug}`)
  }

  const nextImage = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
    }
  }

  const prevImage = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal - Full screen on mobile, centered dialog on desktop */}
      <div className="fixed inset-0 md:flex md:items-center md:justify-center md:p-4 z-[10000] pointer-events-none">
        <div
          className="h-full md:h-auto bg-white md:rounded-2xl shadow-2xl md:max-w-4xl w-full md:max-h-[90vh] overflow-hidden pointer-events-auto animate-in slide-in-from-bottom md:zoom-in-95 duration-200 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header - Fixed */}
          <div className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <h2 className="text-lg font-bold text-femfuel-dark truncate flex-1 pr-4">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
              aria-label="Cerrar vista rápida"
            >
              <X className="h-5 w-5 text-femfuel-dark" />
            </button>
          </div>

          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg items-center justify-center transition-all duration-300 active:scale-95"
            aria-label="Cerrar vista rápida"
          >
            <X className="h-5 w-5 text-femfuel-dark" />
          </button>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="md:grid md:grid-cols-2 md:min-h-[500px]">
            {/* Left: Image Gallery */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
              {/* Main Image */}
              <div className="relative aspect-square md:rounded-xl overflow-hidden bg-white md:shadow-lg">
                {allImages[selectedImageIndex] && (
                  <Image
                    src={allImages[selectedImageIndex].url}
                    alt={allImages[selectedImageIndex].alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isNewArrival && (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                      Nuevo
                    </Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md">
                      -{calculateDiscount()}%
                    </Badge>
                  )}
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Indicators */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-3 md:mt-4">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`min-w-[32px] min-h-[32px] rounded-full transition-all duration-300 flex items-center justify-center ${
                        selectedImageIndex === index
                          ? "bg-gradient-to-r from-femfuel-rose to-pink-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    >
                      <span className={`rounded-full ${
                        selectedImageIndex === index
                          ? 'w-4 h-1.5 md:w-5 md:h-2 bg-white'
                          : 'w-2 h-2 bg-gray-400'
                      }`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="p-4 md:p-8 space-y-3 md:space-y-4">
              {/* Brand */}
              <p className="text-xs text-femfuel-medium uppercase tracking-wider font-semibold">
                {product.brand}
              </p>

              {/* Product Name - Hidden on mobile (shown in header) */}
              <h2 className="hidden md:block text-2xl font-bold text-femfuel-dark font-serif leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-femfuel-light">({product.reviewCount})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 py-3 border-y border-gray-200">
                <span className="text-3xl font-bold text-femfuel-rose">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-femfuel-light line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-femfuel-medium line-clamp-3">
                {product.description}
              </p>

              {/* Stock Status */}
              {product.availability.stockQuantity <= product.availability.lowStockThreshold ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-orange-700">
                    ¡Solo quedan {product.availability.stockQuantity}!
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">En Stock</span>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-femfuel-dark">Cantidad</label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border-2 border-femfuel-rose/20 rounded-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="min-h-[44px] min-w-[44px] p-0 hover:bg-femfuel-light rounded-l-full text-lg font-semibold"
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </Button>
                    <span className="min-w-[48px] text-center font-semibold text-base px-2">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.availability.stockQuantity, quantity + 1))}
                      className="min-h-[44px] min-w-[44px] p-0 hover:bg-femfuel-light rounded-r-full text-lg font-semibold"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Desktop */}
              <div className="hidden md:block space-y-3 pt-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al Carrito
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleViewFullDetails}
                  className="w-full min-h-[48px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light hover:border-femfuel-rose font-semibold rounded-full transition-all duration-300"
                >
                  Ver Detalles Completos
                </Button>
              </div>

              {/* Wishlist - Desktop */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="hidden md:flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-femfuel-medium hover:text-femfuel-rose transition-colors min-h-[44px]"
                aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                {isLiked ? "En Lista de Deseos" : "Agregar a Lista de Deseos"}
              </button>
            </div>
          </div>
          </div>

          {/* Mobile Sticky Footer */}
          <div className="md:hidden sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-2 shadow-2xl">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddToCart}
                className="flex-1 min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold rounded-full shadow-lg text-sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar
              </Button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="min-w-[48px] min-h-[48px] rounded-full border-2 border-femfuel-rose/20 flex items-center justify-center hover:bg-femfuel-light transition-colors"
                aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-femfuel-dark"}`} />
              </button>
            </div>
            <Button
              variant="outline"
              onClick={handleViewFullDetails}
              className="w-full min-h-[44px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light hover:border-femfuel-rose font-semibold rounded-full text-sm"
            >
              Ver Detalles Completos
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
