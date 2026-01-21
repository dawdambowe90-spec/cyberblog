'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-12">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-12 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-border focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-300 shadow-sm hover:shadow-md"
          placeholder="Search articles by title, excerpt, or tags..."
          value={query}
          onChange={handleChange}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
