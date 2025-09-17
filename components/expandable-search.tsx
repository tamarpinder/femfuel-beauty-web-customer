"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchProducts } from "@/data/products"
import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

interface ExpandableSearchProps {
  onSearch?: (query: string) => void
}

export function ExpandableSearch({ onSearch }: ExpandableSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const results = searchProducts(searchQuery).slice(0, 5)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch?.(searchQuery)
      setIsExpanded(false)
      setShowSuggestions(false)
      setSearchQuery("")
    }
  }

  const handleSuggestionClick = (product: Product) => {
    router.push(`/shop/product/${product.slug}`)
    setIsExpanded(false)
    setShowSuggestions(false)
    setSearchQuery("")
  }

  const handleClose = () => {
    setIsExpanded(false)
    setShowSuggestions(false)
    setSearchQuery("")
  }

  return (
    <div className="relative">
      {!isExpanded ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="p-2"
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <div className="relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <div className="relative w-full max-w-xs md:max-w-md">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-8 glassmorphism-input"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </form>

          {/* Glassmorphism Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full max-w-xs md:max-w-md mt-2 glassmorphism-dropdown z-50 border border-white/20 rounded-lg shadow-xl">
              <div className="p-2 space-y-1">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full text-left p-3 rounded-md hover:bg-white/20 transition-colors duration-200 flex items-center gap-3"
                  >
                    <img
                      src={product.images.find(img => img.isPrimary)?.url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-femfuel-dark truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-femfuel-medium truncate">
                        {product.brand}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-femfuel-rose">
                      RD${product.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}