import React from 'react'
import { format } from 'date-fns'
import { CHECKLIST } from '../data/handbook'
import { useDailyChecklist } from '../hooks/useDailyChecklist'
import ChecklistSection from '../components/ChecklistSection'

export default function ChecklistPage() {
  const { checked, toggle, resetSection, completedCount } = useDailyChecklist()

  const allIds = Object.values(CHECKLIST).flatMap(s => s.items.map(i => i.id))
  const totalDone = allIds.filter(id => checked[id]).length
  const totalAll = allIds.length
  const overallPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0

  return (
    <div className="px-4 pb-24 pt-4 max-w-lg mx-auto">
      {/* Date header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-navy">Daily Checklist</h1>
        <p className="text-sm text-gray-400">{format(new Date(), 'EEEE, MMMM d')}</p>
      </div>

      {/* Overall progress */}
      <div className="card mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Overall progress</span>
          <span className="text-sm font-bold text-navy">{totalDone}/{totalAll}</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-2.5 bg-navy rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="mt-1.5 text-right text-xs text-gray-400">{overallPct}% complete</div>
      </div>

      {/* Sections */}
      {Object.entries(CHECKLIST).map(([key, section]) => (
        <ChecklistSection
          key={key}
          section={section}
          checked={checked}
          onToggle={toggle}
          onReset={resetSection}
        />
      ))}

      {/* All done state */}
      {totalDone === totalAll && totalAll > 0 && (
        <div className="card text-center py-6 border-gold border-2">
          <div className="text-3xl mb-2">🎉</div>
          <div className="font-bold text-navy">All done for today!</div>
          <div className="text-sm text-gray-400 mt-1">Great work. See you tomorrow.</div>
        </div>
      )}
    </div>
  )
}
