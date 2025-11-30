"use client"

import { useState, useEffect } from "react"
import { X, SlidersHorizontal, ChevronDown, Grid3x3, LayoutGrid, Rows3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShopFiltersSidebar, FilterState } from "./shop-filters-sidebar"

interface ShopFilterChipsProps {
  onFiltersChange: (filters: FilterState) => void
  productsCount: number
  sortBy: string
  onSortChange: (sortBy: string) => void
  gridColumns: number
  onGridColumnsChange: (columns: number) => void
}

const QUICK_CATEGORIES = [
  { id: "skincare", label: "Cuidado de la Piel" },
  { id: "makeup", label: "Maquillaje" },
  { id: "haircare", label: "Cuidado del Cabello" },
  { id: "fragrance", label: "Fragancias" },
]

const QUICK_PRICE_RANGES = [
  { id: "0-1000", label: "Menos de RD$1,000", range: [0, 1000] },
  { id: "1000-3000", label: "RD$1,000 - RD$3,000", range: [1000, 3000] },
  { id: "3000-5000", label: "RD$3,000 - RD$5,000", range: [3000, 5000] },
  { id: "5000+", label: "Más de RD$5,000", range: [5000, 10000] },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "newest", label: "Más Recientes" },
  { value: "rating", label: "Mejor Valorados" },
  { value: "popular", label: "Más Populares" },
]

const GRID_OPTIONS = [
  { value: 2, icon: Rows3, label: "2 columnas" },
  { value: 3, icon: Grid3x3, label: "3 columnas" },
  { value: 4, icon: LayoutGrid, label: "4 columnas" },
]

export function ShopFilterChips({
  onFiltersChange,
  productsCount,
  sortBy,
  onSortChange,
  gridColumns,
  onGridColumnsChange
}: ShopFilterChipsProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 10000],
    colors: [],
    rating: null,
    inStock: false,
    sortBy: "featured"
  })

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Emit filter changes
  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const toggleCategory = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

  const togglePriceRange = (rangeId: string) => {
    const range = QUICK_PRICE_RANGES.find(r => r.id === rangeId)
    if (!range) return

    setFilters(prev => ({
      ...prev,
      priceRange: range.range as [number, number]
    }))
  }

  const isPriceRangeActive = (rangeId: string) => {
    const range = QUICK_PRICE_RANGES.find(r => r.id === rangeId)
    if (!range) return false
    return filters.priceRange[0] === range.range[0] && filters.priceRange[1] === range.range[1]
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 10000],
      colors: [],
      rating: null,
      inStock: false,
      sortBy: "featured"
    })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.rating ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000 ? 1 : 0)

  return (
    <>
      {/* Filter Chips Bar */}
      <div className={`bg-white/95 backdrop-blur-md border-b border-femfuel-rose/10 transition-all duration-300 ${
        isSticky ? 'fixed top-[60px] left-0 right-0 z-40 shadow-lg' : 'relative'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {/* Quick Category Chips */}
            {QUICK_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filters.categories.includes(category.id)
                    ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-md'
                    : 'bg-white border-2 border-femfuel-rose/20 text-femfuel-dark hover:border-femfuel-rose hover:bg-femfuel-light'
                }`}
              >
                {category.label}
                {filters.categories.includes(category.id) && (
                  <X className="inline-block h-3 w-3 ml-2" />
                )}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-8 bg-femfuel-rose/20 flex-shrink-0" />

            {/* Quick Price Range Chips */}
            {QUICK_PRICE_RANGES.map(priceRange => (
              <button
                key={priceRange.id}
                onClick={() => togglePriceRange(priceRange.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isPriceRangeActive(priceRange.id)
                    ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-md'
                    : 'bg-white border-2 border-femfuel-rose/20 text-femfuel-dark hover:border-femfuel-rose hover:bg-femfuel-light'
                }`}
              >
                {priceRange.label}
                {isPriceRangeActive(priceRange.id) && (
                  <X className="inline-block h-3 w-3 ml-2" />
                )}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-8 bg-femfuel-rose/20 flex-shrink-0" />

            {/* More Filters Button */}
            <Button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              variant="outline"
              className="flex-shrink-0 border-2 border-femfuel-rose/30 hover:bg-femfuel-light hover:border-femfuel-rose"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Más Filtros
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-femfuel-rose text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="flex-shrink-0 text-femfuel-rose hover:text-femfuel-dark hover:bg-femfuel-light/30"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Products Count */}
            <div className="flex-shrink-0 text-sm text-femfuel-medium font-semibold">
              {productsCount} {productsCount === 1 ? 'producto' : 'productos'}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="flex-shrink-0 px-4 py-2 border-2 border-femfuel-rose/20 rounded-full text-sm font-semibold text-femfuel-dark hover:border-femfuel-rose focus:outline-none focus:border-femfuel-rose transition-all duration-300 bg-white"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Grid View Options */}
            <div className="hidden lg:flex items-center gap-2 border-2 border-femfuel-rose/20 rounded-full p-1 bg-white flex-shrink-0">
              {GRID_OPTIONS.map(option => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => onGridColumnsChange(option.value)}
                    className={`rounded-full ${
                      gridColumns === option.value
                        ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white hover:from-femfuel-rose/90 hover:to-pink-600/90'
                        : 'text-femfuel-medium hover:text-femfuel-dark hover:bg-femfuel-light/30'
                    }`}
                    title={option.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Slide-In Panel */}
      {showAdvancedFilters && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowAdvancedFilters(false)}
          />

          {/* Slide-In Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white border-b border-femfuel-rose/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-femfuel-dark font-serif">
                Filtros Avanzados
              </h2>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 hover:bg-femfuel-light rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <ShopFiltersSidebar
                onFiltersChange={(newFilters) => {
                  setFilters(newFilters)
                  onFiltersChange(newFilters)
                }}
              />
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
