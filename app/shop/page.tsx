"use client"

import { useState, useEffect, useMemo } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ShopHeader } from "@/components/shop/shop-header"
import { ShopHeroEnhanced } from "@/components/shop/shop-hero-enhanced"
import { HairExtensionsSpotlight } from "@/components/shop/hair-extensions-spotlight"
import { HairExtensionsGrid } from "@/components/shop/hair-extensions-grid"
import { FlashSaleBanner } from "@/components/shop/flash-sale-banner"
import { ProductCarousel } from "@/components/shop/product-carousel"
import { BestSellersGrid } from "@/components/shop/best-sellers-grid"
import { NewArrivalsCarousel } from "@/components/shop/new-arrivals-carousel"
import { CuratedRoutines } from "@/components/shop/curated-routines"
import { QuickViewModal } from "@/components/shop/quick-view-modal"
import { ShopRecommendations } from "@/components/shop/shop-recommendations"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import {
  mockProducts,
  searchProducts,
  getProductsOnSale,
  getPopularProducts,
  getNewArrivals
} from "@/data/products"
import { Product, ProductCategory } from "@/types/product"

export default function ShopNewPage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all")
  const [sortBy, setSortBy] = useState("popular")
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Get featured product sections
  const saleProducts = useMemo(() => getProductsOnSale().slice(0, 8), [])
  const bestSellers = useMemo(() => getPopularProducts().slice(0, 8), [])
  const newArrivals = useMemo(() => getNewArrivals().slice(0, 8), [])

  // Get categories with product counts
  const categoriesWithCounts = useMemo(() => {
    const inStockProducts = mockProducts.filter(p => p.availability.inStock)
    return [
      { id: "skincare" as ProductCategory, name: "Cuidado Facial", count: inStockProducts.filter(p => p.category === "skincare").length },
      { id: "makeup" as ProductCategory, name: "Maquillaje", count: inStockProducts.filter(p => p.category === "makeup").length },
      { id: "haircare" as ProductCategory, name: "Cuidado Capilar", count: inStockProducts.filter(p => p.category === "haircare").length },
      { id: "hair-extensions" as ProductCategory, name: "Extensiones & Cabello", count: inStockProducts.filter(p => p.category === "hair-extensions").length },
      { id: "nailcare" as ProductCategory, name: "Cuidado de Uñas", count: inStockProducts.filter(p => p.category === "nailcare").length },
      { id: "tools" as ProductCategory, name: "Herramientas & Accesorios", count: inStockProducts.filter(p => p.category === "tools").length }
    ]
  }, [])

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let products = mockProducts.filter(product => product.availability.inStock)

    // Apply search query
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery)
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      products = products.filter(product => product.category === selectedCategory)
    }

    return products
  }, [searchQuery, selectedCategory])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case "featured":
      case "popular":
        return sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "price-asc":
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false)
    setTimeout(() => setQuickViewProduct(null), 300) // Delay reset for animation
  }

  const handleAddAllToCart = async (products: Product[]) => {
    if (products.length === 0) {
      toast.error("No hay productos en esta rutina")
      return
    }

    // Add each product to cart
    for (const product of products) {
      await addToCart(product.id, 1)
    }

    toast.success(`${products.length} productos agregados al carrito`)
  }

  return (
    <>
      {/* Unified Shop Header with Categories */}
      <ShopHeader />

      {/* Hero Section - Full Width */}
      <ShopHeroEnhanced />

      {/* Hair Extensions Spotlight */}
      <HairExtensionsSpotlight />

      {/* Hair Extensions Grid */}
      <HairExtensionsGrid />

      {/* Flash Sale Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div id="ofertas">
          <FlashSaleBanner />
          {saleProducts.length > 0 && (
            <ProductCarousel
              products={saleProducts}
              onProductClick={handleQuickView}
              showDiscount={true}
            />
          )}
        </div>
      </div>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <div className="max-w-7xl mx-auto px-6">
          <BestSellersGrid
            products={bestSellers}
            onProductClick={handleQuickView}
          />
        </div>
      )}

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <div className="max-w-7xl mx-auto px-6">
          <NewArrivalsCarousel
            products={newArrivals}
            onProductClick={handleQuickView}
          />
        </div>
      )}

      {/* Curated Routines Section */}
      <CuratedRoutines
        onProductClick={handleQuickView}
        onAddAllToCart={handleAddAllToCart}
      />

      {/* Smart Recommendations */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <ShopRecommendations
          currentCategory={selectedCategory !== "all" ? selectedCategory : undefined}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="shop" />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </>
  )
}
