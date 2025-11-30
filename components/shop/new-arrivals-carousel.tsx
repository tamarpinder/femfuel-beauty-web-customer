"use client"

import { Sparkles } from "lucide-react"
import { ProductCarousel } from "./product-carousel"
import { Product } from "@/types/product"

interface NewArrivalsCarouselProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function NewArrivalsCarousel({ products, onProductClick }: NewArrivalsCarouselProps) {
  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-femfuel-rose" />
          <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark font-serif">
            Recién Llegados
          </h2>
        </div>
        <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
          Lo último en productos de belleza
        </p>
      </div>

      {/* Carousel */}
      <ProductCarousel
        products={products}
        onProductClick={onProductClick}
        showDiscount={false}
      />
    </section>
  )
}
