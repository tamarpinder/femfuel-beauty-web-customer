"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, Sparkles } from "lucide-react"

interface ServiceHeaderCompactProps {
  serviceName: string
  category: string
  price: number
  duration: number
  isPopular?: boolean
}

export function ServiceHeaderCompact({ 
  serviceName, 
  category, 
  price, 
  duration, 
  isPopular = false 
}: ServiceHeaderCompactProps) {
  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  return (
    <div className="bg-white border-b border-gray-100 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Service Name and Badges */}
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-femfuel-dark">{serviceName}</h1>
          {isPopular && (
            <Badge className="bg-femfuel-rose text-white px-2 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
          <Badge variant="secondary" className="bg-femfuel-purple text-femfuel-dark px-2 py-1">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>

        {/* Key Info Row */}
        <div className="flex items-center gap-6 text-femfuel-medium">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-femfuel-rose">{formatPrice(price)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{duration} min</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm">precio inicial</span>
          </div>
        </div>
      </div>
    </div>
  )
}