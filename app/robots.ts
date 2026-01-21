import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
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
