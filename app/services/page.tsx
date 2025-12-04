"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Search, Filter, MapPin, Clock, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SmartSearch } from "@/components/smart-search"
import type { SearchSuggestion } from "@/lib/search-utils"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SearchFiltersComponent, type SearchFilters } from "@/components/search-filters"
import { ChatButton } from "@/components/ui/chat-button"
import { UserMenu } from "@/components/user-menu"
import { categories } from "@/data/shared/mock-data"
import { getMarketplaceServices } from "@/lib/vendors-api"
import { formatPrice } from "@/lib/price-utils"

interface MarketplaceService {
  id: string
  slug?: string
  name: string
  description: string
  price: string
  priceRange: {
    min: number
    max: number
  }
  avgDuration: number
  category: string
  isPopular?: boolean
  image?: string
  availableProviders: number
}

export default function ServicesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  
  const [services, setServices] = useState<MarketplaceService[]>([])
  const [filteredServices, setFilteredServices] = useState<MarketplaceService[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || "all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<SearchFilters>({
    serviceTypes: [],
    priceRange: [0, 10000],
    distance: "25km",
    rating: 0,
    availability: "today",
  })

  // Load all services on mount
  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true)
        const marketplaceServices = await getMarketplaceServices()
        setServices(marketplaceServices)
        setFilteredServices(marketplaceServices)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  // Update category when URL parameter changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  // Filter services when category, search, or filters change
  useEffect(() => {
    let filtered = services

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      )
    }

    // Apply service type filter
    if (filters.serviceTypes.length > 0) {
      filtered = filtered.filter(service =>
        filters.serviceTypes.some(type => 
          service.name.toLowerCase().includes(type.toLowerCase()) ||
          service.category.toLowerCase().includes(type.toLowerCase())
        )
      )
    }

    // Apply price range filter
    filtered = filtered.filter(service =>
      service.priceRange.min >= filters.priceRange[0] && service.priceRange.max <= filters.priceRange[1]
    )

    // Rating filter removed since ratings are vendor-specific, not service-specific

    // Sort alphabetically by service name (using Spanish locale for proper ordering)
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'es-ES'))

    setFilteredServices(filtered)
  }, [services, selectedCategory, searchQuery, filters])

  const handleBack = () => {
    router.push('/')
  }

  const handleServiceClick = (service: MarketplaceService) => {
    // Navigate to service providers page using slug or id
    router.push(`/service/${service.slug || service.id}/providers`)
  }

  const handleSmartSearch = (query: string, suggestions: SearchSuggestion[]) => {
    setSearchQuery(query)
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    // Find the service and navigate to it
    const service = filteredServices.find(s => s.id === suggestion.id)
    if (service) {
      handleServiceClick(service)
    }
  }

  const toggleFavorite = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent service click
    const newFavorites = new Set(favorites)
    if (newFavorites.has(serviceId)) {
      newFavorites.delete(serviceId)
    } else {
      newFavorites.add(serviceId)
    }
    setFavorites(newFavorites)
  }


  // Return JSX
  return (
    <div className="min-h-screen bg-white lg:pt-24">
      {/* Mobile Search Bar */}
      <div className="lg:hidden sticky top-14 z-30 bg-white border-b border-gray-200 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-femfuel-medium" />
          <Input
            type="text"
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 h-12 border-2 border-femfuel-rose/20 focus:border-femfuel-rose rounded-xl bg-white shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Filters Sidebar - Desktop with Sticky + Independent Scrolling */}
        <div className="md:w-80 flex-shrink-0">
          <div className="md:sticky md:top-24 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-2 scrollbar-thin scrollbar-thumb-femfuel-rose/20 scrollbar-track-transparent">
            <SearchFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              resultsCount={filteredServices.length}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-femfuel-rose text-white"
                  : "bg-gray-100 text-femfuel-dark hover:bg-gray-200"
              }`}
            >
              Todos ({services.length})
            </button>
            {categories.map((category) => {
              const categoryCount = services.filter(s => s.category === category.id).length
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-femfuel-rose text-white"
                      : "bg-gray-100 text-femfuel-dark hover:bg-gray-200"
                  }`}
                >
                  <span className="text-base">{category.icon}</span>
                  {category.name} ({categoryCount})
                </button>
              )
            })}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
                {selectedCategory === "all" ? "Todos los Servicios" : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-base text-femfuel-medium">
                {filteredServices.length} servicios {searchQuery ? `para "${searchQuery}"` : "disponibles"}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          )}

          {/* Services Grid */}
          {!loading && (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-[0.98] flex flex-col"
                  >
                    {/* Service Image */}
                    <div className="aspect-[3/2] relative overflow-hidden flex-shrink-0">
                      <OptimizedImage
                        src={service.image || "/femfuel-logo.png"}
                        alt={service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500"
                        context={service.category}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Popular Badge */}
                      {service.isPopular && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-femfuel-rose text-white px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </div>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(service.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.has(service.id) 
                              ? "fill-femfuel-rose text-femfuel-rose" 
                              : "text-gray-600"
                          }`} 
                        />
                      </button>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-semibold">
                          {service.price}
                        </div>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="p-3 md:p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-femfuel-dark mb-1 group-hover:text-femfuel-rose transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-femfuel-medium mb-3 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Marketplace Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="inline-flex items-center gap-1 bg-femfuel-rose/10 text-femfuel-rose px-3 py-1 rounded-full text-sm font-medium">
                          <Users className="h-4 w-4" />
                          <span>{service.availableProviders} especialistas disponibles</span>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="flex items-center justify-between text-xs text-femfuel-medium mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{service.avgDuration} min promedio</span>
                        </div>
                        <div className="font-semibold text-black">
                          {service.price}
                        </div>
                      </div>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-1" />

                      {/* Action Button */}
                      <div className="flex items-center">
                        <button
                          className="w-full glassmorphism-button-perfect"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleServiceClick(service)
                          }}
                        >
                          Ver Proveedores
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-femfuel-medium" />
                </div>
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                  No se encontraron servicios
                </h3>
                <p className="text-femfuel-medium mb-4">
                  {searchQuery 
                    ? `No hay servicios que coincidan con "${searchQuery}"`
                    : "No hay servicios en esta categoría"
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Ver Todos los Servicios
                </Button>
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
        unreadCount={3}
      />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="search" />
    </div>
  )
}