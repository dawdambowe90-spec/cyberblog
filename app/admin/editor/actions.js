'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function savePost(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const slug = formData.get('slug') as string || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

  const postData = {
    title,
    content,
    slug,
    author_id: user.id,
    published: formData.get('published') === 'true',
    excerpt: formData.get('excerpt') as string || content.substring(0, 150) + '...',
  }

  const id = formData.get('id') as string

  if (id) {
    const { error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', id)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('posts')
      .insert([postData])
    if (error) throw error
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/posts')
}
