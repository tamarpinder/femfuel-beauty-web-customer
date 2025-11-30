import { useEffect, useState } from "react"

export interface UseParallaxOptions {
  speed?: number
  direction?: "up" | "down"
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, direction = "down" } = options
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxOffset = direction === "down" ? scrollY * speed : -scrollY * speed
      setOffset(parallaxOffset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction])

  return { offset, transform: `translateY(${offset}px)` }
}
