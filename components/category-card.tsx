"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { OptimizedImage } from "@/components/ui/optimized-image"

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
      className="p-0 text-center hover:shadow-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30 shadow-lg overflow-hidden rounded-2xl"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        {category.bannerImage ? (
          <div className="relative h-24 sm:h-28 w-full">
            <OptimizedImage
              src={category.bannerImage}
              alt={`${category.name} category`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500"
              context={category.name.toLowerCase()}
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center">
              <h3 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-lg">{category.name}</h3>
              <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow">{category.count}</p>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 bg-gradient-to-br from-white to-femfuel-light/30">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-femfuel-rose to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="font-bold text-femfuel-dark text-sm sm:text-base mb-1">{category.name}</h3>
            <p className="text-xs sm:text-sm text-femfuel-medium font-medium">{category.count}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
