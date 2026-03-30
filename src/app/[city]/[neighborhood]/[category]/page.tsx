import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getCityBySlug,
  getNeighborhoodBySlug,
  getCategoryBySlug,
  getGroupsByNeighborhoodAndCategory,
  getAllStaticPaths,
} from '@/lib/supabase/queries'
import GroupList from '@/components/groups/GroupList'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600
export const dynamicParams = true

interface Props {
  params: { city: string; neighborhood: string; category: string }
}

export async function generateStaticParams() {
  return getAllStaticPaths()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [city, neighborhood, category] = await Promise.all([
    getCityBySlug(params.city),
    getNeighborhoodBySlug(params.city, params.neighborhood),
    getCategoryBySlug(params.category),
  ])
  if (!city || !neighborhood || !category) return {}

  const title = `${neighborhood.name} ${category.name} Group Chats`
  const description = `Find and join ${category.name.toLowerCase()} group chats in ${neighborhood.name}, ${city.name}. WhatsApp, Telegram, Discord and more.`

  return {
    title,
    description,
    alternates: { canonical: `/${city.slug}/${neighborhood.slug}/${category.slug}` },
    openGraph: { title: `${title} | LocalGroupChats.com`, description },
  }
}

export default async function CategoryPage({ params }: Props) {
  const [city, neighborhood, category] = await Promise.all([
    getCityBySlug(params.city),
    getNeighborhoodBySlug(params.city, params.neighborhood),
    getCategoryBySlug(params.category),
  ])
  if (!city || !neighborhood || !category) notFound()

  const groups = await getGroupsByNeighborhoodAndCategory(neighborhood.id, category.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${neighborhood.name} ${category.name} Group Chats`,
    description: `Local ${category.name} group chats in ${neighborhood.name}, ${city.name}`,
    numberOfItems: groups.length,
    itemListElement: groups.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: g.join_url,
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <nav className="text-xs text-muted mb-8">
          <Link href="/" className="text-accent hover:underline">Home</Link>
          <span className="mx-2" style={{ color: 'var(--lgc-warm-mid)' }}>›</span>
          <Link href={`/${params.city}`} className="text-accent hover:underline">{city.name}</Link>
          <span className="mx-2" style={{ color: 'var(--lgc-warm-mid)' }}>›</span>
          <Link href={`/${params.city}/${params.neighborhood}`} className="text-accent hover:underline">{neighborhood.name}</Link>
          <span className="mx-2" style={{ color: 'var(--lgc-warm-mid)' }}>›</span>
          <span className="text-ink">{category.name}</span>
        </nav>

        <div className="mb-10">
          <h1 className="font-serif text-3xl font-semibold text-ink mb-1">
            {category.name} · {neighborhood.name}
          </h1>
          <p className="text-muted">
            {groups.length > 0
              ? `${groups.length} group${groups.length !== 1 ? 's' : ''} · Real WhatsApp, Telegram, and Discord groups. Join directly.`
              : 'Nothing listed here yet.'}
          </p>
        </div>

        {groups.length > 0 ? (
          <GroupList groups={groups} />
        ) : (
          <div
            className="rounded-xl p-12 text-center"
            style={{ border: '0.5px dashed var(--lgc-border)' }}
          >
            <p className="text-muted mb-4">No groups here yet — but your neighbors are out there.</p>
            <Link
              href="/submit"
              className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              List the first one
            </Link>
          </div>
        )}

        <div
          className="mt-12 rounded-xl bg-paper p-6 text-center"
          style={{ border: '0.5px solid var(--lgc-border)' }}
        >
          <p className="text-muted mb-3">Know a group that belongs here? Add it.</p>
          <Link
            href="/submit"
            className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            List a group chat
          </Link>
        </div>
      </div>
    </>
  )
}
