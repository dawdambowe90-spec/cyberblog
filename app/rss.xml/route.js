import { createClient } from '@/lib/supabase/server'

const URL = 'https://cyberblog.vercel.app'

export async function GET() {
  const supabase = await createClient()
  
  const { data: allPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const itemsXml = (allPosts || [])
    .map(
      (post) =>
        `<item>
          <title>${post.title.replace(/&/g, '&amp;')}</title>
          <link>${URL}/blog/${post.slug}</link>
          <description>${(post.excerpt || '').replace(/&/g, '&amp;')}</description>
          <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
          <guid>${URL}/blog/${post.slug}</guid>
          <category>${post.category || 'Tech'}</category>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Cyberblog</title>
        <link>${URL}</link>
        <description>The Future of Technology & AI</description>
        <language>en</language>
        <atom:link href="${URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
