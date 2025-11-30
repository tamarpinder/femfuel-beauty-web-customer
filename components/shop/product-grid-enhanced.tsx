"use client"

import { useState, useEffect } from "react"
import { Grid2X2, Grid3X3, LayoutGrid, Grip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { ProductCardEnhanced } from "./product-card-enhanced"

type GridDensity = "2" | "3" | "4" | "5"

interface ProductGridEnhancedProps {
  products: Product[]
  onQuickView?: (product: Product) => void
}

export function ProductGridEnhanced({ products, onQuickView }: ProductGridEnhancedProps) {
  const [gridDensity, setGridDensity] = useState<GridDensity>("4")

  // Load saved preference from localStorage
  useEffect(() => {
    const savedDensity = localStorage.getItem("shopGridDensity") as GridDensity | null
    if (savedDensity && ["2", "3", "4", "5"].includes(savedDensity)) {
      setGridDensity(savedDensity)
    }
  }, [])

  // Save preference when changed
  const handleDensityChange = (density: GridDensity) => {
    setGridDensity(density)
    localStorage.setItem("shopGridDensity", density)
  }

  // Grid column classes based on density (mobile-first)
  const getGridClasses = () => {
    switch (gridDensity) {
      case "2":
        return "grid-cols-1 sm:grid-cols-2"
      case "3":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case "4":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      case "5":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    }
  }

  // Gap classes based on density (responsive)
  const getGapClass = () => {
    return gridDensity === "2" || gridDensity === "3" ? "gap-4 md:gap-6" : "gap-3 md:gap-4"
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Grid Density Controls */}
      <div className="flex items-center justify-between">
        {/* Desktop-only grid density controls */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-sm font-medium text-femfuel-medium">
            Vista de Cuadrícula:
          </span>
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/80 backdrop-blur-md border border-femfuel-rose/20 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDensityChange("2")}
              className={`p-2 min-h-[44px] min-w-[44px] transition-all duration-300 ${
                gridDensity === "2"
                  ? "bg-femfuel-rose text-white shadow-md scale-105"
                  : "hover:bg-femfuel-light"
              }`}
              title="2 columnas"
              aria-label="Vista de 2 columnas"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDensityChange("3")}
              className={`p-2 min-h-[44px] min-w-[44px] transition-all duration-300 ${
                gridDensity === "3"
                  ? "bg-femfuel-rose text-white shadow-md scale-105"
                  : "hover:bg-femfuel-light"
              }`}
              title="3 columnas"
              aria-label="Vista de 3 columnas"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDensityChange("4")}
              className={`p-2 min-h-[44px] min-w-[44px] transition-all duration-300 ${
                gridDensity === "4"
                  ? "bg-femfuel-rose text-white shadow-md scale-105"
                  : "hover:bg-femfuel-light"
              }`}
              title="4 columnas (recomendado)"
              aria-label="Vista de 4 columnas (recomendado)"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDensityChange("5")}
              className={`p-2 min-h-[44px] min-w-[44px] transition-all duration-300 ${
                gridDensity === "5"
                  ? "bg-femfuel-rose text-white shadow-md scale-105"
                  : "hover:bg-femfuel-light"
              }`}
              title="5 columnas (compacto)"
              aria-label="Vista de 5 columnas (compacto)"
            >
              <Grip className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Count */}
        <div className="text-sm text-femfuel-medium lg:ml-auto">
          <span className="font-semibold text-femfuel-dark">{products.length}</span> productos
        </div>
      </div>

      {/* Product Grid */}
      <div className={`grid ${getGridClasses()} ${getGapClass()}`}>
        {products.map((product) => (
          <ProductCardEnhanced
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  )
}
