"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard, type Service } from "@/components/service-card"
import { SearchFiltersComponent, type SearchFilters } from "@/components/search-filters"
import { MobileNavigation } from "@/components/mobile-navigation"


// Mock data with category associations
const mockServices: Service[] = [
  {
    id: 1,
    name: "Manicure Gel Premium",
    vendor: "Beauty Studio RD",
    price: "RD$1,200",
    rating: 4.8,
    reviews: 124,
    duration: 60,
    image: "/premium-gel-manicure.png",
    category: "unas"
  },
  {
    id: 2,
    name: "Maquillaje Profesional",
    vendor: "Glamour House",
    price: "RD$2,500",
    rating: 4.9,
    reviews: 89,
    duration: 90,
    image: "/professional-makeup-artist.png",
    category: "maquillaje"
  },
  {
    id: 3,
    name: "Tratamiento Facial Hidratante",
    vendor: "Spa Paradise",
    price: "RD$3,500",
    rating: 4.7,
    reviews: 156,
    duration: 75,
    image: "/facial-treatment-spa.png",
    category: "spa"
  },
  {
    id: 4,
    name: "Pedicure Spa Completo",
    vendor: "Relax Nails",
    price: "RD$1,800",
    rating: 4.6,
    reviews: 98,
    duration: 90,
    category: "unas"
  },
  {
    id: 5,
    name: "Extensiones de Pestañas",
    vendor: "Lash Studio DR",
    price: "RD$2,200",
    rating: 4.9,
    reviews: 67,
    duration: 120,
    category: "pestañas"
  },
  {
    id: 6,
    name: "Corte y Peinado",
    vendor: "Hair Salon Elite",
    price: "RD$1,500",
    rating: 4.5,
    reviews: 203,
    duration: 60,
    category: "peinados"
  },
  {
    id: 7,
    name: "Masaje Relajante",
    vendor: "Wellness Center",
    price: "RD$2,800",
    rating: 4.7,
    reviews: 78,
    duration: 120,
    category: "cuerpo"
  },
  {
    id: 8,
    name: "Maquillaje de Novia",
    vendor: "Bridal Beauty",
    price: "RD$4,500",
    rating: 4.9,
    reviews: 45,
    duration: 180,
    category: "maquillaje"
  }
]

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
  const [filteredServices, setFilteredServices] = useState<Service[]>([])

  // Filter services based on category and filters
  useEffect(() => {
    // Get category services first
    const categoryServices = mockServices.filter(service => service.category === categorySlug)
    let filtered = categoryServices

    // Service type filter
    if (filters.serviceTypes.length > 0) {
      filtered = filtered.filter((service) => {
        return filters.serviceTypes.some((type) => service.name.toLowerCase().includes(type.toLowerCase()))
      })
    }

    // Price range filter
    filtered = filtered.filter((service) => {
      const price = Number.parseInt(service.price.replace(/[^\d]/g, ""))
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((service) => service.rating >= filters.rating)
    }

    setFilteredServices(filtered)
  }, [filters, categorySlug])

  const handleBookService = (serviceId: number) => {
    console.log("Book service:", serviceId)
    // TODO: Implement booking flow
  }

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
            resultsCount={filteredServices.length}
          />
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-femfuel-dark">
                Servicios de {categoryName}
              </h2>
              <p className="text-sm text-femfuel-medium">{filteredServices.length} servicios encontrados</p>
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
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
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center">
                <SlidersHorizontal className="h-8 w-8 text-femfuel-medium" />
              </div>
              <h3 className="text-lg font-medium text-femfuel-dark mb-2">No se encontraron servicios</h3>
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