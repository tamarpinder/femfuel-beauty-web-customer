"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function MobileHeader() {
  const { itemCount } = useCart()

  return (
    <>
      {/* Mobile Header - Fixed at top */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-femfuel-rose/10 shadow-sm pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-4 py-2 h-14">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image
                src="/femfuel-logo.png"
                alt="FemFuel Beauty"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Favorites Icon */}
            <Link href="/profile#favorites">
              <Button
                variant="ghost"
                size="icon"
                className="min-w-[44px] min-h-[44px] hover:bg-femfuel-light/50"
                aria-label="Favoritos"
              >
                <Heart className="h-5 w-5 text-femfuel-dark" />
              </Button>
            </Link>

            {/* Cart Icon */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="min-w-[44px] min-h-[44px] hover:bg-femfuel-light/50 relative"
                aria-label={`Carrito (${itemCount} artículos)`}
              >
                <ShoppingBag className="h-5 w-5 text-femfuel-dark" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-femfuel-rose text-white text-xs font-bold rounded-full shadow-md"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer for Fixed Header */}
      <div className="lg:hidden h-[calc(3.5rem+env(safe-area-inset-top))]"></div>
    </>
  )
}
