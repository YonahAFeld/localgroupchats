/**
 * List a group chat (adds it as approved and active immediately).
 *
 * Usage:
 *   node scripts/add-group.mjs \
 *     --city "los-angeles" \
 *     --neighborhood "silver-lake" \
 *     --category "parents-kids" \
 *     --name "Silver Lake Parents" \
 *     --platform "whatsapp" \
 *     --url "https://chat.whatsapp.com/abc123"
 *
 * Optional:
 *     --description "The main parents group for Silver Lake"
 *
 * Platforms: whatsapp | telegram | discord | signal | facebook | nextdoor | other
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const VALID_PLATFORMS = ['whatsapp', 'telegram', 'discord', 'signal', 'facebook', 'nextdoor', 'other']

// Parse --key value args
function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      args[argv[i].slice(2)] = argv[i + 1]
      i++
    }
  }
  return args
}

const args = parseArgs(process.argv.slice(2))
const { city: citySlug, neighborhood: neighborhoodSlug, category: categorySlug, name, platform, url, description } = args

const missing = ['city', 'neighborhood', 'category', 'name', 'platform', 'url'].filter((k) => !args[k])
if (missing.length > 0) {
  console.error(`Missing required arguments: ${missing.map((k) => `--${k}`).join(', ')}`)
  console.error('\nUsage: node scripts/add-group.mjs --city <slug> --neighborhood <slug> --category <slug> --name "Name" --platform <platform> --url <url> [--description "..."]')
  process.exit(1)
}

if (!VALID_PLATFORMS.includes(platform)) {
  console.error(`Invalid platform: "${platform}"`)
  console.error(`Valid platforms: ${VALID_PLATFORMS.join(', ')}`)
  process.exit(1)
}

try { new URL(url) } catch {
  console.error(`Invalid URL: "${url}"`)
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Resolve IDs
const [{ data: city }, { data: neighborhood }, { data: category }] = await Promise.all([
  supabase.from('cities').select('id, name').eq('slug', citySlug).single(),
  supabase.from('neighborhoods').select('id, name, city_id').eq('slug', neighborhoodSlug).single(),
  supabase.from('categories').select('id, name').eq('slug', categorySlug).single(),
])

if (!city)         { console.error(`City not found: "${citySlug}"`); process.exit(1) }
if (!neighborhood) { console.error(`Neighborhood not found: "${neighborhoodSlug}"`); process.exit(1) }
if (!category)     { console.error(`Category not found: "${categorySlug}"`); process.exit(1) }
if (neighborhood.city_id !== city.id) {
  console.error(`Neighborhood "${neighborhoodSlug}" does not belong to city "${citySlug}"`)
  process.exit(1)
}

const { data, error } = await supabase
  .from('groups')
  .upsert({
    name: name.trim(),
    platform,
    join_url: url.trim(),
    neighborhood_id: neighborhood.id,
    category_id: category.id,
    description: description?.trim() ?? null,
    is_approved: true,
    is_active: true,
  }, { onConflict: 'join_url' })
  .select()
  .single()

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(`✓ Group listed:`)
console.log(`  Name:         ${data.name}`)
console.log(`  Platform:     ${data.platform}`)
console.log(`  Neighborhood: ${neighborhood.name}, ${city.name}`)
console.log(`  Category:     ${category.name}`)
console.log(`  URL:          ${data.join_url}`)
console.log(`  Live at:      /${citySlug}/${neighborhoodSlug}/${categorySlug}`)
