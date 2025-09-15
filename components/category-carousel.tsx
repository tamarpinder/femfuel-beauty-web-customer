"use client"

import { useState, useRef } from "react"
import { ProductCategory } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/data/products"
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
}> = [
  { 
    id: "all", 
    name: "Todos", 
    icon: Sparkles, 
    shortName: "Todos"
  },
  { 
    id: "skincare", 
    name: "Cuidado Facial", 
    icon: Droplet, 
    shortName: "Facial"
  },
  { 
    id: "makeup", 
    name: "Maquillaje", 
    icon: Palette, 
    shortName: "Maquillaje"
  },
  { 
    id: "haircare", 
    name: "Cuidado Capilar", 
    icon: Scissors, 
    shortName: "Cabello"
  },
  { 
    id: "nailcare", 
    name: "Cuidado Uñas", 
    icon: Hand, 
    shortName: "Uñas"
  },
  { 
    id: "fragrance", 
    name: "Fragancias", 
    icon: Flower2, 
    shortName: "Fragancia"
  },
  { 
    id: "bodycare", 
    name: "Cuidado Corporal", 
    icon: Package, 
    shortName: "Cuerpo"
  },
  { 
    id: "tools", 
    name: "Herramientas", 
    icon: Wrench, 
    shortName: "Herramientas"
  },
  { 
    id: "accessories", 
    name: "Accesorios", 
    icon: Gem, 
    shortName: "Acceso"
  }
]

export function CategoryCarousel({ selectedCategory, onCategoryChange, productCounts }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Get sample product image for each category
  const getCategoryImage = (categoryId: ProductCategory | "all") => {
    if (categoryId === "all") {
      // Return first available product image
      const firstProduct = mockProducts.find(p => p.availability.inStock)
      return firstProduct?.images.find(img => img.isPrimary)?.url || 
             firstProduct?.images[0]?.url || 
             "/placeholder.svg?height=60&width=60&query=beauty product"
    }
    
    // Find first product in this category
    const categoryProduct = mockProducts.find(p => 
      p.category === categoryId && p.availability.inStock
    )
    
    return categoryProduct?.images.find(img => img.isPrimary)?.url || 
           categoryProduct?.images[0]?.url || 
           "/placeholder.svg?height=60&width=60&query=beauty product"
  }

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
          const categoryImage = getCategoryImage(category.id)
          
          return (
            <div
              key={category.id}
              data-category={category.id}
              className="flex-shrink-0"
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-md ${
                  isSelected 
                    ? "ring-2 ring-femfuel-rose shadow-lg scale-105" 
                    : "hover:scale-105"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-0 w-24 sm:w-28">
                  {/* Image Section */}
                  <div className="relative h-14 sm:h-16 bg-gray-100 overflow-hidden">
                    <img
                      src={categoryImage}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
                    </div>
                    
                    {/* Product Count Badge */}
                    {productCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-femfuel-rose"
                      >
                        {productCount}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Category Name */}
                  <div className="p-2 text-center">
                    <p className={`text-xs sm:text-sm font-medium leading-tight ${
                      isSelected
                        ? "text-femfuel-rose"
                        : "text-femfuel-dark"
                    }`}>
                      {category.shortName}
                    </p>
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