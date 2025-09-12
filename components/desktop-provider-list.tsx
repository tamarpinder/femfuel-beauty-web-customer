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

      {/* Provider Cards */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
              className={`cursor-pointer transition-all duration-300 border-0 bg-white shadow-lg hover:shadow-2xl ${
                isSelected ? 'ring-2 ring-femfuel-rose shadow-2xl transform scale-[1.01]' : 'hover:shadow-xl'
              } ${isTopPerformer ? 'bg-gradient-to-r from-white to-femfuel-purple/5' : ''}`}
              onClick={() => setSelectedProvider(vendor.id)}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-12 gap-6 items-start">
                  {/* Enhanced Provider Logo */}
                  <div className="col-span-2">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-femfuel-purple to-femfuel-rose/20 relative shadow-lg">
                        <OptimizedImage
                          src={vendor.logo || "/vendor-logo-placeholder.png"}
                          alt={`${vendor.name} logo`}
                          fill
                          sizes="80px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      {isTopPerformer && (
                        <div className="absolute -top-2 -right-2 bg-femfuel-rose text-white rounded-full p-1">
                          <TrendingUp className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Provider Details */}
                  <div className="col-span-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-femfuel-dark">
                        {vendor.name}
                      </h3>
                      {vendor.badges && vendor.badges.length > 0 && (
                        <Badge className="bg-femfuel-rose text-white px-2 py-1 text-xs">
                          <Verified className="h-3 w-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      {isTopPerformer && (
                        <Badge className="bg-yellow-500 text-white px-2 py-1 text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          Top Choice
                        </Badge>
                      )}
                    </div>

                    {/* Rating and Location */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-femfuel-dark">{vendor.rating}</span>
                        <span className="text-femfuel-medium text-sm">({vendor.reviewCount} reseñas)</span>
                      </div>
                      <div className="flex items-center gap-1 text-femfuel-medium">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{getDistanceText(vendor)}</span>
                      </div>
                    </div>

                    {/* Review Preview */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <Quote className="h-3 w-3 text-femfuel-medium flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-femfuel-dark italic line-clamp-2">
                            "{reviewPreview}"
                          </p>
                          <p className="text-xs text-femfuel-medium mt-1">- Cliente verificado</p>
                        </div>
                      </div>
                    </div>

                    {/* Service Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {serviceHighlights.slice(0, 3).map((highlight, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs bg-white border-femfuel-medium text-femfuel-dark"
                        >
                          ✓ {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price and Availability */}
                  <div className="col-span-2 text-center">
                    {vendorService && (
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-femfuel-rose">
                          {formatPrice(vendorService.price)}
                        </div>
                        <div className="text-sm text-femfuel-medium">
                          {vendorService.duration} minutos
                        </div>
                      </div>
                    )}

                    {/* Availability Status */}
                    <div className={`rounded-lg p-3 mb-4 ${
                      availabilityStatus.color === 'green' 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="flex items-center gap-1 justify-center">
                        <Clock className={`h-4 w-4 ${
                          availabilityStatus.color === 'green' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                        <span className={`text-xs font-medium ${
                          availabilityStatus.color === 'green' ? 'text-green-800' : 'text-blue-800'
                        }`}>
                          {availabilityStatus.text}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${
                        availabilityStatus.color === 'green' ? 'text-green-700' : 'text-blue-700'
                      }`}>
                        {getNextSlot(vendor)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 space-y-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookNow(vendor)
                      }}
                      className="bg-femfuel-rose hover:bg-[#9f1853] text-white w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      size="sm"
                    >
                      Reservar
                    </Button>
                    
                    <div className="flex gap-2">
                      <ChatButton
                        vendorId={vendor.id}
                        vendorName={vendor.name}
                        serviceContext={serviceName}
                        variant="inline"
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 flex-1 px-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </ChatButton>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onProviderSelect(vendor)
                        }}
                        className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white flex-1 px-2"
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}