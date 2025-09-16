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
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-femfuel-dark">
          Personaliza tu Cita
        </h3>
        <p className="text-sm sm:text-base text-femfuel-medium">
          Selecciona complementos y tu horario preferido
        </p>
      </div>

      {/* Selected Professional Header - Ultra Compact Mobile */}
      {selectedProfessional && (
        <Card className="border-femfuel-rose/20 bg-gradient-to-r from-femfuel-light/20 to-pink-50">
          <CardContent className="p-2 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8 sm:h-12 sm:w-12 border sm:border-2 border-femfuel-rose/30">
                  <AvatarImage
                    src={selectedProfessional.image}
                    alt={selectedProfessional.name}
                  />
                  <AvatarFallback className="bg-femfuel-light text-femfuel-rose text-xs sm:text-base font-bold">
                    {selectedProfessional.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-femfuel-dark text-xs sm:text-base truncate">
                    Con: {selectedProfessional.name}
                  </h4>
                  <div className="flex items-center gap-1 sm:gap-3 text-xs sm:text-sm text-femfuel-medium">
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                      <span>{selectedProfessional.rating}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline truncate">{selectedProfessional.specialties[0]}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="text-xs px-1.5 py-1 h-6 sm:h-auto sm:px-3 sm:py-2"
                onClick={onProfessionalChange}
              >
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add-ons Section */}
      {availableAddons.length > 0 && (
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
              Mejora tu Experiencia
              <Badge variant="secondary" className="text-xs">
                Opcional
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 sm:space-y-4">
              {availableAddons.slice(0, expandedAddons ? availableAddons.length : 3).map((addon) => {
                const isSelected = isAddonSelected(addon.id)
                return (
                  <div
                    key={addon.id}
                    className={cn(
                      "flex items-center justify-between p-2 sm:p-4 rounded-lg border transition-colors",
                      isSelected
                        ? "border-femfuel-rose bg-femfuel-rose/5"
                        : "border-gray-200 hover:border-femfuel-rose/30"
                    )}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
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
                          className="font-medium text-femfuel-dark cursor-pointer flex items-center gap-1 sm:gap-2 text-sm"
                        >
                          {addon.name}
                          {(addon as any).isRecommended && (
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 hidden sm:inline-flex">
                              Recomendado por {(addon as any).professionalName}
                            </Badge>
                          )}
                        </label>
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-femfuel-medium">
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
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="flex items-center justify-between text-sm sm:text-base">
            <span>Selecciona Fecha y Hora</span>
            {totalDuration !== serviceDuration && (
              <Badge variant="outline" className="text-xs">
                {totalDuration} min
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <EnhancedBookingCalendar
            vendorId={vendorId}
            professionalId={selectedProfessional?.id}
            serviceDuration={totalDuration} // Use total duration including add-ons
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={onDateSelect}
            onTimeSelect={onTimeSelect}
          />

          {/* Booking Summary - Ultra Compact */}
          {selectedDate && selectedTime && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="font-medium text-green-800 mb-1 sm:mb-2 text-xs sm:text-sm">
                Resumen de tu cita:
              </h5>
              <div className="space-y-0.5 sm:space-y-1 text-xs text-green-700">
                <div className="text-xs">{format(selectedDate, 'EEEE, d MMMM yyyy')}</div>
                <div className="text-xs">{selectedTime} - {
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
                  <div className="text-xs">Con {selectedProfessional.name}</div>
                )}
                <div className="font-medium text-xs">Total: RD${totalPrice.toLocaleString()}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}