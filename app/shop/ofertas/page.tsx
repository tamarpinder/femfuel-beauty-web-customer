"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ShopHeader } from "@/components/shop/shop-header"
import { CategorySidebar } from "@/components/shop/category-sidebar"
import { ProductGridEnhanced } from "@/components/shop/product-grid-enhanced"
import { QuickViewModal } from "@/components/shop/quick-view-modal"
import { mockProducts, getProductsOnSale } from "@/data/products"
import { Product, ProductCategory } from "@/types/product"
import { ArrowUpDown, Tag, Home, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sortOptions = [
  { value: "discount", label: "Mayor Descuento" },
  { value: "popular", label: "Más Popular" },
  { value: "newest", label: "Más Reciente" },
  { value: "price-low", label: "Precio: Menor a Mayor" },
  { value: "price-high", label: "Precio: Mayor a Menor" },
  { value: "rating", label: "Mejor Calificación" }
]

export default function OfertasPage() {
  const router = useRouter()

  // State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("discount")
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Get all products on sale
  const saleProducts = useMemo(() => getProductsOnSale(), [])

  // Get unique categories from sale products
  const availableCategories = useMemo(() => {
    const categories = new Set(saleProducts.map(p => p.category))
    return Array.from(categories).sort()
  }, [saleProducts])

  // Get unique brands from sale products
  const availableBrands = useMemo(() => {
    const brands = new Set(saleProducts.map(p => p.brand))
    return Array.from(brands).sort()
  }, [saleProducts])

  // Calculate max price
  const maxPrice = useMemo(() => {
    const prices = saleProducts.map(p => p.price)
    return prices.length > 0 ? Math.max(...prices) : 10000
  }, [saleProducts])

  // Initialize price range
  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...saleProducts]

    // Apply category filter
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category))
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
  }, [saleProducts, selectedCategories, selectedBrands, priceRange, selectedRating])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case "discount":
        return sorted.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0
          return discountB - discountA
        })
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
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const handleClearAllFilters = () => {
    setSelectedCategories([])
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

  return (
    <>
      <ShopHeader />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 p-8 md:p-12">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-700"></div>
          </div>

          <div className="relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-white/90 mb-6">
              <button
                onClick={() => router.push("/")}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Inicio</span>
              </button>
              <ChevronRight className="h-3.5 w-3.5" />
              <button
                onClick={() => router.push("/shop")}
                className="hover:text-white transition-colors"
              >
                Tienda
              </button>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white font-medium">Ofertas Especiales</span>
            </nav>

            {/* Hero Content */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg">
                <Tag className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
                  Ofertas Especiales
                </h1>
                <p className="text-xl text-white/90">
                  Hasta 50% OFF en productos seleccionados
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mt-6">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-0 px-4 py-2">
                {saleProducts.length} productos en oferta
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-md text-white border-0 px-4 py-2">
                Ahorra hasta 50%
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar + Products */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <CategorySidebar
            subcategories={availableCategories}
            selectedSubcategories={selectedCategories}
            onSubcategoryChange={setSelectedCategories}
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
                  <span className="font-bold text-femfuel-dark">{saleProducts.length}</span> productos
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
