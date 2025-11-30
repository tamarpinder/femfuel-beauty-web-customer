import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gradient-to-r from-gray-100 via-femfuel-light/20 to-gray-100 animate-pulse rounded-lg", className)}
      {...props}
    />
  )
}

export { Skeleton }
