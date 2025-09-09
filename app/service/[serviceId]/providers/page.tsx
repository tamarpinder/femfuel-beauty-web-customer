"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Clock, Heart, Users, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getAllServices, getVendorsByCategory } from "@/lib/vendors-api"
import type { Vendor } from "@/types/vendor"

interface ServiceWithVendor {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  isPopular?: boolean
  image?: string
  vendor: {
    id: string
    name: string
    slug: string
    logo?: string
    rating: number
    reviewCount: number
    location: {
      address: string
      district: string
      city: string
      distance?: string
    }
    priceRange: {
      min: number
      max: number
    }
  }
}

export default function ServiceProvidersPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.serviceId as string
  
  const [service, setService] = useState<ServiceWithVendor | null>(null)
  const [providers, setProviders] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  useEffect(() => {
    async function loadServiceAndProviders() {
      try {
        setLoading(true)
        
        // Get all services to find the specific service
        const allServices = await getAllServices()
        const targetService = allServices.find(s => s.id === serviceId)
        
        if (!targetService) {
          router.push('/services')
          return
        }
        
        setService(targetService)
        
        // Get all vendors that offer this service category
        const categoryProviders = await getVendorsByCategory(targetService.category)
        
        // Filter vendors that actually offer this specific service
        const serviceProviders = categoryProviders.filter(vendor =>
          vendor.services.some(s => s.name === targetService.name)
        )
        
        setProviders(serviceProviders)
      } catch (error) {
        console.error('Error loading service and providers:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadServiceAndProviders()
  }, [serviceId, router])

  const handleBack = () => {
    router.back()
  }

  const handleProviderSelect = (vendor: Vendor) => {
    router.push(`/vendor/${vendor.slug}?service=${serviceId}`)
  }

  const handleBookNow = (vendor: Vendor) => {
    // Pre-select the service and go to booking
    router.push(`/vendor/${vendor.slug}?service=${serviceId}&action=book`)
  }

  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  const getServiceImages = (serviceName: string, category: string) => {
    const baseImageUrl = `/services/${category}/${serviceName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`
    return [
      `${baseImageUrl}.png`,
      `${baseImageUrl}-process-1.png`,
      `${baseImageUrl}-process-2.png`,
      `${baseImageUrl}-result.png`
    ]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200"></div>
          <div className="h-64 bg-gray-300"></div>
          <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">Servicio no encontrado</h1>
          <Button onClick={() => router.push("/services")} className="bg-femfuel-rose hover:bg-[#9f1853] text-white">
            Volver a Servicios
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-femfuel-dark">{service.name}</h1>
              <p className="text-sm text-femfuel-medium">Encuentra tu especialista perfecto</p>
            </div>
          </div>
        </div>
      </header>

      {/* Service Hero Section */}
      <div className="relative h-64 md:h-80">
        <OptimizedImage
          src={service.image || getServiceImages(service.name, service.category)[0]}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              {service.isPopular && (
                <Badge className="bg-femfuel-rose text-white">Popular</Badge>
              )}
              <Badge variant="secondary" className="bg-white/20 text-white">
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                <span>{service.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">{formatPrice(service.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Service Description */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-femfuel-dark mb-4">Sobre este servicio</h2>
            <p className="text-femfuel-medium leading-relaxed">{service.description}</p>
          </CardContent>
        </Card>

        {/* Providers Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-femfuel-dark">
                Especialistas en {service.name}
              </h2>
              <p className="text-femfuel-medium">
                {providers.length} {providers.length === 1 ? 'especialista encontrado' : 'especialistas encontrados'}
              </p>
            </div>
          </div>

          {providers.length > 0 ? (
            <div className="space-y-4">
              {providers.map((vendor) => {
                const vendorService = vendor.services.find(s => s.name === service.name)
                return (
                  <Card 
                    key={vendor.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedProvider === vendor.id ? 'ring-2 ring-femfuel-rose' : ''
                    }`}
                    onClick={() => setSelectedProvider(vendor.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Vendor Image & Logo */}
                        <div className="relative flex-shrink-0">
                          <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden">
                            <OptimizedImage
                              src={vendor.coverImage || "/vendor-cover-placeholder.png"}
                              alt={vendor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-3 -right-3">
                            <OptimizedImage
                              src={vendor.logo || "/vendor-logo-placeholder.png"}
                              alt={`${vendor.name} logo`}
                              className="w-12 h-12 rounded-full border-3 border-white shadow-lg object-cover"
                            />
                          </div>
                        </div>

                        {/* Vendor Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-femfuel-dark mb-1">
                                {vendor.name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-femfuel-medium">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{vendor.rating}</span>
                                  <span>({vendor.reviewCount} reseñas)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{vendor.location.district}</span>
                                </div>
                              </div>
                            </div>
                            {vendor.badges && vendor.badges.length > 0 && (
                              <div className="flex gap-2">
                                {vendor.badges.map((badge, index) => (
                                  <Badge key={index} variant="secondary">{badge}</Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="text-femfuel-medium mb-4 line-clamp-2">{vendor.description}</p>

                          {/* Service Details for this vendor */}
                          {vendorService && (
                            <div className="bg-femfuel-purple rounded-lg p-4 mb-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-lg font-bold text-femfuel-dark">
                                    {formatPrice(vendorService.price)}
                                  </div>
                                  <div className="text-sm text-femfuel-medium">
                                    {vendorService.duration} minutos
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 text-sm text-green-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{vendor.availability?.nextSlot || "Consultar disponibilidad"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Popular Services */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-femfuel-dark mb-2">Servicios populares:</h4>
                            <div className="flex flex-wrap gap-2">
                              {vendor.popularServices.slice(0, 3).map((service, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-femfuel-dark px-2 py-1 rounded-full text-xs"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleBookNow(vendor)
                              }}
                              className="bg-femfuel-rose hover:bg-[#9f1853] text-white flex-1"
                            >
                              Reservar Ahora
                            </Button>
                            <Button
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleProviderSelect(vendor)
                              }}
                              className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                            >
                              Ver Perfil
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-femfuel-medium" />
              </div>
              <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                No hay especialistas disponibles
              </h3>
              <p className="text-femfuel-medium mb-4">
                No encontramos especialistas para {service.name} en este momento
              </p>
              <Button
                variant="outline"
                onClick={() => router.push('/services')}
              >
                Explorar Otros Servicios
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