import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

const SYSTEM = `You are the Brain Chat AI of the Next Step OS, created by Demonte Williams (@Monte_Motivated).

You are a high-performance business strategist and systems architect. Your role:
- Help entrepreneurs build systems, strategies, and execution plans
- Apply the Monte OS framework: Mindset → Offer → Systems → Automation → Capital
- Be direct, specific, and execution-focused — not motivational
- Ask clarifying questions when needed
- Reference the Law of 1% (consistent small improvements compound)
- Keep responses concise but complete — under 200 words unless the question requires depth

Voice: Street-adjacent, confident, data-driven. Think execution over inspiration.`

interface HistoryMessage { role: 'user' | 'assistant'; content: string }

export async function POST(request: NextRequest) {
  try {
    const { message, history, userId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const messages = [
      ...((history as HistoryMessage[]) || []).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: SYSTEM + (userId ? `\n\nUser ID: ${userId}` : ''),
      messages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Brain Chat error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
