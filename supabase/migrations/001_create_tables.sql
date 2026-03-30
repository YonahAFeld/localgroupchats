-- Cities
CREATE TABLE cities (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  slug       text NOT NULL UNIQUE,
  state      text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Neighborhoods
CREATE TABLE neighborhoods (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id    uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name       text NOT NULL,
  slug       text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(city_id, slug)
);

-- Categories
CREATE TABLE categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  slug        text NOT NULL UNIQUE,
  icon        text,
  description text,
  created_at  timestamptz DEFAULT now()
);

-- Groups
CREATE TABLE groups (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  neighborhood_id uuid NOT NULL REFERENCES neighborhoods(id) ON DELETE CASCADE,
  category_id     uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name            text NOT NULL,
  description     text,
  platform        text NOT NULL CHECK (platform IN ('whatsapp','telegram','discord','signal','facebook','nextdoor','other')),
  join_url        text NOT NULL,
  member_count    integer,
  is_approved     boolean DEFAULT false,
  is_active       boolean DEFAULT true,
  submitted_by    text,
  submitted_at    timestamptz DEFAULT now(),
  approved_at     timestamptz,
  created_at      timestamptz DEFAULT now()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  title        text NOT NULL,
  excerpt      text,
  content      text NOT NULL,
  city_id      uuid REFERENCES cities(id),
  published    boolean DEFAULT false,
  published_at timestamptz,
  created_at   timestamptz DEFAULT now()
);
