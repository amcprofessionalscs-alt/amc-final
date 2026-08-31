import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD
const EVENT_SHEETS_URL = process.env.EVENT_SHEETS_WEBHOOK_URL

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body, contactName } = await req.json()

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!GMAIL_USER || !GMAIL_PASSWORD) {
      return NextResponse.json({ error: 'Email sending is not configured (GMAIL_USER / GMAIL_PASSWORD)' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASSWORD },
    })

    await transporter.sendMail({
      from: GMAIL_USER,
      to,
      subject,
      html: body.replace(/\n/g, '<br>'),
    })

    if (EVENT_SHEETS_URL) {
      await fetch(EVENT_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'outreach_email',
          contactName: contactName || '',
          to,
          subject,
          body,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Sheet mirror is best-effort — the email already sent, don't fail the request over it.
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Event outreach email error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
