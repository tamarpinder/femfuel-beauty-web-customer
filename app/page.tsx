"use client"

import { useRouter } from "next/navigation"
import { Sparkles, Palette, Droplets, Flower2, Scissors, Eye } from "lucide-react"
import { ServiceCard, type Service } from "@/components/service-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { MobileHeader } from "@/components/mobile-header"
import { DesktopHeader } from "@/components/desktop-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeroSection } from "@/components/hero-section"
import { TransformationsShowcase } from "@/components/transformations-showcase"
import { StarProfessionals } from "@/components/star-professionals"

export default function HomePage() {
  const router = useRouter()

  const categories: Category[] = [
    { name: "Uñas", icon: Sparkles, count: "2,450" },
    { name: "Maquillaje", icon: Palette, count: "1,890" },
    { name: "Facial", icon: Droplets, count: "1,234" },
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
    router.push(`/search?category=${encodeURIComponent(categoryName)}`)
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

  const handleTabChange = (tab: "home" | "search" | "bookings" | "profile") => {
    if (tab === "search") {
      router.push("/search")
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

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="home" onTabChange={handleTabChange} />
    </div>
  )
}