import React from 'react'
import { HOUSE_RULES } from '../data/handbook'

export default function RulesPage() {
  return (
    <div className="px-4 pb-24 pt-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-navy mb-1">House Rules</h1>
      <p className="text-sm text-gray-400 mb-5">Quick reference — always on duty</p>

      <div className="card mb-5">
        <div className="space-y-3">
          {HOUSE_RULES.map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className="text-xl flex-shrink-0">{item.emoji}</span>
              <span className="text-sm text-gray-700 leading-snug">{item.rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency contacts */}
      <div className="section-header">Emergency Contacts</div>
      <div className="card">
        <div className="space-y-3">
          {[
            { label: 'Jodi (call first)', number: '615-481-8556', emoji: '📱' },
            { label: 'David (call second)', number: '615-481-9918', emoji: '📱' },
            { label: 'Emergency', number: '911', emoji: '🚨' },
          ].map(c => (
            <a
              key={c.label}
              href={`tel:${c.number}`}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span>{c.emoji}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800">{c.label}</div>
                  <div className="text-xs text-gray-400">{c.number}</div>
                </div>
              </div>
              <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
