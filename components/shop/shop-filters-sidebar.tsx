"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Star, Check, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  colors: string[]
  rating: number | null
  inStock: boolean
  sortBy: string
}

interface ShopFiltersSidebarProps {
  onFiltersChange: (filters: FilterState) => void
  className?: string
}

// Color swatches for makeup products
const MAKEUP_COLORS = [
  { name: "Nude", hex: "#F5DEB3" },
  { name: "Rosa", hex: "#FFB6C1" },
  { name: "Rojo", hex: "#DC143C" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Marrón", hex: "#8B4513" },
  { name: "Dorado", hex: "#FFD700" },
  { name: "Bronce", hex: "#CD7F32" },
  { name: "Negro", hex: "#000000" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Caramelo", hex: "#DEB887" },
]

const CATEGORIES = [
  { id: "skincare", name: "Cuidado de la Piel", count: 45 },
  { id: "makeup", name: "Maquillaje", count: 38 },
  { id: "haircare", name: "Cuidado del Cabello", count: 22 },
  { id: "fragrance", name: "Fragancias", count: 15 },
  { id: "tools", name: "Herramientas", count: 12 },
]

const BRANDS = [
  { id: "femfuel", name: "FemFuel Beauty", count: 52 },
  { id: "ordinary", name: "The Ordinary", count: 28 },
  { id: "cerave", name: "CeraVe", count: 18 },
  { id: "neutrogena", name: "Neutrogena", count: 15 },
  { id: "loreal", name: "L'Oréal Paris", count: 12 },
  { id: "maybelline", name: "Maybelline", count: 10 },
]

export function ShopFiltersSidebar({ onFiltersChange, className = "" }: ShopFiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "price", "brands"])
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 10000],
    colors: [],
    rating: null,
    inStock: false,
    sortBy: "featured"
  })

  // Load saved filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("shop-filters")
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters)
        setFilters(parsed)
      } catch (e) {
        console.error("Failed to load saved filters")
      }
    }
  }, [])

  // Emit filter changes
  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentArray = prev[type] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value]

      return { ...prev, [type]: newArray }
    })
  }

  const updatePriceRange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }))
  }

  const setRating = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }))
  }

  const toggleInStock = () => {
    setFilters(prev => ({ ...prev, inStock: !prev.inStock }))
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
    localStorage.removeItem("shop-filters")
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.rating ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000 ? 1 : 0)

  return (
    <div className={`bg-white/80 backdrop-blur-md rounded-2xl border border-femfuel-rose/10 shadow-xl ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-femfuel-rose/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-femfuel-dark font-serif">
            Filtros
          </h2>
          {activeFiltersCount > 0 && (
            <Badge className="bg-femfuel-rose text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-femfuel-rose hover:text-femfuel-dark hover:bg-femfuel-light/30 -ml-2"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar todo
          </Button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
        {/* Categories */}
        <div>
          <button
            onClick={() => toggleSection("categories")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-bold text-femfuel-dark">Categorías</h3>
            {expandedSections.includes("categories") ? (
              <ChevronUp className="h-5 w-5 text-femfuel-medium" />
            ) : (
              <ChevronDown className="h-5 w-5 text-femfuel-medium" />
            )}
          </button>

          {expandedSections.includes("categories") && (
            <div className="space-y-3">
              {CATEGORIES.map(category => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => toggleFilter("categories", category.id)}
                  />
                  <span className="flex-1 text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                    {category.name}
                  </span>
                  <span className="text-sm text-femfuel-medium">
                    {category.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-bold text-femfuel-dark">Precio</h3>
            {expandedSections.includes("price") ? (
              <ChevronUp className="h-5 w-5 text-femfuel-medium" />
            ) : (
              <ChevronDown className="h-5 w-5 text-femfuel-medium" />
            )}
          </button>

          {expandedSections.includes("price") && (
            <div className="space-y-4">
              <Slider
                min={0}
                max={10000}
                step={100}
                value={filters.priceRange}
                onValueChange={updatePriceRange}
                className="w-full"
              />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-femfuel-medium">Mínimo</Label>
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => updatePriceRange([parseInt(e.target.value), filters.priceRange[1]])}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-femfuel-medium">Máximo</Label>
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => updatePriceRange([filters.priceRange[0], parseInt(e.target.value)])}
                    className="mt-1"
                  />
                </div>
              </div>
              <p className="text-sm text-femfuel-medium text-center">
                RD${filters.priceRange[0].toLocaleString()} - RD${filters.priceRange[1].toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Brands */}
        <div>
          <button
            onClick={() => toggleSection("brands")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-bold text-femfuel-dark">Marcas</h3>
            {expandedSections.includes("brands") ? (
              <ChevronUp className="h-5 w-5 text-femfuel-medium" />
            ) : (
              <ChevronDown className="h-5 w-5 text-femfuel-medium" />
            )}
          </button>

          {expandedSections.includes("brands") && (
            <div className="space-y-3">
              {BRANDS.map(brand => (
                <label
                  key={brand.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.brands.includes(brand.id)}
                    onCheckedChange={() => toggleFilter("brands", brand.id)}
                  />
                  <span className="flex-1 text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                    {brand.name}
                  </span>
                  <span className="text-sm text-femfuel-medium">
                    {brand.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div>
          <button
            onClick={() => toggleSection("colors")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-bold text-femfuel-dark">Colores</h3>
            {expandedSections.includes("colors") ? (
              <ChevronUp className="h-5 w-5 text-femfuel-medium" />
            ) : (
              <ChevronDown className="h-5 w-5 text-femfuel-medium" />
            )}
          </button>

          {expandedSections.includes("colors") && (
            <div className="grid grid-cols-5 gap-3">
              {MAKEUP_COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleFilter("colors", color.name)}
                  className={`relative w-12 h-12 rounded-full border-2 ${
                    filters.colors.includes(color.name)
                      ? 'border-femfuel-rose ring-2 ring-femfuel-rose/30'
                      : 'border-gray-300'
                  } active:scale-95 transition-all duration-300`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {filters.colors.includes(color.name) && (
                    <Check className="absolute inset-0 m-auto h-6 w-6 text-white drop-shadow-lg" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div>
          <button
            onClick={() => toggleSection("rating")}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="text-lg font-bold text-femfuel-dark">Valoración</h3>
            {expandedSections.includes("rating") ? (
              <ChevronUp className="h-5 w-5 text-femfuel-medium" />
            ) : (
              <ChevronDown className="h-5 w-5 text-femfuel-medium" />
            )}
          </button>

          {expandedSections.includes("rating") && (
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setRating(rating)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl ${
                    filters.rating === rating
                      ? 'bg-femfuel-light border-2 border-femfuel-rose'
                      : 'hover:bg-femfuel-light/30 border-2 border-transparent'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-femfuel-dark">y más</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center justify-between p-4 bg-femfuel-light/30 rounded-xl">
          <Label htmlFor="in-stock" className="text-femfuel-dark font-semibold cursor-pointer">
            Solo productos en stock
          </Label>
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={toggleInStock}
          />
        </div>
      </div>
    </div>
  )
}
