import type { Group } from '@/types'
import GroupCard from './GroupCard'

export default function GroupList({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  )
}
