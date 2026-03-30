'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Neighborhood, Category, Platform } from '@/types'

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'discord', label: 'Discord' },
  { value: 'signal', label: 'Signal' },
  { value: 'facebook', label: 'Facebook / Messenger' },
  { value: 'nextdoor', label: 'Nextdoor' },
  { value: 'other', label: 'Other' },
]

export default function SubmitGroupForm() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    platform: '' as Platform | '',
    join_url: '',
    neighborhood_id: '',
    category_id: '',
    description: '',
    submitted_by: '',
  })

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('neighborhoods').select('*').order('name'),
      supabase.from('categories').select('*').order('name'),
    ]).then(([nhRes, catRes]) => {
      setNeighborhoods(nhRes.data ?? [])
      setCategories(catRes.data ?? [])
    })
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()

    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMsg(data.error ?? 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-paper p-8 text-center" style={{ border: '0.5px solid var(--lgc-border)' }}>
        <p className="font-serif text-xl text-ink mb-2">You&apos;re a good neighbor.</p>
        <p className="text-muted">We&apos;ll review it and have it live within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Group name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="e.g. Silver Lake Parents, Echo Park Buy Nothing"
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Platform *</label>
        <select
          name="platform"
          value={form.platform}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        >
          <option value="">Select platform…</option>
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Join link *</label>
        <input
          name="join_url"
          type="url"
          value={form.join_url}
          onChange={handleChange}
          required
          placeholder="https://chat.whatsapp.com/…"
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Neighborhood *</label>
        <select
          name="neighborhood_id"
          value={form.neighborhood_id}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        >
          <option value="">Select neighborhood…</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Category *</label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        >
          <option value="">Select category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Description (optional)</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Who is this for? e.g. Parents of kids at Ivanhoe Elementary, active since 2021"
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">Your email (optional)</label>
        <input
          name="submitted_by"
          type="email"
          value={form.submitted_by}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-lg bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent" style={{ border: '0.5px solid var(--lgc-border)' }}
        />
        <p className="text-xs text-muted mt-1">Never shown publicly. Only if we have a question about your submission.</p>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-accent text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending…' : 'List this group chat'}
      </button>
    </form>
  )
}
