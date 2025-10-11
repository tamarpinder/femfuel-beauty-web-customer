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
            <div className="flex items-center">
              <div className="w-20 sm:w-24 h-20 relative flex-shrink-0">
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
              <div className="flex-1 p-3 sm:p-4 max-w-full overflow-hidden">
                <div className="mb-2 sm:mb-3 min-w-0">
                  <h3 className="font-bold text-femfuel-dark text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2 break-words">{service.name}</h3>
                  {service.featuredProvider && (
                    <div className="mb-2">
                      <p
                        className="text-xs sm:text-sm font-semibold text-femfuel-dark mb-1 line-clamp-1 break-words cursor-pointer hover:text-femfuel-rose hover:underline transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewVendor?.(service.featuredProvider!.id)
                        }}
                      >
                        {service.featuredProvider.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs min-w-0">
                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">4.9</span>
                        </div>
                        <span className="text-femfuel-medium shrink-0">•</span>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                          Top Rated
                        </Badge>
                        <span className="text-femfuel-medium shrink-0">•</span>
                        <span className="text-femfuel-medium truncate">Piantini</span>
                      </div>
                    </div>
                  )}

                  {/* Centered Price & Duration for Horizontal Layout */}
                  <div className="flex items-center justify-center gap-3 py-2 px-3 bg-gradient-to-r from-femfuel-light/10 to-pink-50/30 rounded-lg border border-femfuel-rose/10">
                    <div className="text-center">
                      <p className="font-bold text-black text-sm sm:text-base">{service.price}</p>
                      <p className="text-xs text-femfuel-medium">Precio</p>
                    </div>
                    <div className="w-px h-6 bg-femfuel-rose/20"></div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3 text-femfuel-rose" />
                        <p className="font-bold text-black text-sm sm:text-base">{service.duration}</p>
                        <span className="text-xs text-femfuel-medium">min</span>
                      </div>
                      <p className="text-xs text-femfuel-medium">Duración</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded px-2 py-1">
                      <Users className="h-3 w-3 text-orange-600 shrink-0" />
                      <span className="font-semibold text-orange-700 text-xs truncate">{service.availableProviders} especialistas disponibles</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="glassmorphism-button-perfect w-full h-9 sm:h-10 text-sm sm:text-base"
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
          <div className="p-4 sm:p-6 max-w-full overflow-hidden">
            <div className="mb-4 min-w-0">
              <h3 className="font-bold text-femfuel-dark text-lg sm:text-xl mb-3 line-clamp-2 break-words">{service.name}</h3>

              {service.featuredProvider && (
                <div className="mb-4">
                  <p
                    className="text-sm sm:text-base font-semibold text-femfuel-dark mb-2 line-clamp-1 break-words cursor-pointer hover:text-femfuel-rose hover:underline transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewVendor?.(service.featuredProvider!.id)
                    }}
                  >
                    {service.featuredProvider.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm min-w-0">
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.9</span>
                    </div>
                    <span className="text-femfuel-medium shrink-0">•</span>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                      Top Rated
                    </Badge>
                    <span className="text-femfuel-medium shrink-0">•</span>
                    <span className="text-femfuel-medium truncate">Piantini</span>
                  </div>
                </div>
              )}

              {/* Centered Price & Duration for Vertical Layout */}
              <div className="flex flex-col items-center text-center space-y-3 py-4 bg-gradient-to-r from-femfuel-light/10 to-pink-50/30 rounded-lg border border-femfuel-rose/10">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-black">{service.price}</p>
                    <p className="text-sm text-femfuel-medium">Precio</p>
                  </div>
                  <div className="w-px h-10 bg-femfuel-rose/20"></div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4 text-femfuel-rose" />
                      <p className="text-xl sm:text-2xl font-bold text-black">{service.duration}</p>
                      <span className="text-sm text-femfuel-medium">min</span>
                    </div>
                    <p className="text-sm text-femfuel-medium">Duración</p>
                  </div>
                </div>
                <div className="w-full max-w-full">
                  <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-lg px-3 py-2">
                    <Users className="h-4 w-4 text-orange-600 shrink-0" />
                    <span className="font-semibold text-orange-700 text-sm truncate">{service.availableProviders} especialistas disponibles</span>
                  </div>
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
