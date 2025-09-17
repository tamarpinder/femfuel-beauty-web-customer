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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <CartDrawer>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-femfuel-rose text-white text-xs flex items-center justify-center p-0">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
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

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <Badge className="bg-green-500 text-white">Nuevo</Badge>
                )}
                {product.isOnSale && (
                  <Badge className="bg-red-500 text-white">
                    -{calculateDiscount()}%
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-purple-500 text-white">Destacado</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === index
                        ? "border-femfuel-rose"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm text-femfuel-medium uppercase tracking-wide mb-1">
                {product.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-femfuel-dark leading-tight">
                {product.name}
              </h1>
              {product.volume && (
                <p className="text-sm text-femfuel-light mt-1">{product.volume}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-femfuel-light">({product.reviewCount} reseñas)</span>
              </div>
              {product.isPopular && (
                <Badge variant="secondary">Popular</Badge>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-femfuel-rose">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-femfuel-light line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {product.availability.stockQuantity <= product.availability.lowStockThreshold && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-700 font-medium">
                  ¡Solo quedan {product.availability.stockQuantity}!
                </p>
              </div>
            )}

            {/* Note: Variants functionality will be added in Phase 2 */}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.availability.stockQuantity}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-femfuel-light">
                  {product.availability.stockQuantity} disponibles
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white text-lg py-6"
                disabled={!product.availability.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-femfuel-light">
                <Truck className="h-4 w-4" />
                Envío gratis
              </div>
              <div className="flex items-center gap-2 text-sm text-femfuel-light">
                <RotateCcw className="h-4 w-4" />
                30 días devolución
              </div>
              <div className="flex items-center gap-2 text-sm text-femfuel-light">
                <Shield className="h-4 w-4" />
                Garantía oficial
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-3">Descripción</h3>
              <p className="text-femfuel-light leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}