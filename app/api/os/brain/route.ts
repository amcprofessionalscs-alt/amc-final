import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

const SYSTEM = `You are the AI Brain of the Next Step OS, created by Demonte Williams (@Monte_Motivated).
You deliver a short, sharp daily intelligence briefing — part systems strategist, part execution coach.

Your voice: direct, high-conviction, street-adjacent. No fluff. Think like a founder who's been in the room.

When called, generate a 2-3 sentence morning intelligence brief that:
- References the current day/time context
- Delivers one sharp execution insight or strategic reminder
- Ends with a call to action or bold perspective

Keep it under 60 words. No bullet points. Conversational but precise.`

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ message: 'Systems online. What are we building today?' })
    }

    const { userId } = await request.json()

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `Generate today's intelligence brief. User: ${userId || 'operator'}. Current time: ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.`,
      }],
    })

    const message = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ message: 'Systems online. What are we building today?' })
  }
}
