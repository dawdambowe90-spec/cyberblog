import { createClient } from '@/lib/supabase/server'

const URL = 'https://cyberblog.vercel.app'

export default async function sitemap() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)

  const postRoutes = (posts || []).map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: post.updated_at || post.created_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const routes = ['', '/about', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.9,
  }))

  return [...routes, ...postRoutes]
}
