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
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-16 bg-gray-200"></div>
          {/* Content Skeleton */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">Producto no encontrado</h1>
          <p className="text-femfuel-medium mb-6">El producto "{productSlug}" no existe.</p>
          <Button onClick={() => router.push("/shop")} className="bg-femfuel-rose hover:bg-femfuel-rose-hover text-white">
            Ir a la Tienda
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ProductPageLayout product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-xl font-bold text-femfuel-dark mb-6">Productos relacionados</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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