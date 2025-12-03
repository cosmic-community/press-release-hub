import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeSlug?: string
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <nav className="mb-8 pb-6 border-b">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="font-medium text-gray-700">Filter by Category:</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !activeSlug
              ? 'bg-accent text-white'
              : 'bg-secondary text-secondary-foreground hover:bg-gray-300'
          }`}
        >
          All Categories
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSlug === category.slug
                ? 'bg-accent text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-gray-300'
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}