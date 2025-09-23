"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Calendar, Award, Instagram, Phone, MessageCircle, Share2, Video, Trophy, ShieldCheck, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ChatButton } from "@/components/ui/chat-button"
import { BookingModal } from "@/components/booking-modal"
import { CustomerFooter } from "@/components/customer-footer"
import { getPortfolioForProfessional } from "@/lib/portfolio-mapping"
import { getProfessionalBySlug } from "@/lib/getAllProfessionals"
import type { Professional, VendorService } from "@/types/vendor"

interface ProfessionalProfile extends Professional {
  position?: string
  socialMedia?: {
    instagram?: string
    tiktok?: string
  }
  portfolio: {
    images: string[]
    videos?: string[]
    beforeAfter: Array<{
      before: string
      after: string
      title: string
      category: string
      date?: string
    }>
    signature: {
      serviceName: string
      description: string
      price: string
      duration: number
    }
    certifications: string[]
    awards: string[]
    clientTestimonials: Array<{
      id: string
      clientName: string
      clientImage?: string
      text: string
      rating: number
      serviceCategory: string
      date: string
      isVerified?: boolean
    }>
  }
}

// Helper functions for signature service details
function getSignatureServiceDescription(specialty: string): string {
  const descriptions: Record<string, string> = {
    nails: "Manicure completo con diseño personalizado y técnica exclusiva de larga duración",
    hair: "Corte y estilo personalizado con técnicas avanzadas y productos premium",
    makeup: "Maquillaje profesional para eventos especiales con técnicas de alta costura",
    spa: "Tratamiento facial completo con técnicas de relajación y rejuvenecimiento"
  }
  return descriptions[specialty] || descriptions.nails
}

function getSignatureServicePrice(specialty: string): string {
  const prices: Record<string, string> = {
    nails: "RD$ 1,800",
    hair: "RD$ 2,500",
    makeup: "RD$ 3,200",
    spa: "RD$ 2,800"
  }
  return prices[specialty] || prices.nails
}

function getSignatureServiceDuration(specialty: string): number {
  const durations: Record<string, number> = {
    nails: 90,
    hair: 120,
    makeup: 90,
    spa: 90
  }
  return durations[specialty] || 90
}

function getCertifications(specialty: string): string[] {
  const certifications: Record<string, string[]> = {
    nails: [
      "Certificación Avanzada en Nail Art",
      "Especialista en Extensiones de Gel",
      "Técnicas de Nail Art 3D"
    ],
    hair: [
      "Certificación Internacional en Colorimetría",
      "Especialista en Cortes Avanzados",
      "Técnicas de Peinados para Novias"
    ],
    makeup: [
      "Certificación en Maquillaje Profesional",
      "Especialista en Maquillaje de Novias",
      "Técnicas de Maquillaje Editorial"
    ],
    spa: [
      "Certificación en Terapias Faciales",
      "Especialista en Tratamientos Anti-edad",
      "Técnicas de Relajación y Bienestar"
    ]
  }
  return certifications[specialty] || certifications.nails
}

function getAwards(specialty: string, name: string): string[] {
  const firstName = name.split(' ')[0]
  const awardTemplates: Record<string, string[]> = {
    nails: [
      `Mejor Nail Artist 2023 - Beauty Awards RD`,
      "Top Professional - FemFuel Beauty"
    ],
    hair: [
      `Mejor Estilista 2023 - Hair Awards RD`,
      "Top Professional - FemFuel Beauty"
    ],
    makeup: [
      `Mejor Maquilladora 2023 - Makeup Awards RD`,
      "Top Professional - FemFuel Beauty"
    ],
    spa: [
      `Mejor Terapeuta 2023 - Spa Awards RD`,
      "Top Professional - FemFuel Beauty"
    ]
  }
  return awardTemplates[specialty] || awardTemplates.nails
}

// Helper function to determine specialty category from professional specialties
function getSpecialtyCategory(specialties: string[]): string {
  const specialtyMappings: Record<string, string[]> = {
    nails: ['manicure', 'pedicure', 'nail', 'uñas', 'gel', 'acrílicas'],
    hair: ['corte', 'color', 'peinado', 'keratina', 'alisado', 'balayage', 'mechas', 'cabello'],
    makeup: ['maquillaje', 'makeup', 'cejas', 'novias', 'gala'],
    spa: ['masaje', 'facial', 'spa', 'relajante', 'tratamiento', 'terapia']
  }

  for (const [category, keywords] of Object.entries(specialtyMappings)) {
    for (const specialty of specialties) {
      if (keywords.some(keyword => specialty.toLowerCase().includes(keyword))) {
        return category
      }
    }
  }
  return 'nails' // Default fallback
}

