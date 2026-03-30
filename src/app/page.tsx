import Link from 'next/link'
import { getCities } from '@/lib/supabase/queries'

export const revalidate = 86400

export default async function HomePage() {
  const cities = await getCities()

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-14">
        <h1 className="font-serif text-4xl font-semibold text-ink mb-2">
          Your neighborhood has{' '}
          <span style={{ color: 'var(--lgc-accent)', fontStyle: 'italic' }}>group chats.</span>
        </h1>
        <p className="font-serif text-4xl font-semibold mb-3 leading-tight" style={{ color: 'var(--lgc-accent)', fontStyle: 'italic' }}>
          Join them.
        </p>
        <p className="text-muted text-base">
          No accounts. No algorithms. Just the link.
        </p>
      </div>

      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-5">
          Where do you live?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${city.slug}`}
              className="group flex items-center justify-between bg-paper rounded-xl px-5 py-4 hover:shadow-sm transition-all"
              style={{ border: '0.5px solid var(--lgc-border)' }}
            >
              <div>
                <p className="font-medium text-ink group-hover:text-accent transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-muted mt-0.5">{city.state}</p>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted">
        Got a group chat that belongs here?{' '}
        <Link href="/submit" className="text-accent hover:underline">
          Add it — takes 30 seconds.
        </Link>
      </p>
    </div>
  )
}
