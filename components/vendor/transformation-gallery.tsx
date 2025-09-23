'use client'

import { useState } from "react"
import { Star, Heart, ChevronLeft, ChevronRight, Play, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Transformation {
  id: string
  before: string
  after: string
  title: string
  service: string
  professional?: string
  testimonial?: string
  customerName?: string
  rating?: number
  duration?: string
}

interface TransformationGalleryProps {
  transformations: Transformation[]
  onGetThisLook?: (transformation: Transformation) => void
}

export function TransformationGallery({
  transformations,
  onGetThisLook
}: TransformationGalleryProps) {
  const [selectedTransformation, setSelectedTransformation] = useState<Transformation | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (transformations.length === 0) {
    return null
  }

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length)
  }

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
  }

  const openModal = (transformation: Transformation, index: number) => {
    setSelectedTransformation(transformation)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedTransformation(null)
  }

  return (
    <>
      <section className="w-full py-16 bg-gradient-to-br from-rose-50/30 via-white to-purple-50/20">
        <div className="px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
              Transformaciones Reales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Descubre los increíbles resultados que hemos logrado con nuestros clientes
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map((transformation, index) => (
              <Card
                key={transformation.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
                onClick={() => openModal(transformation, index)}
              >
                <CardContent className="p-0">
                  {/* Before/After Images */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Before Image */}
                    <div className="absolute inset-0 w-1/2">
                      <img
                        src={transformation.before}
                        alt="Antes"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-gray-800 text-white">
                          Antes
                        </Badge>
                      </div>
                    </div>

                    {/* After Image */}
                    <div className="absolute inset-0 left-1/2 w-1/2">
                      <img
                        src={transformation.after}
                        alt="Después"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-femfuel-rose text-white">
                          Después
                        </Badge>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg transform -translate-x-0.5"></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="h-6 w-6 text-femfuel-dark ml-1" />
                      </div>
                    </div>

                    {/* Rating Badge */}
                    {transformation.rating && (
                      <div className="absolute bottom-2 left-2">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{transformation.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-femfuel-dark mb-1 line-clamp-1">
                      {transformation.title}
                    </h3>
                    <p className="text-sm text-femfuel-medium mb-2">
                      {transformation.service}
                    </p>

                    {transformation.professional && (
                      <p className="text-xs text-purple-600 font-medium mb-2">
                        Por: {transformation.professional}
                      </p>
                    )}

                    {transformation.testimonial && (
                      <p className="text-xs text-femfuel-medium line-clamp-2 mb-2">
                        "{transformation.testimonial}"
                      </p>
                    )}

                    {transformation.customerName && (
                      <p className="text-xs text-femfuel-medium font-medium">
                        - {transformation.customerName}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          {transformations.length > 6 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="text-femfuel-rose border-femfuel-rose hover:bg-femfuel-rose hover:text-white"
              >
                Ver Más Transformaciones
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedTransformation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-femfuel-dark">
                  {selectedTransformation.title}
                </h3>
                <p className="text-femfuel-medium">
                  {selectedTransformation.service}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="rounded-full"
              >
                ✕
              </Button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Images */}
              <div className="flex-1 relative">
                <div className="aspect-video relative">
                  {/* Before Image */}
                  <div className="absolute inset-0 w-1/2">
                    <img
                      src={selectedTransformation.before}
                      alt="Antes"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-gray-800 text-white">
                        Antes
                      </Badge>
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="absolute inset-0 left-1/2 w-1/2">
                    <img
                      src={selectedTransformation.after}
                      alt="Después"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-femfuel-rose text-white">
                        Después
                      </Badge>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg transform -translate-x-0.5"></div>
                </div>

                {/* Navigation */}
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={prevTransformation}
                    className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute inset-y-0 right-4 flex items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={nextTransformation}
                    className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="lg:w-80 p-6 bg-gray-50">
                <div className="space-y-4">
                  {selectedTransformation.rating && (
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedTransformation.rating}</span>
                      <span className="text-sm text-femfuel-medium">calificación</span>
                    </div>
                  )}

                  {selectedTransformation.professional && (
                    <div>
                      <p className="text-sm font-medium text-femfuel-dark mb-1">Profesional:</p>
                      <p className="text-purple-600 font-semibold">{selectedTransformation.professional}</p>
                    </div>
                  )}

                  {selectedTransformation.duration && (
                    <div>
                      <p className="text-sm font-medium text-femfuel-dark mb-1">Duración:</p>
                      <p className="text-femfuel-medium">{selectedTransformation.duration}</p>
                    </div>
                  )}

                  {selectedTransformation.testimonial && (
                    <div>
                      <Quote className="h-5 w-5 text-femfuel-rose mb-2" />
                      <p className="text-femfuel-medium italic leading-relaxed">
                        "{selectedTransformation.testimonial}"
                      </p>
                      {selectedTransformation.customerName && (
                        <p className="text-sm font-medium text-femfuel-dark mt-2">
                          - {selectedTransformation.customerName}
                        </p>
                      )}
                    </div>
                  )}

                  {onGetThisLook && (
                    <div className="pt-4 border-t">
                      <Button
                        onClick={() => onGetThisLook(selectedTransformation)}
                        className="w-full bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Quiero Este Look
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 text-center">
              <p className="text-sm text-femfuel-medium">
                {currentIndex + 1} de {transformations.length} transformaciones
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}