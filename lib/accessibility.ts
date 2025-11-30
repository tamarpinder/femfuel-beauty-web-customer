/**
 * Accessibility Utilities
 * WCAG AA compliance helpers for keyboard navigation, ARIA, and focus management
 */

/**
 * Keyboard Navigation Constants
 */
export const KeyCodes = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End"
} as const

/**
 * Handle keyboard navigation for interactive elements
 */
export function handleKeyboardClick(
  event: React.KeyboardEvent,
  callback: () => void
) {
  if (event.key === KeyCodes.ENTER || event.key === KeyCodes.SPACE) {
    event.preventDefault()
    callback()
  }
}

/**
 * Trap focus within a modal or dialog
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== KeyCodes.TAB) return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  element.addEventListener("keydown", handleKeyDown)

  return () => {
    element.removeEventListener("keydown", handleKeyDown)
  }
}

/**
 * Manage focus restoration
 */
export class FocusManager {
  private previousElement: HTMLElement | null = null

  save() {
    this.previousElement = document.activeElement as HTMLElement
  }

  restore() {
    if (this.previousElement) {
      this.previousElement.focus()
      this.previousElement = null
    }
  }
}

/**
 * Arrow key navigation for lists and menus
 */
export function handleArrowNavigation(
  event: React.KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void
) {
  let newIndex = currentIndex

  switch (event.key) {
    case KeyCodes.ARROW_DOWN:
    case KeyCodes.ARROW_RIGHT:
      event.preventDefault()
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      break

    case KeyCodes.ARROW_UP:
    case KeyCodes.ARROW_LEFT:
      event.preventDefault()
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      break

    case KeyCodes.HOME:
      event.preventDefault()
      newIndex = 0
      break

    case KeyCodes.END:
      event.preventDefault()
      newIndex = items.length - 1
      break

    default:
      return
  }

  onIndexChange(newIndex)
  items[newIndex]?.focus()
}

/**
 * ARIA Live Region Announcer
 */
export class LiveRegionAnnouncer {
  private static instance: LiveRegionAnnouncer
  private liveRegion: HTMLDivElement | null = null

  private constructor() {
    if (typeof document !== "undefined") {
      this.createLiveRegion()
    }
  }

  static getInstance(): LiveRegionAnnouncer {
    if (!LiveRegionAnnouncer.instance) {
      LiveRegionAnnouncer.instance = new LiveRegionAnnouncer()
    }
    return LiveRegionAnnouncer.instance
  }

  private createLiveRegion() {
    this.liveRegion = document.createElement("div")
    this.liveRegion.setAttribute("role", "status")
    this.liveRegion.setAttribute("aria-live", "polite")
    this.liveRegion.setAttribute("aria-atomic", "true")
    this.liveRegion.className = "sr-only"
    document.body.appendChild(this.liveRegion)
  }

  announce(message: string, priority: "polite" | "assertive" = "polite") {
    if (!this.liveRegion) return

    this.liveRegion.setAttribute("aria-live", priority)
    this.liveRegion.textContent = message

    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = ""
      }
    }, 1000)
  }
}

/**
 * Skip to main content link
 */
export function createSkipLink(targetId: string = "main-content"): string {
  return `#${targetId}`
}

/**
 * ARIA Attributes Generator
 */
export const ariaProps = {
  button: (label: string, pressed?: boolean, expanded?: boolean) => ({
    role: "button" as const,
    "aria-label": label,
    ...(pressed !== undefined && { "aria-pressed": pressed }),
    ...(expanded !== undefined && { "aria-expanded": expanded }),
    tabIndex: 0
  }),

  link: (label: string, current?: boolean) => ({
    role: "link" as const,
    "aria-label": label,
    ...(current && { "aria-current": "page" as const }),
    tabIndex: 0
  }),

  dialog: (labelledBy: string, modal: boolean = true) => ({
    role: "dialog" as const,
    "aria-labelledby": labelledBy,
    "aria-modal": modal,
    tabIndex: -1
  }),

  menu: (labelledBy: string) => ({
    role: "menu" as const,
    "aria-labelledby": labelledBy
  }),

  menuItem: (label: string) => ({
    role: "menuitem" as const,
    "aria-label": label,
    tabIndex: -1
  }),

  tab: (label: string, selected: boolean, controls: string) => ({
    role: "tab" as const,
    "aria-label": label,
    "aria-selected": selected,
    "aria-controls": controls,
    tabIndex: selected ? 0 : -1
  }),

  tabPanel: (labelledBy: string, hidden: boolean) => ({
    role: "tabpanel" as const,
    "aria-labelledby": labelledBy,
    hidden,
    tabIndex: 0
  }),

  alert: (live: "polite" | "assertive" = "polite") => ({
    role: "alert" as const,
    "aria-live": live,
    "aria-atomic": true
  }),

  status: () => ({
    role: "status" as const,
    "aria-live": "polite" as const,
    "aria-atomic": true
  })
}

/**
 * Focus Visible Utility Classes
 * WCAG 2.1 Success Criterion 2.4.7 (Level AA)
 */
export const focusStyles = {
  default: "focus:outline-none focus-visible:ring-2 focus-visible:ring-femfuel-rose focus-visible:ring-offset-2",
  strong: "focus:outline-none focus-visible:ring-4 focus-visible:ring-femfuel-rose focus-visible:ring-offset-2",
  inset: "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-femfuel-rose",
  none: "focus:outline-none"
}

/**
 * Color Contrast Checker
 * WCAG AA requires 4.5:1 for normal text, 3:1 for large text
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  // Simple implementation - expand as needed
  const l1 = 1 // Placeholder
  const l2 = 0.5 // Placeholder

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Touch Target Size Check
 * WCAG 2.1 Success Criterion 2.5.5 (Level AAA) - 44x44px minimum
 */
export const touchTargetSizes = {
  minimum: "min-w-[44px] min-h-[44px]",
  comfortable: "min-w-[48px] min-h-[48px]",
  generous: "min-w-[56px] min-h-[56px]"
}

/**
 * Screen Reader Only Text
 */
export const srOnly = "sr-only"

/**
 * Reduced Motion Support
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Accessible Form Validation Messages
 */
export function getValidationProps(
  fieldId: string,
  error?: string,
  describedBy?: string
) {
  const errorId = `${fieldId}-error`
  const descId = describedBy || `${fieldId}-description`

  return {
    "aria-invalid": !!error,
    "aria-describedby": error ? `${errorId} ${descId}`.trim() : descId,
    ...(error && { "aria-errormessage": errorId })
  }
}

/**
 * Loading State Announcements
 */
export function announceLoading(isLoading: boolean, loadingText: string = "Loading") {
  const announcer = LiveRegionAnnouncer.getInstance()
  announcer.announce(isLoading ? loadingText : "Content loaded")
}

/**
 * Pagination ARIA Labels
 */
export function getPaginationProps(currentPage: number, totalPages: number) {
  return {
    role: "navigation" as const,
    "aria-label": "Pagination",
    "aria-current": "page" as const,
    "aria-label-page": `Page ${currentPage} of ${totalPages}`
  }
}
