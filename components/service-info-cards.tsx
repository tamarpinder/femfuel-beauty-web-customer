"use client"

import { Clock, CheckCircle, Palette, Shield } from "lucide-react"

interface ServiceInfoCardsProps {
  duration: number
  category: string
  includes?: string[]
}

export function ServiceInfoCards({ duration, category, includes }: ServiceInfoCardsProps) {
  // Default includes based on category (Dominican Spanish)
  const getDefaultIncludes = (category: string): string[] => {
    switch (category.toLowerCase()) {
      case 'nails':
        return ['Gel Coat', 'Manicure', '+ Diseño', 'Cutículas']
      case 'hair':
        return ['Lavado', 'Corte', 'Peinado', 'Tratamiento']
      case 'makeup':
        return ['Base', 'Ojos', 'Labios', 'Contorno']
      case 'spa':
        return ['Masaje', 'Facial', 'Relajación', 'Hidratación']
      case 'lashes':
        return ['Extensiones', 'Curvado', 'Volumen', 'Sellado']
      default:
        return ['Profesional', 'Calidad', 'Garantía', 'Cuidado']
    }
  }

  const serviceIncludes = includes || getDefaultIncludes(category)

  const cards = [
    {
      icon: Clock,
      title: "Duración",
      value: `${duration} min`,
      color: "bg-blue-50 text-blue-600"
    },
    ...serviceIncludes.slice(0, 3).map((item, index) => ({
      icon: index === 0 ? CheckCircle : index === 1 ? Palette : Shield,
      title: "Incluye",
      value: item,
      color: "bg-femfuel-purple text-femfuel-dark"
    }))
  ]

  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <div
                key={index}
                className={`rounded-xl p-5 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-femfuel-rose/20 ${card.color}`}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold opacity-80 mb-1.5 uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="text-sm font-bold">
                  {card.value}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}