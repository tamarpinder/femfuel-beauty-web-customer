"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, Clock, Sparkles, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  smartSearch, 
  getPopularSuggestions, 
  getSearchHistory, 
  addToSearchHistory, 
  clearSearchHistory,
  type SearchSuggestion 
} from "@/lib/search-utils"

interface SmartSearchProps {
  placeholder?: string
  items: any[]
  onSearch: (query: string, suggestions: SearchSuggestion[]) => void
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
  className?: string
}

export function SmartSearch({ 
  placeholder = "Buscar servicios...", 
  items, 
  onSearch,
  onSuggestionSelect,
  className = ""
}: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = smartSearch(searchQuery, items)
        setSuggestions(results)
        onSearch(searchQuery, results)
      } else {
        // Show popular suggestions when empty
        const popular = getPopularSuggestions(items, 6)
        setSuggestions(popular)
        onSearch("", [])
      }
    }, 10)  // 10ms for smooth search
  }, [items, onSearch])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)
    setShowSuggestions(true)
    debouncedSearch(value)
  }

  // Handle input focus
  const handleFocus = () => {
    setShowSuggestions(true)
    if (!query.trim()) {
      // Show popular suggestions or search history
      const popular = getPopularSuggestions(items, 6)
      setSuggestions(popular)
    }
  }

  // Handle input blur with delay to allow suggestion clicks
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name)
    setShowSuggestions(false)
    addToSearchHistory(suggestion.name)
    setSearchHistory(getSearchHistory())
    onSuggestionSelect?.(suggestion)
    inputRef.current?.blur()
  }

  // Handle history click
  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem)
    setShowSuggestions(false)
    debouncedSearch(historyItem)
    inputRef.current?.focus()
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    const totalSuggestions = suggestions.length + (searchHistory.length > 0 ? searchHistory.length : 0)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % totalSuggestions)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev <= 0 ? totalSuggestions - 1 : prev - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          if (selectedIndex < searchHistory.length) {
            handleHistoryClick(searchHistory[selectedIndex])
          } else {
            const suggestion = suggestions[selectedIndex - searchHistory.length]
            if (suggestion) {
              handleSuggestionClick(suggestion)
            }
          }
        } else if (query.trim()) {
          addToSearchHistory(query.trim())
          setSearchHistory(getSearchHistory())
          setShowSuggestions(false)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        inputRef.current?.blur()
        break
    }
  }

  // Clear search
  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    onSearch("", [])
    inputRef.current?.focus()
  }

  // Clear search history
  const handleClearHistory = () => {
    clearSearchHistory()
    setSearchHistory([])
  }

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, matchType: string) => {
    if (matchType === 'exact' || !query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-femfuel-rose/20 text-femfuel-rose font-medium">
          {part}
        </span>
      ) : part
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-femfuel-medium" />
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-12 pr-12 min-h-[48px] h-14 rounded-2xl border-2 border-femfuel-rose/20 bg-white/90 backdrop-blur-sm shadow-md focus:border-femfuel-rose focus:ring-femfuel-rose focus:shadow-lg transition-all duration-300 font-medium text-sm md:text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-femfuel-light hover:bg-femfuel-rose/20 active:bg-femfuel-rose/20 flex items-center justify-center text-femfuel-medium hover:text-femfuel-rose transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-femfuel-rose/10 shadow-2xl max-h-96 overflow-y-auto pb-[env(safe-area-inset-bottom)]"
        >
          {/* Search History */}
          {!query.trim() && searchHistory.length > 0 && (
            <div className="p-4 border-b-2 border-femfuel-rose/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-femfuel-dark uppercase tracking-wide">
                  Búsquedas Recientes
                </span>
                <button
                  onClick={handleClearHistory}
                  aria-label="Limpiar historial de búsqueda"
                  className="min-h-[44px] px-3 text-xs font-semibold text-femfuel-medium hover:text-femfuel-rose active:text-femfuel-rose transition-colors duration-300"
                >
                  Limpiar
                </button>
              </div>
              <div className="space-y-2">
                {searchHistory.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => handleHistoryClick(item)}
                    className={`w-full text-left px-3 py-3 min-h-[44px] rounded-xl text-sm font-medium hover:bg-femfuel-light/50 active:bg-femfuel-light/50 hover:shadow-sm flex items-center gap-3 transition-all duration-300 ${
                      selectedIndex === index ? 'bg-femfuel-rose/10 shadow-sm' : ''
                    }`}
                  >
                    <Clock className="h-4 w-4 text-femfuel-medium flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-1">
              {!query.trim() && (
                <div className="px-3 py-2">
                  <span className="text-xs font-medium text-femfuel-medium uppercase tracking-wide">
                    Servicios Populares
                  </span>
                </div>
              )}
              {suggestions.map((suggestion, index) => {
                const adjustedIndex = searchHistory.length + index
                return (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left p-3 min-h-[56px] rounded-lg hover:bg-gray-50 active:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
                      selectedIndex === adjustedIndex ? 'bg-femfuel-rose/10' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-femfuel-dark truncate">
                            {highlightMatch(suggestion.name, suggestion.matchType)}
                          </h4>
                          {suggestion.matchType === 'exact' && items.find(i => i.id === suggestion.id)?.isPopular && (
                            <Badge variant="secondary" className="bg-femfuel-rose text-white px-1 py-0 text-xs">
                              <Sparkles className="h-2 w-2 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-femfuel-medium truncate">
                          {highlightMatch(suggestion.description, suggestion.matchType)}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                        {suggestion.category}
                      </Badge>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* No Results */}
          {query.trim() && suggestions.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-femfuel-light to-pink-50 rounded-full flex items-center justify-center shadow-lg">
                <Search className="h-6 w-6 text-femfuel-rose" />
              </div>
              <h4 className="font-bold text-femfuel-dark mb-2 text-lg">
                No se encontraron servicios
              </h4>
              <p className="text-sm text-femfuel-medium font-medium">
                Intenta con otro término de búsqueda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}