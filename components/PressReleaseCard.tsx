import Link from 'next/link'
import { PressRelease } from '@/types'

interface PressReleaseCardProps {
  release: PressRelease
  featured?: boolean
}

export default function PressReleaseCard({ release, featured = false }: PressReleaseCardProps) {
  const releaseDate = release.metadata?.release_date 
    ? new Date(release.metadata.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null

  const company = release.metadata?.company
  const categories = release.metadata?.categories || []

  return (
    <article className="group bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/press-releases/${release.slug}`}>
        {/* Featured Image */}
        {release.metadata?.featured_image && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img 
              src={`${release.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={release.title}
              width="400"
              height="225"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Featured Badge */}
          {featured && (
            <span className="inline-block bg-accent text-white px-2 py-1 rounded text-xs font-medium mb-3">
              Featured
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {release.metadata?.headline || release.title}
          </h3>

          {/* Summary */}
          {release.metadata?.summary && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {release.metadata.summary}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            {releaseDate && (
              <time className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {releaseDate}
              </time>
            )}
            {company && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {company.title}
              </span>
            )}
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category: any) => (
                <span
                  key={category.id}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                >
                  {category.title}
                </span>
              ))}
              {categories.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{categories.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}