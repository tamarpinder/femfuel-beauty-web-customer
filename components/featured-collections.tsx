"use client"

import { useState, useEffect } from "react"
import { ChevronRight, TrendingUp, Star, Clock, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import {
  getFeaturedProducts,
  getPopularProducts,
  getNewArrivals,
  getProductsOnSale
} from "@/data/products"
import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

interface Collection {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  products: Product[]
  gradient: string
  viewAllPath: string
}

export function FeaturedCollections() {
  const router = useRouter()
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    const collectionsData: Collection[] = [
      {
        id: "new-arrivals",
        title: "Nuevos Lanzamientos",
        subtitle: "Las últimas tendencias en belleza",
        icon: Sparkles,
        products: getNewArrivals().slice(0, 4),
        gradient: "from-purple-400 to-pink-400",
        viewAllPath: "/shop?filter=new"
      },
      {
        id: "bestsellers",
        title: "Más Vendidos",
        subtitle: "Los favoritos de nuestras clientas",
        icon: TrendingUp,
        products: getPopularProducts().slice(0, 4),
        gradient: "from-femfuel-rose to-red-400",
        viewAllPath: "/shop?filter=popular"
      },
      {
        id: "sale",
        title: "Ofertas Especiales",
        subtitle: "Precios increíbles por tiempo limitado",
        icon: Zap,
        products: getProductsOnSale().slice(0, 4),
        gradient: "from-green-400 to-blue-400",
        viewAllPath: "/shop?filter=sale"
      }
    ]

    setCollections(collectionsData)
  }, [])

  const handleViewAll = (path: string) => {
    router.push(path)
  }

  if (collections.length === 0) return null

  return (
    <div className="space-y-8">
      {collections.map((collection) => {
        const IconComponent = collection.icon

        return (
          <div key={collection.id} className="space-y-4">
            {/* Collection Header */}
            <Card className="overflow-hidden">
              <div className={`bg-gradient-to-r ${collection.gradient} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {collection.title}
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base">
                        {collection.subtitle}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20 glassmorphism-button-perfect"
                    onClick={() => handleViewAll(collection.viewAllPath)}
                  >
                    Ver Todo
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Products Grid */}
            {collection.products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {collection.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="text-center text-femfuel-medium">
                  <IconComponent className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay productos disponibles en esta colección</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.push("/shop")}
                  >
                    Explorar Todo
                  </Button>
                </div>
              </Card>
            )}

            {/* Quick Stats for Collection */}
            {collection.products.length > 0 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-6 text-sm text-femfuel-medium bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 border border-femfuel-rose/20">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {(collection.products.reduce((sum, p) => sum + p.rating, 0) / collection.products.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-femfuel-light"></div>
                  <div className="flex items-center gap-1">
                    <span>{collection.products.length} productos</span>
                  </div>
                  {collection.id === "new-arrivals" && (
                    <>
                      <div className="w-px h-4 bg-femfuel-light"></div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Nuevos</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Newsletter CTA */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-femfuel-dark via-femfuel-rose to-purple-600 p-8">
          <div className="text-center text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              ¿Quieres ser la primera en conocer nuestros nuevos productos?
            </h3>
            <p className="text-white/90 mb-4">
              Suscríbete a nuestro newsletter y recibe ofertas exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button
                className="bg-white text-femfuel-dark hover:bg-white/90 font-medium"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}