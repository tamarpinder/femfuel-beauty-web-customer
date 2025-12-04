"use client"

import { useState, useEffect } from "react"
import { Sparkles, Palette, Droplet, Hand, Scissors, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCategory } from "@/types/product"
import { mockProducts } from "@/data/products"
import { useRouter } from "next/navigation"

interface Category {
  id: ProductCategory
  name: string
  description: string
  icon: React.ElementType
  imageUrl: string
  subcategories: string[]
}

const categories: Category[] = [
  {
    id: "skincare",
    name: "Cuidado Facial",
    description: "Limpiadores, serums, hidratantes y más",
    icon: Droplet,
    imageUrl: "/categories/banners/skincare-banner.png",
    subcategories: ["Limpiadores", "Serums", "Hidratantes", "Mascarillas"]
  },
  {
    id: "makeup",
    name: "Maquillaje",
    description: "Base, labial, sombras y más",
    icon: Palette,
    imageUrl: "/categories/banners/makeup-banner.png",
    subcategories: ["Base", "Labiales", "Ojos", "Mejillas"]
  },
  {
    id: "haircare",
    name: "Cuidado Capilar",
    description: "Shampoos, acondicionadores y tratamientos",
    icon: Sparkles,
    imageUrl: "/categories/banners/haircare-banner.png",
    subcategories: ["Shampoo", "Acondicionador", "Tratamientos", "Styling"]
  },
  {
    id: "nailcare",
    name: "Cuidado de Uñas",
    description: "Esmaltes, bases y herramientas",
    icon: Hand,
    imageUrl: "/categories/banners/nailcare-banner.png",
    subcategories: ["Esmaltes", "Bases", "Tratamientos", "Herramientas"]
  },
  {
    id: "tools",
    name: "Herramientas & Accesorios",
    description: "Brochas, esponjas y más",
    icon: Scissors,
    imageUrl: "/categories/banners/tools-banner.png",
    subcategories: ["Brochas", "Esponjas", "Aplicadores", "Organizadores"]
  },
  {
    id: "accessories",
    name: "Accesorios",
    description: "Bolsas, estuches y más",
    icon: Package,
    imageUrl: "/categories/banners/accessories-banner.png",
    subcategories: ["Bolsas", "Estuches", "Organizadores"]
  }
]

export function ShopCategoryGrid() {
  const router = useRouter()
  const [productCounts, setProductCounts] = useState<Record<string, number>>({})
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    // Calculate product counts per category
    const counts: Record<string, number> = {}
    categories.forEach(category => {
      counts[category.id] = mockProducts.filter(
        product => product.category === category.id && product.availability.inStock
      ).length
    })
    setProductCounts(counts)
  }, [])

  const handleCategoryClick = (categoryId: ProductCategory) => {
    router.push(`/shop?category=${categoryId}`)
  }

  return (
    <section id="categories" className="py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-femfuel-dark mb-3 md:mb-4 font-serif">
            Explora por Categoría
          </h2>
          <p className="text-base md:text-lg text-femfuel-medium max-w-2xl mx-auto">
            Descubre productos perfectos para cada necesidad de belleza
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            const productCount = productCounts[category.id] || 0
            const isHovered = hoveredCategory === category.id

            return (
              <Card
                key={category.id}
                className="relative group cursor-pointer overflow-hidden h-72 md:h-64 border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30 active:border-femfuel-rose/50 transition-all duration-500 hover:shadow-2xl active:shadow-2xl active:scale-[0.98]"
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0">
                  {/* Category Banner Image */}
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                    isHovered
                      ? 'from-black/70 via-black/40 to-black/20'
                      : 'from-black/60 via-black/30 to-black/10'
                  }`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-4 md:p-6">
                  {/* Top: Icon Badge */}
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg transition-colors duration-500 ${
                      isHovered ? 'bg-femfuel-rose' : ''
                    }`}>
                      <Icon className={`h-6 w-6 md:h-7 md:w-7 transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-femfuel-rose'
                      }`} />
                    </div>
                    <Badge className="bg-white/90 backdrop-blur-md text-femfuel-dark border-0 shadow-md text-xs">
                      {productCount} productos
                    </Badge>
                  </div>

                  {/* Bottom: Category Info */}
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-xs md:text-sm drop-shadow-md line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    {/* Subcategories - Always visible on mobile, hover on desktop */}
                    <div className={`flex flex-wrap gap-2 transition-all duration-500 md:${
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    } opacity-100 translate-y-0`}>
                      {category.subcategories.slice(0, 3).map((sub, index) => (
                        <span
                          key={index}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                          +{category.subcategories.length - 3}
                        </span>
                      )}
                    </div>

                    {/* CTA Button - Always visible on mobile, hover on desktop */}
                    <div className={`transition-all duration-500 md:${
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    } opacity-100 translate-y-0`}>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-xs md:text-sm font-semibold shadow-xl min-h-[36px]">
                        Explorar →
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
