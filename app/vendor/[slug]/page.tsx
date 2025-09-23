"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Star, MapPin, Phone, Clock, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceCard } from "@/components/service-card"
import { MobileNavigation } from "@/components/mobile-navigation"
import { BookingModal } from "@/components/booking-modal"
import { ServiceDetailGallery } from "@/components/service-detail-gallery"
import { ChatButton } from "@/components/ui/chat-button"
import { UserFlowHeader } from "@/components/user-flow-header"
import { ProfessionalShowcase } from "@/components/vendor/professional-showcase"
import { ServicesByCategory } from "@/components/vendor/services-by-category"
import { TransformationGallery } from "@/components/vendor/transformation-gallery"
import { getVendorBySlug } from "@/lib/vendors-api"
import { getServiceDetailImages } from "@/lib/service-detail-mappings"
import { getServiceImage } from "@/lib/image-mappings"
import { getProfessionalsByVendorSlug, generateVendorTransformations } from "@/lib/vendor-professionals"
import { Vendor, VendorService } from "@/types/vendor"

export default function VendorPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorSlug = params.slug as string
  
  // Get service context from URL params
  const contextServiceId = searchParams.get('service')
  const shouldShowBooking = searchParams.get('action') === 'book'
  
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState<VendorService | null>(null)
  const [contextService, setContextService] = useState<VendorService | null>(null)
  const [showServiceGallery, setShowServiceGallery] = useState(false)
  const [galleryService, setGalleryService] = useState<VendorService | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    date: undefined,
    time: "",
    professional: null,
    selectedAddons: [],
    notes: "",
    paymentMethod: "cash"
  })

  // Get professionals for this vendor
  const vendorProfessionals = getProfessionalsByVendorSlug(vendorSlug)

  // Generate transformations for this vendor
  const vendorTransformations = vendor ? generateVendorTransformations(vendor.name, vendor.services) : []

  useEffect(() => {
    const fetchVendor = async () => {
      setIsLoading(true)
      try {
        const vendorData = await getVendorBySlug(vendorSlug)
        setVendor(vendorData || null)
      } catch (error) {
        setVendor(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVendor()
  }, [vendorSlug])

  // Handle service context when vendor loads
  useEffect(() => {
    if (vendor && contextServiceId) {
      // Find the service in vendor's services
      const service = vendor.services.find(s => s.id === contextServiceId)
      if (service) {
        setContextService(service)
        setSelectedCategory(service.category)
        
        // Auto-trigger booking modal if requested
        if (shouldShowBooking) {
          setSelectedService(service)
          setShowBookingModal(true)
        }
      }
    }
  }, [vendor, contextServiceId, shouldShowBooking])

  const handleBack = () => {
    router.back()
  }

  const handleServiceBook = (serviceId: string) => {
    if (!vendor) return
    const service = vendor.services.find(s => s.id === serviceId)
    if (service) {
      setSelectedService(service)
      setShowBookingModal(true)
    }
  }

  const handleServiceGallery = (serviceId: string) => {
    if (!vendor) return
    const service = vendor.services.find(s => s.id === serviceId)
    if (service) {
      setGalleryService(service)
      setShowServiceGallery(true)
    }
  }

  const handleViewProfile = (professional: any) => {
    const slug = professional.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    router.push(`/professional/${slug}`)
  }

  const handleBookNow = (professional: any) => {
    // Pre-select the professional when opening booking modal
    if (vendor?.services && vendor.services.length > 0) {
      // Use the most popular service or first service for quick booking
      const defaultService = vendor.services.find(s => s.isPopular) || vendor.services[0]
      setSelectedService(defaultService)
      setBookingData(prev => ({
        ...prev,
        professional: {
          id: professional.id,
          name: professional.name,
          image: professional.image,
          rating: professional.rating,
          specialties: professional.specialties,
          yearsExperience: professional.yearsExperience
        }
      }))
      setShowBookingModal(true)
    }
  }

  const handleGetThisLook = (transformation: any) => {
    // TODO: Implement transformation booking
    console.log('Get this look:', transformation.title)
  }

  const handleBookingComplete = (booking: any) => {
    // BookingModal and ProcessingOverlay are already closed by this point
    // Just handle cleanup and navigation
    setShowBookingModal(false)
    setSelectedService(null)

    // Navigation is now handled directly by ProcessingOverlay
    // User chooses where to go next through the integrated navigation buttons
  }


  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  const getFilteredServices = () => {
    if (!vendor) return []
    if (selectedCategory === "all") return vendor.services
    return vendor.services.filter(service => service.category === selectedCategory)
  }

  const getUniqueCategories = () => {
    if (!vendor) return []
    const categories = [...new Set(vendor.services.map(service => service.category))]
    return categories
  }

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[new Date().getDay()]
  }

  const getTodayHours = () => {
    if (!vendor) return null
    const today = getCurrentDay()
    const hours = vendor.businessHours[today]
    if (!hours || hours.isClosed) return "Cerrado"
    return `${hours.open} - ${hours.close}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-16 bg-gray-200"></div>
          {/* Cover Image Skeleton */}
          <div className="h-64 bg-gray-300"></div>
          {/* Content Skeleton */}
          <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">Proveedor no encontrado</h1>
          <p className="text-femfuel-medium mb-6">El proveedor "{vendorSlug}" no existe.</p>
          <Button onClick={() => router.push("/")} className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white">
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Cover Image - Full Width */}
      <div className="relative h-64 md:h-80">
        <img
          src={vendor.coverImage || "/placeholder.svg?height=320&width=800&query=beauty salon"}
          alt={`${vendor.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Vendor Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              <img
                src={vendor.logo || "/placeholder.svg?height=80&width=80&query=business logo"}
                alt={`${vendor.name} logo`}
                className="w-20 h-20 rounded-xl object-cover border-4 border-white/20 backdrop-blur-sm flex-shrink-0"
              />
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{vendor.name}</h1>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span>({vendor.reviewCount} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location.district}, {vendor.location.city}</span>
                  </div>
                  {vendor.professionalCount > 1 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{vendor.professionalCount} profesionales</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <ChatButton
                  vendorId={vendor.id}
                  vendorName={vendor.name}
                  variant="inline"
                  size="default"
                  className="bg-green-500 hover:bg-green-600 text-white shadow-lg backdrop-blur-sm"
                >
                  💬 Chat
                </ChatButton>
                <Button className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white shadow-lg backdrop-blur-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Description - Full Width */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-femfuel-medium leading-relaxed mb-8">{vendor.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <Clock className="h-8 w-8 text-femfuel-rose mx-auto mb-2" />
                <p className="font-semibold text-femfuel-dark">Horario Hoy</p>
                <p className="text-femfuel-medium">{getTodayHours()}</p>
              </div>
              <div className="p-4">
                <Calendar className="h-8 w-8 text-femfuel-rose mx-auto mb-2" />
                <p className="font-semibold text-femfuel-dark">Disponibilidad</p>
                <p className="text-femfuel-medium">
                  {vendor.availability.todayAvailable ? vendor.availability.nextSlot : "Sin disponibilidad hoy"}
                </p>
              </div>
              <div className="p-4">
                <MapPin className="h-8 w-8 text-femfuel-rose mx-auto mb-2" />
                <p className="font-semibold text-femfuel-dark">Ubicación</p>
                <p className="text-femfuel-medium">{vendor.location.address}</p>
              </div>
            </div>

            {vendor.badges && vendor.badges.length > 0 && (
              <div className="flex justify-center gap-2 mt-6">
                {vendor.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">{badge}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Context Banner */}
      {contextService && (
        <div className="py-8 bg-gradient-to-r from-femfuel-rose to-femfuel-purple">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Interesado en {contextService.name}</h3>
                  <p className="text-white/90">
                    {formatPrice(contextService.price)} • {contextService.duration} min
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleServiceBook(contextService.id)}
                  className="bg-white text-femfuel-rose hover:bg-white/90"
                >
                  Reservar Ahora
                </Button>
                <ChatButton
                  vendorId={vendor.id}
                  vendorName={vendor.name}
                  serviceContext={contextService.name}
                  variant="inline"
                  size="default"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  💬 Preguntar
                </ChatButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Showcase */}
      {vendorProfessionals.length > 0 && (
        <ProfessionalShowcase
          professionals={vendorProfessionals}
          onViewProfile={handleViewProfile}
          onBookNow={handleBookNow}
        />
      )}

      {/* Services by Category */}
      <ServicesByCategory
        services={vendor.services}
        vendorId={vendor.id}
        vendorName={vendor.name}
        onServiceBook={handleServiceBook}
        onServiceGallery={handleServiceGallery}
        formatPrice={formatPrice}
      />

      {/* Transformation Gallery */}
      {vendorTransformations.length > 0 && (
        <TransformationGallery
          transformations={vendorTransformations}
          onGetThisLook={handleGetThisLook}
        />
      )}

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="search" />

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedService(null)
            setBookingData(prev => ({ ...prev, professional: null }))
          }}
          service={{
            id: selectedService.id,
            name: selectedService.name,
            price: formatPrice(selectedService.price),
            rating: vendor.rating,
            reviews: vendor.reviewCount,
            reviewCount: vendor.reviewCount,
            duration: selectedService.duration,
            image: selectedService.image,
            category: selectedService.category,
            description: selectedService.description,
            isPopular: selectedService.isPopular,
            featuredProvider: {
              id: vendor.id,
              name: vendor.name,
              isSponsored: false
            },
            availableProviders: 1
          }}
          vendorId={vendor.id}
          vendorName={vendor.name}
          vendorRating={vendor.rating}
          professionalId={bookingData.professional?.id}
          professionalName={bookingData.professional?.name}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* Service Detail Gallery */}
      {galleryService && (
        <ServiceDetailGallery
          isOpen={showServiceGallery}
          onClose={() => {
            setShowServiceGallery(false)
            setGalleryService(null)
          }}
          serviceName={galleryService.name}
          images={getServiceDetailImages(galleryService.name)}
        />
      )}

    </div>
  )
}