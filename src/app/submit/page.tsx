import type { Metadata } from 'next'
import SubmitGroupForm from '@/components/forms/SubmitGroupForm'

export const metadata: Metadata = {
  title: 'List a Group Chat',
  description: 'Add a local group chat to LocalGroupChats.com. We review every submission before it goes live.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl font-semibold text-ink mb-2">
        List a local <span style={{ color: 'var(--lgc-accent)', fontStyle: 'italic' }}>group chat.</span>
      </h1>
      <p className="text-muted mb-8">
        Your neighbors are probably already looking for it. We review every submission and publish within 24 hours.
      </p>
      <SubmitGroupForm />
    </div>
  )
}
