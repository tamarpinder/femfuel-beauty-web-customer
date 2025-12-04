"use client"

import { useState } from "react"
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
  beforeAfter?: {
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }
}

export function DesktopGallery({ serviceName, category, images, beforeAfter }: DesktopGalleryProps) {
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split')

  // Get transformation images - data-driven approach
  const getTransformationImages = (): BeforeAfterImage[] => {
    // Priority 1: Use provided beforeAfter data from service (single image)
    if (beforeAfter) {
      return [{
        before: beforeAfter.before,
        after: beforeAfter.after,
        title: beforeAfter.title
      }]
    }

    // Priority 2: Use provided images array
    if (images && images.length > 0) {
      return images
    }

    // Priority 3: Generic fallback based on category
    const categoryFallbacks = {
      hair: {
        before: `/transformations/before/hair-transformation-1-before.png`,
        after: `/transformations/after/hair-transformation-1-after.png`,
        title: `Transformación ${serviceName}`
      },
      nails: {
        before: `/transformations/before/nail-transformation-before.png`,
        after: `/transformations/after/nail-transformation-after.png`,
        title: `Transformación ${serviceName}`
      },
      makeup: {
        before: `/transformations/before/makeup-transformation-1-before.png`,
        after: `/transformations/after/makeup-transformation-1-after.png`,
        title: `Transformación ${serviceName}`
      },
      spa: {
        before: `/transformations/before/spa-transformation-1-before.png`,
        after: `/transformations/after/spa-transformation-1-after.png`,
        title: `Transformación ${serviceName}`
      },
      lashes: {
        before: `/transformations/before/lash-transformation-1-before.png`,
        after: `/transformations/after/lash-transformation-1-after.png`,
        title: `Transformación ${serviceName}`
      }
    }

    const fallback = categoryFallbacks[category as keyof typeof categoryFallbacks]
    return fallback ? [fallback] : [{
      before: `/services/${category}/before-default.png`,
      after: `/services/${category}/after-default.png`,
      title: `Resultado ${serviceName}`
    }]
  }

  const displayImages = getTransformationImages()
  const currentImage = displayImages[0]

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-femfuel-rose/10 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-6 border-b-2 border-femfuel-rose/10 bg-gradient-to-r from-white to-femfuel-light/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-femfuel-dark mb-1">
              Resultados Reales
            </h3>
            <p className="text-sm text-femfuel-medium font-medium">
              Mirá los increíbles resultados que logran nuestros especialistas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('split')}
              className={`text-xs font-semibold transition-all duration-300 active:scale-95 ${
                viewMode === 'split'
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 hover:shadow-lg'
                  : 'hover:border-femfuel-rose/40'
              }`}
            >
              Antes/Después
            </Button>
            <Button
              variant={viewMode === 'before' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('before')}
              className={`text-xs font-semibold transition-all duration-300 active:scale-95 ${
                viewMode === 'before'
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 hover:shadow-lg'
                  : 'hover:border-femfuel-rose/40'
              }`}
            >
              Antes
            </Button>
            <Button
              variant={viewMode === 'after' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('after')}
              className={`text-xs font-semibold transition-all duration-300 active:scale-95 ${
                viewMode === 'after'
                  ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 hover:shadow-lg'
                  : 'hover:border-femfuel-rose/40'
              }`}
            >
              Después
            </Button>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="p-6">
        <div className="relative">
          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 gap-6">
              {/* Before Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative shadow-lg border-2 border-femfuel-rose/10">
                  <OptimizedImage
                    src={currentImage.before}
                    alt={`${serviceName} - Antes`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  Antes
                </div>
              </div>

              {/* After Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-femfuel-light to-pink-50 relative shadow-lg border-2 border-femfuel-rose/20">
                  <OptimizedImage
                    src={currentImage.after}
                    alt={`${serviceName} - Después`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  Después
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative shadow-lg border-2 border-femfuel-rose/10">
                <OptimizedImage
                  src={viewMode === 'before' ? currentImage.before : currentImage.after}
                  alt={`${serviceName} - ${viewMode === 'before' ? 'Antes' : 'Después'}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className={`absolute top-4 left-4 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg ${
                viewMode === 'before'
                  ? 'bg-black/90 backdrop-blur-sm'
                  : 'bg-gradient-to-r from-femfuel-rose to-pink-600'
              }`}>
                {viewMode === 'before' ? 'Antes' : 'Después'}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}