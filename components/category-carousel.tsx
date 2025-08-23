"use client"

import { useState, useRef } from "react"
import { ProductCategory } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/data/products"

interface CategoryCarouselProps {
  selectedCategory: ProductCategory | "all"
  onCategoryChange: (category: ProductCategory | "all") => void
  productCounts?: Record<string, number>
}

const categories: Array<{ 
  id: ProductCategory | "all"
  name: string
  icon: string
  shortName: string
}> = [
  { 
    id: "all", 
    name: "Todos", 
    icon: "✨", 
    shortName: "Todos"
  },
  { 
    id: "skincare", 
    name: "Cuidado Facial", 
    icon: "🧴", 
    shortName: "Facial"
  },
  { 
    id: "makeup", 
    name: "Maquillaje", 
    icon: "💄", 
    shortName: "Makeup"
  },
  { 
    id: "haircare", 
    name: "Cuidado Capilar", 
    icon: "💇‍♀️", 
    shortName: "Cabello"
  },
  { 
    id: "nailcare", 
    name: "Cuidado Uñas", 
    icon: "💅", 
    shortName: "Uñas"
  },
  { 
    id: "fragrance", 
    name: "Fragancias", 
    icon: "🌸", 
    shortName: "Fragancia"
  },
  { 
    id: "bodycare", 
    name: "Cuidado Corporal", 
    icon: "🧼", 
    shortName: "Cuerpo"
  },
  { 
    id: "tools", 
    name: "Herramientas", 
    icon: "🔧", 
    shortName: "Tools"
  },
  { 
    id: "accessories", 
    name: "Accesorios", 
    icon: "✨", 
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
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
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
                <CardContent className="p-0 w-20">
                  {/* Image Section */}
                  <div className="relative h-12 bg-gray-100 overflow-hidden">
                    <img
                      src={categoryImage}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="text-lg drop-shadow-sm">
                        {category.icon}
                      </span>
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
                    <p className={`text-xs font-medium leading-tight ${
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