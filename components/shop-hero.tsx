"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/data/products"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

export function ShopHero() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  useEffect(() => {
    const products = getFeaturedProducts().slice(0, 3) // Get top 3 featured products
    setFeaturedProducts(products)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const handleProductClick = (product: Product) => {
    router.push(`/shop/product/${product.slug}`)
  }

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    await addToCart(product.id, 1)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide() // Swiped left
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide() // Swiped right
    }
  }

  if (featuredProducts.length === 0) return null

  const currentProduct = featuredProducts[currentSlide]
  const primaryImage = currentProduct?.images.find(img => img.isPrimary) || currentProduct?.images[0]

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-femfuel-light via-pink-50 to-purple-50 rounded-2xl border border-femfuel-rose/20 mb-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-femfuel-rose rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400 rounded-full blur-lg"></div>
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/femfuel-logo.png"
              alt="FemFuel Beauty Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-femfuel-dark">
              FemFuel Beauty
            </h1>
          </div>
          <p className="text-femfuel-medium text-sm sm:text-base">
            Tu belleza, nuestra pasión
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-femfuel-rose to-purple-400 rounded-full mx-auto mt-2"></div>
        </div>

        {/* Featured Product Carousel */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative touch-pan-x"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/50 backdrop-blur-sm border-white/60"
              onClick={() => handleProductClick(currentProduct)}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Product Image */}
                  <div className="relative">
                    <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={primaryImage?.url || "/placeholder.svg?height=300&width=300&query=beauty product"}
                        alt={primaryImage?.alt || currentProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {currentProduct.isOnSale && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                        -{Math.round(((currentProduct.originalPrice || 0) - currentProduct.price) / (currentProduct.originalPrice || 1) * 100)}%
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-femfuel-medium uppercase tracking-wide mb-1">
                        {currentProduct.brand}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-femfuel-dark leading-tight">
                        {currentProduct.name}
                      </h3>
                      <p className="text-femfuel-medium mt-2 line-clamp-2">
                        {currentProduct.shortDescription || currentProduct.description}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{currentProduct.rating}</span>
                      </div>
                      <span className="text-sm text-femfuel-light">
                        ({currentProduct.reviewCount} reseñas)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-femfuel-rose">
                        RD${currentProduct.price.toLocaleString()}
                      </span>
                      {currentProduct.originalPrice && (
                        <span className="text-lg text-femfuel-light line-through">
                          RD${currentProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white min-h-[44px]"
                        onClick={(e) => handleAddToCart(currentProduct, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                      <Button
                        variant="outline"
                        className="glassmorphism-button-perfect min-h-[44px] sm:w-auto w-full"
                        onClick={() => handleProductClick(currentProduct)}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            {featuredProducts.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full w-11 h-11 md:w-12 md:h-12 p-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  onClick={prevSlide}
                  aria-label="Producto anterior"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full w-11 h-11 md:w-12 md:h-12 p-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  onClick={nextSlide}
                  aria-label="Siguiente producto"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </>
            )}
          </div>

          {/* Carousel Indicators */}
          {featuredProducts.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  className={`min-w-[32px] min-h-[32px] rounded-full transition-all duration-300 flex items-center justify-center ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-femfuel-rose to-pink-600"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir al producto ${index + 1}`}
                >
                  <span className={`rounded-full ${
                    index === currentSlide
                      ? 'w-4 h-1.5 md:w-6 md:h-2 bg-white'
                      : 'w-2 h-2 bg-femfuel-rose/60'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}