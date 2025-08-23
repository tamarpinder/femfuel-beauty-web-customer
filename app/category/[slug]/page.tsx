"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VendorCard } from "@/components/vendor-card"
import { SearchFiltersComponent, type SearchFilters } from "@/components/search-filters"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getVendorsByCategory } from "@/data/vendors"
import { Vendor } from "@/types/vendor"



// Category display names
const categoryNames = {
  unas: "Uñas",
  maquillaje: "Maquillaje", 
  cuerpo: "Cuerpo",
  spa: "Spa",
  peinados: "Peinados",
  pestañas: "Pestañas"
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = params.slug as string
  
  const [filters, setFilters] = useState<SearchFilters>({
    serviceTypes: [],
    priceRange: [0, 10000],
    distance: "25km",
    rating: 0,
    availability: "anytime",
  })
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([])

  // Filter vendors based on category and filters
  useEffect(() => {
    // Get category vendors first
    const categoryVendors = getVendorsByCategory(categorySlug)
    let filtered = categoryVendors

    // Service type filter - check if vendor offers any matching services
    if (filters.serviceTypes.length > 0) {
      filtered = filtered.filter((vendor) => {
        return filters.serviceTypes.some((type) => 
          vendor.services.some(service => 
            service.name.toLowerCase().includes(type.toLowerCase()) ||
            vendor.popularServices.some(popular => popular.toLowerCase().includes(type.toLowerCase()))
          )
        )
      })
    }

    // Price range filter - check if vendor has services in price range
    filtered = filtered.filter((vendor) => {
      return vendor.priceRange.min <= filters.priceRange[1] && 
             vendor.priceRange.max >= filters.priceRange[0]
    })

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((vendor) => vendor.rating >= filters.rating)
    }

    // Distance filter - simple mock implementation
    if (filters.distance !== "25km") {
      // TODO: Implement actual distance filtering
    }

    // Availability filter
    if (filters.availability === "today") {
      filtered = filtered.filter((vendor) => vendor.availability.todayAvailable)
    }

    setFilteredVendors(filtered)
  }, [filters, categorySlug])

  const handleBack = () => {
    router.push("/")
  }

  const categoryName = categoryNames[categorySlug as keyof typeof categoryNames] || categorySlug
  
  // Handle invalid category slug
  if (!categoryNames[categorySlug as keyof typeof categoryNames]) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">Categoría no encontrada</h1>
          <p className="text-femfuel-medium mb-6">La categoría "{categorySlug}" no existe.</p>
          <Button onClick={() => router.push("/")} className="bg-femfuel-rose hover:bg-[#9f1853] text-white">
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-femfuel-dark">{categoryName}</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
        {/* Filters Sidebar */}
        <div className="md:w-80 flex-shrink-0">
          <SearchFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredVendors.length}
          />
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-femfuel-dark">
                Proveedores de {categoryName}
              </h2>
              <p className="text-sm text-femfuel-medium">{filteredVendors.length} proveedores encontrados</p>
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Ordenar
            </Button>
          </div>

          {/* Results Grid */}
          {filteredVendors.length > 0 ? (
            <>
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} layout="horizontal" />
                ))}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} layout="vertical" />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center">
                <SlidersHorizontal className="h-8 w-8 text-femfuel-medium" />
              </div>
              <h3 className="text-lg font-medium text-femfuel-dark mb-2">No se encontraron proveedores</h3>
              <p className="text-femfuel-medium mb-4">Intenta ajustar tus filtros</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({
                    serviceTypes: [],
                    priceRange: [0, 10000],
                    distance: "25km",
                    rating: 0,
                    availability: "anytime",
                  })
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="search" />
    </div>
  )
}