"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface BeforeAfterImage {
  before: string
  after: string
  title?: string
}

interface BeforeAfterCarouselProps {
  serviceName: string
  category: string
  images?: BeforeAfterImage[]
}

export function BeforeAfterCarousel({ serviceName, category, images }: BeforeAfterCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Default images if none provided
  const defaultImages: BeforeAfterImage[] = [
    {
      before: `/services/${category}/before-1.png`,
      after: `/services/${category}/after-1.png`,
      title: "Resultado 1"
    },
    {
      before: `/services/${category}/before-2.png`,
      after: `/services/${category}/after-2.png`,
      title: "Resultado 2"
    },
    {
      before: `/services/${category}/before-3.png`,
      after: `/services/${category}/after-3.png`,
      title: "Resultado 3"
    }
  ]

  const displayImages = images || defaultImages
  const currentImage = displayImages[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <div className="px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Before/After Images */}
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-md">
            {/* Before Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                <OptimizedImage
                  src={currentImage.before}
                  alt={`${serviceName} - Antes`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Antes
              </div>
            </div>

            {/* After Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                <OptimizedImage
                  src={currentImage.after}
                  alt={`${serviceName} - Después`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-2 left-2 bg-femfuel-rose text-white text-xs px-2 py-1 rounded">
                Después
              </div>
            </div>
          </div>

          {/* Navigation and Info */}
          <div className="flex-1 min-w-0 pl-4">
            <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
              Resultados Reales
            </h3>
            <p className="text-sm text-femfuel-medium mb-4">
              Ve los increíbles resultados que nuestros especialistas logran
            </p>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={prevImage}
                disabled={displayImages.length <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-femfuel-rose' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextImage}
                disabled={displayImages.length <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-femfuel-medium mt-2">
              {currentIndex + 1} de {displayImages.length} resultados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}