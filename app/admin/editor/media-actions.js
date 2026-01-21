'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadMedia(formData) {
  const supabase = await createClient()
  const file = formData.get('file')

  if (!file) {
    return { error: 'No file provided' }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `blog-media/${fileName}`

  const { data, error } = await supabase.storage
    .from('blog-media')
    .upload(filePath, file)

  if (error) {
    return { error: error.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('blog-media')
    .getPublicUrl(filePath)

  return { url: publicUrl }
}
