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
          'Gel coating & nail art',
          'Professional cuticle care',
          'Hand massage & moisturizing',
          'Base + color + top coat',
          'Nail shaping & buffing',
          'Sanitized tools & workspace'
        ]
      case 'hair':
        return [
          'Professional wash & conditioning',
          'Expert cut & styling',
          'Hair treatment application',
          'Blow dry & finishing',
          'Style consultation',
          'Premium hair products'
        ]
      case 'makeup':
        return [
          'Skin prep & primer',
          'Foundation & concealer',
          'Eye makeup & lashes',
          'Lip color & finishing',
          'Setting spray application',
          'Professional makeup tools'
        ]
      case 'spa':
        return [
          'Relaxing massage therapy',
          'Facial cleansing & treatment',
          'Aromatherapy experience',
          'Hydrating skin care',
          'Stress relief techniques',
          'Premium spa products'
        ]
      case 'lashes':
        return [
          'Individual lash extensions',
          'Professional curl & volume',
          'Lash strengthening treatment',
          'Precision application',
          'Aftercare instructions',
          'Touch-up recommendations'
        ]
      default:
        return [
          'Professional service',
          'Quality guarantee',
          'Expert care',
          'Premium products',
          'Sanitized environment',
          'Aftercare support'
        ]
    }
  }

  const serviceIncludes = includes || getDefaultIncludes(category)

  return (
    <div className="space-y-6">
      {/* Service Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-femfuel-dark">{serviceName}</h1>
          {isPopular && (
            <Badge className="bg-femfuel-rose text-white px-3 py-1">
              <Sparkles className="h-4 w-4 mr-1" />
              Popular
            </Badge>
          )}
          <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark px-3 py-1">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>

        {/* Key Info */}
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-femfuel-rose">{formatPrice(price)}</span>
            <span className="text-femfuel-medium text-base">precio inicial</span>
          </div>
          <div className="flex items-center gap-2 text-femfuel-medium">
            <Clock className="h-5 w-5" />
            <span className="font-medium">{duration} minutos</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-femfuel-medium mt-4 text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* What's Included */}
      <div className="bg-gradient-to-br from-femfuel-purple to-white rounded-xl p-6">
        <h3 className="text-xl font-semibold text-femfuel-dark mb-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-femfuel-rose" />
          ¿Qué incluye este servicio?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {serviceIncludes.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 bg-femfuel-rose rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-femfuel-dark font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Guarantees */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-femfuel-dark mb-1">Garantía</h4>
          <p className="text-sm text-femfuel-medium">100% Satisfacción</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <h4 className="font-semibold text-femfuel-dark mb-1">Calidad</h4>
          <p className="text-sm text-femfuel-medium">Especialistas Verificados</p>
        </div>
      </div>
    </div>
  )
}