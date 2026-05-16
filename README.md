# Donelson Au Pair App

Mobile-first web app for the Donelson family au pair. Daily checklist, schedule timeline, calendar sync, and house rules quick reference.

## Stack

- **Vite + React 18** — fast build, hot reload
- **Tailwind CSS** — utility-first, mobile-first styling
- **React Router** — tab-based navigation
- **date-fns** — date formatting and manipulation
- **localStorage** — checklist state persists per day, auto-resets daily

## Getting Started

```bash
# 1. Install dependencies
cd ~/Projects/au-pair-app
npm install

# 2. Start dev server
npm run dev
# → opens at http://localhost:5173

# 3. Build for production
npm run build
```

## Project Structure

```
src/
├── data/
│   └── handbook.js        ← All checklist items, schedule, rules, child profiles
├── components/
│   ├── ChecklistSection.jsx
│   └── ScheduleTimeline.jsx
├── pages/
│   ├── ChecklistPage.jsx
│   ├── SchedulePage.jsx
│   ├── CalendarPage.jsx
│   └── RulesPage.jsx
├── hooks/
│   └── useDailyChecklist.js  ← localStorage + daily reset logic
├── utils/
│   └── calendar.js           ← Google Calendar URLs + .ics generation
├── App.jsx                   ← Shell, routing, bottom nav
└── main.jsx
```

## Updating Content

All content lives in `src/data/handbook.js`. To update tasks, schedule times, house rules, or child profiles — edit that file. No other files need to change.

## Calendar Sync

**Google Calendar:** Generates a pre-filled "Add Event" URL that opens in Google Calendar with Mon–Fri recurrence pre-set.

**Apple Calendar:** Generates and downloads a `.ics` file containing both schedule blocks with `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR`. The au pair opens the file on her iPhone to import into Apple Calendar.

## Deploy to Render

1. Push this repo to GitHub: `drdonelson/au-pair-app`
2. In Render → New → Static Site
3. Connect repo, set:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Deploy — Render gives you a URL to share with the au pair

## Next Steps / Roadmap

- [ ] Add PIN lock (simple 4-digit code so only the au pair can check off tasks)
- [ ] Weekly task tracking (separate from daily reset)
- [ ] Push notifications for pickup reminders (via Web Push API)
- [ ] Admin view for David/Jodi to see today's completion status
- [ ] Add meal menu planner section
