"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ChatButton } from "@/components/ui/chat-button"
import { VerifiedBadge } from "@/components/ui/verified-badge"
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
    <div className="px-4 py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-femfuel-dark">
            Especialistas Verificados
          </h2>
          <div className="bg-gradient-to-r from-femfuel-rose to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
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
                className={`cursor-pointer transition-all duration-300 border-0 bg-white shadow-md ${
                  isSelected ? 'ring-2 ring-femfuel-rose shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedProvider(vendor.id)}
              >
                <CardContent className="p-4">
                  {/* Top Section: Logo + Name + Rating - Centered */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Vendor Logo - 80px */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-femfuel-rose/10 shadow-md bg-gradient-to-br from-femfuel-light/30 to-white relative">
                        <OptimizedImage
                          src={vendor.logo || "/vendor-logo-placeholder.png"}
                          alt={`${vendor.name} logo`}
                          fill
                          sizes="80px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Name + Rating + Distance - Vertically Centered */}
                    <div className="flex-1 min-w-0">
                      {/* Vendor Name with Verification Badge - Inline, No Gap */}
                      <div className="flex items-center gap-0.5 mb-1.5">
                        <h3
                          className="text-base font-bold text-femfuel-dark hover:text-femfuel-rose transition-colors line-clamp-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            onProviderSelect(vendor)
                          }}
                        >
                          {vendor.name}
                        </h3>
                        {vendor.badges && vendor.badges.length > 0 && (
                          <VerifiedBadge size="sm" showTooltip />
                        )}
                      </div>

                      {/* Rating and Distance */}
                      <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="font-semibold text-femfuel-dark">{vendor.rating}</span>
                          <span className="text-femfuel-medium">({vendor.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>{getDistanceText(vendor)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid: Price/Duration | Availability */}
                  {vendorService && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Left Column: Price & Duration */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="text-lg font-bold text-femfuel-dark mb-0.5">
                          {formatPrice(vendorService.price)}
                        </div>
                        <div className="text-xs text-femfuel-medium">
                          {vendorService.duration} minutos
                        </div>
                      </div>

                      {/* Right Column: Availability */}
                      <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                        <div className="flex items-center gap-1 mb-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          <span className="text-xs font-semibold text-green-700">Disponible</span>
                        </div>
                        <div className="text-xs text-green-700 font-medium">
                          {getNextSlot(vendor)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Top Row: Ver Perfil + Reservar */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          onProviderSelect(vendor)
                        }}
                        className="flex-1 h-10 border-2 border-femfuel-rose/30 text-femfuel-dark hover:bg-femfuel-light hover:border-femfuel-rose font-semibold text-sm"
                      >
                        Ver Perfil
                      </Button>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onBookNow(vendor)
                        }}
                        className="flex-1 h-10 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
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
                      className="w-full h-10 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
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
    </div>
  )
}
