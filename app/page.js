import { createClient } from '@/lib/supabase/server'
import BlogList from '@/components/BlogList'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-bold tracking-wide uppercase">
              <Sparkles size={16} />
              The Future of Publishing
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
                Masterpieces
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate font-medium max-w-2xl mx-auto leading-relaxed italic">
              A premium space for deep tech insights, AI architectures, and the evolution of modern web design.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/blog" 
                className="px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                Start Reading
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 rounded-2xl glass font-bold text-lg hover:bg-white/10 transition-all"
              >
                Our Mission
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      </section>

      {/* Featured Posts List */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Latest <span className="text-primary italic">Insights</span></h2>
          <Link href="/blog" className="text-slate hover:text-primary font-bold flex items-center gap-1 transition-colors">
            View All <ArrowRight size={18} />
          </Link>
        </div>
        
        <BlogList allPostsData={posts || []} />
      </section>
    </div>
  )
}
