// ─── DAILY CHECKLIST DATA ────────────────────────────────────────────────────
// Sourced from Donelson Family Au Pair Handbook

export const CHECKLIST = {
  morning: {
    label: 'Morning Block',
    time: '6:50 – 8:20 am',
    color: 'navy',
    items: [
      { id: 'm1', text: 'Kids wake up — make breakfast, pack lunches' },
      { id: 'm2', text: 'Get kids dressed (weather appropriate)' },
      { id: 'm3', text: 'Brush hair, teeth, wash hands, wipe faces' },
      { id: 'm4', text: "Pack Claire's snack and lunch (if not eating hot lunch)" },
      { id: 'm5a', text: 'Apply sunscreen to Claire & Henry faces before bus stop' },
      { id: 'm5', text: 'Walk Claire & Henry to bus stop at 7:45 am' },
      { id: 'm6', text: 'Drive Jack to Academy (Seaboard Lane) by 8:00 am' },
      { id: 'm7', text: 'Sweep/vacuum kitchen floors after breakfast' },
      { id: 'm8', text: 'Clean countertops, load/unload dishwasher' },
      { id: 'm9', text: 'Start kids laundry load' },
      { id: 'm10', text: 'Tidy kitchen, playrooms, kids rooms' },
    ],
  },
  afternoon: {
    label: 'Afternoon / Evening Block',
    time: '3:00 – 8:30 pm',
    color: 'green',
    items: [
      { id: 'a1', text: 'Pick up Jack from Academy at 3:00 pm' },
      { id: 'a2', text: "Meet Claire & Henry at bus stop at 3:45 pm" },
      { id: 'a3', text: 'Empty lunch boxes, sort homework' },
      { id: 'a4', text: 'Dinner prep (protein + vegetable + fruit)' },
      { id: 'a5', text: 'Organized play / outdoor time / sports / tutoring' },
      { id: 'a6', text: 'Serve dinner (~5:30 pm — no snacks before dinner)' },
      { id: 'a7', text: 'Baths at 6:30 pm — wash hair if needed' },
      { id: 'a8', text: 'Pajamas on, lay out clothes for tomorrow' },
      { id: 'a9', text: 'Brush teeth, hair; diapers for Jack/Henry; everyone use toilet' },
      { id: 'a10', text: 'Bedtime routine — books, snuggles, lights out 7:30–8:00 pm' },
      { id: 'a11', text: "Make Claire's snack/lunch for next school day" },
      { id: 'a12', text: 'Tidy kitchen, load dishwasher' },
    ],
  },
  daily: {
    label: 'Daily Tasks',
    time: 'Throughout the day',
    color: 'gold',
    items: [
      { id: 'd2', text: 'Keep kitchen sink clean/white' },
      { id: 'd3', text: 'Vacuum dining area and playrooms' },
      { id: 'd4', text: 'Remove all items from cars (no trash/water bottles)' },
      { id: 'd5', text: 'All clean folded laundry put away same day' },
      { id: 'd6', text: 'Organize and put away toys in playroom' },
      { id: 'd7', text: 'Check fridge for spoiled foods / add to grocery list' },
    ],
  },
  weekly: {
    label: 'Weekly Tasks',
    time: 'Once per week',
    color: 'purple',
    items: [
      { id: 'w1', text: 'Wash kids bed sheets (pick one day)' },
      { id: 'w2', text: 'Clean towels' },
      { id: 'w3', text: 'Wash nap linens (end of week)' },
      { id: 'w4', text: 'Au pair washes own sheets (maid removes them on cleaning day)' },
      { id: 'w5', text: 'Bring kids garbage to bin (Tuesdays)' },
      { id: 'w6', text: 'Organize pantry with any new snacks' },
    ],
  },
}

// ─── DAILY SCHEDULE TIMELINE ─────────────────────────────────────────────────

