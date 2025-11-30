"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Facebook, Instagram, Music } from "lucide-react"
import { customerFooterSections } from "@/components/customer-footer-content"
import { AuthModal } from "@/components/auth-modal"

// X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface FooterSection {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

export function CustomerFooter() {
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")

  const handleAuthSuccess = (user: any) => {
    // Handle successful authentication
  }

  const handleLinkClick = (link: { label: string; href: string }, sectionTitle: string, e: React.MouseEvent) => {
    if (link.label === "Nuevos en FemFuel") {
      e.preventDefault()
      setAuthMode("signup")
      setShowAuthModal(true)
      return
    }

    if (link.label === "Únete como Profesional") {
      e.preventDefault()
      window.open("https://femfuel-beauty-web-vendor.vercel.app/how-it-works", "_blank")
      return
    }

    // Handle "Servicios Populares" section like homepage categories
    if (sectionTitle === "Servicios Populares") {
      e.preventDefault()

      // Map service labels to category IDs (same as homepage categories)
      const serviceSlugMap: { [key: string]: string } = {
        "Manicure y Pedicure": "nails",
        "Maquillaje": "makeup",
        "Tratamientos Faciales": "facial",
        "Peinados": "hair",
        "Spa y Masajes": "spa"
      }

      const categoryId = serviceSlugMap[link.label]
      if (categoryId) {
        router.push(`/services?category=${categoryId}`)
      } else {
        // Fallback to original href if no mapping found
        router.push(link.href)
      }
      return
    }

    // For regular links, let the default behavior happen
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/femfuelbeauty", label: "Facebook" },
    { icon: XIcon, href: "https://x.com/femfuelbeauty", label: "X" },
    { icon: Instagram, href: "https://instagram.com/femfuelbeauty", label: "Instagram" },
    { icon: Music, href: "https://tiktok.com/@femfuelbeauty", label: "TikTok" },
  ]

  const legalLinks = [
    { label: "Terms", href: "/terms-of-service" },
    { label: "Sitemap", href: "/sitemap" },
    { label: "Privacy", href: "/privacy-policy" },
  ]

  return (
    <>
      <footer className="hidden md:block bg-gradient-to-b from-white to-rose-50/30">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Logo and Brand */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/femfuel-logo.png"
                alt="FemFuel Beauty"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose via-pink-600 to-femfuel-rose bg-clip-text text-transparent font-serif">FemFuel Beauty</span>
            </div>
            <p className="text-femfuel-medium text-base md:text-lg max-w-md leading-relaxed font-medium">
              La plataforma líder de belleza en la República Dominicana, que conecta a los clientes con los mejores profesionales.
            </p>
          </div>

          {/* Footer Sections */}
          <div className="grid grid-cols-5 gap-8 mb-12">
            {customerFooterSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-femfuel-dark font-bold text-sm uppercase tracking-wide mb-4 font-serif">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(link, section.title, e)}
                        className="text-femfuel-medium hover:text-femfuel-rose hover:bg-rose-50 hover:scale-[1.02] hover:-translate-y-0.5 hover:px-3 hover:py-1.5 hover:rounded-xl hover:shadow-md transition-all duration-300 text-sm block cursor-pointer font-medium"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-femfuel-rose/10 bg-gradient-to-r from-gray-50 to-rose-50/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              {/* Left Side - Copyright and Legal */}
              <div className="flex items-center gap-6">
                <span className="text-femfuel-medium text-sm font-medium">
                  © 2025 FemFuel Beauty RD
                </span>
                <div className="flex items-center gap-4">
                  {legalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-femfuel-medium hover:text-femfuel-rose hover:bg-rose-50 hover:px-3 hover:py-1.5 hover:rounded-xl hover:shadow-md hover:scale-105 transition-all duration-300 text-sm font-bold"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Side - Language, Currency, Social */}
              <div className="flex items-center gap-6">
                {/* Language Toggle */}
                <div className="relative">
                  <button className="flex items-center gap-2 text-femfuel-medium hover:text-femfuel-rose hover:bg-rose-50 hover:px-3 hover:py-2 hover:rounded-xl hover:shadow-md hover:scale-105 transition-all duration-300 text-sm font-bold">
                    <span className="text-base">🌐</span>
                    Español (DR)
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Currency Toggle */}
                <div className="relative">
                  <button className="flex items-center gap-2 text-femfuel-medium hover:text-femfuel-rose hover:bg-rose-50 hover:px-3 hover:py-2 hover:rounded-xl hover:shadow-md hover:scale-105 transition-all duration-300 text-sm font-bold">
                    <span className="text-base">💰</span>
                    RD$
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-femfuel-medium hover:text-white hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:scale-110 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-femfuel-rose/20"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </>
  )
}