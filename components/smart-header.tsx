"use client"

import { usePathname } from "next/navigation"
import { MegaMenuNavigation } from "@/components/mega-menu-navigation"
import { MobileHeader } from "@/components/mobile-header"
import { getHeaderConfig } from "@/lib/header-config"

export function SmartHeader() {
  const pathname = usePathname()
  const config = getHeaderConfig(pathname)

  // Don't render if variant is 'none' (e.g., on shop page with custom header)
  if (config.variant === 'none') {
    return null
  }

  return (
    <>
      {/* Desktop Navigation */}
      <MegaMenuNavigation />

      {/* Mobile Header - Simple logo + icons */}
      <MobileHeader />
    </>
  )
}