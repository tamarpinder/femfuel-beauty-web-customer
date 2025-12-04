"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Check, Search, X, ArrowRight } from "lucide-react"

interface LocationSelectorProps {
  currentLocation: string
  onLocationChange: (location: string) => void
}

// Popular locations (most used)
const popularLocations = [
  "Santo Domingo",
  "Santiago",
  "Puerto Plata",
  "Punta Cana",
  "La Romana",
  "San Pedro de Macorís"
]

// All provinces of Dominican Republic
const allProvinces = [
  { name: "Santo Domingo", region: "Nacional" },
  { name: "Distrito Nacional", region: "Nacional" },
  { name: "Azua", region: "Sur" },
  { name: "Bahoruco", region: "Sur" },
  { name: "Barahona", region: "Sur" },
  { name: "Dajabón", region: "Noroeste" },
  { name: "Duarte", region: "Nordeste" },
  { name: "El Seibo", region: "Este" },
  { name: "Elías Piña", region: "Suroeste" },
  { name: "Espaillat", region: "Norte" },
  { name: "Hato Mayor", region: "Este" },
  { name: "Hermanas Mirabal", region: "Nordeste" },
  { name: "Independencia", region: "Sur" },
  { name: "La Altagracia", region: "Este" },
  { name: "La Romana", region: "Este" },
  { name: "La Vega", region: "Central" },
  { name: "María Trinidad Sánchez", region: "Nordeste" },
  { name: "Monseñor Nouel", region: "Central" },
  { name: "Monte Cristi", region: "Noroeste" },
  { name: "Monte Plata", region: "Este" },
  { name: "Pedernales", region: "Suroeste" },
  { name: "Peravia", region: "Sur" },
  { name: "Puerto Plata", region: "Norte" },
  { name: "Samaná", region: "Nordeste" },
  { name: "San Cristóbal", region: "Sur" },
  { name: "San José de Ocoa", region: "Sur" },
  { name: "San Juan", region: "Suroeste" },
  { name: "San Pedro de Macorís", region: "Este" },
  { name: "Sánchez Ramírez", region: "Central" },
  { name: "Santiago", region: "Norte" },
  { name: "Santiago Rodríguez", region: "Noroeste" },
  { name: "Valverde", region: "Noroeste" }
].sort((a, b) => a.name.localeCompare(b.name, 'es'))

export function LocationSelector({ currentLocation, onLocationChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAllLocations, setShowAllLocations] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter provinces based on search (only when viewing all or searching)
  const filteredProvinces = allProvinces.filter(province =>
    province.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group by region (for full list view)
  const groupedProvinces = filteredProvinces.reduce((acc, province) => {
    if (!acc[province.region]) {
      acc[province.region] = []
    }
    acc[province.region].push(province)
    return acc
  }, {} as Record<string, typeof allProvinces>)

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setShowAllLocations(false)
        setSearchQuery("")
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Auto-focus search when viewing all locations
  useEffect(() => {
    if (showAllLocations && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showAllLocations])

  const handleSelectLocation = (location: string) => {
    onLocationChange(location)
    setIsOpen(false)
    setShowAllLocations(false)
    setSearchQuery("")
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Location Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-femfuel-medium hover:text-femfuel-dark hover:bg-femfuel-light/50 border-2 border-transparent hover:border-femfuel-rose/20 transition-all duration-300 group shadow-sm hover:shadow-md"
        aria-label="Select location"
      >
        <MapPin className="h-4 w-4 text-femfuel-rose transition-transform duration-300" />
        <span className="font-medium">{currentLocation}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-femfuel-rose/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {!showAllLocations ? (
            <>
              {/* Popular Locations View */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-femfuel-dark mb-3">
                  Ubicaciones Populares
                </h3>

                {/* Popular Locations List */}
                <div className="space-y-1">
                  {popularLocations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleSelectLocation(location)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-femfuel-light/50 hover:shadow-sm transition-all duration-200 text-left group"
                    >
                      <span className="text-sm font-medium text-femfuel-dark group-hover:text-femfuel-rose transition-colors duration-200">
                        {location}
                      </span>
                      {currentLocation === location && (
                        <Check className="h-4 w-4 text-femfuel-rose" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* View All Button */}
              <div className="border-t-2 border-femfuel-rose/10 p-3">
                <button
                  onClick={() => setShowAllLocations(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 group"
                >
                  <span>Ver Todas las Ubicaciones</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* All Locations View with Search */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-femfuel-dark">
                    Todas las Ubicaciones
                  </h3>
                  <button
                    onClick={() => {
                      setShowAllLocations(false)
                      setSearchQuery("")
                    }}
                    className="text-xs text-femfuel-medium hover:text-femfuel-rose transition-colors duration-200"
                  >
                    Volver
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-femfuel-rose/20 focus-within:border-femfuel-rose focus-within:ring-2 focus-within:ring-femfuel-rose/10 shadow-sm transition-all duration-200">
                  <Search className="h-4 w-4 text-femfuel-medium flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar provincia..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-femfuel-dark placeholder:text-femfuel-medium/60"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                      aria-label="Clear search"
                    >
                      <X className="h-3 w-3 text-femfuel-medium" />
                    </button>
                  )}
                </div>
              </div>

              {/* All Provinces List */}
              <div className="max-h-80 overflow-y-auto">
                {Object.keys(groupedProvinces).length > 0 ? (
                  Object.entries(groupedProvinces).map(([region, provinceList]) => (
                    <div key={region} className="py-2">
                      {/* Region Header */}
                      <div className="px-4 py-1.5">
                        <h4 className="text-xs font-semibold text-femfuel-medium uppercase tracking-wide">
                          {region}
                        </h4>
                      </div>

                      {/* Provinces in Region */}
                      {provinceList.map((province) => (
                        <button
                          key={province.name}
                          onClick={() => handleSelectLocation(province.name)}
                          className="w-full flex items-center justify-between px-4 py-2 hover:bg-femfuel-light/50 hover:shadow-sm transition-all duration-200 text-left group rounded-lg"
                        >
                          <span className="text-sm font-medium text-femfuel-dark group-hover:text-femfuel-rose transition-colors duration-200">
                            {province.name}
                          </span>
                          {currentLocation === province.name && (
                            <Check className="h-4 w-4 text-femfuel-rose" />
                          )}
                        </button>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-femfuel-medium">
                      No se encontraron provincias para "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-femfuel-medium text-center">
                  {filteredProvinces.length} {filteredProvinces.length === 1 ? 'provincia' : 'provincias'}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
