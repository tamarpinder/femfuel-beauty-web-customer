'use client'

import { useState, useEffect } from "react"
import { Star, MapPin, Award, TrendingUp, Users, Filter, Search, Crown, Zap, Store, Clock, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getVendors } from "@/lib/vendors-api"
import type { Vendor } from "@/types/vendor"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function VendorsPage() {
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filterType, setFilterType] = useState("all") // all, topRated, new
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories = [
    "all",
    "Hair",
    "Nails",
    "Makeup",
    "Spa",
    "Facial",
    "Lashes",
    "Barbería"
  ]

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

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(vendor =>
        vendor.categories?.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()))
      )
    }

    // Apply type filter
    if (filterType === "topRated") {
      filtered = filtered.filter(vendor => vendor.rating >= 4.5)
    } else if (filterType === "new") {
      // For demo, consider vendors with fewer reviews as "new"
      filtered = filtered.filter(vendor => vendor.reviewCount < 50)
    }

    // Sort by rating
    filtered.sort((a, b) => b.rating - a.rating)

    setFilteredVendors(filtered)
  }, [vendors, searchTerm, selectedCategory, filterType])

  const toggleFavorite = (vendorId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(vendorId)) {
      newFavorites.delete(vendorId)
    } else {
      newFavorites.add(vendorId)
    }
    setFavorites(newFavorites)
  }

  const handleVendorClick = (vendor: Vendor) => {
    router.push(`/vendor/${vendor.slug || vendor.id}`)
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
            Explora los mejores salones de belleza en República Dominicana.
            Encuentra el lugar perfecto para tu próximo servicio de belleza.
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
          {/* Filter Type */}
          <div className="mb-6">
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
                Top Rated
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

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-femfuel-dark font-medium">Categoría:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-femfuel-rose text-white shadow-lg'
                      : 'bg-white text-femfuel-medium hover:bg-rose-50 hover:text-femfuel-rose border border-gray-200'
                  }`}
                >
                  {category === "all" ? "Todas" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendors List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
              {filteredVendors.length} Salones Encontrados
            </h2>
            <p className="text-femfuel-medium">Ordenados por calificación y reseñas</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
                onClick={() => handleVendorClick(vendor)}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {vendor.rating >= 4.5 && (
                    <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Top Rated
                    </div>
                  )}
                  {vendor.reviewCount < 50 && (
                    <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Nuevo
                    </div>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(vendor.id)
                  }}
                  className="absolute top-4 left-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.has(vendor.id)
                        ? "fill-femfuel-rose text-femfuel-rose"
                        : "text-gray-600"
                    }`}
                  />
                </button>

                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0">
                      {vendor.logo ? (
                        <Image
                          src={vendor.logo}
                          alt={vendor.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center">
                          <Store className="h-8 w-8 text-purple-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                          {vendor.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.location.district}, {vendor.location.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-femfuel-dark">{vendor.rating}</span>
                          <span className="text-sm text-femfuel-medium">({vendor.reviewCount} reseñas)</span>
                        </div>
                        <div className="text-sm text-femfuel-medium">
                          {vendor.serviceCount} servicios
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {vendor.categories?.slice(0, 3).map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                        {vendor.categories && vendor.categories.length > 3 && (
                          <span className="text-xs text-femfuel-medium">
                            +{vendor.categories.length - 3} más
                          </span>
                        )}
                      </div>

                      {vendor.businessHours && (
                        <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-4">
                          <Clock className="h-4 w-4" />
                          <span>
                            {vendor.businessHours.monday?.open || "9:00"} - {vendor.businessHours.monday?.close || "18:00"}
                          </span>
                        </div>
                      )}

                      <p className="text-sm text-femfuel-medium mb-4 line-clamp-2">
                        {vendor.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          className="glassmorphism-button flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVendorClick(vendor)
                          }}
                        >
                          Ver Salón
                        </button>
                        <button
                          className="femfuel-button-lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            // TODO: Implement contact
                          }}
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
            ¿Tienes un Salón de Belleza?
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