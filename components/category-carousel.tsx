"use client"

import { useState, useRef } from "react"
import { ProductCategory } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Droplet, Palette, Scissors, Hand, Flower2, Package, Wrench, Gem } from "lucide-react"

interface CategoryCarouselProps {
  selectedCategory: ProductCategory | "all"
  onCategoryChange: (category: ProductCategory | "all") => void
  productCounts?: Record<string, number>
}

const categories: Array<{
  id: ProductCategory | "all"
  name: string
  icon: React.ComponentType<{ className?: string }>
  shortName: string
  gradient: string
  emoji: string
}> = [
  {
    id: "all",
    name: "Todos",
    icon: Sparkles,
    shortName: "Todos",
    gradient: "from-purple-400 via-pink-400 to-red-400",
    emoji: "✨"
  },
  {
    id: "skincare",
    name: "Cuidado Facial",
    icon: Droplet,
    shortName: "Facial",
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    emoji: "💧"
  },
  {
    id: "makeup",
    name: "Maquillaje",
    icon: Palette,
    shortName: "Maquillaje",
    gradient: "from-pink-400 via-rose-400 to-red-400",
    emoji: "💄"
  },
  {
    id: "haircare",
    name: "Cuidado Capilar",
    icon: Scissors,
    shortName: "Cabello",
    gradient: "from-amber-400 via-orange-400 to-red-400",
    emoji: "✂️"
  },
  {
    id: "nailcare",
    name: "Cuidado Uñas",
    icon: Hand,
    shortName: "Uñas",
    gradient: "from-purple-400 via-violet-400 to-purple-600",
    emoji: "💅"
  },
  {
    id: "fragrance",
    name: "Fragancias",
    icon: Flower2,
    shortName: "Fragancia",
    gradient: "from-emerald-400 via-green-400 to-teal-400",
    emoji: "🌸"
  },
  {
    id: "bodycare",
    name: "Cuidado Corporal",
    icon: Package,
    shortName: "Cuerpo",
    gradient: "from-indigo-400 via-blue-400 to-cyan-400",
    emoji: "🧴"
  },
  {
    id: "tools",
    name: "Herramientas",
    icon: Wrench,
    shortName: "Herramientas",
    gradient: "from-gray-400 via-slate-400 to-zinc-400",
    emoji: "🔧"
  },
  {
    id: "accessories",
    name: "Accesorios",
    icon: Gem,
    shortName: "Acceso",
    gradient: "from-yellow-400 via-amber-400 to-orange-400",
    emoji: "💎"
  }
]

export function CategoryCarousel({ selectedCategory, onCategoryChange, productCounts }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)


  const handleCategoryClick = (categoryId: ProductCategory | "all") => {
    onCategoryChange(categoryId)
    
    // Scroll selected item into view
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(`[data-category="${categoryId}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }

  return (
    <div className="mb-6">
      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 px-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties & { WebkitScrollbar?: { display: string } }}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id
          const productCount = productCounts?.[category.id] || 0

          return (
            <div
              key={category.id}
              data-category={category.id}
              className="flex-shrink-0"
            >
              <Card
                className={`cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-lg hover:-translate-y-1 group ${
                  isSelected
                    ? "ring-2 ring-femfuel-rose shadow-xl scale-105 transform"
                    : "hover:scale-105"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-0 w-28 sm:w-32">
                  {/* Gradient Background Section */}
                  <div className={`relative h-16 sm:h-20 bg-gradient-to-br ${category.gradient} overflow-hidden`}>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 bg-white/10">
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/20 rounded-full"></div>
                    </div>

                    {/* Emoji and Icon */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
                        {category.emoji}
                      </span>
                      <category.icon className="h-4 w-4 text-white/80 drop-shadow-sm" />
                    </div>

                    {/* Product Count Badge */}
                    {productCount > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-white text-femfuel-dark font-bold shadow-md"
                      >
                        {productCount}
                      </Badge>
                    )}

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white shadow-lg"></div>
                    )}
                  </div>

                  {/* Category Name */}
                  <div className="p-3 text-center bg-white">
                    <p className={`text-xs sm:text-sm font-semibold leading-tight transition-colors duration-200 ${
                      isSelected
                        ? "text-femfuel-rose"
                        : "text-femfuel-dark group-hover:text-femfuel-rose"
                    }`}>
                      {category.shortName}
                    </p>
                    {productCount > 0 && (
                      <p className="text-xs text-femfuel-light mt-1">
                        {productCount} productos
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
      
      {/* Selected category info */}
      {selectedCategory !== "all" && (
        <div className="mt-3 text-center">
          <p className="text-sm text-femfuel-medium">
            {categories.find(c => c.id === selectedCategory)?.name}
            {productCounts?.[selectedCategory] && (
              <span className="text-femfuel-light ml-1">
                • {productCounts[selectedCategory]} productos
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}