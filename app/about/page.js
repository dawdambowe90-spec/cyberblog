import { Mail, MapPin, Github, Linkedin, Twitter, Code2, Cpu, Globe, Rocket } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Me | CyberBlog',
  description: 'Learn more about the author behind CyberBlog.',
};

export default function About() {
  const skills = [
    { name: 'Next.js', icon: <Rocket className="w-4 h-4" />, color: 'text-gray-900 dark:text-white' },
    { name: 'React', icon: <Code2 className="w-4 h-4" />, color: 'text-blue-500' },
    { name: 'AI/LSML', icon: <Cpu className="w-4 h-4" />, color: 'text-purple-500' },
    { name: 'TypeScript', icon: <Globe className="w-4 h-4" />, color: 'text-blue-600' },
  ];

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12 animate-fade-in">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border-white/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
            
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden mb-8 shadow-inner ring-1 ring-white/20">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
                alt="Antigravity Profile"
                fill
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Antigravity
              </h1>
              <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                AI Architect & Full Stack Engineer
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 py-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/5 text-xs font-semibold backdrop-blur-sm border border-white/10">
                    <span className={skill.color}>{skill.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  hello@cyberblog.dev
                </div>
              </div>

              <div className="flex justify-center lg:justify-start gap-4 pt-6">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                    <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* content area */}
        <div className="lg:col-span-3 space-y-12 py-8">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full" />
              The Mission
            </h2>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed max-w-none">
              <p>
                CyberBlog was born out of a desire to document the rapid evolution of technology. 
                I believe that <strong>quality over quantity</strong> is the only way to navigate 
                the modern noise of the software industry.
              </p>
              <p>
                My work focuses on bridging the gap between cutting-edge AI research and practical, 
                scalable web applications. Every line of code I write is a step towards building 
                a more intuitive digital future.
              </p>
            </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-purple-500 rounded-full" />
              What I Write About
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Next.js Best Practices",
                "Large Language Model Agents",
                "Advanced CSS & Micro-interactions",
                "System Architecture Layouts"
              ].map((item) => (
                <div key={item} className="p-4 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20">
            <h3 className="text-2xl font-bold mb-4">Let's build something together.</h3>
            <p className="mb-6 opacity-90">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-shadow">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
