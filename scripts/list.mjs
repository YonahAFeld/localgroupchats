/**
 * List cities, neighborhoods, categories, or groups.
 * Useful for looking up slugs before running other scripts.
 *
 * Usage:
 *   node scripts/list.mjs cities
 *   node scripts/list.mjs neighborhoods los-angeles
 *   node scripts/list.mjs categories
 *   node scripts/list.mjs groups los-angeles silver-lake
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const [type, ...rest] = process.argv.slice(2)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

if (type === 'cities') {
  const { data } = await supabase.from('cities').select('name, slug, state').order('name')
  console.log('\nCities:')
  for (const c of data ?? []) console.log(`  ${c.name}, ${c.state}  →  slug: ${c.slug}`)

} else if (type === 'neighborhoods') {
  const [citySlug] = rest
  if (!citySlug) { console.error('Usage: node scripts/list.mjs neighborhoods <city-slug>'); process.exit(1) }
  const { data: city } = await supabase.from('cities').select('id, name').eq('slug', citySlug).single()
  if (!city) { console.error(`City not found: "${citySlug}"`); process.exit(1) }
  const { data } = await supabase.from('neighborhoods').select('name, slug').eq('city_id', city.id).order('name')
  console.log(`\nNeighborhoods in ${city.name}:`)
  for (const n of data ?? []) console.log(`  ${n.name}  →  slug: ${n.slug}`)

} else if (type === 'categories') {
  const { data } = await supabase.from('categories').select('name, slug, icon').order('name')
  console.log('\nCategories:')
  for (const c of data ?? []) console.log(`  ${c.icon ?? ' '} ${c.name}  →  slug: ${c.slug}`)

} else if (type === 'groups') {
  const [citySlug, neighborhoodSlug] = rest
  if (!citySlug || !neighborhoodSlug) { console.error('Usage: node scripts/list.mjs groups <city-slug> <neighborhood-slug>'); process.exit(1) }
  const { data: city } = await supabase.from('cities').select('id, name').eq('slug', citySlug).single()
  const { data: neighborhood } = await supabase.from('neighborhoods').select('id, name').eq('slug', neighborhoodSlug).single()
  if (!city || !neighborhood) { console.error('City or neighborhood not found'); process.exit(1) }
  const { data } = await supabase
    .from('groups')
    .select('name, platform, is_approved, join_url, category:categories(name)')
    .eq('neighborhood_id', neighborhood.id)
    .order('name')
  console.log(`\nGroups in ${neighborhood.name}, ${city.name}:`)
  for (const g of data ?? []) {
    const status = g.is_approved ? '✓' : '⏳'
    console.log(`  ${status} [${g.platform}] ${g.name}  (${g.category?.name ?? '?'})`)
    console.log(`       ${g.join_url}`)
  }

} else {
  console.log('Usage:')
  console.log('  node scripts/list.mjs cities')
  console.log('  node scripts/list.mjs neighborhoods <city-slug>')
  console.log('  node scripts/list.mjs categories')
  console.log('  node scripts/list.mjs groups <city-slug> <neighborhood-slug>')
}
