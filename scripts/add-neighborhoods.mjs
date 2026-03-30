/**
 * Add one or more neighborhoods to a city.
 *
 * Usage:
 *   node scripts/add-neighborhoods.mjs "los-angeles" "Atwater Village" "Glassell Park"
 *   node scripts/add-neighborhoods.mjs "san-francisco" "Mission District" "Castro" "Noe Valley"
 *
 * First argument is the city slug.
 * All remaining arguments are neighborhood names (slugs are auto-generated).
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const [citySlug, ...neighborhoodNames] = process.argv.slice(2)

if (!citySlug || neighborhoodNames.length === 0) {
  console.error('Usage: node scripts/add-neighborhoods.mjs <city-slug> "Neighborhood 1" "Neighborhood 2" ...')
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Look up city
const { data: city, error: cityError } = await supabase
  .from('cities')
  .select('id, name')
  .eq('slug', citySlug)
  .single()

if (cityError || !city) {
  console.error(`City not found: "${citySlug}"`)
  console.error('Run: node scripts/list.mjs cities — to see available city slugs')
  process.exit(1)
}

console.log(`Adding neighborhoods to ${city.name}...`)

const rows = neighborhoodNames.map((name) => ({
  name: name.trim(),
  slug: name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-'),
  city_id: city.id,
}))

const { data, error } = await supabase
  .from('neighborhoods')
  .upsert(rows, { onConflict: 'city_id,slug' })
  .select()

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

for (const n of data) {
  console.log(`  ✓ ${n.name} (slug: ${n.slug})`)
}
console.log(`\n${data.length} neighborhood${data.length !== 1 ? 's' : ''} added to ${city.name}.`)
