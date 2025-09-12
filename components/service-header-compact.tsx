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
        {/* Badges Only */}
        <div className="flex items-center gap-3">
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
      </div>
    </div>
  )
}