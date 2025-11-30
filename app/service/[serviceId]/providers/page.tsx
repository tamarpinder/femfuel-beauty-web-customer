"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Clock, Heart, Users, Calendar, ChevronRight, Sparkles, Shield, TrendingUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ChatButton } from "@/components/ui/chat-button"
import { UserFlowHeader } from "@/components/user-flow-header"
import { ServiceHeaderCompact } from "@/components/service-header-compact"
import { BeforeAfterCarousel } from "@/components/before-after-carousel"
import { ServiceInfoCards } from "@/components/service-info-cards"
import { ProviderListCompact } from "@/components/provider-list-compact"
import { ServiceDesktopLayout } from "@/components/service-desktop-layout"
import { BookingModal } from "@/components/booking-modal"
import { getAllServices, getVendorsByCategory } from "@/lib/vendors-api"
import { getServiceImage, getServiceCategoryCover } from "@/lib/image-mappings"
import type { Vendor, VendorService } from "@/types/vendor"

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
  beforeAfter?: {
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }
  transformationGallery?: Array<{
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }>
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
  
  // Service name mapping for marketplace-to-vendor service matching
  const serviceNameMapping: Record<string, string> = {
    // No mappings needed - service names match exactly
  }
  
  const [service, setService] = useState<ServiceWithVendor | null>(null)
  const [providers, setProviders] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [selectedService, setSelectedService] = useState<VendorService | null>(null)

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
        
        // Get all vendors that offer this service category
        const categoryProviders = await getVendorsByCategory(targetService.category)
        
        // Filter vendors that actually offer this specific service
        const mappedServiceName = serviceNameMapping[targetService.name] || targetService.name
        const serviceProviders = categoryProviders.filter(vendor =>
          vendor.services.some(s => s.name === mappedServiceName)
        )
        
        setProviders(serviceProviders)
        
      } catch (error) {
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
    router.push(`/vendor/${vendor.slug}?service=${service?.slug || serviceId}`)
  }

  const handleBookNow = (vendor: Vendor) => {
    if (!service) return
    
    // Find the matching service in vendor's services
    const mappedName = serviceNameMapping[service.name] || service.name
    const vendorService = vendor.services.find(s => s.name === mappedName)
    
    if (vendorService) {
      setSelectedVendor(vendor)
      setSelectedService(vendorService)
      setShowBookingModal(true)
    }
  }
  
  const handleBookingComplete = (booking: any) => {
    // BookingModal and ProcessingOverlay are already closed by this point
    // Just handle cleanup and navigation
    setShowBookingModal(false)
    setSelectedVendor(null)
    setSelectedService(null)

    // Navigation is now handled directly by ProcessingOverlay
    // User chooses where to go next through the integrated navigation buttons
  }


  // Calculate average duration from providers
  const getAverageDuration = () => {
    if (!service || providers.length === 0) return service?.duration || 0
    
    const durations = providers
      .map(provider => provider.services.find(s => s.name === service.name)?.duration)
      .filter(duration => duration !== undefined) as number[]
    
    if (durations.length === 0) return service.duration
    
    return Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200"></div>
          <div className="h-20 bg-gray-100"></div>
          <div className="h-32 bg-gray-50"></div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
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
          <Button onClick={() => router.push("/services")} className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white">
            Volver a Servicios
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Layout (< md screens) */}
      <div className="md:hidden min-h-screen bg-white pt-20">{/* Mobile service page relies on SmartHeader */}

        {/* Compact Service Header */}
        <ServiceHeaderCompact
          serviceName={service.name}
          category={service.category}
          price={service.price}
          duration={service.duration}
          isPopular={service.isPopular}
        />

        {/* Before/After Photo Carousel */}
        <BeforeAfterCarousel
          serviceName={service.name}
          category={service.category}
          beforeAfter={service.beforeAfter}
        />

        {/* Quick Info Cards */}
        <ServiceInfoCards
          duration={getAverageDuration()}
          category={service.category}
        />

        {/* Provider List */}
        <ProviderListCompact
          providers={providers}
          serviceName={serviceNameMapping[service.name] || service.name}
          onProviderSelect={handleProviderSelect}
          onBookNow={handleBookNow}
        />

        {/* Floating Chat Widget */}
        <ChatButton
          variant="floating"
          className="shadow-lg hover:shadow-xl"
        />

        {/* Mobile Navigation */}
        <MobileNavigation activeTab="search" />
      </div>

      {/* Desktop Layout (md+ screens) */}
      <div className="hidden md:block">{/* Desktop service page relies on SmartHeader */}

        {/* Desktop Split-Screen Layout */}
        <ServiceDesktopLayout
          service={{
            ...service,
            name: serviceNameMapping[service.name] || service.name
          }}
          providers={providers}
          onProviderSelect={handleProviderSelect}
          onBookNow={handleBookNow}
        />

        {/* Floating Chat Widget */}
        <ChatButton
          variant="floating"
          className="shadow-lg hover:shadow-xl"
        />
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedVendor && selectedService && (
        <BookingModal
          isOpen={showBookingModal}
          service={selectedService}
          vendorName={selectedVendor.name}
          vendorRating={selectedVendor.rating}
          vendorId={selectedVendor.id}
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

    </>
  )
}