import type { SearchType, HeaderVariant } from "@/components/desktop-header"

export interface HeaderConfig {
  showSearch: boolean
  searchType: SearchType
  variant: HeaderVariant
}

export const routeHeaderConfigs: Record<string, HeaderConfig> = {
  // Pages with service search
  '/': {
    showSearch: true,
    searchType: 'service',
    variant: 'full'
  },
  '/services': {
    showSearch: true,
    searchType: 'service',
    variant: 'full'
  },

  // Pages with no header
  '/shop': {
    showSearch: false,
    searchType: 'none',
    variant: 'none'
  },
  '/professionals': {
    showSearch: false, // Will use professional-specific filters instead
    searchType: 'none',
    variant: 'full'
  },
  '/vendors': {
    showSearch: false, // Will use vendor-specific filters instead
    searchType: 'none',
    variant: 'full'
  },
  '/blog': {
    showSearch: false, // Will use blog-specific search instead
    searchType: 'none',
    variant: 'full'
  },
  '/search': {
    showSearch: false, // Dedicated search page
    searchType: 'none',
    variant: 'minimal'
  },

  // Pages with minimal header (no search)
  '/profile': {
    showSearch: false,
    searchType: 'none',
    variant: 'minimal'
  },
  '/bookings': {
    showSearch: false,
    searchType: 'none',
    variant: 'minimal'
  },
  '/cart': {
    showSearch: false,
    searchType: 'none',
    variant: 'minimal'
  },
  '/checkout': {
    showSearch: false,
    searchType: 'none',
    variant: 'minimal'
  },

  // Default fallback for other pages
  'default': {
    showSearch: false,
    searchType: 'none',
    variant: 'full'
  }
}

export function getHeaderConfig(pathname: string): HeaderConfig {
  // Check for exact match first
  if (routeHeaderConfigs[pathname]) {
    return routeHeaderConfigs[pathname]
  }

  // Check for pattern matches (for dynamic routes)
  if (pathname.startsWith('/shop/')) {
    return routeHeaderConfigs['/shop']
  }
  if (pathname.startsWith('/vendor/')) {
    return routeHeaderConfigs['default']
  }
  if (pathname.startsWith('/service/')) {
    return routeHeaderConfigs['default']
  }
  if (pathname.startsWith('/chat/')) {
    return { showSearch: false, searchType: 'none', variant: 'minimal' }
  }
  if (pathname.startsWith('/blog/')) {
    return { showSearch: false, searchType: 'none', variant: 'minimal' }
  }
  if (pathname.startsWith('/professional/')) {
    return { showSearch: false, searchType: 'none', variant: 'minimal' }
  }

  // Return default configuration
  return routeHeaderConfigs['default']
}