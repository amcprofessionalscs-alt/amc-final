'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient, supabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Props { user: User | null }

type Category = 'outreach' | 'logistics' | 'compliance' | 'content' | 'cohort'
type Status = 'todo' | 'in_progress' | 'done' | 'blocked'

interface Task {
  id: string
  title: string
  category: Category
  status: Status
  due_date: string | null
  notes: string | null
}

const CATEGORY_LABEL: Record<Category, string> = {
  outreach: 'Outreach',
  logistics: 'Logistics',
  compliance: 'Compliance',
  content: 'Content',
  cohort: 'Cohort',
}

const CATEGORY_ORDER: Category[] = ['outreach', 'compliance', 'logistics', 'cohort', 'content']

const STATUS_CYCLE: Status[] = ['todo', 'in_progress', 'done', 'blocked']
const STATUS_LABEL: Record<Status, string> = { todo: 'To do', in_progress: 'In progress', done: 'Done', blocked: 'Blocked' }
const STATUS_COLOR: Record<Status, string> = { todo: '#666', in_progress: 'var(--cyan)', done: 'var(--amber)', blocked: 'var(--pink)' }

function isOverdue(dueDate: string | null, status: Status) {
  if (!dueDate || status === 'done') return false
  return new Date(`${dueDate}T00:00:00`).getTime() < new Date().setHours(0, 0, 0, 0)
}

export default function EventChecklist({ user }: Props) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', category: 'logistics' as Category, due_date: '' })

  const load = async () => {
    if (!user?.id || !supabaseConfigured()) { setLoading(false); return }
    const supabase = createClient()
    const { data } = await supabase
      .from('event_tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true, nullsFirst: false })
    setTasks((data as Task[]) || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const cycleStatus = async (task: Task) => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(task.status) + 1) % STATUS_CYCLE.length]
    setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, status: next } : t)))
    if (!supabaseConfigured() || !user?.id) return
    const supabase = createClient()
    await supabase.from('event_tasks').update({ status: next }).eq('id', task.id)
  }

  const addTask = async () => {
    if (!newTask.title.trim() || !user?.id || !supabaseConfigured()) return
    const supabase = createClient()
    await supabase.from('event_tasks').insert({
      user_id: user.id,
      title: newTask.title,
      category: newTask.category,
      due_date: newTask.due_date || null,
    })
    setNewTask({ title: '', category: 'logistics', due_date: '' })
    setShowAdd(false)
    load()
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[1, 2, 3].map(i => <div key={i} className="os-card" style={{ padding: '1.25rem', height: 70, opacity: 0.4 }} />)}
      </div>
    )
  }

  const done = tasks.filter(t => t.status === 'done').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#f0f0f0', marginBottom: '0.25rem' }}>Checklist</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {done}/{tasks.length} done
          </p>
        </div>
        <button onClick={() => setShowAdd(v => !v)} className="btn-cyan">{showAdd ? 'Cancel' : '+ Task'}</button>
      </div>

      {showAdd && (
        <div className="os-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          <input className="os-input" placeholder="Task" value={newTask.title} onChange={e => setNewTask(t => ({ ...t, title: e.target.value }))} />
          <select className="os-input" value={newTask.category} onChange={e => setNewTask(t => ({ ...t, category: e.target.value as Category }))}>
            {CATEGORY_ORDER.map(c => <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>)}
          </select>
          <input className="os-input" type="date" value={newTask.due_date} onChange={e => setNewTask(t => ({ ...t, due_date: e.target.value }))} />
          <button onClick={addTask} className="btn-primary" style={{ justifyContent: 'center' }}>Save Task</button>
        </div>
      )}

      {CATEGORY_ORDER.map(cat => {
        const items = tasks.filter(t => t.category === cat)
        if (items.length === 0) return null
        return (
          <div key={cat} style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
              {CATEGORY_LABEL[cat]}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {items.map((t, i) => {
                const overdue = isOverdue(t.due_date, t.status)
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => cycleStatus(t)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="os-card"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', textAlign: 'left',
                      background: t.status === 'done' ? 'rgba(251,191,36,0.05)' : 'var(--glass-bg)', cursor: 'pointer',
                      borderColor: overdue ? 'rgba(236,72,153,0.35)' : undefined,
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${STATUS_COLOR[t.status]}`,
                      background: t.status === 'done' ? STATUS_COLOR[t.status] : 'transparent',
                    }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: t.status === 'done' ? '#777' : '#d0d0d0', textDecoration: t.status === 'done' ? 'line-through' : 'none' }}>
                        {t.title}
                      </span>
                      {t.due_date && (
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: overdue ? 'var(--pink)' : '#555', marginTop: '0.2rem' }}>
                          {overdue ? '⚠ overdue — ' : 'due '}{t.due_date}
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: STATUS_COLOR[t.status], letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
                      {STATUS_LABEL[t.status]}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
