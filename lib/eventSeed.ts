// Seed data for the Event Ops dashboard — sourced directly from the
// Techquity Distribution + Next Step Tech Lab project brief, not invented.
// Only ever inserted once per user, on first visit to the Event tab.

export interface EventContactSeed {
  name: string
  org: string
  role?: string
  email?: string
  phone?: string
  relationship: string
  next_action?: string
  next_action_due?: string // ISO date
}

export const SEED_CONTACTS: EventContactSeed[] = [
  {
    name: 'Briana Fox',
    org: 'United Way of Greater Milwaukee & Waukesha County',
    role: 'Techquity program contact',
    email: 'bfox@unitedwaygmwc.org',
    relationship: 'Techquity / United Way — device distribution',
    next_action: 'Call — confirm the COI landed, confirm the E&O line satisfies the professional liability requirement, ask what she needs before she can process the order. Same call: ask what outcome data she and Techquity need from distribution partners.',
    next_action_due: '2026-08-31',
  },
  {
    name: 'Nadiyah Johnson',
    org: 'Milky Way Tech Hub',
    role: "Founder — also on the Governor's AI Workforce Task Force",
    relationship: 'Training / community partner — Tech Lab co-promotion',
    next_action: 'Follow up on the partnership proposal before the Sept 15 hosting-stipend and press-inclusion deadline.',
    next_action_due: '2026-09-08',
  },
]

export interface EventTaskSeed {
  title: string
  category: 'outreach' | 'logistics' | 'compliance' | 'content' | 'cohort'
  due_date?: string
  notes?: string
}

export const SEED_TASKS: EventTaskSeed[] = [
  { title: 'Call Briana Fox — confirm COI + E&O, ask what she needs before she can process the order', category: 'outreach', due_date: '2026-08-31' },
  { title: 'Follow up with Nadiyah Johnson on the partnership proposal', category: 'outreach', due_date: '2026-09-08' },
  { title: 'Have the E&O-limit answer ready ($25K vs. a possible $100K+ ask) — the fix is a call to Next Insurance, not a dead end', category: 'compliance', due_date: '2026-09-05' },
  { title: 'Have the entity-confusion answer ready for anyone new to the partnership (All For You signs, AMC insures)', category: 'compliance', due_date: '2026-09-05' },
  { title: 'Reality-check M–F 10am–2pm pickup staffing against AMC bids + the consulting pipeline — adjust hours before committing publicly', category: 'logistics', due_date: '2026-09-10' },
  { title: 'Confirm storage space at Capitol Drive for up to 60 devices', category: 'logistics', due_date: '2026-09-15' },
  { title: 'Finalize October cohort capacity before offering seats at distribution', category: 'cohort', due_date: '2026-09-15' },
  { title: 'Write the recipient intake/pickup email template', category: 'logistics', due_date: '2026-09-20' },
  { title: 'Build the tracking sheet: serial #, recipient, pickup date, status (picked up / no-show / returned)', category: 'logistics', due_date: '2026-09-20' },
  { title: 'Build the Calendly pickup booking link (M–F, 10am–2pm, 30-min slots, auto-confirm + reminder)', category: 'logistics', due_date: '2026-09-22' },
  { title: 'Add the intake question "What are you going to use this for?" + the honest, first-come Tech Lab seat offer', category: 'content', due_date: '2026-09-25' },
  { title: 'Draft the written consent form for filming (separate from pickup, zero-friction opt-out)', category: 'content', due_date: '2026-09-25' },
]