// Generate testimonials based on professional's name and specialties
function generateTestimonials(professionalName: string, specialties: string[]): Array<{
  id: string
  clientName: string
  clientImage?: string
  text: string
  rating: number
  serviceCategory: string
  date: string
  isVerified?: boolean
}> {
  const firstName = professionalName.split(' ')[0]
  const clientNames = ['María González', 'Carmen Reyes', 'Ana Martínez', 'Rosa Santos', 'Sofia López']
  const testimonialTemplates = [
    `${firstName} es increíble! Mis ${specialties[0].toLowerCase()} nunca habían lucido tan hermosos. Su atención al detalle es impresionante.`,
    `Excelente profesional, muy creativa y dedicada. Siempre logra superar mis expectativas con ${specialties[0].toLowerCase()}.`,
    `${firstName} tiene un talento natural. Mi experiencia con ${specialties[0].toLowerCase()} fue excepcional.`
  ]

  return specialties.slice(0, 3).map((specialty, index) => ({
    id: (index + 1).toString(),
    clientName: clientNames[index],
    text: testimonialTemplates[index],
    rating: 5,
    serviceCategory: specialty,
    date: new Date(Date.now() - (index + 1) * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isVerified: true
  }))
}

export default function ProfessionalPortfolioPage() {
  const params = useParams()
  const router = useRouter()
  const professionalId = params.professionalId as string

  const [professional, setProfessional] = useState<ProfessionalProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"portfolio" | "testimonials" | "about">("portfolio")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState<VendorService | null>(null)

  useEffect(() => {
    // Load actual professional data from the system
    const professionalData = getProfessionalBySlug(professionalId)

    if (!professionalData) {
      setProfessional(null)
      setLoading(false)
      return
    }

    // Determine specialty category for portfolio generation
    const specialtyCategory = getSpecialtyCategory(professionalData.specialties)

    // Get portfolio images using the mapping system
    const portfolioData = getPortfolioForProfessional(
      professionalId,
      specialtyCategory,
      professionalData.name
    )

    // Create professional profile with dynamic data
    const professionalProfile: ProfessionalProfile = {
      ...professionalData,
      slug: professionalId,
      position: `${professionalData.specialties[0]} Specialist`,
      socialMedia: {
        instagram: `@${professionalData.name.toLowerCase().replace(' ', '_')}_rd`,
        tiktok: `@${professionalData.name.toLowerCase().replace(' ', '_')}`
      },
      portfolio: {
        images: portfolioData.images,
        beforeAfter: portfolioData.beforeAfter,
        signature: {
          serviceName: `${professionalData.specialties[0]} Premium ${professionalData.name.split(' ')[0]}`,
          description: getSignatureServiceDescription(specialtyCategory),
          price: getSignatureServicePrice(specialtyCategory),
          duration: getSignatureServiceDuration(specialtyCategory)
        },
        certifications: getCertifications(specialtyCategory),
        awards: getAwards(specialtyCategory, professionalData.name),
        clientTestimonials: generateTestimonials(professionalData.name, professionalData.specialties)
      }
    }

    setProfessional(professionalProfile)
    setLoading(false)
  }, [professionalId])

  const handleBack = () => {
    router.back()
  }

  const handleBookNow = () => {
    if (!professional?.portfolio.signature) return

    const mockService: VendorService = {
      id: "signature-service",
      name: professional.portfolio.signature.serviceName,
      description: professional.portfolio.signature.description,
      price: parseInt(professional.portfolio.signature.price.replace(/[^\d]/g, "")),
      duration: professional.portfolio.signature.duration,
      category: "Manicure",
      isPopular: true
    }

    setSelectedService(mockService)
    setShowBookingModal(true)
  }

  const handleBookingComplete = (booking: any) => {
    setShowBookingModal(false)
    setSelectedService(null)
  }

  const handleVendorVisit = () => {
    if (professional?.vendorSlug) {
      router.push(`/vendor/${professional.vendorSlug}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200"></div>
          <div className="h-80 bg-gray-100"></div>
          <div className="p-4 space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">Profesional no encontrado</h1>
          <Button onClick={() => router.push("/")} className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white">
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-white">

        {/* Hero Section */}
        <div className="relative">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="h-80 relative overflow-hidden">
            <OptimizedImage
              src={professional.portfolio.images[selectedGalleryIndex] || professional.image || "/professional-placeholder.png"}
              alt={`${professional.name} portfolio`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Gallery Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {professional.portfolio.images.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGalleryIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedGalleryIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-16 h-16 border-3 border-white shadow-lg">
              <AvatarImage src={professional.image} alt={professional.name} />
              <AvatarFallback className="bg-femfuel-rose text-white text-lg">
                {professional.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-femfuel-dark">{professional.name}</h1>
                {professional.isTopRated && (
                  <ShieldCheck className="h-5 w-5 text-femfuel-rose" />
                )}
              </div>

              <p className="text-femfuel-medium mb-2">{professional.position}</p>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-femfuel-dark">{professional.rating}</span>
                  <span className="text-xs text-femfuel-medium">({professional.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-femfuel-medium">
                  <Award className="h-3 w-3" />
                  <span>{professional.yearsExperience} años</span>
                </div>
              </div>

              <button
                onClick={handleVendorVisit}
                className="text-sm text-femfuel-rose font-medium"
              >
                {professional.vendorName} →
              </button>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-6">
            {professional.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="bg-femfuel-light text-femfuel-dark">
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-femfuel-dark">{professional.reviewCount}</div>
              <div className="text-xs text-femfuel-medium">Reseñas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-femfuel-dark">{professional.monthlyBookings}</div>
              <div className="text-xs text-femfuel-medium">Este mes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-femfuel-dark">{professional.yearsExperience}</div>
              <div className="text-xs text-femfuel-medium">Años exp.</div>
            </div>
          </div>

          {/* Signature Service */}
          <Card className="mb-6 bg-gradient-to-r from-femfuel-light to-pink-50 border-femfuel-rose/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-femfuel-rose" />
                <span className="text-sm font-medium text-femfuel-rose">Servicio Exclusivo</span>
              </div>
              <h3 className="font-bold text-femfuel-dark mb-1">{professional.portfolio.signature.serviceName}</h3>
              <p className="text-sm text-femfuel-medium mb-3">{professional.portfolio.signature.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-femfuel-dark">{professional.portfolio.signature.price}</span>
                  <span className="text-sm text-femfuel-medium ml-2">• {professional.portfolio.signature.duration} min</span>
                </div>
                <Button
                  onClick={handleBookNow}
                  size="sm"
                  className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                >
                  Reservar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {[
              { id: "portfolio", label: "Portafolio", icon: null },
              { id: "testimonials", label: "Reseñas", icon: null },
              { id: "about", label: "Acerca", icon: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-femfuel-rose border-b-2 border-femfuel-rose"
                    : "text-femfuel-medium"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              {/* Before/After */}
              {professional.portfolio.beforeAfter.length > 0 && (
                <div>
                  <h3 className="font-semibold text-femfuel-dark mb-3">Transformaciones</h3>
                  <div className="space-y-4">
                    {professional.portfolio.beforeAfter.map((transformation, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-femfuel-dark mb-2">{transformation.title}</h4>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                              <p className="text-xs text-femfuel-medium mb-1">Antes</p>
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <OptimizedImage
                                  src={transformation.before}
                                  alt="Antes"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-femfuel-medium mb-1">Después</p>
                              <div className="aspect-square relative rounded-lg overflow-hidden">
                                <OptimizedImage
                                  src={transformation.after}
                                  alt="Después"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {transformation.category}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-4">
              {professional.portfolio.clientTestimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonial.clientImage} alt={testimonial.clientName} />
                        <AvatarFallback className="bg-femfuel-light text-femfuel-dark text-sm">
                          {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-femfuel-dark text-sm">{testimonial.clientName}</span>
                          {testimonial.isVerified && (
                            <ShieldCheck className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-femfuel-medium mb-2">{testimonial.text}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {testimonial.serviceCategory}
                      </Badge>
                      <span className="text-xs text-femfuel-medium">
                        {new Date(testimonial.date).toLocaleDateString('es-DO')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-semibold text-femfuel-dark mb-3">Acerca de {professional.name}</h3>
                <p className="text-femfuel-medium leading-relaxed">{professional.bio}</p>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold text-femfuel-dark mb-3">Certificaciones</h3>
                <div className="space-y-2">
                  {professional.portfolio.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-femfuel-rose" />
                      <span className="text-sm text-femfuel-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h3 className="font-semibold text-femfuel-dark mb-3">Reconocimientos</h3>
                <div className="space-y-2">
                  {professional.portfolio.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-femfuel-medium">{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              {professional.socialMedia && (
                <div>
                  <h3 className="font-semibold text-femfuel-dark mb-3">Sígueme en</h3>
                  <div className="flex gap-3">
                    {professional.socialMedia.instagram && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </Button>
                    )}
                    {professional.socialMedia.tiktok && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        TikTok
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-light"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-light"
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleBookNow}
              className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
            >
              Reservar Cita
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation activeTab="search" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-femfuel-medium hover:text-femfuel-dark"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-femfuel-dark">Portafolio Profesional</h1>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Portfolio Gallery */}
            <div className="col-span-8">
              {/* Main Gallery */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-4">
                    <OptimizedImage
                      src={professional.portfolio.images[selectedGalleryIndex] || professional.image || "/professional-placeholder.png"}
                      alt={`${professional.name} portfolio`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Gallery Thumbnails */}
                  <div className="grid grid-cols-6 gap-3">
                    {professional.portfolio.images.slice(0, 6).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedGalleryIndex(index)}
                        className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedGalleryIndex
                            ? "border-femfuel-rose"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <OptimizedImage
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Before/After Transformations */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-femfuel-dark mb-6">Transformaciones</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {professional.portfolio.beforeAfter.map((transformation, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-femfuel-dark mb-3">{transformation.title}</h4>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-sm text-femfuel-medium mb-2">Antes</p>
                            <div className="aspect-square relative rounded-lg overflow-hidden">
                              <OptimizedImage
                                src={transformation.before}
                                alt="Antes"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-femfuel-medium mb-2">Después</p>
                            <div className="aspect-square relative rounded-lg overflow-hidden">
                              <OptimizedImage
                                src={transformation.after}
                                alt="Después"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-femfuel-rose border-femfuel-rose">
                          {transformation.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Professional Info */}
            <div className="col-span-4">
              {/* Professional Profile */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <Avatar className="w-20 h-20 border-3 border-white shadow-lg">
                      <AvatarImage src={professional.image} alt={professional.name} />
                      <AvatarFallback className="bg-femfuel-rose text-white text-xl">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-femfuel-dark">{professional.name}</h2>
                        {professional.isTopRated && (
                          <ShieldCheck className="h-6 w-6 text-femfuel-rose" />
                        )}
                      </div>

                      <p className="text-femfuel-medium mb-3">{professional.position}</p>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-femfuel-dark">{professional.rating}</span>
                          <span className="text-sm text-femfuel-medium">({professional.reviewCount} reseñas)</span>
                        </div>
                      </div>

                      <button
                        onClick={handleVendorVisit}
                        className="text-femfuel-rose font-medium hover:underline"
                      >
                        {professional.vendorName} →
                      </button>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {professional.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="bg-femfuel-light text-femfuel-dark">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-femfuel-dark">{professional.reviewCount}</div>
                      <div className="text-sm text-femfuel-medium">Reseñas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-femfuel-dark">{professional.monthlyBookings}</div>
                      <div className="text-sm text-femfuel-medium">Este mes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-femfuel-dark">{professional.yearsExperience}</div>
                      <div className="text-sm text-femfuel-medium">Años exp.</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-femfuel-dark mb-3">Acerca de {professional.name}</h3>
                    <p className="text-femfuel-medium leading-relaxed text-sm">{professional.bio}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    <Button
                      variant="outline"
                      className="flex-1 border-femfuel-rose text-femfuel-rose hover:bg-femfuel-light"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chatear
                    </Button>
                    <Button
                      onClick={handleBookNow}
                      className="flex-1 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                    >
                      Reservar Cita
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Signature Service */}
              <Card className="mb-6 bg-gradient-to-br from-femfuel-light to-pink-50 border-femfuel-rose/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-5 w-5 text-femfuel-rose" />
                    <span className="font-medium text-femfuel-rose">Servicio Exclusivo</span>
                  </div>
                  <h3 className="text-lg font-bold text-femfuel-dark mb-2">{professional.portfolio.signature.serviceName}</h3>
                  <p className="text-sm text-femfuel-medium mb-4">{professional.portfolio.signature.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-femfuel-dark">{professional.portfolio.signature.price}</span>
                      <div className="flex items-center gap-1 text-sm text-femfuel-medium">
                        <Clock className="h-3 w-3" />
                        <span>{professional.portfolio.signature.duration} min</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleBookNow}
                    className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                  >
                    Reservar Servicio Exclusivo
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Testimonials */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-femfuel-dark mb-4">Reseñas Recientes</h3>
                  <div className="space-y-4">
                    {professional.portfolio.clientTestimonials.slice(0, 3).map((testimonial) => (
                      <div key={testimonial.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={testimonial.clientImage} alt={testimonial.clientName} />
                            <AvatarFallback className="bg-femfuel-light text-femfuel-dark text-xs">
                              {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-femfuel-dark text-sm">{testimonial.clientName}</span>
                              {testimonial.isVerified && (
                                <ShieldCheck className="h-3 w-3 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-femfuel-medium">{testimonial.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <CustomerFooter />

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
      />

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <BookingModal
          isOpen={showBookingModal}
          service={selectedService}
          vendorName={professional.vendorName || "Salon"}
          vendorRating={4.8}
          vendorId={professional.vendorId || ""}
          professionalName={professional.name}
          professionalId={professional.id}
          onClose={() => setShowBookingModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </>
  )
}