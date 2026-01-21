import { getPostData, getAllPostIds } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '@/components/MDXComponents';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import DateFormatter from '@/components/DateFormatter';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Make page static
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug); // Reuse getPostData logic, checking both md/mdx

  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      publishedTime: postData.date,
      authors: [postData.author || 'CyberBlog Author'],
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  const options = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
  };

  return (
    <article className="container mx-auto px-4 max-w-3xl animate-fade-in">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
            {postData.category || 'Tech'}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <DateFormatter dateString={postData.date} />
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {postData.readingTime}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 mb-6 leading-tight">
          {postData.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-500 pl-6">
          {postData.excerpt}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
        <MDXRemote 
          source={postData.content} 
          components={MDXComponents}
          options={options}
        />
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <div className="flex flex-wrap gap-2">
           {postData.tags && postData.tags.map(tag => (
             <span key={tag} className="inline-flex items-center text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
               <Tag className="w-3 h-3 mr-1" /> {tag}
             </span>
           ))}
        </div>
      </div>
    </article>
  );
}
