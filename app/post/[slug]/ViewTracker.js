'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ViewTracker({ postId }) {
  useEffect(() => {
    const supabase = createClient()
    
    // Call the RPC function we defined in our SQL schema
    const trackView = async () => {
      const { error } = await supabase.rpc('increment_post_views', { post_id_param: postId })
      if (error) console.error('Error tracking view:', error)
    }

    trackView()
  }, [postId])

  return null
}
