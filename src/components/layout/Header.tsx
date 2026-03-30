import Link from 'next/link'

export default function Header() {
  return (
    <header style={{ borderBottom: '0.5px solid var(--lgc-border)' }}>
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif font-semibold text-ink hover:text-accent transition-colors">
          LocalGroupChats.com
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/blog" className="text-muted hover:text-ink transition-colors">
            Blog
          </Link>
          <Link
            href="/submit"
            className="bg-accent text-white px-4 py-1.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            List a Group Chat
          </Link>
        </nav>
      </div>
    </header>
  )
}
