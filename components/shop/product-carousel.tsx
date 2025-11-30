"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Star, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface ProductCarouselProps {
  products: Product[]
  onProductClick: (product: Product) => void
  showDiscount?: boolean
}

export function ProductCarousel({
  products,
  onProductClick,
  showDiscount = false
}: ProductCarouselProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const calculateDiscount = (product: Product) => {
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    }
    return 0
  }

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    onProductClick(product)
  }

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    if (!product.availability.inStock) {
      toast.error("Producto agotado")
      return
    }

    setAddingToCart(product.id)
    await addToCart(product.id, 1)
    toast.success(`${product.name} agregado al carrito`)
    setAddingToCart(null)
  }

  const handleViewProduct = (product: Product) => {
    router.push(`/shop/product/${product.slug}`)
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeftArrow && (
        <Button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-femfuel-dark rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
          size="icon"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <Button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-femfuel-dark rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
          size="icon"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => {
          const discount = calculateDiscount(product)
          const isAddingThis = addingToCart === product.id

          return (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product)}
              className="flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-femfuel-rose/10 hover:border-femfuel-rose/30 hover:-translate-y-2 group/card"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                />

                {/* Action Buttons - Show on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover/card:opacity-100">
                  {/* Quick View Button */}
                  <button
                    onClick={(e) => handleQuickView(e, product)}
                    className="bg-white hover:bg-femfuel-rose text-femfuel-dark hover:text-white rounded-full p-3 shadow-lg transform scale-90 group-hover/card:scale-100 transition-all duration-300 hover:scale-110"
                    title="Vista Rápida"
                  >
                    <Eye className="h-5 w-5" />
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!product.availability.inStock || isAddingThis}
                    className="bg-white hover:bg-femfuel-rose text-femfuel-dark hover:text-white rounded-full p-3 shadow-lg transform scale-90 group-hover/card:scale-100 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={product.availability.inStock ? "Agregar al Carrito" : "Agotado"}
                  >
                    <ShoppingCart className={`h-5 w-5 ${isAddingThis ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {showDiscount && discount > 0 && (
                    <Badge className="bg-orange-500 text-white border-0 font-bold text-sm px-3 py-1">
                      -{discount}%
                    </Badge>
                  )}
                  {product.isNewArrival && (
                    <Badge className="bg-green-500 text-white border-0 font-bold text-sm px-3 py-1">
                      Nuevo
                    </Badge>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-white/90 text-femfuel-dark border-0 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-femfuel-medium mb-1">{product.brand}</p>
                <h3 className="font-bold text-femfuel-dark mb-2 line-clamp-2 group-hover/card:text-femfuel-rose transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-femfuel-rose">
                    RD${product.price.toLocaleString()}
                  </p>
                  {product.originalPrice && (
                    <p className="text-sm text-femfuel-medium line-through">
                      RD${product.originalPrice.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Stock Info */}
                {product.availability.stockQuantity <= product.availability.lowStockThreshold && (
                  <p className="text-xs text-orange-500 mt-2">
                    Solo quedan {product.availability.stockQuantity} unidades
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
