'use client'

import { useState } from "react"
import { Star, MapPin, Award, TrendingUp, Users, Filter, Search, Crown, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getAllProfessionals, ProfessionalWithVendor } from "@/lib/getAllProfessionals"
import Image from "next/image"
import { useRouter } from "next/navigation"

const allProfessionals = getAllProfessionals()

export default function TopProfessionalsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [filterType, setFilterType] = useState("all") // all, topRated, rising
  
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

  const handleViewProfile = (professional: ProfessionalWithVendor) => {
    // Convert professional name to slug format
    const slug = professional.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    router.push(`/professional/${slug}`)
  }

  const handleContact = (professional: ProfessionalWithVendor) => {
    // TODO: Implement contact functionality
  }

  const handleVendorClick = (vendorSlug: string) => {
    router.push(`/vendor/${vendorSlug}`)
  }

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
                Top Rated
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

      {/* Professionals List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
              {filteredProfessionals.length} Profesionales Encontrados
            </h2>
            <p className="text-femfuel-medium">Ordenados por calificación y reseñas</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {professional.isTopRated && (
                    <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Top Rated
                    </div>
                  )}
                  {professional.rating >= 4.8 && !professional.isTopRated && (
                    <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      En Ascenso
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0">
                      {professional.image ? (
                        <Image
                          src={professional.image}
                          alt={professional.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-600">
                            {professional.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                          {professional.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVendorClick(professional.vendor.slug)
                          }}
                          className="text-purple-600 hover:text-purple-800 font-medium text-sm underline transition-colors cursor-pointer text-left"
                        >
                          {professional.vendor.name}
                        </button>
                        <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                          <MapPin className="h-4 w-4" />
                          <span>{professional.vendor.location.district}, {professional.vendor.location.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-femfuel-dark">{professional.rating}</span>
                          <span className="text-sm text-femfuel-medium">({professional.reviewCount} reseñas)</span>
                        </div>
                        <div className="text-sm text-femfuel-medium">
                          🏆 {professional.yearsExperience} años
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {professional.specialties.slice(0, 3).map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {professional.specialties.length > 3 && (
                          <span className="text-xs text-femfuel-medium">
                            +{professional.specialties.length - 3} más
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-femfuel-medium mb-4">
                        <div>
                          <span className="block font-medium text-femfuel-dark">Servicios mensuales</span>
                          <span>{professional.monthlyBookings}</span>
                        </div>
                        <div>
                          <span className="block font-medium text-femfuel-dark">Próxima cita</span>
                          <span>{professional.nextAvailable || 'Consultar'}</span>
                        </div>
                      </div>

                      {professional.bio && (
                        <div className="text-sm text-femfuel-medium mb-4">
                          <span className="font-medium text-femfuel-dark">Bio: </span>
                          <span className="text-black">{professional.bio.length > 80 ? professional.bio.substring(0, 80) + '...' : professional.bio}</span>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewProfile(professional)}
                          className="glassmorphism-button flex-1"
                        >
                          Ver Perfil
                        </button>
                        <button
                          onClick={() => handleContact(professional)}
                          className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                        >
                          Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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