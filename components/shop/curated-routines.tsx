"use client"

import { useMemo } from "react"
import { Sun, Moon, Zap, Heart, Sparkles, Leaf } from "lucide-react"
import { BeautyRoutineCard } from "./beauty-routine-card"
import { mockProducts } from "@/data/products"
import { Product } from "@/types/product"

interface CuratedRoutinesProps {
  onProductClick: (product: Product) => void
  onAddAllToCart: (products: Product[]) => void
}

export function CuratedRoutines({ onProductClick, onAddAllToCart }: CuratedRoutinesProps) {
  // Define curated routines with actual products
  const routines = useMemo(() => {
    const allProducts = mockProducts.filter(p => p.availability.inStock)

    // Helper to find product by ID with fallback to category/subcategory
    const getProductsByIds = (productIds: string[], fallbackCategory?: string, fallbackSubcategory?: string, limit: number = 4) => {
      const products: Product[] = []

      // Try to find products by ID
      productIds.forEach(id => {
        const product = allProducts.find(p => p.id === id)
        if (product) products.push(product)
      })

      // If we don't have enough products and fallback is provided, search by category
      if (products.length < limit && fallbackCategory) {
        const fallbackProducts = allProducts
          .filter(p => {
            // Don't add products we already have
            if (products.find(existing => existing.id === p.id)) return false

            if (fallbackSubcategory) {
              return p.category === fallbackCategory && p.subcategory === fallbackSubcategory
            }
            return p.category === fallbackCategory
          })
          .slice(0, limit - products.length)

        products.push(...fallbackProducts)
      }

      return products
    }

    return [
      {
        id: "glow-up-morning",
        title: "Despertar Radiante",
        description: "La rutina perfecta para comenzar radiante",
        imageUrl: "/routines/glow-up-morning.png",
        icon: Sun,
        products: getProductsByIds(
          ["cleanser-foam-gentle", "serum-vitamin-c", "hero-featured-product-1", "moisturizer-hyaluronic"],
          "skincare",
          "Sueros"
        ),
        totalValue: 0,
        bundlePrice: 0,
        rating: 4.8,
        reviewCount: 243,
        testimonial: {
          text: "Mi piel nunca se ha visto tan radiante. Esta rutina cambió mi vida completamente.",
          author: "María R."
        }
      },
      {
        id: "night-repair-ritual",
        title: "Ritual Reparador Nocturno",
        description: "Restaura y rejuvenece mientras duermes",
        imageUrl: "/routines/night-repair-ritual.png",
        icon: Moon,
        products: getProductsByIds(
          ["cleanser-oil-makeup-remover", "serum-retinol-night", "hero-featured-product-5", "eye-cream-anti-aging"],
          "skincare",
          "Hidratantes"
        ),
        totalValue: 0,
        bundlePrice: 0,
        rating: 4.9,
        reviewCount: 312,
        testimonial: {
          text: "Despierto con la piel increíble. Mis líneas finas han mejorado notablemente.",
          author: "Carmen L."
        }
      },
      {
        id: "5-minute-power-face",
        title: "Maquillaje Express 5 Minutos",
        description: "Maquillaje rápido para días ocupados",
        imageUrl: "/routines/5-minute-power-face.png",
        icon: Zap,
        products: getProductsByIds(
          ["hero-featured-product-4", "mascara-volume-extreme", "blush-cream-pink-glow", "lip-tint-berry"],
          "makeup",
          "Bases"
        ),
        totalValue: 0,
        bundlePrice: 0,
        rating: 4.7,
        reviewCount: 189,
        testimonial: {
          text: "Salgo de casa lista en minutos. Perfecto para mamás ocupadas como yo.",
          author: "Ana S."
        }
      },
      {
        id: "date-night-glam",
        title: "Glamour de Noche",
        description: "Look impactante para ocasiones especiales",
        imageUrl: "/routines/date-night-glam.png",
        icon: Heart,
        products: getProductsByIds(
          ["hero-featured-product-4", "hero-featured-product-2", "eyeliner-gel-black", "lipstick-matte-classic-red", "highlighter-champagne-glow"],
          "makeup",
          "Sombras"
        ),
        totalValue: 0,
        bundlePrice: 0,
        rating: 4.9,
        reviewCount: 276,
        testimonial: {
          text: "Recibí tantos cumplidos en mi última cita. Este set es puro glamour.",
          author: "Sofía M."
        }
      },
      {
        id: "hair-therapy-weekend",
        title: "Spa Capilar de Fin de Semana",
        description: "Tratamiento profundo para cabello saludable",
        imageUrl: "/routines/hair-therapy-weekend.png",
        icon: Sparkles,
        products: getProductsByIds(
          ["hair-mask-repair", "treatment-oil-argan-intensive", "conditioner-hydrating-silk", "styling-cream-curl-definer"],
          "haircare",
          "Tratamientos"
        ),
        totalValue: 0,
        bundlePrice: 0,
        rating: 4.8,
        reviewCount: 198,
        testimonial: {
          text: "Mi cabello está más suave y brillante que nunca. Vale cada peso.",
          author: "Laura V."
        }
      },
      {
        id: "natural-beauty-edit",
        title: "Belleza Natural Diaria",
        description: "Belleza effortless para el día a día",
        imageUrl: "/routines/natural-beauty-edit.png",
        icon: Leaf,
        products: getProductsByIds(
          ["hero-featured-product-4", "blush-cream-pink-glow", "bronzer-matte-sun-kissed", "lipgloss-nude-shine"],
          "makeup",
          "Mejillas"
        ),
        totalValue: 0,
        bundlePrice: 0,
        rating: 4.7,
        reviewCount: 167,
        testimonial: {
          text: "Me veo como yo pero mejor. Maquillaje que parece que no llevo nada.",
          author: "Patricia G."
        }
      }
    ].map(routine => {
      const totalValue = routine.products.reduce((sum, p) => sum + (p.originalPrice || p.price), 0)
      const bundlePrice = Math.round(totalValue * 0.85) // 15% discount on bundles
      return { ...routine, totalValue, bundlePrice }
    })
  }, [])

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-femfuel-light/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-4 font-serif">
            Rutinas creadas por especialistas, adaptadas a tus necesidades.
          </h2>
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto">
            Encuentra sets diseñados para cada momento de tu día. Llévate la rutina completa y ahorra hasta un 15%.
          </p>
        </div>

        {/* Routines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {routines.map((routine) => (
            <BeautyRoutineCard
              key={routine.id}
              routine={routine}
              onProductClick={onProductClick}
              onAddAllToCart={onAddAllToCart}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
