"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"

interface ProductCardEnhancedProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCardEnhanced({ product, onQuickView }: ProductCardEnhancedProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const hoverImage = product.images[1] || primaryImage // Use second image on hover, or same if only one

  const handleViewProduct = () => {
    router.push(`/shop/product/${product.slug}`)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(product.id, 1)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    onQuickView?.(product)
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-femfuel-rose/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white"
      onClick={handleViewProduct}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Primary Image */}
        <img
          src={primaryImage?.url || "/placeholder.svg"}
          alt={primaryImage?.alt || product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && product.images.length > 1 ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Hover Image (Second Image) */}
        {product.images.length > 1 && (
          <img
            src={hoverImage?.url || "/placeholder.svg"}
            alt={hoverImage?.alt || product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2.5 py-1 shadow-md">
              Nuevo
            </Badge>
          )}
          {product.isOnSale && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2.5 py-1 shadow-md">
              -{calculateDiscount()}%
            </Badge>
          )}
          {product.isFeatured && !product.isOnSale && (
            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-2.5 py-1 shadow-md">
              Destacado
            </Badge>
          )}
          {/* Low Stock Indicator - moved to top badges */}
          {product.availability.stockQuantity <= product.availability.lowStockThreshold && (
            <Badge className="bg-orange-500 text-white text-xs px-2.5 py-1 shadow-md animate-pulse">
              ¡Solo {product.availability.stockQuantity}!
            </Badge>
          )}
        </div>

        {/* Wishlist Heart - Always Visible */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleLike}
          className={`absolute top-2 md:top-3 right-2 md:right-3 min-w-[44px] min-h-[44px] p-0 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-md flex items-center justify-center ${
            isLiked
              ? "bg-red-50 hover:bg-red-100 scale-110"
              : "bg-white/90 hover:bg-white hover:scale-110"
          }`}
          aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>

        {/* Mobile Actions - Always visible on mobile, hover on desktop */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 md:p-3 flex flex-col gap-2 transition-all duration-300
            md:${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
            translate-y-0 opacity-100`}
        >
          {/* Quick View Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickView}
            className="w-full min-h-[44px] bg-white/95 backdrop-blur-md hover:bg-white text-femfuel-dark font-semibold border-2 border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
            aria-label="Vista rápida del producto"
          >
            <Eye className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Vista Rápida</span>
            <span className="sm:hidden">Ver</span>
          </Button>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="w-full min-h-[44px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm"
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Agregar al Carrito</span>
            <span className="sm:hidden">Agregar</span>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 space-y-2">
        {/* Brand */}
        <p className="text-xs text-femfuel-medium uppercase tracking-wide font-medium truncate">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="font-medium text-femfuel-dark text-sm md:text-base leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-femfuel-dark">{product.rating}</span>
          <span className="text-xs text-femfuel-light">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-bold text-femfuel-dark text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-femfuel-light line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Volume */}
        {product.volume && (
          <p className="text-xs text-femfuel-medium">
            {product.volume}
          </p>
        )}

        {/* Popular Badge */}
        {product.isPopular && (
          <Badge variant="secondary" className="text-xs">
            Popular
          </Badge>
        )}
      </div>
    </Card>
  )
}
