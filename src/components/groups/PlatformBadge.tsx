import type { Platform } from '@/types'
import { PLATFORM_CONFIG } from '@/lib/utils'

export default function PlatformBadge({ platform }: { platform: Platform }) {
  const config = PLATFORM_CONFIG[platform]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
      {config.label}
    </span>
  )
}
