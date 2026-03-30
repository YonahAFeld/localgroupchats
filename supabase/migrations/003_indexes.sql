CREATE INDEX idx_neighborhoods_city        ON neighborhoods(city_id);
CREATE INDEX idx_groups_neighborhood_cat  ON groups(neighborhood_id, category_id);
CREATE INDEX idx_groups_approved          ON groups(is_approved, is_active);
CREATE INDEX idx_blog_posts_slug          ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published     ON blog_posts(published, published_at DESC);
