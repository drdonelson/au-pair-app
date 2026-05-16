import React from 'react'
import { SCHEDULE } from '../data/handbook'

const typeStyle = {
  start:  { dot: 'bg-navy', text: 'font-semibold text-navy' },
  pickup: { dot: 'bg-gold', text: 'font-medium text-gray-800' },
  task:   { dot: 'bg-gray-300', text: 'text-gray-700' },
  break:  { dot: 'bg-green-500', text: 'font-semibold text-green-700' },
}

function isCurrentBlock(item, index) {
  const now = new Date()
  const day = now.getDay()
  if (day === 0 || day === 6) return false
  const [time, period] = item.time.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (period === 'pm' && h !== 12) h += 12
  if (period === 'am' && h === 12) h = 0
  const itemMinutes = h * 60 + m
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  // Check if we're between this item and the next
  const next = SCHEDULE[index + 1]
  if (!next) return nowMinutes >= itemMinutes
  const [nt, np] = next.time.split(' ')
  let [nh, nm] = nt.split(':').map(Number)
  if (np === 'pm' && nh !== 12) nh += 12
  if (np === 'am' && nh === 12) nh = 0
  const nextMinutes = nh * 60 + nm
  return nowMinutes >= itemMinutes && nowMinutes < nextMinutes
}

export default function ScheduleTimeline() {
  return (
    <div className="card">
      <h2 className="font-semibold text-navy mb-4">Today's Schedule</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

        <div className="space-y-4">
          {SCHEDULE.map((item, i) => {
            const style = typeStyle[item.type] || typeStyle.task
            const current = isCurrentBlock(item, i)
            return (
              <div key={i} className={`flex gap-4 relative ${current ? 'opacity-100' : 'opacity-70'}`}>
                {/* Dot */}
                <div className={`relative z-10 mt-1 w-3.5 h-3.5 rounded-full flex-shrink-0 ${style.dot}
                  ${current ? 'ring-2 ring-offset-2 ring-navy scale-125' : ''}`}
                />
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-400 w-16 flex-shrink-0">{item.time}</span>
                    <span className={`text-sm ${style.text}`}>{item.label}</span>
                  </div>
                  {current && (
                    <span className="ml-[4.5rem] mt-0.5 inline-block text-xs bg-navy text-white px-2 py-0.5 rounded-full">
                      Now
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
