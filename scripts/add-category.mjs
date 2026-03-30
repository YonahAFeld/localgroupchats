/**
 * Add a new category (available across all cities automatically).
 *
 * Usage:
 *   node scripts/add-category.mjs "Pets" 🐾
 *   node scripts/add-category.mjs "Arts & Culture" 🎨
 *
 * Categories are global — once added, they appear on every neighborhood page.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const [name, icon] = process.argv.slice(2)

if (!name) {
  console.error('Usage: node scripts/add-category.mjs "Category Name" [emoji]')
  process.exit(1)
}

const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data, error } = await supabase
  .from('categories')
  .upsert(
    { name: name.trim(), slug, icon: icon ?? null },
    { onConflict: 'slug' }
  )
  .select()
  .single()

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(`✓ Category added: ${data.icon ?? ''} ${data.name} (slug: ${data.slug})`)
console.log(`  It will now appear on all neighborhood pages.`)
