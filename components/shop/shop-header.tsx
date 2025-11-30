"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, ShoppingCart, X, Heart, Sparkles, Palette, Droplet, Hand, Scissors, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"
import { useCart } from "@/contexts/cart-context"
import { ProductCategory } from "@/types/product"
import { mockProducts } from "@/data/products"
import { ShopCartDrawer } from "./shop-cart-drawer"

interface Category {
  id: ProductCategory
  name: string
  icon: React.ElementType
  imageUrl: string
  subcategories: string[]
}

const categories: Category[] = [
  {
    id: "skincare",
    name: "Cuidado Facial",
    icon: Droplet,
    imageUrl: "/categories/banners/skincare-banner.png",
    subcategories: ["Limpiadores", "Serums", "Hidratantes", "Mascarillas"]
  },
  {
    id: "makeup",
    name: "Maquillaje",
    icon: Palette,
    imageUrl: "/categories/banners/makeup-banner.png",
    subcategories: ["Base", "Labiales", "Ojos", "Mejillas"]
  },
  {
    id: "haircare",
    name: "Cuidado Capilar",
    icon: Sparkles,
    imageUrl: "/categories/banners/haircare-banner.png",
    subcategories: ["Shampoo", "Acondicionador", "Tratamientos", "Styling"]
  },
  {
    id: "hair-extensions",
    name: "Extensiones & Cabello",
    icon: Sparkles,
    imageUrl: "/categories/banners/hair-extensions-banner.png",
    subcategories: ["Extensiones con Cinta", "Extensiones con Clip", "Paquetes/Mallas", "Colas de Caballo"]
  },
  {
    id: "nailcare",
    name: "Cuidado de Uñas",
    icon: Hand,
    imageUrl: "/categories/banners/nailcare-banner.png",
    subcategories: ["Esmaltes", "Bases", "Tratamientos", "Herramientas"]
  },
  {
    id: "tools",
    name: "Herramientas & Accesorios",
    icon: Scissors,
    imageUrl: "/categories/banners/tools-banner.png",
    subcategories: ["Brochas", "Esponjas", "Aplicadores", "Organizadores"]
  }
]

