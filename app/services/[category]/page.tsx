"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Filter, MapPin, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getVendorsByCategory } from "@/lib/vendors-api"
import { categories } from "@/data/shared/mock-data"

interface Vendor {
  id: string
  name: string
  slug: string
  logo: string
  coverImage: string
  description: string
  rating: number
  reviewCount: number
  location: {
    district: string
    distance: string
  }
  popularServices: string[]
  priceRange: {
    min: number
    max: number
  }
  availability: {
    isOpen: boolean
    nextSlot: string
  }
}

export default function CategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.category as string

  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  
  // Find current category
  const currentCategory = categories.find(c => c.id === categoryId)

  useEffect(() => {
    async function loadVendors() {
      try {
        setLoading(true)
        const vendorData = await getVendorsByCategory(categoryId)
        setVendors(vendorData)
      } catch (error) {
        console.error('Error loading vendors:', error)
        setVendors([])
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      loadVendors()
    }
  }, [categoryId])

  const handleVendorSelect = (vendor: Vendor) => {
    router.push(`/vendor/${vendor.slug}`)
  }

  const handleBack = () => {
    router.push('/services')
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-femfuel-dark mb-2">Categoría no encontrada</h2>
          <Button onClick={handleBack}>Volver a Servicios</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentCategory.icon}</span>
              <div>
                <h1 className="text-lg font-semibold text-femfuel-dark">{currentCategory.name}</h1>
                <p className="text-sm text-femfuel-medium">{currentCategory.description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-femfuel-dark">
                  Salones de {currentCategory.name}
                </h2>
                <p className="text-sm text-femfuel-medium">
                  {vendors.length} salones especializados encontrados
                </p>
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Vendors Grid */}
            {vendors.length > 0 ? (
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    onClick={() => handleVendorSelect(vendor)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.01]"
                  >
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-72 aspect-[16/10] md:aspect-square relative overflow-hidden">
                        <OptimizedImage
                          src={vendor.coverImage}
                          alt={vendor.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 288px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
                            <OptimizedImage
                              src={vendor.logo}
                              alt={`${vendor.name} logo`}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        {vendor.availability.isOpen && (
                          <div className="absolute bottom-3 left-3">
                            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Abierto ahora
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold text-femfuel-dark group-hover:text-femfuel-rose transition-colors mb-1">
                            {vendor.name}
                          </h3>
                          <p className="text-sm text-femfuel-medium line-clamp-2">
                            {vendor.description}
                          </p>
                        </div>

                        {/* Rating & Location */}
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{vendor.rating}</span>
                            <span className="text-femfuel-medium">({vendor.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-femfuel-medium">
                            <MapPin className="h-4 w-4" />
                            <span>{vendor.location.district}</span>
                            <span>•</span>
                            <span>{vendor.location.distance}</span>
                          </div>
                        </div>

                        {/* Popular Services */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {vendor.popularServices.slice(0, 3).map((service, index) => (
                              <span
                                key={index}
                                className="bg-femfuel-purple text-femfuel-dark px-2 py-1 rounded-full text-xs"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price Range & Availability */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-femfuel-medium">Desde </span>
                            <span className="font-semibold text-femfuel-dark">
                              RD${vendor.priceRange.min.toLocaleString()}
                            </span>
                          </div>
                          {vendor.availability.isOpen && (
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>{vendor.availability.nextSlot}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center text-2xl">
                  {currentCategory.icon}
                </div>
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                  No se encontraron salones
                </h3>
                <p className="text-femfuel-medium mb-4">
                  No hay salones especializados en {currentCategory.name.toLowerCase()} disponibles en este momento
                </p>
                <Button onClick={handleBack}>
                  Explorar Otras Categorías
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="search" />
    </div>
  )
}