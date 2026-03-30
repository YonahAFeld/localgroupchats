import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const VALID_PLATFORMS = ['whatsapp', 'telegram', 'discord', 'signal', 'facebook', 'nextdoor', 'other']

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, platform, join_url, neighborhood_id, category_id, description, submitted_by } = body

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Group name is required' }, { status: 400 })
  }
  if (!platform || !VALID_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }
  if (!join_url || typeof join_url !== 'string') {
    return NextResponse.json({ error: 'Join URL is required' }, { status: 400 })
  }
  try {
    new URL(join_url)
  } catch {
    return NextResponse.json({ error: 'Invalid join URL' }, { status: 400 })
  }
  if (!neighborhood_id || !category_id) {
    return NextResponse.json({ error: 'Neighborhood and category are required' }, { status: 400 })
  }

  // Use service role key so the insert bypasses RLS (which only allows is_approved=false)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase.from('groups').insert({
    name: name.trim(),
    platform,
    join_url: join_url.trim(),
    neighborhood_id,
    category_id,
    description: description?.trim() ?? null,
    submitted_by: submitted_by?.trim() ?? null,
    is_approved: false,
    is_active: true,
  })

  if (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ error: 'Failed to submit group' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
