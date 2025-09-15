"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, ChevronRight, Quote, Verified, Sparkles } from "lucide-react"
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

  const getReviewPreview = (vendor: Vendor) => {
    const reviews = [
      "Arte de uñas increíble, muy profesional y espacio limpio",
      "Excelente servicio, mis uñas se ven increíbles!", 
      "La mejor experiencia de salón, muy recomendado!",
      "Resultados perfectos cada vez, me encanta venir aquí"
    ]
    return reviews[Math.floor(Math.random() * reviews.length)]
  }

  const getServiceHighlights = (vendor: Vendor, serviceName: string) => {
    const highlights: Record<string, string[]> = {
      'Arte de Uñas Tropical': ['Recubrimiento gel', 'Arte de uñas', 'Cuidado profesional'],
      'Alisado Dominicano': ['Tratamiento queratina', 'Protección térmica', 'Duradero'],
      'Manicure': ['Cuidado cutículas', 'Aplicación esmalte', 'Masaje manos']
    }
    return highlights[serviceName] || ['Servicio profesional', 'Cuidado experto', 'Productos calidad']
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-femfuel-dark">
            Especialistas Verificados
          </h2>
          <div className="bg-femfuel-rose text-white px-3 py-1 rounded-full text-sm font-medium">
            {providers.length}
          </div>
        </div>

        {/* Provider Cards */}
        <div className="space-y-3">
          {providers.map((vendor) => {
            const vendorService = vendor.services.find(s => s.name === serviceName)
            const isSelected = selectedProvider === vendor.id
            const serviceHighlights = getServiceHighlights(vendor, serviceName)
            const reviewPreview = getReviewPreview(vendor)
            
            return (
              <Card 
                key={vendor.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-white shadow-lg ${
                  isSelected ? 'ring-2 ring-femfuel-rose shadow-2xl transform scale-[1.02]' : 'hover:shadow-2xl'
                }`}
                onClick={() => setSelectedProvider(vendor.id)}
              >
                <CardContent className="p-4">
                  {/* Compact Header with Logo, Name, Price and Rating */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Smaller Provider Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-femfuel-purple to-femfuel-rose/20 relative">
                        <OptimizedImage
                          src={vendor.logo || "/vendor-logo-placeholder.png"}
                          alt={`${vendor.name} logo`}
                          fill
                          sizes="48px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Provider Info - Consolidated */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 
                            className="text-base font-bold text-femfuel-dark cursor-pointer hover:text-femfuel-rose transition-colors line-clamp-1 mb-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              onProviderSelect(vendor)
                            }}
                          >
                            {vendor.name}
                          </h3>
                          
                          {/* Rating and Distance in one compact line */}
                          <div className="flex items-center gap-3 text-xs text-femfuel-medium">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{vendor.rating}</span>
                              <span>({vendor.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{getDistanceText(vendor)}</span>
                            </div>
                            {vendor.badges && vendor.badges.length > 0 && (
                              <Badge className="bg-femfuel-rose text-white px-1 py-0 text-xs h-4">
                                <Verified className="h-2 w-2 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Price - Right aligned */}
                        {vendorService && (
                          <div className="text-right flex-shrink-0 ml-2">
                            <div className="text-base font-bold text-femfuel-rose">
                              {formatPrice(vendorService.price)}
                            </div>
                            <div className="text-xs text-femfuel-medium">
                              {vendorService.duration} min
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Compact Availability and Review */}
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{getNextSlot(vendor)}</span>
                    </div>
                    <div className="flex-1 bg-gray-50 text-femfuel-dark px-2 py-1 rounded">
                      <Quote className="h-3 w-3 inline mr-1 text-femfuel-medium" />
                      <span className="italic line-clamp-1">"{reviewPreview}"</span>
                    </div>
                  </div>

                  {/* Compact Service Highlights */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {serviceHighlights.slice(0, 3).map((highlight, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs bg-femfuel-purple text-femfuel-dark border-femfuel-medium px-1 py-0 h-5"
                      >
                        ✓ {highlight}
                      </Badge>
                    ))}
                  </div>

                  {/* Compact Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookNow(vendor)
                      }}
                      className="bg-femfuel-rose hover:bg-pink-600 text-white flex-1 h-8 text-sm font-medium"
                    >
                      Reservar
                    </Button>
                    
                    <ChatButton
                      vendorId={vendor.id}
                      vendorName={vendor.name}
                      serviceContext={serviceName}
                      variant="inline"
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 h-8 w-8 p-0"
                    >
                      <MessageCircle className="h-3 w-3" />
                    </ChatButton>
                    
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onProviderSelect(vendor)
                      }}
                      className="border border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white h-8 px-3 text-sm"
                    >
                      Ver
                    </Button>
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