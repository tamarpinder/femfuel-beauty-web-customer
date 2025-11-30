/**
 * Performance Utilities
 * Tools for optimizing app performance
 */

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof window === "undefined") return

  const link = document.createElement("link")
  link.rel = "preload"
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

/**
 * Prefetch resources for future navigation
 */
export function prefetchResource(href: string) {
  if (typeof window === "undefined") return

  const link = document.createElement("link")
  link.rel = "prefetch"
  link.href = href
  document.head.appendChild(link)
}

/**
 * Defer non-critical script loading
 */
export function deferScript(src: string, onLoad?: () => void) {
  if (typeof window === "undefined") return

  const script = document.createElement("script")
  script.src = src
  script.defer = true
  if (onLoad) script.onload = onLoad
  document.body.appendChild(script)
}

/**
 * Measure performance of a function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const end = performance.now()

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)
  }

  return result
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Get device performance tier (low, medium, high)
 */
export function getDevicePerformanceTier(): "low" | "medium" | "high" {
  if (typeof navigator === "undefined") return "medium"

  // @ts-ignore - deviceMemory is not in TypeScript types yet
  const memory = navigator.deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4

  if (memory >= 8 && cores >= 8) return "high"
  if (memory >= 4 && cores >= 4) return "medium"
  return "low"
}
