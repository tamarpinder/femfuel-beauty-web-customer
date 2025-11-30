"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, Star, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { toast } from "sonner"

interface Transformation {
  id: number
  name: string
  service: string
  vendor: string
  beforeImage: string
  afterImage: string
  rating: number
  testimonial: string
  serviceId: string
  lookName: string
}

interface TransformationsShowcaseProps {
  transformations: Transformation[]
  onGetThisLook?: (serviceId: string, lookName: string, vendorName: string) => void
}

// Category mapping based on service types
const getCategoryFromService = (service: string): string => {
  const lowerService = service.toLowerCase()
  if (lowerService.includes('uña') || lowerService.includes('nail') || lowerService.includes('manicure') || lowerService.includes('pedicure')) return 'Uñas'
  if (lowerService.includes('maquillaje') || lowerService.includes('makeup')) return 'Maquillaje'
  if (lowerService.includes('cabello') || lowerService.includes('pelo') || lowerService.includes('hair') || lowerService.includes('balayage') || lowerService.includes('alisado') || lowerService.includes('blowout')) return 'Cabello'
  if (lowerService.includes('facial') || lowerService.includes('spa') || lowerService.includes('masaje')) return 'Spa'
  if (lowerService.includes('pestaña') || lowerService.includes('lash') || lowerService.includes('extensiones de pestañas')) return 'Pestañas'
  return 'Otro'
}

