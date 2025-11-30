"use client"

import { useState, useEffect } from "react"
import { ProductCardEnhanced } from "./product-card-enhanced"
import { Product } from "@/types/product"
import { TrendingUp, ShoppingCart, Eye, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShopRecommendationsProps {
  currentProduct?: Product
  currentCategory?: string
  currentBrand?: string
  priceRange?: [number, number]
  className?: string
}

type RecommendationType = "routine" | "also-bought" | "trending" | "recently-viewed"

interface RecommendationSection {
  type: RecommendationType
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  products: Product[]
}

export function ShopRecommendations({
  currentProduct,
  currentCategory,
  currentBrand,
  priceRange,
  className = ""
}: ShopRecommendationsProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({})

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recently-viewed")
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to load recently viewed")
      }
    }
  }, [])

  // Save product to recently viewed
  useEffect(() => {
    if (currentProduct) {
      setRecentlyViewed(prev => {
        const filtered = prev.filter(p => p.id !== currentProduct.id)
        const updated = [currentProduct, ...filtered].slice(0, 12)
        localStorage.setItem("recently-viewed", JSON.stringify(updated))
        return updated
      })
    }
  }, [currentProduct])

  // Mock recommendation algorithms
  const getCompleteYourRoutine = (): Product[] => {
    // Algorithm: Find complementary products in same category
    // Example: If viewing serum, recommend moisturizer, cleanser, sunscreen
    return [] // Will be populated with actual products
  }

  const getCustomersAlsoBought = (): Product[] => {
    // Algorithm: Find frequently bought together
    // Based on order history correlation
    return [] // Will be populated with actual products
  }

  const getTrendingNow = (): Product[] => {
    // Algorithm: Most viewed/purchased in last 7 days in category
    return [] // Will be populated with actual products
  }

  const scroll = (sectionId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${sectionId}`)
    if (!container) return

    const scrollAmount = 300
    const newPosition = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    container.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPositions(prev => ({ ...prev, [sectionId]: newPosition }))
  }

  const sections: RecommendationSection[] = [
    // Complete Your Routine (only show on product detail pages)
    ...(currentProduct ? [{
      type: "routine" as RecommendationType,
      title: "Completa tu Rutina",
      subtitle: "Productos que complementan perfectamente tu selección",
      icon: Sparkles,
      products: getCompleteYourRoutine()
    }] : []),

    // Customers Also Bought (only show on product detail or cart)
    ...(currentProduct ? [{
      type: "also-bought" as RecommendationType,
      title: "Los Clientes También Compraron",
      subtitle: "Productos frecuentemente comprados juntos",
      icon: ShoppingCart,
      products: getCustomersAlsoBought()
    }] : []),

    // Trending Now (show everywhere)
    {
      type: "trending" as RecommendationType,
      title: `Tendencias${currentCategory ? ` en ${currentCategory}` : ''}`,
      subtitle: "Los productos más populares esta semana",
      icon: TrendingUp,
      products: getTrendingNow()
    },

    // Recently Viewed (only show if has viewed products)
    ...(recentlyViewed.length > 0 ? [{
      type: "recently-viewed" as RecommendationType,
      title: "Vistos Recientemente",
      subtitle: "Continúa donde lo dejaste",
      icon: Eye,
      products: recentlyViewed
    }] : []),
  ].filter(section => section.products.length > 0)

  if (sections.length === 0) {
    return null
  }

  return (
    <div className={`space-y-8 md:space-y-12 ${className}`}>
      {sections.map((section) => {
        const Icon = section.icon
        const sectionId = section.type

        return (
          <div key={section.type} className="relative">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
              <div>
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <div className="min-w-[40px] min-h-[40px] md:w-10 md:h-10 bg-gradient-to-r from-femfuel-rose to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-femfuel-dark font-serif">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-femfuel-medium ml-0 md:ml-13">
                  {section.subtitle}
                </p>
              </div>

              {/* Scroll Buttons */}
              {section.products.length > 4 && (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll(sectionId, 'left')}
                    className="border-2 border-femfuel-rose/30 hover:bg-femfuel-light hover:border-femfuel-rose"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll(sectionId, 'right')}
                    className="border-2 border-femfuel-rose/30 hover:bg-femfuel-light hover:border-femfuel-rose"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Products Scroll Container */}
            <div
              id={`scroll-${sectionId}`}
              className="flex gap-3 md:gap-6 overflow-x-auto pb-4 px-4 md:px-0 snap-x snap-mandatory scrollbar-hide touch-pan-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {section.products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[calc(100vw-5rem)] sm:w-[280px] snap-start"
                >
                  <ProductCardEnhanced
                    product={product}
                    onQuickView={() => {}}
                  />
                </div>
              ))}
            </div>

            {/* Progress Indicator (mobile) */}
            {section.products.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3 md:hidden">
                {section.products.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === 0 ? 'w-6 bg-femfuel-rose' : 'w-1.5 bg-femfuel-rose/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Recently Viewed Sticky Bar (alternative design) */}
      {recentlyViewed.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-femfuel-rose/10 shadow-2xl z-30 py-4 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Eye className="h-5 w-5 text-femfuel-rose" />
                <h3 className="font-bold text-femfuel-dark">Vistos Recientemente</h3>
              </div>

              <div className="flex-1 overflow-x-auto flex gap-3 scrollbar-hide">
                {recentlyViewed.slice(0, 8).map((product) => (
                  <a
                    key={product.id}
                    href={`/shop/product/${product.slug}`}
                    className="flex-shrink-0 group"
                  >
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-femfuel-light transition-all duration-300">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.images.find(img => img.isPrimary)?.url || product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-femfuel-dark line-clamp-1 group-hover:text-femfuel-rose transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm font-bold text-femfuel-rose">
                          RD${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("recently-viewed")
                  setRecentlyViewed([])
                }}
                className="flex-shrink-0 text-femfuel-medium hover:text-femfuel-dark"
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
