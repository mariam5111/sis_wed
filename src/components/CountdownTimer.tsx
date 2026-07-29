import { useState, useEffect, useRef } from 'react'

// 💡 التاريخ المظبوط: 7 سبتمبر الساعة 6 مساءً
const TARGET = new Date('2026-09-07T20:00:00')

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n: number) { return String(n).padStart(2, '0') }

interface BoxProps { value: number; label: string; delay: number }

function TimerBox({ value, label, delay }: BoxProps) {
  const prev = useRef(value)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true)
      const t = setTimeout(() => setFlip(false), 300)
      prev.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-2 anim-fade-up" style={{ animationDelay: `${delay}s` }}>
      {/* Card */}
      <div
        style={{
          width: 'clamp(64px, 19vw, 82px)',
          height: 'clamp(72px, 22vw, 92px)',
          borderRadius: '14px',
          background: 'linear-gradient(170deg, #fdf8f1 0%, #f0e4ce 100%)',
          border: '1px solid rgba(184,144,64,0.22)',
          boxShadow: '0 6px 20px rgba(46,31,16,0.1), inset 0 1px 0 rgba(255,255,255,0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
          borderRadius: '14px 14px 0 0',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '49%',
          left: '6px', right: '6px',
          height: '1px',
          background: 'rgba(184,144,64,0.15)',
        }} />

        <span
          key={value}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 5.5vw, 2rem)',
            fontWeight: 600,
            color: '#7a5c18',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            animation: flip ? 'digit-flip 0.28s ease-out' : 'none',
          }}
        >
          {pad(value)}
        </span>
      </div>

      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: '0.75rem',
        color: '#a08070',
      }}>
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
      color: '#c9927a',
      opacity: 0.6,
      marginTop: '-12px',
      lineHeight: 1,
      userSelect: 'none',
    }}>
      :
    </span>
  )
}

export default function CountdownTimer() {
  const [t, setT] = useState(getTimeLeft)
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="flex flex-col items-center gap-4 w-full" aria-label="العد التنازلي لحفل الزفاف">
      <p style={{
        fontFamily: 'var(--font-sub)',
        fontStyle: 'italic',
        fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)',
        color: '#b89040',
        letterSpacing: '0.04em',
      }}>
        فاضل على الليلة الموعودة
      </p>
      <div className="flex items-center justify-center gap-1.5 w-full" dir="ltr">
        <TimerBox value={t.days}    label="يوم"    delay={0.1} />
        <Colon />
        <TimerBox value={t.hours}   label="ساعة"   delay={0.18} />
        <Colon />
        <TimerBox value={t.minutes} label="دقيقة" delay={0.26} />
        <Colon />
        <TimerBox value={t.seconds} label="ثانية" delay={0.34} />
      </div>
    </section>
  )
}