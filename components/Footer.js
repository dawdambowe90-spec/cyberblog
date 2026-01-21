import { Github, Twitter, Linkedin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 border-t border-border bg-background/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-primary">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Cyberblog</span>
            </Link>
            <p className="text-slate text-sm leading-relaxed italic">
              Exploring the intersection of deep tech, AI, and modern web architectures.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Platform</h4>
              <ul className="space-y-2 text-sm text-slate">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Explore</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Connect</h4>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 rounded-lg bg-slate/10 text-slate hover:bg-primary/10 hover:text-primary transition-all"><Twitter size={18} /></a>
                <a href="#" className="p-2 rounded-lg bg-slate/10 text-slate hover:bg-primary/10 hover:text-primary transition-all"><Github size={18} /></a>
                <a href="#" className="p-2 rounded-lg bg-slate/10 text-slate hover:bg-primary/10 hover:text-primary transition-all"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate">
          <span>&copy; {currentYear} Cyberblog. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
