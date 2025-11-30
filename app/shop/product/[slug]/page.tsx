"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProductCard } from "@/components/product-card"
import { ProductPageLayout } from "@/components/product-page-layout"
import { mockProducts } from "@/data/products"
import { Product } from "@/types/product"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productSlug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      // Find product by slug
      const foundProduct = mockProducts.find(p => p.slug === productSlug)
      setProduct(foundProduct || null)
      setIsLoading(false)
    }

    fetchProduct()
  }, [productSlug])

  const relatedProducts = mockProducts
    .filter(p => p.id !== product?.id && p.category === product?.category && p.availability.inStock)
    .slice(0, 4)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-16 bg-white/80 backdrop-blur-md border-b border-femfuel-rose/10"></div>
          {/* Content Skeleton */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-2xl shadow-lg"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded-xl w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded-xl w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 flex items-center justify-center p-4">
        <div className="text-center bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/20 rounded-2xl p-8 shadow-xl max-w-md">
          <div className="w-20 h-20 bg-femfuel-light rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">Producto no encontrado</h1>
          <p className="text-femfuel-medium mb-6">El producto "<span className="font-semibold">{productSlug}</span>" no existe en nuestra tienda.</p>
          <Button
            onClick={() => router.push("/shop")}
            className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold rounded-full px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Ir a la Tienda
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ProductPageLayout product={product} />

      {/* Related Products - Enhanced */}
      {relatedProducts.length > 0 && (
        <div className="bg-gradient-to-br from-white via-femfuel-light/10 to-pink-50/20 border-t-2 border-femfuel-rose/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-2">Productos Relacionados</h3>
              <p className="text-femfuel-medium">Productos similares que también te pueden gustar</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="shop" />
    </>
  )
}