import { useState, useEffect } from 'react'
import { format } from 'date-fns'

// Checklist state resets each day automatically
export function useDailyChecklist() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const storageKey = `checklist-${today}`

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Clean up previous days to avoid localStorage bloat
  useEffect(() => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('checklist-') && key !== storageKey) {
          localStorage.removeItem(key)
        }
      })
    } catch {}
  }, [storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {}
  }, [checked, storageKey])

  const toggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const resetSection = (ids) => {
    setChecked(prev => {
      const next = { ...prev }
      ids.forEach(id => { next[id] = false })
      return next
    })
  }

  const completedCount = (ids) => ids.filter(id => checked[id]).length

  return { checked, toggle, resetSection, completedCount }
}
