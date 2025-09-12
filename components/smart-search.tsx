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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-femfuel-medium" />
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-femfuel-medium hover:text-femfuel-dark"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto"
        >
          {/* Search History */}
          {!query.trim() && searchHistory.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-femfuel-medium uppercase tracking-wide">
                  Búsquedas Recientes
                </span>
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-femfuel-medium hover:text-femfuel-dark"
                >
                  Limpiar
                </button>
              </div>
              <div className="space-y-1">
                {searchHistory.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => handleHistoryClick(item)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2 ${
                      selectedIndex === index ? 'bg-femfuel-rose/10' : ''
                    }`}
                  >
                    <Clock className="h-3 w-3 text-femfuel-medium" />
                    {item}
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
                    className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
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
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <h4 className="font-medium text-femfuel-dark mb-1">
                No se encontraron servicios
              </h4>
              <p className="text-sm text-femfuel-medium">
                Intenta con otro término de búsqueda
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}