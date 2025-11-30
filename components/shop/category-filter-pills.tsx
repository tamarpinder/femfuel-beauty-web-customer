"use client"

import { ProductCategory } from "@/types/product"

interface CategoryFilterPillsProps {
  categories: Array<{
    id: ProductCategory
    name: string
    count: number
  }>
  selectedCategory: ProductCategory | "all"
  onCategoryChange: (category: ProductCategory | "all") => void
}

export function CategoryFilterPills({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryFilterPillsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {/* All Products Pill */}
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
          selectedCategory === "all"
            ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105"
            : "bg-white text-femfuel-medium border-2 border-femfuel-rose/20 hover:border-femfuel-rose/40 hover:bg-femfuel-light/30 hover:scale-105"
        }`}
      >
        Todos
      </button>

      {/* Category Pills */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg scale-105"
              : "bg-white text-femfuel-medium border-2 border-femfuel-rose/20 hover:border-femfuel-rose/40 hover:bg-femfuel-light/30 hover:scale-105"
          }`}
        >
          <span>{category.name}</span>
          <span className="ml-2 text-xs opacity-75">({category.count})</span>
        </button>
      ))}
    </div>
  )
}
