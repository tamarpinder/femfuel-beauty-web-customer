"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

interface IntegratedSearchProps {
  placeholder?: string
  className?: string
}

export function IntegratedSearch({
  placeholder = "Buscar servicios, salones...",
  className = ""
}: IntegratedSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-focus when component mounts (for overlay mode)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Escape to close suggestions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSuggestions(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  // Quick suggestions (these would come from API in real app)
  const quickSuggestions = query.length > 0 ? [
    { type: "service", name: "Uñas acrílicas", icon: "💅" },
    { type: "service", name: "Maquillaje de novia", icon: "💄" },
    { type: "service", name: "Corte de cabello", icon: "✂️" },
    { type: "salon", name: "Beauty Studio RD", icon: "🏪" },
  ].filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  ) : []

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div
        className={`
          relative flex items-center gap-2 px-4 py-2 rounded-lg
          bg-white/80 backdrop-blur-md border
          transition-all duration-300
          ${isFocused
            ? 'border-femfuel-rose shadow-lg ring-2 ring-femfuel-rose/10'
            : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        {/* Search Icon */}
        <Search
          className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${
            isFocused ? 'text-femfuel-rose' : 'text-femfuel-medium'
          }`}
        />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true)
            setShowSuggestions(true)
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query)
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-sm text-femfuel-dark placeholder:text-femfuel-medium/60 min-w-[200px]"
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-3 w-3 text-femfuel-medium" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (query.length > 0 || isFocused) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {quickSuggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-femfuel-medium uppercase tracking-wide">
                  Sugerencias
                </p>
              </div>
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion.name)
                    handleSearch(suggestion.name)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-femfuel-light/50 transition-colors duration-200 text-left group"
                >
                  <span className="text-lg">{suggestion.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-femfuel-dark group-hover:text-femfuel-rose transition-colors duration-200">
                      {suggestion.name}
                    </p>
                    <p className="text-xs text-femfuel-medium">
                      {suggestion.type === 'service' ? 'Servicio' : 'Salón'}
                    </p>
                  </div>
                  <Search className="h-4 w-4 text-femfuel-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-femfuel-medium">
                No se encontraron resultados para "{query}"
              </p>
            </div>
          ) : (
            <div className="px-4 py-6">
              <p className="text-xs font-semibold text-femfuel-medium uppercase tracking-wide mb-3">
                Búsquedas Populares
              </p>
              <div className="flex flex-wrap gap-2">
                {['Uñas', 'Maquillaje', 'Spa', 'Peinados'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term)
                      handleSearch(term)
                    }}
                    className="px-3 py-1.5 rounded-full bg-femfuel-light/50 hover:bg-femfuel-rose/10 border border-gray-200 hover:border-femfuel-rose/30 text-xs font-medium text-femfuel-dark hover:text-femfuel-rose transition-all duration-200"
                  >
                    {term}
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