export function ShopHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all")
  const [hoveredCategory, setHoveredCategory] = useState<ProductCategory | null>(null)
  const [productCounts, setProductCounts] = useState<Record<string, number>>({})
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Calculate product counts per category
  useEffect(() => {
    const counts: Record<string, number> = {}
    categories.forEach(category => {
      counts[category.id] = mockProducts.filter(
        product => product.category === category.id && product.availability.inStock
      ).length
    })
    setProductCounts(counts)
  }, [])

  // Detect current category from URL and set as active
  useEffect(() => {
    if (pathname === "/shop") {
      setSelectedCategory("all")
    } else if (pathname?.startsWith("/shop/")) {
      const category = pathname.split("/shop/")[1]?.split("?")[0] as ProductCategory
      if (categories.find(c => c.id === category)) {
        setSelectedCategory(category)
      }
    }
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  // Handle opening mega menu
  const handleOpenMegaMenu = (categoryId: ProductCategory) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setHoveredCategory(categoryId)
  }

  // Handle closing mega menu with delay
  const handleCloseMegaMenu = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null)
    }, 200) // 200ms delay before closing
    setCloseTimeout(timeout)
  }

  // Cancel close if mouse re-enters
  const handleCancelClose = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
  }

  const handleCategoryClick = (categoryId: ProductCategory | "all") => {
    setSelectedCategory(categoryId)
    router.push(categoryId === "all" ? "/shop" : `/shop/${categoryId}`)
    setHoveredCategory(null)
  }

  const handleSubcategoryClick = (categoryId: ProductCategory, subcategory: string) => {
    router.push(`/shop/${categoryId}?subcategory=${encodeURIComponent(subcategory)}`)
    setHoveredCategory(null)
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isSearchOpen])

  // Auto-hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show header at top of page
      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Unified Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-[9999] bg-white/98 backdrop-blur-md border-b border-femfuel-rose/10 shadow-lg transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Top Row: Logo, Search, Actions */}
        <div className="border-b border-femfuel-rose/5">
          <div className="max-w-7xl mx-auto px-3 md:px-6 h-[60px] flex items-center justify-between gap-2 md:gap-4">
            {/* Left: Logo & Home */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => router.push("/")}
                className="hidden md:flex items-center justify-center min-w-[44px] min-h-[44px] p-2 hover:bg-femfuel-light rounded-full transition-all duration-300"
                title="Volver al inicio"
              >
                <svg className="h-5 w-5 text-femfuel-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>

              <button
                onClick={() => router.push("/shop")}
                className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/femfuel-logo.png"
                  alt="FemFuel Beauty"
                  className="w-8 h-8"
                />
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold text-femfuel-dark font-serif">FemFuel Beauty</h1>
                </div>
              </button>
            </div>

            {/* Center: Search Icon / Compact Search */}
            <div className="flex-1 max-w-xl mx-2 md:mx-8">
              {!isSearchOpen ? (
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 min-h-[44px] h-11 border border-femfuel-rose/20 hover:border-femfuel-rose/40 hover:bg-femfuel-light/30 rounded-full transition-all duration-300"
                >
                  <Search className="h-4 w-4 text-femfuel-medium flex-shrink-0" />
                  <span className="text-xs md:text-sm text-femfuel-medium truncate">Buscar productos...</span>
                </Button>
              ) : (
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-femfuel-medium" />
                  <Input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="pl-10 md:pl-12 pr-10 min-h-[44px] h-11 border-2 border-femfuel-rose/30 focus:border-femfuel-rose rounded-full shadow-sm text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                    >
                      <X className="h-3.5 w-3.5 text-femfuel-medium" />
                    </button>
                  )}
                </form>
              )}
            </div>

            {/* Right: Favorites, Cart and User Menu */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Favorites Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/profile?tab=favorites")}
                className="relative hover:bg-femfuel-light rounded-full min-w-[44px] min-h-[44px] p-2.5 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                title="Mis Favoritos"
              >
                <Heart className="h-5 w-5 text-femfuel-dark" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:bg-femfuel-light rounded-full min-w-[44px] min-h-[44px] p-2.5 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                title="Mi Carrito"
              >
                <ShoppingCart className="h-5 w-5 text-femfuel-dark" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 text-white text-xs flex items-center justify-center px-1.5 shadow-md font-bold">
                    {itemCount > 99 ? '99+' : itemCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <div className="hidden md:block">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Navigation - Desktop Only */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 relative z-[60]">
          <div className="flex items-center gap-6 py-3 overflow-x-auto scrollbar-hide">
            {/* Category Pills */}
            {categories.map((category) => {
              const isActive = selectedCategory === category.id
              const isHovered = hoveredCategory === category.id

              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => handleOpenMegaMenu(category.id)}
                  onMouseLeave={handleCloseMegaMenu}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`px-4 py-2 min-h-[44px] rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 flex items-center ${
                      isActive
                        ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105"
                        : isHovered
                        ? "bg-gradient-to-r from-femfuel-rose/90 to-pink-500/90 text-white shadow-md scale-105"
                        : "text-femfuel-medium hover:bg-gradient-to-r hover:from-femfuel-rose/20 hover:to-pink-500/20 hover:text-femfuel-rose hover:shadow-sm hover:scale-105 hover:border hover:border-femfuel-rose/30"
                    }`}
                  >
                    {category.name}
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isHovered && (
                    <div
                      className="fixed left-1/2 -translate-x-1/2 w-[600px] bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-femfuel-rose/20 p-6 animate-in fade-in slide-in-from-top-2 duration-200"
                      style={{ top: '120px', zIndex: 99999 }}
                      onMouseEnter={handleCancelClose}
                      onMouseLeave={handleCloseMegaMenu}
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {/* Left: Category Image */}
                        <div className="col-span-1">
                          <div className="relative h-full rounded-xl overflow-hidden">
                            <img
                              src={category.imageUrl}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                              <p className="text-white/90 text-sm">{productCounts[category.id]} productos</p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Subcategories */}
                        <div className="col-span-2">
                          <h4 className="text-sm font-bold text-femfuel-dark mb-3 uppercase tracking-wide">
                            Explorar por Subcategoría
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {category.subcategories.map((subcategory, index) => (
                              <button
                                key={index}
                                onClick={() => handleSubcategoryClick(category.id, subcategory)}
                                className="text-left px-3 py-2 rounded-lg text-sm text-femfuel-medium font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-femfuel-rose/10 hover:to-pink-500/10 hover:text-femfuel-rose hover:border hover:border-femfuel-rose/20 hover:shadow-sm hover:scale-105"
                              >
                                {subcategory}
                              </button>
                            ))}
                          </div>

                          {/* View All Link */}
                          <button
                            onClick={() => handleCategoryClick(category.id)}
                            className="mt-4 w-full py-2 px-4 rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            Ver Todos los Productos →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => {
            setIsSearchOpen(false)
            setSearchQuery("")
          }}
        />
      )}

      {/* Spacer for fixed header */}
      <div className="h-[60px] lg:h-[116px]" />

      {/* Cart Drawer */}
      <ShopCartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
