'use client'

import { useState, useEffect, useRef } from "react"
import { MapPin, Award, TrendingUp, Filter, Search, Crown, Zap, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { VendorCard } from "@/components/vendor-card"
import { getVendors } from "@/lib/vendors-api"
import { categoryConfig, groupVendorsByCategory, type CategoryKey } from "@/lib/category-utils"
import type { Vendor } from "@/types/vendor"

export default function NearbySalonsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all") // all, topRated, openNow
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<CategoryKey | null>(null)

  const sectionRefs = useRef<{ [key in CategoryKey]?: HTMLElement | null }>({})

  useEffect(() => {
    async function loadVendors() {
      try {
        const allVendors = await getVendors()
        setVendors(allVendors)
        setFilteredVendors(allVendors)
      } catch (error) {
        console.error("Error loading vendors:", error)
      } finally {
        setLoading(false)
      }
    }
    loadVendors()
  }, [])

  useEffect(() => {
    let filtered = vendors

    // Apply search filter
    const searchLower = searchTerm.toLowerCase()
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchLower) ||
        vendor.description.toLowerCase().includes(searchLower) ||
        vendor.location.district.toLowerCase().includes(searchLower) ||
        vendor.location.city.toLowerCase().includes(searchLower) ||
        vendor.categories?.some(cat => cat.toLowerCase().includes(searchLower))
      )
    }

    // Apply type filter
    if (filterType === "topRated") {
      filtered = filtered.filter(vendor => vendor.rating >= 4.5)
    } else if (filterType === "openNow") {
      filtered = filtered.filter(vendor => vendor.availability.isOpen)
    }

    // Sort by distance (using location.distance if available, otherwise by rating)
    filtered.sort((a, b) => b.rating - a.rating)

    setFilteredVendors(filtered)
  }, [vendors, searchTerm, filterType])

  const scrollToSection = (categoryKey: CategoryKey) => {
    const element = sectionRefs.current[categoryKey]
    if (element) {
      const yOffset = -120
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Intersection observer for active section tracking
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-120px 0px -70% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const categoryKey = entry.target.getAttribute('data-category') as CategoryKey
          if (categoryKey) {
            setActiveSection(categoryKey)
          }
        }
      })
    }, options)

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredVendors])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-purple-50/20">
        <div className="max-w-6xl mx-auto px-4 py-32">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const groupedVendors = groupVendorsByCategory(filteredVendors)
  const showSections = filterType === "all" && !searchTerm

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-purple-50/20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-purple-500/5 to-orange-500/5"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-rose-500/20 px-4 py-2 rounded-full mb-6 shadow-md">
            <MapPin className="h-4 w-4 text-rose-600" />
            <span className="text-rose-600 font-bold text-sm">Salones Cercanos</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Salones <span className="bg-gradient-to-r from-rose-600 to-femfuel-rose bg-clip-text text-transparent">Cercanos</span>
          </h1>

          <p className="text-base md:text-lg text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra tu salón de belleza ideal en segundos. Reserva fácil y accede a expertos verificados en tu área.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-femfuel-medium" />
              <Input
                type="text"
                placeholder="Buscar salones o servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 border-2 border-femfuel-rose/20 focus:border-femfuel-rose h-14 rounded-2xl shadow-lg text-base bg-white/80 backdrop-blur-md transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-green-600/20 shadow-md">
              <Navigation className="h-4 w-4 text-green-600" />
              <span className="font-bold text-femfuel-dark">Santo Domingo</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-rose-600/20 shadow-md">
              <TrendingUp className="h-4 w-4 text-rose-600" />
              <span className="font-bold text-femfuel-dark">{vendors.length}+ Salones</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-gradient-to-r from-femfuel-light/50 to-rose-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="h-5 w-5 text-femfuel-dark" />
            <span className="text-femfuel-dark font-bold text-lg">Filtrar por:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                filterType === "all"
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-femfuel-rose/20 hover:shadow-md hover:scale-105'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType("topRated")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                filterType === "topRated"
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-white text-femfuel-medium hover:bg-amber-50 hover:text-amber-600 border border-amber-500/20 hover:shadow-md hover:scale-105'
              }`}
            >
              <Crown className="h-4 w-4" />
              Mejor Calificados
            </button>
            <button
              onClick={() => setFilterType("openNow")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                filterType === "openNow"
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-white text-femfuel-medium hover:bg-green-50 hover:text-green-600 border border-green-500/20 hover:shadow-md hover:scale-105'
              }`}
            >
              <Zap className="h-4 w-4" />
              Abiertos Ahora
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Category Navigation - Only show when viewing all */}
      {showSections && (
        <div className="sticky top-20 md:top-24 z-40 bg-white/95 backdrop-blur-lg border-b border-femfuel-rose/10 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-sm text-femfuel-dark font-bold whitespace-nowrap mr-2">Ir a:</span>
              {categoryConfig.map((cat) => {
                const count = groupedVendors[cat.key].length
                if (count === 0) return null

                return (
                  <button
                    key={cat.key}
                    onClick={() => scrollToSection(cat.key)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      activeSection === cat.key
                        ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white border border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light hover:scale-105 hover:shadow-md'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Salons List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {!showSections && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-3">
                {filteredVendors.length} Salones Encontrados
              </h2>
              <p className="text-base md:text-lg text-femfuel-medium">Ordenados por distancia</p>
            </div>
          )}

          {showSections ? (
            // Render sections when viewing all
            <>
              {categoryConfig.map((cat) => {
                const vendors = groupedVendors[cat.key]
                if (vendors.length === 0) return null

                return (
                  <div
                    key={cat.key}
                    ref={el => { sectionRefs.current[cat.key] = el }}
                    data-category={cat.key}
                    className="mb-16"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-3">
                        {cat.name}
                      </h2>
                      <p className="text-base md:text-lg text-femfuel-medium">{vendors.length} salones disponibles</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {vendors.map((vendor) => (
                        <VendorCard
                          key={vendor.id}
                          vendor={vendor}
                          layout="nearby"
                          showDistance={true}
                          showOpenStatus={true}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            // Render flat list when filtering
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  layout="nearby"
                  showDistance={true}
                  showOpenStatus={true}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredVendors.length === 0 && (
            <div className="text-center py-20 px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-femfuel-light rounded-full mb-6">
                <MapPin className="h-10 w-10 text-femfuel-medium" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">
                No se encontraron salones
              </h3>
              <p className="text-base md:text-lg text-femfuel-medium max-w-md mx-auto">
                Intenta cambiar los filtros o buscar con diferentes términos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-femfuel-light to-rose-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-femfuel-rose to-pink-600 rounded-full mb-6 shadow-lg">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
            ¿No encuentras tu salón favorito?
          </h2>
          <p className="text-base md:text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Ayúdanos a crecer nuestra comunidad. Invita a tu salón favorito a unirse a FemFuel Beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-femfuel-rose text-femfuel-rose rounded-full font-semibold text-lg hover:bg-femfuel-light hover:shadow-xl hover:scale-105 transition-all duration-300">
              Sugerir un Salón
            </button>
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Explorar Más Zonas
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}
