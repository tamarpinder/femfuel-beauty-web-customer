"use client"

import { Grid3x3, LayoutGrid, Rows3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShopControlsBarProps {
  productsCount: number
  sortBy: string
  onSortChange: (sortBy: string) => void
  gridColumns: number
  onGridColumnsChange: (columns: number) => void
}

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

export function ShopControlsBar({
  productsCount,
  sortBy,
  onSortChange,
  gridColumns,
  onGridColumnsChange
}: ShopControlsBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-femfuel-rose/10 sticky top-[60px] z-30">
      <div className="flex items-center justify-between py-4 px-6">
        {/* Products Count */}
        <div>
          <p className="text-sm text-femfuel-medium font-semibold">
            {productsCount} {productsCount === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border-2 border-femfuel-rose/20 rounded-full text-sm font-semibold text-femfuel-dark hover:border-femfuel-rose focus:outline-none focus:border-femfuel-rose transition-all duration-300 bg-white"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Grid View Options */}
          <div className="hidden lg:flex items-center gap-2 border-2 border-femfuel-rose/20 rounded-full p-1 bg-white">
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
  )
}
