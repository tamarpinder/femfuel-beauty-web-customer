"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Clock, Heart, Users, Calendar, ChevronRight, Sparkles, Shield, TrendingUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ChatButton } from "@/components/ui/chat-button"
import { UserFlowHeader } from "@/components/user-flow-header"
import { getAllServices, getVendorsByCategory } from "@/lib/vendors-api"
import { getServiceImage, getServiceCategoryCover } from "@/lib/image-mappings"
import type { Vendor } from "@/types/vendor"

interface ServiceWithVendor {
  id: string
  slug?: string
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
  const [imageLoading, setImageLoading] = useState(true)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  // Preload critical images as soon as we have the serviceId
  useEffect(() => {
    const preloadCriticalImages = async () => {
      // Preload common category covers immediately
      const commonCovers = [
        '/services/covers/hair-services-hero.png',
        '/services/covers/nail-services-hero.png',
        '/services/covers/makeup-services-hero.png',
        '/services/covers/spa-services-hero.png',
        '/services/covers/lash-services-hero.png',
        '/services/covers/beauty-services-hero.png'
      ]
      
      const preloadPromises = commonCovers.map(src => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, src]))
            resolve(src)
          }
          img.onerror = () => resolve(src) // Still resolve to continue
          img.src = src
        })
      })
      
      await Promise.allSettled(preloadPromises)
    }
    
    preloadCriticalImages()
  }, [])

  useEffect(() => {
    async function loadServiceAndProviders() {
      try {
        setLoading(true)
        
        // Get all services to find the specific service by slug or ID
        const allServices = await getAllServices()
        const targetService = allServices.find(s => s.slug === serviceId || s.id === serviceId)
        
        if (!targetService) {
          router.push('/services')
          return
        }
        
        setService(targetService)
        
        // Start loading vendors in parallel
        const vendorPromise = getVendorsByCategory(targetService.category)
        
        // Preload the specific service cover image
        const serviceCoverSrc = getServiceCategoryCover(targetService.category)
        if (!preloadedImages.has(serviceCoverSrc)) {
          const img = new Image()
          img.onload = () => setImageLoading(false)
          img.onerror = () => setImageLoading(false)
          img.src = serviceCoverSrc
        } else {
          setImageLoading(false)
        }
        
        // Wait for vendors
        const categoryProviders = await vendorPromise
        
        // Filter vendors that actually offer this specific service
        const serviceProviders = categoryProviders.filter(vendor =>
          vendor.services.some(s => s.name === targetService.name)
        )
        
        setProviders(serviceProviders)
        
        // Preload vendor images in background
        serviceProviders.forEach(vendor => {
          if (vendor.coverImage) {
            const img = new Image()
            img.src = vendor.coverImage
          }
          if (vendor.logo) {
            const logoImg = new Image()
            logoImg.src = vendor.logo
          }
        })
        
      } catch (error) {
        console.error('Error loading service and providers:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadServiceAndProviders()
  }, [serviceId, router, preloadedImages])

  const handleBack = () => {
    router.back()
  }

  const handleProviderSelect = (vendor: Vendor) => {
    router.push(`/vendor/${vendor.slug}?service=${service?.slug || serviceId}`)
  }

  const handleBookNow = (vendor: Vendor) => {
    // Pre-select the service and go to booking
    router.push(`/vendor/${vendor.slug}?service=${service?.slug || serviceId}&action=book`)
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
    <div className="min-h-screen bg-gradient-to-br from-white via-femfuel-purple to-white">
      {/* Header */}
      <UserFlowHeader 
        title={service.name} 
        onBack={handleBack}
      />

      {/* Service Hero Section */}
      <div className="relative h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Show loading skeleton while image loads */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-femfuel-purple/20 to-femfuel-rose/20 animate-pulse" />
        )}
        <OptimizedImage
          src={getServiceCategoryCover(service.category)}
          alt={`${service.name} - ${service.category}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-femfuel-rose/30 via-transparent to-femfuel-purple/20"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {service.isPopular && (
                <Badge className="bg-femfuel-rose text-white px-3 py-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Más Solicitado
                </Badge>
              )}
              <Badge variant="secondary" className="bg-white/20 text-white px-3 py-1 backdrop-blur-sm">
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">{service.name}</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl mx-auto font-light">{service.description}</p>
            <div className="flex items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-medium">{service.duration} min</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        {/* Service Details */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-6">¿Qué incluye este servicio?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-femfuel-purple to-white">
                    <div className="w-12 h-12 bg-femfuel-rose rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-medium mb-1">Duración</p>
                      <p className="text-lg font-bold text-femfuel-dark">{service.duration} minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-femfuel-purple to-white">
                    <div className="w-12 h-12 bg-femfuel-rose rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-medium mb-1">Garantía</p>
                      <p className="text-lg font-bold text-femfuel-dark">100% Satisfacción</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-femfuel-purple to-white">
                    <div className="w-12 h-12 bg-femfuel-rose rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-femfuel-medium mb-1">Demanda</p>
                      <p className="text-lg font-bold text-femfuel-dark">Alta</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="shadow-xl sticky top-24">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-femfuel-rose to-femfuel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-2">Precio desde</h3>
                  <p className="text-3xl font-bold text-femfuel-rose mb-4">{formatPrice(service.price)}</p>
                  <p className="text-sm text-femfuel-medium mb-6">Los precios pueden variar según el especialista y ubicación</p>
                  <Button 
                    className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white py-3"
                    onClick={() => providers.length > 0 && handleBookNow(providers[0])}
                  >
                    Ver Especialistas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Providers Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-femfuel-dark mb-4">
              Especialistas en {service.name}
            </h2>
            <p className="text-lg text-femfuel-medium flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              {providers.length} {providers.length === 1 ? 'especialista verificado' : 'especialistas verificados'} disponibles
            </p>
          </div>

          {providers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {providers.map((vendor) => {
                const vendorService = vendor.services.find(s => s.name === service.name)
                return (
                  <Card 
                    key={vendor.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group ${
                      selectedProvider === vendor.id ? 'ring-2 ring-femfuel-rose shadow-2xl scale-105' : 'hover:ring-1 hover:ring-femfuel-rose/30'
                    }`}
                    onClick={() => setSelectedProvider(vendor.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Vendor Image & Logo */}
                        <div className="relative">
                          <div className="w-full h-56 rounded-xl overflow-hidden bg-gray-100">
                            <OptimizedImage
                              src={vendor.coverImage || "/vendor-cover-placeholder.png"}
                              alt={vendor.name}
                              width={400}
                              height={224}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute -bottom-4 left-6">
                            <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden">
                              <OptimizedImage
                                src={vendor.logo || "/vendor-logo-placeholder.png"}
                                alt={`${vendor.name} logo`}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Vendor Info */}
                        <div className="pt-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-femfuel-dark mb-2">
                                {vendor.name}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-femfuel-medium">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-lg">{vendor.rating}</span>
                                  </div>
                                  <span className="text-sm">({vendor.reviewCount} reseñas)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span className="font-medium">{vendor.location.district}</span>
                                </div>
                              </div>
                            </div>
                            {vendor.badges && vendor.badges.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {vendor.badges.map((badge, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{badge}</Badge>
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
                            <h4 className="text-sm font-medium text-femfuel-dark mb-2">Otros servicios destacados:</h4>
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
                            <ChatButton
                              vendorId={vendor.id}
                              vendorName={vendor.name}
                              serviceContext={service.name}
                              variant="inline"
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </ChatButton>
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

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
      />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="search" />
    </div>
  )
}