import React, { useState } from 'react'

const colorMap = {
  navy:   { header: 'bg-navy text-white', bar: 'bg-navy', ring: 'ring-navy' },
  green:  { header: 'bg-green-700 text-white', bar: 'bg-green-700', ring: 'ring-green-700' },
  gold:   { header: 'bg-gold text-white', bar: 'bg-gold', ring: 'ring-gold' },
  purple: { header: 'bg-purple-700 text-white', bar: 'bg-purple-700', ring: 'ring-purple-700' },
}

export default function ChecklistSection({ section, checked, onToggle, onReset }) {
  const [open, setOpen] = useState(true)
  const ids = section.items.map(i => i.id)
  const done = ids.filter(id => checked[id]).length
  const total = ids.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const colors = colorMap[section.color] || colorMap.navy
  const allDone = done === total

  return (
    <div className="card mb-4 overflow-hidden p-0">
      {/* Header */}
      <button
        className={`w-full flex items-center justify-between px-4 py-3 ${colors.header}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="text-left">
          <div className="font-semibold text-sm">{section.label}</div>
          <div className="text-xs opacity-80">{section.time}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold">{done}/{total}</span>
          <svg
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className={`h-1 transition-all duration-500 ${colors.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Items */}
      {open && (
        <div className="divide-y divide-gray-50">
          {section.items.map((item) => {
            const isChecked = !!checked[item.id]
            return (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors
                  ${isChecked ? 'bg-gray-50' : 'bg-white active:bg-gray-50'}`}
              >
                {/* Checkbox */}
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                  ${isChecked ? `${colors.bar} border-transparent` : 'border-gray-300'}`}
                >
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm leading-snug ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item.text}
                </span>
              </button>
            )
          })}

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
            <span className={`text-xs font-medium ${allDone ? 'text-green-600' : 'text-gray-400'}`}>
              {allDone ? '✓ All done!' : `${total - done} remaining`}
            </span>
            {done > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); onReset(ids) }}
                className="text-xs text-gray-400 underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
