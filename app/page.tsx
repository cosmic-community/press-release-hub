import { getPressReleases, getFeaturedReleases, getCategories } from '@/lib/cosmic'
import PressReleaseCard from '@/components/PressReleaseCard'
import CategoryFilter from '@/components/CategoryFilter'
import { PressRelease } from '@/types'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [allReleases, featuredReleases, categories] = await Promise.all([
    getPressReleases(),
    getFeaturedReleases(),
    getCategories(),
  ])

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Latest Press Releases
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Stay informed with the latest announcements, news, and updates from leading companies across various industries.
        </p>
      </section>

      {/* Category Filter */}
      <CategoryFilter categories={categories} />

      {/* Featured Releases */}
      {featuredReleases && featuredReleases.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="inline-block w-1 h-8 bg-accent rounded"></span>
            Featured Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReleases.map((release: PressRelease) => (
              <PressReleaseCard key={release.id} release={release} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Releases */}
      <section>
        <h2 className="text-3xl font-bold mb-6">All Press Releases</h2>
        {allReleases && allReleases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReleases.map((release: PressRelease) => (
              <PressReleaseCard key={release.id} release={release} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No press releases available at this time.</p>
          </div>
        )}
      </section>
    </div>
  )
}