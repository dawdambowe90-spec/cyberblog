import { createClient } from '@/lib/supabase/server'
import BlogList from '@/components/BlogList'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import Newsletter from '@/components/Newsletter'

export const metadata = {
  title: 'Blog | Insights & Deep Dives',
  description: 'Explore our latest articles on software engineering, AI, and digital design.',
}

export default async function BlogPage({ searchParams }) {
  const { q, category } = await searchParams || {}
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data: posts, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
  }

  // Get unique categories for the filter
  const { data: categoriesData } = await supabase
    .from('posts')
    .select('category')
    .eq('published', true)
  
  const categories = ['All', ...new Set(categoriesData?.map(p => p.category).filter(Boolean) || [])]

  return (
    <div className="container mx-auto px-4 lg:px-8 space-y-12">
      <header className="max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          All <span className="text-primary italic">Insights</span>
        </h1>
        <p className="text-xl text-slate font-medium leading-relaxed">
          Deep dives into modern web development, AI architectures, and system design. 
          Built for engineers who care about quality.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between animate-slide-up">
        <SearchBar defaultValue={q} />
        <CategoryFilter categories={categories} activeCategory={category || 'All'} />
      </div>

      <div className="animate-slide-up delay-100">
        <BlogList allPostsData={posts || []} />
        
        {posts?.length === 0 && (
          <div className="text-center py-24 glass rounded-[40px] border-2 border-dashed">
            <p className="text-slate text-xl font-medium italic">No matches found for your search.</p>
          </div>
        )}
      </div>

      <section className="mb-12">
        <Newsletter />
      </section>
    </div>
  )
}
