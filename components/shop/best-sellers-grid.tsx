"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, TrendingUp, Eye, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

interface BestSellersGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function BestSellersGrid({ products, onProductClick }: BestSellersGridProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    onProductClick(product)
  }

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    if (!product.availability.inStock) {
      toast.error("Producto agotado")
      return
    }

    setAddingToCart(product.id)
    await addToCart(product.id, 1)
    toast.success(`${product.name} agregado al carrito`)
    setAddingToCart(null)
  }

  const handleViewProduct = (product: Product) => {
    router.push(`/shop/product/${product.slug}`)
  }

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingUp className="h-6 w-6 text-femfuel-rose" />
          <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark font-serif">
            Los Más Vendidos del Mes
          </h2>
        </div>
        <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
          Los productos favoritos de nuestras clientas
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isAddingThis = addingToCart === product.id

          return (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-femfuel-rose/10 hover:border-femfuel-rose/30 active:scale-[0.98]"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500"
                />

                {/* Action Buttons - Show on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  {/* Quick View Button */}
                  <button
                    onClick={(e) => handleQuickView(e, product)}
                    className="bg-white hover:bg-femfuel-rose text-femfuel-dark hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 active:scale-95"
                    title="Vista Rápida"
                  >
                    <Eye className="h-5 w-5" />
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!product.availability.inStock || isAddingThis}
                    className="bg-white hover:bg-femfuel-rose text-femfuel-dark hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={product.availability.inStock ? "Agregar al Carrito" : "Agotado"}
                  >
                    <ShoppingCart className={`h-5 w-5 ${isAddingThis ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                {/* Best Seller Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-femfuel-rose to-pink-600 text-white border-0 font-bold shadow-lg">
                    Best Seller
                  </Badge>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-femfuel-dark border-0 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </Badge>
                </div>
              </div>

            {/* Content */}
            <div className="p-4">
              {/* Brand */}
              <p className="text-xs text-femfuel-medium mb-1">{product.brand}</p>

              {/* Product Name */}
              <h3 className="font-bold text-femfuel-dark mb-2 line-clamp-2 group-hover:text-femfuel-rose transition-colors">
                {product.name}
              </h3>

              {/* Reviews */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-femfuel-medium">
                  ({product.reviewCount} reseñas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-femfuel-rose">
                  RD${product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-sm text-femfuel-medium line-through">
                    RD${product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </section>
  )
}
