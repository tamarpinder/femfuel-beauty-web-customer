import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface UrgencyBadgeProps {
  variant?: "low-stock" | "limited-time" | "trending" | "selling-fast" | "last-chance"
  count?: number
  className?: string
}

const variantConfig = {
  "low-stock": {
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    text: (count?: number) => count ? `¡Solo ${count} disponibles!` : "Stock limitado",
    pulse: true
  },
  "limited-time": {
    color: "bg-gradient-to-r from-red-500 to-red-600",
    text: () => "¡Oferta por tiempo limitado!",
    pulse: true
  },
  "trending": {
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    text: () => "🔥 Tendencia",
    pulse: false
  },
  "selling-fast": {
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    text: () => "⚡ Vendiendo rápido",
    pulse: true
  },
  "last-chance": {
    color: "bg-gradient-to-r from-red-600 to-red-700",
    text: () => "⏰ ¡Última oportunidad!",
    pulse: true
  }
}

export function UrgencyBadge({ variant = "low-stock", count, className }: UrgencyBadgeProps) {
  const config = variantConfig[variant]

  return (
    <Badge
      className={cn(
        config.color,
        "text-white text-xs px-3 py-1 shadow-md font-semibold",
        config.pulse && "animate-pulse",
        className
      )}
    >
      {config.text(count)}
    </Badge>
  )
}