export function TransformationsShowcase({ transformations, onGetThisLook }: TransformationsShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAfter, setShowAfter] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>('Ver Todo')
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set())

  // Filter transformations based on active category
  const filteredTransformations = activeFilter === 'Ver Todo'
    ? transformations
    : transformations.filter(t => getCategoryFromService(t.service) === activeFilter)

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
    setShowAfter(true)
  }, [activeFilter])

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTransformations.length)
    setShowAfter(true)
  }

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTransformations.length) % filteredTransformations.length)
    setShowAfter(true)
  }

  if (!filteredTransformations.length) return null

  const current = filteredTransformations[currentIndex]

  // Social interaction handlers
  const handleShare = async (transformation: Transformation) => {
    const shareData = {
      title: transformation.lookName,
      text: `Mira esta increíble transformación: ${transformation.service} por ${transformation.vendor}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        toast.success('¡Compartido exitosamente!')
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: Copy link to clipboard
      await navigator.clipboard.writeText(shareData.url)
      toast.success('¡Link copiado al portapapeles!')
    }
  }

  const handleLike = (id: number) => {
    setLikedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
        toast.success('Removido de favoritos')
      } else {
        newSet.add(id)
        toast.success('¡Agregado a favoritos!')
      }
      return newSet
    })
  }

  const handleBookmark = (id: number) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
        toast.success('Marcador removido')
      } else {
        newSet.add(id)
        toast.success('¡Guardado para después!')
      }
      return newSet
    })
  }

  // Get unique categories from transformations
  const categories = ['Ver Todo', ...Array.from(new Set(transformations.map(t => getCategoryFromService(t.service))))]

  return (
    <section className="px-4 md:px-6 py-12 md:py-16 bg-gradient-to-br from-femfuel-light to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-femfuel-dark mb-3">Transformaciones Increíbles</h2>
          <p className="text-base md:text-lg text-femfuel-medium">Descubre el poder de la belleza profesional</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base
                transition-all duration-300
                ${activeFilter === category
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105 border-2 border-transparent'
                  : 'bg-white/80 backdrop-blur-md text-femfuel-dark hover:bg-white hover:shadow-md hover:scale-105 border-2 border-femfuel-rose/10'
                }
              `}
            >
              {category}
              {activeFilter === category && (
                <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {filteredTransformations.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          {/* Main Transformation Card */}
          <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border-2 border-femfuel-rose/10 bg-white/80 backdrop-blur-md">
            <CardContent className="p-0">
              <div className="md:flex">
                {/* Before/After Images */}
                <div className="relative md:w-1/2">
                  <div className="relative aspect-square overflow-hidden">
                    <OptimizedImage
                      key={`${current.id}-${showAfter ? 'after' : 'before'}`}
                      src={showAfter ? current.afterImage : current.beforeImage}
                      alt={showAfter ? "Después" : "Antes"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-500 ease-out"
                      style={{
                        filter: showAfter ? 'brightness(1.05) saturate(1.1)' : 'brightness(0.95) saturate(0.9)',
                      }}
                      priority={true}
                      context="transformation"
                      instant={true}
                    />
                    
                    {/* Before/After Toggle */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex bg-black/20 backdrop-blur-sm rounded-full p-0.5 sm:p-1">
                      <Button
                        variant={!showAfter ? "default" : "ghost"}
                        size="sm"
                        className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs ${!showAfter ? 'bg-white text-black' : 'text-white hover:bg-white/20'}`}
                        onClick={() => setShowAfter(false)}
                      >
                        Antes
                      </Button>
                      <Button
                        variant={showAfter ? "default" : "ghost"}
                        size="sm"
                        className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs ${showAfter ? 'bg-white text-black' : 'text-white hover:bg-white/20'}`}
                        onClick={() => setShowAfter(true)}
                      >
                        Después
                      </Button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <Badge className="bg-femfuel-rose text-white text-xs sm:text-sm">
                        {showAfter ? "Resultado" : "Original"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-femfuel-dark mb-2 line-clamp-2">{current.lookName}</h3>
                    <p className="text-sm sm:text-base text-femfuel-medium mb-2 sm:mb-3 line-clamp-2">{current.service} • {current.vendor}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(current.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-femfuel-dark">{current.rating}</span>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="text-sm sm:text-base text-femfuel-medium italic mb-4 sm:mb-6 border-l-2 sm:border-l-4 border-femfuel-rose pl-3 sm:pl-4">
                    "{current.testimonial}"
                    <footer className="text-xs sm:text-sm font-medium text-femfuel-dark mt-2 not-italic">
                      — {current.name}
                    </footer>
                  </blockquote>

                  {/* Social Actions */}
                  <div className="flex items-center gap-2 md:gap-3 mb-4 sm:mb-6">
                    <button
                      onClick={() => handleLike(current.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-h-[44px] ${
                        likedIds.has(current.id)
                          ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white border-2 border-transparent'
                          : 'bg-white/80 backdrop-blur-md text-femfuel-dark hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white border-2 border-femfuel-rose/10'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all duration-300 ${
                          likedIds.has(current.id) ? 'fill-current' : ''
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-medium">
                        {likedIds.has(current.id) ? 'Favorito' : 'Me Gusta'}
                      </span>
                    </button>

                    <button
                      onClick={() => handleBookmark(current.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-h-[44px] ${
                        bookmarkedIds.has(current.id)
                          ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 text-white border-2 border-transparent'
                          : 'bg-white/80 backdrop-blur-md text-femfuel-dark hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white border-2 border-femfuel-rose/10'
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 transition-all duration-300 ${
                          bookmarkedIds.has(current.id) ? 'fill-current' : ''
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                        {bookmarkedIds.has(current.id) ? 'Guardado' : 'Guardar'}
                      </span>
                    </button>

                    <button
                      onClick={() => handleShare(current)}
                      className="flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-2 rounded-full bg-white/80 backdrop-blur-md text-femfuel-dark hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[44px]"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium hidden sm:inline">Compartir</span>
                    </button>
                  </div>

                  {/* Get This Look Button */}
                  <Button
                    onClick={() => onGetThisLook?.(current.serviceId, current.lookName, current.vendor)}
                    className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white w-full md:w-auto transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl h-11 sm:h-12 text-sm sm:text-base font-semibold"
                  >
                    <Heart className="h-4 w-4 mr-2 animate-pulse" />
                    Obtener Este Estilo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white transition-all duration-300 min-w-[40px] min-h-[40px]"
            onClick={prevTransformation}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white transition-all duration-300 min-w-[40px] min-h-[40px]"
            onClick={nextTransformation}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Transformation Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {transformations.map((_, index) => (
            <button
              key={index}
              className={`min-w-[32px] min-h-[32px] rounded-full transition-all flex items-center justify-center ${
                index === currentIndex
                  ? 'bg-femfuel-rose/20'
                  : 'bg-femfuel-rose/10 hover:bg-femfuel-rose/20'
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setShowAfter(true)
              }}
              aria-label={`Go to transformation ${index + 1}`}
            >
              <span className={`rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-femfuel-rose w-6 h-2'
                  : 'bg-femfuel-rose/50 w-2 h-2'
              }`} />
            </button>
          ))}
        </div>

        {/* Additional Transformations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {transformations.slice(0, 4).map((transformation, index) => (
            <div
              key={transformation.id}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-femfuel-rose/10 bg-white/80 backdrop-blur-md ${
                index === currentIndex ? 'ring-2 ring-femfuel-rose shadow-xl' : ''
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setShowAfter(true)
              }}
            >
              <div className="aspect-square relative">
                <OptimizedImage
                  key={transformation.id}
                  src={transformation.afterImage}
                  alt={transformation.lookName}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  context="transformation"
                  quality={70}
                  instant={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">{transformation.lookName}</p>
                  <p className="text-white/80 text-xs truncate">{transformation.vendor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}