"use client"

import { ChevronRight, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface CategoryHeroProps {
  categoryName: string
  categorySlug: string
  description: string
  imageUrl: string
  productCount: number
}

export function CategoryHero({
  categoryName,
  categorySlug,
  description,
  imageUrl,
  productCount
}: CategoryHeroProps) {
  const router = useRouter()

  return (
    <div className="relative h-[300px] overflow-hidden rounded-2xl mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={categoryName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-white/90">
          <button
            onClick={() => router.push("/")}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Inicio</span>
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <button
            onClick={() => router.push("/shop")}
            className="hover:text-white transition-colors"
          >
            Tienda
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white font-medium">{categoryName}</span>
        </nav>

        {/* Category Info */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-serif">
            {categoryName}
          </h1>
          <p className="text-lg text-white/90 mb-4 max-w-2xl">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold text-white">
              {productCount} productos disponibles
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
