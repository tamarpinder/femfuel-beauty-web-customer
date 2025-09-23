'use client'

import { useState } from "react"
import { Star, Award, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Professional {
  id: string
  name: string
  image?: string
  rating: number
  reviewCount: number
  yearsExperience: number
  monthlyBookings: number
  specialties: string[]
  isTopRated?: boolean
  nextAvailable?: string
  bio?: string
}

interface ProfessionalShowcaseProps {
  professionals: Professional[]
  onViewProfile: (professional: Professional) => void
  onBookNow: (professional: Professional) => void
}

export function ProfessionalShowcase({
  professionals,
  onViewProfile,
  onBookNow
}: ProfessionalShowcaseProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('professionals-scroll')
    if (container) {
      const scrollAmount = 320 // Width of one card + gap
      const newScrollLeft = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })

      // Update button states
      setTimeout(() => {
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
      }, 300)
    }
  }

  if (professionals.length === 0) {
    return null
  }

  return (
    <section className="w-full py-12 bg-gradient-to-br from-purple-50/30 via-white to-rose-50/20">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
              Nuestro Equipo
            </h2>
            <p className="text-femfuel-medium text-lg">
              {professionals.length} profesionales expertos listos para atenderte
            </p>
          </div>

          {/* Desktop scroll controls */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollContainer('left')}
              disabled={!canScrollLeft}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollContainer('right')}
              disabled={!canScrollRight}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Professionals Horizontal Scroll */}
        <div
          id="professionals-scroll"
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {professionals.map((professional) => (
            <Card
              key={professional.id}
              className="flex-shrink-0 w-80 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                {/* Header with photo and basic info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    {professional.image ? (
                      <Image
                        src={professional.image}
                        alt={professional.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-600">
                          {professional.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}

                    {/* Status indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-femfuel-dark text-lg leading-tight">
                          {professional.name}
                        </h3>
                        {professional.isTopRated && (
                          <Badge variant="secondary" className="text-xs mt-1 bg-amber-100 text-amber-800">
                            <Award className="h-3 w-3 mr-1" />
                            Top Rated
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-femfuel-dark">{professional.rating}</span>
                      <span className="text-sm text-femfuel-medium">({professional.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professional.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {professional.specialties.length > 3 && (
                      <span className="text-xs text-femfuel-medium font-medium">
                        +{professional.specialties.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="block font-semibold text-femfuel-dark">Experiencia</span>
                    <span className="text-femfuel-medium">{professional.yearsExperience} años</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-femfuel-dark">Disponibilidad</span>
                    <span className="text-femfuel-medium">{professional.nextAvailable || 'Consultar'}</span>
                  </div>
                </div>

                {/* Bio preview */}
                {professional.bio && (
                  <div className="mb-4">
                    <p className="text-sm text-femfuel-medium leading-relaxed line-clamp-2">
                      {professional.bio}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(professional)}
                    className="flex-1"
                  >
                    Ver Perfil
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onBookNow(professional)}
                    className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                  >
                    Reservar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile: Show total count */}
        <div className="md:hidden text-center mt-6">
          <p className="text-sm text-femfuel-medium">
            Desliza para ver todos los profesionales →
          </p>
        </div>
      </div>
    </section>
  )
}