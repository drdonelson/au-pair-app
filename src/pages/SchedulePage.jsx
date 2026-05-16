import React from 'react'
import { format } from 'date-fns'
import ScheduleTimeline from '../components/ScheduleTimeline'
import { CHILDREN } from '../data/handbook'

const childColor = {
  pink: 'bg-pink-100 text-pink-700',
  blue: 'bg-blue-100 text-blue-700',
  orange: 'bg-orange-100 text-orange-700',
}

export default function SchedulePage() {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = Sun, 6 = Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const dayName = format(today, 'EEEE')

  return (
    <div className="px-4 pb-24 pt-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-navy mb-1">Schedule</h1>
      <p className="text-sm text-gray-400 mb-5">{isWeekend ? dayName : `${dayName} — Monday–Friday`}</p>

      {isWeekend ? (
        <div className="card text-center py-8 mb-5">
          <div className="text-4xl mb-3">🌿</div>
          <div className="font-bold text-navy text-lg">Day Off</div>
          <div className="text-sm text-gray-400 mt-1">Enjoy your weekend — back on Monday.</div>
        </div>
      ) : (
        <ScheduleTimeline />
      )}

      <div className="mt-5">
        <div className="section-header">Kids & School</div>
        <div className="space-y-3">
          {CHILDREN.map(child => (
            <div key={child.name} className="card">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{child.emoji}</span>
                <div>
                  <div className="font-semibold text-navy">{child.name}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${childColor[child.color]}`}>
                    Age {child.age}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-2">
                🚌 <span>{child.school}</span>
              </div>
              <ul className="space-y-1">
                {child.notes.map((note, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-2">
                    <span className="text-gray-300">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
