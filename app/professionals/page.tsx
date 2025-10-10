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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Profesionales Destacados</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Profesionales <span className="text-purple-600">Estrella</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra los mejores profesionales de belleza. Conéctate con expertos de confianza, recomendados y con las mejores reseñas.
          </p>
          
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar profesionales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-femfuel-rose h-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-femfuel-medium">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-600" />
              <span>500+ Profesionales Verificados</span>
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
          {/* Filter Type */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-femfuel-medium" />
              <span className="text-femfuel-dark font-medium">Categoría:</span>
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
                onClick={() => setFilterType("rising")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  filterType === "rising"
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-femfuel-medium hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                }`}
              >
                <Zap className="h-4 w-4" />
                En Ascenso
              </button>
            </div>
          </div>

          {/* Specialty Filter */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-femfuel-dark font-medium">Especialidad:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedSpecialty === specialty
                      ? 'bg-femfuel-rose text-white shadow-lg'
                      : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-gray-200'
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
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-sm text-femfuel-medium whitespace-nowrap mr-2">Ir a:</span>
              {categoryConfig.map((cat) => {
                const vendorsInCategory = groupedProfessionals[cat.key]
                const count = Object.values(vendorsInCategory).reduce((sum, vendor) => sum + vendor.professionals.length, 0)
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

      {/* Professionals List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {!showSections && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
                {filteredProfessionals.length} Profesionales Encontrados
              </h2>
              <p className="text-femfuel-medium">Ordenados por calificación y reseñas</p>
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
                      <h2 className="text-3xl font-bold text-femfuel-dark mb-1">
                        {cat.name}
                      </h2>
                      <p className="text-femfuel-medium">
                        {totalProfessionals} profesionales en {vendorEntries.length} {vendorEntries.length === 1 ? 'salón' : 'salones'}
                      </p>
                    </div>

                    {/* Vendors within category */}
                    {vendorEntries.map(([vendorSlug, vendorData]) => {
                      if (vendorData.professionals.length === 0) return null

                      return (
                        <div key={vendorSlug} className="mb-10">
                          {/* Vendor Header */}
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <h3
                                className="text-xl font-semibold text-femfuel-dark cursor-pointer hover:text-femfuel-rose transition-colors"
                                onClick={() => router.push(`/vendor/${vendorSlug}`)}
                              >
                                {vendorData.vendorName}
                              </h3>
                              <p className="text-sm text-femfuel-medium">
                                {vendorData.professionals.length} {vendorData.professionals.length === 1 ? 'profesional' : 'profesionales'}
                              </p>
                            </div>
                            <button
                              onClick={() => router.push(`/vendor/${vendorSlug}`)}
                              className="text-sm text-femfuel-rose hover:underline"
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
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                No se encontraron profesionales
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
            ¿Eres un Profesional de la Belleza?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y conecta con miles de clientes. Aumenta tus ingresos 
            y haz crecer tu negocio con FemFuel Beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              Conocer Más
            </button>
            <button className="femfuel-button-lg">
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