import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, service, message } = await req.json()

    if (!name || !email || !phone || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1. Send email via Gmail
    if (GMAIL_USER && GMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_PASSWORD },
      })

      await transporter.sendMail({
        from: GMAIL_USER,
        to: "amcprofessionalscs@gmail.com",
        subject: `New Contact Form Submission: ${name} - ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        `,
      })
    }

    // 2. Log to Google Sheets
    if (GOOGLE_SHEETS_URL) {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company: company || "",
          email,
          phone,
          service,
          message,
          timestamp: new Date().toISOString(),
        }),
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}