export const SCHEDULE = [
  { time: '6:50 am', label: 'On duty — morning block begins', type: 'start' },
  { time: '7:00 am', label: 'Kids wake up, breakfast, get dressed', type: 'task' },
  { time: '7:45 am', label: 'Bus stop — Claire & Henry (sign #10)', type: 'pickup' },
  { time: '8:00 am', label: 'Drive Jack to Academy (Seaboard Lane)', type: 'pickup' },
  { time: '8:20 am', label: 'Morning block ends — OFF DUTY', type: 'break' },
  { time: '3:00 pm', label: 'Back on duty — pick up Jack from Academy', type: 'start' },
  { time: '3:45 pm', label: "Bus stop — Claire & Henry pickup", type: 'pickup' },
  { time: '4:00 pm', label: 'Dinner prep begins', type: 'task' },
  { time: '4:30 pm', label: 'Organized play / outdoor time / sports', type: 'task' },
  { time: '5:30 pm', label: 'Serve dinner', type: 'task' },
  { time: '6:30 pm', label: 'Baths, hair washing if needed', type: 'task' },
  { time: '7:00 pm', label: 'Pajamas, teeth, toilet, diapers', type: 'task' },
  { time: '7:30 pm', label: 'Bedtime routine — books & snuggles', type: 'task' },
  { time: '8:00 pm', label: 'Kitchen tidy, dishwasher, pack lunch', type: 'task' },
  { time: '8:30 pm', label: 'Off duty', type: 'break' },
]

// ─── CALENDAR EVENTS (recurring weekly, M–F) ─────────────────────────────────
// Used to generate Google Calendar links and .ics file

export const CALENDAR_EVENTS = [
  {
    id: 'cal1',
    title: 'Au Pair — Morning Block',
    startHour: 6, startMin: 50,
    endHour: 8, endMin: 20,
    description: 'Morning duties: wake kids, breakfast, bus stop 7:45am, drive Jack to Academy 8am',
    days: [1, 2, 3, 4, 5], // Mon–Fri
    color: '#1B3A5C',
  },
  {
    id: 'cal2',
    title: 'Au Pair — Afternoon / Evening Block',
    startHour: 15, startMin: 0,
    endHour: 20, endMin: 30,
    description: 'Afternoon duties: pick up Jack 3pm, bus stop 3:45pm, dinner, baths, bedtime 7:30pm, kitchen tidy',
    days: [1, 2, 3, 4, 5],
    color: '#3B6E3A',
  },
]

// ─── HOUSE RULES (quick reference) ───────────────────────────────────────────

export const HOUSE_RULES = [
  { emoji: '👟', rule: 'No shoes inside — remove at front door' },
  { emoji: '📱', rule: 'No phone use while kids are awake and in your care' },
  { emoji: '🚗', rule: 'Car use must be approved — no overnight use without asking' },
  { emoji: '🍬', rule: 'No sweets without asking Jodi or David first' },
  { emoji: '🔒', rule: 'Keep all doors locked — do not open door to unexpected visitors' },
  { emoji: '🏊', rule: 'Pool access requires another adult present' },
  { emoji: '👀', rule: 'Eyes on kids at all times when outside' },
  { emoji: '🍽️', rule: 'No food outside kitchen and dining room' },
]

// ─── CHILD PROFILES ───────────────────────────────────────────────────────────

export const CHILDREN = [
  {
    name: 'Claire',
    age: 7,
    emoji: '⭐',
    color: 'pink',
    school: 'School bus — 7:45 am / 3:45 pm',
    notes: ['ADHD, Apraxia, speech delay — be patient', 'Loves challenges, arts & crafts, sports', 'When upset: deep breath, shake it out, volcano breathing, redirect'],
  },
  {
    name: 'Henry',
    age: 5,
    emoji: '🦸',
    color: 'blue',
    school: 'School bus — 7:45 am / 3:45 pm',
    notes: ['Sweet and emotionally astute, can be shy', 'Loves superheroes, dancing, nature walks', 'When upset: let him express himself fully, eye contact, big hugs'],
  },
  {
    name: 'Jack',
    age: 3,
    emoji: '🚀',
    color: 'orange',
    school: 'Academy — drop 8:00 am / pick up 3:00 pm',
    notes: ['High energy, gets bored easily — smooth transitions', 'Loves outdoors and cuddles', 'When upset: check hunger, tired, bored, stomach ache, sibling conflict'],
  },
]
