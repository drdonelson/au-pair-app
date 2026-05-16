import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import ChecklistPage from './pages/ChecklistPage'
import SchedulePage from './pages/SchedulePage'
import CalendarPage from './pages/CalendarPage'
import RulesPage from './pages/RulesPage'

const NAV = [
  { to: '/checklist', label: 'Checklist', icon: (active) => (
    <svg className={`w-6 h-6 ${active ? 'text-navy' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )},
  { to: '/schedule', label: 'Schedule', icon: (active) => (
    <svg className={`w-6 h-6 ${active ? 'text-navy' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { to: '/calendar', label: 'Calendar', icon: (active) => (
    <svg className={`w-6 h-6 ${active ? 'text-navy' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )},
  { to: '/rules', label: 'Rules', icon: (active) => (
    <svg className={`w-6 h-6 ${active ? 'text-navy' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )},
]

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-navy text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <div className="text-lg font-bold tracking-tight">Donelson</div>
        <div className="text-gold text-xs font-medium">Au Pair</div>
      </div>

      {/* Page content */}
      <main className="min-h-[calc(100vh-112px)]">
        <Routes>
          <Route path="/" element={<Navigate to="/checklist" replace />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10
                      flex items-center justify-around px-2 pb-safe"
           style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
      >
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-colors
               ${isActive ? 'text-navy' : 'text-gray-400'}`
            }
          >
            {({ isActive }) => (
              <>
                {icon(isActive)}
                <span className={`text-[10px] font-medium ${isActive ? 'text-navy' : 'text-gray-400'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
