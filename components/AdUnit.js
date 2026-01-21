import { ExternalLink, Info } from 'lucide-react'

export default function AdUnit({ type = 'display', slotId, className }) {
  // Common styles for both types
  const baseStyles = "relative overflow-hidden rounded-3xl border transition-all duration-300 group"
  
  // Display Ad Placeholder (e.g. AdSense)
  if (type === 'display') {
    return (
      <div className={`${baseStyles} bg-slate/5 border-border/50 min-h-[100px] flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-black uppercase tracking-widest">Sponsored</span>
          <Info size={10} />
        </div>
        
        {/* Real ad code snippet would go here */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full" />
          <p className="text-[10px] text-slate font-bold uppercase tracking-widest opacity-60">Advertisement Slot</p>
        </div>
      </div>
    )
  }

  // Native Affiliate Card
  if (type === 'native') {
    return (
      <div className={`${baseStyles} bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10 p-6 hover:shadow-lg hover:shadow-primary/5 ${className}`}>
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 rounded-lg bg-primary text-white text-[10px] font-black uppercase tracking-widest">
            Recommended Tool
          </span>
          <ExternalLink size={16} className="text-slate/40 group-hover:text-primary transition-colors" />
        </div>
        
        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Elite Developer Toolkit</h4>
        <p className="text-xs text-slate leading-relaxed mb-4">
          Boost your productivity with the same tools used to architect Cyberblog. 
          Performance, quality, and speed unleashed.
        </p>
        
        <button className="w-full py-3 rounded-xl glass font-bold text-xs hover:bg-primary hover:text-white transition-all">
          Explore the Stack
        </button>
      </div>
    )
  }

  return null
}
