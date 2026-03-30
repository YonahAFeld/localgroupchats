import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/queries'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
        ← Back to blog
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
      {post.published_at && (
        <p className="text-sm text-gray-400 mb-8">
          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}
      <div
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
