"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface CategorySidebarProps {
  subcategories: string[]
  selectedSubcategories: string[]
  onSubcategoryChange: (subcategories: string[]) => void
  brands: string[]
  selectedBrands: string[]
  onBrandChange: (brands: string[]) => void
  priceRange: [number, number]
  maxPrice: number
  onPriceChange: (range: [number, number]) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
  onClearAll: () => void
  productCount: number
}

export function CategorySidebar({
  subcategories,
  selectedSubcategories,
  onSubcategoryChange,
  brands,
  selectedBrands,
  onBrandChange,
  priceRange,
  maxPrice,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onClearAll,
  productCount
}: CategorySidebarProps) {
  const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(true)
  const [isBrandsOpen, setIsBrandsOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isRatingOpen, setIsRatingOpen] = useState(true)

  const hasActiveFilters =
    selectedSubcategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    selectedRating !== null

  const handleSubcategoryToggle = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      onSubcategoryChange(selectedSubcategories.filter(s => s !== subcategory))
    } else {
      onSubcategoryChange([...selectedSubcategories, subcategory])
    }
  }

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter(b => b !== brand))
    } else {
      onBrandChange([...selectedBrands, brand])
    }
  }

  return (
    <aside className="w-[280px] bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-femfuel-rose/10 sticky top-[132px] h-fit max-h-[calc(100vh-148px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-femfuel-rose/10">
        <h3 className="font-bold text-lg text-femfuel-dark">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs text-femfuel-rose hover:text-femfuel-rose-hover hover:bg-femfuel-light/50 -mr-2"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Product Count */}
      <div className="mb-6 px-3 py-2 bg-femfuel-light/30 rounded-lg">
        <p className="text-sm text-femfuel-medium">
          <span className="font-bold text-femfuel-dark">{productCount}</span> productos encontrados
        </p>
      </div>

      {/* Subcategories Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsSubcategoriesOpen(!isSubcategoriesOpen)}
          className="w-full flex items-center justify-between mb-3 text-sm font-bold text-femfuel-dark uppercase tracking-wide"
        >
          <span>Subcategorías</span>
          {isSubcategoriesOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isSubcategoriesOpen && (
          <div className="space-y-2">
            {subcategories.map((subcategory) => (
              <label
                key={subcategory}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={() => handleSubcategoryToggle(subcategory)}
                  className="w-4 h-4 rounded border-femfuel-rose/30 text-femfuel-rose focus:ring-femfuel-rose focus:ring-offset-0"
                />
                <span className="text-sm text-femfuel-medium group-hover:text-femfuel-dark transition-colors">
                  {subcategory}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between mb-3 text-sm font-bold text-femfuel-dark uppercase tracking-wide"
        >
          <span>Precio</span>
          {isPriceOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isPriceOpen && (
          <div className="space-y-3">
            <Slider
              min={0}
              max={maxPrice}
              step={50}
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-femfuel-medium">
              <span>RD${priceRange[0]}</span>
              <span>RD${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Brands Filter */}
      {brands.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setIsBrandsOpen(!isBrandsOpen)}
            className="w-full flex items-center justify-between mb-3 text-sm font-bold text-femfuel-dark uppercase tracking-wide"
          >
            <span>Marcas</span>
            {isBrandsOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isBrandsOpen && (
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 rounded border-femfuel-rose/30 text-femfuel-rose focus:ring-femfuel-rose focus:ring-offset-0"
                  />
                  <span className="text-sm text-femfuel-medium group-hover:text-femfuel-dark transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="w-full flex items-center justify-between mb-3 text-sm font-bold text-femfuel-dark uppercase tracking-wide"
        >
          <span>Calificación</span>
          {isRatingOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {isRatingOpen && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedRating === rating
                    ? "bg-femfuel-rose/10 text-femfuel-rose border border-femfuel-rose/20"
                    : "text-femfuel-medium hover:bg-femfuel-light/50"
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span>y superior</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
