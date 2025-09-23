"use client"

import { useState } from "react"
import { Star, MapPin, Calendar, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface Professional {
  id: number | string
  name: string
  specialty: string
  salon: string
  vendorId: string
  location: string
  rating: number
  reviewCount: number
  yearsExperience: number
  avatar: string
  portfolioImages: string[]
  specialties: string[]
  availableToday: boolean
  nextAvailable: string
  signature: string
  price: string
}

interface StarProfessionalsProps {
  professionals: Professional[]
  onViewVendor?: (professionalId: number | string) => void
  onViewPortfolio?: (professionalId: number | string) => void
}

export function StarProfessionals({ professionals, onViewVendor, onViewPortfolio }: StarProfessionalsProps) {
  const [selectedProfessional, setSelectedProfessional] = useState(0)

  if (!professionals.length) return null

  const current = professionals[selectedProfessional]

  const nextProfessional = () => {
    setSelectedProfessional((prev) => (prev + 1) % professionals.length)
  }

  const prevProfessional = () => {
    setSelectedProfessional((prev) => (prev - 1 + professionals.length) % professionals.length)
  }

  return (
    <section className="px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-3">Profesionales Estrella</h2>
          <p className="text-femfuel-medium">Los mejores expertos en belleza de República Dominicana</p>
        </div>

        {/* Featured Professional */}
        <Card className="overflow-hidden shadow-lg mb-8">
          <CardContent className="p-0">
            <div className="md:flex">
              {/* Professional Info */}
              <div className="md:w-1/3 p-6 md:p-8 bg-gradient-to-br from-femfuel-light to-pink-50">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={current.avatar} alt={current.name} />
                    <AvatarFallback className="bg-femfuel-rose text-white text-2xl">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold text-femfuel-dark mb-1">{current.name}</h3>
                  <p className="text-femfuel-medium mb-2">{current.specialty}</p>
                  <p className="text-sm text-femfuel-medium mb-4">{current.salon}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(current.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-femfuel-dark">{current.rating}</span>
                    <span className="text-xs text-femfuel-medium">({current.reviewCount})</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {current.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Experience & Location */}
                  <div className="space-y-2 text-sm text-femfuel-medium mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>{current.yearsExperience} años de experiencia</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{current.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className={current.availableToday ? "text-green-600 font-medium" : ""}>
                        {current.availableToday ? "Disponible hoy" : `Próxima cita: ${current.nextAvailable}`}
                      </span>
                    </div>
                  </div>

                  {/* Signature Service */}
                  <div className="bg-white/50 rounded-lg p-3 mb-6">
                    <p className="text-xs text-femfuel-medium mb-1">Especialidad Exclusiva</p>
                    <p className="font-medium text-femfuel-dark text-sm">{current.signature}</p>
                    <p className="text-black font-bold text-lg">{current.price}</p>
                  </div>

                  {/* Action Button */}
                  <div>
                    <Button
                      onClick={() => onViewPortfolio?.(current.id)}
                      className="w-full bg-femfuel-rose hover:bg-femfuel-rose/90 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Ver Portafolio
                    </Button>
                  </div>
                </div>
              </div>

              {/* Portfolio Gallery */}
              <div className="md:w-2/3 relative">
                <div className="grid grid-cols-2 md:grid-cols-3 h-full">
                  {current.portfolioImages.slice(0, 6).map((image, index) => (
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
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        context="portfolio"
                        quality={75}
                        instant={true}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      {index === 5 && current.portfolioImages.length > 6 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">+{current.portfolioImages.length - 6}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-femfuel-rose/20"
                  onClick={prevProfessional}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-femfuel-rose/20"
                  onClick={nextProfessional}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Professionals Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {professionals.map((professional, index) => (
            <Card
              key={professional.id}
              className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                index === selectedProfessional ? 'ring-2 ring-femfuel-rose' : ''
              }`}
              onClick={() => setSelectedProfessional(index)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={professional.avatar} alt={professional.name} />
                    <AvatarFallback className="bg-femfuel-rose text-white">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h4 className="font-medium text-femfuel-dark text-sm mb-1">{professional.name}</h4>
                  <p className="text-xs text-femfuel-medium mb-2">{professional.specialty}</p>
                  
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{professional.rating}</span>
                  </div>

                  {professional.availableToday && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Disponible hoy
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}