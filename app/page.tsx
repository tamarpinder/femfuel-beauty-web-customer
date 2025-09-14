"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { getMarketplaceServices, getVendors } from "@/lib/vendors-api"
import { Hand, Palette, User, Flower2, Scissors, Eye } from "lucide-react"
import { ServiceCard, type Service } from "@/components/service-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { MobileHeader } from "@/components/mobile-header"
import { DesktopHeader } from "@/components/desktop-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { TransformationsShowcase } from "@/components/transformations-showcase"
import { StarProfessionals } from "@/components/star-professionals"
import { NearbyBeauty } from "@/components/nearby-beauty"
import { CustomerFooter } from "@/components/customer-footer"
import { ChatButton } from "@/components/ui/chat-button"
import { BookingModal } from "@/components/booking-modal"
import type { Vendor, VendorService } from "@/types/vendor"

export default function HomePage() {
  const router = useRouter()
  const [featuredServices, setFeaturedServices] = useState<Service[]>([])
  const [nearbyVendors, setNearbyVendors] = useState<Vendor[]>([])
  const [allVendors, setAllVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [selectedService, setSelectedService] = useState<VendorService | null>(null)

  // Load marketplace services on component mount
  useEffect(() => {
    async function loadFeaturedServices() {
      try {
        // Get marketplace services with popular ones prioritized
        const marketplaceServices = await getMarketplaceServices({ limit: 6 })
        
        // Transform to match Service interface
        const featuredServices: Service[] = marketplaceServices
          .filter(service => service.isPopular)
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

        setFeaturedServices(featuredServices)
        
        // Get all vendors
        const allVendorData = await getVendors()
        setAllVendors(allVendorData)
        // Take first 6 vendors as "nearby" for demo
        setNearbyVendors(allVendorData.slice(0, 6))
        
      } catch (error) {
        console.error('Error loading featured services:', error)
        setFeaturedServices([])
        setNearbyVendors([])
        setAllVendors([])
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedServices()
  }, [])

  const categories: Category[] = [
    { 
      name: "Uñas", 
      icon: Hand, 
      count: "37",
      bannerImage: "/categories/nails-category-banner.png"
    },
    { 
      name: "Maquillaje", 
      icon: Palette, 
      count: "36",
      bannerImage: "/categories/makeup-category-banner.png"
    },
    { 
      name: "Spa", 
      icon: Flower2, 
      count: "26",
      bannerImage: "/categories/spa-category-banner.png"
    },
    { 
      name: "Peinados", 
      icon: Scissors, 
      count: "53",
      bannerImage: "/categories/hair-category-banner.png"
    },
    { 
      name: "Pestañas", 
      icon: Eye, 
      count: "35",
      bannerImage: "/categories/lashes-category-banner.png"
    },
  ]

  // Generate transformations from real mock data - ALL 8 transformation sets
  const transformations = [
    {
      id: 1,
      name: "Isabella Martínez",
      service: "Balayage Dorado Caribeño",
      vendor: "Hair Salon Elite",
      beforeImage: "/transformations/before/hair-transformation-1-before.png",
      afterImage: "/transformations/after/hair-transformation-1-after.png",
      rating: 5.0,
      testimonial: "¡Increíble! Me siento como una nueva persona. El balayage quedó perfecto y el corte me favorece muchísimo.",
      serviceId: "service-001",
      lookName: "Balayage Dorado Caribeño"
    },
    {
      id: 2,
      name: "María José Peña",
      service: "Glamour Tropical Night",
      vendor: "Beauty Studio RD",
      beforeImage: "/transformations/before/makeup-transformation-3-before.png",
      afterImage: "/transformations/after/makeup-transformation-1-after.png",
      rating: 4.9,
      testimonial: "El maquillaje duró toda la noche. Recibí tantos cumplidos en la fiesta. Definitivamente regreso.",
      serviceId: "service-002",
      lookName: "Glamour Tropical Night"
    },
    {
      id: 3,
      name: "Carmen Delgado",
      service: "Dominican Blowout Perfecto",
      vendor: "Cabello y Estilo",
      beforeImage: "/transformations/before/dominican-blowout-before.png",
      afterImage: "/transformations/after/dominican-blowout-after.png",
      rating: 4.8,
      testimonial: "Mi cabello nunca se había visto tan liso y brillante. El blowout dominicano es increíble!",
      serviceId: "service-003",
      lookName: "Dominican Silk Blowout"
    },
    {
      id: 4,
      name: "Sophia Ramírez",
      service: "Tropical Nail Art",
      vendor: "Luxury Nails Spa",
      beforeImage: "/transformations/before/nail-transformation-before.png",
      afterImage: "/transformations/after/nail-transformation-after.png",
      rating: 5.0,
      testimonial: "Las uñas más hermosas que he tenido. El arte tropical es perfecto para el verano caribeño!",
      serviceId: "service-004",
      lookName: "Caribbean Paradise Nails"
    },
    {
      id: 5,
      name: "Alejandra Santos",
      service: "Maquillaje Natural Día",
      vendor: "Makeup Studio Pro",
      beforeImage: "/transformations/before/makeup-transformation-2-before.png",
      afterImage: "/transformations/after/makeup-transformation-2-after.png",
      rating: 4.9,
      testimonial: "Perfecto para el día a día. Se ve natural pero me hace lucir radiante. Exactamente lo que buscaba.",
      serviceId: "service-005",
      lookName: "Natural Daytime Glow"
    },
    {
      id: 6,
      name: "Valentina Cruz",
      service: "Tratamiento Facial Renovador",
      vendor: "Spa Serenity",
      beforeImage: "/transformations/before/spa-transformation-1-before.png",
      afterImage: "/transformations/after/spa-transformation-1-after.png",
      rating: 5.0,
      testimonial: "Mi piel se ve completamente renovada. Los resultados son visibles desde la primera sesión.",
      serviceId: "service-006",
      lookName: "Skin Renewal Treatment"
    },
    {
      id: 7,
      name: "Camila Herrera",
      service: "Extensiones de Pestañas Volumen",
      vendor: "Lash Studio DR",
      beforeImage: "/transformations/before/lash-transformation-1-before.png",
      afterImage: "/transformations/after/lash-transformation-1-after.png",
      rating: 4.8,
      testimonial: "Mis pestañas se ven increíbles! Duran mucho tiempo y me ahorro maquillaje todos los días.",
      serviceId: "service-007",
      lookName: "Volume Lash Extensions"
    },
    {
      id: 8,
      name: "Daniela Morales",
      service: "Maquillaje Elegante Premium",
      vendor: "Belleza Natural",
      beforeImage: "/transformations/before/makeup-transformation-3-before.png",
      afterImage: "/transformations/after/makeup-transformation-3-after.png",
      rating: 4.9,
      testimonial: "Un look sofisticado y elegante. Me sentí como una modelo profesional en mi evento especial.",
      serviceId: "service-008",
      lookName: "Elegant Premium Look"
    }
  ]

  // Star professionals from real mock data
  const professionals = [
    {
      id: 1,
      name: "Carla Rodríguez",
      specialty: "Especialista en Color",
      salon: "Hair Salon Elite",
      vendorId: "vendor-profile-003",
      location: "Piantini",
      rating: 4.9,
      reviewCount: 156,
      yearsExperience: 8,
      avatar: "/professionals/portraits/hair-colorist-lucia.png",
      portfolioImages: [
        "/professionals/portfolios/carla-rodriguez/carla-portfolio-1.png",
        "/professionals/portfolios/carla-rodriguez/carla-portfolio-2.png",
        "/professionals/portfolios/carla-rodriguez/carla-portfolio-3.png",
        "/professionals/portfolios/carla-rodriguez/carla-portfolio-4.png"
      ],
      specialties: ["Balayage", "Colorimetría", "Cabello Rizado"],
      availableToday: true,
      nextAvailable: "Hoy 2:00 PM",
      signature: "Balayage Dorado Caribeño",
      price: "RD$4,500"
    },
    {
      id: 2,
      name: "Alejandra Santos",
      specialty: "Maquilladora Profesional",
      salon: "Glamour House",
      vendorId: "vendor-profile-001",
      location: "Zona Colonial",
      rating: 5.0,
      reviewCount: 89,
      yearsExperience: 6,
      avatar: "/professionals/portraits/bridal-makeup-artist-valentina.png",
      portfolioImages: [
        "/professionals/portfolios/alejandra-santos/alejandra-portfolio-1.png",
        "/professionals/portfolios/alejandra-santos/alejandra-portfolio-2.png",
        "/professionals/portfolios/alejandra-santos/alejandra-portfolio-3.png",
        "/professionals/portfolios/alejandra-santos/alejandra-portfolio-4.png"
      ],
      specialties: ["Maquillaje de Novia", "Eventos", "Editorial"],
      availableToday: false,
      nextAvailable: "Mañana 10:00 AM",
      signature: "Glamour Tropical Night",
      price: "RD$3,500"
    },
    {
      id: 3,
      name: "Gabriela Méndez",
      specialty: "Terapeuta Facial",
      salon: "Spa Serenity",
      vendorId: "vendor-profile-004",
      location: "Bella Vista",
      rating: 4.8,
      reviewCount: 203,
      yearsExperience: 12,
      avatar: "/professionals/portraits/wellness-therapist-isabella.png",
      portfolioImages: [
        "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-1.png",
        "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-2.png",
        "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-3.png",
        "/professionals/portfolios/gabriela-mendez/gabriela-portfolio-4.png"
      ],
      specialties: ["Antiedad", "Acné", "Hidratación"],
      availableToday: true,
      nextAvailable: "Hoy 4:30 PM",
      signature: "Piel Radiante Caribeña",
      price: "RD$4,200"
    },
    {
      id: 4,
      name: "Patricia López",
      specialty: "Nail Artist",
      salon: "Nails Paradise",
      vendorId: "vendor-profile-002",
      location: "Naco",
      rating: 4.7,
      reviewCount: 178,
      yearsExperience: 5,
      avatar: "/professionals/portraits/nail-artist-sofia.png",
      portfolioImages: [
        "/professionals/portfolios/patricia-lopez/patricia-portfolio-1.png",
        "/professionals/portfolios/patricia-lopez/patricia-portfolio-2.png",
        "/professionals/portfolios/patricia-lopez/patricia-portfolio-3.png",
        "/professionals/portfolios/patricia-lopez/patricia-portfolio-4.png"
      ],
      specialties: ["Nail Art", "Gel X", "Decoraciones"],
      availableToday: true,
      nextAvailable: "Hoy 1:00 PM",
      signature: "Tropical Nail Art",
      price: "RD$1,800"
    }
  ]

  // Transform real vendor data to NearbyLocation format
  const transformVendorToNearbyLocation = (vendor: Vendor, index: number) => {
    // Get a featured service from the vendor
    const featuredService = vendor.services[0] || {
      name: "Servicio de belleza",
      price: 1000,
      duration: 60
    }
    
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
      localSpecialty: vendor.description || "Servicios de belleza profesionales"
    }
  }
  
  const nearbyLocations = nearbyVendors.map(transformVendorToNearbyLocation)

  const handleSearch = useCallback((query: string) => {
    // No longer navigate on search - headers now use SmartSearch
    // which handles suggestions and navigation separately
    console.log('Search query received:', query)
  }, [])

  const handleBookService = (serviceId: string) => {
    console.log("Book service:", serviceId)
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
    router.push(`/services/${categoryId}`)
  }

  const handleGetThisLook = (serviceId: string, lookName: string, vendorName: string) => {
    console.log("Get this look clicked:", { serviceId, lookName, vendorName, allVendorsCount: allVendors.length })
    
    // Find the exact vendor from the transformation
    const vendor = allVendors.find(v => v.name === vendorName)
    
    if (!vendor) {
      console.error("Could not find transformation vendor:", vendorName)
      toast.error("Lo sentimos, no pudimos encontrar este proveedor. Por favor, intenta más tarde.")
      return
    }
    
    // Create a custom service based on the transformation data
    const transformationServiceMap: Record<string, { category: string, price: number, duration: number }> = {
      "Balayage Dorado Caribeño": { category: "hair", price: 4500, duration: 180 },
      "Glamour Tropical Night": { category: "makeup", price: 3200, duration: 120 },
      "Dominican Blowout Perfecto": { category: "hair", price: 1800, duration: 90 },
      "Caribbean Paradise Nails": { category: "nails", price: 2500, duration: 120 },
      "Natural Daytime Glow": { category: "makeup", price: 2800, duration: 90 },
      "Skin Renewal Treatment": { category: "spa", price: 3500, duration: 90 },
      "Volume Lash Extensions": { category: "lashes", price: 3800, duration: 150 },
      "Elegant Premium Look": { category: "makeup", price: 3500, duration: 120 }
    }
    
    const serviceData = transformationServiceMap[lookName]
    
    if (!serviceData) {
      console.error("Unknown transformation service:", lookName)
      toast.error("Lo sentimos, no pudimos encontrar este servicio. Por favor, intenta más tarde.")
      return
    }
    
    // Create the exact transformation service
    const transformationService: VendorService = {
      id: `transformation-${serviceId}`,
      name: lookName, // Exact transformation service name
      description: `Servicio especializado de transformación: ${lookName}`,
      category: serviceData.category,
      price: serviceData.price,
      duration: serviceData.duration,
      isPopular: true,
      image: "/service-placeholder.jpg"
    }
    
    console.log("Created transformation service:", transformationService.name, "for vendor:", vendor.name)
    setSelectedVendor(vendor)
    setSelectedService(transformationService)
    setShowBookingModal(true)
    toast.success(`¡Perfecto! Reserva tu ${transformationService.name} con ${vendor.name}`)
  }

  const handleBookProfessional = (professionalId: number) => {
    console.log("Book professional:", professionalId)
    router.push(`/booking/professional/${professionalId}`)
  }

  const handleViewVendor = (professionalId: number) => {
    console.log("View vendor for professional:", professionalId)
    const professional = professionals.find(p => p.id === professionalId)
    if (professional?.vendorId) {
      router.push(`/vendor/${professional.vendorId}`)
    }
  }

  const handleGetDirections = (locationId: string) => {
    console.log("Get directions to:", locationId)
    // TODO: Integrate with maps service
  }

  const handleCallLocation = (phone: string) => {
    console.log("Call location:", phone)
    window.open(`tel:${phone}`)
  }

  const handleBookLocation = (locationId: string) => {
    console.log("Book location called with ID:", locationId, "Type:", typeof locationId)
    console.log("Available nearby vendors:", nearbyVendors.map(v => ({ id: v.id, name: v.name })))
    
    const vendor = nearbyVendors.find(v => v.id === locationId)
    console.log("Found vendor:", vendor ? vendor.name : "None")
    
    if (vendor && vendor.services.length > 0) {
      console.log("Setting booking modal with vendor:", vendor.name, "Service:", vendor.services[0].name)
      setSelectedVendor(vendor)
      setSelectedService(vendor.services[0])
      setShowBookingModal(true)
    } else {
      console.log("No vendor found or vendor has no services")
    }
  }
  
  const handleBookingComplete = (booking: any) => {
    console.log("Booking completed:", booking)
    setShowBookingModal(false)
    setSelectedVendor(null)
    setSelectedService(null)
    router.push('/bookings')
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
      {/* Headers */}
      <MobileHeader />
      <DesktopHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Service Categories */}
      <section className="px-4 py-12 bg-femfuel-purple">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-femfuel-dark mb-8 text-center">Categorías Populares</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} onClick={handleCategoryClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Transformations Showcase */}
      <TransformationsShowcase 
        transformations={transformations}
        onGetThisLook={handleGetThisLook}
      />

      {/* Star Professionals */}
      <StarProfessionals 
        professionals={professionals}
        onViewVendor={handleViewVendor}
      />

      {/* Nearby Beauty */}
      <NearbyBeauty 
        locations={nearbyLocations}
        userLocation="Piantini, Santo Domingo"
        onGetDirections={handleGetDirections}
        onCallLocation={handleCallLocation}
        onBookLocation={handleBookLocation}
      />

      {/* Featured Services - Redesigned Premium Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-50 via-white to-femfuel-light/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
              Recomendados para ti
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Descubre los servicios más populares con nuestros mejores especialistas
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
                  <ServiceCard key={service.id} service={service} layout="horizontal" onViewProviders={handleViewProviders} />
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
                    <ServiceCard key={service.id} service={service} layout="vertical" onViewProviders={handleViewProviders} />
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
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
  )
}