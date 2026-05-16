import React, { useState } from 'react'
import { CALENDAR_EVENTS } from '../data/handbook'
import { googleCalendarUrl, generateICS, downloadICS } from '../utils/calendar'

export default function CalendarPage() {
  const [exported, setExported] = useState(null)

  function handleGoogleAdd(event) {
    const startDate = new Date() // will use next occurrence logic in URL
    const url = googleCalendarUrl({ ...event, startDate })
    window.open(url, '_blank')
    setExported('google')
  }

  function handleAppleExport() {
    const ics = generateICS(CALENDAR_EVENTS)
    downloadICS(ics)
    setExported('apple')
  }

  return (
    <div className="px-4 pb-24 pt-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-navy mb-1">Calendar Sync</h1>
      <p className="text-sm text-gray-500 mb-6">
        Add your weekly schedule to Google Calendar or Apple Calendar. Events repeat Monday–Friday automatically.
      </p>

      {/* Google Calendar */}
      <div className="card mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-lg">📅</div>
          <div>
            <div className="font-semibold text-sm">Google Calendar</div>
            <div className="text-xs text-gray-400">Opens Google Calendar in browser</div>
          </div>
        </div>

        <div className="space-y-2">
          {CALENDAR_EVENTS.map(event => (
            <button
              key={event.id}
              onClick={() => handleGoogleAdd(event)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-gray-200
                         bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="text-left">
                <div className="text-sm font-medium text-gray-800">{event.title}</div>
                <div className="text-xs text-gray-400">
                  {String(event.startHour % 12 || 12).padStart(2,'0')}:{String(event.startMin).padStart(2,'0')}
                  {event.startHour < 12 ? ' am' : ' pm'} –{' '}
                  {String(event.endHour % 12 || 12).padStart(2,'0')}:{String(event.endMin).padStart(2,'0')}
                  {event.endHour < 12 ? ' am' : ' pm'} · Mon–Fri
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Apple Calendar */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-lg">🍎</div>
          <div>
            <div className="font-semibold text-sm">Apple Calendar</div>
            <div className="text-xs text-gray-400">Downloads .ics file — open to import</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Downloads a single .ics file containing both schedule blocks (Mon–Fri, repeating). Open it on your iPhone or Mac to import into Apple Calendar.
        </p>
        <button
          onClick={handleAppleExport}
          className="w-full btn-primary py-3 text-sm"
        >
          Download Schedule (.ics)
        </button>
        {exported === 'apple' && (
          <p className="text-xs text-green-600 mt-2 text-center">
            ✓ Downloaded! Open the file to add to Apple Calendar.
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="card bg-gold-light border-0">
        <h3 className="font-semibold text-sm text-navy mb-2">How to import on iPhone</h3>
        <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
          <li>Tap "Download Schedule (.ics)" above</li>
          <li>Open the Files app and find the downloaded file</li>
          <li>Tap the file — it will open Apple Calendar</li>
          <li>Tap "Add All Events" to confirm</li>
        </ol>
      </div>
    </div>
  )
}
