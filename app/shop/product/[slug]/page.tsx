"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Share2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ProductCard } from "@/components/product-card"
import { mockProducts, getProductById } from "@/data/products"
import { deliveryZones, calculateDeliveryFee } from "@/data/warehouses"
import { Product } from "@/types/product"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productSlug = params.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userZoneId] = useState("zone-sd-centro") // Mock user zone

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

  const handleBack = () => {
    router.back()
  }

  const handleAddToCart = () => {
    if (!product) return
    console.log("Added to cart:", product.id, "quantity:", quantity)
    // TODO: Implement cart functionality
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product?.availability.stockQuantity!) {
      setQuantity(newQuantity)
    }
  }

  const handleBuyNow = () => {
    if (!product) return
    console.log("Buy now:", product.id, "quantity:", quantity)
    // TODO: Implement direct checkout
  }

  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.shortDescription || product.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const formatPrice = (price: number) => {
    return `RD$${price.toLocaleString()}`
  }

  const calculateDiscount = () => {
    if (!product?.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  const getDeliveryInfo = () => {
    if (!product) return null
    
    const deliveryFee = calculateDeliveryFee(userZoneId, product.price * quantity)
    const zone = deliveryZones.find(z => z.id === userZoneId)
    const defaultOption = zone?.deliveryOptions.find(opt => opt.isDefault)
    
    return {
      fee: deliveryFee,
      time: defaultOption?.estimatedTime || "1-2 horas",
      freeThreshold: defaultOption?.freeDeliveryThreshold || 2500
    }
  }

  const relatedProducts = mockProducts
    .filter(p => p.id !== product?.id && p.category === product?.category && p.availability.inStock)
    .slice(0, 4)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="h-16 bg-gray-200"></div>
          {/* Images Skeleton */}
          <div className="aspect-square bg-gray-300"></div>
          {/* Content Skeleton */}
          <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">Producto no encontrado</h1>
          <p className="text-femfuel-medium mb-6">El producto "{productSlug}" no existe.</p>
          <Button onClick={() => router.push("/shop")} className="bg-femfuel-rose hover:bg-[#9f1853] text-white">
            Ir a la Tienda
          </Button>
        </div>
      </div>
    )
  }

  const deliveryInfo = getDeliveryInfo()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-lg font-semibold text-femfuel-dark truncate">
                {product.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Images */}
      <div className="relative">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.images[selectedImageIndex]?.url || "/placeholder.svg?height=400&width=400&query=beauty product"}
            alt={product.images[selectedImageIndex]?.alt || product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Image Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNewArrival && (
              <Badge className="bg-green-500 text-white">Nuevo</Badge>
            )}
            {product.isOnSale && (
              <Badge className="bg-red-500 text-white">-{calculateDiscount()}%</Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-purple-500 text-white">Destacado</Badge>
            )}
          </div>
        </div>

        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2 bg-white bg-opacity-80 rounded-full p-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImageIndex === index ? "bg-femfuel-rose" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div>
          <p className="text-sm text-femfuel-medium uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h1 className="text-xl font-bold text-femfuel-dark mb-2 leading-tight">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-femfuel-medium">({product.reviewCount} reseñas)</span>
            {product.isPopular && (
              <Badge variant="secondary" className="ml-auto">Popular</Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-femfuel-rose">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-femfuel-light line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.volume && (
              <span className="text-sm text-femfuel-medium ml-auto">
                {product.volume}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {product.availability.inStock ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700">En stock</span>
                {product.availability.stockQuantity <= product.availability.lowStockThreshold && (
                  <span className="text-sm text-orange-600">
                    (Solo quedan {product.availability.stockQuantity})
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-700">Agotado</span>
              </div>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-femfuel-dark">Cantidad:</span>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="px-3 py-2"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.availability.stockQuantity}
              className="px-3 py-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.availability.inStock}
            className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white py-3 text-base font-semibold"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Agregar al carrito • {formatPrice(product.price * quantity)}
          </Button>
          <Button
            onClick={handleBuyNow}
            disabled={!product.availability.inStock}
            variant="outline"
            className="w-full py-3 text-base font-semibold border-femfuel-rose text-femfuel-rose hover:bg-femfuel-purple"
          >
            Comprar ahora
          </Button>
        </div>

        {/* Delivery Info */}
        {deliveryInfo && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 mb-1">Entrega disponible</p>
                  <p className="text-sm text-green-700 mb-2">
                    Tiempo estimado: {deliveryInfo.time}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    {deliveryInfo.fee === 0 ? (
                      <Badge className="bg-green-500 text-white text-xs">
                        Envío gratis
                      </Badge>
                    ) : (
                      <>
                        <span className="text-green-700">Costo: {formatPrice(deliveryInfo.fee)}</span>
                        <span className="text-green-600">
                          • Gratis en compras +{formatPrice(deliveryInfo.freeThreshold)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guarantees */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
            <Shield className="h-4 w-4" />
            <span>Producto auténtico</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
            <RotateCcw className="h-4 w-4" />
            <span>Devoluciones fáciles</span>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="px-4 pb-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({product.reviewCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <div>
              <h3 className="font-semibold text-femfuel-dark mb-3">Descripción del producto</h3>
              <p className="text-femfuel-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h4 className="font-semibold text-femfuel-dark mb-2">Beneficios</h4>
                <ul className="space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="text-femfuel-medium flex items-start gap-2">
                      <span className="text-femfuel-rose">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.howToUse && product.howToUse.length > 0 && (
              <div>
                <h4 className="font-semibold text-femfuel-dark mb-2">Modo de uso</h4>
                <ol className="space-y-1">
                  {product.howToUse.map((step, index) => (
                    <li key={index} className="text-femfuel-medium flex items-start gap-2">
                      <span className="text-femfuel-rose font-semibold">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {product.suitableFor && product.suitableFor.length > 0 && (
              <div>
                <h4 className="font-semibold text-femfuel-dark mb-2">Adecuado para</h4>
                <div className="flex flex-wrap gap-2">
                  {product.suitableFor.map((type, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ingredients" className="space-y-4">
            {product.ingredients && product.ingredients.length > 0 ? (
              <div>
                <h3 className="font-semibold text-femfuel-dark mb-3">Lista de ingredientes</h3>
                <p className="text-femfuel-medium leading-relaxed">
                  {product.ingredients.join(", ")}
                </p>
              </div>
            ) : (
              <p className="text-femfuel-medium">Información de ingredientes no disponible.</p>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h4 className="font-semibold text-femfuel-dark mb-3">Especificaciones</h4>
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-femfuel-medium">{spec.name}</span>
                      <span className="font-medium text-femfuel-dark">
                        {spec.value}{spec.unit && ` ${spec.unit}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-femfuel-medium">Las reseñas estarán disponibles pronto</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-4 pb-8">
          <Separator className="mb-6" />
          <h3 className="text-lg font-semibold text-femfuel-dark mb-4">Productos relacionados</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={() => console.log("Add to cart:", relatedProduct.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="shop" />
    </div>
  )
}