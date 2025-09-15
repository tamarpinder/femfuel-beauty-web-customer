"use client"

import { useState } from "react"
import { Star, Clock, Crown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { BookingModal } from "@/components/booking-modal"
import { OptimizedImage } from "@/components/ui/optimized-image"

export interface MarketplaceService {
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
  service: MarketplaceService
  layout?: "horizontal" | "vertical"
  vendorId?: string
  vendorName?: string
  vendorRating?: number
  onViewProviders?: (serviceId: string) => void
  onBook?: (serviceId: string) => void
}

export function ServiceCard({ service, layout = "vertical", vendorId, vendorName, vendorRating, onViewProviders, onBook }: ServiceCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Use explicit vendor props or fallback to service featuredProvider
  const effectiveVendorId = vendorId || service.featuredProvider?.id
  const effectiveVendorName = vendorName || service.featuredProvider?.name
  const effectiveVendorRating = vendorRating || service.rating

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
                <div className="mb-3">
                  <h3 className="font-bold text-femfuel-dark text-lg mb-2">{service.name}</h3>
                  {service.featuredProvider && (
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-femfuel-dark mb-1">{service.featuredProvider.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.9</span>
                        </div>
                        <span className="text-femfuel-medium">•</span>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                          Top Rated
                        </Badge>
                        <span className="text-femfuel-medium">•</span>
                        <span className="text-femfuel-medium">Piantini</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="font-bold text-femfuel-rose text-base">{service.price}</p>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded px-2 py-1">
                      <span className="font-semibold text-orange-700 text-xs">{service.availableProviders} especialistas disponibles</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="glassmorphism-button-perfect w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewProviders()
                  }}
                >
                  Reservar Ahora
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          service={service}
          vendorId={effectiveVendorId}
          vendorName={effectiveVendorName}
          vendorRating={effectiveVendorRating}
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
              <h3 className="font-bold text-femfuel-dark text-xl mb-3">{service.name}</h3>
              
              {service.featuredProvider && (
                <div className="mb-4">
                  <p className="text-base font-semibold text-femfuel-dark mb-2">{service.featuredProvider.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.9</span>
                    </div>
                    <span className="text-femfuel-medium">•</span>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                      Top Rated
                    </Badge>
                    <span className="text-femfuel-medium">•</span>
                    <span className="text-femfuel-medium">Piantini</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <p className="text-lg font-bold text-femfuel-rose">{service.price}</p>
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-lg px-3 py-2">
                  <span className="font-semibold text-orange-700">{service.availableProviders} especialistas disponibles</span>
                </div>
              </div>
            </div>
            
            <button 
              className="glassmorphism-button-perfect w-full"
              onClick={(e) => {
                e.stopPropagation()
                handleViewProviders()
              }}
            >
              Ver Este Servicio
            </button>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        service={service}
        vendorId={effectiveVendorId}
        vendorName={effectiveVendorName}
        vendorRating={effectiveVendorRating}
        onBookingComplete={handleBookingComplete}
      />
    </>
  )
}
