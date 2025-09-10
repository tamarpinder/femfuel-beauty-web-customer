"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, Crown, Filter, SlidersHorizontal, ChevronDown } from "lucide-react"
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedProviders.map((vendor) => {
          const vendorService = vendor.services.find(s => s.name === serviceName)
          const isSelected = selectedProvider === vendor.id
          
          return (
            <Card 
              key={vendor.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-femfuel-rose shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProvider(vendor.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Provider Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 relative">
                      <OptimizedImage
                        src={vendor.logo || "/vendor-logo-placeholder.png"}
                        alt={`${vendor.name} logo`}
                        fill
                        sizes="56px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-femfuel-dark truncate">
                          {vendor.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{vendor.rating}</span>
                            <span className="text-femfuel-medium">({vendor.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-femfuel-medium">
                            <MapPin className="h-4 w-4" />
                            <span>{getDistanceText(vendor)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {vendor.badges && vendor.badges.length > 0 && (
                        <Badge variant="secondary" className="text-xs ml-2">
                          {vendor.badges[0]}
                        </Badge>
                      )}
                    </div>

                    {/* Service Details */}
                    {vendorService && (
                      <div className="flex items-center justify-between mb-3 bg-femfuel-purple rounded-lg p-3">
                        <div>
                          <span className="text-lg font-bold text-femfuel-dark">
                            {formatPrice(vendorService.price)}
                          </span>
                          <span className="text-sm text-femfuel-medium ml-2">
                            • {vendorService.duration} min
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-600 font-medium">
                            Próximo: {getNextSlot(vendor)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onBookNow(vendor)
                        }}
                        className="bg-femfuel-rose hover:bg-[#9f1853] text-white flex-1"
                        size="sm"
                      >
                        Reservar Ahora
                      </Button>
                      
                      <ChatButton
                        vendorId={vendor.id}
                        vendorName={vendor.name}
                        serviceContext={serviceName}
                        variant="inline"
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 px-3"
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
                        className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white px-3"
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