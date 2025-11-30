"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ShopHeader } from "@/components/shop/shop-header"
import { CategoryHero } from "@/components/shop/category-hero"
import { CategorySidebar } from "@/components/shop/category-sidebar"
import { ProductGridEnhanced } from "@/components/shop/product-grid-enhanced"
import { QuickViewModal } from "@/components/shop/quick-view-modal"
import { mockProducts } from "@/data/products"
import { Product } from "@/types/product"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Category metadata
const categoryMetadata: Record<string, {
  name: string
  description: string
  imageUrl: string
  subcategories: string[]
}> = {
  skincare: {
    name: "Cuidado Facial",
    description: "Productos premium para el cuidado de tu piel. Limpiadores, serums, hidratantes y más.",
    imageUrl: "/categories/banners/skincare-banner.png",
    subcategories: ["Limpiadores", "Serums", "Hidratantes", "Mascarillas"]
  },
  makeup: {
    name: "Maquillaje",
    description: "Maquillaje de alta calidad para realzar tu belleza natural.",
    imageUrl: "/categories/banners/makeup-banner.png",
    subcategories: ["Base", "Labiales", "Ojos", "Mejillas"]
  },
  haircare: {
    name: "Cuidado Capilar",
    description: "Todo lo que necesitas para mantener tu cabello saludable y hermoso.",
    imageUrl: "/categories/banners/haircare-banner.png",
    subcategories: ["Shampoo", "Acondicionador", "Tratamientos", "Styling"]
  },
  "hair-extensions": {
    name: "Extensiones & Cabello",
    description: "Extensiones de cabello 100% natural y productos para el cuidado de extensiones.",
    imageUrl: "/categories/banners/hair-extensions-banner.png",
    subcategories: ["Extensiones con Cinta", "Extensiones con Clip", "Paquetes/Mallas", "Colas de Caballo"]
  },
  nailcare: {
    name: "Cuidado de Uñas",
    description: "Esmaltes, tratamientos y herramientas para uñas perfectas.",
    imageUrl: "/categories/banners/nailcare-banner.png",
    subcategories: ["Esmaltes", "Bases", "Tratamientos", "Herramientas"]
  },
  tools: {
    name: "Herramientas & Accesorios",
    description: "Brochas, esponjas y herramientas profesionales para tu rutina de belleza.",
    imageUrl: "/categories/banners/tools-banner.png",
    subcategories: ["Brochas", "Esponjas", "Aplicadores", "Organizadores"]
  }
}

const sortOptions = [
  { value: "popular", label: "Más Popular" },
  { value: "newest", label: "Más Reciente" },
  { value: "price-low", label: "Precio: Menor a Mayor" },
  { value: "price-high", label: "Precio: Mayor a Menor" },
  { value: "rating", label: "Mejor Calificación" },
  { value: "name", label: "Nombre A-Z" }
]

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = params.category as string

  // Get category metadata
  const category = categoryMetadata[categorySlug]

  // State
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("popular")
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Get products for this category
  const categoryProducts = useMemo(() => {
    return mockProducts.filter(
      product => product.category === categorySlug && product.availability.inStock
    )
  }, [categorySlug])

  // Get unique brands for this category
  const availableBrands = useMemo(() => {
    const brands = new Set(categoryProducts.map(p => p.brand))
    return Array.from(brands).sort()
  }, [categoryProducts])

  // Calculate max price for slider
  const maxPrice = useMemo(() => {
    const prices = categoryProducts.map(p => p.price)
    return prices.length > 0 ? Math.max(...prices) : 10000
  }, [categoryProducts])

  // Initialize price range when max price changes
  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  // Check for subcategory in URL params
  useEffect(() => {
    const subcategory = searchParams.get("subcategory")
    if (subcategory && !selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories([subcategory])
    }
  }, [searchParams])

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...categoryProducts]

    // Apply subcategory filter
    if (selectedSubcategories.length > 0) {
      products = products.filter(p => selectedSubcategories.includes(p.subcategory))
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand))
    }

    // Apply price range filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Apply rating filter
    if (selectedRating !== null) {
      products = products.filter(p => p.rating >= selectedRating)
    }

    return products
  }, [categoryProducts, selectedSubcategories, selectedBrands, priceRange, selectedRating])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const handleClearAllFilters = () => {
    setSelectedSubcategories([])
    setSelectedBrands([])
    setPriceRange([0, maxPrice])
    setSelectedRating(null)
  }

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false)
    setTimeout(() => setQuickViewProduct(null), 300)
  }

  // Handle invalid category
  if (!category) {
    return (
      <>
        <ShopHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-femfuel-dark mb-2">Categoría no encontrada</h1>
            <p className="text-femfuel-medium">La categoría que buscas no existe.</p>
          </div>
        </div>
        <MobileNavigation activeTab="shop" />
      </>
    )
  }

  return (
    <>
      <ShopHeader />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Category Hero */}
        <CategoryHero
          categoryName={category.name}
          categorySlug={categorySlug}
          description={category.description}
          imageUrl={category.imageUrl}
          productCount={categoryProducts.length}
        />

        {/* Main Content: Sidebar + Products */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <CategorySidebar
            subcategories={category.subcategories}
            selectedSubcategories={selectedSubcategories}
            onSubcategoryChange={setSelectedSubcategories}
            brands={availableBrands}
            selectedBrands={selectedBrands}
            onBrandChange={setSelectedBrands}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onPriceChange={setPriceRange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            onClearAll={handleClearAllFilters}
            productCount={sortedProducts.length}
          />

          {/* Products */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-femfuel-medium text-sm">
                  Mostrando <span className="font-bold text-femfuel-dark">{sortedProducts.length}</span> de{" "}
                  <span className="font-bold text-femfuel-dark">{categoryProducts.length}</span> productos
                </p>
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-femfuel-rose/20 hover:border-femfuel-rose/40 hover:bg-femfuel-light/30"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {sortOptions.find(opt => opt.value === sortBy)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={sortBy === option.value ? "bg-femfuel-light" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <ProductGridEnhanced
                products={sortedProducts}
                onQuickView={handleQuickView}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-femfuel-medium mb-4">
                  No se encontraron productos con los filtros seleccionados.
                </p>
                <Button
                  onClick={handleClearAllFilters}
                  variant="outline"
                  className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-light"
                >
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileNavigation activeTab="shop" />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </>
  )
}
