import { createClient } from '@/lib/supabase/server'
import { 
  Eye, 
  FileText, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch Stats Data
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Sum views from analytics (simplified for now)
  const { data: viewsData } = await supabase
    .from('analytics')
    .select('views')
  
  const totalViews = viewsData?.reduce((acc, curr) => acc + curr.views, 0) || 0

  const stats = [
    { 
      name: 'Total Visits', 
      value: totalViews.toLocaleString(), 
      change: '+12.5%', 
      trend: 'up',
      icon: Eye,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      name: 'Total Posts', 
      value: totalPosts?.toString() || '0', 
      change: `+${totalPosts || 0}`, 
      trend: 'up',
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    { 
      name: 'Published', 
      value: publishedPosts?.toString() || '0', 
      change: 'Active', 
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Welcome Back, Admin</h1>
        <p className="text-slate italic font-medium">Monitoring the pulse of your digital domain.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-[32px] hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate text-sm font-bold uppercase tracking-widest opacity-60">{stat.name}</p>
              <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart Placeholder */}
        <div className="glass p-8 rounded-[40px] min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Traffic Overview</h2>
            <div className="p-1 px-3 rounded-xl bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
              Real-time
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-3xl relative">
            <TrendingUp className="text-primary/10 w-24 h-24 animate-pulse" />
            <p className="absolute bottom-6 text-slate text-xs font-bold italic opacity-40 uppercase tracking-widest">
              Live traffic visualization active
            </p>
          </div>
        </div>

        {/* Recent Posts Table */}
        <div className="glass p-8 rounded-[40px] min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Recent Content</h2>
            <button className="text-primary hover:text-accent font-black text-xs uppercase tracking-widest transition-colors">Manage All</button>
          </div>
          <div className="space-y-4">
            {recentPosts?.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-border group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold line-clamp-1">{post.title}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${post.published ? 'text-emerald-500' : 'text-amber-500'}`}>
                         {post.published ? 'Live' : 'Draft'}
                       </span>
                       <span className="text-[10px] text-slate/40 flex items-center gap-1 font-bold">
                         <Clock size={10} />
                         {new Date(post.created_at).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="text-slate/20 group-hover:text-primary transition-colors" size={20} />
              </div>
            ))}
            {recentPosts?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-slate italic opacity-40">
                 No posts found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
