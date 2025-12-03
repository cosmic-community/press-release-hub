// app/press-releases/[slug]/page.tsx
import { getPressRelease, getPressReleases } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const releases = await getPressReleases()
  
  return releases.map((release: any) => ({
    slug: release.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const release = await getPressRelease(slug)

  if (!release) {
    return {
      title: 'Press Release Not Found',
    }
  }

  return {
    title: `${release.metadata?.headline || release.title} - Press Release Hub`,
    description: release.metadata?.summary || '',
  }
}

export default async function PressReleasePage({ params }: Props) {
  const { slug } = await params
  const release = await getPressRelease(slug)

  if (!release) {
    notFound()
  }

  const releaseDate = release.metadata?.release_date 
    ? new Date(release.metadata.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  const company = release.metadata?.company
  const categories = release.metadata?.categories || []

  return (
    <article className="container-custom py-12">
      {/* Back Button */}
      <Link 
        href="/"
        className="inline-flex items-center text-accent hover:underline mb-8"
      >
        ← Back to all releases
      </Link>

      {/* Header */}
      <header className="mb-8">
        {release.metadata?.featured && (
          <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            Featured
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {release.metadata?.headline || release.title}
        </h1>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          {releaseDate && (
            <time className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {releaseDate}
            </time>
          )}
          
          {company && (
            <Link 
              href={`/companies/${company.slug}`}
              className="flex items-center gap-2 hover:text-accent"
            >
              {company.metadata?.logo && (
                <img 
                  src={`${company.metadata.logo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={company.title}
                  width="24"
                  height="24"
                  className="rounded"
                />
              )}
              {company.title}
            </Link>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Summary */}
        {release.metadata?.summary && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {release.metadata.summary}
          </p>
        )}
      </header>

      {/* Featured Image */}
      {release.metadata?.featured_image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={`${release.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
            alt={release.title}
            width="1400"
            height="600"
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: release.metadata?.content || '' }}
      />

      {/* Contact Information */}
      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
        <div className="bg-secondary rounded-lg p-6">
          <p className="mb-2">
            <strong>Contact:</strong> {release.metadata?.contact_name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{' '}
            <a href={`mailto:${release.metadata?.contact_email}`} className="text-accent hover:underline">
              {release.metadata?.contact_email}
            </a>
          </p>
          {release.metadata?.contact_phone && (
            <p>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${release.metadata.contact_phone}`} className="text-accent hover:underline">
                {release.metadata.contact_phone}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Company Information */}
      {company && (
        <section className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">About {company.title}</h2>
          <div className="flex items-start gap-6">
            {company.metadata?.logo && (
              <img 
                src={`${company.metadata.logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={company.title}
                width="80"
                height="80"
                className="rounded"
              />
            )}
            <div className="flex-1">
              {company.metadata?.about && (
                <p className="text-gray-700 mb-4">{company.metadata.about}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {company.metadata?.industry && (
                  <span>
                    <strong>Industry:</strong> {company.metadata.industry}
                  </span>
                )}
                {company.metadata?.location && (
                  <span>
                    <strong>Location:</strong> {company.metadata.location}
                  </span>
                )}
                {company.metadata?.website && (
                  <a 
                    href={company.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}