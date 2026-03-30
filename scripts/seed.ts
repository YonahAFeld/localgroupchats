/**
 * Seed script — run once against your Supabase project:
 *   npx ts-node --project tsconfig.json scripts/seed.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in your environment (not the anon key).
 */
import { createClient } from '@supabase/supabase-js'
import { CATEGORIES } from '../src/data/seed/categories'
import { LA_NEIGHBORHOODS } from '../src/data/seed/neighborhoods'
import { SEED_GROUPS } from '../src/data/seed/groups'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('Seeding cities...')
  const { data: city, error: cityError } = await supabase
    .from('cities')
    .upsert({ name: 'Los Angeles', slug: 'los-angeles', state: 'CA' }, { onConflict: 'slug' })
    .select()
    .single()
  if (cityError) throw cityError
  console.log(`  ✓ ${city.name}`)

  console.log('Seeding neighborhoods...')
  const { data: neighborhoods, error: nhError } = await supabase
    .from('neighborhoods')
    .upsert(
      LA_NEIGHBORHOODS.map((n) => ({ ...n, city_id: city.id })),
      { onConflict: 'city_id,slug' }
    )
    .select()
  if (nhError) throw nhError
  console.log(`  ✓ ${neighborhoods.length} neighborhoods`)

  console.log('Seeding categories...')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .upsert(CATEGORIES, { onConflict: 'slug' })
    .select()
  if (catError) throw catError
  console.log(`  ✓ ${categories.length} categories`)

  // Build lookup maps
  const nhMap = Object.fromEntries(neighborhoods.map((n: any) => [n.slug, n.id]))
  const catMap = Object.fromEntries(categories.map((c: any) => [c.slug, c.id]))

  console.log('Seeding groups...')
  const groupRows = SEED_GROUPS.map((g) => ({
    name: g.name,
    platform: g.platform,
    join_url: g.join_url,
    description: g.description,
    neighborhood_id: nhMap[g.neighborhood],
    category_id: catMap[g.category],
    is_approved: true,
    is_active: true,
  })).filter((g) => g.neighborhood_id && g.category_id)

  const { data: groups, error: grpError } = await supabase
    .from('groups')
    .upsert(groupRows, { onConflict: 'join_url' })
    .select()
  if (grpError) throw grpError
  console.log(`  ✓ ${groups.length} groups`)

  console.log('\nSeed complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
