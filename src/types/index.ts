export type Platform = 'whatsapp' | 'telegram' | 'discord' | 'signal' | 'facebook' | 'nextdoor' | 'other'

export interface City {
  id: string
  name: string
  slug: string
  state: string
  created_at: string
}

export interface Neighborhood {
  id: string
  city_id: string
  name: string
  slug: string
  created_at: string
  city?: City
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string | null
  created_at: string
}

export interface Group {
  id: string
  neighborhood_id: string
  category_id: string
  name: string
  description: string | null
  platform: Platform
  join_url: string
  member_count: number | null
  is_approved: boolean
  is_active: boolean
  submitted_by: string | null
  submitted_at: string
  approved_at: string | null
  created_at: string
  neighborhood?: Neighborhood
  category?: Category
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  city_id: string | null
  published: boolean
  published_at: string | null
  created_at: string
  city?: City
}

export interface NeighborhoodWithCount extends Neighborhood {
  group_count: number
}

export interface CategoryWithCount extends Category {
  group_count: number
}

export interface GroupSubmission {
  name: string
  platform: Platform
  join_url: string
  neighborhood_id: string
  category_id: string
  description?: string
  submitted_by?: string
}
