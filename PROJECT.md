# Donelson Au Pair App — Project Reference

## What It Is
Mobile-first web app for the Donelson family au pair. Daily checklist, schedule timeline, calendar sync, house rules, and push notifications to David.

## Stack
| Layer | Tool |
|---|---|
| Frontend | Vite + React 18 + Tailwind CSS + React Router |
| Database | Supabase (hosted in `hallmark-dental-supplies` project — see note below) |
| Push notifications | ntfy.sh |
| Hosting | Render (static site) |
| Repo | https://github.com/drdonelson/au-pair-app |

## Pages
| Route | Who uses it | What it does |
|---|---|---|
| `/#/checklist` | Au pair | Daily checklist — checks off tasks, syncs to Supabase |
| `/#/schedule` | Au pair | Timeline view; Day Off card on weekends |
| `/#/calendar` | Au pair | Google Calendar link + .ics download |
| `/#/rules` | Au pair | House rules + emergency contacts |
| `/#/admin` | David only | Live progress dashboard, auto-refreshes every 30s |

## Updating Content
All content (tasks, schedule, rules, child profiles) lives in one file:
```
src/data/handbook.js
```
Edit that file, then:
```bash
git add src/data/handbook.js
git commit -m "Update checklist/schedule"
git push
```
Render auto-deploys in ~60 seconds.

## Environment Variables
Set these in Render dashboard → Environment before deploying:
```
VITE_SUPABASE_URL        = https://twfsevpbbshzgrzdfgve.supabase.co
VITE_SUPABASE_ANON_KEY   = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  (see .env.local)
VITE_NTFY_TOPIC          = donelson-au-pair-k9x3m
```
These are not committed to git. Local values live in `.env.local` (git-ignored).

## Push Notifications (David's phone only)
1. Install the **ntfy** app (free, iOS or Android)
2. Subscribe to topic: `donelson-au-pair-k9x3m`

Notifications fire automatically when:
- Morning Block is 100% complete
- Afternoon/Evening Block is 100% complete
- Any other section hits 100%
- All tasks for the day are done (🎉)

The au pair does not install anything — she just checks off tasks normally.

## Database
**Supabase project:** `hallmark-dental-supplies` (ID: `twfsevpbbshzgrzdfgve`)

> The au-pair tables live here because the Supabase free tier limits accounts
> to 2 active projects, and both MVP (Rippl) and hallmark-dental-supplies are
> in use. The tables are fully isolated — no relation to dental supply data.
> See `SUPABASE_NOTES.md` to add that note to the supplies project.

**Tables:**
- `au_pair_daily_checklist` — one row per day, `checked` column is a JSON map of task IDs → true/false
- `au_pair_completion_log` — event log (section completions, all-done) with timestamps

## Children
| Name | Age | School |
|---|---|---|
| Claire | 7 | Bus 7:45am / 3:45pm — ADHD, Apraxia |
| Henry | 5 | Bus 7:45am / 3:45pm |
| Jack | 3 | Academy drop 8:00am / pick up 3:00pm |

## Emergency Contacts
- Jodi: 615-481-8556
- David: 615-481-9918
- 911

## Roadmap
- [ ] PIN lock (4-digit, au pair only)
- [ ] Weekly task tracking separate from daily reset
- [ ] Push notifications for specific pickup reminders
- [ ] Meal menu planner section
