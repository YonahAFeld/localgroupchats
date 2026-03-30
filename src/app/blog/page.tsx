import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/supabase/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, guides, and news about local community group chats.',
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <article key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-500 text-sm">{post.excerpt}</p>
              )}
              {post.published_at && (
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
