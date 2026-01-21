'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { Search, Filter, Sparkles } from 'lucide-react'

export default function BlogList({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = allPostsData.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search the archives..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:italic"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/5 text-slate font-bold transition-all border-none">
          <Filter size={20} />
          Categories
        </button>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 glass rounded-[40px]">
          <div className="inline-flex p-4 rounded-2xl bg-slate/10 text-slate mb-6">
            <Sparkles size={32} />
          </div>
          <p className="text-2xl font-bold text-slate mb-2">No results found</p>
          <p className="text-slate/60 italic">Try searching for something else, like "AI" or "Design"</p>
        </div>
      )}
    </div>
  )
}
