"use client"

import { useRouter } from "next/navigation"
import { Sparkles, Palette, Droplets, Flower2, Scissors, Eye } from "lucide-react"
import { ServiceCard, type Service } from "@/components/service-card"
import { CategoryCard, type Category } from "@/components/category-card"
import { MobileHeader } from "@/components/mobile-header"
import { DesktopHeader } from "@/components/desktop-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { HeroSection } from "@/components/hero-section"
import { TrendingPills } from "@/components/trending-pills"

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

  const trendingServices = ["Balayage", "Microblading", "Lash Lift", "Gel X", "Dermaplaning"]

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    } else {
      router.push("/search")
    }
  }

  const handleBookService = (serviceId: number) => {
    console.log("Book service:", serviceId)
    // TODO: Implement booking flow
  }

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/search?category=${encodeURIComponent(categoryName)}`)
  }

  const handleTrendingClick = (service: string) => {
    router.push(`/search?q=${encodeURIComponent(service)}`)
  }

  const handleTabChange = (tab: "home" | "search" | "bookings" | "profile") => {
    if (tab === "search") {
      router.push("/search")
    }
    // TODO: Handle other navigation
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

      {/* Featured Services */}
      <section className="px-4 py-12">
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

      {/* Trending Services */}
      <TrendingPills services={trendingServices} onServiceClick={handleTrendingClick} />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="home" onTabChange={handleTabChange} />
    </div>
  )
}
