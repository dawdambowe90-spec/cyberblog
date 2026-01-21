'use client'

import { Send, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }

  return (
    <section className="relative overflow-hidden rounded-[80px] p-12 md:p-24 bg-primary group">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        <div className="inline-flex p-4 rounded-3xl bg-white/10 text-white backdrop-blur-xl animate-bounce">
          <Zap size={32} fill="currentColor" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight">
            Level Up Your <span className="italic">Stack</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Get the latest deep tech insights, architectural blueprints, and AI guides delivered straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-8 py-5 rounded-3xl bg-white text-primary font-bold text-lg placeholder:text-primary/40 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-10 py-5 rounded-3xl bg-black text-white font-black text-lg hover:bg-white hover:text-black hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === 'loading' ? 'Encrypting...' : status === 'success' ? 'You’re In!' : 'Join the Elite'}
            <Send size={20} className={status === 'success' ? 'hidden' : ''} />
          </button>
        </form>
        
        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
           Zero spam. Pure signal. Weekly updates.
        </p>
      </div>
    </section>
  )
}
