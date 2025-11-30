"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, Star, Navigation, Phone, ChevronRight, MessageCircle, List, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChatButton } from "@/components/ui/chat-button"

interface NearbyLocation {
  id: string
  name: string
  type: string
  address: string
  neighborhood: string
  distance: string
  travelTime: string
  rating: number
  reviewCount: number
  specialties: string[]
  openNow: boolean
  closingTime?: string
  phone: string
  image: string
  featuredService: {
    name: string
    price: string
    duration: string
  }
  serviceCount?: number
  startingPrice?: string
  localSpecialty: string
}

interface NearbyBeautyProps {
  locations: NearbyLocation[]
  userLocation?: string
  onGetDirections?: (locationId: string) => void
  onCallLocation?: (phone: string) => void
  onBookLocation?: (locationId: string) => void
  onViewVendor?: (locationId: string) => void
}

export function NearbyBeauty({
  locations,
  userLocation = "Tu ubicación",
  onGetDirections,
  onCallLocation,
  onBookLocation,
  onViewVendor
}: NearbyBeautyProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem('nearbyBeautyView') as 'list' | 'map' | null
    if (savedView) {
      setViewMode(savedView)
    }
  }, [])

  // Save view preference to localStorage
  const handleViewChange = (mode: 'list' | 'map') => {
    setViewMode(mode)
    localStorage.setItem('nearbyBeautyView', mode)
  }

  if (!locations.length) return null

  const neighborhoods = [...new Set(locations.map(loc => loc.neighborhood))]
  const filteredLocations = selectedNeighborhood 
    ? locations.filter(loc => loc.neighborhood === selectedNeighborhood)
    : locations

  return (
    <section className="px-4 md:px-6 py-12 md:py-16 bg-gradient-to-b from-white via-femfuel-light/10 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-femfuel-rose via-pink-600 to-femfuel-rose bg-clip-text text-transparent mb-3">Belleza Cerca de Ti</h2>
          <p className="text-base md:text-lg text-femfuel-medium font-medium flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-femfuel-rose" />
            {userLocation}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/20 shadow-lg">
            <button
              onClick={() => handleViewChange('list')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105'
                  : 'text-femfuel-dark hover:bg-white/50 hover:scale-105'
              }`}
            >
              <List className="h-4 w-4" />
              <span>Vista Lista</span>
            </button>
            <button
              onClick={() => handleViewChange('map')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105'
                  : 'text-femfuel-dark hover:bg-white/50 hover:scale-105'
              }`}
            >
              <Map className="h-4 w-4" />
              <span>Vista Mapa</span>
            </button>
          </div>
        </div>

        {/* Neighborhood Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <Button
            variant={selectedNeighborhood === null ? "default" : "outline"}
            size="sm"
            className={`whitespace-nowrap rounded-xl font-bold transition-all duration-300 ${selectedNeighborhood === null ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105' : 'border-2 border-femfuel-rose/20 text-femfuel-medium hover:bg-femfuel-rose hover:text-white hover:scale-105 hover:shadow-md'}`}
            onClick={() => setSelectedNeighborhood(null)}
          >
            Todos los sectores
          </Button>
          {neighborhoods.map((neighborhood) => (
            <Button
              key={neighborhood}
              variant={selectedNeighborhood === neighborhood ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap rounded-xl font-bold transition-all duration-300 ${selectedNeighborhood === neighborhood ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105' : 'border-2 border-femfuel-rose/20 text-femfuel-medium hover:bg-femfuel-rose hover:text-white hover:scale-105 hover:shadow-md'}`}
              onClick={() => setSelectedNeighborhood(neighborhood)}
            >
              {neighborhood}
            </Button>
          ))}
        </div>

        {/* Map View Placeholder */}
        {viewMode === 'map' && (
          <div className="bg-gradient-to-br from-femfuel-light to-pink-50 rounded-3xl p-12 mb-8 text-center border-2 border-dashed border-femfuel-rose/30 shadow-lg">
            <Map className="h-16 w-16 text-femfuel-rose mx-auto mb-4" />
            <h3 className="text-xl font-bold text-femfuel-dark mb-2">Vista de Mapa</h3>
            <p className="text-femfuel-medium mb-4">
              La integración de mapa requiere configuración de API de Google Maps o Mapbox
            </p>
            <p className="text-sm text-femfuel-medium/70">
              Las ubicaciones se mostrarían aquí con pins personalizados y interactividad completa
            </p>
          </div>
        )}

        {/* Locations Grid */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30">
              <div className="relative">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Enhanced Open Now Badge */}
                <div className="absolute top-3 left-3">
                  {location.openNow ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg animate-pulse">
                      <div className="relative">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping" />
                      </div>
                      <span className="text-xs font-medium">Abierto Ahora</span>
                    </div>
                  ) : (
                    <Badge className="bg-red-500/90 backdrop-blur-sm text-white">
                      Cerrado
                    </Badge>
                  )}
                </div>
                {/* Distance Badge */}
                <div className="absolute top-3 right-3">
                  <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-femfuel-rose/30 shadow-md">
                    <span className="text-xs font-medium text-femfuel-dark">{location.distance}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3
                    className="font-bold text-femfuel-dark mb-1 cursor-pointer hover:text-femfuel-rose hover:underline transition-all duration-300 font-serif text-lg"
                    onClick={() => onViewVendor?.(location.id)}
                  >
                    {location.name}
                  </h3>
                  <p className="text-sm text-femfuel-medium mb-2 font-medium">{location.type}</p>
                  
                  {/* Location Info */}
                  <div className="space-y-1 text-sm md:text-xs text-femfuel-medium">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 md:h-3.5 md:w-3.5 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{location.address}, {location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 md:h-3.5 md:w-3.5 flex-shrink-0" />
                      <span>{location.travelTime} en carro</span>
                      {location.openNow && location.closingTime && (
                        <span>• Cierra a las {location.closingTime}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 md:h-3.5 md:w-3.5 ${i < Math.floor(location.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm md:text-xs font-medium text-femfuel-dark">{location.rating}</span>
                  <span className="text-sm md:text-xs text-femfuel-medium">({location.reviewCount})</span>
                </div>

                {/* Local Specialty */}
                <div className="bg-gradient-to-br from-femfuel-light/50 to-pink-50/50 backdrop-blur-sm rounded-xl p-3 mb-4 border-2 border-femfuel-rose/20 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                  <p className="text-xs text-femfuel-medium mb-1 font-semibold uppercase tracking-wide">Especialidad Local</p>
                  <p className="font-bold text-femfuel-dark text-sm">{location.localSpecialty}</p>
                </div>

                {/* Service Availability */}
                <div className="bg-gradient-to-br from-white/80 to-femfuel-light/30 backdrop-blur-sm border-2 border-femfuel-rose/30 rounded-xl p-3 mb-4 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                  <p className="text-xs text-femfuel-medium mb-2 font-semibold uppercase tracking-wide">Servicios Disponibles</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-femfuel-rose/20 to-pink-600/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-femfuel-rose">{location.serviceCount}</span>
                      </div>
                      <span className="text-sm font-medium text-femfuel-dark">servicios</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-femfuel-medium font-medium">Desde</p>
                      <span className="font-bold text-base bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">{location.startingPrice || location.featuredService.price}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {location.specialties.slice(0, 3).map((specialty) => (
                    <Badge key={specialty} className="text-xs bg-white/80 backdrop-blur-sm border-2 border-femfuel-rose/30 text-femfuel-dark hover:bg-femfuel-light hover:scale-105 transition-all duration-300 font-medium shadow-sm">
                      {specialty}
                    </Badge>
                  ))}
                  {location.specialties.length > 3 && (
                    <Badge className="text-xs bg-gradient-to-r from-femfuel-rose to-pink-600 text-white border-0 hover:scale-105 transition-all duration-300 font-bold shadow-md">
                      +{location.specialties.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <Button
                    onClick={() => onBookLocation?.(location.id)}
                    className="w-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-femfuel-rose/30 active:scale-95"
                    disabled={!location.openNow}
                  >
                    {location.openNow ? "Reservar Ahora" : "Ver Horarios"}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Enhanced Get Directions Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onGetDirections?.(location.id)}
                      className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/30 text-femfuel-dark hover:bg-femfuel-rose hover:text-white hover:border-femfuel-rose rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-xs font-bold min-h-[44px]"
                    >
                      <Navigation className="h-4 w-4 md:h-3.5 md:w-3.5 mr-1.5 flex-shrink-0" />
                      <span className="hidden sm:inline">Cómo llegar</span>
                      <span className="sm:hidden">Ir</span>
                    </Button>
                    {/* Enhanced Phone Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCallLocation?.(location.phone)}
                      className="bg-white/80 backdrop-blur-md border-2 border-green-500/30 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-xs font-bold min-h-[44px]"
                    >
                      <Phone className="h-4 w-4 md:h-3.5 md:w-3.5 mr-1.5 flex-shrink-0" />
                      Llamar
                    </Button>
                  </div>
                  
                  {/* Chat Button */}
                  <ChatButton
                    vendorId={location.id.toString()}
                    vendorName={location.name}
                    serviceContext={location.localSpecialty}
                    variant="inline"
                    size="sm"
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Chatear
                  </ChatButton>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {/* Show More Button */}
        {viewMode === 'list' && filteredLocations.length > 6 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-2 border-femfuel-rose text-femfuel-rose hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white hover:border-transparent rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
            >
              Ver Más Ubicaciones
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-6 bg-gradient-to-br from-femfuel-light/50 to-pink-50/50 rounded-2xl shadow-lg border-2 border-femfuel-rose/20">
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">{locations.length}</div>
            <div className="text-sm text-femfuel-medium font-semibold mt-1">Ubicaciones cerca</div>
          </div>
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">
              {Math.round(locations.reduce((acc, loc) => acc + loc.rating, 0) / locations.length * 10) / 10}
            </div>
            <div className="text-sm text-femfuel-medium font-semibold mt-1">Promedio rating</div>
          </div>
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">
              {locations.filter(loc => loc.openNow).length}
            </div>
            <div className="text-sm text-femfuel-medium font-semibold mt-1">Abiertas ahora</div>
          </div>
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">
              {Math.min(...locations.map(loc => parseInt(loc.travelTime)))}min
            </div>
            <div className="text-sm text-femfuel-medium font-semibold mt-1">Más cercana</div>
          </div>
        </div>
      </div>
    </section>
  )
}