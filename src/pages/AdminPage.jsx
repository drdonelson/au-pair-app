import React, { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { supabase } from '../lib/supabase'
import { CHECKLIST } from '../data/handbook'

const today = format(new Date(), 'yyyy-MM-dd')

const colorMap = {
  navy:   'bg-navy',
  green:  'bg-green-700',
  gold:   'bg-gold',
  purple: 'bg-purple-700',
}

const sectionColor = {
  navy:   'text-navy border-navy',
  green:  'text-green-700 border-green-700',
  gold:   'text-yellow-600 border-yellow-500',
  purple: 'text-purple-700 border-purple-700',
}

export default function AdminPage() {
  const [checked, setChecked] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [log, setLog] = useState([])
  const [lastFetch, setLastFetch] = useState(null)

  async function refresh() {
    const [{ data: row }, { data: events }] = await Promise.all([
      supabase.from('au_pair_daily_checklist').select('checked, updated_at').eq('date', today).maybeSingle(),
      supabase.from('au_pair_completion_log').select('*').eq('date', today).order('logged_at', { ascending: false }).limit(20),
    ])
    setChecked(row?.checked ?? {})
    setUpdatedAt(row?.updated_at ?? null)
    setLog(events ?? [])
    setLastFetch(new Date())
  }

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 30_000)
    return () => clearInterval(id)
  }, [])

  const allIds = Object.values(CHECKLIST).flatMap(s => s.items.map(i => i.id))
  const totalDone = checked ? allIds.filter(id => checked[id]).length : 0
  const overallPct = allIds.length > 0 ? Math.round((totalDone / allIds.length) * 100) : 0

  return (
    <div className="px-4 pb-24 pt-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-navy">Admin View</h1>
        <p className="text-sm text-gray-400">{format(new Date(), 'EEEE, MMMM d')}</p>
      </div>

      {checked === null ? (
        <div className="card text-center py-8 text-gray-400 text-sm">Loading…</div>
      ) : (
        <>
          {/* Overall progress */}
          <div className="card mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Overall progress</span>
              <span className="text-sm font-bold text-navy">{totalDone}/{allIds.length}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-3 bg-navy rounded-full transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {updatedAt
                  ? `Updated ${formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}`
                  : 'No activity yet today'}
              </span>
              <span className="text-sm font-bold text-navy">{overallPct}%</span>
            </div>
          </div>

          {/* Section breakdown */}
          {Object.entries(CHECKLIST).map(([key, section]) => {
            const ids = section.items.map(i => i.id)
            const done = ids.filter(id => checked[id]).length
            const pct = Math.round((done / ids.length) * 100)
            const bar = colorMap[section.color] || 'bg-navy'
            const col = sectionColor[section.color] || sectionColor.navy

            return (
              <div key={key} className="card mb-4 overflow-hidden p-0">
                <div className={`px-4 py-3 border-l-4 ${col} flex items-center justify-between`}>
                  <div>
                    <div className="font-semibold text-sm">{section.label}</div>
                    <div className="text-xs text-gray-400">{section.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{done}/{ids.length}</div>
                    <div className="text-xs text-gray-400">{pct}%</div>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100">
                  <div className={`h-1.5 transition-all duration-500 ${bar}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="divide-y divide-gray-50">
                  {section.items.map(item => (
                    <div key={item.id} className={`flex items-center gap-3 px-4 py-2.5 ${checked[item.id] ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center
                        ${checked[item.id] ? `${bar} border-transparent` : 'border-gray-200'}`}>
                        {checked[item.id] && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs leading-snug ${checked[item.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Completion log */}
          {log.length > 0 && (
            <>
              <div className="section-header mt-2">Activity Today</div>
              <div className="card">
                <div className="space-y-2">
                  {log.map(e => (
                    <div key={e.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-700">
                        {e.event === 'all_complete' ? '🎉 All tasks complete' : `✓ ${e.event.replace('section_complete:', '').replace('_', ' ')} done`}
                      </span>
                      <span className="text-xs text-gray-400">
                        {format(new Date(e.logged_at), 'h:mm a')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Refresh indicator */}
          <div className="mt-4 text-center text-xs text-gray-300">
            Auto-refreshes every 30s
            {lastFetch && ` · last at ${format(lastFetch, 'h:mm:ss a')}`}
          </div>
        </>
      )}
    </div>
  )
}
