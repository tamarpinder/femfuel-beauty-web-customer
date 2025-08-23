"use client"

import { ProductCategory } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CategoryGridProps {
  selectedCategory: ProductCategory | "all"
  onCategoryChange: (category: ProductCategory | "all") => void
  productCounts?: Record<string, number>
}

const categories: Array<{ 
  id: ProductCategory | "all"
  name: string
  icon: string
  gradient: string
  description: string
}> = [
  { 
    id: "all", 
    name: "Todos", 
    icon: "✨", 
    gradient: "from-purple-400 via-pink-400 to-red-400",
    description: "Toda la colección"
  },
  { 
    id: "skincare", 
    name: "Cuidado Facial", 
    icon: "🧴", 
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    description: "Limpieza, hidratación y tratamientos"
  },
  { 
    id: "makeup", 
    name: "Maquillaje", 
    icon: "💄", 
    gradient: "from-pink-400 via-rose-400 to-red-400",
    description: "Base, labios, ojos y más"
  },
  { 
    id: "haircare", 
    name: "Cuidado Capilar", 
    icon: "💇‍♀️", 
    gradient: "from-amber-400 via-orange-400 to-red-400",
    description: "Shampoo, acondicionador y tratamientos"
  },
  { 
    id: "nailcare", 
    name: "Cuidado Uñas", 
    icon: "💅", 
    gradient: "from-violet-400 via-purple-400 to-pink-400",
    description: "Esmaltes, herramientas y cuidado"
  },
  { 
    id: "fragrance", 
    name: "Fragancias", 
    icon: "🌸", 
    gradient: "from-rose-400 via-pink-400 to-purple-400",
    description: "Perfumes y aguas de colonia"
  },
  { 
    id: "bodycare", 
    name: "Cuidado Corporal", 
    icon: "🧴", 
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    description: "Cremas, lociones y exfoliantes"
  },
  { 
    id: "tools", 
    name: "Herramientas", 
    icon: "🔧", 
    gradient: "from-gray-400 via-slate-400 to-zinc-400",
    description: "Brochas, esponjas y accesorios"
  },
  { 
    id: "accessories", 
    name: "Accesorios", 
    icon: "✨", 
    gradient: "from-yellow-400 via-amber-400 to-orange-400",
    description: "Espejos, organizadores y más"
  }
]

export function CategoryGrid({ selectedCategory, onCategoryChange, productCounts }: CategoryGridProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-femfuel-dark mb-4">
        Explorar Categorías
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id
          const productCount = productCounts?.[category.id] || 0
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all duration-300 overflow-hidden group hover:shadow-xl hover:scale-105 ${
                isSelected 
                  ? "ring-2 ring-femfuel-rose shadow-lg scale-105" 
                  : "hover:shadow-lg"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${category.gradient} p-6 relative`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center text-white">
                    <div className="text-3xl mb-2 drop-shadow-sm">
                      {category.icon}
                    </div>
                    <h4 className="font-semibold text-sm mb-1 drop-shadow-sm">
                      {category.name}
                    </h4>
                    <p className="text-xs opacity-90 drop-shadow-sm line-clamp-2 min-h-[2rem] flex items-center justify-center">
                      {category.description}
                    </p>
                    
                    {/* Product Count Badge */}
                    {productCount > 0 && (
                      <Badge 
                        className="mt-3 bg-white bg-opacity-20 text-white border-white border-opacity-30 text-xs"
                      >
                        {productCount} productos
                      </Badge>
                    )}
                  </div>
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}