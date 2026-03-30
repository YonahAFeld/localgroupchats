import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCityBySlug, getNeighborhoodBySlug, getCategoriesWithGroupCount, getAllNeighborhoodPaths } from '@/lib/supabase/queries'

export const revalidate = 86400

interface Props {
  params: { city: string; neighborhood: string }
}

export async function generateStaticParams() {
  return getAllNeighborhoodPaths()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [city, neighborhood] = await Promise.all([
    getCityBySlug(params.city),
    getNeighborhoodBySlug(params.city, params.neighborhood),
  ])
  if (!city || !neighborhood) return {}
  return {
    title: `${neighborhood.name} · Group Chats`,
    description: `Find local WhatsApp, Telegram, and Discord group chats in ${neighborhood.name}, ${city.name}. Browse by category.`,
    alternates: { canonical: `/${city.slug}/${neighborhood.slug}` },
  }
}

export default async function NeighborhoodPage({ params }: Props) {
  const [city, neighborhood] = await Promise.all([
    getCityBySlug(params.city),
    getNeighborhoodBySlug(params.city, params.neighborhood),
  ])
  if (!city || !neighborhood) notFound()

  const categories = await getCategoriesWithGroupCount(neighborhood.id)

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <nav className="text-xs text-muted mb-8">
        <Link href="/" className="text-accent hover:underline">Home</Link>
        <span className="mx-2" style={{ color: 'var(--lgc-warm-mid)' }}>›</span>
        <Link href={`/${params.city}`} className="text-accent hover:underline">{city.name}</Link>
        <span className="mx-2" style={{ color: 'var(--lgc-warm-mid)' }}>›</span>
        <span className="text-ink">{neighborhood.name}</span>
      </nav>

      <h1 className="font-serif text-3xl font-semibold text-ink mb-1">
        {neighborhood.name}
      </h1>
      <p className="text-muted mb-10">Browse by category.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${params.city}/${params.neighborhood}/${cat.slug}`}
            className="group flex items-center gap-4 bg-paper rounded-xl px-5 py-4 hover:shadow-sm transition-all"
            style={{ border: '0.5px solid var(--lgc-border)' }}
          >
            <span className="text-2xl">{cat.icon}</span>
            <div className="flex-1">
              <p className="font-medium text-ink group-hover:text-accent transition-colors">
                {cat.name}
              </p>
              {cat.group_count > 0 && (
                <p className="text-xs text-muted mt-0.5">
                  {cat.group_count} group{cat.group_count !== 1 ? 's' : ''}
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
