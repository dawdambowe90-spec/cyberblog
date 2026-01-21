import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // We'll need to create this utility or just use clsx directly

const CustomLink = (props) => {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props} className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 decoration-2">
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 decoration-2" />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4 decoration-2" />;
};

const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-10 mb-6" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mt-8 mb-4" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 mt-8 mb-4" {...props} />
  ),
  p: (props) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ul: (props) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props) => (
    <li className="" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-4 border-indigo-500 pl-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 py-3 pr-3 rounded-r-lg" {...props} />
  ),
  hr: (props) => (
    <hr className="my-10 border-gray-200 dark:border-gray-800" {...props} />
  ),
  a: CustomLink,
  pre: (props) => (
     <div className="my-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-900 shadow-xl">
       <pre className="p-4 overflow-x-auto text-sm text-gray-50" {...props} />
     </div>
  ),
  code: (props) => (
     <code className="relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 dark:text-gray-100" {...props} />
  ),
  img: (props) => (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
      <Image
        {...props}
        width={100}
        height={100}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        alt={props.alt || 'Blog image'}
      />
    </div>
  ),
};

export default components;
