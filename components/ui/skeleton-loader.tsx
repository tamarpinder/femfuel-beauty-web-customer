import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card" | "product"
  width?: string | number
  height?: string | number
  lines?: number
  animate?: boolean
}

export function SkeletonLoader({
  variant = "rectangular",
  width,
  height,
  lines = 1,
  animate = true,
  className,
  ...props
}: SkeletonLoaderProps) {
  const baseClasses = cn(
    "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
    animate && "animate-pulse",
    "bg-[length:200%_100%]"
  )

  if (variant === "text") {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, "h-4 rounded", className)}
            style={{ width: i === lines - 1 ? "80%" : "100%" }}
            {...props}
          />
        ))}
      </div>
    )
  }

  if (variant === "circular") {
    return (
      <div
        className={cn(baseClasses, "rounded-full", className)}
        style={{ width: width || 40, height: height || 40 }}
        {...props}
      />
    )
  }

  if (variant === "card") {
    return (
      <div className={cn("space-y-4 p-4 rounded-2xl border border-gray-100", className)} {...props}>
        <div className={cn(baseClasses, "h-48 rounded-xl")} />
        <div className="space-y-2">
          <div className={cn(baseClasses, "h-4 rounded w-3/4")} />
          <div className={cn(baseClasses, "h-4 rounded w-1/2")} />
        </div>
      </div>
    )
  }

  if (variant === "product") {
    return (
      <div className={cn("space-y-3", className)} {...props}>
        <div className={cn(baseClasses, "aspect-square rounded-xl")} />
        <div className="space-y-2">
          <div className={cn(baseClasses, "h-3 rounded w-2/3")} />
          <div className={cn(baseClasses, "h-4 rounded w-1/3")} />
          <div className={cn(baseClasses, "h-6 rounded-full w-24")} />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(baseClasses, "rounded", className)}
      style={{ width, height }}
      {...props}
    />
  )
}
