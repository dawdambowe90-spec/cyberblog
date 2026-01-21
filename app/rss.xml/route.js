import { getSortedPostsData } from '@/lib/posts';

const URL = 'https://cyberblog-demo.vercel.app'; // Configure this

export async function GET() {
  const allPosts = getSortedPostsData();

  const itemsXml = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${URL}/blog/${post.id}</link>
          <description>${post.excerpt || ''}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <guid>${URL}/blog/${post.id}</guid>
        </item>`
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>CyberBlog</title>
        <link>${URL}</link>
        <description>Future of Tech Blogging</description>
        <language>en</language>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
