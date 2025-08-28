"use client"

import { useRouter } from "next/navigation"
import { Hand, Palette, User, Flower2, Scissors, Eye } from "lucide-react"
import { ServiceCard, type Service } from "@/components/service-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { MobileHeader } from "@/components/mobile-header"
import { DesktopHeader } from "@/components/desktop-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeroSection } from "@/components/hero-section"
import { TransformationsShowcase } from "@/components/transformations-showcase"
import { StarProfessionals } from "@/components/star-professionals"
import { NearbyBeauty } from "@/components/nearby-beauty"
import { CustomerFooter } from "@/components/customer-footer"

export default function HomePage() {
  const router = useRouter()

  const categories: Category[] = [
    { name: "Uñas", icon: Hand, count: "2,450" },
    { name: "Maquillaje", icon: Palette, count: "1,890" },
    { name: "Cuerpo", icon: User, count: "1,234" },
    { name: "Spa", icon: Flower2, count: "987" },
    { name: "Peinados", icon: Scissors, count: "1,567" },
    { name: "Pestañas", icon: Eye, count: "876" },
  ]

  const featuredServices: Service[] = [
    {
      id: 1,
      name: "Manicure Gel Premium",
      vendor: "Beauty Studio RD",
      price: "RD$1,200",
      rating: 4.8,
      reviews: 124,
      duration: 60,
      image: "/premium-gel-manicure.png",
    },
    {
      id: 2,
      name: "Maquillaje Profesional",
      vendor: "Glamour House",
      price: "RD$2,500",
      rating: 4.9,
      reviews: 89,
      duration: 90,
      image: "/professional-makeup-artist.png",
    },
    {
      id: 3,
      name: "Tratamiento Facial",
      vendor: "Spa Paradise",
      price: "RD$3,500",
      rating: 4.7,
      reviews: 156,
      duration: 75,
      image: "/facial-treatment-spa.png",
    },
  ]

  // Sample transformation data
  const transformations = [
    {
      id: 1,
      name: "Isabella Martínez",
      service: "Balayage + Corte",
      vendor: "Salon Elite Santo Domingo",
      beforeImage: "/placeholder.jpg",
      afterImage: "/professional-makeup-artist.png",
      rating: 5.0,
      testimonial: "¡Increíble! Me siento como una nueva persona. El balayage quedó perfecto y el corte me favorece muchísimo.",
      serviceId: 101,
      lookName: "Balayage Dorado Caribeño"
    },
    {
      id: 2,
      name: "María José Peña",
      service: "Maquillaje de Evento",
      vendor: "Glamour House",
      beforeImage: "/placeholder.jpg",
      afterImage: "/facial-treatment-spa.png",
      rating: 4.9,
      testimonial: "El maquillaje duró toda la noche. Recibí tantos cumplidos en la fiesta. Definitivamente regreso.",
      serviceId: 102,
      lookName: "Glamour Tropical Night"
    },
    {
      id: 3,
      name: "Carmen Delgado",
      service: "Tratamiento Facial Antiedad",
      vendor: "Spa Paradise",
      beforeImage: "/placeholder.jpg",
      afterImage: "/premium-gel-manicure.png",
      rating: 4.8,
      testimonial: "Mi piel se ve y se siente increíble. El tratamiento fue relajante y los resultados son visibles.",
      serviceId: 103,
      lookName: "Piel Radiante Caribeña"
    }
  ]

  // Sample professionals data
  const professionals = [
    {
      id: 1,
      name: "Carla Rodríguez",
      specialty: "Especialista en Color",
      salon: "Salon Elite Santo Domingo",
      location: "Zona Colonial",
      rating: 4.9,
      reviewCount: 156,
      yearsExperience: 8,
      avatar: "/placeholder-user.jpg",
      portfolioImages: [
        "/professional-makeup-artist.png",
        "/facial-treatment-spa.png",
        "/premium-gel-manicure.png",
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg"
      ],
      specialties: ["Balayage", "Colorimetría", "Cabello Rizado"],
      availableToday: true,
      nextAvailable: "Hoy 2:00 PM",
      signature: "Balayage Dorado Caribeño",
      price: "RD$3,500"
    },
    {
      id: 2,
      name: "Alejandra Santos",
      specialty: "Maquilladora Profesional",
      salon: "Glamour House",
      location: "Piantini",
      rating: 5.0,
      reviewCount: 89,
      yearsExperience: 6,
      avatar: "/placeholder-user.jpg",
      portfolioImages: [
        "/facial-treatment-spa.png",
        "/professional-makeup-artist.png",
        "/premium-gel-manicure.png",
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg"
      ],
      specialties: ["Maquillaje de Novia", "Eventos", "Editorial"],
      availableToday: false,
      nextAvailable: "Mañana 10:00 AM",
      signature: "Glamour Tropical Night",
      price: "RD$2,800"
    },
    {
      id: 3,
      name: "Gabriela Méndez",
      specialty: "Terapeuta Facial",
      salon: "Spa Paradise",
      location: "Bella Vista",
      rating: 4.8,
      reviewCount: 203,
      yearsExperience: 12,
      avatar: "/placeholder-user.jpg",
      portfolioImages: [
        "/premium-gel-manicure.png",
        "/facial-treatment-spa.png",
        "/professional-makeup-artist.png",
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg"
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
      salon: "Beauty Studio RD",
      location: "Naco",
      rating: 4.7,
      reviewCount: 178,
      yearsExperience: 5,
      avatar: "/placeholder-user.jpg",
      portfolioImages: [
        "/professional-makeup-artist.png",
        "/premium-gel-manicure.png",
        "/facial-treatment-spa.png",
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg"
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

          {/* Mobile Layout - Horizontal Cards */}
          <div className="md:hidden space-y-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} layout="horizontal" onBook={handleBookService} />
            ))}
          </div>

          {/* Desktop Layout - Vertical Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} layout="vertical" onBook={handleBookService} />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Footer */}
      <CustomerFooter />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="home" onTabChange={handleTabChange} />
    </div>
  )
}