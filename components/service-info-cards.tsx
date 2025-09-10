"use client"

import { Clock, CheckCircle, Palette, Shield } from "lucide-react"

interface ServiceInfoCardsProps {
  duration: number
  category: string
  includes?: string[]
}

export function ServiceInfoCards({ duration, category, includes }: ServiceInfoCardsProps) {
  // Default includes based on category
  const getDefaultIncludes = (category: string): string[] => {
    switch (category.toLowerCase()) {
      case 'nails':
        return ['Gel Coat', 'Manicure', '+ Design', 'Cuticles']
      case 'hair':
        return ['Wash', 'Cut', 'Style', 'Treatment']
      case 'makeup':
        return ['Base', 'Eyes', 'Lips', 'Contour']
      case 'spa':
        return ['Massage', 'Facial', 'Relax', 'Hydrate']
      case 'lashes':
        return ['Extensions', 'Curl', 'Volume', 'Seal']
      default:
        return ['Professional', 'Quality', 'Guarantee', 'Care']
    }
  }

  const serviceIncludes = includes || getDefaultIncludes(category)

  const cards = [
    {
      icon: Clock,
      title: "Duration",
      value: `${duration} mins`,
      color: "bg-blue-50 text-blue-600"
    },
    ...serviceIncludes.slice(0, 3).map((item, index) => ({
      icon: index === 0 ? CheckCircle : index === 1 ? Palette : Shield,
      title: "Includes",
      value: item,
      color: "bg-femfuel-purple text-femfuel-dark"
    }))
  ]

  return (
    <div className="px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <div
                key={index}
                className={`rounded-lg p-4 text-center ${card.color}`}
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium opacity-80 mb-1">
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