import { getAllPostIds } from '@/lib/posts';

const URL = 'https://cyberblog-demo.vercel.app';

export default async function sitemap() {
  const posts = getAllPostIds().map(({ params }) => ({
    url: `${URL}/blog/${params.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/about'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
