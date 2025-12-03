// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPressReleasesByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PressReleaseCard from '@/components/PressReleaseCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Metadata } from 'next'
import { PressRelease } from '@/types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category: any) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Press Releases`,
    description: category.metadata?.description || `View all press releases in ${category.title}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, allCategories] = await Promise.all([
    getCategory(slug),
    getCategories(),
  ])

  if (!category) {
    notFound()
  }

  const releases = await getPressReleasesByCategory(category.id)

  return (
    <div className="container-custom py-12">
      {/* Category Filter */}
      <CategoryFilter categories={allCategories} activeSlug={slug} />

      {/* Category Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Press Releases */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Press Releases ({releases.length})
        </h2>
        {releases && releases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {releases.map((release: PressRelease) => (
              <PressReleaseCard key={release.id} release={release} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary rounded-lg">
            <p className="text-xl text-gray-500">
              No press releases available in this category at this time.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}