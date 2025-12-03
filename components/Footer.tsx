import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">Press Release Hub</h3>
            <p className="text-gray-600 text-sm">
              Your source for the latest company announcements, news, and press releases from leading organizations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-600 hover:text-accent transition-colors">
                  Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3">Powered By</h3>
            <a 
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent transition-colors text-sm"
            >
              Cosmic Headless CMS
            </a>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {currentYear} Press Release Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}