import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'

export default function BlogCard({ post }) {
  // Estimate reading time if not provided
  const wordCount = post.content?.split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <Link href={`/blog/${post.slug}`} className="group relative block h-full outline-none">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-[32px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      <div className="relative h-full glass p-8 rounded-[38px] group-hover:border-primary/30 transition-all duration-500 flex flex-col hover:-translate-y-2">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            {post.category || 'Deep Tech'}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate italic opacity-60">
            <Clock size={14} className="text-primary" />
            {readingTime} min read
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-slate text-sm leading-relaxed mb-8 line-clamp-3 font-medium italic opacity-80 flex-grow">
          {post.excerpt}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate opacity-60">
            <Calendar size={14} className="text-accent" />
            {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1 text-xs font-black text-primary uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Explore <ArrowRight size={14} />
          </div>
        </div>

        {/* Decorative Sparkle (top right) */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles size={16} className="text-accent" />
        </div>
      </div>
    </Link>
  )
}
