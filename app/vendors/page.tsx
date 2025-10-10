'use client'

import { useState, useEffect, useRef } from "react"
import { Award, TrendingUp, Filter, Search, Crown, Zap, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { VendorCard } from "@/components/vendor-card"
import { getVendors } from "@/lib/vendors-api"
import { categoryConfig, groupVendorsByCategory, type CategoryKey } from "@/lib/category-utils"
import type { Vendor } from "@/types/vendor"

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all") // all, topRated, new
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
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
    } else if (filterType === "new") {
      filtered = filtered.filter(vendor => vendor.reviewCount < 50)
    }

    // Sort by rating
    filtered.sort((a, b) => b.rating - a.rating)

    setFilteredVendors(filtered)
  }, [vendors, searchTerm, filterType])

  const scrollToSection = (categoryKey: CategoryKey) => {
    const element = sectionRefs.current[categoryKey]
    if (element) {
      const yOffset = -120 // Offset for sticky header
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

  const toggleFavorite = (vendorId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(vendorId)) {
      newFavorites.delete(vendorId)
    } else {
      newFavorites.add(vendorId)
    }
    setFavorites(newFavorites)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Store className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Salones Verificados</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Todos los <span className="text-purple-600">Salones</span>
          </h1>

          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Descubre los mejores salones de belleza en República Dominicana y vive una experiencia única en tu próximo servicio
          </p>

          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar salones, ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-femfuel-rose h-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-femfuel-medium">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-600" />
              <span>{vendors.length}+ Salones Verificados</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span>98% Satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-femfuel-medium" />
            <span className="text-femfuel-dark font-medium">Filtrar por:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filterType === "all"
                  ? 'bg-femfuel-rose text-white shadow-lg'
                  : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType("topRated")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filterType === "topRated"
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white text-femfuel-medium hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
              }`}
            >
              <Crown className="h-4 w-4" />
              Mejor Calificados
            </button>
            <button
              onClick={() => setFilterType("new")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filterType === "new"
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-white text-femfuel-medium hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
              }`}
            >
              <Zap className="h-4 w-4" />
              Nuevos
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Category Navigation - Only show when viewing all */}
      {showSections && (
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-sm text-femfuel-medium whitespace-nowrap mr-2">Ir a:</span>
              {categoryConfig.map((cat) => {
                const count = groupedVendors[cat.key].length
                if (count === 0) return null

                return (
                  <button
                    key={cat.key}
                    onClick={() => scrollToSection(cat.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeSection === cat.key
                        ? 'bg-femfuel-rose text-white shadow-md'
                        : 'bg-gray-100 text-femfuel-dark hover:bg-gray-200'
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

      {/* Vendors List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {!showSections && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
                {filteredVendors.length} Salones Encontrados
              </h2>
              <p className="text-femfuel-medium">Ordenados por calificación y reseñas</p>
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
                      <h2 className="text-3xl font-bold text-femfuel-dark mb-1">
                        {cat.name}
                      </h2>
                      <p className="text-femfuel-medium">{vendors.length} salones disponibles</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {vendors.map((vendor) => (
                        <VendorCard
                          key={vendor.id}
                          vendor={vendor}
                          layout="list"
                          showFavorites={true}
                          showBadges={true}
                          isFavorite={favorites.has(vendor.id)}
                          onToggleFavorite={toggleFavorite}
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
                  layout="list"
                  showFavorites={true}
                  showBadges={true}
                  isFavorite={favorites.has(vendor.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredVendors.length === 0 && (
            <div className="text-center py-16">
              <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                No se encontraron salones
              </h3>
              <p className="text-femfuel-medium">
                Intenta cambiar los filtros o buscar con diferentes términos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-12 w-12 text-purple-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            Tienes un Salón de Belleza?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Únete a FemFuel Beauty y conecta con miles de clientes. Aumenta tus ingresos
            y haz crecer tu negocio con nuestra plataforma líder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              Conocer Más
            </button>
            <button className="femfuel-button-lg">
              Registrar mi Salón
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}
