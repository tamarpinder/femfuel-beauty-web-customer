'use client'

import { useState } from "react"
import { Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Professional } from "@/types/vendor"
import {
  ProfessionalRating,
  ProfessionalExperience,
  ProfessionalAvailability,
  ProfessionalSpecialties,
  TopRatedBadge,
  ProfessionalAvatar
} from "@/lib/professional-ui-utils"

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
    <section className="w-full py-16 bg-gradient-to-br from-purple-50/30 via-white to-rose-50/20">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-3">
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
              className="rounded-full w-12 h-12 p-0 bg-white hover:bg-femfuel-purple border-femfuel-medium hover:border-femfuel-rose transition-all duration-300 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollContainer('right')}
              disabled={!canScrollRight}
              className="rounded-full w-12 h-12 p-0 bg-white hover:bg-femfuel-purple border-femfuel-medium hover:border-femfuel-rose transition-all duration-300 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
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
              className="flex-shrink-0 w-80 shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all duration-300 border-0 bg-white rounded-2xl"
            >
              <CardContent className="p-6">
                {/* Header with photo and basic info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <ProfessionalAvatar
                      name={professional.name}
                      image={professional.image}
                      size={64}
                      rounded="xl"
                    />
                    {/* Status indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-femfuel-dark text-lg leading-tight">
                          {professional.name}
                        </h3>
                        {/* Reserve space for badge to keep layout consistent */}
                        <div className="mt-1 h-5">
                          {professional.isTopRated && (
                            <TopRatedBadge variant="full" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <ProfessionalRating
                        rating={professional.rating}
                        reviewCount={professional.reviewCount}
                        variant="single"
                      />
                    </div>
                  </div>
                </div>

                {/* Specialties - Now at consistent position */}
                <div className="mb-4">
                  <ProfessionalSpecialties
                    specialties={professional.specialties}
                    maxShow={3}
                    variant="chip"
                  />
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
                    className="flex-1 border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white transition-all duration-300"
                  >
                    Ver Perfil
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onBookNow(professional)}
                    className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white shadow-md hover:shadow-lg transition-all duration-300"
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
