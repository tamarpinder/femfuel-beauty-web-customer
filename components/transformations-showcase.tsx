"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/ui/optimized-image"

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

export function TransformationsShowcase({ transformations, onGetThisLook }: TransformationsShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAfter, setShowAfter] = useState(true)

  // Note: Image preloading will be added after images are generated

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length)
    setShowAfter(true)
  }

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
    setShowAfter(true)
  }

  if (!transformations.length) return null

  const current = transformations[currentIndex]

  return (
    <section className="px-4 py-8 sm:py-12 bg-gradient-to-br from-femfuel-light to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-femfuel-dark mb-2 sm:mb-3">Transformaciones Increíbles</h2>
          <p className="text-sm sm:text-base text-femfuel-medium">Descubre el poder de la belleza profesional</p>
        </div>

        <div className="relative">
          {/* Main Transformation Card */}
          <Card className="overflow-hidden shadow-xl">
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

                  {/* Get This Look Button */}
                  <Button
                    onClick={() => onGetThisLook?.(current.serviceId, current.lookName, current.vendor)}
                    className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white w-full md:w-auto transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl h-11 sm:h-12 text-sm sm:text-base"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-femfuel-rose/20"
            onClick={prevTransformation}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-femfuel-rose/20"
            onClick={nextTransformation}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Transformation Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {transformations.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-femfuel-rose w-8' 
                  : 'bg-femfuel-rose/30 hover:bg-femfuel-rose/50'
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setShowAfter(true)
              }}
            />
          ))}
        </div>

        {/* Additional Transformations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {transformations.slice(0, 4).map((transformation, index) => (
            <div
              key={transformation.id}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ${
                index === currentIndex ? 'ring-2 ring-femfuel-rose' : ''
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