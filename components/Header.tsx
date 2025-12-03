import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="hidden sm:inline">Press Release Hub</span>
            <span className="sm:hidden">PR Hub</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-accent font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/companies" 
              className="text-gray-700 hover:text-accent font-medium transition-colors"
            >
              Companies
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}