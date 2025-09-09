"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface Category {
  name: string
  icon: LucideIcon
  count: string
  bannerImage?: string
}

interface CategoryCardProps {
  category: Category
  onClick?: (categoryName: string) => void
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const handleClick = () => {
    onClick?.(category.name)
  }

  return (
    <Card
      className="p-0 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-sm overflow-hidden"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        {category.bannerImage ? (
          <div className="relative h-24 w-full">
            <img
              src={category.bannerImage}
              alt={`${category.name} category`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <h3 className="font-medium text-white text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-white/80">{category.count}</p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[var(--femfuel-rose)] to-[var(--femfuel-gold)] rounded-full flex items-center justify-center">
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-femfuel-dark text-sm mb-1">{category.name}</h3>
            <p className="text-xs text-femfuel-medium">{category.count}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
