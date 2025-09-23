"use client"

import { useState, useEffect, useMemo } from "react"
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  getDayAvailability,
  getMultiDayAvailability,
  getProfessionalDayAvailability,
  getProfessionalMultiDayAvailability,
  vendorSchedules,
  getDefaultSchedule,
  type DayAvailability,
  type TimeSlot,
  type VendorSchedule
} from "@/lib/vendor-scheduling"
import { format, isSameDay, startOfDay } from "date-fns"

interface EnhancedBookingCalendarProps {
  vendorId: string
  professionalId?: string // Optional professional ID for filtering
  serviceDuration: number // in minutes
  selectedDate?: Date
  selectedTime?: string
  onDateSelect: (date: Date | undefined) => void
  onTimeSelect: (time: string) => void
}

export function EnhancedBookingCalendar({
  vendorId,
  professionalId,
  serviceDuration,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect
}: EnhancedBookingCalendarProps) {
  const [availability, setAvailability] = useState<DayAvailability[]>([])
  const [currentDateAvailability, setCurrentDateAvailability] = useState<DayAvailability | null>(null)
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false)

  const schedule = vendorSchedules[vendorId] || getDefaultSchedule()

  // Load availability for the next 30 days
  useEffect(() => {
    try {
      const monthlyAvailability = professionalId
        ? getProfessionalMultiDayAvailability(vendorId, professionalId, serviceDuration, new Date(), 30)
        : getMultiDayAvailability(vendorId, serviceDuration, new Date(), 30)
      setAvailability(monthlyAvailability)
    } catch (error) {
      console.error('Error loading monthly availability:', error)
      // Set empty availability on error
      setAvailability([])
    }
  }, [vendorId, professionalId, serviceDuration])

  // Load time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      setIsLoadingTimeSlots(true)
      // Simulate loading delay for realism
      setTimeout(() => {
        try {
          const dayAvailability = professionalId
            ? getProfessionalDayAvailability(vendorId, professionalId, serviceDuration, selectedDate)
            : getDayAvailability(vendorId, serviceDuration, selectedDate)
          setCurrentDateAvailability(dayAvailability)
        } catch (error) {
          console.error('Error loading day availability:', error)
          // Set null on error
          setCurrentDateAvailability(null)
        }
        setIsLoadingTimeSlots(false)
      }, 300)
    } else {
      setCurrentDateAvailability(null)
    }
  }, [selectedDate, vendorId, professionalId, serviceDuration])

  // Create modifiers for the calendar
  const calendarModifiers = useMemo(() => {
    const modifiers: Record<string, Date[]> = {
      available: [],
      limited: [],
      full: [],
      closed: []
    }

    availability.forEach(day => {
      if (day.date < startOfDay(new Date())) return // Skip past dates
      modifiers[day.status].push(day.date)
    })

    return modifiers
  }, [availability])

  // Get availability info for selected date
  const selectedDateInfo = useMemo(() => {
    if (!selectedDate) return null
    return availability.find(day => isSameDay(day.date, selectedDate))
  }, [selectedDate, availability])

  // Quick availability suggestions
  const quickSuggestions = useMemo(() => {
    const suggestions = availability
      .filter(day => day.status === 'available' && day.availableSlots > 0)
      .slice(0, 3)
      .map(day => {
        const availableTimes = day.timeSlots
          .filter(slot => slot.available)
          .slice(0, 3)
          .map(slot => slot.time)

        return {
          date: day.date,
          availableTimes
        }
      })
      .filter(suggestion => suggestion.availableTimes.length > 0)

    return suggestions
  }, [availability])

  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date)
    onTimeSelect('') // Clear selected time when date changes
  }

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time)
  }

  const getAvailabilityIcon = (status: DayAvailability['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'limited':
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />
      case 'full':
        return <XCircle className="h-3 w-3 text-red-500" />
      case 'closed':
        return <XCircle className="h-3 w-3 text-gray-400" />
    }
  }

  const getAvailabilityLabel = (status: DayAvailability['status'], availableSlots: number) => {
    switch (status) {
      case 'available':
        return `${availableSlots} horarios disponibles`
      case 'limited':
        return `Solo ${availableSlots} horarios`
      case 'full':
        return 'Completamente lleno'
      case 'closed':
        return 'Cerrado'
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Availability Overview */}
      <div className="bg-gradient-to-r from-femfuel-light/30 to-pink-50 rounded-lg p-4 border border-femfuel-rose/10">
        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon className="h-4 w-4 text-femfuel-rose" />
          <h4 className="font-medium text-femfuel-dark">Próximos Disponibles</h4>
        </div>
        
        {quickSuggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {quickSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-femfuel-rose/20 p-4 lg:p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-femfuel-rose/40"
              >
                {/* Date Header */}
                <div className="flex items-center gap-2 mb-3 lg:mb-4">
                  <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
                  <h5 className="font-semibold text-femfuel-dark text-sm lg:text-base">
                    {format(suggestion.date, 'EEE d MMM')}
                  </h5>
                </div>

                {/* Time Slots */}
                <div className="space-y-2">
                  {suggestion.availableTimes.map(time => {
                    const isSelectedTime = selectedTime === time && selectedDate && isSameDay(selectedDate, suggestion.date)
                    return (
                      <Button
                        key={time}
                        variant={isSelectedTime ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start h-8 lg:h-9 px-3 border transition-all duration-200",
                          isSelectedTime
                            ? "bg-femfuel-rose text-white border-femfuel-rose shadow-md"
                            : "bg-femfuel-light/30 hover:bg-femfuel-rose hover:text-white text-femfuel-dark border-femfuel-rose/20 hover:border-femfuel-rose"
                        )}
                        onClick={() => {
                          handleDateSelect(suggestion.date)
                          // Instant time selection - no timeout
                          onTimeSelect(time)
                          // Smooth scroll to booking summary after selection
                          setTimeout(() => {
                            const summaryElement = document.querySelector('[data-booking-summary]')
                            if (summaryElement) {
                              summaryElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            }
                          }, 200)
                        }}
                      >
                        <Clock className="h-3 w-3 mr-2" />
                        <span className="font-medium text-xs lg:text-sm">{time}</span>
                        {isSelectedTime && (
                          <span className="ml-auto text-xs">✓</span>
                        )}
                      </Button>
                    )
                  })}
                </div>

                {/* Quick Select Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 lg:mt-4 h-8 lg:h-9 border-femfuel-rose/30 text-femfuel-rose hover:bg-femfuel-rose hover:text-white transition-all duration-200 text-xs lg:text-sm"
                  onClick={() => handleDateSelect(suggestion.date)}
                >
                  Ver más horarios
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <div className="animate-pulse flex space-x-1 mb-2">
                <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
                <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
                <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
              </div>
              <p className="text-femfuel-medium text-sm">Cargando disponibilidad...</p>
            </div>
          </div>
        )}
      </div>

      {/* Calendar and Time Selection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-full overflow-hidden">
        {/* Calendar Section */}
        <div className="space-y-4 min-w-0">
          <div>
            <Label className="text-femfuel-dark mb-2 block font-medium">
              Selecciona una fecha
            </Label>
            
            {/* Availability Legend */}
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full opacity-70"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-70"></div>
                <span>Limitado</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-70"></div>
                <span>Lleno</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-gray-400 rounded-full opacity-70"></div>
                <span>Cerrado</span>
              </div>
            </div>
          </div>

          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < startOfDay(new Date())} // Only disable past dates
            className="rounded-md border w-full max-w-full"
            modifiers={calendarModifiers}
            modifiersClassNames={{
              available: "bg-green-50 text-green-800 ring-1 ring-green-200",
              limited: "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-200",
              full: "bg-red-50 text-red-600 ring-1 ring-red-200",
              closed: "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
            }}
            classNames={{
              day_button: cn(
                "transition-all duration-200",
                "data-[selected-single=true]:bg-femfuel-rose data-[selected-single=true]:text-white",
                "data-[selected-single=true]:ring-2 data-[selected-single=true]:ring-femfuel-rose",
                "data-[selected-single=true]:ring-offset-1"
              )
            }}
          />

          {/* Selected Date Info */}
          {selectedDateInfo && (
            <div className="p-3 border rounded-lg bg-white">
              <div className="flex items-center gap-2 mb-2">
                {getAvailabilityIcon(selectedDateInfo.status)}
                <span className="font-medium text-femfuel-dark">
                  {format(selectedDate!, 'EEEE, d MMMM yyyy')}
                </span>
              </div>
              <p className="text-sm text-femfuel-medium">
                {getAvailabilityLabel(selectedDateInfo.status, selectedDateInfo.availableSlots)}
              </p>
            </div>
          )}
        </div>

        {/* Time Slots Section */}
        <div className="space-y-4 min-w-0">
          <Label className="text-femfuel-dark font-medium">
            {selectedDate ? 'Horarios disponibles' : 'Selecciona una fecha primero'}
          </Label>

          {!selectedDate ? (
            <div className="h-80 flex flex-col items-center justify-center border rounded-md bg-gray-50">
              <CalendarIcon className="h-8 w-8 text-femfuel-medium mb-2" />
              <p className="text-femfuel-medium text-sm text-center">
                Selecciona una fecha para ver los<br />horarios disponibles
              </p>
            </div>
          ) : isLoadingTimeSlots ? (
            <div className="h-80 flex items-center justify-center border rounded-md">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-femfuel-rose mx-auto mb-2"></div>
                <p className="text-femfuel-medium text-sm">Cargando horarios...</p>
              </div>
            </div>
          ) : currentDateAvailability?.status === 'closed' ? (
            <div className="h-80 flex flex-col items-center justify-center border rounded-md bg-gray-50">
              <XCircle className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-femfuel-medium text-sm text-center">
                El proveedor no trabaja este día<br />
                <span className="text-xs">
                  Horario: {schedule.workingDays.map(d => ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][d]).join(', ')}
                </span>
              </p>
            </div>
          ) : currentDateAvailability?.availableSlots === 0 ? (
            <div className="h-80 flex flex-col items-center justify-center border rounded-md bg-red-50">
              <XCircle className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-femfuel-medium text-sm text-center mb-3">
                Este día está completamente lleno
              </p>
              <div className="space-y-1">
                <p className="text-xs text-femfuel-medium text-center">Prueba estas fechas:</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {quickSuggestions.slice(0, 2).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 h-auto"
                      onClick={() => handleDateSelect(suggestion.date)}
                    >
                      {format(suggestion.date, 'd MMM')}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto border rounded-md p-3">
              <div className="grid grid-cols-2 gap-2">
                {currentDateAvailability?.timeSlots.map((slot: TimeSlot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    size="sm"
                    disabled={!slot.available}
                    className={cn(
                      "relative",
                      selectedTime === slot.time ? "bg-femfuel-rose hover:bg-femfuel-rose-hover text-white" : "",
                      !slot.available && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm">{slot.time}</span>
                      {!slot.available && slot.reason && (
                        <span className="text-xs opacity-75 truncate">{slot.reason}</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
              
              {/* Time slots summary */}
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between text-xs text-femfuel-medium">
                  <span>
                    {currentDateAvailability?.availableSlots} de {currentDateAvailability?.totalSlots} horarios disponibles
                  </span>
                  <span>Duración: {serviceDuration} min</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for calendar dots */}
      <style jsx global>{`
        .rdp-day_available::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
          opacity: 0.8;
        }
        .rdp-day_limited::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 6px;
          height: 6px;
          background-color: #f59e0b;
          border-radius: 50%;
          opacity: 0.8;
        }
        .rdp-day_full::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 6px;
          height: 6px;
          background-color: #ef4444;
          border-radius: 50%;
          opacity: 0.8;
        }
        .rdp-day_closed::after {
          content: '';
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 6px;
          height: 6px;
          background-color: #9ca3af;
          border-radius: 50%;
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}