"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ChatButton } from "@/components/ui/chat-button"
import { CustomerFooter } from "@/components/customer-footer"
import {
  blogArticles,
  blogCategories,
  type BlogArticle,
  getRelatedArticles
} from "@/data/blog/articles"
import Link from "next/link"
import { toast } from "sonner"

export default function BlogArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // Find article by slug
    const foundArticle = blogArticles.find(a => a.slug === slug)
    if (foundArticle) {
      setArticle(foundArticle)
      setRelatedArticles(getRelatedArticles(foundArticle))
    }
    setLoading(false)
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'tendencias-dr': 'bg-purple-100 text-purple-700',
      'transformaciones': 'bg-pink-100 text-pink-700',
      'tips-expertos': 'bg-blue-100 text-blue-700',
      'cuidado-caribeno': 'bg-green-100 text-green-700',
      'productos': 'bg-orange-100 text-orange-700',
      'eventos': 'bg-red-100 text-red-700'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to clipboard
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Enlace copiado al portapapeles")
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      toast.success("¡Artículo guardado en favoritos!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-80 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-femfuel-dark mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            El artículo que buscas no existe o ha sido movido.
          </p>
          <Button onClick={() => router.push('/blog')}>
            Volver al Blog
          </Button>
        </div>
      </div>
    )
  }

  const categoryInfo = blogCategories[article.category]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver</span>
            </Button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/blog" className="hover:text-femfuel-rose transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(article.category)}`}>
                {categoryInfo?.name}
              </span>
            </nav>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
              <span className="mr-2">{categoryInfo?.icon}</span>
              {categoryInfo?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-femfuel-dark mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min de lectura</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{article.views.toLocaleString()} vistas</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${isLiked ? 'text-red-600 border-red-600' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{article.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
          <OptimizedImage
            src={article.featuredImage}
            alt={article.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            context="blog"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-femfuel-dark mt-12 mb-6">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            } else if (paragraph.startsWith('#')) {
              return (
                <h3 key={index} className="text-xl font-semibold text-femfuel-dark mt-8 mb-4">
                  {paragraph.replace('# ', '')}
                </h3>
              )
            } else if (paragraph.includes('**')) {
              // Handle bold text
              const parts = paragraph.split(/(\*\*.*?\*\*)/)
              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {parts.map((part, i) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={i} className="font-semibold text-femfuel-dark">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              )
            } else {
              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              )
            }
          })}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-femfuel-dark mb-4">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-femfuel-purple rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                {article.author.name}
              </h3>
              <p className="text-gray-600 mb-2">{article.author.bio}</p>
              <p className="text-sm text-gray-500">{article.author.title}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-femfuel-dark mb-8 text-center">
              Artículos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.slice(0, 3).map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <OptimizedImage
                        src={relatedArticle.featuredImage}
                        alt={relatedArticle.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        context="blog"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedArticle.category)}`}>
                          {blogCategories[relatedArticle.category]?.name}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-femfuel-dark mb-2 group-hover:text-femfuel-rose transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(relatedArticle.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{relatedArticle.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
      />

      {/* Desktop Footer */}
      <CustomerFooter />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="shop" />
    </div>
  )
}