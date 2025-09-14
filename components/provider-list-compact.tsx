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
        <div className="space-y-6">
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
                <CardContent className="p-6">
                  {/* Header with Logo and Name */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Enhanced Provider Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-femfuel-purple to-femfuel-rose/20 relative shadow-lg">
                        <OptimizedImage
                          src={vendor.logo || "/vendor-logo-placeholder.png"}
                          alt={`${vendor.name} logo`}
                          fill
                          sizes="64px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Provider Name and Rating */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        {/* Vendor Name - Full Width Line */}
                        <div className="mb-2">
                          <h3 
                            className="text-lg font-bold text-femfuel-dark cursor-pointer hover:text-femfuel-rose transition-colors line-clamp-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              onProviderSelect(vendor)
                            }}
                          >
                            {vendor.name}
                          </h3>
                        </div>
                        
                        {/* Rating, Distance & Badges Row */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-femfuel-dark">{vendor.rating}</span>
                              <span className="text-femfuel-medium">({vendor.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1 text-femfuel-medium">
                              <MapPin className="h-4 w-4" />
                              <span>{getDistanceText(vendor)}</span>
                            </div>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex items-center gap-1">
                            {vendor.badges && vendor.badges.length > 0 && (
                              <Badge className="bg-femfuel-rose text-white px-2 py-0 text-xs flex-shrink-0">
                                <Verified className="h-3 w-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Prominent Price - Fixed positioning */}
                        {vendorService && (
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-femfuel-rose">
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

                  {/* Availability - Prominent Display */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Próximo disponible: {getNextSlot(vendor)}
                      </span>
                      <Sparkles className="h-4 w-4 text-green-600" />
                    </div>
                  </div>

                  {/* Review Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <Quote className="h-4 w-4 text-femfuel-medium flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-femfuel-dark italic line-clamp-2">
                          "{reviewPreview}"
                        </p>
                        <p className="text-xs text-femfuel-medium mt-1">- Cliente reciente</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {serviceHighlights.map((highlight, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs bg-femfuel-purple text-femfuel-dark border-femfuel-medium"
                      >
                        ✓ {highlight}
                      </Badge>
                    ))}
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookNow(vendor)
                      }}
                      className="relative bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-500 hover:to-rose-500 text-white flex-1 h-11 text-sm font-bold shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 hover:ring-4 hover:ring-pink-300/60 group"
                    >
                      <span className="relative z-10 group-hover:text-shadow-lg">Reservar</span>
                    </Button>
                    
                    <ChatButton
                      vendorId={vendor.id}
                      vendorName={vendor.name}
                      serviceContext={serviceName}
                      variant="inline"
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 h-9 px-3"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </ChatButton>
                    
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onProviderSelect(vendor)
                      }}
                      className="glassmorphism-button-perfect border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white h-9 px-4"
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