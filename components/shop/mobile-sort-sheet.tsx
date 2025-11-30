"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest"
  | "name-asc"

interface MobileSortSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

interface SortOptionConfig {
  value: SortOption
  label: string
  description: string
}

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    value: "popular",
    label: "Más Popular",
    description: "Productos más vendidos"
  },
  {
    value: "price-asc",
    label: "Precio: Menor a Mayor",
    description: "Productos más económicos primero"
  },
  {
    value: "price-desc",
    label: "Precio: Mayor a Menor",
    description: "Productos más caros primero"
  },
  {
    value: "rating",
    label: "Mejor Valorados",
    description: "Calificación más alta"
  },
  {
    value: "newest",
    label: "Más Nuevos",
    description: "Llegadas recientes"
  },
  {
    value: "name-asc",
    label: "Nombre A-Z",
    description: "Orden alfabético"
  }
]

export function MobileSortSheet({
  isOpen,
  onOpenChange,
  currentSort,
  onSortChange
}: MobileSortSheetProps) {
  const handleSortSelect = (sort: SortOption) => {
    onSortChange(sort)
    onOpenChange(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] rounded-t-2xl pb-[env(safe-area-inset-bottom)]"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-bold text-femfuel-dark">
            Ordenar Por
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-2 pb-4">
          {SORT_OPTIONS.map((option) => {
            const isSelected = currentSort === option.value

            return (
              <Button
                key={option.value}
                variant="ghost"
                onClick={() => handleSortSelect(option.value)}
                className={`w-full min-h-[56px] justify-start p-4 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 border-2 border-femfuel-rose/30"
                    : "hover:bg-gray-50 border-2 border-transparent"
                }`}
              >
                <div className="flex items-center w-full">
                  {/* Radio Circle */}
                  <div
                    className={`min-w-[24px] min-h-[24px] rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                      isSelected
                        ? "border-femfuel-rose bg-femfuel-rose"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    )}
                  </div>

                  {/* Label & Description */}
                  <div className="flex-1 text-left">
                    <div
                      className={`text-sm font-semibold ${
                        isSelected ? "text-femfuel-rose" : "text-femfuel-dark"
                      }`}
                    >
                      {option.label}
                    </div>
                    <div className="text-xs text-femfuel-medium mt-0.5">
                      {option.description}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
