"use client"

import { useState } from "react"
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
  beforeAfter?: {
    before: string
    after: string
    title: string
    testimonial?: string
    customerName?: string
    rating?: number
  }
}

export function BeforeAfterCarousel({ serviceName, category, images, beforeAfter }: BeforeAfterCarouselProps) {
  const [showBefore, setShowBefore] = useState(true)

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
    <div className="px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-lg font-semibold text-femfuel-dark mb-4 text-center">
          Resultados Reales
        </h3>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Before/After Images */}
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-md">
            {/* Before Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm relative">
                <OptimizedImage
                  src={currentImage.before}
                  alt={`${serviceName} - Antes`}
                  fill
                  sizes="200px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Antes
              </div>
            </div>

            {/* After Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm relative">
                <OptimizedImage
                  src={currentImage.after}
                  alt={`${serviceName} - Después`}
                  fill
                  sizes="200px"
                  className="object-cover"
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
            {/* Customer testimonial */}
            {beforeAfter?.testimonial && beforeAfter?.customerName ? (
              <div className="mb-4">
                <p className="text-sm text-femfuel-dark mb-1 italic">
                  "{beforeAfter.testimonial}"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-femfuel-medium">- {beforeAfter.customerName}</span>
                  {beforeAfter.rating && (
                    <div className="flex items-center">
                      <span className="text-xs text-yellow-500">★</span>
                      <span className="text-xs text-femfuel-medium ml-1">{beforeAfter.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-femfuel-medium mb-4">
                Ve los increíbles resultados que nuestros especialistas logran
              </p>
            )}
          </div>
        </div>

        {/* Mobile Layout - Full Screen Carousel */}
        <div className="md:hidden">
          {/* Full Width Image Display */}
          <div className="relative mb-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-lg relative">
              <OptimizedImage
                src={showBefore ? currentImage.before : currentImage.after}
                alt={`${serviceName} - ${showBefore ? 'Antes' : 'Después'}`}
                fill
                sizes="(max-width: 640px) 100vw"
                className="object-cover transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-black/80 text-white text-sm px-3 py-1.5 rounded-full font-medium">
                {showBefore ? 'Antes' : 'Después'}
              </div>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setShowBefore(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                showBefore 
                  ? 'bg-femfuel-rose text-white shadow-lg' 
                  : 'bg-white text-femfuel-dark border border-gray-200 hover:border-femfuel-rose/30'
              }`}
            >
              Ver Antes
            </button>
            <button
              onClick={() => setShowBefore(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                !showBefore 
                  ? 'bg-femfuel-rose text-white shadow-lg' 
                  : 'bg-white text-femfuel-dark border border-gray-200 hover:border-femfuel-rose/30'
              }`}
            >
              Ver Después
            </button>
          </div>

          {/* Customer Testimonial - Mobile */}
          {beforeAfter?.testimonial && beforeAfter?.customerName ? (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-femfuel-dark mb-2 italic leading-relaxed">
                "{beforeAfter.testimonial}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-femfuel-medium">- {beforeAfter.customerName}</span>
                {beforeAfter.rating && (
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="text-sm text-yellow-500">★</span>
                    <span className="text-sm text-femfuel-dark ml-1 font-medium">{beforeAfter.rating}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-sm text-femfuel-medium">
                Ve los increíbles resultados que nuestros especialistas logran
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}