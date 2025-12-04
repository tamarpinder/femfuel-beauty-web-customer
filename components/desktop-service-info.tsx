"use client"

import { Clock, Sparkles, Check, Shield, Star, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DesktopServiceInfoProps {
  serviceName: string
  category: string
  price: number
  duration: number
  description: string
  isPopular?: boolean
  includes?: string[]
}

export function DesktopServiceInfo({ 
  serviceName, 
  category, 
  price, 
  duration, 
  description,
  isPopular = false,
  includes 
}: DesktopServiceInfoProps) {
  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  // Default includes based on category
  const getDefaultIncludes = (category: string): string[] => {
    switch (category.toLowerCase()) {
      case 'nails':
        return [
          'Recubrimiento de gel y arte de uñas',
          'Cuidado profesional de cutículas',
          'Masaje de manos e hidratación',
          'Base, color y capa final',
          'Modelado y pulido de uñas',
          'Herramientas y espacio sanitizado'
        ]
      case 'hair':
        return [
          'Lavado y acondicionamiento profesional',
          'Corte y peinado experto',
          'Aplicación de tratamiento capilar',
          'Secado y acabado',
          'Consulta de estilo',
          'Productos capilares premium'
        ]
      case 'makeup':
        return [
          'Preparación de piel y prebase',
          'Base y corrector',
          'Maquillaje de ojos y pestañas',
          'Color de labios y acabado',
          'Aplicación de fijador en aerosol',
          'Herramientas de maquillaje profesional'
        ]
      case 'spa':
        return [
          'Terapia de masaje relajante',
          'Limpieza y tratamiento facial',
          'Experiencia de aromaterapia',
          'Cuidado hidratante de la piel',
          'Técnicas de alivio del estrés',
          'Productos premium de balneario'
        ]
      case 'lashes':
        return [
          'Extensiones de pestañas individuales',
          'Curvatura y volumen profesional',
          'Tratamiento fortalecedor de pestañas',
          'Aplicación de precisión',
          'Instrucciones de cuidado posterior',
          'Recomendaciones de retoque'
        ]
      default:
        return [
          'Servicio profesional',
          'Garantía de calidad',
          'Cuidado experto',
          'Productos de primera calidad',
          'Ambiente sanitizado',
          'Soporte posterior al cuidado'
        ]
    }
  }

  const serviceIncludes = includes || getDefaultIncludes(category)

  return (
    <div className="space-y-8">
      {/* Service Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark">{serviceName}</h1>
          {isPopular && (
            <Badge className="bg-gradient-to-r from-femfuel-rose to-pink-600 text-white px-4 py-2 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300">
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span className="font-semibold">Más Popular</span>
            </Badge>
          )}
          <Badge variant="secondary" className="bg-femfuel-purple/20 text-femfuel-dark px-4 py-2 border-2 border-femfuel-purple/30 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300">
            <span className="font-semibold">{category === 'nails' ? 'Uñas' :
             category === 'hair' ? 'Cabello' :
             category === 'makeup' ? 'Maquillaje' :
             category === 'spa' ? 'Spa' :
             category === 'lashes' ? 'Pestañas' :
             category === 'skincare' ? 'Cuidado Facial' :
             category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </Badge>
        </div>

        {/* Description */}
        <p className="text-femfuel-medium mt-4 text-base md:text-lg leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* What's Included */}
      <div className="bg-gradient-to-br from-femfuel-purple/20 to-pink-50 rounded-2xl p-6 md:p-8 border-2 border-femfuel-purple/20 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-femfuel-dark mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-femfuel-rose to-pink-600 flex items-center justify-center shadow-md">
            <Check className="h-5 w-5 text-white" />
          </div>
          ¿Qué incluye este servicio?
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {serviceIncludes.map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-3 hover:bg-white/80 hover:shadow-md transition-all duration-300">
              <div className="w-6 h-6 bg-gradient-to-br from-femfuel-rose to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-femfuel-dark font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Guarantees */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md border-2 border-green-200/50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Shield className="h-7 w-7 text-green-600" />
          </div>
          <h4 className="font-bold text-femfuel-dark mb-2 text-lg">Garantía</h4>
          <p className="text-sm text-femfuel-medium font-medium">100% Satisfacción</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border-2 border-yellow-200/50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Star className="h-7 w-7 text-yellow-600" />
          </div>
          <h4 className="font-bold text-femfuel-dark mb-2 text-lg">Calidad</h4>
          <p className="text-sm text-femfuel-medium font-medium">Especialistas Verificados</p>
        </div>
      </div>
    </div>
  )
}