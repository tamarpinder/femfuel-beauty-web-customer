"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, ChevronRight, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ChatButton } from "@/components/ui/chat-button"
import type { Vendor } from "@/types/vendor"

interface ProviderListCompactProps {
  providers: Vendor[]
  serviceName: string
  onProviderSelect: (vendor: Vendor) => void
  onBookNow: (vendor: Vendor) => void
}

export function ProviderListCompact({ 
  providers, 
  serviceName, 
  onProviderSelect, 
  onBookNow 
}: ProviderListCompactProps) {
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

  if (providers.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-femfuel-medium">No hay especialistas disponibles para este servicio</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <Crown className="h-5 w-5 text-femfuel-rose" />
          <h2 className="text-xl font-bold text-femfuel-dark">
            Especialistas Verificados
          </h2>
          <span className="text-sm text-femfuel-medium">
            ({providers.length} disponibles)
          </span>
        </div>

        {/* Provider Cards */}
        <div className="space-y-4">
          {providers.map((vendor) => {
            const vendorService = vendor.services.find(s => s.name === serviceName)
            const isSelected = selectedProvider === vendor.id
            
            return (
              <Card 
                key={vendor.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected ? 'ring-2 ring-femfuel-rose shadow-lg' : ''
                }`}
                onClick={() => setSelectedProvider(vendor.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Provider Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={vendor.logo || "/vendor-logo-placeholder.png"}
                          alt={`${vendor.name} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
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
                          <div className="flex items-center gap-3 text-sm text-femfuel-medium">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{vendor.rating}</span>
                              <span>({vendor.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1">
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
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold text-femfuel-rose">
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
                          className="bg-green-500 hover:bg-green-600"
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
                          className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                        >
                          Ver
                          <ChevronRight className="h-4 w-4 ml-1" />
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
    </div>
  )
}