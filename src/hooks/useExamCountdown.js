import { useEffect, useState } from 'react'

const EXAM_AT = new Date('2026-11-14T09:00:00+07:00').getTime()

export function useExamCountdown() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const sync = () => setNow(Date.now())
    const timer = window.setInterval(sync, 60_000)
    window.addEventListener('focus', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  const remaining = Math.max(0, EXAM_AT - now)
  const totalMinutes = Math.floor(remaining / 60_000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  return {
    days,
    hours,
    minutes,
    isPast: now >= EXAM_AT,
    examAt: EXAM_AT
  }
}
