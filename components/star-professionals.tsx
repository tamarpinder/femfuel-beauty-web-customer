"use client"

import { useState } from "react"
import { MapPin, ChevronLeft, ChevronRight, CalendarCheck, Clock, Eye, Heart, Award, Sparkles, Star, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/ui/optimized-image"
import type { Professional } from "@/types/vendor"
import {
  ProfessionalRating,
  ProfessionalExperience,
  ProfessionalAvailability,
  ProfessionalSpecialties,
  AvailableTodayBadge
} from "@/lib/professional-ui-utils"

interface StarProfessionalsProps {
  professionals: Professional[]
  onViewVendor?: (professionalId: string) => void
  onViewPortfolio?: (professionalId: string) => void
  onBook?: (professionalId: string, serviceName?: string) => void
}

export function StarProfessionals({ professionals, onViewVendor, onViewPortfolio, onBook }: StarProfessionalsProps) {
  const [selectedProfessional, setSelectedProfessional] = useState(0)

  if (!professionals.length) return null

  const current = professionals[selectedProfessional]
  const availableToday = current.nextAvailable?.toLowerCase().includes('hoy')

  const nextProfessional = () => {
    setSelectedProfessional((prev) => (prev + 1) % professionals.length)
  }

  const prevProfessional = () => {
    setSelectedProfessional((prev) => (prev - 1 + professionals.length) % professionals.length)
  }

  return (
    <section className="px-4 md:px-6 py-12 md:py-16 bg-gradient-to-b from-white via-femfuel-light/10 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-femfuel-rose via-pink-600 to-femfuel-rose bg-clip-text text-transparent mb-3">Profesionales Estrella</h2>
          <p className="text-base md:text-lg text-femfuel-medium font-medium">Los mejores expertos en belleza de República Dominicana</p>
        </div>

        {/* Featured Professional */}
        <Card className="overflow-hidden shadow-2xl rounded-3xl border-0 mb-12">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Professional Info */}
              <div className="md:w-1/3 p-6 md:p-8 bg-gradient-to-br from-femfuel-light to-pink-50">
                <div className="text-center">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 ring-4 ring-femfuel-rose/20 hover:ring-femfuel-rose/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                    <AvatarImage src={current.image} alt={current.name} />
                    <AvatarFallback className="bg-gradient-to-br from-femfuel-rose to-pink-600 text-white text-xl md:text-2xl font-bold shadow-md">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Availability Status Badge */}
                  {availableToday && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 mb-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg animate-pulse">
                      <div className="relative">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping" />
                      </div>
                      <CalendarCheck className="h-4 w-4" />
                      <span className="text-xs md:text-sm font-medium">Disponible Hoy</span>
                    </div>
                  )}

                  <h3 className="text-lg md:text-xl font-bold text-femfuel-dark mb-1 font-serif">{current.name}</h3>
                  <p className="text-sm md:text-base text-femfuel-medium mb-2 font-medium">{current.specialties[0]}</p>
                  <p
                    className="text-sm text-femfuel-medium mb-4 cursor-pointer hover:text-femfuel-rose hover:underline transition-all duration-300 font-medium"
                    onClick={() => current.vendorId && onViewVendor?.(current.vendorId)}
                  >
                    {current.vendorName}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <ProfessionalRating
                      rating={current.rating}
                      reviewCount={current.reviewCount}
                      variant="full"
                    />
                  </div>

                  {/* Enhanced Specialty Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {current.specialties.slice(0, 3).map((specialty, index) => {
                      const SpecialtyIcon = index === 0 ? Award : index === 1 ? Sparkles : Star
                      return (
                        <div
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-femfuel-rose/30 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                          <SpecialtyIcon className="h-3.5 w-3.5 text-femfuel-rose" />
                          <span className="text-xs font-medium text-femfuel-dark">{specialty}</span>
                        </div>
                      )
                    })}
                    {current.specialties.length > 3 && (
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-femfuel-rose/10 backdrop-blur-md border border-femfuel-rose/30 text-femfuel-rose cursor-pointer hover:bg-femfuel-rose hover:text-white transition-all duration-300"
                        title={current.specialties.slice(3).join(', ')}
                      >
                        <span className="text-xs font-medium">+{current.specialties.length - 3}</span>
                      </div>
                    )}
                  </div>

                  {/* Experience & Location */}
                  <div className="space-y-2 text-sm text-femfuel-medium mb-6">
                    <div className="flex items-center justify-center">
                      <ProfessionalExperience
                        years={current.yearsExperience}
                        showIcon={true}
                      />
                    </div>
                    {current.vendorSlug && (
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{current.vendorName}</span>
                      </div>
                    )}

                    {/* Enhanced Next Available Display */}
                    {!availableToday && current.nextAvailable && (
                      <div className="bg-white/80 backdrop-blur-md rounded-lg px-3 py-2 border border-femfuel-rose/20">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-4 w-4 text-femfuel-rose" />
                          <span className="text-xs font-medium text-femfuel-dark">
                            Próximo disponible: <span className="text-femfuel-rose">{current.nextAvailable}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Signature Service */}
                  {current.portfolio?.signature && (
                    <div className="bg-gradient-to-br from-white/80 to-femfuel-light/50 backdrop-blur-sm rounded-xl p-4 mb-6 border-2 border-femfuel-rose/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <p className="text-xs text-femfuel-medium mb-1 font-semibold uppercase tracking-wide">Especialidad Exclusiva</p>
                      <p className="font-bold text-femfuel-dark text-sm mb-1">{current.portfolio.signature.serviceName}</p>
                      <p className="text-lg font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">{current.portfolio.signature.price}</p>
                    </div>
                  )}

                  {/* Enhanced Book Now CTA */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => onBook?.(current.id, current.portfolio?.signature?.serviceName)}
                      className="w-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold py-6 rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    >
                      <CalendarPlus className="h-5 w-5 mr-2" />
                      Reservar Ahora
                    </Button>
                    <button
                      onClick={() => onViewPortfolio?.(current.id)}
                      className="w-full text-femfuel-rose text-sm font-bold hover:underline hover:text-pink-600 transition-all duration-300"
                    >
                      Ver Portafolio Completo
                    </button>
                  </div>
                </div>
              </div>

              {/* Portfolio Gallery */}
              <div className="md:w-2/3 relative">
                <div className="grid grid-cols-2 md:grid-cols-3 h-full">
                  {current.portfolio?.images && current.portfolio.images.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square relative overflow-hidden group cursor-pointer"
                      onClick={() => onViewPortfolio?.(current.id)}
                    >
                      <OptimizedImage
                        key={`${current.id}-portfolio-${index}`}
                        src={image}
                        alt={`${current.name} portfolio ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
                        context="portfolio"
                        quality={75}
                        instant={true}
                      />

                      {/* Instagram-style Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white">
                              <Eye className="h-5 w-5" />
                              <span className="font-medium text-sm">Ver</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <Heart className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* More Images Indicator */}
                      {index === 5 && current.portfolio?.images && current.portfolio.images.length > 6 && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center">
                            <Eye className="h-8 w-8 text-white mx-auto mb-2" />
                            <span className="text-white font-bold text-xl">+{current.portfolio.images.length - 6}</span>
                            <p className="text-white/80 text-xs mt-1">más fotos</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-femfuel-purple border-femfuel-medium shadow-lg hover:shadow-xl transition-all duration-300 min-w-[40px] min-h-[40px]"
                  onClick={prevProfessional}
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-femfuel-purple border-femfuel-medium shadow-lg hover:shadow-xl transition-all duration-300 min-w-[40px] min-h-[40px]"
                  onClick={nextProfessional}
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Professionals Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {professionals.map((professional, index) => {
            const isAvailableToday = professional.nextAvailable?.toLowerCase().includes('hoy')

            return (
              <Card
                key={professional.id}
                className={`cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl border-2 ${
                  index === selectedProfessional
                    ? 'ring-4 ring-femfuel-rose/30 shadow-2xl scale-105 border-femfuel-rose bg-gradient-to-br from-white to-femfuel-light/30'
                    : 'border-femfuel-rose/10 hover:border-femfuel-rose/30 bg-white/80 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedProfessional(index)}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3 ring-2 ring-transparent hover:ring-femfuel-rose/30 transition-all duration-300 shadow-md">
                      <AvatarImage src={professional.image} alt={professional.name} />
                      <AvatarFallback className="bg-gradient-to-br from-femfuel-rose to-pink-600 text-white font-bold shadow-md">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <h4 className="font-bold text-femfuel-dark text-sm mb-1">{professional.name}</h4>
                    <p className="text-xs text-femfuel-medium mb-2 font-medium">{professional.specialties[0]}</p>

                    <div className="flex items-center justify-center mb-2">
                      <ProfessionalRating
                        rating={professional.rating}
                        reviewCount={professional.reviewCount}
                        variant="compact"
                      />
                    </div>

                    {isAvailableToday && <AvailableTodayBadge />}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
