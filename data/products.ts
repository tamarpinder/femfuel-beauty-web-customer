import { Product, ProductCategory } from "@/types/product"
import { featuredProducts } from "./products/featured"
import { skincareCleanserProducts } from "./products/skincare-cleansers"
import { skincareSerumProducts } from "./products/skincare-serums"
import { skincareMoisturizerProducts } from "./products/skincare-moisturizers"
import { skincareEssentialProducts } from "./products/skincare-essentials"
import { skincareMaskOilProducts } from "./products/skincare-masks-oils"
import { skincareSpecialtyProducts } from "./products/skincare-specialty"
import { makeupProducts } from "./products/makeup"
import { haircareProducts } from "./products/haircare"
import { nailcareProducts } from "./products/nailcare"
import { toolsProducts } from "./products/tools"

export const mockProducts: Product[] = [
  ...featuredProducts,
  ...skincareCleanserProducts,
  ...skincareSerumProducts,
  ...skincareMoisturizerProducts,
  ...skincareEssentialProducts,
  ...skincareMaskOilProducts,
  ...skincareSpecialtyProducts,
  ...makeupProducts,
  ...haircareProducts,
  ...nailcareProducts,
  ...toolsProducts
]

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return mockProducts.filter(product => product.category === category)
}

export function getProductsByWarehouse(warehouseId: string): Product[] {
  return mockProducts.filter(product =>
    product.availability.warehouseId === warehouseId && product.availability.inStock
  )
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter(product => product.isFeatured && product.availability.inStock)
}

export function getPopularProducts(): Product[] {
  return mockProducts
    .filter(product => product.isPopular && product.availability.inStock)
    .sort((a, b) => b.rating - a.rating)
}

export function getNewArrivals(): Product[] {
  return mockProducts
    .filter(product => product.isNewArrival && product.availability.inStock)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getProductsOnSale(): Product[] {
  return mockProducts
    .filter(product => product.isOnSale && product.availability.inStock)
    .sort((a, b) => {
      const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0
      const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0
      return discountB - discountA
    })
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(product =>
    product.availability.inStock && (
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.subcategory.toLowerCase().includes(lowercaseQuery)
    )
  )
}