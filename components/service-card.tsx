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
  onViewVendor?: (vendorId: string) => void
}

export function ServiceCard({ service, layout = "vertical", vendorId, vendorName, vendorRating, onViewProviders, onBook, onViewVendor }: ServiceCardProps) {
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
  }

  if (layout === "horizontal") {
    return (
      <>
        <Card className="overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-femfuel-rose/20 bg-white">
          <CardContent className="p-0">
            <div className="flex items-center gap-3 p-3">
              {/* Service Image - Fixed 90px square */}
              <div className="w-[90px] h-[90px] relative flex-shrink-0 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={service.image || "/services/hair/modern-haircut.png"}
                  alt={service.name}
                  fill
                  sizes="90px"
                  className="object-cover"
                  context={service.category || "service"}
                  quality={85}
                />
              </div>

              {/* Service Info - Compact */}
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-semibold text-femfuel-dark text-sm line-clamp-2">{service.name}</h3>

                {service.featuredProvider && (
                  <p
                    className="text-xs text-femfuel-medium hover:text-femfuel-rose hover:underline transition-colors cursor-pointer truncate"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewVendor?.(service.featuredProvider!.id)
                    }}
                  >
                    {service.featuredProvider.name}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-femfuel-medium">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{service.duration}min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-base font-bold text-femfuel-dark">{service.price}</p>
                </div>

                <button
                  className="glassmorphism-button-perfect w-full h-9 text-sm"
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
          {/* Image with Floating Price Badge */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <OptimizedImage
              src={service.image || "/services/hair/modern-haircut.png"}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              context={service.category || "service"}
              priority={false}
            />
            {/* Glassmorphism Price Badge */}
            <div className="absolute top-3 right-3 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-full shadow-lg">
              <p className="text-sm font-bold text-femfuel-dark">{service.price}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-femfuel-dark text-base line-clamp-2">{service.name}</h3>

            {service.featuredProvider && (
              <p
                className="text-xs text-femfuel-medium hover:text-femfuel-rose hover:underline transition-colors cursor-pointer truncate"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewVendor?.(service.featuredProvider!.id)
                }}
              >
                {service.featuredProvider.name}
              </p>
            )}

            {/* Rating + Specialists Combined */}
            <div className="flex items-center gap-2 text-xs text-femfuel-medium">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9</span>
              </div>
              <span>•</span>
              <span>{service.availableProviders} especialistas</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 text-xs text-femfuel-medium">
              <Clock className="h-3 w-3" />
              <span>{service.duration} minutos</span>
            </div>

            <button
              className="glassmorphism-button-perfect w-full h-10 text-sm mt-3"
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
