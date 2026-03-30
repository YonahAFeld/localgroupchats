/**
 * Delete all group chats (approved and pending).
 * Cities, neighborhoods, and categories are untouched.
 *
 * Usage:
 *   node scripts/clear-groups.mjs
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as readline from 'readline'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Show count first
const { count } = await supabase
  .from('groups')
  .select('*', { count: 'exact', head: true })

console.log(`This will permanently delete all ${count} group chats.`)

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.question('Type "yes" to confirm: ', async (answer) => {
  rl.close()
  if (answer.trim().toLowerCase() !== 'yes') {
    console.log('Aborted.')
    process.exit(0)
  }

  const { error } = await supabase.from('groups').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }

  console.log(`✓ All ${count} groups deleted.`)
})
