"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Home,
  Sparkles,
  ShoppingBag,
  BookOpen,
  Calendar,
  Search,
  X,
  Heart,
  ChevronDown
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { LocationSelector } from "@/components/location-selector"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

interface NavigationContentProps {
  onServicesHover?: () => void
  onServicesLeave?: () => void
}

export function NavigationContent({
  onServicesHover,
  onServicesLeave
}: NavigationContentProps) {
  const { isAuthenticated } = useAuth()
  const { cart } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLocation, setCurrentLocation] = useState("Santo Domingo")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Calculate cart count safely
  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  // Auto-focus when search expands
  useEffect(() => {
    if (isSearchExpanded) {
      searchInputRef.current?.focus()
    }
  }, [isSearchExpanded])

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchExpanded(false)
      }
    }

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchExpanded])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchExpanded(true)
      }
      // Escape to close
      if (e.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false)
        setSearchQuery("")
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchExpanded])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsSearchExpanded(false)
      setSearchQuery("")
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    searchInputRef.current?.focus()
  }

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    {
      label: "Inicio",
      href: "/",
      icon: Home,
      exact: true
    },
    {
      label: "Servicios",
      href: "/services",
      icon: Sparkles,
      hasDropdown: true
    },
    {
      label: "Tienda",
      href: "/shop",
      icon: ShoppingBag,
      bold: true
    },
    {
      label: "Blog",
      href: "/blog",
      icon: BookOpen
    },
    {
      label: "Mis Citas",
      href: "/bookings",
      icon: Calendar
    }
  ]

  return (
    <div className="hidden lg:flex items-center justify-between gap-6 py-4">
      {/* Left Section: Logo + Location */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative w-12 h-12">
            <img
              src="/femfuel-logo.png"
              alt="FemFuel Beauty"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6"
            />
          </div>
          <span className="text-xl font-bold font-serif text-femfuel-dark transition-colors duration-300 group-hover:text-femfuel-rose">
            FemFuel Beauty
          </span>
        </Link>

        {/* Location Selector */}
        <LocationSelector
          currentLocation={currentLocation}
          onLocationChange={setCurrentLocation}
        />
      </div>

      {/* Middle Section: Navigation Links */}
      <nav className="flex items-center gap-1" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = isActivePath(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={item.hasDropdown ? onServicesHover : undefined}
              onMouseLeave={item.hasDropdown ? onServicesLeave : undefined}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-lg
                text-sm font-medium transition-all duration-300
                group
                ${item.bold ? 'font-bold' : ''}
                ${isActive
                  ? 'text-femfuel-rose bg-femfuel-rose/5'
                  : 'text-femfuel-medium hover:text-femfuel-dark hover:bg-femfuel-light/50'
                }
              `}
            >
              {/* Icon */}
              <Icon
                className={`
                  h-4 w-4 transition-all duration-300
                  ${isActive ? 'text-femfuel-rose scale-110' : 'group-hover:scale-110'}
                `}
              />

              {/* Label */}
              <span>{item.label}</span>

              {/* Dropdown indicator */}
              {item.hasDropdown && (
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              )}

              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-femfuel-rose rounded-full" />
              )}

              {/* Hover lift effect */}
              <span
                className={`
                  absolute inset-0 -z-10 rounded-lg transition-all duration-300
                  ${isActive
                    ? 'shadow-md'
                    : 'shadow-none group-hover:shadow-md group-hover:-translate-y-0.5'
                  }
                `}
              />
            </Link>
          )
        })}
      </nav>

      {/* Right Section: Search + Actions + User Menu */}
      <div className="flex items-center gap-2">
        {/* Search - Collapsed/Expanded */}
        <div
          ref={searchContainerRef}
          className={`
            flex items-center gap-2 rounded-lg transition-all duration-300
            ${isSearchExpanded
              ? 'w-80 px-4 py-2 bg-white/90 backdrop-blur-md border-2 border-femfuel-rose shadow-xl ring-2 ring-femfuel-rose/20'
              : 'w-10 h-10'
            }
          `}
        >
          {isSearchExpanded ? (
            <>
              {/* Expanded Search Bar */}
              <Search className="h-4 w-4 flex-shrink-0 text-femfuel-rose" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery)
                  }
                }}
                placeholder="Buscar servicios, salones..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-femfuel-dark placeholder:text-femfuel-medium/60 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="flex-shrink-0 p-1 hover:bg-femfuel-light rounded-full transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3 text-femfuel-medium" />
                </button>
              )}
            </>
          ) : (
            <>
              {/* Collapsed Search Icon */}
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-lg text-femfuel-medium hover:text-femfuel-rose hover:bg-femfuel-light/50 transition-all duration-300 group hover:shadow-md"
                aria-label="Open search"
              >
                <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200" />

        {/* Favorites Button */}
        <Link
          href="/favorites"
          className="relative flex items-center justify-center w-10 h-10 rounded-lg text-femfuel-medium hover:text-femfuel-rose hover:bg-femfuel-light/50 transition-all duration-300 group hover:shadow-md"
          aria-label="Favorites"
        >
          <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:fill-femfuel-rose" />
          {/* Badge - only shown if authenticated and has favorites */}
          {isAuthenticated && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-gradient-to-r from-femfuel-rose to-pink-600 rounded-full animate-in zoom-in duration-200 shadow-md">
              0
            </span>
          )}
        </Link>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-10 h-10 rounded-lg text-femfuel-medium hover:text-femfuel-rose hover:bg-femfuel-light/50 transition-all duration-300 group hover:shadow-md"
          aria-label="Shopping cart"
        >
          <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          {/* Badge - only shown if authenticated and has items */}
          {isAuthenticated && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-gradient-to-r from-femfuel-rose to-pink-600 rounded-full animate-in zoom-in duration-200 shadow-md">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200" />

        <UserMenu />
      </div>
    </div>
  )
}
