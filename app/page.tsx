"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { getMarketplaceServices, getVendors } from "@/lib/vendors-api"
import { getAllProfessionals, ProfessionalWithVendor } from "@/lib/getAllProfessionals"
import { Hand, Palette, User, Flower2, Scissors, Eye } from "lucide-react"
import { ServiceCard, type MarketplaceService } from "@/components/service-card"
import { CategoryCard, type Category } from "@/components/category-card"
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
  const [featuredServices, setFeaturedServices] = useState<MarketplaceService[]>([])
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
        const featuredServices: MarketplaceService[] = marketplaceServices
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

  const categories: Category[] = [
    {
      name: "Uñas",
      icon: Hand,
      count: "37",
      bannerImage: "/categories/banners/nailcare-banner.png"
    },
    {
      name: "Maquillaje",
      icon: Palette,
      count: "36",
      bannerImage: "/categories/banners/makeup-banner.png"
    },
    {
      name: "Cuerpo",
      icon: User,
      count: "0",
      bannerImage: "/categories/banners/bodycare-banner.png"
    },
    {
      name: "Spa",
      icon: Flower2,
      count: "26",
      bannerImage: "/categories/banners/skincare-banner.png"
    },
    {
      name: "Peinados",
      icon: Scissors,
      count: "53",
      bannerImage: "/categories/banners/haircare-banner.png"
    },
    {
      name: "Pestañas",
      icon: Eye,
      count: "35",
      bannerImage: "/categories/lashes-category-banner.png"
    },
  ]

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

  // Get Star Professionals from real VendorAdapter professionals
  const getStarProfessionals = useCallback(() => {
    const allProfessionals = getAllProfessionals()


    // Portfolio structure mapped to real professionals with correct names and slugs
    const portfolioStructure = [
      {
        name: "Ana Rodríguez",
        slug: "ana-rodrguez", // Correct slug with accents
        category: "hair",
        portfolioImages: [
          "/professionals/portfolios/ana-rodrguez/carla-portfolio-1.png",
          "/professionals/portfolios/ana-rodrguez/carla-portfolio-2.png",
          "/professionals/portfolios/ana-rodrguez/carla-portfolio-3.png",
          "/professionals/portfolios/ana-rodrguez/carla-portfolio-4.png"
        ],
        avatar: "/professionals/portraits/hair-colorist-lucia.png",
        signature: "Balayage Dorado Caribeño",
        price: "RD$4,500"
      },
      {
        name: "Alejandra Santos",
        slug: "alejandra-santos",
        category: "makeup",
        portfolioImages: [
          "/professionals/portfolios/alejandra-santos/alejandra-portfolio-1.png",
          "/professionals/portfolios/alejandra-santos/alejandra-portfolio-2.png",
          "/professionals/portfolios/alejandra-santos/alejandra-portfolio-3.png",
          "/professionals/portfolios/alejandra-santos/alejandra-portfolio-4.png"
        ],
        avatar: "/professionals/portraits/bridal-makeup-artist-valentina.png",
        signature: "Glamour Tropical Night",
        price: "RD$3,500"
      },
      {
        name: "Isabella Martínez",
        slug: "isabella-martnez", // Correct slug with accents
        category: "spa",
        portfolioImages: [
          "/professionals/portfolios/isabella-martnez/gabriela-portfolio-1.png",
          "/professionals/portfolios/isabella-martnez/gabriela-portfolio-2.png",
          "/professionals/portfolios/isabella-martnez/gabriela-portfolio-3.png",
          "/professionals/portfolios/isabella-martnez/gabriela-portfolio-4.png"
        ],
        avatar: "/professionals/portraits/wellness-therapist-isabella.png",
        signature: "Piel Radiante Caribeña",
        price: "RD$4,200"
      },
      {
        name: "Maria Rodriguez",
        slug: "maria-rodriguez",
        category: "nails",
        portfolioImages: [
          "/professionals/portfolios/maria-rodriguez/patricia-portfolio-1.png",
          "/professionals/portfolios/maria-rodriguez/patricia-portfolio-2.png",
          "/professionals/portfolios/maria-rodriguez/patricia-portfolio-3.png",
          "/professionals/portfolios/maria-rodriguez/patricia-portfolio-4.png"
        ],
        avatar: "/professionals/portraits/nail-artist-sofia.png",
        signature: "Tropical Nail Art",
        price: "RD$1,800"
      }
    ]

    // Find real professionals by exact name matching
    const findProfessionalByName = (targetName: string) => {
      return allProfessionals.find(prof =>
        prof.name === targetName
      )
    }

    // Build result using real professionals mapped to portfolio structure
    const starProfessionals: any[] = []

    portfolioStructure.forEach(portfolioItem => {
      const realProfessional = findProfessionalByName(portfolioItem.name)

      if (realProfessional) {
        starProfessionals.push({
          id: portfolioItem.slug,
          name: realProfessional.name,
          image: portfolioItem.avatar,
          rating: realProfessional.rating,
          reviewCount: realProfessional.reviewCount,
          yearsExperience: realProfessional.yearsExperience,
          monthlyBookings: realProfessional.monthlyBookings,
          specialties: realProfessional.specialties,
          recommendedAddons: realProfessional.recommendedAddons || [],
          bio: realProfessional.bio,
          isTopRated: realProfessional.isTopRated,
          nextAvailable: realProfessional.nextAvailable || (portfolioItem.category === 'makeup' ? "Mañana 10:00 AM" : "Hoy 2:00 PM"),
          vendorId: realProfessional.vendor.slug,
          vendorName: realProfessional.vendor.name,
          vendorSlug: realProfessional.vendor.slug,
          portfolio: {
            images: portfolioItem.portfolioImages,
            signature: {
              serviceName: portfolioItem.signature,
              price: portfolioItem.price,
              description: `Especialidad exclusiva de ${realProfessional.name}`,
              duration: 120
            }
          }
        })
      }
    })

    return starProfessionals
  }, [])

  const professionals = getStarProfessionals()

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
        onViewPortfolio={handleViewPortfolio}
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
              Recomendaciones para ti
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Descubre los servicios más populares con la experiencia de nuestros mejores especialistas
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
          vendorId={selectedVendor.id}
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

    </div>
  )
}