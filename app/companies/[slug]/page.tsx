// app/companies/[slug]/page.tsx
import { getCompany, getCompanies, getPressReleasesByCompany } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PressReleaseCard from '@/components/PressReleaseCard'
import { Metadata } from 'next'
import { PressRelease } from '@/types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const companies = await getCompanies()
  
  return companies.map((company: any) => ({
    slug: company.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompany(slug)

  if (!company) {
    return {
      title: 'Company Not Found',
    }
  }

  return {
    title: `${company.title} - Press Releases`,
    description: company.metadata?.about || `View all press releases from ${company.title}`,
  }
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params
  const company = await getCompany(slug)

  if (!company) {
    notFound()
  }

  const releases = await getPressReleasesByCompany(company.id)

  return (
    <div className="container-custom py-12">
      {/* Back Button */}
      <Link 
        href="/companies"
        className="inline-flex items-center text-accent hover:underline mb-8"
      >
        ← Back to all companies
      </Link>

      {/* Company Header */}
      <header className="mb-12">
        <div className="flex items-start gap-6 mb-6">
          {company.metadata?.logo && (
            <img 
              src={`${company.metadata.logo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={company.title}
              width="120"
              height="120"
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {company.title}
            </h1>
            {company.metadata?.about && (
              <p className="text-xl text-gray-600 leading-relaxed mb-4">
                {company.metadata.about}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-gray-600">
              {company.metadata?.industry && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {company.metadata.industry}
                </span>
              )}
              {company.metadata?.location && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {company.metadata.location}
                </span>
              )}
              {company.metadata?.website && (
                <a 
                  href={company.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:underline"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Press Releases */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
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
              No press releases available from {company.title} at this time.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}