import Link from 'next/link'
import { Company } from '@/types'

interface CompanyCardProps {
  company: Company
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link 
      href={`/companies/${company.slug}`}
      className="group bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        {company.metadata?.logo && (
          <div className="flex-shrink-0">
            <img 
              src={`${company.metadata.logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={company.title}
              width="80"
              height="80"
              className="rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
            {company.title}
          </h3>

          {company.metadata?.industry && (
            <p className="text-sm text-gray-600 mb-2">
              {company.metadata.industry}
            </p>
          )}

          {company.metadata?.about && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {company.metadata.about}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {company.metadata?.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {company.metadata.location}
              </span>
            )}
            {company.metadata?.website && (
              <span className="flex items-center gap-1 text-accent">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Website
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}