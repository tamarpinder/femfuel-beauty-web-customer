"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getFeaturedVendors } from "@/lib/vendors-api"
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

export default function HomePage() {
  const router = useRouter()
  const [featuredServices, setFeaturedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  // Load real vendor data on component mount
  useEffect(() => {
    async function loadFeaturedServices() {
      try {
        const vendors = await getFeaturedVendors(6)
        
        // Transform vendor services into featured services - get more than 3 for variety
        const allPopularServices: Service[] = []
        vendors.forEach((vendor: any) => {
          vendor.services?.forEach((service: any) => {
            if (service.isPopular) {
              allPopularServices.push({
                id: service.id,
                name: service.name,
                vendor: vendor.name,
                price: `RD$${service.price?.toLocaleString()}`,
                rating: vendor.rating,
                reviews: vendor.reviewCount,
                duration: service.duration,
                image: service.image || "/premium-gel-manicure.png",
              })
            }
          })
        })

        // Sort by rating and take top 6 for variety
        const topServices = allPopularServices
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6)

        setFeaturedServices(topServices)
      } catch (error) {
        console.error('Error loading featured services:', error)
        // Keep services empty to show loading state or retry
        setFeaturedServices([])
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
      count: "45+",
      bannerImage: "/categories/nails-category-banner.png"
    },
    { 
      name: "Maquillaje", 
      icon: Palette, 
      count: "32+",
      bannerImage: "/categories/makeup-category-banner.png"
    },
    { 
      name: "Cuerpo", 
      icon: User, 
      count: "28+",
      bannerImage: "/categories/body-category-banner.png"
    },
    { 
      name: "Spa", 
      icon: Flower2, 
      count: "35+",
      bannerImage: "/categories/spa-category-banner.png"
    },
    { 
      name: "Peinados", 
      icon: Scissors, 
      count: "40+",
      bannerImage: "/categories/hair-category-banner.png"
    },
    { 
      name: "Pestañas", 
      icon: Eye, 
      count: "25+",
      bannerImage: "/categories/lashes-category-banner.png"
    },
  ]

  // Generate transformations from real mock data - ALL 8 transformation sets
  const transformations = [
    {
      id: 1,
      name: "Isabella Martínez",
      service: "Balayage Dorado Caribeño",
      vendor: "Salon Elite DR",
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
      vendor: "Beauty Studio Elite",
      beforeImage: "/transformations/before/makeup-transformation-1-before.png",
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
      vendor: "Hair Salon Elite",
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
      vendor: "Nails Paradise",
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
      vendor: "Makeup Studio Elite",
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
      vendor: "Spa Paradise",
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
      vendor: "Lash Studio Elite",
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
      salon: "Salon Elite DR",
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
      salon: "Beauty Studio Elite",
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
      salon: "Spa Bella Vista",
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
      salon: "Nails & More RD",
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

  // Sample nearby locations data
  const nearbyLocations = [
    {
      id: 1,
      name: "Salon Elite Santo Domingo",
      type: "Salon de Belleza Premium",
      address: "Av. Winston Churchill 78",
      neighborhood: "Piantini",
      distance: "0.8 km",
      travelTime: "3",
      rating: 4.9,
      reviewCount: 245,
      specialties: ["Balayage", "Cortes", "Extensiones", "Color"],
      openNow: true,
      closingTime: "8:00 PM",
      phone: "+1 809-555-0123",
      image: "/services/hair/hair-coloring-session.png",
      featuredService: {
        name: "Balayage Dorado Caribeño",
        price: "RD$3,500",
        duration: "2.5 hrs"
      },
      localSpecialty: "Técnicas de coloración para clima tropical"
    },
    {
      id: 2,
      name: "Glamour House",
      type: "Estudio de Maquillaje",
      address: "Calle José Reyes 45",
      neighborhood: "Zona Colonial",
      distance: "1.2 km",
      travelTime: "5",
      rating: 4.8,
      reviewCount: 189,
      specialties: ["Maquillaje de Novia", "Eventos", "Editorial"],
      openNow: true,
      closingTime: "9:00 PM",
      phone: "+1 809-555-0124",
      image: "/services/makeup/bridal-makeup-application.png",
      featuredService: {
        name: "Glamour Tropical Night",
        price: "RD$2,800",
        duration: "1.5 hrs"
      },
      localSpecialty: "Maquillaje resistente al calor caribeño"
    },
    {
      id: 3,
      name: "Spa Paradise",
      type: "Spa & Wellness",
      address: "Av. Máximo Gómez 67",
      neighborhood: "Bella Vista",
      distance: "2.1 km",
      travelTime: "7",
      rating: 4.7,
      reviewCount: 203,
      specialties: ["Faciales", "Masajes", "Hidratación"],
      openNow: false,
      closingTime: "6:00 PM",
      phone: "+1 809-555-0125",
      image: "/services/spa/hot-stone-massage.png",
      featuredService: {
        name: "Piel Radiante Caribeña",
        price: "RD$4,200",
        duration: "2 hrs"
      },
      localSpecialty: "Tratamientos con ingredientes naturales dominicanos"
    },
    {
      id: 4,
      name: "Beauty Studio RD",
      type: "Nail Art Studio",
      address: "Plaza Central, Local 15",
      neighborhood: "Naco",
      distance: "1.5 km",
      travelTime: "4",
      rating: 4.6,
      reviewCount: 156,
      specialties: ["Nail Art", "Gel X", "Pedicure"],
      openNow: true,
      closingTime: "7:30 PM",
      phone: "+1 809-555-0126",
      image: "/services/nails/tropical-nail-art.png",
      featuredService: {
        name: "Tropical Nail Art",
        price: "RD$1,800",
        duration: "1 hr"
      },
      localSpecialty: "Diseños inspirados en la flora dominicana"
    },
    {
      id: 5,
      name: "Estética Los Corales",
      type: "Centro de Belleza",
      address: "Calle Santiago 123",
      neighborhood: "Gazcue",
      distance: "2.8 km",
      travelTime: "9",
      rating: 4.5,
      reviewCount: 134,
      specialties: ["Depilación", "Cejas", "Microblading"],
      openNow: true,
      closingTime: "8:30 PM",
      phone: "+1 809-555-0127",
      image: "/services/lashes/skilled-eyebrow-artist.png",
      featuredService: {
        name: "Microblading Natural",
        price: "RD$6,500",
        duration: "3 hrs"
      },
      localSpecialty: "Técnicas adaptadas a tonos de piel caribeños"
    },
    {
      id: 6,
      name: "Rizos & Ondas",
      type: "Especialistas en Cabello Rizado",
      address: "Av. Abraham Lincoln 234",
      neighborhood: "Piantini",
      distance: "1.1 km",
      travelTime: "4",
      rating: 4.8,
      reviewCount: 198,
      specialties: ["Cabello Rizado", "Tratamientos", "Cortes"],
      openNow: false,
      closingTime: "6:30 PM",
      phone: "+1 809-555-0128",
      image: "/services/hair/hair-treatment-session.png",
      featuredService: {
        name: "Definición de Rizos Naturales",
        price: "RD$2,200",
        duration: "1.5 hrs"
      },
      localSpecialty: "Expertos en texturas de cabello afrocaribeño"
    }
  ]

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    } else {
      router.push("/search")
    }
  }

  const handleBookService = (serviceId: string) => {
    console.log("Book service:", serviceId)
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

  const handleGetThisLook = (serviceId: string, lookName: string) => {
    console.log("Get this look:", { serviceId, lookName })
    router.push(`/search?service=${serviceId}&look=${encodeURIComponent(lookName)}`)
  }

  const handleBookProfessional = (professionalId: number) => {
    console.log("Book professional:", professionalId)
    router.push(`/booking/professional/${professionalId}`)
  }

  const handleViewPortfolio = (professionalId: number) => {
    console.log("View portfolio:", professionalId)
    router.push(`/professional/${professionalId}/portfolio`)
  }

  const handleGetDirections = (locationId: number) => {
    console.log("Get directions to:", locationId)
    // TODO: Integrate with maps service
  }

  const handleCallLocation = (phone: string) => {
    console.log("Call location:", phone)
    window.open(`tel:${phone}`)
  }

  const handleBookLocation = (locationId: number) => {
    console.log("Book location:", locationId)
    router.push(`/booking/location/${locationId}`)
  }

  const handleTabChange = (tab: "home" | "search" | "bookings" | "shop" | "profile") => {
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
      <MobileHeader onSearch={handleSearch} />
      <DesktopHeader onSearch={handleSearch} />

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
        onBookNow={handleBookProfessional}
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

      {/* Featured Services */}
      <section className="px-4 py-12 bg-gradient-to-br from-femfuel-light to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-femfuel-dark mb-8 text-center">Recomendados para ti</h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-femfuel-rose mx-auto"></div>
              <p className="text-femfuel-medium mt-2">Cargando servicios populares...</p>
            </div>
          ) : featuredServices.length > 0 ? (
            <>
              {/* Mobile Layout - Horizontal Cards */}
              <div className="md:hidden space-y-4">
                {featuredServices.slice(0, 4).map((service) => (
                  <ServiceCard key={service.id} service={service} layout="horizontal" onBook={handleBookService} />
                ))}
              </div>

              {/* Desktop Layout - Vertical Cards */}
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredServices.slice(0, 8).map((service) => (
                  <ServiceCard key={service.id} service={service} layout="vertical" onBook={handleBookService} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-femfuel-medium">No hay servicios disponibles en este momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Desktop Footer */}
      <CustomerFooter />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="home" onTabChange={handleTabChange} />
    </div>
  )
}