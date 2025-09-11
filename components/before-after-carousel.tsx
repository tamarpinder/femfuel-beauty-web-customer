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
  const getDefaultImages = (): BeforeAfterImage[] => {
    const serviceLower = serviceName.toLowerCase()
    
    // Hair Services
    if (serviceLower.includes('alisado dominicano')) {
      return [
        {
          before: `/transformations/before/dominican-blowout-before.png`,
          after: `/transformations/after/dominican-blowout-after.png`,
          title: "Transformación Alisado Dominicano 1"
        },
        {
          before: `/transformations/before/dominican-blowout-before-1.png`,
          after: `/transformations/after/dominican-blowout-after-1.png`,
          title: "Transformación Alisado Dominicano 2"
        }
      ]
    }
    
    if (serviceLower.includes('keratin') || serviceLower.includes('keratina')) {
      return [
        {
          before: `/transformations/before/keratin-treatment-service-before.png`,
          after: `/transformations/after/keratin-treatment-service-after.png`,
          title: "Transformación Keratina"
        }
      ]
    }
    
    if (serviceLower.includes('balayage')) {
      return [
        {
          before: `/transformations/before/balayage-before.png`,
          after: `/transformations/after/balayage-after.png`,
          title: "Transformación Balayage"
        }
      ]
    }
    
    if (serviceLower.includes('corte') && serviceLower.includes('rizado')) {
      return [
        {
          before: `/transformations/before/corte-rizado-before.png`,
          after: `/transformations/after/corte-rizado-after.png`,
          title: "Corte de Cabello Rizado"
        }
      ]
    }
    
    if (serviceLower.includes('corte de cabello') || serviceLower.includes('corte y estilo')) {
      return [
        {
          before: `/transformations/before/corte-cabello-before.png`,
          after: `/transformations/after/corte-cabello-after.png`,
          title: "Corte de Cabello"
        }
      ]
    }
    
    if (serviceLower.includes('tinte') || serviceLower.includes('coloración')) {
      return [
        {
          before: `/transformations/before/tinte-cabello-before.png`,
          after: `/transformations/after/tinte-cabello-after.png`,
          title: "Tinte de Cabello"
        }
      ]
    }
    
    if (serviceLower.includes('peinado') && (serviceLower.includes('evento') || serviceLower.includes('especial'))) {
      return [
        {
          before: `/transformations/before/peinado-evento-before.png`,
          after: `/transformations/after/peinado-evento-after.png`,
          title: "Peinado para Evento"
        }
      ]
    }
    
    if (serviceLower.includes('transformación') && category === 'cabello') {
      return [
        {
          before: `/transformations/before/hair-transformation-1-before.png`,
          after: `/transformations/after/hair-transformation-1-after.png`,
          title: "Transformación Cabello 1"
        },
        {
          before: `/transformations/before/hair-transformation-2-before.png`,
          after: `/transformations/after/hair-transformation-2-after.png`,
          title: "Transformación Cabello 2"
        }
      ]
    }
    
    // Makeup Services
    if (serviceLower.includes('novia') || serviceLower.includes('bridal')) {
      return [
        {
          before: `/transformations/before/maquillaje-novia-before.png`,
          after: `/transformations/after/maquillaje-novia-after.png`,
          title: "Maquillaje de Novia"
        }
      ]
    }
    
    if (serviceLower.includes('ejecutivo') || serviceLower.includes('profesional')) {
      return [
        {
          before: `/transformations/before/maquillaje-ejecutivo-before.png`,
          after: `/transformations/after/maquillaje-ejecutivo-after.png`,
          title: "Maquillaje Ejecutivo"
        }
      ]
    }
    
    if (serviceLower.includes('gala') || serviceLower.includes('evento')) {
      return [
        {
          before: `/transformations/before/maquillaje-gala-before.png`,
          after: `/transformations/after/maquillaje-gala-after.png`,
          title: "Maquillaje de Gala"
        }
      ]
    }
    
    if (category === 'maquillaje' || serviceLower.includes('maquillaje')) {
      return [
        {
          before: `/transformations/before/makeup-transformation-1-before.png`,
          after: `/transformations/after/makeup-transformation-1-after.png`,
          title: "Transformación Maquillaje 1"
        },
        {
          before: `/transformations/before/makeup-transformation-2-before.png`,
          after: `/transformations/after/makeup-transformation-2-after.png`,
          title: "Transformación Maquillaje 2"
        },
        {
          before: `/transformations/before/makeup-transformation-3-before.png`,
          after: `/transformations/after/makeup-transformation-3-after.png`,
          title: "Transformación Maquillaje 3"
        }
      ]
    }
    
    // Nail Services
    if (serviceLower.includes('gel')) {
      return [
        {
          before: `/transformations/before/manicure-gel-before.png`,
          after: `/transformations/after/manicure-gel-after.png`,
          title: "Manicure de Gel"
        }
      ]
    }
    
    if (serviceLower.includes('clásico') || serviceLower.includes('clasico')) {
      return [
        {
          before: `/transformations/before/manicure-clasico-before.png`,
          after: `/transformations/after/manicure-clasico-after.png`,
          title: "Manicure Clásico"
        }
      ]
    }
    
    if (serviceLower.includes('tropical') || serviceLower.includes('nail art') || serviceLower.includes('arte')) {
      return [
        {
          before: `/transformations/before/arte-unas-tropical-before.png`,
          after: `/transformations/after/arte-unas-tropical-after.png`,
          title: "Arte de Uñas Tropical"
        }
      ]
    }
    
    if (serviceLower.includes('extensiones') || serviceLower.includes('acrílico') || serviceLower.includes('acrilico')) {
      return [
        {
          before: `/transformations/before/extensiones-acrilico-before.png`,
          after: `/transformations/after/extensiones-acrilico-after.png`,
          title: "Extensiones de Acrílico"
        }
      ]
    }
    
    if (serviceLower.includes('pedicure')) {
      return [
        {
          before: `/transformations/before/pedicure-spa-before.png`,
          after: `/transformations/after/pedicure-spa-after.png`,
          title: "Pedicure Spa"
        }
      ]
    }
    
    if (category === 'unas' || serviceLower.includes('manicure') || serviceLower.includes('uña')) {
      return [
        {
          before: `/transformations/before/nail-transformation-before.png`,
          after: `/transformations/after/nail-transformation-after.png`,
          title: "Transformación Uñas"
        }
      ]
    }
    
    // Lash & Brow Services
    if (serviceLower.includes('volumen ruso') || serviceLower.includes('russian')) {
      return [
        {
          before: `/transformations/before/volumen-ruso-before.png`,
          after: `/transformations/after/volumen-ruso-after.png`,
          title: "Volumen Ruso"
        }
      ]
    }
    
    if (serviceLower.includes('microblading')) {
      return [
        {
          before: `/transformations/before/microblading-before.png`,
          after: `/transformations/after/microblading-after.png`,
          title: "Microblading de Cejas"
        }
      ]
    }
    
    if (serviceLower.includes('diseño de cejas') || serviceLower.includes('cejas')) {
      return [
        {
          before: `/transformations/before/diseno-cejas-before.png`,
          after: `/transformations/after/diseno-cejas-after.png`,
          title: "Diseño de Cejas"
        }
      ]
    }
    
    if (serviceLower.includes('extensiones de pestañas') || serviceLower.includes('pestaña')) {
      return [
        {
          before: `/transformations/before/extensiones-pestanas-before.png`,
          after: `/transformations/after/extensiones-pestanas-after.png`,
          title: "Extensiones de Pestañas"
        }
      ]
    }
    
    if (category === 'pestanas') {
      return [
        {
          before: `/transformations/before/lash-transformation-1-before.png`,
          after: `/transformations/after/lash-transformation-1-after.png`,
          title: "Transformación Pestañas"
        }
      ]
    }
    
    // Spa Services
    if (serviceLower.includes('masaje')) {
      return [
        {
          before: `/transformations/before/masaje-relajante-before.png`,
          after: `/transformations/after/masaje-relajante-after.png`,
          title: "Masaje Relajante"
        }
      ]
    }
    
    if (serviceLower.includes('limpieza facial')) {
      return [
        {
          before: `/transformations/before/limpieza-facial-before.png`,
          after: `/transformations/after/limpieza-facial-after.png`,
          title: "Limpieza Facial Profunda"
        }
      ]
    }
    
    if (serviceLower.includes('oro') || serviceLower.includes('gold')) {
      return [
        {
          before: `/transformations/before/facial-oro-before.png`,
          after: `/transformations/after/facial-oro-after.png`,
          title: "Facial de Oro 24K"
        }
      ]
    }
    
    if (category === 'spa' || serviceLower.includes('spa') || serviceLower.includes('facial')) {
      return [
        {
          before: `/transformations/before/spa-transformation-1-before.png`,
          after: `/transformations/after/spa-transformation-1-after.png`,
          title: "Transformación Spa"
        }
      ]
    }
    
    // Default generic images for other services
    return [
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
  }

  const defaultImages = getDefaultImages()

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