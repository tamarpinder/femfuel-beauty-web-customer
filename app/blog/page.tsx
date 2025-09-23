"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, Clock, Eye, Heart, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ChatButton } from "@/components/ui/chat-button"
import { CustomerFooter } from "@/components/customer-footer"
import {
  blogArticles,
  blogCategories,
  type BlogArticle,
  type BlogCategory,
  getFeaturedArticles
} from "@/data/blog/articles"
import Link from "next/link"

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>(blogArticles)
  const [featuredArticles, setFeaturedArticles] = useState<BlogArticle[]>([])
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and set up initial data
    const timer = setTimeout(() => {
      setFeaturedArticles(getFeaturedArticles())
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = blogArticles

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    setArticles(filtered)
  }, [selectedCategory, searchQuery])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: BlogCategory) => {
    const colors = {
      'tendencias-dr': 'bg-purple-100 text-purple-700',
      'transformaciones': 'bg-pink-100 text-pink-700',
      'tips-expertos': 'bg-blue-100 text-blue-700',
      'cuidado-caribeno': 'bg-green-100 text-green-700',
      'productos': 'bg-orange-100 text-orange-700',
      'eventos': 'bg-red-100 text-red-700'
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-3xl mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-femfuel-rose via-femfuel-purple to-femfuel-dark text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Blog de <span className="text-yellow-300">Belleza</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Descubre las últimas tendencias, tips de expertos y secretos de belleza
            inspirados en la cultura dominicana
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-full text-gray-900 placeholder-gray-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-femfuel-rose text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos ({blogArticles.length})
          </button>
          {Object.entries(blogCategories).map(([categoryId, category]) => {
            const categoryCount = blogArticles.filter(article => article.category === categoryId).length
            return (
              <button
                key={categoryId}
                onClick={() => setSelectedCategory(categoryId as BlogCategory)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === categoryId
                    ? "bg-femfuel-rose text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                {category.name} ({categoryCount})
              </button>
            )
          })}
        </div>

        {/* Featured Articles */}
        {selectedCategory === "all" && !searchQuery && featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-femfuel-dark mb-6">Artículos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <OptimizedImage
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        context="blog"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {blogCategories[article.category]?.name}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-femfuel-rose text-white px-3 py-1 rounded-full text-xs font-medium">
                          Destacado
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg text-femfuel-dark mb-3 group-hover:text-femfuel-rose transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime} min</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-femfuel-dark">
              {selectedCategory === "all"
                ? "Todos los Artículos"
                : blogCategories[selectedCategory]?.name
              }
            </h2>
            <p className="text-sm text-gray-600">
              {articles.length} artículos {searchQuery ? `para "${searchQuery}"` : "disponibles"}
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <OptimizedImage
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      context="blog"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {blogCategories[article.category]?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-femfuel-dark mb-3 group-hover:text-femfuel-rose transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-femfuel-purple rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-femfuel-medium" />
            </div>
            <h3 className="text-lg font-medium text-femfuel-dark mb-2">
              No se encontraron artículos
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? `No hay artículos que coincidan con "${searchQuery}"`
                : "No hay artículos en esta categoría"
              }
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Ver Todos los Artículos
            </Button>
          </div>
        )}
      </div>

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