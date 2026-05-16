const TOPIC = import.meta.env.VITE_NTFY_TOPIC

export function sendPush(title, body) {
  if (!TOPIC) return
  fetch(`https://ntfy.sh/${TOPIC}`, {
    method: 'POST',
    headers: { Title: title, Priority: 'default', 'Content-Type': 'text/plain' },
    body,
  }).catch(() => {})
}
