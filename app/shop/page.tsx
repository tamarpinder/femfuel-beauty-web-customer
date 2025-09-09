"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Filter, ShoppingCart, MapPin, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProductCard } from "@/components/product-card"
import { LocationModal } from "@/components/location-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { CategoryCarousel } from "@/components/category-carousel"
import { useCart } from "@/contexts/cart-context"
import { 
  mockProducts, 
  getProductsByCategory, 
  getFeaturedProducts,
  getPopularProducts,
  getNewArrivals,
  getProductsOnSale,
  searchProducts
} from "@/data/products"
import { deliveryZones, isLocationServiceable } from "@/data/warehouses"
import { Product, ProductCategory, ProductFilter } from "@/types/product"
import { UserLocation } from "@/types/delivery"

const categories: Array<{ id: ProductCategory; name: string }> = [
  { id: "skincare", name: "Cuidado Facial" },
  { id: "makeup", name: "Maquillaje" },
  { id: "haircare", name: "Cuidado Capilar" },
  { id: "nailcare", name: "Cuidado Uñas" },
  { id: "fragrance", name: "Fragancias" },
  { id: "bodycare", name: "Cuidado Corporal" },
  { id: "tools", name: "Herramientas" },
  { id: "accessories", name: "Accesorios" }
]

const sortOptions = [
  { value: "popular", label: "Más populares" },
  { value: "newest", label: "Más recientes" },
  { value: "price-low", label: "Precio: menor a mayor" },
  { value: "price-high", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "name", label: "Nombre A-Z" }
]

export default function ShopPage() {
  const router = useRouter()
  const { itemCount, userLocation, setUserLocation } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | "all">("all")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)

  // Initialize location on mount if not already set
  useEffect(() => {
    if (!userLocation) {
      // Mock user location for Santo Domingo Centro
      const mockLocation: UserLocation = {
        coordinates: { lat: 18.4861, lng: -69.9312 },
        address: "Av. Winston Churchill, Piantini",
        district: "Piantini",
        city: "Santo Domingo",
        isServiceable: true
      }
      
      const serviceabilityCheck = isLocationServiceable(mockLocation.coordinates)
      mockLocation.isServiceable = serviceabilityCheck.isServiceable
      mockLocation.deliveryZone = serviceabilityCheck.zone
      
      setUserLocation(mockLocation)
    }
  }, [userLocation, setUserLocation])

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

    // Apply subcategory filter
    if (selectedSubcategory !== "all") {
      products = products.filter(product => product.subcategory === selectedSubcategory)
    }

    // Apply location filter - only show products available in user's warehouse
    if (userLocation?.deliveryZone) {
      const warehouseId = deliveryZones.find(zone => zone.id === userLocation.deliveryZone?.id)?.warehouseId
      if (warehouseId) {
        products = products.filter(product => product.availability.warehouseId === warehouseId)
      }
    }

    return products
  }, [searchQuery, selectedCategory, selectedSubcategory, userLocation])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    
    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
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

  // Get available subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === "all") return []
    
    const categoryProducts = mockProducts.filter(product => 
      product.category === selectedCategory && product.availability.inStock
    )
    
    return [...new Set(categoryProducts.map(product => product.subcategory))]
  }, [selectedCategory])

  // Calculate product counts by category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: sortedProducts.length
    }
    
    categories.forEach((category) => {
      const categoryProducts = filteredProducts.filter(product => product.category === category.id)
      counts[category.id] = categoryProducts.length
    })
    
    return counts
  }, [sortedProducts, filteredProducts])

  const handleBack = () => {
    router.push("/")
  }

  const handleLocationUpdate = (location: UserLocation) => {
    setUserLocation(location)
    setShowLocationModal(false)
  }

  const handleAddToCart = (productId: string) => {
    // Cart functionality is handled in ProductCard component
    console.log("Added to cart:", productId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-femfuel-dark">FemFuel Tienda</h1>
                {userLocation && (
                  <div className="flex items-center gap-1 text-xs text-femfuel-medium">
                    <MapPin className="h-3 w-3" />
                    <span>{userLocation.district}</span>
                    {userLocation.isServiceable ? (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        <Truck className="h-3 w-3 mr-1" />
                        Disponible
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                        No disponible
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowLocationModal(true)}
              >
                <MapPin className="h-4 w-4" />
              </Button>
              <CartDrawer>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-femfuel-rose">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <Select value={selectedCategory} onValueChange={(value: string) => setSelectedCategory(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {availableSubcategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Subcategoría</label>
                  <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las subcategorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las subcategorías</SelectItem>
                      {availableSubcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Category Carousel */}
        <CategoryCarousel
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          productCounts={productCounts}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-femfuel-dark">
              {searchQuery ? `Resultados para "${searchQuery}"` : 
               selectedCategory === "all" ? "Todos los productos" : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-sm text-femfuel-medium">
              {sortedProducts.length} productos encontrados
              {userLocation && !userLocation.isServiceable && (
                <span className="text-red-600 ml-2">
                  • No hay entrega disponible en tu ubicación
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {!userLocation?.isServiceable ? (
          <Card className="p-8 text-center bg-red-50 border-red-200">
            <div className="mb-4">
              <Truck className="h-12 w-12 mx-auto text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Entrega no disponible en tu área
              </h3>
              <p className="text-red-600 mb-4">
                Actualmente solo ofrecemos entrega en Santo Domingo. 
                Estamos trabajando para expandir a más ciudades pronto.
              </p>
              <Button 
                onClick={() => setShowLocationModal(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                Cambiar ubicación
              </Button>
            </div>
          </Card>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="mb-4">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                No se encontraron productos
              </h3>
              <p className="text-femfuel-medium mb-4">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedSubcategory("all")
                  setShowFilters(false)
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="shop" />

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationUpdate={handleLocationUpdate}
        currentLocation={userLocation}
      />
    </div>
  )
}