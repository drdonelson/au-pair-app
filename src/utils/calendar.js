import { format, nextMonday, addDays } from 'date-fns'

// Format a date + time into Google Calendar's format: 20240101T070000
function gcalDateTime(date, hour, min) {
  const d = new Date(date)
  d.setHours(hour, min, 0, 0)
  return format(d, "yyyyMMdd'T'HHmmss")
}

// Generate a Google Calendar "Add Event" URL for a single event
export function googleCalendarUrl({ title, description, startDate, startHour, startMin, endHour, endMin }) {
  const start = gcalDateTime(startDate, startHour, startMin)
  const end = gcalDateTime(startDate, endHour, endMin)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: description,
    recur: 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Generate a full .ics file string for both events (Apple Calendar compatible)
export function generateICS(events) {
  const now = format(new Date(), "yyyyMMdd'T'HHmmss'Z'")
  // Start from next Monday so events are clean
  const startDate = nextMonday(new Date())

  const eventBlocks = events.map((ev, i) => {
    const dayOffsets = ev.days // [1,2,3,4,5] = Mon–Fri
    const byDay = dayOffsets.map(d => ['', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'][d]).join(',')

    const dtStart = gcalDateTime(startDate, ev.startHour, ev.startMin)
    const dtEnd = gcalDateTime(startDate, ev.endHour, ev.endMin)

    return [
      'BEGIN:VEVENT',
      `UID:donelson-aupair-${ev.id}-${now}`,
      `DTSTAMP:${now}`,
      `DTSTART;TZID=America/Chicago:${dtStart}`,
      `DTEND;TZID=America/Chicago:${dtEnd}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.description.replace(/\n/g, '\\n')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
    ].join('\r\n')
  })

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Donelson Family//Au Pair Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Au Pair Schedule',
    'X-WR-TIMEZONE:America/Chicago',
    ...eventBlocks,
    'END:VCALENDAR',
  ].join('\r\n')
}

// Trigger a .ics file download in the browser
export function downloadICS(icsString, filename = 'au-pair-schedule.ics') {
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
