"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ServiceCard, type MarketplaceService } from "@/components/service-card"
import { SearchFiltersComponent, type SearchFilters } from "@/components/search-filters"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getVendors, searchVendors, searchServices, getAllServices } from "@/lib/vendors-api"
import { Vendor } from "@/types/vendor"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchInput, setSearchInput] = useState(initialQuery)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({
    serviceTypes: [],
    priceRange: [0, 10000],
    distance: "25km",
    rating: 0,
    availability: "anytime",
  })
  const [filteredServices, setFilteredServices] = useState<MarketplaceService[]>([])

  // Handle search input with debouncing
  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    // Set new timeout for debounced search with longer delay for smoother typing
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value)
    }, 10)
  }, [])

  // Filter services based on search query and filters
  useEffect(() => {
    async function loadServices() {
      try {
        let allServices: MarketplaceService[] = []
        
        // Search services directly based on query
        if (searchQuery.trim()) {
          const searchResults = await searchServices(searchQuery)
          allServices = searchResults.map(service => ({
            id: service.id,
            name: service.name,
            price: typeof service.price === 'number' 
              ? `RD$${service.price.toLocaleString()}`
              : service.price,
            duration: typeof service.duration === 'number'
              ? `${service.duration} min`
              : service.duration || "30 min",
            rating: service.vendor?.rating || 4.5,
            reviewCount: service.vendor?.reviewCount || 0,
            image: service.image || service.vendor?.logo,
            category: service.category,
            description: service.description,
            isPopular: service.isPopular,
            addons: service.addons || [],
            availableProviders: service.availableProviders || 1,
            featuredProvider: service.vendor ? {
              id: service.vendor.id,
              name: service.vendor.name,
              isSponsored: false
            } : service.featuredProvider
          }))
        } else {
          // Get all services when no search query
          const allServicesData = await getAllServices()
          allServices = allServicesData.map(service => ({
            id: service.id,
            name: service.name,
            price: typeof service.price === 'number' 
              ? `RD$${service.price.toLocaleString()}`
              : service.price,
            duration: typeof service.duration === 'number'
              ? `${service.duration} min`
              : service.duration || "30 min",
            rating: service.vendor?.rating || 4.5,
            reviewCount: service.vendor?.reviewCount || 0,
            image: service.image || service.vendor?.logo,
            category: service.category,
            description: service.description,
            isPopular: service.isPopular,
            addons: service.addons || [],
            availableProviders: service.availableProviders || 1,
            featuredProvider: service.vendor ? {
              id: service.vendor.id,
              name: service.vendor.name,
              isSponsored: false
            } : service.featuredProvider
          }))
        }

        // Apply filters
        let filtered = allServices

        // Service type filter
        if (filters.serviceTypes.length > 0) {
          filtered = filtered.filter((service) => {
            return filters.serviceTypes.some((type) => 
              service.name.toLowerCase().includes(type.toLowerCase()) ||
              service.category?.toLowerCase().includes(type.toLowerCase())
            )
          })
        }

        // Price range filter
        filtered = filtered.filter((service) => {
          const price = typeof service.price === 'string' 
            ? Number.parseInt(service.price.replace(/[^\d]/g, ""))
            : service.price
          return price >= filters.priceRange[0] && price <= filters.priceRange[1]
        })

        // Rating filter
        if (filters.rating > 0) {
          filtered = filtered.filter((service) => service.rating >= filters.rating)
        }

        setFilteredServices(filtered)
      } catch (error) {
        setFilteredServices([])
      }
    }

    loadServices()
  }, [searchQuery, filters])

  const handleBookService = (serviceId: string) => {
    // TODO: Implement booking flow
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 lg:pt-24">{/* Search page content relies on SmartHeader from layout */}

      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Filters Sidebar */}
        <div className="md:w-80 flex-shrink-0">
          <SearchFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredServices.length}
          />
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-2">
                {searchQuery ? `Resultados para "${searchQuery}"` : "Resultados de Búsqueda"}
              </h2>
              <p className="text-sm md:text-base text-femfuel-medium">{filteredServices.length} servicios encontrados</p>
              {!searchQuery && (
                <p className="text-xs md:text-sm text-femfuel-medium mt-1">
                  Prueba buscar por servicio o usar <button
                    onClick={() => window.location.href = '/services'}
                    className="text-femfuel-rose font-semibold hover:underline transition-all duration-300"
                  >
                    navegación por categorías
                  </button>
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-white border-2 border-femfuel-rose/20 hover:bg-femfuel-light hover:border-femfuel-rose transition-all duration-300">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Ordenar
            </Button>
          </div>

          {/* Results Grid */}
          {filteredServices.length > 0 ? (
            <>
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} layout="horizontal" onBook={handleBookService} />
                ))}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} layout="vertical" onBook={handleBookService} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 px-4">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-femfuel-light rounded-full mb-6 shadow-lg">
                <SlidersHorizontal className="h-10 w-10 text-femfuel-medium" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">No se encontraron servicios</h3>
              <p className="text-base md:text-lg text-femfuel-medium mb-6 max-w-md mx-auto">Intenta ajustar tus filtros o buscar algo diferente</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchInput("")
                  setSearchQuery("")
                  setFilters({
                    serviceTypes: [],
                    priceRange: [0, 10000],
                    distance: "25km",
                    rating: 0,
                    availability: "anytime",
                  })
                }}
                className="bg-white border-2 border-femfuel-rose text-femfuel-rose hover:bg-femfuel-light font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                Limpiar Búsqueda
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
