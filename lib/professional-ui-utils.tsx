import React from "react"
import { Star, Award, Calendar, Crown, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

/**
 * Renders rating stars with rating number and review count
 * @param rating - The professional's rating (0-5)
 * @param reviewCount - Number of reviews
 * @param variant - Display variant: "full" (5 stars), "single" (1 star), or "compact" (minimal)
 */
export function ProfessionalRating({
  rating,
  reviewCount,
  variant = "single"
}: {
  rating: number
  reviewCount: number
  variant?: "full" | "single" | "compact"
}) {
  if (variant === "full") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-femfuel-dark">{rating}</span>
        <span className="text-xs text-femfuel-medium">({reviewCount})</span>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-medium">{rating}</span>
      </div>
    )
  }

  // Default "single" variant
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="font-bold text-femfuel-dark">{rating}</span>
      <span className="text-sm text-femfuel-medium">
        ({reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"})
      </span>
    </div>
  )
}

/**
 * Formats and displays years of experience
 * @param years - Number of years of experience
 * @param showIcon - Whether to show the Award icon
 * @param className - Additional CSS classes
 */
export function ProfessionalExperience({
  years,
  showIcon = false,
  className = ""
}: {
  years: number
  showIcon?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <Award className="h-4 w-4" />}
      <span>{years} {years === 1 ? "año" : "años"} de experiencia</span>
    </div>
  )
}

/**
 * Displays professional's availability status
 * @param nextAvailable - Next available slot (e.g., "Hoy 3:00 PM", "Mañana")
 * @param availableToday - Boolean indicating if available today
 * @param showIcon - Whether to show the Calendar icon
 */
export function ProfessionalAvailability({
  nextAvailable,
  availableToday = false,
  showIcon = false
}: {
  nextAvailable?: string
  availableToday?: boolean
  showIcon?: boolean
}) {
  const displayText = availableToday
    ? "Disponible hoy"
    : nextAvailable
    ? `Próxima cita: ${nextAvailable}`
    : "Consultar"

  const textClass = availableToday
    ? "text-green-600 font-medium"
    : "text-femfuel-medium"

  return (
    <div className={`flex items-center gap-2 ${textClass}`}>
      {showIcon && <Calendar className="h-4 w-4" />}
      <span>{displayText}</span>
    </div>
  )
}

/**
 * Renders a badge for available today status
 */
export function AvailableTodayBadge() {
  return (
    <Badge className="bg-green-100 text-green-800 text-xs">
      Disponible hoy
    </Badge>
  )
}

/**
 * Displays professional's specialties as chips/badges
 * @param specialties - Array of specialty strings
 * @param maxShow - Maximum number of specialties to show
 * @param variant - Display variant: "badge" or "chip"
 */
export function ProfessionalSpecialties({
  specialties,
  maxShow = 3,
  variant = "chip"
}: {
  specialties: string[]
  maxShow?: number
  variant?: "badge" | "chip"
}) {
  const displaySpecialties = specialties.slice(0, maxShow)
  const remaining = specialties.length - maxShow

  if (variant === "badge") {
    return (
      <div className="flex flex-wrap gap-2">
        {displaySpecialties.map((specialty, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {specialty}
          </Badge>
        ))}
        {remaining > 0 && (
          <span className="text-xs text-femfuel-medium font-medium">
            +{remaining} más
          </span>
        )}
      </div>
    )
  }

  // Default "chip" variant
  return (
    <div className="flex flex-wrap gap-2">
      {displaySpecialties.map((specialty, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium"
        >
          {specialty}
        </span>
      ))}
      {remaining > 0 && (
        <span className="text-xs text-femfuel-medium font-medium">
          +{remaining} más
        </span>
      )}
    </div>
  )
}

/**
 * Renders top rated badge
 * @param variant - Display variant: "full" (with text) or "icon" (icon only)
 */
export function TopRatedBadge({ variant = "full" }: { variant?: "full" | "icon" }) {
  if (variant === "icon") {
    return (
      <div className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
        <Crown className="h-3 w-3" />
      </div>
    )
  }

  return (
    <div className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
      <Crown className="h-3 w-3" />
      Mejor Calificado
    </div>
  )
}

/**
 * Renders "En Ascenso" (Rising) badge for professionals with high ratings
 */
export function RisingBadge() {
  return (
    <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
      <Zap className="h-3 w-3" />
      En Ascenso
    </div>
  )
}

/**
 * Renders professional's profile image with fallback to initials
 * @param name - Professional's full name
 * @param image - Optional image URL
 * @param size - Size in pixels (default: 64)
 * @param className - Additional CSS classes
 * @param rounded - Border radius variant: "xl", "lg", "full"
 */
export function ProfessionalAvatar({
  name,
  image,
  size = 64,
  className = "",
  rounded = "xl"
}: {
  name: string
  image?: string
  size?: number
  className?: string
  rounded?: "xl" | "lg" | "full"
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const roundedClass =
    rounded === "full" ? "rounded-full" : rounded === "lg" ? "rounded-lg" : "rounded-xl"

  if (image) {
    return (
      <div
        className={`relative ${roundedClass} overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      </div>
    )
  }

  return (
    <div
      className={`bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center ${roundedClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-bold text-purple-600"
        style={{ fontSize: Math.floor(size / 3) }}
      >
        {initials}
      </span>
    </div>
  )
}

/**
 * Formats monthly bookings count
 * @param count - Number of monthly bookings
 */
export function formatMonthlyBookings(count: number): string {
  return `${count} ${count === 1 ? "servicio" : "servicios"}/mes`
}

/**
 * Generates a professional's profile slug from their name
 * @param name - Professional's full name
 */
export function generateProfessionalSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
}
