import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { supabase } from '../lib/supabase'
import { sendPush } from '../lib/notify'
import { CHECKLIST } from '../data/handbook'

const today = format(new Date(), 'yyyy-MM-dd')
const storageKey = `checklist-${today}`

function loadLocal() {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function saveLocal(checked) {
  try { localStorage.setItem(storageKey, JSON.stringify(checked)) } catch {}
}

async function fetchRemote() {
  const { data } = await supabase
    .from('au_pair_daily_checklist')
    .select('checked')
    .eq('date', today)
    .maybeSingle()
  return data?.checked ?? null
}

async function syncRemote(checked) {
  await supabase
    .from('au_pair_daily_checklist')
    .upsert({ date: today, checked, updated_at: new Date().toISOString() }, { onConflict: 'date' })
}

async function logEvent(event, pct) {
  await supabase
    .from('au_pair_completion_log')
    .insert({ date: today, event, pct })
}

export function useDailyChecklist() {
  const [checked, setChecked] = useState(loadLocal)
  const prevRef = useRef({})
  const notifiedRef = useRef(new Set())

  // Clean up old localStorage keys
  useEffect(() => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('checklist-') && key !== storageKey) localStorage.removeItem(key)
      })
    } catch {}
  }, [])

  // On mount, fetch remote state and merge (remote wins if newer)
  useEffect(() => {
    fetchRemote().then(remote => {
      if (remote && Object.keys(remote).length > 0) {
        setChecked(remote)
        saveLocal(remote)
      }
    })
  }, [])

  // Persist locally + sync to Supabase on every change
  useEffect(() => {
    saveLocal(checked)
    syncRemote(checked)
  }, [checked])

  // Detect section completions and fire push notifications
  useEffect(() => {
    const allIds = Object.values(CHECKLIST).flatMap(s => s.items.map(i => i.id))
    const totalDone = allIds.filter(id => checked[id]).length
    const pct = Math.round((totalDone / allIds.length) * 100)

    Object.entries(CHECKLIST).forEach(([key, section]) => {
      const ids = section.items.map(i => i.id)
      const wasDone = ids.every(id => prevRef.current[id])
      const isDone = ids.every(id => checked[id])

      if (isDone && !wasDone && !notifiedRef.current.has(key)) {
        notifiedRef.current.add(key)
        sendPush(
          `✓ ${section.label} complete`,
          `${pct}% of all tasks done today`
        )
        logEvent(`section_complete:${key}`, pct)
      }
    })

    const wasAllDone = allIds.every(id => prevRef.current[id])
    const isAllDone = allIds.every(id => checked[id])
    if (isAllDone && !wasAllDone && !notifiedRef.current.has('all_complete')) {
      notifiedRef.current.add('all_complete')
      sendPush('🎉 All tasks done!', 'Every task is checked off for today.')
      logEvent('all_complete', 100)
    }

    prevRef.current = checked
  }, [checked])

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))

  const resetSection = (ids) => setChecked(prev => {
    const next = { ...prev }
    ids.forEach(id => { next[id] = false })
    return next
  })

  const completedCount = (ids) => ids.filter(id => checked[id]).length

  return { checked, toggle, resetSection, completedCount }
}
