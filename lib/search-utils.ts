// Smart search utilities for fuzzy matching and enhanced search functionality

// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null))

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      )
    }
  }

  return matrix[b.length][a.length]
}

// Normalize text for search (handle Spanish characters)
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/ñ/g, 'n')
    .trim()
}

// Search suggestion interface
export interface SearchSuggestion {
  id: string
  name: string
  category: string
  description: string
  matchType: 'exact' | 'starts_with' | 'contains' | 'fuzzy'
  score: number
  matchedText: string
}

// Enhanced search function with fuzzy matching
export function smartSearch(
  query: string,
  items: any[],
  options: {
    searchFields?: string[]
    fuzzyThreshold?: number
    maxSuggestions?: number
  } = {}
): SearchSuggestion[] {
  const {
    searchFields = ['name', 'description', 'category'],
    fuzzyThreshold = 2,
    maxSuggestions = 8
  } = options

  if (!query.trim()) return []

  const normalizedQuery = normalizeText(query)
  const suggestions: SearchSuggestion[] = []

  items.forEach(item => {
    let bestMatch: SearchSuggestion | null = null
    let bestScore = 0

    searchFields.forEach(field => {
      const fieldValue = item[field] || ''
      const normalizedField = normalizeText(fieldValue)
      
      // Check synonyms if available
      const searchTexts = [normalizedField]
      if (item.searchSynonyms) {
        searchTexts.push(...item.searchSynonyms.map((s: string) => normalizeText(s)))
      }

      searchTexts.forEach(text => {
        let matchType: SearchSuggestion['matchType'] = 'fuzzy'
        let score = 0

        // Exact match
        if (text === normalizedQuery) {
          matchType = 'exact'
          score = 100
        }
        // Starts with
        else if (text.startsWith(normalizedQuery)) {
          matchType = 'starts_with'
          score = 80 - (text.length - normalizedQuery.length) * 2
        }
        // Contains
        else if (text.includes(normalizedQuery)) {
          matchType = 'contains'
          score = 60 - (text.indexOf(normalizedQuery) * 2)
        }
        // Fuzzy match
        else {
          const distance = levenshteinDistance(normalizedQuery, text)
          if (distance <= fuzzyThreshold) {
            matchType = 'fuzzy'
            score = Math.max(0, 40 - distance * 10)
          }
        }

        // Boost score for shorter matches (more relevant)
        if (score > 0 && text.length < normalizedQuery.length * 3) {
          score += 10
        }

        // Keep best match for this item
        if (score > bestScore) {
          bestScore = score
          bestMatch = {
            id: item.id,
            name: item.name,
            category: item.category,
            description: item.description,
            matchType,
            score,
            matchedText: fieldValue
          }
        }
      })
    })

    if (bestMatch && bestScore > 0) {
      suggestions.push(bestMatch)
    }
  })

  // Sort by score (descending) and limit results
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSuggestions)
}

// Get popular services for empty search state
export function getPopularSuggestions(items: any[], limit: number = 6): SearchSuggestion[] {
  return items
    .filter(item => item.isPopular)
    .slice(0, limit)
    .map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      matchType: 'exact' as const,
      score: 100,
      matchedText: item.name
    }))
}

// Search history management
const SEARCH_HISTORY_KEY = 'femfuel-search-history'
const MAX_HISTORY_ITEMS = 5

export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

export function addToSearchHistory(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return
  
  try {
    const history = getSearchHistory()
    const trimmedQuery = query.trim()
    
    // Remove if already exists
    const filtered = history.filter(item => item !== trimmedQuery)
    
    // Add to beginning
    const newHistory = [trimmedQuery, ...filtered].slice(0, MAX_HISTORY_ITEMS)
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  } catch {
    // Ignore localStorage errors
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  } catch {
    // Ignore localStorage errors
  }
}