import { createClient } from '@/lib/supabase/server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Sparkles, AlertCircle } from 'lucide-react'
import DateFormatter from '@/components/DateFormatter'
import ReadingProgress from '@/components/ReadingProgress'
import JsonLd from '@/components/JsonLd'
import AdUnit from '@/components/AdUnit'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      url: `https://cyberblog.vercel.app/blog/${slug}`,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    }
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

  const stats = readingTime(post.content)

  const mdxOptions = {
    mdxOptions: {
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
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
      '@id': `https://cyberblog.vercel.app/blog/${slug}`,
    },
  }

  return (
    <>
      <ReadingProgress />
      <JsonLd data={jsonLd} />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl animate-fade-in py-12">
        <div className="lg:grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Article Content */}
          <article>
            <div className="mb-12">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-sm text-slate hover:text-primary mb-12 transition-colors font-bold group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Link>

              <header className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                    {post.category || 'Engineering'}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate/60 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      <DateFormatter dateString={post.created_at} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" />
                      {stats.text}
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-foreground">
                  {post.title}
                </h1>

                <p className="text-2xl text-slate font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                  {post.excerpt}
                </p>
              </header>
            </div>

            {post.cover_image && (
              <div className="w-full aspect-video rounded-[40px] overflow-hidden mb-16 shadow-2xl relative group">
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              </div>
            )}

            <div className="prose prose-xl prose-slate dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary max-w-none">
              <MDXRemote 
                source={post.content} 
                components={MDXComponents}
                options={mdxOptions}
              />
            </div>
            
            {/* In-Content Native Ad */}
            <div className="my-16">
              <AdUnit type="native" />
            </div>

            <footer className="mt-24 pt-12 border-t border-border space-y-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-wrap gap-3">
                  {post.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-2 text-xs font-bold text-slate/60 bg-slate/5 px-4 py-2 rounded-full border border-border hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all">
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
                
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl glass font-bold text-sm hover:bg-primary hover:text-white transition-all group">
                  <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                  Spread the Knowledge
                </button>
              </div>
            </footer>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              {/* Display Ad Slot */}
              <AdUnit type="display" className="h-64" />

              <div className="glass p-8 rounded-3xl space-y-6">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Premium Resources
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all cursor-pointer group">
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">Architectural Blueprints</h4>
                    <p className="text-[10px] text-slate mt-1 italic">Download the high-level design patterns used in this project.</p>
                  </div>
                  <div className="p-4 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all cursor-pointer group">
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">Next.js Performance Guide</h4>
                    <p className="text-[10px] text-slate mt-1 italic">Master the Art of 100/100 Lighthouse scores.</p>
                  </div>
                </div>
              </div>

               {/* Trust/Transparency Badger */}
              <div className="p-6 rounded-3xl bg-secondary/5 border border-border space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <AlertCircle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Transparency</span>
                </div>
                <p className="text-[10px] text-slate/60 font-medium leading-relaxed italic">
                  Cyberblog uses non-intrusive ads and affiliate links to support our research. We never compromise on technical integrity. 
                  <Link href="/privacy" className="text-primary hover:underline ml-1">Learn more</Link>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
