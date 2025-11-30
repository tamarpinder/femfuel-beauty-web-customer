"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, ShoppingCart, Plus, Minus, Star, Shield, Truck, RotateCcw, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CartDrawer } from "@/components/cart-drawer"

interface ProductPageLayoutProps {
  product: Product
}

export function ProductPageLayout({ product }: ProductPageLayoutProps) {
  const router = useRouter()
  const { addToCart, itemCount } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const allImages = product.images.length > 0 ? product.images : [primaryImage].filter(Boolean)

  const formatPrice = (price: number) => `RD$${price.toLocaleString()}`

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product.availability.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      {/* Header - Enhanced with glassmorphism */}
      <div className="bg-white/90 backdrop-blur-md border-b border-femfuel-rose/10 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-femfuel-light rounded-full transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Volver</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="hover:bg-femfuel-light rounded-full transition-all duration-300"
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-femfuel-light rounded-full transition-all duration-300"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <div className="hidden md:block">
                <CartDrawer>
                  <Button variant="ghost" size="sm" className="relative hover:bg-femfuel-light rounded-full transition-all duration-300">
                    <ShoppingBag className="h-5 w-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-xs flex items-center justify-center p-0 shadow-md">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </CartDrawer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery - Enhanced */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white/80 backdrop-blur-md rounded-2xl border-2 border-femfuel-rose/10 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {allImages[selectedImageIndex] && (
                <Image
                  src={allImages[selectedImageIndex].url}
                  alt={allImages[selectedImageIndex].alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}

              {/* Badges - Enhanced with gradients */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md px-3 py-1">
                    Nuevo
                  </Badge>
                )}
                {product.isOnSale && (
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md px-3 py-1">
                    -{calculateDiscount()}%
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md px-3 py-1">
                    Destacado
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery - Enhanced */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-femfuel-rose shadow-lg scale-105"
                        : "border-gray-200 hover:border-femfuel-rose/50 hover:shadow-md"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title - Centered on Mobile */}
            <div className="text-center md:text-left">
              <p className="text-sm text-femfuel-medium uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-femfuel-dark leading-tight">
                {product.name}
              </h1>
              {product.volume && (
                <p className="text-sm text-femfuel-light mt-2">{product.volume}</p>
              )}
            </div>

            {/* Rating - Centered on Mobile */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-lg md:text-base">{product.rating}</span>
                <span className="text-femfuel-light">({product.reviewCount} reseñas)</span>
              </div>
              {product.isPopular && (
                <Badge variant="secondary">Popular</Badge>
              )}
            </div>

            {/* Price - Centered and More Prominent on Mobile */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl md:text-3xl font-bold text-black">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl md:text-lg text-femfuel-light line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status - Enhanced */}
            {product.availability.stockQuantity <= product.availability.lowStockThreshold && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 text-center md:text-left shadow-sm">
                <p className="text-sm text-orange-700 font-bold">
                  ⚠️ ¡Solo quedan {product.availability.stockQuantity} unidades!
                </p>
              </div>
            )}

            {/* Note: Variants functionality will be added in Phase 2 */}

            {/* Quantity & Add to Cart - Enhanced */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="flex items-center border-2 border-femfuel-rose/20 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-12 w-12 p-0 hover:bg-femfuel-light rounded-l-xl disabled:opacity-30"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.availability.stockQuantity}
                    className="h-12 w-12 p-0 hover:bg-femfuel-light rounded-r-xl disabled:opacity-30"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <span className="text-sm font-medium text-femfuel-medium">
                  {product.availability.stockQuantity} disponibles
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white text-lg font-bold py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                disabled={!product.availability.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
            </div>

            {/* Benefits - Enhanced with cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t-2 border-femfuel-rose/10">
              <div className="flex items-center gap-3 text-sm font-medium bg-white/80 backdrop-blur-sm border border-femfuel-rose/10 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center flex-shrink-0">
                  <Truck className="h-4 w-4 text-femfuel-rose" />
                </div>
                <span className="text-femfuel-dark">Envío gratis</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium bg-white/80 backdrop-blur-sm border border-femfuel-rose/10 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="h-4 w-4 text-femfuel-rose" />
                </div>
                <span className="text-femfuel-dark">30 días devolución</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium bg-white/80 backdrop-blur-sm border border-femfuel-rose/10 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-femfuel-rose" />
                </div>
                <span className="text-femfuel-dark">Garantía oficial</span>
              </div>
            </div>

            {/* Description - Enhanced */}
            <div className="pt-6 border-t-2 border-femfuel-rose/10">
              <h3 className="text-xl font-bold text-femfuel-dark mb-4">Descripción del Producto</h3>
              <p className="text-femfuel-medium leading-relaxed text-base">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}