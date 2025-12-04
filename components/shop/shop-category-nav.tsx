"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProductCategory } from "@/types/product"
import { mockProducts } from "@/data/products"
import { Droplet, Palette, Sparkles, Hand, Scissors, Package } from "lucide-react"

interface CategoryNavProps {
  selectedCategory?: ProductCategory | "all"
  onCategoryChange?: (category: ProductCategory | "all") => void
}

interface Category {
  id: ProductCategory
  name: string
  icon: React.ElementType
  subcategories: string[]
  imageUrl: string
}

const categories: Category[] = [
  {
    id: "skincare",
    name: "Cuidado Facial",
    icon: Droplet,
    imageUrl: "/categories/banners/skincare-banner.png",
    subcategories: ["Limpiadores", "Serums", "Hidratantes", "Mascarillas", "Exfoliantes", "Contorno de Ojos"]
  },
  {
    id: "makeup",
    name: "Maquillaje",
    icon: Palette,
    imageUrl: "/categories/banners/makeup-banner.png",
    subcategories: ["Base", "Labiales", "Sombras de Ojos", "Mejillas", "Cejas", "Primers"]
  },
  {
    id: "haircare",
    name: "Cuidado Capilar",
    icon: Sparkles,
    imageUrl: "/categories/banners/haircare-banner.png",
    subcategories: ["Shampoo", "Acondicionador", "Tratamientos", "Styling", "Mascarillas", "Aceites"]
  },
  {
    id: "nailcare",
    name: "Cuidado de Uñas",
    icon: Hand,
    imageUrl: "/categories/banners/nailcare-banner.png",
    subcategories: ["Esmaltes", "Bases", "Tratamientos", "Removedores", "Herramientas", "Sets"]
  },
  {
    id: "tools",
    name: "Herramientas",
    icon: Scissors,
    imageUrl: "/categories/banners/tools-banner.png",
    subcategories: ["Brochas", "Esponjas", "Aplicadores", "Rizadores", "Planchas", "Organizadores"]
  },
  {
    id: "accessories",
    name: "Accesorios",
    icon: Package,
    imageUrl: "/categories/banners/accessories-banner.png",
    subcategories: ["Bolsas", "Estuches", "Neceseres", "Mirrors", "Viaje", "Almacenamiento"]
  }
]

export function ShopCategoryNav({ selectedCategory = "all", onCategoryChange }: CategoryNavProps) {
  const router = useRouter()
  const [hoveredCategory, setHoveredCategory] = useState<ProductCategory | null>(null)
  const [productCounts, setProductCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    const counts: Record<string, number> = {}
    categories.forEach(category => {
      counts[category.id] = mockProducts.filter(
        product => product.category === category.id && product.availability.inStock
      ).length
    })
    setProductCounts(counts)
  }, [])

  const handleCategoryClick = (categoryId: ProductCategory | "all") => {
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    } else {
      router.push(categoryId === "all" ? "/shop" : `/shop?category=${categoryId}`)
    }
    setHoveredCategory(null)
  }

  const handleSubcategoryClick = (categoryId: ProductCategory, subcategory: string) => {
    router.push(`/shop?category=${categoryId}&subcategory=${encodeURIComponent(subcategory)}`)
    setHoveredCategory(null)
  }

  return (
    <div className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-femfuel-rose/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          {/* All Products */}
          <button
            onClick={() => handleCategoryClick("all")}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-femfuel-rose text-white shadow-md scale-105"
                : "bg-white/80 text-femfuel-medium hover:bg-femfuel-light hover:text-femfuel-dark border border-femfuel-rose/20"
            }`}
          >
            Todos
          </button>

          {/* Category Pills */}
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.id
            const isHovered = hoveredCategory === category.id

            return (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-femfuel-rose text-white shadow-md scale-105"
                      : "bg-white/80 text-femfuel-medium hover:bg-femfuel-light hover:text-femfuel-dark border border-femfuel-rose/20"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                  {productCounts[category.id] && (
                    <span className={`text-xs ${isActive ? "text-white/90" : "text-femfuel-light"}`}>
                      ({productCounts[category.id]})
                    </span>
                  )}
                </button>

                {/* Mega Menu Dropdown */}
                {isHovered && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-femfuel-rose/20 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Left: Category Image */}
                      <div className="col-span-1">
                        <div className="relative h-full rounded-xl overflow-hidden">
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                            <p className="text-white/90 text-sm">{productCounts[category.id]} productos</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Subcategories */}
                      <div className="col-span-2">
                        <h4 className="text-sm font-bold text-femfuel-dark mb-3 uppercase tracking-wide">
                          Explorar por Subcategoría
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.subcategories.map((subcategory, index) => (
                            <button
                              key={index}
                              onClick={() => handleSubcategoryClick(category.id, subcategory)}
                              className="text-left px-3 py-2 rounded-lg text-sm text-femfuel-medium hover:bg-femfuel-light hover:text-femfuel-dark transition-all duration-200 font-medium"
                            >
                              {subcategory}
                            </button>
                          ))}
                        </div>

                        {/* View All Link */}
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className="mt-4 w-full py-2 px-4 rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 text-white font-semibold text-sm hover:shadow-lg active:scale-95 transition-all duration-300"
                        >
                          Ver Todos los Productos →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
