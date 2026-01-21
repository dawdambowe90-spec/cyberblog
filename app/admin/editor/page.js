'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Save, 
  Eye, 
  Edit3, 
  Image as ImageIcon, 
  Sparkles, 
  Hash, 
  Bold, 
  Italic, 
  Link as LinkIcon,
  Maximize2,
  ChevronLeft,
  Loader2,
  X,
  ChevronRight,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { savePost } from './actions'
import { generateAIAssistance } from './ai-actions'
import { uploadMedia } from './media-actions'
import { PlusCircle } from 'lucide-react'

export default function PostEditor() {
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // AI State
  const [showAI, setShowAI] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')

  // Media State
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // SEO State
  const [showSEO, setShowSEO] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [seoScore, setSeoScore] = useState(0)
  const [readability, setReadability] = useState('Poor')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
    setMarkdown(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const handleAISubmit = async () => {
    if (!aiPrompt.trim()) return
    setIsAiLoading(true)
    const response = await generateAIAssistance(aiPrompt, markdown)
    if (response.content) {
      setAiResponse(response.content)
    } else if (response.error) {
      alert(response.error)
    }
    setIsAiLoading(false)
  }

  const applyAIUpdate = () => {
    setMarkdown(markdown + '\n\n' + aiResponse)
    setAiResponse('')
    setAiPrompt('')
  }

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadMedia(formData)
    if (result.url) {
      insertText(`![${file.name}](${result.url})`)
    } else if (result.error) {
      alert(result.error)
    }
    setIsUploading(false)
  }

  // Basic SEO & Readability Logic
  useEffect(() => {
    if (!markdown) return

    // Readability: Simple sentence/word check
    const sentences = markdown.split(/[.!?]+/).length
    const words = markdown.trim().split(/\s+/).length
    const avgWordsPerSentence = words / sentences
    
    if (avgWordsPerSentence < 15) setReadability('Premium')
    else if (avgWordsPerSentence < 25) setReadability('Good')
    else setReadability('Needs Work')

    // SEO Score: Keyword density check
    if (keywords) {
      const keywordList = keywords.split(',').map(k => k.trim().toLowerCase())
      let foundCount = 0
      keywordList.forEach(k => {
        if (markdown.toLowerCase().includes(k)) foundCount++
        if (title.toLowerCase().includes(k)) foundCount++
      })
      const score = Math.min(100, Math.round((foundCount / (keywordList.length * 2)) * 100))
      setSeoScore(score)
    }
  }, [markdown, title, keywords])

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in relative">
      {/* AI Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-80 glass border-l border-border z-50 transition-transform duration-300 transform ${showAI ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              AI Assistant
            </h2>
            <button onClick={() => setShowAI(false)} className="p-2 hover:bg-primary/10 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
              <Sparkles size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Coming Soon</h3>
              <p className="text-sm text-slate mt-2 leading-relaxed">
                The Cyberblog AI Assistant is currently under development. Premium AI features will be available soon.
              </p>
            </div>
            <button 
              disabled
              className="w-full py-3 rounded-xl bg-slate/10 text-slate font-bold cursor-not-allowed text-sm"
            >
              Feature Unavailable
            </button>
          </div>
        </div>
      </div>

      {/* Editor Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="p-2 hover:bg-primary/10 rounded-xl text-slate transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${showAI ? 'bg-primary text-white shadow-lg' : 'text-primary hover:bg-primary/10'}`}
          >
            <Sparkles size={18} />
            AI Assist
          </button>
          <button 
            onClick={() => setIsSaving(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Publish
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Main Editor Section */}
        <div className="flex-1 flex flex-col min-w-0">
          <input
            type="text"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold bg-transparent border-none outline-none placeholder:text-slate/30 mb-8 w-full"
          />

          <div className="glass rounded-2xl mb-4 p-2 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-1">
              <button onClick={() => insertText('### ')} className="p-2 hover:bg-primary/10 rounded-lg text-slate" title="Heading"><Hash size={18} /></button>
              <button onClick={() => insertText('**', '**')} className="p-2 hover:bg-primary/10 rounded-lg text-slate" title="Bold"><Bold size={18} /></button>
              <button onClick={() => insertText('_', '_')} className="p-2 hover:bg-primary/10 rounded-lg text-slate" title="Italic"><Italic size={18} /></button>
              <button onClick={() => insertText('[', '](url)')} className="p-2 hover:bg-primary/10 rounded-lg text-slate" title="Link"><LinkIcon size={18} /></button>
              <div className="w-[1px] h-6 bg-border mx-2" />
              <button onClick={() => insertText('![alt text](', ')')} className="p-2 hover:bg-primary/10 rounded-lg text-slate" title="Image"><ImageIcon size={18} /></button>
            </div>
            
            <div className="flex items-center gap-2 px-2">
              <button 
                onClick={() => setIsPreview(!isPreview)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${isPreview ? 'bg-accent text-white shadow-md' : 'hover:bg-primary/10 text-slate'}`}
              >
                {isPreview ? <Edit3 size={16} /> : <Eye size={16} />}
                {isPreview ? 'Editor' : 'Preview'}
              </button>
            </div>
          </div>

          <div className="flex-1 glass rounded-3xl overflow-hidden flex shadow-inner">
            {!isPreview ? (
              <textarea
                ref={textareaRef}
                id="editor-area"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Start writing your masterpiece..."
                className="flex-1 p-8 bg-transparent outline-none resize-none font-sans text-lg leading-relaxed placeholder:text-slate/20"
              />
            ) : (
              <div className="flex-1 p-8 overflow-y-auto prose dark:prose-invert max-w-none prose-indigo leading-loose">
                {markdown ? (
                  <div dangerouslySetInnerHTML={{ __html: markdown.replace(/\n/g, '<br/>') }} />
                ) : (
                  <p className="text-slate italic">Nothing to preview yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right SEO/Side Panel (Optional) */}
        <div className="hidden xl:flex flex-col w-72 space-y-6">
          <div className="glass p-6 rounded-3xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Search className="text-accent" size={18} />
              SEO Insights
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate/60">Target Keywords</label>
                <input 
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., AI, Web Design..."
                  className="w-full p-3 rounded-xl bg-background/50 border border-border text-xs outline-none focus:ring-1 focus:ring-accent/30"
                />
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-slate">Readability</span>
                  <span className={
                    readability === 'Premium' ? 'text-emerald-500' : 
                    readability === 'Good' ? 'text-primary' : 'text-amber-500'
                  }>{readability}</span>
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${seoScore > 70 ? 'bg-emerald-500' : 'bg-primary'}`} 
                    style={{ width: `${seoScore}%` }} 
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-slate">SEO Score</span>
                  <span className="text-primary">{seoScore}%</span>
                </div>
              </div>

              {/* Google Snippet Preview */}
              <div className="pt-4 border-t border-border space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate/60">Snippet Preview</label>
                <div className="p-4 rounded-xl bg-white dark:bg-[#1a1c1e] border border-border shadow-sm space-y-1">
                  <div className="text-[14px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate font-medium">
                    {title || 'Post Title Placeholder'} | Cyberblog
                  </div>
                  <div className="text-[12px] text-[#006621] dark:text-[#81ea67] truncate">
                    https://cyberblog.vercel.app/post/{title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'your-slug'}
                  </div>
                  <div className="text-[12px] text-slate line-clamp-2 leading-relaxed">
                    {markdown.substring(0, 160) || 'Your post content will appear here as the meta description to entice readers from Google search results...'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl flex-1">
             <h3 className="font-bold mb-4 flex items-center gap-2">
               <ImageIcon className="text-primary" size={18} />
               Media Library
             </h3>
             <input 
               type="file" 
               className="hidden" 
               ref={fileInputRef} 
               onChange={handleMediaUpload}
               accept="image/*"
             />
             <button 
               onClick={() => fileInputRef.current?.click()}
               disabled={isUploading}
               className="w-full flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-2xl p-4 text-center hover:bg-primary/5 transition-all group"
             >
               {isUploading ? (
                 <Loader2 className="animate-spin text-primary" size={32} />
               ) : (
                 <PlusCircle className="text-slate/20 group-hover:text-primary transition-colors mb-2" size={32} />
               )}
               <p className="text-xs text-slate font-medium italic leading-relaxed">
                 {isUploading ? 'Uploading masterpiece...' : 'Click to upload media'}
               </p>
             </button>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="flex items-center justify-between mt-4 px-2 text-[10px] text-slate font-bold uppercase tracking-widest">
        <div className="flex gap-6">
          <span>Words: {markdown.trim().split(/\s+/).filter(x => x.length > 0).length}</span>
          <span>Chars: {markdown.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Cloud Sync Active
        </div>
      </div>
    </div>
  )
}
