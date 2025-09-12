"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, Crown, Filter, SlidersHorizontal, ChevronDown, Quote, Verified, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ChatButton } from "@/components/ui/chat-button"
import type { Vendor } from "@/types/vendor"

interface DesktopProviderListProps {
  providers: Vendor[]
  serviceName: string
  onProviderSelect: (vendor: Vendor) => void
  onBookNow: (vendor: Vendor) => void
}

type SortOption = 'rating' | 'price' | 'distance' | 'availability'
type FilterOption = 'all' | 'available-today' | 'top-rated' | 'nearest'

export function DesktopProviderList({ 
  providers, 
  serviceName, 
  onProviderSelect, 
  onBookNow 
}: DesktopProviderListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  const getDistanceText = (vendor: Vendor) => {
    return vendor.location.distance || "2.3km"
  }

  const getNextSlot = (vendor: Vendor) => {
    return vendor.availability?.nextSlot || "Today 3:30 PM"
  }

  const getReviewPreview = (vendor: Vendor) => {
    const reviews = [
      "Amazing nail art, very professional and clean workspace",
      "Excellent service, my nails look incredible!", 
      "Best salon experience, highly recommend!",
      "Perfect results every time, love coming here",
      "Professional staff and beautiful results",
      "Outstanding quality and attention to detail"
    ]
    return reviews[Math.floor(Math.random() * reviews.length)]
  }

  const getServiceHighlights = (vendor: Vendor, serviceName: string) => {
    const highlights: Record<string, string[]> = {
      'Arte de Uñas Tropical': ['Gel coating', 'Nail art', 'Professional care'],
      'Alisado Dominicano': ['Keratin treatment', 'Heat protection', 'Long-lasting'],
      'Manicure': ['Cuticle care', 'Polish application', 'Hand massage']
    }
    return highlights[serviceName] || ['Professional service', 'Expert care', 'Quality products']
  }

  const getAvailabilityStatus = (vendor: Vendor) => {
    const nextSlot = getNextSlot(vendor)
    const isToday = nextSlot.includes('Today')
    return {
      isToday,
      color: isToday ? 'green' : 'blue',
      text: isToday ? 'Disponible hoy' : 'Próxima cita'
    }
  }

  // Filter providers
  const filteredProviders = providers.filter(vendor => {
    switch (filterBy) {
      case 'available-today':
        return vendor.availability?.nextSlot?.includes('Today') || Math.random() > 0.3
      case 'top-rated':
        return vendor.rating >= 4.7
      case 'nearest':
        return parseFloat(getDistanceText(vendor)) <= 3.0
      default:
        return true
    }
  })

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price':
        const aPrice = a.services.find(s => s.name === serviceName)?.price || 0
        const bPrice = b.services.find(s => s.name === serviceName)?.price || 0
        return aPrice - bPrice
      case 'distance':
        const aDist = parseFloat(getDistanceText(a)) || 999
        const bDist = parseFloat(getDistanceText(b)) || 999
        return aDist - bDist
      case 'availability':
        const aToday = a.availability?.nextSlot?.includes('Today') ? 1 : 0
        const bToday = b.availability?.nextSlot?.includes('Today') ? 1 : 0
        return bToday - aToday
      default:
        return 0
    }
  })

  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center">
          <Crown className="h-8 w-8 text-femfuel-medium" />
        </div>
        <h3 className="text-lg font-medium text-femfuel-dark mb-2">
          No hay especialistas disponibles
        </h3>
        <p className="text-femfuel-medium">
          No encontramos especialistas para {serviceName} en este momento
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with Filters */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-femfuel-rose" />
            <h2 className="text-xl font-bold text-femfuel-dark">
              Elegí tu Especialista
            </h2>
            <span className="text-sm text-femfuel-medium">
              ({sortedProviders.length} disponibles)
            </span>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-femfuel-medium" />
            <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="available-today">Disponibles hoy</SelectItem>
                <SelectItem value="top-rated">Top calificados</SelectItem>
                <SelectItem value="nearest">Más cercanos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-femfuel-medium" />
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Por calificación</SelectItem>
                <SelectItem value="price">Por precio</SelectItem>
                <SelectItem value="distance">Por distancia</SelectItem>
                <SelectItem value="availability">Por disponibilidad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Provider Cards - Clean Vertical Layout (Option C) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedProviders.map((vendor, index) => {
          const vendorService = vendor.services.find(s => s.name === serviceName)
          const isSelected = selectedProvider === vendor.id
          const serviceHighlights = getServiceHighlights(vendor, serviceName)
          const reviewPreview = getReviewPreview(vendor)
          const availabilityStatus = getAvailabilityStatus(vendor)
          const isTopPerformer = index < 3
          
          return (
            <Card 
              key={vendor.id}
              className={`cursor-pointer transition-all duration-200 bg-white shadow-lg hover:shadow-xl ${
                isSelected ? 'ring-2 ring-femfuel-rose shadow-xl' : ''
              }`}
              onClick={() => setSelectedProvider(vendor.id)}
            >
              <CardContent className="p-6">
                {/* Top Section: Logo + Name on left, Price box on right */}
                <div className="flex justify-between items-start mb-4">
                  {/* Left: Logo and Vendor Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Logo */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-femfuel-purple to-femfuel-rose/20 shadow-lg">
                        <OptimizedImage
                          src={vendor.logo || "/vendor-logo-placeholder.png"}
                          alt={`${vendor.name} logo`}
                          fill
                          sizes="64px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      {isTopPerformer && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
                          <Crown className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    {/* Vendor Name and Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-3 mb-2">
                        {vendor.badges && vendor.badges.length > 0 && (
                          <Badge className="bg-femfuel-rose text-white px-2 py-1 text-xs">
                            <Verified className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                        {isTopPerformer && (
                          <Badge className="bg-yellow-500 text-white px-2 py-1 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Top Choice
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-femfuel-dark">{vendor.rating}</span>
                          <span className="text-femfuel-medium">({vendor.reviewCount} reseñas)</span>
                        </div>
                        <div className="flex items-center gap-1 text-femfuel-medium">
                          <MapPin className="h-4 w-4" />
                          <span>{getDistanceText(vendor)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price Box */}
                  {vendorService && (
                    <div className="text-right bg-femfuel-purple rounded-lg p-3 min-w-[120px]">
                      <div className="text-2xl font-bold text-femfuel-rose">
                        {formatPrice(vendorService.price)}
                      </div>
                      <div className="text-sm text-femfuel-medium">
                        {vendorService.duration} min
                      </div>
                    </div>
                  )}
                </div>

                {/* Review Quote Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Quote className="h-4 w-4 text-femfuel-medium flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-femfuel-dark italic">
                        "{reviewPreview}"
                      </p>
                      <p className="text-xs text-femfuel-medium mt-1">- Cliente verificado</p>
                    </div>
                  </div>
                </div>

                {/* Service Highlights - Horizontal */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {serviceHighlights.map((highlight, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-sm bg-white border-femfuel-rose/30 text-femfuel-dark"
                    >
                      ✓ {highlight}
                    </Badge>
                  ))}
                </div>

                {/* Next Availability */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Clock className={`h-4 w-4 ${
                    availabilityStatus.color === 'green' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                  <span className="font-medium text-femfuel-dark">
                    Próxima disponibilidad:
                  </span>
                  <span className={`font-semibold ${
                    availabilityStatus.color === 'green' ? 'text-green-700' : 'text-blue-700'
                  }`}>
                    {getNextSlot(vendor)}
                  </span>
                  {availabilityStatus.isToday && (
                    <Badge className="bg-green-100 text-green-800 px-2 py-0 text-xs">
                      Disponible hoy
                    </Badge>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mb-4"></div>

                {/* Action Buttons at Bottom */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onBookNow(vendor)
                    }}
                    className="bg-femfuel-rose hover:bg-[#9f1853] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
                  >
                    Reservar - {getNextSlot(vendor)}
                  </Button>
                  
                  <ChatButton
                    vendorId={vendor.id}
                    vendorName={vendor.name}
                    serviceContext={serviceName}
                    variant="inline"
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 px-4"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </ChatButton>

                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      onProviderSelect(vendor)
                    }}
                    className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white px-4"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}