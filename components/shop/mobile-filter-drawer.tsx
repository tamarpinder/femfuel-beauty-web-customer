"use client"

import { useState } from "react"
import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  minRating: number
  inStockOnly: boolean
  categories: string[]
}

interface MobileFilterDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  availableBrands?: string[]
  availableCategories?: string[]
  maxPrice?: number
}

const DEFAULT_BRANDS = [
  "L'Oréal",
  "Maybelline",
  "NYX",
  "Revlon",
  "CoverGirl",
  "e.l.f.",
]

const DEFAULT_CATEGORIES = [
  "Maquillaje",
  "Cuidado de la Piel",
  "Cabello",
  "Fragancias",
  "Accesorios",
]

export function MobileFilterDrawer({
  isOpen,
  onOpenChange,
  filters,
  onFilterChange,
  availableBrands = DEFAULT_BRANDS,
  availableCategories = DEFAULT_CATEGORIES,
  maxPrice = 10000,
}: MobileFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters)

  const handleBrandToggle = (brand: string) => {
    const newBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter((b) => b !== brand)
      : [...localFilters.brands, brand]

    setLocalFilters({ ...localFilters, brands: newBrands })
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category]

    setLocalFilters({ ...localFilters, categories: newCategories })
  }

  const handlePriceChange = (value: number[]) => {
    setLocalFilters({ ...localFilters, priceRange: [value[0], value[1]] })
  }

  const handleClearAll = () => {
    const clearedFilters: FilterOptions = {
      priceRange: [0, maxPrice],
      brands: [],
      minRating: 0,
      inStockOnly: false,
      categories: [],
    }
    setLocalFilters(clearedFilters)
  }

  const handleApply = () => {
    onFilterChange(localFilters)
    onOpenChange(false)
  }

  const activeFilterCount =
    localFilters.brands.length +
    localFilters.categories.length +
    (localFilters.minRating > 0 ? 1 : 0) +
    (localFilters.inStockOnly ? 1 : 0) +
    (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < maxPrice ? 1 : 0)

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-md p-0 flex flex-col pb-[env(safe-area-inset-bottom)]"
      >
        {/* Header */}
        <SheetHeader className="px-4 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-femfuel-rose" />
              <SheetTitle className="text-xl font-bold text-femfuel-dark">
                Filtros
              </SheetTitle>
              {activeFilterCount > 0 && (
                <Badge className="bg-femfuel-rose text-white">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-sm text-femfuel-medium hover:text-femfuel-rose min-h-[44px]"
            >
              Limpiar Todo
            </Button>
          </div>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <Accordion type="multiple" defaultValue={["price", "brands", "categories"]} className="space-y-2">
            {/* Price Range */}
            <AccordionItem value="price" className="border rounded-xl px-4">
              <AccordionTrigger className="text-base font-semibold text-femfuel-dark hover:no-underline py-4">
                Rango de Precio
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={maxPrice}
                    step={100}
                    value={localFilters.priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-femfuel-dark">
                      RD${localFilters.priceRange[0].toLocaleString()}
                    </span>
                    <span className="text-femfuel-medium">-</span>
                    <span className="font-semibold text-femfuel-dark">
                      RD${localFilters.priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Categories */}
            <AccordionItem value="categories" className="border rounded-xl px-4">
              <AccordionTrigger className="text-base font-semibold text-femfuel-dark hover:no-underline py-4">
                Categorías
                {localFilters.categories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {localFilters.categories.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-2">
                  {availableCategories.map((category) => {
                    const isSelected = localFilters.categories.includes(category)
                    return (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`w-full min-h-[48px] px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 border-2 border-femfuel-rose/30"
                            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-femfuel-rose" : "text-femfuel-dark"
                            }`}
                          >
                            {category}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-femfuel-rose flex items-center justify-center">
                              <X className="h-3 w-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Brands */}
            <AccordionItem value="brands" className="border rounded-xl px-4">
              <AccordionTrigger className="text-base font-semibold text-femfuel-dark hover:no-underline py-4">
                Marcas
                {localFilters.brands.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {localFilters.brands.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-2">
                  {availableBrands.map((brand) => {
                    const isSelected = localFilters.brands.includes(brand)
                    return (
                      <button
                        key={brand}
                        onClick={() => handleBrandToggle(brand)}
                        className={`w-full min-h-[48px] px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 border-2 border-femfuel-rose/30"
                            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-femfuel-rose" : "text-femfuel-dark"
                            }`}
                          >
                            {brand}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-femfuel-rose flex items-center justify-center">
                              <X className="h-3 w-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rating */}
            <AccordionItem value="rating" className="border rounded-xl px-4">
              <AccordionTrigger className="text-base font-semibold text-femfuel-dark hover:no-underline py-4">
                Calificación Mínima
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map((rating) => {
                    const isSelected = localFilters.minRating === rating
                    return (
                      <button
                        key={rating}
                        onClick={() =>
                          setLocalFilters({ ...localFilters, minRating: rating })
                        }
                        className={`w-full min-h-[48px] px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 border-2 border-femfuel-rose/30"
                            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-femfuel-rose" : "text-femfuel-dark"
                            }`}
                          >
                            {rating > 0 ? `${rating}+ estrellas` : "Todas"}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* In Stock Toggle */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
            <div className="flex items-center justify-between min-h-[48px]">
              <div>
                <p className="text-sm font-semibold text-femfuel-dark">
                  Solo en Stock
                </p>
                <p className="text-xs text-femfuel-medium">
                  Mostrar solo productos disponibles
                </p>
              </div>
              <Switch
                checked={localFilters.inStockOnly}
                onCheckedChange={(checked) =>
                  setLocalFilters({ ...localFilters, inStockOnly: checked })
                }
                className="data-[state=checked]:bg-femfuel-rose"
              />
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <Button
            onClick={handleApply}
            className="w-full min-h-[52px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold rounded-xl shadow-lg"
          >
            Aplicar Filtros
            {activeFilterCount > 0 && ` (${activeFilterCount})`}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
