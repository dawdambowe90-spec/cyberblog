'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fade-in delay-100">
      <button
        onClick={() => onCategoryChange('All')}
        className={cn(
          "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-border sm:px-6",
          activeCategory === 'All'
            ? "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/30 scale-105"
            : "bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md text-gray-600 dark:text-gray-300"
        )}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-border sm:px-6",
            activeCategory === category
              ? "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/30 scale-105"
              : "bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md text-gray-600 dark:text-gray-300"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
