import type { Group } from '@/types'
import PlatformBadge from './PlatformBadge'

export default function GroupCard({ group }: { group: Group }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-paper p-4 hover:shadow-sm transition-shadow"
      style={{ border: '0.5px solid var(--lgc-border)' }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="font-serif font-semibold text-ink">{group.name}</h3>
          <PlatformBadge platform={group.platform} />
        </div>
        {group.description && (
          <p className="text-sm text-muted line-clamp-2">{group.description}</p>
        )}
        {group.member_count && (
          <p className="text-xs text-muted mt-1">{group.member_count.toLocaleString()} members</p>
        )}
      </div>
      <a
        href={group.join_url}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="shrink-0 inline-block bg-accent text-white px-4 py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity text-center"
      >
        Join →
      </a>
    </div>
  )
}
