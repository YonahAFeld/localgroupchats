/**
 * Add a new city.
 *
 * Usage:
 *   node scripts/add-city.mjs "San Francisco" CA
 *   node scripts/add-city.mjs "New York" NY
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const [name, state] = process.argv.slice(2)

if (!name || !state) {
  console.error('Usage: node scripts/add-city.mjs "City Name" ST')
  process.exit(1)
}

const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data, error } = await supabase
  .from('cities')
  .upsert({ name: name.trim(), slug, state: state.toUpperCase() }, { onConflict: 'slug' })
  .select()
  .single()

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(`✓ City added: ${data.name} (${data.state}) — slug: ${data.slug}`)
