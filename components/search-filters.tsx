"use client"

import { useState } from "react"
import { Filter, X, MapPin, Star, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatPrice } from "@/lib/price-utils"

export interface SearchFilters {
  serviceTypes: string[]
  priceRange: [number, number]
  distance: string
  rating: number
  availability: string
}

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  resultsCount?: number
}

export function SearchFiltersComponent({ filters, onFiltersChange, resultsCount }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const serviceTypes = ["Uñas", "Maquillaje", "Facial", "Spa", "Peinados", "Pestañas", "Masajes", "Depilación"]

  const distanceOptions = [
    { value: "1km", label: "1 km" },
    { value: "5km", label: "5 km" },
    { value: "10km", label: "10 km" },
    { value: "25km", label: "25+ km" },
  ]

  const availabilityOptions = [
    { value: "today", label: "Hoy" },
    { value: "tomorrow", label: "Mañana" },
    { value: "week", label: "Esta semana" },
    { value: "anytime", label: "Cualquier momento" },
  ]

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleServiceType = (serviceType: string) => {
    const newTypes = filters.serviceTypes.includes(serviceType)
      ? filters.serviceTypes.filter((type) => type !== serviceType)
      : [...filters.serviceTypes, serviceType]
    updateFilters({ serviceTypes: newTypes })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      serviceTypes: [],
      priceRange: [0, 10000],
      distance: "25km",
      rating: 0,
      availability: "anytime",
    })
  }

  const activeFiltersCount =
    filters.serviceTypes.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0) +
    (filters.distance !== "25km" ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.availability !== "anytime" ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Service Types */}
      <div>
        <h3 className="font-medium text-femfuel-dark mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Tipo de Servicio
        </h3>
        <div className="space-y-2">
          {serviceTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.serviceTypes.includes(type)}
                onCheckedChange={() => toggleServiceType(type)}
              />
              <label htmlFor={type} className="text-sm text-femfuel-medium cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-femfuel-dark mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Rango de Precio
        </h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={10000}
            min={0}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-black">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Distance */}
      <div>
        <h3 className="font-medium text-femfuel-dark mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Distancia
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {distanceOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.distance === option.value ? "default" : "outline"}
              size="sm"
              className={filters.distance === option.value ? "bg-femfuel-rose hover:bg-femfuel-rose-hover" : ""}
              onClick={() => updateFilters({ distance: option.value })}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-medium text-femfuel-dark mb-3 flex items-center gap-2">
          <Star className="h-4 w-4" />
          Calificación Mínima
        </h3>
        <div className="grid grid-cols-5 gap-1">
          {[0, 1, 2, 3, 4].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? "default" : "outline"}
              size="sm"
              className={`${filters.rating === rating ? "bg-femfuel-rose hover:bg-femfuel-rose-hover" : ""} p-2`}
              onClick={() => updateFilters({ rating })}
            >
              {rating === 0 ? "Todas" : `${rating}+`}
            </Button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-medium text-femfuel-dark mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Disponibilidad
        </h3>
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.availability === option.value ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start ${filters.availability === option.value ? "bg-femfuel-rose hover:bg-femfuel-rose-hover" : ""}`}
              onClick={() => updateFilters({ availability: option.value })}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearAllFilters}>
          Limpiar Filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block sticky top-28">
        <Card className="border-gray-100 bg-white/80 backdrop-blur-md shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-femfuel-dark">Filtros</CardTitle>
            {resultsCount !== undefined && <p className="text-sm text-femfuel-medium mt-1">{resultsCount} resultados</p>}
          </CardHeader>
          <CardContent className="space-y-6">
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full mb-4 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && <Badge className="ml-2 bg-femfuel-rose">{activeFiltersCount}</Badge>}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filtros de Búsqueda</SheetTitle>
              <SheetDescription>
                {resultsCount !== undefined && `${resultsCount} resultados encontrados`}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto max-h-[60vh]">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.serviceTypes.map((type) => (
            <Badge key={type} variant="secondary" className="bg-femfuel-purple text-femfuel-dark">
              {type}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleServiceType(type)} />
            </Badge>
          ))}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) && (
            <Badge variant="secondary" className="bg-femfuel-purple text-black">
              {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ priceRange: [0, 10000] })} />
            </Badge>
          )}
          {filters.distance !== "25km" && (
            <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark">
              {distanceOptions.find((d) => d.value === filters.distance)?.label}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ distance: "25km" })} />
            </Badge>
          )}
          {filters.rating > 0 && (
            <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark">
              {filters.rating}+ estrellas
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ rating: 0 })} />
            </Badge>
          )}
          {filters.availability !== "anytime" && (
            <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark">
              {availabilityOptions.find((a) => a.value === filters.availability)?.label}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ availability: "anytime" })} />
            </Badge>
          )}
        </div>
      )}
    </>
  )
}
