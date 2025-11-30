"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageCircle, Clock, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { UserFlowHeader } from "@/components/user-flow-header"

interface ChatConversation {
  id: string
  vendorId: string
  vendorName: string
  vendorLogo?: string
  serviceContext?: string
  lastMessage: {
    text: string
    timestamp: string
    isFromVendor: boolean
  }
  unreadCount: number
  isOnline: boolean
}

export default function ChatMessagesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [conversations, setConversations] = useState<ChatConversation[]>([])

  useEffect(() => {
    // Mock conversations for demo
    const mockConversations: ChatConversation[] = [
      {
        id: "chat-001",
        vendorId: "glamour-house",
        vendorName: "Glamour House",
        vendorLogo: "/vendors/logos/glamour-house-logo.png",
        serviceContext: "Maquillaje de Novia",
        lastMessage: {
          text: "¡Perfecto! Tengo disponibilidad para ese día. ¿A qué hora te gustaría la cita?",
          timestamp: "2024-12-10T15:30:00Z",
          isFromVendor: true
        },
        unreadCount: 2,
        isOnline: true
      },
      {
        id: "chat-002",
        vendorId: "nails-paradise",
        vendorName: "Nails Paradise",
        vendorLogo: "/vendors/logos/luxury-nails-logo.png",
        serviceContext: "Manicure de Gel",
        lastMessage: {
          text: "Gracias por contactarnos. Revisaremos tu solicitud y te responderemos pronto.",
          timestamp: "2024-12-10T10:15:00Z",
          isFromVendor: true
        },
        unreadCount: 0,
        isOnline: false
      },
      {
        id: "chat-003",
        vendorId: "lash-studio-dr",
        vendorName: "Lash Studio DR",
        vendorLogo: "/vendors/logos/lash-studio-logo.png",
        serviceContext: "Extensiones de Pestañas",
        lastMessage: {
          text: "¿Tienes disponibilidad para el viernes por la tarde?",
          timestamp: "2024-12-09T16:45:00Z",
          isFromVendor: false
        },
        unreadCount: 1,
        isOnline: true
      }
    ]
    
    setConversations(mockConversations)
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleChatClick = (conversation: ChatConversation) => {
    // Navigate to specific chat with vendor
    router.push(`/chat/${conversation.vendorId}?service=${encodeURIComponent(conversation.serviceContext || '')}`)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    
    if (diffHours < 1) {
      return "Ahora"
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h`
    } else {
      return `${Math.floor(diffHours / 24)}d`
    }
  }

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0)
  }

  const filteredConversations = conversations.filter(conv =>
    conv.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.serviceContext?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 pt-20">{/* Mobile chat page relies on SmartHeader */}

        {/* Search */}
        <div className="p-4 border-b border-femfuel-rose/10 bg-white/80 backdrop-blur-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-femfuel-medium" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 min-h-[48px] border-2 border-femfuel-rose/20 rounded-xl focus:border-femfuel-rose shadow-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="p-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-femfuel-light rounded-full mb-6 shadow-lg">
                <MessageCircle className="h-10 w-10 text-femfuel-medium" />
              </div>
              <h3 className="text-xl font-bold text-femfuel-dark mb-3">
                {searchQuery ? 'No se encontraron conversaciones' : 'No tienes conversaciones'}
              </h3>
              <p className="text-femfuel-medium">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Cuando chatees con especialistas, aparecerán aquí'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="cursor-pointer bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                  onClick={() => handleChatClick(conversation)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Vendor Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-femfuel-light to-pink-50 shadow-md">
                          <OptimizedImage
                            src={conversation.vendorLogo || "/vendor-logo-placeholder.png"}
                            alt={`${conversation.vendorName} logo`}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-femfuel-dark truncate">{conversation.vendorName}</h3>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs shadow-sm ml-2 flex-shrink-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>

                        {conversation.serviceContext && (
                          <p className="text-xs text-femfuel-rose font-bold mb-2">
                            Sobre: {conversation.serviceContext}
                          </p>
                        )}

                        <p className={`text-sm line-clamp-2 mb-2 min-h-[40px] ${conversation.unreadCount > 0 ? 'font-semibold text-femfuel-dark' : 'text-femfuel-medium'}`}>
                          {conversation.lastMessage.isFromVendor ? '' : 'Tú: '}
                          {conversation.lastMessage.text}
                        </p>

                        <div className="flex items-center gap-1 text-xs text-femfuel-medium mt-auto">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{formatTimestamp(conversation.lastMessage.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation activeTab="chat" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">{/* Desktop chat page relies on SmartHeader */}

        <div className="max-w-5xl mx-auto px-6 lg:pt-24 pb-12">
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-femfuel-medium" />
              <Input
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 min-h-[48px] border-2 border-femfuel-rose/20 rounded-xl focus:border-femfuel-rose shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Conversations Grid */}
          {filteredConversations.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-femfuel-light rounded-full mb-8 shadow-xl">
                <MessageCircle className="h-12 w-12 text-femfuel-medium" />
              </div>
              <h3 className="text-2xl font-bold text-femfuel-dark mb-4">
                {searchQuery ? 'No se encontraron conversaciones' : 'No tienes conversaciones'}
              </h3>
              <p className="text-lg text-femfuel-medium">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Cuando chatees con especialistas, aparecerán aquí'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="cursor-pointer bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
                  onClick={() => handleChatClick(conversation)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Vendor Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-femfuel-light to-pink-50 shadow-md">
                          <OptimizedImage
                            src={conversation.vendorLogo || "/vendor-logo-placeholder.png"}
                            alt={`${conversation.vendorName} logo`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-femfuel-dark truncate">{conversation.vendorName}</h3>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full min-w-[22px] h-6 flex items-center justify-center text-xs shadow-sm ml-2 flex-shrink-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>

                        {conversation.serviceContext && (
                          <p className="text-sm text-femfuel-rose font-bold mb-2">
                            Sobre: {conversation.serviceContext}
                          </p>
                        )}

                        <p className={`text-sm line-clamp-2 mb-3 min-h-[40px] ${conversation.unreadCount > 0 ? 'font-semibold text-femfuel-dark' : 'text-femfuel-medium'}`}>
                          {conversation.lastMessage.isFromVendor ? '' : 'Tú: '}
                          {conversation.lastMessage.text}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-femfuel-medium mt-auto">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="font-medium">{formatTimestamp(conversation.lastMessage.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}