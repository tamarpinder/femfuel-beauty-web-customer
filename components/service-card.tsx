"use client"

import { useState } from "react"
import { Star, Clock, Crown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { BookingModal } from "@/components/booking-modal"
import { OptimizedImage } from "@/components/ui/optimized-image"

export interface Service {
  id: string
  name: string
  price: string
  rating: number
  reviews?: number
  reviewCount?: number
  duration: number | string
  avgDuration?: number
  image?: string
  category?: string
  description?: string
  isPopular?: boolean
  addons?: any[]
  // Transformation images
  beforeAfter?: {
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }
  // Marketplace-specific fields
  featuredProvider?: {
    id: string
    name: string
    isSponsored?: boolean
    sponsorshipLevel?: 'destacado' | 'recomendado' | 'premium'
  }
  availableProviders?: number
  priceRange?: {
    min: number
    max: number
  }
  slug?: string
}

interface ServiceCardProps {
  service: Service
  layout?: "horizontal" | "vertical"
  onViewProviders?: (serviceId: string) => void
  onBook?: (serviceId: string) => void
}

export function ServiceCard({ service, layout = "vertical", onViewProviders, onBook }: ServiceCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const handleViewProviders = () => {
    onViewProviders?.(service.id)
  }

  const handleBook = () => {
    setShowBookingModal(true)
    onBook?.(service.id)
  }

  const handleBookingComplete = (booking: any) => {
    console.log("Booking completed:", booking)
  }

  if (layout === "horizontal") {
    return (
      <>
        <Card className="overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-femfuel-rose/20 bg-white">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="w-24 h-20 relative flex-shrink-0">
                <OptimizedImage
                  src={service.image || "/services/hair/modern-haircut.png"}
                  alt={service.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  context={service.category || "service"}
                  quality={85}
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-femfuel-dark text-base mb-1">{service.name}</h3>
                    {service.featuredProvider && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-femfuel-rose/10 flex items-center justify-center">
                          <Crown className="h-2.5 w-2.5 text-femfuel-rose" />
                        </div>
                        <span className="text-sm text-femfuel-medium">{service.featuredProvider.name}</span>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                          Recomendado
                        </Badge>
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-femfuel-rose text-lg whitespace-nowrap ml-3">{service.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-femfuel-medium">
                    {service.availableProviders} especialistas disponibles
                  </span>
                  <button
                    className="glassmorphism-button-perfect"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewProviders()
                    }}
                  >
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          service={service}
          onBookingComplete={handleBookingComplete}
        />
      </>
    )
  }

  return (
    <>
      <Card className="overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-femfuel-rose/20 hover:-translate-y-1 bg-white group">
        <CardContent className="p-0">
          <div className="relative w-full h-48 overflow-hidden">
            <OptimizedImage
              src={service.image || "/services/hair/modern-haircut.png"}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              context={service.category || "service"}
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="font-bold text-femfuel-dark text-lg mb-2">{service.name}</h3>
              {service.featuredProvider && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-femfuel-rose/10 flex items-center justify-center">
                    <Crown className="h-4 w-4 text-femfuel-rose" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-femfuel-dark">{service.featuredProvider.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                        Top Rated
                      </Badge>
                      <span className="text-xs text-femfuel-medium">Piantini</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-femfuel-rose">{service.price}</span>
                <p className="text-sm text-femfuel-medium mt-1">
                  {service.availableProviders} especialistas disponibles
                </p>
              </div>
              <button 
                className="glassmorphism-button-perfect"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewProviders()
                }}
              >
                Ver Este Servicio
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        service={service}
        onBookingComplete={handleBookingComplete}
      />
    </>
  )
}
