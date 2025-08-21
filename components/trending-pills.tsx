"use client"

import { Badge } from "@/components/ui/badge"

interface TrendingPillsProps {
  services: string[]
  onServiceClick?: (service: string) => void
}

export function TrendingPills({ services, onServiceClick }: TrendingPillsProps) {
  return (
    <section className="px-4 py-12 bg-femfuel-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-femfuel-dark mb-6 text-center">Tendencias</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {services.map((service) => (
            <Badge
              key={service}
              variant="secondary"
              className="whitespace-nowrap bg-white text-femfuel-medium hover:bg-femfuel-rose hover:text-white cursor-pointer transition-colors px-4 py-2"
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
