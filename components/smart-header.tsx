"use client"

import { usePathname } from "next/navigation"
import { DesktopHeader } from "@/components/desktop-header"
import { MobileHeader } from "@/components/mobile-header"
import { getHeaderConfig } from "@/lib/header-config"

export function SmartHeader() {
  const pathname = usePathname()
  const config = getHeaderConfig(pathname)

  return (
    <>
      <DesktopHeader
        showSearch={config.showSearch}
        searchType={config.searchType}
        variant={config.variant}
      />
      <MobileHeader />
    </>
  )
}