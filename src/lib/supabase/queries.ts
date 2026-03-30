import { createClient as createServerClient } from './server'
import { createClient as createBrowserClient } from '@supabase/supabase-js'

// Use during generateStaticParams (no request context available)
function createStaticClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Use inside page/component render (has request context)
function createClient() {
  try {
    return createServerClient()
  } catch {
    return createStaticClient()
  }
}
import type { City, Neighborhood, Category, Group, BlogPost, NeighborhoodWithCount, CategoryWithCount } from '@/types'

export async function getCities(): Promise<City[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name')
  if (error) throw error
  return data ?? []
}

export async function getCityBySlug(citySlug: string): Promise<City | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', citySlug)
    .single()
  if (error) return null
  return data
}

export async function getNeighborhoodsByCity(citySlug: string): Promise<NeighborhoodWithCount[]> {
  const supabase = createClient()
  const { data: city } = await supabase
    .from('cities')
    .select('id')
    .eq('slug', citySlug)
    .single()
  if (!city) return []

  const { data, error } = await supabase
    .from('neighborhoods')
    .select(`
      *,
      groups(count)
    `)
    .eq('city_id', city.id)
    .order('name')
  if (error) throw error

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((n: any) => ({
    ...n,
    group_count: n.groups?.[0]?.count ?? 0,
  }))
}

export async function getNeighborhoodBySlug(citySlug: string, neighborhoodSlug: string): Promise<Neighborhood | null> {
  const supabase = createClient()
  const { data: city } = await supabase
    .from('cities')
    .select('id')
    .eq('slug', citySlug)
    .single()
  if (!city) return null

  const { data, error } = await supabase
    .from('neighborhoods')
    .select('*, city:cities(*)')
    .eq('city_id', city.id)
    .eq('slug', neighborhoodSlug)
    .single()
  if (error) return null
  return data
}

export async function getCategoriesWithGroupCount(neighborhoodId: string): Promise<CategoryWithCount[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      groups(count)
    `)
    .order('name')
  if (error) throw error

  // Filter counts to only groups for this neighborhood
  const { data: groupCounts } = await supabase
    .from('groups')
    .select('category_id')
    .eq('neighborhood_id', neighborhoodId)
    .eq('is_approved', true)
    .eq('is_active', true)

  const countMap: Record<string, number> = {}
  for (const g of groupCounts ?? []) {
    countMap[g.category_id] = (countMap[g.category_id] ?? 0) + 1
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((c: any) => ({
    ...c,
    group_count: countMap[c.id] ?? 0,
  }))
}

export async function getCategoryBySlug(categorySlug: string): Promise<Category | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()
  if (error) return null
  return data
}

export async function getGroupsByNeighborhoodAndCategory(
  neighborhoodId: string,
  categoryId: string
): Promise<Group[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('neighborhood_id', neighborhoodId)
    .eq('category_id', categoryId)
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('name')
  if (error) throw error
  return data ?? []
}

export async function getAllStaticPaths(): Promise<
  { city: string; neighborhood: string; category: string }[]
> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('groups')
    .select(`
      neighborhood:neighborhoods(slug, city:cities(slug)),
      category:categories(slug)
    `)
    .eq('is_approved', true)
    .eq('is_active', true)
  if (error) return []

  const seen = new Set<string>()
  const paths: { city: string; neighborhood: string; category: string }[] = []

  for (const g of data ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const neighborhood = g.neighborhood as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = g.category as any
    if (!neighborhood || !category) continue
    const citySlug = neighborhood.city?.slug
    const neighborhoodSlug = neighborhood.slug
    const categorySlug = category.slug
    if (!citySlug || !neighborhoodSlug || !categorySlug) continue
    const key = `${citySlug}/${neighborhoodSlug}/${categorySlug}`
    if (!seen.has(key)) {
      seen.add(key)
      paths.push({ city: citySlug, neighborhood: neighborhoodSlug, category: categorySlug })
    }
  }

  return paths
}

export async function getAllNeighborhoodPaths(): Promise<{ city: string; neighborhood: string }[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('neighborhoods')
    .select('slug, city:cities(slug)')
  if (error) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((n: any) => ({
    city: n.city?.slug,
    neighborhood: n.slug,
  })).filter((p) => p.city)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, city:cities(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}

export async function getBlogPosts(): Promise<Pick<BlogPost, 'id' | 'slug' | 'title' | 'excerpt' | 'published_at' | 'city_id'>[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, published_at, city_id')
    .eq('published', true)
    .order('published_at', { ascending: false })
  if (error) return []
  return data ?? []
}
