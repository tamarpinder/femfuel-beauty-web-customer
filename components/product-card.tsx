"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, ShoppingCart, Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  layout?: "grid" | "list"
}

export function ProductCard({ product, onAddToCart, layout = "grid" }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)

  const handleViewProduct = () => {
    router.push(`/shop/product/${product.slug}`)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(product.id, 1)
    onAddToCart?.(product.id)
  }

  const handleQuickAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(product.id, 1)
    onAddToCart?.(product.id)
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

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]

  if (layout === "list") {
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden"
        onClick={handleViewProduct}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Product Image */}
            <div className="relative flex-shrink-0">
              <img
                src={primaryImage?.url || "/placeholder.svg?height=80&width=80&query=beauty product"}
                alt={primaryImage?.alt || product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              {product.isOnSale && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                  -{calculateDiscount()}%
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-femfuel-medium uppercase tracking-wide truncate">
                    {product.brand}
                  </p>
                  <h3 className="font-medium text-femfuel-dark text-sm leading-tight truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-femfuel-light truncate mt-1">
                    {product.shortDescription || product.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleLike}
                  className="ml-2 p-1"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium ml-1">{product.rating}</span>
                  <span className="text-xs text-femfuel-light">({product.reviewCount})</span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black text-sm">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-femfuel-light line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white text-xs px-3 py-1"
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid layout (default)
  return (
    <Card
      className="cursor-pointer hover:shadow-2xl hover:shadow-femfuel-rose/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 overflow-hidden group bg-white border border-gray-100 hover:border-femfuel-rose/20"
      onClick={handleViewProduct}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={primaryImage?.url || "/placeholder.svg?height=200&width=200&query=beauty product"}
            alt={primaryImage?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Subtle Gradient for depth - no black */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNewArrival && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                Nuevo
              </Badge>
            )}
            {product.isOnSale && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                -{calculateDiscount()}%
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                Destacado
              </Badge>
            )}
          </div>


          {/* Like Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleLike}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 shadow-md"
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"}`} />
          </Button>

          {/* Quick Add to Cart Button */}
          <Button
            size="sm"
            onClick={handleQuickAddToCart}
            className="absolute bottom-2 right-2 h-10 w-10 p-0 rounded-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 z-10 min-h-[40px] min-w-[40px]"
            title="Agregar al carrito"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-3">
          {/* Brand and Name - Centered on Mobile */}
          <div className="text-center md:text-left">
            <p className="text-xs text-femfuel-medium uppercase tracking-wide">
              {product.brand}
            </p>
            <h3 className="font-medium text-femfuel-dark text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </div>

          {/* Product Description - Centered on Mobile */}
          {product.shortDescription && (
            <p className="text-xs text-femfuel-medium line-clamp-2 leading-relaxed text-center md:text-left">
              {product.shortDescription}
            </p>
          )}

          {/* Rating - Centered on Mobile */}
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-femfuel-light">({product.reviewCount})</span>
            </div>
            {product.isPopular && (
              <Badge variant="secondary" className="text-xs">
                Popular
              </Badge>
            )}
          </div>

          {/* Price - Centered and More Prominent on Mobile */}
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-black text-base md:text-sm">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-femfuel-light line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status - Centered on Mobile */}
          {product.availability.stockQuantity <= product.availability.lowStockThreshold && (
            <p className="text-xs text-orange-600 text-center md:text-left">
              ¡Solo quedan {product.availability.stockQuantity}!
            </p>
          )}

          {/* Volume/Size - Centered on Mobile */}
          {product.volume && (
            <p className="text-xs text-femfuel-medium text-center md:text-left">
              {product.volume}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}