import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react'
import ViewTracker from './ViewTracker'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) return {}

  const baseUrl = 'https://cyberblog.vercel.app'
  const postUrl = `${baseUrl}/post/${post.slug}`

  return {
    title: `${post.title} | Cyberblog`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Cyberblog',
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['Cyberblog Author'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    notFound()
  }

  // Simple reading time calculation
  const wordCount = post.content?.split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: 'Cyberblog Author',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cyberblog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cyberblog.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cyberblog.vercel.app/post/${post.slug}`,
    },
  }

  // Extract headings for Table of Contents (simple regex for # ## ###)
  const headings = post.content.match(/^#{1,3}\s+(.+)$/gm)?.map(h => {
    const level = h.match(/^#+/)[0].length
    const text = h.replace(/^#+\s+/, '')
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    return { level, text, id }
  }) || []

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cyberblog.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category || 'Deep Tech',
        item: `https://cyberblog.vercel.app/category/${(post.category || 'Deep Tech').toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://cyberblog.vercel.app/post/${post.slug}`,
      },
    ],
  }

  return (
    <article className="min-h-screen pb-24 animate-fade-in relative px-4 lg:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ViewTracker postId={post.id} />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto pt-32 lg:grid lg:grid-cols-[1fr_300px] gap-12 relative">
        <div className="max-w-3xl ml-auto">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate hover:text-primary mb-12 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Home
          </Link>

          {/* Header */}
          <header className="mb-16 space-y-8">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                {post.category || 'Deep Tech'}
              </span>
              <div className="flex items-center gap-6 text-sm font-bold text-slate/40 italic">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-accent" />
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-primary" />
                  {readingTime} min read
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-slate font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div className="glass rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-16">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles size={100} className="text-primary" />
            </div>
            
            <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none leading-loose">
              {/* In a real app, use a markdown renderer with heading IDs */}
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        </div>

        {/* Sticky Table of Contents Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Table of Contents
              </h3>
              <nav className="space-y-4">
                {headings.length > 0 ? (
                  headings.map((heading) => (
                    <a 
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm font-medium hover:text-primary transition-colors ${
                        heading.level === 3 ? 'pl-4 text-slate/60' : 'text-slate'
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-slate italic italic">Comprehensive coverage...</p>
                )}
              </nav>
            </div>

            {/* Newsletter CTA Placeholder */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 space-y-4">
              <h4 className="font-bold text-lg">Stay Ahead</h4>
              <p className="text-xs text-slate font-medium leading-relaxed">Join 5,000+ tech visionaries and get the latest deep tech insights.</p>
              <input 
                type="email" 
                placeholder="Future-proof email" 
                className="w-full px-4 py-2 rounded-xl glass border border-primary/20 text-xs outline-none focus:border-primary"
              />
              <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </aside>

        {/* Footer / Author Placeholder - Spans full width on small, part on large */}
        <div className="lg:col-span-1 max-w-3xl ml-auto w-full">
          <footer className="pt-12 border-t border-border/50">
            <div className="flex items-center gap-6 p-8 glass rounded-3xl">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-black">
                C
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xl">Cyberblog Author</h4>
                <p className="text-slate text-sm font-medium italic">Architecting the future through bytes and logic.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
