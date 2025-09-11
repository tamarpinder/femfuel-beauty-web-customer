"use client"

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
        <div className="flex items-center gap-4">
          {/* Before/After Images */}
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-md">
            {/* Before Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm relative">
                <OptimizedImage
                  src={currentImage.before}
                  alt={`${serviceName} - Antes`}
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
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
                  sizes="(max-width: 640px) 50vw, 200px"
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
            <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
              Resultados Reales
            </h3>
            
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
      </div>
    </div>
  )
}