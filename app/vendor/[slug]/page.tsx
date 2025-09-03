"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Phone, Clock, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceCard } from "@/components/service-card"
import { MobileNavigation } from "@/components/mobile-navigation"
import { BookingModal } from "@/components/booking-modal"
import { getVendorBySlug } from "@/lib/vendors-api"
import { Vendor, VendorService } from "@/types/vendor"

export default function VendorPage() {
  const params = useParams()
  const router = useRouter()
  const vendorSlug = params.slug as string
  
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState<VendorService | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVendor = async () => {
      setIsLoading(true)
      try {
        const vendorData = await getVendorBySlug(vendorSlug)
        setVendor(vendorData || null)
      } catch (error) {
        console.error('Error fetching vendor:', error)
        setVendor(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVendor()
  }, [vendorSlug])

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

  const handleBookingComplete = (booking: any) => {
    console.log("Booking completed:", booking)
    setShowBookingModal(false)
    setSelectedService(null)
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
          <Button onClick={() => router.push("/")} className="bg-femfuel-rose hover:bg-[#9f1853] text-white">
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-femfuel-dark truncate">{vendor.name}</h1>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={vendor.coverImage || "/placeholder.svg?height=320&width=800&query=beauty salon"}
          alt={`${vendor.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Floating Action */}
        <div className="absolute bottom-4 right-4">
          <Button size="sm" className="bg-femfuel-rose hover:bg-[#9f1853] text-white shadow-lg">
            <Phone className="h-4 w-4 mr-2" />
            Llamar
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Vendor Info Card */}
        <Card className="shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={vendor.logo || "/placeholder.svg?height=80&width=80&query=business logo"}
                alt={`${vendor.name} logo`}
                className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold text-femfuel-dark mb-1">{vendor.name}</h1>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-semibold">{vendor.rating}</span>
                        <span className="text-femfuel-medium">({vendor.reviewCount} reseñas)</span>
                      </div>
                      {vendor.professionalCount > 1 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-femfuel-medium" />
                          <span className="text-femfuel-medium">{vendor.professionalCount} profesionales</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {vendor.badges && vendor.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {vendor.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary">{badge}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-femfuel-medium mb-4">{vendor.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-femfuel-medium">
                      {vendor.location.address}, {vendor.location.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-femfuel-medium">
                      Hoy: {getTodayHours()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-femfuel-medium">
                      {vendor.availability.todayAvailable ? vendor.availability.nextSlot : "Sin disponibilidad hoy"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-femfuel-dark mb-4">
            Servicios ({vendor.serviceCount})
          </h2>

          {/* Category Filter */}
          {getUniqueCategories().length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-femfuel-rose" : ""}
              >
                Todos
              </Button>
              {getUniqueCategories().map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-femfuel-rose" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          )}

          {/* Services Grid */}
          {getFilteredServices().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredServices().map((service) => (
                <Card key={service.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={service.image || "/placeholder.svg?height=60&width=60&query=beauty service"}
                        alt={service.name}
                        className="w-15 h-15 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-femfuel-dark truncate">{service.name}</h3>
                            {service.isPopular && (
                              <Badge variant="secondary" className="text-xs mt-1">Popular</Badge>
                            )}
                          </div>
                          <span className="font-bold text-femfuel-rose ml-2">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-femfuel-medium mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-femfuel-medium">
                            <Clock className="h-4 w-4" />
                            <span>{service.duration} min</span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-femfuel-rose hover:bg-[#9f1853] text-white"
                            onClick={() => handleServiceBook(service.id)}
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                No hay servicios en esta categoría
              </h3>
              <p className="text-femfuel-medium">
                Intenta seleccionar otra categoría
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="search" />

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedService(null)
          }}
          service={{
            id: Math.abs(selectedService.id.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)),
            name: selectedService.name,
            vendor: vendor.name,
            price: formatPrice(selectedService.price),
            rating: vendor.rating,
            reviews: vendor.reviewCount,
            duration: selectedService.duration,
            image: selectedService.image
          }}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
  )
}