-- Enable RLS
ALTER TABLE cities        ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories    ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups        ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts    ENABLE ROW LEVEL SECURITY;

-- Public read: cities
CREATE POLICY "Public read cities"
  ON cities FOR SELECT USING (true);

-- Public read: neighborhoods
CREATE POLICY "Public read neighborhoods"
  ON neighborhoods FOR SELECT USING (true);

-- Public read: categories
CREATE POLICY "Public read categories"
  ON categories FOR SELECT USING (true);

-- Public read: approved + active groups only
CREATE POLICY "Public read approved groups"
  ON groups FOR SELECT
  USING (is_approved = true AND is_active = true);

-- Public insert: submissions (always unapproved)
CREATE POLICY "Public submit groups"
  ON groups FOR INSERT
  WITH CHECK (is_approved = false);

-- Public read: published blog posts
CREATE POLICY "Public read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);
