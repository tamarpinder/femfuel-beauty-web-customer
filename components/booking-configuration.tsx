"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EnhancedBookingCalendar } from "@/components/enhanced-booking-calendar"
import { Clock, Star, Plus, Minus, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Professional, ServiceAddon } from "@/types/vendor"
import { format } from "date-fns"

interface BookingConfigurationProps {
  selectedProfessional: Professional | null
  vendorId: string
  serviceDuration: number
  basePrice: number
  selectedDate?: Date
  selectedTime?: string
  selectedAddons: ServiceAddon[]
  onDateSelect: (date: Date | undefined) => void
  onTimeSelect: (time: string) => void
  onAddonsChange: (addons: ServiceAddon[]) => void
  onProfessionalChange: () => void
}

export function BookingConfiguration({
  selectedProfessional,
  vendorId,
  serviceDuration,
  basePrice,
  selectedDate,
  selectedTime,
  selectedAddons,
  onDateSelect,
  onTimeSelect,
  onAddonsChange,
  onProfessionalChange
}: BookingConfigurationProps) {
  const [expandedAddons, setExpandedAddons] = useState(false)

  // Calculate totals
  const totalAddonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
  const totalAddonDuration = selectedAddons.reduce((sum, addon) => sum + (addon.duration || 0), 0)
  const totalDuration = serviceDuration + totalAddonDuration
  const totalPrice = basePrice + totalAddonPrice

  // Get all available addons (professional recommended + service addons)
  const availableAddons = useMemo(() => {
    const addons = selectedProfessional?.recommendedAddons || []
    return addons.map(addon => ({
      ...addon,
      isRecommended: true,
      professionalName: selectedProfessional?.name
    }))
  }, [selectedProfessional])

  const handleAddonToggle = (addon: ServiceAddon, checked: boolean) => {
    if (checked) {
      onAddonsChange([...selectedAddons, addon])
    } else {
      onAddonsChange(selectedAddons.filter(a => a.id !== addon.id))
    }
  }

  const isAddonSelected = (addonId: string) => {
    return selectedAddons.some(addon => addon.id === addonId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-femfuel-dark">
          📅 Personaliza tu Cita
        </h3>
        <p className="text-femfuel-medium">
          Selecciona complementos y tu horario preferido
        </p>
      </div>

      {/* Selected Professional Header */}
      {selectedProfessional && (
        <Card className="border-femfuel-rose/20 bg-gradient-to-r from-femfuel-light/20 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-femfuel-rose/30">
                  <AvatarImage 
                    src={selectedProfessional.image} 
                    alt={selectedProfessional.name}
                  />
                  <AvatarFallback className="bg-femfuel-light text-femfuel-rose font-bold">
                    {selectedProfessional.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-bold text-femfuel-dark flex items-center gap-2">
                    👤 Con: {selectedProfessional.name}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-femfuel-medium">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{selectedProfessional.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedProfessional.specialties[0]}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={onProfessionalChange}
              >
                Cambiar profesional
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add-ons Section */}
      {availableAddons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              ✨ Mejora tu Experiencia
              <Badge variant="secondary" className="text-xs">
                Opcional
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableAddons.slice(0, expandedAddons ? availableAddons.length : 3).map((addon) => {
                const isSelected = isAddonSelected(addon.id)
                return (
                  <div 
                    key={addon.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-colors",
                      isSelected 
                        ? "border-femfuel-rose bg-femfuel-rose/5" 
                        : "border-gray-200 hover:border-femfuel-rose/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={addon.id}
                        checked={isSelected}
                        onCheckedChange={(checked) => 
                          handleAddonToggle(addon, checked as boolean)
                        }
                        className="data-[state=checked]:bg-femfuel-rose border-femfuel-rose"
                      />
                      
                      <div>
                        <label 
                          htmlFor={addon.id}
                          className="font-medium text-femfuel-dark cursor-pointer flex items-center gap-2"
                        >
                          {addon.name}
                          {(addon as any).isRecommended && (
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                              ⭐ Recomendado por {(addon as any).professionalName}
                            </Badge>
                          )}
                        </label>
                        <div className="flex items-center gap-3 text-sm text-femfuel-medium">
                          <span className="font-medium text-femfuel-rose">
                            +RD${addon.price.toLocaleString()}
                          </span>
                          {addon.duration && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>+{addon.duration} min</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Badge className="bg-femfuel-rose text-white text-xs">
                        Agregado
                      </Badge>
                    )}
                  </div>
                )
              })}

              {availableAddons.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedAddons(!expandedAddons)}
                  className="w-full text-femfuel-medium hover:text-femfuel-dark"
                >
                  {expandedAddons ? (
                    <>
                      <Minus className="h-4 w-4 mr-2" />
                      Mostrar menos
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Ver {availableAddons.length - 3} complementos más
                    </>
                  )}
                </Button>
              )}

              {/* Summary */}
              {selectedAddons.length > 0 && (
                <div className="pt-4 border-t bg-femfuel-light/20 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-femfuel-medium" />
                        <span className="text-femfuel-dark font-medium">
                          Tiempo total: {totalDuration} minutos
                        </span>
                      </div>
                      <div className="text-femfuel-medium">
                        Servicio base ({serviceDuration} min) + complementos ({totalAddonDuration} min)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-femfuel-rose">
                        Extra: +RD${totalAddonPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-femfuel-medium">
                        Total: RD${totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="flex items-center gap-2">
              📅 Selecciona Fecha y Hora
            </span>
            {totalDuration !== serviceDuration && (
              <Badge variant="outline" className="text-xs">
                Duración: {totalDuration} min
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedBookingCalendar
            vendorId={vendorId}
            serviceDuration={totalDuration} // Use total duration including add-ons
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={onDateSelect}
            onTimeSelect={onTimeSelect}
          />

          {/* Booking Summary */}
          {selectedDate && selectedTime && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">
                ✅ Resumen de tu cita:
              </h5>
              <div className="space-y-1 text-sm text-green-700">
                <div>📅 {format(selectedDate, 'EEEE, d MMMM yyyy')}</div>
                <div>🕐 {selectedTime} - {
                  // Calculate end time
                  (() => {
                    const [hours, minutes] = selectedTime.split(':').map(Number)
                    const endMinutes = hours * 60 + minutes + totalDuration
                    const endHours = Math.floor(endMinutes / 60)
                    const endMins = endMinutes % 60
                    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
                  })()
                }</div>
                {selectedProfessional && (
                  <div>👤 Con {selectedProfessional.name}</div>
                )}
                <div>💰 Total: RD${totalPrice.toLocaleString()}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}