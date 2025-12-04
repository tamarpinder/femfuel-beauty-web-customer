"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, ShoppingCart, Plus, Minus, Star, Shield, Truck, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ProductDetailEnhancedProps {
  product: Product
  relatedProducts?: Product[]
}

export function ProductDetailEnhanced({ product, relatedProducts = [] }: ProductDetailEnhancedProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["details"]))

  const allImages = product.images.length > 0 ? product.images : []

  const formatPrice = (price: number) => `RD$${price.toLocaleString()}`

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity)
  }

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity)
    router.push("/cart")
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= product.availability.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-femfuel-rose/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-femfuel-light rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver a la tienda</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsLiked(!isLiked)}
                className="min-h-[44px] min-w-[44px] rounded-full hover:bg-femfuel-light"
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-femfuel-medium"}`} />
              </Button>
              <Button variant="ghost" className="min-h-[44px] min-w-[44px] rounded-full hover:bg-femfuel-light">
                <Share2 className="h-5 w-5 text-femfuel-medium" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-femfuel-medium">
            <button onClick={() => router.push("/shop")} className="hover:text-femfuel-rose transition-colors">
              Tienda
            </button>
            <span>/</span>
            <button className="hover:text-femfuel-rose transition-colors capitalize">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-femfuel-dark font-medium">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: Sticky Image Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4 h-fit">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl border-2 border-femfuel-rose/10 overflow-hidden shadow-lg">
              {allImages[selectedImageIndex] && (
                <Image
                  src={allImages[selectedImageIndex].url}
                  alt={allImages[selectedImageIndex].alt || product.name}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                    Nuevo
                  </Badge>
                )}
                {product.isOnSale && (
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                    -{calculateDiscount()}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl border-3 overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-femfuel-rose shadow-lg scale-105"
                        : "border-gray-200 hover:border-femfuel-rose/50"
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

          {/* RIGHT: Scrollable Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm text-femfuel-medium uppercase tracking-wider font-semibold">
              {product.brand}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark font-serif leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-femfuel-dark">{product.rating}</span>
              <span className="text-sm text-femfuel-medium">({product.reviewCount} reseñas)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 py-4 border-y border-gray-200">
              <span className="text-4xl font-bold text-femfuel-rose">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-lg text-femfuel-light line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    Ahorras {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-femfuel-medium leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            {product.availability.stockQuantity <= product.availability.lowStockThreshold ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-700">
                  ¡Solo quedan {product.availability.stockQuantity}!
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">En Stock</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-femfuel-dark">Cantidad</label>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center border-2 border-femfuel-rose/20 rounded-full overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0 hover:bg-femfuel-light rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.availability.stockQuantity}
                    className="h-10 w-10 p-0 hover:bg-femfuel-light rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold py-6 text-lg rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                size="lg"
                onClick={handleBuyNow}
                className="flex-1 bg-femfuel-dark hover:bg-femfuel-dark/90 text-white font-semibold py-6 text-lg rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300"
              >
                Comprar Ahora
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mb-2">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-xs text-femfuel-medium font-medium">100% Auténtico</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-2">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-femfuel-medium font-medium">Envío 2-4hrs</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 mb-2">
                  <RotateCcw className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-xs text-femfuel-medium font-medium">Devoluciones</p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4 pt-6">
              {/* Product Details */}
              <AccordionItem
                title="Detalles del Producto"
                isExpanded={expandedSections.has("details")}
                onToggle={() => toggleSection("details")}
              >
                <div className="space-y-2">
                  {product.volume && (
                    <p className="text-sm"><span className="font-semibold">Tamaño:</span> {product.volume}</p>
                  )}
                  {product.specifications.map((spec, index) => (
                    <p key={index} className="text-sm">
                      <span className="font-semibold">{spec.name}:</span> {spec.value}{spec.unit ? ` ${spec.unit}` : ""}
                    </p>
                  ))}
                </div>
              </AccordionItem>

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <AccordionItem
                  title="Ingredientes"
                  isExpanded={expandedSections.has("ingredients")}
                  onToggle={() => toggleSection("ingredients")}
                >
                  <p className="text-sm text-femfuel-medium">
                    {product.ingredients.join(", ")}
                  </p>
                </AccordionItem>
              )}

              {/* How to Use */}
              {product.howToUse && product.howToUse.length > 0 && (
                <AccordionItem
                  title="Cómo Usar"
                  isExpanded={expandedSections.has("howToUse")}
                  onToggle={() => toggleSection("howToUse")}
                >
                  <ol className="list-decimal list-inside space-y-1">
                    {product.howToUse.map((step, index) => (
                      <li key={index} className="text-sm text-femfuel-medium">{step}</li>
                    ))}
                  </ol>
                </AccordionItem>
              )}

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <AccordionItem
                  title="Beneficios"
                  isExpanded={expandedSections.has("benefits")}
                  onToggle={() => toggleSection("benefits")}
                >
                  <ul className="list-disc list-inside space-y-1">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-femfuel-medium">{benefit}</li>
                    ))}
                  </ul>
                </AccordionItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Accordion Item Component
interface AccordionItemProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function AccordionItem({ title, isExpanded, onToggle, children }: AccordionItemProps) {
  return (
    <Card className="border-2 border-femfuel-rose/10 hover:border-femfuel-rose/20 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-femfuel-dark">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-femfuel-medium" />
        ) : (
          <ChevronDown className="h-5 w-5 text-femfuel-medium" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 text-femfuel-medium">
          {children}
        </div>
      )}
    </Card>
  )
}
