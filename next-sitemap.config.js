/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://localgroupchats.com',
  generateRobotsTxt: false, // we manage robots.txt manually
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    let priority = 0.7

    // City pages
    if (/^\/[^/]+$/.test(path)) priority = 0.6
    // Neighborhood pages
    if (/^\/[^/]+\/[^/]+$/.test(path)) priority = 0.7
    // Category pages (the money pages)
    if (/^\/[^/]+\/[^/]+\/[^/]+$/.test(path)) priority = 0.9
    // Blog posts
    if (path.startsWith('/blog/')) priority = 0.8
    // Homepage
    if (path === '/') priority = 1.0

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

module.exports = config
