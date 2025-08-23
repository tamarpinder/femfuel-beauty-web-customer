"use client"

import { useState, useEffect } from "react"
import { MapPin, Truck, Search, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { deliveryZones, isLocationServiceable } from "@/data/warehouses"
import { UserLocation } from "@/types/delivery"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onLocationUpdate: (location: UserLocation) => void
  currentLocation: UserLocation | null
}

// Mock locations within Santo Domingo for testing
const mockLocations = [
  {
    coordinates: { lat: 18.4861, lng: -69.9312 },
    address: "Av. Winston Churchill, Piantini",
    district: "Piantini",
    city: "Santo Domingo"
  },
  {
    coordinates: { lat: 18.4765, lng: -69.9115 },
    address: "Av. Abraham Lincoln, Piantini",
    district: "Piantini", 
    city: "Santo Domingo"
  },
  {
    coordinates: { lat: 18.4702, lng: -69.9411 },
    address: "Malecón de Santo Domingo",
    district: "Zona Colonial",
    city: "Santo Domingo"
  },
  {
    coordinates: { lat: 18.5204, lng: -69.9120 },
    address: "Av. Charles de Gaulle, Bella Vista",
    district: "Bella Vista",
    city: "Santo Domingo"
  },
  {
    coordinates: { lat: 18.4881, lng: -69.8597 },
    address: "Av. Las Américas, Santo Domingo Este",
    district: "Santo Domingo Este",
    city: "Santo Domingo Este"
  },
  {
    coordinates: { lat: 18.5001, lng: -70.0067 },
    address: "Centro Olímpico Juan Pablo Duarte",
    district: "Santo Domingo Oeste",
    city: "Santo Domingo Oeste"
  },
  {
    coordinates: { lat: 18.4277, lng: -69.9445 },
    address: "Av. George Washington, Gazcue",
    district: "Gazcue",
    city: "Santo Domingo"
  },
  // Out of service area examples
  {
    coordinates: { lat: 18.5001, lng: -68.3725 },
    address: "Punta Cana, La Altagracia",
    district: "Punta Cana",
    city: "La Altagracia"
  },
  {
    coordinates: { lat: 19.4515, lng: -70.6969 },
    address: "Santiago de los Caballeros",
    district: "Santiago",
    city: "Santiago"
  }
]

export function LocationModal({ isOpen, onClose, onLocationUpdate, currentLocation }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(mockLocations)
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(currentLocation)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockLocations.filter(location =>
        location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(mockLocations)
    }
  }, [searchQuery])

  const handleLocationSelect = (location: typeof mockLocations[0]) => {
    const serviceabilityCheck = isLocationServiceable(location.coordinates)
    
    const userLocation: UserLocation = {
      ...location,
      deliveryZone: serviceabilityCheck.zone,
      isServiceable: serviceabilityCheck.isServiceable,
      accuracy: 100
    }
    
    setSelectedLocation(userLocation)
  }

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true)
    
    // Simulate geolocation API
    setTimeout(() => {
      // Mock current location to Piantini (serviceable area)
      const mockCurrentLocation = {
        coordinates: { lat: 18.4861, lng: -69.9312 },
        address: "Av. Winston Churchill, Piantini",
        district: "Piantini",
        city: "Santo Domingo"
      }
      
      handleLocationSelect(mockCurrentLocation)
      setIsDetectingLocation(false)
    }, 2000)
  }

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationUpdate(selectedLocation)
    }
  }

  const formatDeliveryInfo = (location: UserLocation) => {
    if (!location.isServiceable || !location.deliveryZone) {
      return "Entrega no disponible"
    }

    const zone = deliveryZones.find(z => z.id === location.deliveryZone?.id)
    if (!zone || zone.deliveryOptions.length === 0) {
      return "Sin opciones de entrega"
    }

    const defaultOption = zone.deliveryOptions.find(opt => opt.isDefault) || zone.deliveryOptions[0]
    return `Entrega: ${defaultOption.estimatedTime} • RD$${defaultOption.fee}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Seleccionar ubicación
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Location Detection */}
          <div className="space-y-3">
            <Button
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {isDetectingLocation ? "Detectando ubicación..." : "Usar mi ubicación actual"}
            </Button>
            
            {currentLocation && (
              <div className="text-sm text-femfuel-medium text-center">
                Ubicación actual: {currentLocation.district}, {currentLocation.city}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar dirección o distrito..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Location List */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredLocations.map((location, index) => {
              const serviceabilityCheck = isLocationServiceable(location.coordinates)
              const userLocation: UserLocation = {
                ...location,
                deliveryZone: serviceabilityCheck.zone,
                isServiceable: serviceabilityCheck.isServiceable,
                accuracy: 100
              }
              
              const isSelected = selectedLocation && 
                selectedLocation.coordinates.lat === location.coordinates.lat &&
                selectedLocation.coordinates.lng === location.coordinates.lng

              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected ? "ring-2 ring-femfuel-rose bg-femfuel-purple" : "hover:shadow-md"
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-femfuel-medium flex-shrink-0" />
                          <p className="font-medium text-femfuel-dark text-sm truncate">
                            {location.district}
                          </p>
                          {isSelected && (
                            <CheckCircle className="h-4 w-4 text-femfuel-rose flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-femfuel-medium truncate ml-6">
                          {location.address}
                        </p>
                        <div className="flex items-center gap-2 mt-2 ml-6">
                          {userLocation.isServiceable ? (
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Truck className="h-3 w-3 mr-1" />
                                Disponible
                              </Badge>
                              <span className="text-xs text-femfuel-medium">
                                {formatDeliveryInfo(userLocation)}
                              </span>
                            </div>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              No disponible
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Selected Location Info */}
          {selectedLocation && (
            <Card className="bg-femfuel-purple border-femfuel-rose">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-femfuel-rose flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-femfuel-dark">
                      {selectedLocation.district}, {selectedLocation.city}
                    </p>
                    <p className="text-sm text-femfuel-medium mb-2">
                      {selectedLocation.address}
                    </p>
                    <div className="flex items-center gap-2">
                      {selectedLocation.isServiceable ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Truck className="h-3 w-3 mr-1" />
                          Entrega disponible
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          Entrega no disponible
                        </Badge>
                      )}
                    </div>
                    {selectedLocation.isServiceable && (
                      <p className="text-xs text-femfuel-medium mt-1">
                        {formatDeliveryInfo(selectedLocation)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmLocation}
              disabled={!selectedLocation}
              className="flex-1 bg-femfuel-rose hover:bg-[#9f1853] text-white"
            >
              Confirmar ubicación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}