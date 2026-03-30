import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--lgc-border)' }} className="mt-16">
      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} LocalGroupChats.com</p>
        <div className="flex items-center gap-6">
          <Link href="/submit" className="hover:text-ink transition-colors">List a Group Chat</Link>
          <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
        </div>
      </div>
    </footer>
  )
}
