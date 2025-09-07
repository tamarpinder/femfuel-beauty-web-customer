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
    { name: "Uñas", icon: Hand, count: "45+" },
    { name: "Maquillaje", icon: Palette, count: "32+" },
    { name: "Cuerpo", icon: User, count: "28+" },
    { name: "Spa", icon: Flower2, count: "35+" },
    { name: "Peinados", icon: Scissors, count: "40+" },
    { name: "Pestañas", icon: Eye, count: "25+" },
  ]

  // Generate transformations from real mock data
  const transformations = [
    {
      id: 1,
      name: "Isabella Martínez",
      service: "Balayage Dorado Caribeño",
      vendor: "Salon Elite DR",
      beforeImage: "/transformation-before-1.jpg",
      afterImage: "/transformation-after-1.jpg",
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
      beforeImage: "/transformation-before-2.jpg",
      afterImage: "/transformation-after-2.jpg",
      rating: 4.9,
      testimonial: "El maquillaje duró toda la noche. Recibí tantos cumplidos en la fiesta. Definitivamente regreso.",
      serviceId: "service-002",
      lookName: "Glamour Tropical Night"
    },
    {
      id: 3,
      name: "Carmen Delgado",
      service: "Piel Radiante Caribeña",
      vendor: "Spa Bella Vista",
      beforeImage: "/transformation-before-3.jpg",
      afterImage: "/transformation-after-3.jpg",
      rating: 4.8,
      testimonial: "Mi piel se ve y se siente increíble. El tratamiento fue relajante y los resultados son visibles.",
      serviceId: "service-003",
      lookName: "Piel Radiante Caribeña"
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
      avatar: "/professional-1.jpg",
      portfolioImages: [
        "/portfolio-hair-1.jpg",
        "/portfolio-hair-2.jpg",
        "/portfolio-hair-3.jpg",
        "/portfolio-hair-4.jpg"
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
      avatar: "/professional-2.jpg",
      portfolioImages: [
        "/portfolio-makeup-1.jpg",
        "/portfolio-makeup-2.jpg",
        "/portfolio-makeup-3.jpg",
        "/portfolio-makeup-4.jpg"
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
      avatar: "/professional-3.jpg",
      portfolioImages: [
        "/portfolio-spa-1.jpg",
        "/portfolio-spa-2.jpg",
        "/portfolio-spa-3.jpg",
        "/portfolio-spa-4.jpg"
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
      avatar: "/professional-4.jpg",
      portfolioImages: [
        "/portfolio-nails-1.jpg",
        "/portfolio-nails-2.jpg",
        "/portfolio-nails-3.jpg",
        "/portfolio-nails-4.jpg"
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
      image: "/professional-makeup-artist.png",
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
      image: "/facial-treatment-spa.png",
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
      image: "/premium-gel-manicure.png",
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
      image: "/professional-makeup-artist.png",
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
      image: "/facial-treatment-spa.png",
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
      image: "/premium-gel-manicure.png",
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

  const handleBookService = (serviceId: number) => {
    console.log("Book service:", serviceId)
  }

  const handleCategoryClick = (categoryName: string) => {
    // Map Spanish names to slugs
    const categorySlugMap: { [key: string]: string } = {
      "Uñas": "unas",
      "Maquillaje": "maquillaje",
      "Cuerpo": "cuerpo", 
      "Spa": "spa",
      "Peinados": "peinados",
      "Pestañas": "pestañas"
    }
    const slug = categorySlugMap[categoryName] || categoryName.toLowerCase()
    router.push(`/category/${slug}`)
  }

  const handleGetThisLook = (serviceId: number, lookName: string) => {
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
      router.push("/search")
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