'use client'

import { useState, useEffect, useRef } from "react"
import { Award, TrendingUp, Users, Filter, Search, Crown, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProfessionalCard } from "@/components/professional-card"
import { getAllProfessionals, ProfessionalWithVendor } from "@/lib/getAllProfessionals"
import { groupProfessionalsByVendorWithinCategory } from "@/lib/professional-utils"
import { categoryConfig, type CategoryKey } from "@/lib/category-utils"
import { useRouter } from "next/navigation"

const allProfessionals = getAllProfessionals()

export default function TopProfessionalsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [filterType, setFilterType] = useState("all") // all, topRated, rising
  const [activeSection, setActiveSection] = useState<CategoryKey | null>(null)

  const sectionRefs = useRef<{ [key in CategoryKey]?: HTMLElement | null }>({})
  
  const specialties = [
    "all",
    "Manicure",
    "Pedicure",
    "Maquillaje",
    "Corte",
    "Color",
    "Tratamientos Faciales",
    "Pestañas",
    "Spa"
  ]

  const filteredProfessionals = allProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSpecialty = selectedSpecialty === "all" ||
                            professional.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()))

    const matchesFilter = filterType === "all" ||
                         (filterType === "topRated" && professional.isTopRated) ||
                         (filterType === "rising" && professional.rating >= 4.8)

    return matchesSearch && matchesSpecialty && matchesFilter
  })

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
  }, [filteredProfessionals])

  const handleContact = (professional: ProfessionalWithVendor) => {
    // TODO: Implement contact functionality
  }

  // Group professionals for section view
  const groupedProfessionals = groupProfessionalsByVendorWithinCategory(filteredProfessionals)
  const showSections = filterType === "all" && !searchTerm && selectedSpecialty === "all"

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-purple-500/20 px-4 py-2 rounded-full mb-6 shadow-md">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-bold text-sm">Profesionales Destacados</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Profesionales <span className="bg-gradient-to-r from-purple-600 to-femfuel-rose bg-clip-text text-transparent">Estrella</span>
          </h1>

          <p className="text-base md:text-lg text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra los mejores profesionales de belleza. Conéctate con expertos de confianza, recomendados y con las mejores reseñas.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-femfuel-medium" />
              <Input
                type="text"
                placeholder="Buscar profesionales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 border-2 border-femfuel-rose/20 focus:border-femfuel-rose h-14 rounded-2xl shadow-lg text-base bg-white/80 backdrop-blur-md transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-amber-600/20 shadow-md">
              <Crown className="h-4 w-4 text-amber-600" />
              <span className="font-bold text-femfuel-dark">500+ Profesionales Verificados</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-purple-600/20 shadow-md">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="font-bold text-femfuel-dark">98% Satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-gradient-to-r from-femfuel-light/50 to-purple-50/30">
        <div className="max-w-6xl mx-auto">
          {/* Filter Type */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="h-5 w-5 text-femfuel-dark" />
              <span className="text-femfuel-dark font-bold text-lg">Categoría:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterType("all")}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
                  filterType === "all"
                    ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-femfuel-rose/20 hover:shadow-md'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType("topRated")}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 active:scale-95 ${
                  filterType === "topRated"
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white text-femfuel-medium hover:bg-amber-50 hover:text-amber-600 border border-amber-500/20 hover:shadow-md'
                }`}
              >
                <Crown className="h-4 w-4" />
                Mejor Calificados
              </button>
              <button
                onClick={() => setFilterType("rising")}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 active:scale-95 ${
                  filterType === "rising"
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white text-femfuel-medium hover:bg-purple-50 hover:text-purple-600 border border-purple-500/20 hover:shadow-md'
                }`}
              >
                <Zap className="h-4 w-4" />
                En Ascenso
              </button>
            </div>
          </div>

          {/* Specialty Filter */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-femfuel-dark font-bold text-lg">Especialidad:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
                    selectedSpecialty === specialty
                      ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-femfuel-rose/20 hover:shadow-md'
                  }`}
                >
                  {specialty === "all" ? "Todas" : specialty}
                </button>
              ))}
            </div>
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
                const vendorsInCategory = groupedProfessionals[cat.key]
                const count = Object.values(vendorsInCategory).reduce((sum, vendor) => sum + vendor.professionals.length, 0)
                if (count === 0) return null

                return (
                  <button
                    key={cat.key}
                    onClick={() => scrollToSection(cat.key)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                      activeSection === cat.key
                        ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105'
                        : 'bg-white border border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light hover:shadow-md'
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

      {/* Professionals List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {!showSections && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-3">
                {filteredProfessionals.length} Profesionales Encontrados
              </h2>
              <p className="text-base md:text-lg text-femfuel-medium">Ordenados por calificación y reseñas</p>
            </div>
          )}

          {showSections ? (
            // Render sections when viewing all
            <>
              {categoryConfig.map((cat) => {
                const vendorsInCategory = groupedProfessionals[cat.key]
                const vendorEntries = Object.entries(vendorsInCategory)

                // Skip if no vendors in this category
                if (vendorEntries.length === 0) return null

                // Calculate total professionals in this category
                const totalProfessionals = vendorEntries.reduce(
                  (sum, [_, vendor]) => sum + vendor.professionals.length,
                  0
                )

                if (totalProfessionals === 0) return null

                return (
                  <div
                    key={cat.key}
                    ref={el => { sectionRefs.current[cat.key] = el }}
                    data-category={cat.key}
                    className="mb-16"
                  >
                    {/* Category Header */}
                    <div className="mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-3">
                        {cat.name}
                      </h2>
                      <p className="text-base md:text-lg text-femfuel-medium">
                        {totalProfessionals} profesionales en {vendorEntries.length} {vendorEntries.length === 1 ? 'salón' : 'salones'}
                      </p>
                    </div>

                    {/* Vendors within category */}
                    {vendorEntries.map(([vendorSlug, vendorData]) => {
                      if (vendorData.professionals.length === 0) return null

                      return (
                        <div key={vendorSlug} className="mb-10">
                          {/* Vendor Header */}
                          <div className="mb-6 flex items-center justify-between">
                            <div>
                              <h3
                                className="text-xl md:text-2xl font-bold text-femfuel-dark cursor-pointer hover:text-femfuel-rose transition-colors"
                                onClick={() => router.push(`/vendor/${vendorSlug}`)}
                              >
                                {vendorData.vendorName}
                              </h3>
                              <p className="text-sm md:text-base text-femfuel-medium mt-1">
                                {vendorData.professionals.length} {vendorData.professionals.length === 1 ? 'profesional' : 'profesionales'}
                              </p>
                            </div>
                            <button
                              onClick={() => router.push(`/vendor/${vendorSlug}`)}
                              className="text-sm md:text-base font-semibold text-femfuel-rose hover:text-pink-600 hover:underline transition-all duration-300"
                            >
                              Ver salón →
                            </button>
                          </div>

                          {/* Professionals from this vendor */}
                          <div className="grid lg:grid-cols-2 gap-6">
                            {vendorData.professionals.map((professional) => (
                              <ProfessionalCard
                                key={professional.id}
                                professional={professional}
                                layout="list"
                                showBadges={true}
                                onContact={handleContact}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </>
          ) : (
            // Render flat list when filtering
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  layout="list"
                  showBadges={true}
                  onContact={handleContact}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProfessionals.length === 0 && (
            <div className="text-center py-20 px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-femfuel-light rounded-full mb-6">
                <Users className="h-10 w-10 text-femfuel-medium" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">
                No se encontraron profesionales
              </h3>
              <p className="text-base md:text-lg text-femfuel-medium max-w-md mx-auto">
                Intenta cambiar los filtros o buscar con diferentes términos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-femfuel-light to-purple-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
            ¿Eres un Profesional de la Belleza?
          </h2>
          <p className="text-base md:text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Únete a nuestra plataforma y conecta con miles de clientes. Aumenta tus ingresos
            y haz crecer tu negocio con FemFuel Beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-femfuel-rose text-femfuel-rose rounded-full font-semibold text-lg hover:bg-femfuel-light hover:shadow-xl active:scale-95 transition-all duration-300">
              Conocer Más
            </button>
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300">
              Unirse como Profesional
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}