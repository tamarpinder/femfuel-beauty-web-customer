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
        vendorId: "vendor-profile-001",
        vendorName: "Glamour House",
        vendorLogo: "/vendors/logos/vendor-1-logo.png",
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
        vendorId: "vendor-profile-002",
        vendorName: "Nails Paradise",
        vendorLogo: "/vendors/logos/vendor-2-logo.png",
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
        vendorId: "vendor-profile-005", 
        vendorName: "Lash Studio DR",
        vendorLogo: "/vendors/logos/vendor-5-logo.png",
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
      <div className="md:hidden min-h-screen bg-white">
        {/* Header */}
        <UserFlowHeader 
          title="Mis Conversaciones" 
          onBack={handleBack}
          rightElement={
            getTotalUnreadCount() > 0 && (
              <Badge variant="destructive" className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
                {getTotalUnreadCount()}
              </Badge>
            )
          }
        />

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="p-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {searchQuery ? 'No se encontraron conversaciones' : 'No tienes conversaciones'}
              </h3>
              <p className="text-gray-400 text-sm">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Cuando chatees con especialistas, aparecerán aquí'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredConversations.map((conversation) => (
                <Card 
                  key={conversation.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleChatClick(conversation)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Vendor Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          <OptimizedImage
                            src={conversation.vendorLogo || "/vendor-logo-placeholder.png"}
                            alt={`${conversation.vendorName} logo`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{conversation.vendorName}</h3>
                          <div className="flex items-center gap-2 ml-2">
                            <span className="text-xs text-gray-500">{formatTimestamp(conversation.lastMessage.timestamp)}</span>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="bg-red-500 text-white rounded-full min-w-[18px] h-5 flex items-center justify-center text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {conversation.serviceContext && (
                          <p className="text-xs text-femfuel-rose font-medium mb-1">
                            Sobre: {conversation.serviceContext}
                          </p>
                        )}
                        
                        <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {conversation.lastMessage.isFromVendor ? '' : 'Tú: '}
                          {conversation.lastMessage.text}
                        </p>
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
      <div className="hidden md:block min-h-screen bg-white">
        <UserFlowHeader 
          title="Mis Conversaciones" 
          onBack={handleBack}
          rightElement={
            getTotalUnreadCount() > 0 && (
              <Badge variant="destructive" className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
                {getTotalUnreadCount()}
              </Badge>
            )
          }
        />
        
        <div className="max-w-4xl mx-auto p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations Grid */}
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchQuery ? 'No se encontraron conversaciones' : 'No tienes conversaciones'}
              </h3>
              <p className="text-gray-400">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Cuando chatees con especialistas, aparecerán aquí'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredConversations.map((conversation) => (
                <Card 
                  key={conversation.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  onClick={() => handleChatClick(conversation)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Vendor Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                          <OptimizedImage
                            src={conversation.vendorLogo || "/vendor-logo-placeholder.png"}
                            alt={`${conversation.vendorName} logo`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{conversation.vendorName}</h3>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="bg-red-500 text-white rounded-full min-w-[20px] h-6 flex items-center justify-center text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        {conversation.serviceContext && (
                          <p className="text-sm text-femfuel-rose font-medium mb-2">
                            Sobre: {conversation.serviceContext}
                          </p>
                        )}
                        
                        <p className={`text-sm mb-2 ${conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {conversation.lastMessage.isFromVendor ? '' : 'Tú: '}
                          {conversation.lastMessage.text}
                        </p>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(conversation.lastMessage.timestamp)}</span>
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