"use client"

import { useRouter } from "next/navigation"
import { Star, MapPin, Clock, Users, Heart, Crown, Zap, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { Vendor } from "@/types/vendor"
import Image from "next/image"

interface VendorCardProps {
  vendor: Vendor
  layout?: "horizontal" | "vertical" | "list" | "nearby"
  showFavorites?: boolean
  showBadges?: boolean
  showDistance?: boolean
  showOpenStatus?: boolean
  isFavorite?: boolean
  onToggleFavorite?: (vendorId: string) => void
}

export function VendorCard({
  vendor,
  layout = "horizontal",
  showFavorites = false,
  showBadges = false,
  showDistance = false,
  showOpenStatus = false,
  isFavorite = false,
  onToggleFavorite
}: VendorCardProps) {
  const router = useRouter()

  const handleViewVendor = () => {
    router.push(`/vendor/${vendor.slug}`)
  }

  const formatPriceRange = () => {
    return `RD$${vendor.priceRange.min.toLocaleString()} - RD$${vendor.priceRange.max.toLocaleString()}`
  }

  // List/Nearby mode (used in vendors and nearby pages)
  if (layout === "list" || layout === "nearby") {
    return (
      <Card
        className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
        onClick={handleViewVendor}
      >
        {/* Badges */}
        {showBadges && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {vendor.rating >= 4.5 && (
              <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Crown className="h-3 w-3" />
                Mejor Calificado
              </div>
            )}
            {vendor.reviewCount < 50 && (
              <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Nuevo
              </div>
            )}
          </div>
        )}

        {/* Favorite Button */}
        {showFavorites && onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(vendor.id)
            }}
            className="absolute top-4 left-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite
                  ? "fill-femfuel-rose text-femfuel-rose"
                  : "text-gray-600"
              }`}
            />
          </button>
        )}

        {/* Open/Closed Status (for nearby mode) */}
        {showOpenStatus && (
          <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium z-10 ${
            vendor.availability.isOpen
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {vendor.availability.isOpen ? 'Abierto' : 'Cerrado'}
          </div>
        )}

        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0">
              {vendor.logo ? (
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center">
                  <Store className="h-8 w-8 text-purple-600" />
                </div>
              )}
            </div>

            <div className="flex-1">
              {/* Name and Location */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                  {vendor.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location.district}, {vendor.location.city}</span>
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-femfuel-dark">{vendor.rating}</span>
                  <span className="text-sm text-femfuel-medium">({vendor.reviewCount} reseñas)</span>
                </div>
                {showDistance && vendor.location.distance && (
                  <div className="text-sm text-femfuel-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {vendor.location.distance}
                  </div>
                )}
                {!showDistance && (
                  <div className="text-sm text-femfuel-medium">
                    {vendor.serviceCount} servicios
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {vendor.categories?.slice(0, 3).map((category, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                  >
                    {category}
                  </span>
                ))}
                {vendor.categories && vendor.categories.length > 3 && (
                  <span className="text-xs text-femfuel-medium">
                    +{vendor.categories.length - 3} más
                  </span>
                )}
              </div>

              {/* Business Hours / Phone */}
              {layout === "nearby" ? (
                <div className="flex items-center gap-4 text-sm text-femfuel-medium mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {vendor.businessHours?.monday?.open || "9:00"} - {vendor.businessHours?.monday?.close || "18:00"}
                    </span>
                  </div>
                  {vendor.contact.phone && (
                    <span>{vendor.contact.phone}</span>
                  )}
                </div>
              ) : (
                vendor.businessHours && (
                  <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-4">
                    <Clock className="h-4 w-4" />
                    <span>
                      {vendor.businessHours.monday?.open || "9:00"} - {vendor.businessHours.monday?.close || "18:00"}
                    </span>
                  </div>
                )
              )}

              {/* Description */}
              <p className="text-sm text-femfuel-medium mb-4 line-clamp-2">
                {vendor.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="glassmorphism-button flex-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewVendor()
                  }}
                >
                  {layout === "nearby" ? "Ver Servicios" : "Ver Salón"}
                </button>
                <button
                  className="femfuel-button-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: Implement contact
                  }}
                >
                  {layout === "nearby" ? "Reservar Ahora" : "Contactar"}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Horizontal mode (original compact view)
  if (layout === "horizontal") {
    return (
      <Card className="shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewVendor}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Vendor Logo */}
            <div className="relative flex-shrink-0">
              <OptimizedImage
                src={vendor.logo || "/placeholder.svg?height=64&width=64&query=business logo"}
                alt={`${vendor.name} logo`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl border-2 border-gray-100"
                context="vendor"
              />
              {vendor.availability.isOpen && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-femfuel-dark text-sm sm:text-base truncate">{vendor.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-femfuel-medium">{vendor.rating}</span>
                      <span className="text-xs text-femfuel-light">({vendor.reviewCount})</span>
                    </div>
                    {vendor.professionalCount > 1 && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-femfuel-medium" />
                        <span className="text-xs text-femfuel-medium">{vendor.professionalCount}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 ml-2">
                  {vendor.badges && vendor.badges.length > 0 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {vendor.badges[0]}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Popular Services */}
              <div className="mb-2">
                <p className="text-xs text-femfuel-medium truncate">
                  {vendor.popularServices.slice(0, 2).join(" • ")}
                  {vendor.popularServices.length > 2 && ` +${vendor.popularServices.length - 2} más`}
                </p>
              </div>

              {/* Location and Service Count */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-femfuel-medium flex-shrink-0" />
                  <span className="text-xs text-femfuel-medium truncate">
                    {vendor.location.distance} • {vendor.location.district}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-4 sm:ml-0">
                  <span className="text-xs text-femfuel-medium">
                    {vendor.serviceCount} servicios
                  </span>
                </div>
              </div>

              {/* Availability and Price Range */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-femfuel-medium" />
                  <span className="text-xs text-femfuel-medium">
                    {vendor.availability.todayAvailable ? vendor.availability.nextSlot : "Cerrado hoy"}
                  </span>
                </div>
                <div className="text-xs font-medium text-black">
                  {formatPriceRange()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Vertical layout for desktop grid view
  return (
    <Card className="overflow-hidden shadow-sm border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={handleViewVendor}>
      <CardContent className="p-0">
        {/* Cover Image */}
        <div className="relative">
          <OptimizedImage
            src={vendor.coverImage || "/placeholder.svg?height=192&width=320&query=beauty salon"}
            alt={`${vendor.name} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-48"
            context="vendor"
          />
          {vendor.availability.isOpen && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Abierto
            </div>
          )}
          {vendor.badges && vendor.badges.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="text-xs">
                {vendor.badges[0]}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Vendor Info */}
          <div className="flex items-start gap-3 mb-3">
            <OptimizedImage
              src={vendor.logo || "/placeholder.svg?height=40&width=40&query=business logo"}
              alt={`${vendor.name} logo`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg border border-gray-200 flex-shrink-0"
              context="vendor"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-femfuel-dark mb-1 truncate">{vendor.name}</h3>
              <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{vendor.rating}</span>
                  <span>({vendor.reviewCount})</span>
                </div>
                {vendor.professionalCount > 1 && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{vendor.professionalCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className="mb-3">
            <p className="text-sm text-femfuel-medium">
              {vendor.popularServices.slice(0, 3).join(" • ")}
            </p>
          </div>

          {/* Location and Details */}
          <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-3">
            <MapPin className="h-4 w-4" />
            <span className="truncate">
              {vendor.location.distance} • {vendor.location.district}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-femfuel-medium" />
              <span className="text-xs text-femfuel-medium">
                {vendor.availability.todayAvailable ? vendor.availability.nextSlot : "Cerrado"}
              </span>
            </div>
            <div className="text-sm font-bold text-black">
              {formatPriceRange()}
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full mt-4 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white"
            onClick={(e) => {
              e.stopPropagation()
              handleViewVendor()
            }}
          >
            Ver Servicios
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
