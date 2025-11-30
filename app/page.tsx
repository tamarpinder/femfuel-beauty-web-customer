"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { getMarketplaceServices, getVendors } from "@/lib/vendors-api"
import { starProfessionals } from "@/data/star-professionals"
import { categories } from "@/data/shared/mock-data"
import { Hand, Palette, User, Flower2, Scissors, Eye, TrendingUp } from "lucide-react"
import { ServiceCard, type MarketplaceService } from "@/components/service-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { CategoriesGridV2, type CategoryV2 } from "@/components/categories-grid-v2"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeroSectionV2 } from "@/components/hero-section-v2"
import { HowItWorks } from "@/components/how-it-works"
import { TransformationsShowcase } from "@/components/transformations-showcase"
import { StarProfessionals } from "@/components/star-professionals"
import { NearbyBeauty } from "@/components/nearby-beauty"
import { CustomerFooter } from "@/components/customer-footer"
import { ChatButton } from "@/components/ui/chat-button"
import { BookingModal } from "@/components/booking-modal"
import type { Vendor, VendorService } from "@/types/vendor"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [featuredServices, setFeaturedServices] = useState<MarketplaceService[]>([])
  const [nearbyVendors, setNearbyVendors] = useState<Vendor[]>([])
  const [allVendors, setAllVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [selectedService, setSelectedService] = useState<VendorService | null>(null)
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | undefined>(undefined)

  // Load marketplace services on component mount
  useEffect(() => {
    async function loadFeaturedServices() {
      try {
        // Get marketplace services with popular ones prioritized
        const marketplaceServices = await getMarketplaceServices({ limit: 6 })

        // Transform to match Service interface
        const featuredServices: MarketplaceService[] = marketplaceServices
          .slice(0, 6) // Take first 6 services
          .map(service => ({
            id: service.id,
            name: service.name,
            price: service.price,
            rating: service.rating,
            reviews: service.reviewCount,
            reviewCount: service.reviewCount,
            duration: service.duration,
            image: service.image || "/premium-gel-manicure.png",
            category: service.category,
            description: service.description,
            isPopular: service.isPopular,
            featuredProvider: service.featuredProvider,
            availableProviders: service.availableProviders,
            priceRange: service.priceRange
          }))

        // Add Phase 7 sample data to showcase new features
        if (featuredServices.length >= 3) {
          // Service 1: Trending badge with high bookings
          featuredServices[0] = {
            ...featuredServices[0],
            badge: 'trending',
            bookingsToday: 12,
            slotsAvailable: 3,
            duration: 90
          }

          // Service 2: Top Rated badge
          featuredServices[1] = {
            ...featuredServices[1],
            badge: 'top-rated',
            bookingsToday: 8,
            duration: 60
          }

          // Service 3: New badge with low availability
          featuredServices[2] = {
            ...featuredServices[2],
            badge: 'new',
            slotsAvailable: 2,
            duration: 120
          }

          // Services 4-5: Add realistic durations (if they exist)
          if (featuredServices.length > 3) {
            featuredServices[3] = {
              ...featuredServices[3],
              duration: 45
            }
          }

          if (featuredServices.length > 4) {
            featuredServices[4] = {
              ...featuredServices[4],
              duration: 75
            }
          }

          if (featuredServices.length > 5) {
            featuredServices[5] = {
              ...featuredServices[5],
              duration: 30
            }
          }
        }

        setFeaturedServices(featuredServices)

        // Get all vendors
        const allVendorData = await getVendors()
        setAllVendors(allVendorData)
        // Take first 6 vendors as "nearby" for demo
        setNearbyVendors(allVendorData.slice(0, 6))
        
      } catch (error) {
        setFeaturedServices([]);
        setFeaturedServices([])
        setNearbyVendors([])
        setAllVendors([])
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedServices()
  }, [])

  // Transform categories from data source to include UI properties
  const categoryIconMap: Record<string, any> = {
    'nails': Hand,
    'makeup': Palette,
    'spa': Flower2,
    'hair': Scissors,
    'lashes': Eye
  }

  const categoryBannerMap: Record<string, string> = {
    'nails': '/categories/banners/nailcare-banner.png',
    'makeup': '/categories/banners/makeup-banner.png',
    'spa': '/categories/banners/skincare-banner.png',
    'hair': '/categories/banners/haircare-banner.png',
    'lashes': '/categories/lashes-category-banner.png'
  }

  const categoriesWithUI: CategoryV2[] = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: categoryIconMap[cat.id] || Hand,
    count: cat.serviceCount?.toString() || '0',
    bannerImage: categoryBannerMap[cat.id] || '/categories/banners/default-banner.png'
  }))

  // Generate transformations from real mock data - ALL 8 transformation sets
  // Now mapped to actual marketplace services instead of synthetic ones
  const transformations = [
    {
      id: 1,
      name: "Isabella Martínez",
      service: "Balayage", // Real marketplace service
      vendor: "Hair Salon Elite",
      beforeImage: "/transformations/before/hair-transformation-1-before.png",
      afterImage: "/transformations/after/hair-transformation-1-after.png",
      rating: 5.0,
      testimonial: "¡Increíble! Me siento como una nueva persona. El balayage quedó perfecto y el corte me favorece muchísimo.",
      serviceId: "balayage",
      lookName: "Balayage Dorado Caribeño"
    },
    {
      id: 2,
      name: "María José Peña",
      service: "Maquillaje de Gala", // Real marketplace service
      vendor: "Beauty Studio RD",
      beforeImage: "/transformations/before/makeup-transformation-3-before.png",
      afterImage: "/transformations/after/makeup-transformation-1-after.png",
      rating: 4.9,
      testimonial: "El maquillaje duró toda la noche. Recibí tantos cumplidos en la fiesta. Definitivamente regreso.",
      serviceId: "maquillaje-de-gala",
      lookName: "Glamour Tropical Night"
    },
    {
      id: 3,
      name: "Carmen Delgado",
      service: "Alisado Dominicano", // Real marketplace service (exact match!)
      vendor: "Cabello y Estilo",
      beforeImage: "/transformations/before/dominican-blowout-before.png",
      afterImage: "/transformations/after/dominican-blowout-after.png",
      rating: 4.8,
      testimonial: "Mi cabello nunca se había visto tan liso y brillante. El blowout dominicano es increíble!",
      serviceId: "alisado-dominicano",
      lookName: "Alisado Dominicano"
    },
    {
      id: 4,
      name: "Sophia Ramírez",
      service: "Arte de Uñas Tropical", // Real marketplace service
      vendor: "Luxury Nails Spa",
      beforeImage: "/transformations/before/nail-transformation-before.png",
      afterImage: "/transformations/after/nail-transformation-after.png",
      rating: 5.0,
      testimonial: "Las uñas más hermosas que he tenido. El arte tropical es perfecto para el verano caribeño!",
      serviceId: "arte-de-unas-tropical",
      lookName: "Caribbean Paradise Nails"
    },
    {
      id: 5,
      name: "Alejandra Santos",
      service: "Maquillaje Natural", // Real marketplace service
      vendor: "Makeup Studio Pro",
      beforeImage: "/transformations/before/makeup-transformation-2-before.png",
      afterImage: "/transformations/after/makeup-transformation-2-after.png",
      rating: 4.9,
      testimonial: "Perfecto para el día a día. Se ve natural pero me hace lucir radiante. Exactamente lo que buscaba.",
      serviceId: "maquillaje-natural",
      lookName: "Natural Daytime Glow"
    },
    {
      id: 6,
      name: "Valentina Cruz",
      service: "Facial de Lujo", // Real marketplace service
      vendor: "Spa Serenity",
      beforeImage: "/transformations/before/spa-transformation-1-before.png",
      afterImage: "/transformations/after/spa-transformation-1-after.png",
      rating: 5.0,
      testimonial: "Mi piel se ve completamente renovada. Los resultados son visibles desde la primera sesión.",
      serviceId: "facial-de-lujo",
      lookName: "Skin Renewal Treatment"
    },
    {
      id: 7,
      name: "Camila Herrera",
      service: "Extensiones de Pestañas", // Real marketplace service
      vendor: "Lash Studio DR",
      beforeImage: "/transformations/before/lash-transformation-1-before.png",
      afterImage: "/transformations/after/lash-transformation-1-after.png",
      rating: 4.8,
      testimonial: "Mis pestañas se ven increíbles! Duran mucho tiempo y me ahorro maquillaje todos los días.",
      serviceId: "extensiones-de-pestanas",
      lookName: "Volume Lash Extensions"
    },
    {
      id: 8,
      name: "Daniela Morales",
      service: "Maquillaje de Novia", // Real marketplace service (most premium)
      vendor: "Belleza Natural",
      beforeImage: "/transformations/before/makeup-transformation-3-before.png",
      afterImage: "/transformations/after/makeup-transformation-3-after.png",
      rating: 4.9,
      testimonial: "Un look sofisticado y elegante. Me sentí como una modelo profesional en mi evento especial.",
      serviceId: "maquillaje-de-novia",
      lookName: "Elegant Premium Look"
    }
  ]

  // Star Professionals - static data with curated portfolios
  const professionals = starProfessionals

  // Transform real vendor data to NearbyLocation format
  const transformVendorToNearbyLocation = (vendor: Vendor, index: number) => {
    // Get a featured service from the vendor
    const featuredService = vendor.services[0] || {
      name: "Servicio de belleza",
      price: 1000,
      duration: 60
    }

    // Calculate real service count and starting price
    const serviceCount = vendor.services.length
    const startingPrice = vendor.services.length > 0
      ? Math.min(...vendor.services.map(s => s.price))
      : featuredService.price

    // Generate realistic distance and travel time based on neighborhoods
    const distances = ["0.8 km", "1.2 km", "2.1 km", "1.5 km", "2.8 km", "1.1 km"]
    const travelTimes = ["3", "5", "7", "4", "9", "4"]

    return {
      id: vendor.id,
      name: vendor.name,
      type: vendor.categories.includes("hair") ? "Salon de Belleza" :
            vendor.categories.includes("makeup") ? "Estudio de Maquillaje" :
            vendor.categories.includes("spa") ? "Spa & Wellness" :
            vendor.categories.includes("nails") ? "Nail Art Studio" :
            "Centro de Belleza",
      address: vendor.location.address,
      neighborhood: vendor.location.district,
      distance: distances[index % distances.length],
      travelTime: travelTimes[index % travelTimes.length],
      rating: vendor.rating,
      reviewCount: vendor.reviewCount,
      specialties: vendor.popularServices || ["Belleza", "Cuidado personal"],
      openNow: Math.random() > 0.3, // 70% chance of being open
      closingTime: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"][index % 4],
      phone: vendor.contact?.phone || `+1 809-555-${String(index + 123).padStart(4, '0')}`,
      image: vendor.logo || "/vendor-logo-placeholder.png",
      featuredService: {
        name: featuredService.name,
        price: `RD$${featuredService.price.toLocaleString()}`,
        duration: `${Math.round(featuredService.duration / 60)} hrs`
      },
      serviceCount: serviceCount,
      startingPrice: `RD$${startingPrice.toLocaleString()}`,
      localSpecialty: vendor.description || "Servicios de belleza profesionales"
    }
  }
  
  const nearbyLocations = nearbyVendors.map(transformVendorToNearbyLocation)

  const handleSearch = useCallback((query: string) => {
    // No longer navigate on search - headers now use SmartSearch
    // which handles suggestions and navigation separately
    // Search query received
  }, [])

  const handleBookService = (serviceId: string) => {
    // Book service functionality
  }

  const handleViewProviders = (serviceId: string) => {
    // Navigate to service providers page
    router.push(`/service/${serviceId}/providers`)
  }

  const handleCategoryClick = (categoryName: string) => {
    // Map Spanish names to category IDs for new services flow
    const categorySlugMap: { [key: string]: string } = {
      "Uñas": "nails",
      "Maquillaje": "makeup",
      "Cuerpo": "spa", // Body treatments go to spa category
      "Spa": "spa",
      "Peinados": "hair", // Hair styling
      "Pestañas": "lashes"
    }
    const categoryId = categorySlugMap[categoryName] || categoryName.toLowerCase()
    router.push(`/services?category=${categoryId}`)
  }

  const handleGetThisLook = async (serviceId: string, lookName: string, vendorName: string) => {
    try {
      // Find the real marketplace service by name (since serviceId is slug-based)
      const allServices = await getMarketplaceServices()
      const transformation = transformations.find(t => t.serviceId === serviceId)

      if (!transformation) {
        toast.error("No pudimos encontrar este servicio")
        return
      }

      // Find the marketplace service by name
      const marketplaceService = allServices.find(s => s.name === transformation.service)

      if (!marketplaceService) {
        toast.error("Este servicio no está disponible en este momento")
        return
      }

      // Find a vendor that offers this service from our vendor list
      const serviceVendor = allVendors.find(v =>
        v.services.some(s => s.name === transformation.service)
      )

      if (!serviceVendor) {
        toast.error("No hay proveedores disponibles para este servicio")
        return
      }

      // Get the actual service from the vendor
      const vendorService = serviceVendor.services.find(s => s.name === transformation.service)

      if (!vendorService) {
        toast.error("Servicio no encontrado")
        return
      }

      // Open the booking modal with the real service and vendor
      setSelectedVendor(serviceVendor)
      setSelectedService(vendorService)
      setShowBookingModal(true)
      toast.success(`¡Perfecto! Reserva tu ${lookName}`)

    } catch (error) {
      toast.error("Error al cargar el servicio. Inténtalo de nuevo.")
    }
  }

  const handleBookProfessional = (professionalId: number | string) => {
    // Book professional functionality
    router.push(`/booking/professional/${professionalId}`)
  }

  const handleViewVendor = (professionalId: number | string) => {
    // View vendor for professional
    const professional = professionals.find(p => p.id === professionalId)
    if (professional?.vendorId) {
      router.push(`/vendor/${professional.vendorId}`)
    }
  }

  const handleViewPortfolio = (professionalId: number | string) => {
    // Find the professional by ID to get their name
    const professional = professionals.find(p => p.id === professionalId)
    if (professional) {
      // Generate slug from professional name (same pattern used elsewhere)
      const slug = professional.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      router.push(`/professional/${slug}`)
    }
  }

  const handleBookFromProfessional = (professionalId: number | string, serviceName?: string) => {
    // Find the professional
    const professional = professionals.find(p => p.id === professionalId)
    if (!professional) return

    // Create a mock vendor for this professional (star professionals reference non-existent vendors)
    const mockVendor: Vendor = {
      id: professional.vendorId || `vendor-${professional.id}`,
      name: professional.vendorName || "Beauty Salon",
      slug: professional.vendorSlug || `vendor-${professional.id}`,
      description: `Home of ${professional.name}`,
      coverImage: professional.image,
      rating: professional.rating,
      reviewCount: professional.reviewCount,
      serviceCount: 0,
      categories: [professional.specialties[0]],
      location: {
        address: "Santo Domingo",
        district: "Piantini",
        city: "Santo Domingo",
        coordinates: { lat: 18.4671, lng: -69.9404 }
      },
      contact: {
        phone: "+1 809 555 0100",
        email: "contact@femfuel.com"
      },
      popularServices: [],
      availability: {
        isOpen: true,
        todayAvailable: true
      },
      professionalCount: 1,
      priceRange: {
        min: 500,
        max: 5000
      },
      services: [],
      businessHours: {
        monday: { open: "9:00 AM", close: "7:00 PM" },
        tuesday: { open: "9:00 AM", close: "7:00 PM" },
        wednesday: { open: "9:00 AM", close: "7:00 PM" },
        thursday: { open: "9:00 AM", close: "7:00 PM" },
        friday: { open: "9:00 AM", close: "7:00 PM" },
        saturday: { open: "9:00 AM", close: "6:00 PM" },
        sunday: { open: "9:00 AM", close: "5:00 PM", isClosed: true }
      },
      professionals: [professional]
    }

    // Create service from professional's signature service
    const signatureService = professional.portfolio?.signature
    if (!signatureService) return

    const mockService: VendorService = {
      id: `service-${professional.id}`,
      name: signatureService.serviceName,
      description: signatureService.description,
      price: parseInt(signatureService.price.replace(/[^\d]/g, "")),
      duration: signatureService.duration,
      category: professional.specialties[0],
      isPopular: true
    }

    mockVendor.services = [mockService]

    // Open booking modal with mock vendor and service
    setSelectedVendor(mockVendor)
    setSelectedService(mockService)
    setSelectedProfessionalId(professional.id as string)
    setShowBookingModal(true)
  }

  const handleGetDirections = (locationId: string) => {
    // Get directions functionality
    // TODO: Integrate with maps service
  }

  const handleCallLocation = (phone: string) => {
    // Call location functionality
    window.open(`tel:${phone}`)
  }

  const handleBookLocation = (locationId: string) => {
    // Book location functionality
    
    const vendor = nearbyVendors.find(v => v.id === locationId)
    // Found vendor check
    
    if (vendor && vendor.services.length > 0) {
      // Setting booking modal
      setSelectedVendor(vendor)
      setSelectedService(vendor.services[0])
      setShowBookingModal(true)
    } else {
      // No vendor found or vendor has no services
    }
  }
  
  const handleBookingComplete = (booking: any) => {
    // BookingModal and ProcessingOverlay are already closed by this point
    // Just handle cleanup and navigation
    setShowBookingModal(false)
    setSelectedVendor(null)
    setSelectedService(null)
    setSelectedProfessionalId(undefined)

    // Navigation is now handled directly by ProcessingOverlay
    // User chooses where to go next through the integrated navigation buttons
  }


  const handleTabChange = (tab: "home" | "search" | "bookings" | "shop" | "profile" | "chat") => {
    if (tab === "search") {
      router.push("/services")
    } else if (tab === "shop") {
      router.push("/shop")
    } else if (tab === "bookings") {
      router.push("/bookings")
    } else if (tab === "profile") {
      router.push("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <HeroSectionV2 />

      {/* Categories Grid V2 - Position #2 */}
      <div id="categories-section">
        <CategoriesGridV2 categories={categoriesWithUI} />
      </div>

      {/* Transformations Showcase - Position #3 */}
      <div id="transformations-section">
        <TransformationsShowcase
          transformations={transformations}
          onGetThisLook={handleGetThisLook}
        />
      </div>

      {/* Star Professionals - Position #4 */}
      <StarProfessionals
        professionals={professionals}
        onViewVendor={handleViewVendor}
        onViewPortfolio={handleViewPortfolio}
        onBook={handleBookFromProfessional}
      />

      {/* How It Works - Position #5 (moved down) */}
      <HowItWorks />

      {/* Nearby Beauty */}
      <NearbyBeauty
        locations={nearbyLocations}
        userLocation="Piantini, Santo Domingo"
        onGetDirections={handleGetDirections}
        onCallLocation={handleCallLocation}
        onBookLocation={handleBookLocation}
        onViewVendor={(locationId) => router.push(`/vendor/${locationId}`)}
      />

      {/* Featured Services - Redesigned Premium Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-50 via-white to-femfuel-light/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Dynamic Title Based on Auth Status */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-femfuel-rose animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark">
                {isAuthenticated && user?.name
                  ? `Para Ti, ${user.name.split(' ')[0]}`
                  : "Tendencias Esta Semana"
                }
              </h2>
            </div>
            <p className="text-base text-femfuel-medium max-w-2xl mx-auto">
              {isAuthenticated
                ? "Servicios seleccionados especialmente para tu estilo"
                : "Descubre los servicios más populares con nuestros mejores especialistas"
              }
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-femfuel-rose mx-auto"></div>
              <p className="text-femfuel-medium mt-4 text-lg">Cargando servicios populares...</p>
            </div>
          ) : featuredServices.length > 0 ? (
            <>
              {/* Mobile Layout - Enhanced Cards */}
              <div className="md:hidden space-y-6">
                {featuredServices.slice(0, 4).map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    layout="horizontal"
                    onViewProviders={handleViewProviders}
                    onViewVendor={(vendorId) => router.push(`/vendor/${vendorId}`)}
                  />
                ))}
                <div className="text-center pt-6">
                  <button className="glassmorphism-button-lg" onClick={() => router.push('/services')}>
                    Ver Todos los Servicios
                  </button>
                </div>
              </div>

              {/* Desktop Layout - Premium Grid */}
              <div className="hidden md:block">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredServices.slice(0, 6).map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      layout="vertical"
                      onViewProviders={handleViewProviders}
                      onViewVendor={(vendorId) => router.push(`/vendor/${vendorId}`)}
                    />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button className="glassmorphism-button-lg" onClick={() => router.push('/services')}>
                    Explorar Todos los Servicios
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-femfuel-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-femfuel-rose" />
                </div>
                <p className="text-lg text-femfuel-medium">No hay servicios disponibles en este momento</p>
                <p className="text-sm text-femfuel-medium/70 mt-2">Por favor, inténtalo de nuevo más tarde</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Desktop Footer */}
      <CustomerFooter />

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
        unreadCount={3}
      />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="home" onTabChange={handleTabChange} />
      
      {/* Booking Modal */}
      {showBookingModal && selectedVendor && selectedService && (
        <BookingModal
          isOpen={showBookingModal}
          service={selectedService}
          vendorName={selectedVendor.name}
          vendorRating={selectedVendor.rating}
          vendorId={selectedVendor.id}
          professionalId={selectedProfessionalId}
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

    </div>
  )
}