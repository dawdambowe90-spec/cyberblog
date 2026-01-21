import Link from 'next/link';
import { Sparkles, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Cyber<span className="text-primary">blog</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/" className="text-slate hover:text-primary transition-colors">Home</Link>
          <Link href="/blog" className="text-slate hover:text-primary transition-colors">Explore</Link>
          <Link href="/about" className="text-slate hover:text-primary transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center relative group">
            <Search className="absolute left-3 w-4 h-4 text-slate group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="pl-10 pr-4 py-2 rounded-full bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all w-48 focus:w-64"
            />
          </div>
          <Link 
            href="/admin" 
            className="p-2.5 rounded-full hover:bg-primary/10 text-slate hover:text-primary transition-all active:scale-95"
            title="Admin Dashboard"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
