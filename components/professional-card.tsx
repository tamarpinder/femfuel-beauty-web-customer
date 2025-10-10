"use client"

import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { ProfessionalWithVendor } from "@/lib/getAllProfessionals"
import {
  ProfessionalRating,
  ProfessionalAvatar,
  ProfessionalSpecialties,
  TopRatedBadge,
  RisingBadge,
  generateProfessionalSlug,
  formatMonthlyBookings
} from "@/lib/professional-ui-utils"

interface ProfessionalCardProps {
  professional: ProfessionalWithVendor
  layout?: "horizontal" | "vertical" | "list"
  showBadges?: boolean
  onContact?: (professional: ProfessionalWithVendor) => void
}

export function ProfessionalCard({
  professional,
  layout = "list",
  showBadges = true,
  onContact
}: ProfessionalCardProps) {
  const router = useRouter()

  const handleViewProfile = () => {
    const slug = generateProfessionalSlug(professional.name)
    router.push(`/professional/${slug}`)
  }

  const handleVendorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/vendor/${professional.vendor.slug}`)
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onContact) {
      onContact(professional)
    }
  }

  // List layout (current professionals page style)
  if (layout === "list") {
    return (
      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
        {/* Badges */}
        {showBadges && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {professional.isTopRated && <TopRatedBadge />}
            {professional.rating >= 4.8 && !professional.isTopRated && <RisingBadge />}
          </div>
        )}

        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <ProfessionalAvatar
              name={professional.name}
              image={professional.image}
              size={80}
              rounded="xl"
              className="flex-shrink-0"
            />

            <div className="flex-1">
              {/* Name and Location */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                  {professional.name}
                </h3>
                <button
                  onClick={handleVendorClick}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm underline transition-colors cursor-pointer text-left"
                >
                  {professional.vendor.name}
                </button>
                <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                  <MapPin className="h-4 w-4" />
                  <span>{professional.vendor.location.district}, {professional.vendor.location.city}</span>
                </div>
              </div>

              {/* Rating and Experience */}
              <div className="flex items-center gap-4 mb-3">
                <ProfessionalRating
                  rating={professional.rating}
                  reviewCount={professional.reviewCount}
                  variant="single"
                />
                <div className="text-sm text-femfuel-medium">
                  {professional.yearsExperience} años de experiencia
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <ProfessionalSpecialties
                  specialties={professional.specialties}
                  maxShow={3}
                  variant="chip"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm text-femfuel-medium mb-4">
                <div>
                  <span className="block font-medium text-femfuel-dark">Servicios mensuales</span>
                  <span>{professional.monthlyBookings}</span>
                </div>
                <div>
                  <span className="block font-medium text-femfuel-dark">Próxima cita</span>
                  <span>{professional.nextAvailable || 'Consultar'}</span>
                </div>
              </div>

              {/* Bio */}
              {professional.bio && (
                <div className="text-sm text-femfuel-medium mb-4">
                  <span className="font-medium text-femfuel-dark">Bio: </span>
                  <span className="text-black">
                    {professional.bio.length > 80 ? professional.bio.substring(0, 80) + '...' : professional.bio}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleViewProfile}
                  className="glassmorphism-button flex-1"
                >
                  Ver Perfil
                </button>
                <button
                  onClick={handleContactClick}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Horizontal layout (compact view)
  if (layout === "horizontal") {
    return (
      <Card className="shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewProfile}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <ProfessionalAvatar
              name={professional.name}
              image={professional.image}
              size={64}
              rounded="xl"
              className="border-2 border-gray-100 flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-femfuel-dark text-sm sm:text-base truncate">
                    {professional.name}
                  </h3>
                  <div className="mt-1">
                    <ProfessionalRating
                      rating={professional.rating}
                      reviewCount={professional.reviewCount}
                      variant="compact"
                    />
                  </div>
                </div>
                {showBadges && professional.isTopRated && (
                  <div className="ml-2">
                    <TopRatedBadge variant="icon" />
                  </div>
                )}
              </div>

              {/* Specialties */}
              <div className="mb-2">
                <p className="text-xs text-femfuel-medium truncate">
                  {professional.specialties.slice(0, 2).join(" • ")}
                  {professional.specialties.length > 2 && ` +${professional.specialties.length - 2} más`}
                </p>
              </div>

              {/* Location and Experience */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-femfuel-medium flex-shrink-0" />
                  <span className="text-xs text-femfuel-medium truncate">
                    {professional.vendor.location.district}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-4 sm:ml-0">
                  <span className="text-xs text-femfuel-medium">
                    {professional.yearsExperience} años exp.
                  </span>
                </div>
              </div>

              {/* Next Available */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-femfuel-medium">
                  Próxima: {professional.nextAvailable || 'Consultar'}
                </span>
                <div className="text-xs font-medium text-purple-600">
                  {professional.monthlyBookings} servicios/mes
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Vertical layout for grid view
  return (
    <Card className="overflow-hidden shadow-sm border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={handleViewProfile}>
      <CardContent className="p-0">
        {/* Cover/Header */}
        <div className="relative bg-gradient-to-br from-purple-100 to-rose-100 h-32">
          {showBadges && professional.isTopRated && (
            <div className="absolute top-3 right-3">
              <TopRatedBadge variant="icon" />
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Profile Info */}
          <div className="flex items-start gap-3 mb-3 -mt-8">
            <ProfessionalAvatar
              name={professional.name}
              image={professional.image}
              size={64}
              rounded="lg"
              className="border-4 border-white shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0 pt-8">
              <h3 className="font-semibold text-femfuel-dark mb-1 truncate">{professional.name}</h3>
              <div className="mb-1">
                <ProfessionalRating
                  rating={professional.rating}
                  reviewCount={professional.reviewCount}
                  variant="compact"
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-3">
            <p className="text-sm text-femfuel-medium">
              {professional.specialties.slice(0, 3).join(" • ")}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-femfuel-medium mb-3">
            <MapPin className="h-4 w-4" />
            <span className="truncate">
              {professional.vendor.location.district}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-femfuel-medium">
              {professional.yearsExperience} años
            </span>
            <div className="text-xs font-medium text-purple-600">
              {professional.monthlyBookings}/mes
            </div>
          </div>

          {/* Action Button */}
          <button
            className="w-full px-4 py-2 bg-femfuel-rose hover:bg-femfuel-rose-hover text-white font-medium rounded-lg transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation()
              handleViewProfile()
            }}
          >
            Ver Perfil
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
