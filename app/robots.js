export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/auth', '/api/'],
      },
    ],
    sitemap: 'https://cyberblog.vercel.app/sitemap.xml',
  }
}
