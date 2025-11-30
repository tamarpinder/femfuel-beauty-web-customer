"use client"

import { useEffect, useState } from "react"
import { NavigationContent } from "@/components/navigation-content"
import { ServicesMegaMenu } from "@/components/services-mega-menu"

export function MegaMenuNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showServicesMega, setShowServicesMega] = useState(false)
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show shadow when scrolled past threshold
      setIsScrolled(currentScrollY > 10)

      // Hide on scroll down, show on scroll up (only after 100px)
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsHidden(true)
        } else {
          // Scrolling up
          setIsHidden(false)
        }
      } else {
        // Always show when near top
        setIsHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Handle opening mega menu
  const handleOpenMegaMenu = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setShowServicesMega(true)
  }

  // Handle closing mega menu with delay
  const handleCloseMegaMenu = () => {
    const timeout = setTimeout(() => {
      setShowServicesMega(false)
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

  return (
    <nav
      className={`
        hidden lg:block
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isHidden ? "-translate-y-full" : "translate-y-0"}
        ${isScrolled ? "shadow-lg" : "shadow-md"}
      `}
      aria-label="Main navigation"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />

      {/* Navigation Content */}
      <div className="relative max-w-[1440px] mx-auto px-6">
        <NavigationContent
          onServicesHover={handleOpenMegaMenu}
          onServicesLeave={handleCloseMegaMenu}
        />
      </div>

      {/* Bottom border for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200/50" />

      {/* Services Mega Menu */}
      {showServicesMega && (
        <div
          className="absolute top-full left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300"
          onMouseEnter={handleCancelClose}
          onMouseLeave={handleCloseMegaMenu}
        >
          <div className="max-w-[1440px] mx-auto px-6 py-8">
            <ServicesMegaMenu onClose={() => setShowServicesMega(false)} />
          </div>
        </div>
      )}
    </nav>
  )
}
