"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface BeforeAfterImage {
  before: string
  after: string
  title?: string
}

interface DesktopGalleryProps {
  serviceName: string
  category: string
  images?: BeforeAfterImage[]
}

export function DesktopGallery({ serviceName, category, images }: DesktopGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split')

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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-femfuel-dark">
              Resultados Reales
            </h3>
            <p className="text-sm text-femfuel-medium">
              Mirá los increíbles resultados que logran nuestros especialistas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('split')}
              className="text-xs"
            >
              Antes/Después
            </Button>
            <Button
              variant={viewMode === 'before' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('before')}
              className="text-xs"
            >
              Antes
            </Button>
            <Button
              variant={viewMode === 'after' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('after')}
              className="text-xs"
            >
              Después
            </Button>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="p-4">
        <div className="relative">
          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 gap-4">
              {/* Before Image */}
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <OptimizedImage
                    src={currentImage.before}
                    alt={`${serviceName} - Antes`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                  Antes
                </div>
              </div>

              {/* After Image */}
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <OptimizedImage
                    src={currentImage.after}
                    alt={`${serviceName} - Después`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-3 left-3 bg-femfuel-rose text-white text-sm px-3 py-1 rounded-full">
                  Después
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <OptimizedImage
                  src={viewMode === 'before' ? currentImage.before : currentImage.after}
                  alt={`${serviceName} - ${viewMode === 'before' ? 'Antes' : 'Después'}`}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                {viewMode === 'before' ? 'Antes' : 'Después'}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevImage}
            disabled={displayImages.length <= 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
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
            className="flex items-center gap-2"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* View All Button */}
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" className="text-femfuel-rose hover:text-femfuel-dark">
            <Eye className="h-4 w-4 mr-2" />
            Ver todas las fotos ({displayImages.length})
          </Button>
        </div>
      </div>
    </div>
  )
}