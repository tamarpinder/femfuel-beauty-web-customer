"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, Crown, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ChatButton } from "@/components/ui/chat-button"
import { VerifiedBadge } from "@/components/ui/verified-badge"
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
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 p-6 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-femfuel-dark">
            Selecciona tu especialista
          </h2>
          <div className="bg-gradient-to-r from-femfuel-rose to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {sortedProviders.length} disponibles
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

      {/* Provider Cards - Rich Information Layout (Option 2) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {sortedProviders.map((vendor, index) => {
          const vendorService = vendor.services.find(s => s.name === serviceName)
          const isSelected = selectedProvider === vendor.id
          const isTopPerformer = index < 3
          const businessHours = vendor.businessHours?.monday
            ? `${vendor.businessHours.monday.open} - ${vendor.businessHours.monday.close}`
            : "9:00 AM - 7:00 PM"

          return (
            <Card
              key={vendor.id}
              className={`cursor-pointer transition-all duration-300 bg-white border-0 hover:shadow-2xl ${
                isSelected ? 'ring-2 ring-femfuel-rose shadow-2xl' : 'shadow-lg'
              }`}
              onClick={() => setSelectedProvider(vendor.id)}
            >
              <CardContent className="p-6">
                {/* Top Row: Logo + Name/Badge/Rating */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Logo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-femfuel-rose/10 shadow-lg bg-gradient-to-br from-femfuel-light/30 to-white">
                      <OptimizedImage
                        src={vendor.logo || "/vendor-logo-placeholder.png"}
                        alt={`${vendor.name} logo`}
                        fill
                        sizes="96px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Vendor Info */}
                  <div className="flex-1 min-w-0">
                    {/* Name + Badges */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3
                        className="text-xl font-bold text-femfuel-dark hover:text-femfuel-rose transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          onProviderSelect(vendor)
                        }}
                      >
                        {vendor.name}
                      </h3>
                      {vendor.badges && vendor.badges.length > 0 && (
                        <VerifiedBadge size="md" showTooltip />
                      )}
                    </div>

                    {/* Rating and Distance */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <span className="font-bold text-femfuel-dark">{vendor.rating}</span>
                        <span className="text-femfuel-medium">({vendor.reviewCount})</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1 text-femfuel-medium">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{getDistanceText(vendor)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Cards Row */}
                {vendorService && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {/* Price Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="text-xs text-femfuel-medium mb-1 font-medium">Precio</div>
                      <div className="text-2xl font-bold text-femfuel-dark">
                        {formatPrice(vendorService.price)}
                      </div>
                    </div>

                    {/* Duration Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-200 shadow-sm">
                      <div className="text-xs text-purple-700 mb-1 font-medium">Duración</div>
                      <div className="text-2xl font-bold text-purple-700">
                        {vendorService.duration}
                        <span className="text-sm ml-1">min</span>
                      </div>
                    </div>

                    {/* Availability Card */}
                    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200 shadow-sm">
                      <div className="text-xs text-green-700 mb-1 font-medium">Disponibilidad</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse" />
                        <span className="text-sm font-bold text-green-700">{getNextSlot(vendor)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Hours */}
                <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-3">
                  <Clock className="h-4 w-4" />
                  <span>Horario: Lun-Sab {businessHours}</span>
                </div>

                {/* Service Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vendor.services?.slice(0, 4).map((service, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs bg-white border-femfuel-rose/30 text-femfuel-dark px-2 py-1"
                    >
                      ✓ {service.name}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {/* Top Row: Ver Perfil + Reservar */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        onProviderSelect(vendor)
                      }}
                      className="flex-1 h-11 border-2 border-femfuel-rose/30 text-femfuel-dark hover:bg-femfuel-rose hover:text-white font-semibold transition-all duration-300"
                    >
                      Ver Perfil
                    </Button>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookNow(vendor)
                      }}
                      className="flex-1 h-11 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white font-bold shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      Reservar
                    </Button>
                  </div>

                  {/* Bottom Row: Chat Button Full Width */}
                  <ChatButton
                    vendorId={vendor.id}
                    vendorName={vendor.name}
                    serviceContext={serviceName}
                    variant="inline"
                    className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chatear con {vendor.name}
                  </ChatButton>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}