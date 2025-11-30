import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: "sm" | "md" | "lg"
  shadowIntensity?: "light" | "medium" | "strong"
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl"
}

const liftMap = {
  sm: "hover:-translate-y-1",
  md: "hover:-translate-y-2",
  lg: "hover:-translate-y-3"
}

const shadowMap = {
  light: "shadow-md hover:shadow-xl",
  medium: "shadow-lg hover:shadow-2xl",
  strong: "shadow-xl hover:shadow-2xl"
}

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl"
}

const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  ({
    className,
    hoverLift = "md",
    shadowIntensity = "medium",
    rounded = "2xl",
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-gray-100",
          roundedMap[rounded],
          shadowMap[shadowIntensity],
          liftMap[hoverLift],
          "transition-all duration-300 ease-out",
          "hover:border-femfuel-rose/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FloatingCard.displayName = "FloatingCard"

export { FloatingCard }
