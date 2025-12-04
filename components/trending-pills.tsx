"use client"

import { Badge } from "@/components/ui/badge"

interface TrendingPillsProps {
  services: string[]
  onServiceClick?: (service: string) => void
}

export function TrendingPills({ services, onServiceClick }: TrendingPillsProps) {
  return (
    <section className="px-4 py-12 bg-gradient-to-br from-femfuel-light via-purple-50/30 to-pink-50/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-femfuel-dark mb-6 text-center">Tendencias</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {services.map((service) => (
            <Badge
              key={service}
              variant="secondary"
              className="whitespace-nowrap bg-white/80 backdrop-blur-sm border-2 border-femfuel-rose/10 text-femfuel-medium hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white hover:border-transparent cursor-pointer transition-all duration-300 px-4 py-2 shadow-md hover:shadow-lg active:scale-95 rounded-full font-medium"
              onClick={() => onServiceClick?.(service)}
            >
              {service}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
