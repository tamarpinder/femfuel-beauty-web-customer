import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react"

export interface AnimatedFeedbackProps {
  type: "success" | "error" | "warning" | "info"
  title?: string
  message?: string
  onClose?: () => void
  className?: string
}

const config = {
  success: {
    icon: CheckCircle2,
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
    iconColor: "text-green-500",
    animation: "animate-in zoom-in fade-in"
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    iconColor: "text-red-500",
    animation: "animate-in shake fade-in"
  },
  warning: {
    icon: AlertCircle,
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-900",
    iconColor: "text-orange-500",
    animation: "animate-in slide-in-from-top fade-in"
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    iconColor: "text-blue-500",
    animation: "animate-in slide-in-from-bottom fade-in"
  }
}

export function AnimatedFeedback({
  type,
  title,
  message,
  onClose,
  className
}: AnimatedFeedbackProps) {
  const { icon: Icon, bg, border, text, iconColor, animation } = config[type]

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border-2",
        bg,
        border,
        animation,
        "duration-300",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColor)} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={cn("font-semibold text-sm mb-1", text)}>
            {title}
          </h4>
        )}
        {message && (
          <p className={cn("text-sm", text)}>
            {message}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "flex-shrink-0 rounded-lg p-1 transition-colors",
            "hover:bg-black/5",
            text
          )}
          aria-label="Cerrar"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

// Confetti animation for success
export function SuccessConfetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-femfuel-rose rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random()}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  )
}
