"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"

interface BeautyRoutineCardProps {
  routine: {
    id: string
    title: string
    description: string
    imageUrl: string
    icon: React.ElementType
    products: Product[]
    totalValue: number
    bundlePrice: number
    rating: number
    reviewCount: number
    testimonial?: {
      text: string
      author: string
    }
  }
  onProductClick: (product: Product) => void
  onAddAllToCart: (products: Product[]) => void
}

export function BeautyRoutineCard({
  routine,
  onProductClick,
  onAddAllToCart
}: BeautyRoutineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const savings = routine.totalValue - routine.bundlePrice
  const savingsPercent = Math.round((savings / routine.totalValue) * 100)
  const Icon = routine.icon

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30 flex flex-col h-full">
      {/* Header with Icon */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <Image
          src={routine.imageUrl}
          alt={routine.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Icon */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg">
          <Icon className="h-6 w-6 text-femfuel-rose" />
        </div>

        {/* Savings Badge */}
        {savings > 0 && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 font-bold px-3 py-1">
              Ahorra {savingsPercent}%
            </Badge>
          </div>
        )}

        {/* Title & Description Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 font-serif">
            {routine.title}
          </h3>
          <p className="text-white/90 text-sm">
            {routine.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(routine.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-femfuel-medium">
            {routine.rating} ({routine.reviewCount} reseñas)
          </span>
        </div>

        {/* Product Count */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {routine.products.slice(0, 4).map((product, idx) => (
              <div
                key={product.id}
                className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
              >
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-femfuel-dark">
            {routine.products.length} productos en esta rutina
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-4 bg-femfuel-light/30 rounded-lg">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-femfuel-medium">Valor individual:</span>
            <span className="text-sm text-femfuel-medium line-through">
              RD${routine.totalValue.toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-femfuel-dark">En set:</span>
            <span className="text-2xl font-bold text-femfuel-rose">
              RD${routine.bundlePrice.toLocaleString()}
            </span>
          </div>
          {savings > 0 && (
            <p className="text-xs text-green-600 font-semibold mt-1">
              Ahorras RD${savings.toLocaleString()}
            </p>
          )}
        </div>

        {/* Testimonial */}
        {routine.testimonial && !isExpanded && (
          <div className="mb-4 p-3 bg-gradient-to-r from-femfuel-rose/5 to-pink-500/5 rounded-lg border-l-4 border-femfuel-rose">
            <p className="text-sm text-femfuel-dark italic mb-1">
              "{routine.testimonial.text}"
            </p>
            <p className="text-xs text-femfuel-medium font-semibold">
              - {routine.testimonial.author}
            </p>
          </div>
        )}

        {/* Expandable Products List */}
        {isExpanded && (
          <div className="mb-4 space-y-3">
            <div className="border-t border-femfuel-rose/10 pt-4">
              <h4 className="text-sm font-bold text-femfuel-dark mb-3 uppercase tracking-wide">
                Productos Incluidos
              </h4>
              {routine.products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-femfuel-light/50 transition-colors text-left group/product"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-femfuel-medium">{product.brand}</p>
                    <p className="text-sm font-semibold text-femfuel-dark line-clamp-1 group-hover/product:text-femfuel-rose transition-colors">
                      {product.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-femfuel-rose">
                      RD${product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 mt-auto">
          <Button
            onClick={() => onAddAllToCart(routine.products)}
            className="w-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold py-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Agregar Rutina Completa
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full border-2 border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light/30 font-semibold py-3 rounded-full"
          >
            {isExpanded ? (
              <>
                Ocultar Productos
                <ChevronUp className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Ver Productos Individuales
                <ChevronDown className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
