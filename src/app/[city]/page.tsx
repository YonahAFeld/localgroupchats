import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCities, getCityBySlug, getNeighborhoodsByCity } from '@/lib/supabase/queries'

export const revalidate = 86400

interface Props {
  params: { city: string }
}

export async function generateStaticParams() {
  const cities = await getCities()
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = await getCityBySlug(params.city)
  if (!city) return {}
  return {
    title: `${city.name} · Local Group Chats`,
    description: `Find local WhatsApp, Telegram, and Discord group chats by neighborhood in ${city.name}, ${city.state}.`,
    alternates: { canonical: `/${city.slug}` },
  }
}

export default async function CityPage({ params }: Props) {
  const [city, neighborhoods] = await Promise.all([
    getCityBySlug(params.city),
    getNeighborhoodsByCity(params.city),
  ])
  if (!city) notFound()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <nav className="text-xs text-muted mb-8">
        <Link href="/" className="text-accent hover:underline">Home</Link>
        <span className="mx-2" style={{ color: 'var(--lgc-warm-mid)' }}>›</span>
        <span className="text-ink">{city.name}</span>
      </nav>

      <h1 className="font-serif text-3xl font-semibold text-ink mb-1">
        {city.name}
      </h1>
      <p className="text-muted mb-10">Choose a neighborhood.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {neighborhoods.map((n) => (
          <Link
            key={n.id}
            href={`/${params.city}/${n.slug}`}
            className="group flex items-center justify-between bg-paper rounded-xl px-5 py-4 hover:shadow-sm transition-all"
            style={{ border: '0.5px solid var(--lgc-border)' }}
          >
            <div>
              <p className="font-medium text-ink group-hover:text-accent transition-colors">
                {n.name}
              </p>
              {n.group_count > 0 && (
                <p className="text-xs text-muted mt-0.5">
                  {n.group_count} group{n.group_count !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <span className="text-muted group-hover:text-accent transition-colors">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
