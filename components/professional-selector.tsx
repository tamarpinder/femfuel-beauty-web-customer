"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Users, Award, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Professional } from "@/types/vendor"

interface ProfessionalSelectorProps {
  professionals: Professional[]
  selectedProfessionalId?: string
  onProfessionalSelect: (professional: Professional | null) => void
}

export function ProfessionalSelector({
  professionals,
  selectedProfessionalId,
  onProfessionalSelect
}: ProfessionalSelectorProps) {
  const [showPortfolio, setShowPortfolio] = useState<string | null>(null)

  // If no professionals available, show "any available" option
  if (!professionals || professionals.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-femfuel-dark">
            👤 Profesionales Disponibles
          </h3>
          <p className="text-femfuel-medium">
            Selecciona tu profesional preferido para tu cita
          </p>
        </div>

        <Card className="border-femfuel-rose/20 hover:border-femfuel-rose/40 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-femfuel-rose/30">
                  <AvatarFallback className="bg-femfuel-light text-femfuel-rose text-lg font-bold">
                    ★
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-femfuel-dark">
                    Cualquier profesional disponible
                  </h4>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">Equipo experto</span>
                    </div>
                    <span className="text-femfuel-medium">•</span>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      ✅ Disponible hoy
                    </Badge>
                  </div>
                  <p className="text-femfuel-medium text-sm">
                    Te asignaremos el mejor profesional disponible para tu horario
                  </p>
                </div>
              </div>
              
              <Button
                variant="default"
                className="bg-femfuel-rose hover:bg-femfuel-rose/90"
                onClick={() => onProfessionalSelect(null)}
              >
                Continuar
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getAvailabilityStatus = (nextAvailable?: string) => {
    if (!nextAvailable) return { status: "unknown", color: "gray", text: "Sin información" }
    
    if (nextAvailable.includes("Hoy")) {
      return { status: "available", color: "green", text: nextAvailable }
    } else if (nextAvailable.includes("Mañana")) {
      return { status: "limited", color: "yellow", text: nextAvailable }
    } else {
      return { status: "busy", color: "red", text: nextAvailable }
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-femfuel-dark">
          🎯 Elige tu profesional preferido
        </h3>
        <p className="text-femfuel-medium">
          Cada profesional tiene especialidades únicas y horarios diferentes
        </p>
      </div>

      <div className="space-y-4">
        {professionals.map((professional) => {
          const availability = getAvailabilityStatus(professional.nextAvailable)
          const isSelected = selectedProfessionalId === professional.id
          
          return (
            <Card 
              key={professional.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg border-2",
                isSelected 
                  ? "border-femfuel-rose shadow-lg bg-femfuel-rose/5" 
                  : "border-gray-200 hover:border-femfuel-rose/30"
              )}
              onClick={() => onProfessionalSelect(professional)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Professional Avatar */}
                  <Avatar className="h-16 w-16 border-2 border-femfuel-light">
                    <AvatarImage 
                      src={professional.image} 
                      alt={professional.name}
                    />
                    <AvatarFallback className="bg-femfuel-light text-femfuel-rose text-lg font-bold">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    {/* Name and Rating */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-femfuel-dark flex items-center gap-2">
                          {professional.name}
                          {professional.isTopRated && (
                            <Award className="h-4 w-4 text-yellow-500" />
                          )}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-femfuel-medium">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{professional.rating}</span>
                            <span>({professional.reviewCount} reseñas)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{professional.yearsExperience}+ años exp.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{professional.monthlyBookings} citas este mes</span>
                          </div>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <Badge className="bg-femfuel-rose text-white">
                          Seleccionado
                        </Badge>
                      )}
                    </div>

                    {/* Bio */}
                    {professional.bio && (
                      <p className="text-sm text-femfuel-medium leading-relaxed">
                        {professional.bio}
                      </p>
                    )}

                    {/* Specialties */}
                    <div>
                      <h5 className="text-sm font-semibold text-femfuel-dark mb-2 flex items-center gap-1">
                        🏆 Especialidades:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {professional.specialties.map((specialty, index) => (
                          <Badge 
                            key={index}
                            variant="secondary" 
                            className="text-xs bg-femfuel-purple/20 text-femfuel-dark"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Add-ons */}
                    {professional.recommendedAddons.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-femfuel-dark mb-2">
                          ✨ Servicios especiales:
                        </h5>
                        <div className="space-y-1">
                          {professional.recommendedAddons.slice(0, 2).map((addon) => (
                            <div key={addon.id} className="flex items-center justify-between text-sm">
                              <span className="text-femfuel-medium">• {addon.name}</span>
                              <Badge variant="outline" className="text-xs">
                                +RD${addon.price}
                              </Badge>
                            </div>
                          ))}
                          {professional.recommendedAddons.length > 2 && (
                            <div className="text-xs text-femfuel-medium">
                              +{professional.recommendedAddons.length - 2} servicios más
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Availability */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          availability.status === "available" ? "bg-green-500" :
                          availability.status === "limited" ? "bg-yellow-500" :
                          "bg-red-500"
                        )} />
                        <span className="text-sm font-medium text-femfuel-dark">
                          {availability.text}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowPortfolio(
                              showPortfolio === professional.id ? null : professional.id
                            )
                          }}
                        >
                          Ver Portfolio
                        </Button>
                        
                        {!isSelected && (
                          <Button
                            size="sm"
                            className="bg-femfuel-rose hover:bg-[#9f1853] text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              onProfessionalSelect(professional)
                            }}
                          >
                            Seleccionar
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Portfolio Preview (Collapsible) */}
                    {showPortfolio === professional.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h6 className="font-medium text-femfuel-dark mb-2">Portfolio de trabajos:</h6>
                        <div className="grid grid-cols-3 gap-2">
                          {/* Mock portfolio images */}
                          {[1, 2, 3].map((i) => (
                            <div 
                              key={i}
                              className="aspect-square bg-gray-200 rounded-md flex items-center justify-center"
                            >
                              <span className="text-xs text-gray-500">Trabajo {i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* No Preference Option */}
        <Card 
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-lg border-2 border-dashed",
            selectedProfessionalId === null 
              ? "border-femfuel-rose shadow-lg bg-femfuel-rose/5" 
              : "border-gray-300 hover:border-femfuel-rose/50"
          )}
          onClick={() => onProfessionalSelect(null)}
        >
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <div className="text-4xl">🤷</div>
              <h4 className="text-lg font-bold text-femfuel-dark">
                Sin preferencia de profesional
              </h4>
              <p className="text-sm text-femfuel-medium">
                Te asignaremos el mejor profesional disponible para tu horario preferido
              </p>
              {selectedProfessionalId === null && (
                <Badge className="bg-femfuel-rose text-white">
                  Seleccionado
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}