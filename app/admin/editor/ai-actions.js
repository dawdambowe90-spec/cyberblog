'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAIAssistance(prompt: string, context: string = '') {
  if (!process.env.OPENAI_API_KEY) {
    return { error: 'OpenAI API Key not configured.' }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a professional blogging assistant for "Cyberblog", a premium platform. Help the user with content suggestions, improving tone, or generating sections based on their prompt. Maintain a sophisticated, tech-forward, and premium tone.',
        },
        {
          role: 'user',
          content: `Context: ${context}\n\nTask: ${prompt}`,
        },
      ],
      temperature: 0.7,
    })

    return { content: response.choices[0].message.content }
  } catch (error: any) {
    console.error('AI Assistance Error:', error)
    return { error: error.message || 'Failed to generate AI assistance.' }
  }
}
