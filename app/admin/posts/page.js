import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Filter
} from 'lucide-react'
import { deletePost } from '../editor/actions'

export default async function PostsPage() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Posts</h1>
          <p className="text-slate italic">Manage and distribute your content.</p>
        </div>
        <Link 
          href="/admin/editor" 
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.95] w-fit"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40" size={20} />
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl glass hover:bg-white/5 text-slate transition-all border-none">
          <Filter size={18} />
          Filter: All
        </button>
      </div>

      {/* Posts Table */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 text-slate text-sm font-semibold">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Post Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Analytics</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {posts?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate italic">
                    No posts found. Create your first masterpiece!
                  </td>
                </tr>
              ) : (
                posts?.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-sm">
                        {post.title}
                      </div>
                      <div className="text-xs text-slate truncate max-w-sm">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {post.views || 0} views
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/editor?id=${post.id}`}
                          className="p-2 hover:bg-primary/10 text-slate hover:text-primary rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <Link 
                          href={`/post/${post.slug}`}
                          className="p-2 hover:bg-accent/10 text-slate hover:text-accent rounded-lg transition-all"
                          title="View"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <form action={deletePost.bind(null, post.id)}>
                          <button 
                            className="p-2 hover:bg-red-500/10 text-slate hover:text-red-500 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
