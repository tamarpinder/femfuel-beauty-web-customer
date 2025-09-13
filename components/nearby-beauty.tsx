"use client"

import { useState } from "react"
import { MapPin, Clock, Star, Navigation, Phone, ChevronRight, MessageCircle } from "lucide-react"
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
  localSpecialty: string
}

interface NearbyBeautyProps {
  locations: NearbyLocation[]
  userLocation?: string
  onGetDirections?: (locationId: string) => void
  onCallLocation?: (phone: string) => void
  onBookLocation?: (locationId: string) => void
}

export function NearbyBeauty({ 
  locations, 
  userLocation = "Tu ubicación",
  onGetDirections, 
  onCallLocation, 
  onBookLocation 
}: NearbyBeautyProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null)

  if (!locations.length) return null

  const neighborhoods = [...new Set(locations.map(loc => loc.neighborhood))]
  const filteredLocations = selectedNeighborhood 
    ? locations.filter(loc => loc.neighborhood === selectedNeighborhood)
    : locations

  return (
    <section className="px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-3">Belleza Cerca de Ti</h2>
          <p className="text-femfuel-medium flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            {userLocation}
          </p>
        </div>

        {/* Neighborhood Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          <Button
            variant={selectedNeighborhood === null ? "default" : "outline"}
            size="sm"
            className={`whitespace-nowrap ${selectedNeighborhood === null ? 'bg-femfuel-rose' : 'border-femfuel-rose/20 text-femfuel-medium hover:bg-femfuel-rose hover:text-white'}`}
            onClick={() => setSelectedNeighborhood(null)}
          >
            Todos los sectores
          </Button>
          {neighborhoods.map((neighborhood) => (
            <Button
              key={neighborhood}
              variant={selectedNeighborhood === neighborhood ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${selectedNeighborhood === neighborhood ? 'bg-femfuel-rose' : 'border-femfuel-rose/20 text-femfuel-medium hover:bg-femfuel-rose hover:text-white'}`}
              onClick={() => setSelectedNeighborhood(neighborhood)}
            >
              {neighborhood}
            </Button>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
              <div className="relative">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`${location.openNow ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {location.openNow ? 'Abierto' : 'Cerrado'}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-femfuel-rose text-white">
                    {location.distance}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="font-bold text-femfuel-dark mb-1">{location.name}</h3>
                  <p className="text-sm text-femfuel-medium mb-2">{location.type}</p>
                  
                  {/* Location Info */}
                  <div className="space-y-1 text-xs text-femfuel-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{location.address}, {location.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
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
                        className={`h-3 w-3 ${i < Math.floor(location.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-femfuel-dark">{location.rating}</span>
                  <span className="text-xs text-femfuel-medium">({location.reviewCount})</span>
                </div>

                {/* Local Specialty */}
                <div className="bg-femfuel-light rounded-lg p-3 mb-4">
                  <p className="text-xs text-femfuel-medium mb-1">Especialidad Local</p>
                  <p className="font-medium text-femfuel-dark text-sm">{location.localSpecialty}</p>
                </div>

                {/* Featured Service */}
                <div className="border border-femfuel-rose/20 rounded-lg p-3 mb-4">
                  <p className="text-xs text-femfuel-medium mb-1">Servicio Destacado</p>
                  <p className="font-medium text-femfuel-dark text-sm">{location.featuredService.name}</p>
                  <div className="flex justify-between text-xs text-femfuel-medium mt-1">
                    <span>{location.featuredService.duration}</span>
                    <span className="font-bold text-femfuel-rose">{location.featuredService.price}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {location.specialties.slice(0, 3).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {location.specialties.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{location.specialties.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <Button
                    onClick={() => onBookLocation?.(location.id)}
                    className="w-full bg-femfuel-rose hover:bg-femfuel-rose/90 text-white text-sm"
                    disabled={!location.openNow}
                  >
                    {location.openNow ? "Reservar Ahora" : "Ver Horarios"}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onGetDirections?.(location.id)}
                      className="border-femfuel-rose/20 text-femfuel-medium hover:bg-femfuel-rose hover:text-white"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Direcciones
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCallLocation?.(location.phone)}
                      className="border-femfuel-rose/20 text-femfuel-medium hover:bg-femfuel-rose hover:text-white"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Llamar
                    </Button>
                  </div>
                  
                  {/* Chat Button */}
                  <ChatButton
                    vendorId={location.id.toString()}
                    vendorName={location.name}
                    serviceContext={location.featuredService.name}
                    variant="inline"
                    size="sm"
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-sm"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Chatear
                  </ChatButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {filteredLocations.length > 6 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white"
            >
              Ver Más Ubicaciones
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-6 bg-gradient-to-r from-femfuel-light to-pink-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-femfuel-dark">{locations.length}</div>
            <div className="text-sm text-femfuel-medium">Ubicaciones cerca</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-femfuel-dark">
              {Math.round(locations.reduce((acc, loc) => acc + loc.rating, 0) / locations.length * 10) / 10}
            </div>
            <div className="text-sm text-femfuel-medium">Promedio rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-femfuel-dark">
              {locations.filter(loc => loc.openNow).length}
            </div>
            <div className="text-sm text-femfuel-medium">Abiertas ahora</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-femfuel-dark">
              {Math.min(...locations.map(loc => parseInt(loc.travelTime)))}min
            </div>
            <div className="text-sm text-femfuel-medium">Más cercana</div>
          </div>
        </div>
      </div>
    </section>
  )
}