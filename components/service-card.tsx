"use client"

import { useState } from "react"
import { Star, Clock, Crown, Users, TrendingUp, Sparkles } from "lucide-react"
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
  // Phase 7: Personalization fields
  badge?: 'trending' | 'top-rated' | 'new'
  bookingsToday?: number
  slotsAvailable?: number
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

  // Badge configuration
  const getBadgeConfig = (badgeType: string) => {
    switch (badgeType) {
      case 'trending':
        return {
          icon: TrendingUp,
          label: 'Tendencia',
          className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
        }
      case 'top-rated':
        return {
          icon: Star,
          label: 'Top Rated',
          className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
        }
      case 'new':
        return {
          icon: Sparkles,
          label: 'Nuevo',
          className: 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
        }
      default:
        return null
    }
  }

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
        <Card className="overflow-hidden border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 bg-white rounded-2xl">
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
                  className="w-full min-h-[44px] text-sm px-4 py-2 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewProviders()
                  }}
                  aria-label={`Reservar ${service.name}`}
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
      <Card className="overflow-hidden border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 bg-white group rounded-2xl">
        <CardContent className="p-0">
          {/* Image with Floating Price Badge and Status Badge */}
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

            {/* Service Badge (Trending, Top Rated, New) */}
            {service.badge && (() => {
              const badgeConfig = getBadgeConfig(service.badge)
              if (!badgeConfig) return null
              const BadgeIcon = badgeConfig.icon
              return (
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl ${badgeConfig.className} animate-pulse`}>
                  <BadgeIcon className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{badgeConfig.label}</span>
                </div>
              )
            })()}

            {/* Glassmorphism Price Badge */}
            <div className="absolute top-3 right-3 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-full shadow-xl border border-femfuel-rose/10">
              <p className="text-sm font-bold text-femfuel-dark">{service.price}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 md:p-4 flex flex-col min-h-[280px]">
            <div className="space-y-2">
              <h3 className="font-semibold text-femfuel-dark text-sm md:text-base line-clamp-2">{service.name}</h3>

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

              {/* Urgency Indicators */}
              {(service.bookingsToday || service.slotsAvailable) && (
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  {service.bookingsToday && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <Users className="h-3.5 w-3.5 text-purple-600" />
                      <span className="text-purple-600 font-medium">
                        {service.bookingsToday} personas reservaron hoy
                      </span>
                    </div>
                  )}
                  {service.slotsAvailable && service.slotsAvailable <= 5 && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="h-3.5 w-3.5 text-orange-600" />
                      <span className="text-orange-600 font-medium">
                        Solo {service.slotsAvailable} slots disponibles hoy
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Spacer to push button to bottom */}
            <div className="flex-1" />

            {/* Enhanced CTA with Hover State */}
            <button
              className="w-full min-h-[48px] text-sm mt-3 px-4 py-2 bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/30 hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 active:bg-gradient-to-r active:from-femfuel-rose active:to-pink-600 text-femfuel-dark hover:text-white active:text-white hover:border-transparent font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:shadow-lg active:scale-95"
              onClick={(e) => {
                e.stopPropagation()
                handleViewProviders()
              }}
              aria-label={`Reservar ${service.name}`}
            >
              Reservar Ahora
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
