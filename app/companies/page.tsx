import { getCompanies } from '@/lib/cosmic'
import CompanyCard from '@/components/CompanyCard'
import { Company } from '@/types'

export const metadata = {
  title: 'Companies - Press Release Hub',
  description: 'Browse all companies and their press releases',
}

export const revalidate = 60

export default async function CompaniesPage() {
  const companies = await getCompanies()

  return (
    <div className="container-custom py-12">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Companies
        </h1>
        <p className="text-xl text-gray-600">
          Explore press releases from leading companies across various industries
        </p>
      </section>

      {companies && companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company: Company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No companies available at this time.</p>
        </div>
      )}
    </div>
  )
}