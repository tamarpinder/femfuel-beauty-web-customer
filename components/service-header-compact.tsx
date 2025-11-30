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
    <div className="bg-white/95 backdrop-blur-md border-b-2 border-femfuel-rose/10 py-4 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Badges Only */}
        <div className="flex items-center gap-3">
          {isPopular && (
            <Badge className="bg-gradient-to-r from-femfuel-rose to-pink-600 text-white px-3 py-1.5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              <span className="font-semibold">Popular</span>
            </Badge>
          )}
          <Badge variant="secondary" className="bg-femfuel-purple/20 text-femfuel-dark px-3 py-1.5 border-2 border-femfuel-purple/30 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
            <span className="font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </Badge>
        </div>
      </div>
    </div>
  )
}