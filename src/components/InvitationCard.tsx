import { useState } from 'react'
import CountdownTimer from './CountdownTimer'

interface Props {
  musicOn: boolean
  onToggleMusic: () => void
}

/* ─── Ornament divider ───────────────────────────────────────────────── */
function Divider({ tight = false }: { tight?: boolean }) {
  return (
    <div className={`flex items-center gap-3 w-full ${tight ? 'my-0' : 'my-1'}`}>
      <div className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(184,144,64,0.35) 100%)' }} />
      <div className="flex items-center gap-1">
        <span style={{ color: '#d4af62', fontSize: '0.45rem' }}>◆</span>
        <span style={{ color: '#b89040', fontSize: '0.55rem' }}>✦</span>
        <span style={{ color: '#d4af62', fontSize: '0.45rem' }}>◆</span>
      </div>
      <div className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, rgba(184,144,64,0.35) 0%, transparent 100%)' }} />
    </div>
  )
}

/* ─── Event detail row ───────────────────────────────────────────────── */
function DetailRow({
  icon, label, value, sub, delay,
}: {
  icon: string; label: string; value: string; sub?: string; delay?: number
}) {
  return (
    <div
      className="anim-fade-up flex items-start gap-4"
      style={{ animationDelay: `${delay ?? 0}s` }}
    >
      <div style={{
        width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(242,224,213,0.8) 0%, rgba(201,146,122,0.25) 100%)',
        border: '1px solid rgba(201,146,122,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem',
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', paddingTop: '2px' }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 300,
          fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a08070',
        }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-sub)', fontSize: '1.05rem', color: '#2e1f10', lineHeight: 1.3 }}>
          {value}
        </span>
        {sub && (
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.78rem', color: '#6b5040' }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function InvitationCard({ musicOn, onToggleMusic }: Props) {
  return (
    <>
      {/* ── Floating music button ── */}
      <button
        onClick={onToggleMusic}
        className="anim-float"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '20px',
          zIndex: 50,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.4)',
          background: musicOn
            ? 'linear-gradient(135deg, #c9927a 0%, #8a4030 100%)'
            : 'linear-gradient(135deg, #7a5c18 0%, #b89040 100%)',
          color: '#fdf8f1',
          fontSize: '1.25rem',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(122,92,24,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s, transform 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label={musicOn ? 'Pause ambient music' : 'Play ambient music'}
      >
        <span aria-hidden="true">{musicOn ? '♪' : '♫'}</span>
      </button>

      {/* ── Card ── */}
      <article
        className="anim-page-appear relative w-full"
        style={{
          maxWidth: '460px',
          margin: '0 auto',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'linear-gradient(170deg, #fdf8f1 0%, #f8f0e2 55%, #f0e4ce 100%)',
          boxShadow: `
            0 40px 100px rgba(46,31,16,0.2),
            0 8px 20px rgba(46,31,16,0.08),
            0 0 0 1px rgba(184,144,64,0.18)
          `,
        }}
      >
        {/* Gold top rule */}
        <div style={{
          height: '5px',
          background: 'linear-gradient(90deg, #7a5c18 0%, #d4af62 30%, #f5d98a 50%, #d4af62 70%, #7a5c18 100%)',
        }} />

        {/* Corner flourishes */}
        {[
          { top: '16px', left: '16px', rotate: '0deg' },
          { top: '16px', right: '16px', rotate: '90deg' },
          { bottom: '16px', left: '16px', rotate: '270deg' },
          { bottom: '16px', right: '16px', rotate: '180deg' },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute', ...pos,
              fontFamily: 'serif',
              fontSize: '1.1rem',
              color: '#b89040',
              opacity: 0.18,
              userSelect: 'none',
              transform: `rotate(${pos.rotate})`,
              lineHeight: 1,
            }}
          >
            ❧
          </div>
        ))}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '36px 28px 40px',
          gap: '24px',
        }}>

          {/* ── Header ── */}
          <header className="anim-fade-up flex flex-col items-center gap-2 text-center w-full"
            style={{ animationDelay: '0.05s' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 300,
              fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a08070',
            }}>
              Together with their families
            </p>

            <div style={{ position: 'relative', lineHeight: 1.1 }}>
              <h1 className="gold-text" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 10vw, 3rem)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                Ahmed
              </h1>
              <p className="gold-text" style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 5vw, 1.4rem)',
                margin: '2px 0',
                letterSpacing: '0.08em',
              }}>
                &amp; 
              </p>
              <h1 className="gold-text" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 10vw, 3rem)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                Menna 
              </h1>
            </div>

            <p style={{
              fontFamily: 'var(--font-sub)', fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
              color: '#6b5040',
              lineHeight: 1.5,
            }}>
              request the honour of your presence<br />
              at their wedding celebration
            </p>
          </header>

          <Divider />

          {/* ── Floral photo ── */}
          <div
            className="anim-fade-up w-full"
            style={{ animationDelay: '0.15s', borderRadius: '18px', overflow: 'hidden', height: '180px', position: 'relative' }}
          >
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=380&fit=crop&auto=format&q=80"
              alt="Romantic floral arrangement with roses and peonies"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.8) brightness(0.92)' }}
            />
            {/* Warm gradient wash */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(253,248,241,0.25) 0%, rgba(240,228,206,0.5) 100%)',
            }} />
            {/* Inner border */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '18px',
              boxShadow: 'inset 0 0 0 1px rgba(184,144,64,0.2), inset 0 0 40px rgba(46,31,16,0.12)',
            }} />
            {/* Floating date badge */}
            <div style={{
              position: 'absolute', bottom: '14px', left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(253,248,241,0.92)',
              backdropFilter: 'blur(8px)',
              borderRadius: '100px',
              padding: '6px 20px',
              border: '1px solid rgba(184,144,64,0.3)',
              boxShadow: '0 4px 12px rgba(46,31,16,0.12)',
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 300,
                fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#7a5c18',
              }}>
                September 7, 2026
              </span>
            </div>
          </div>

          <Divider />

          {/* ── Event details ── */}
          <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}
            aria-label="Wedding event details">
            <DetailRow
              icon="📅"
              label="Date"
              value="Monday, September 7th, 2026"
              delay={0.1}
            />
            <DetailRow
              icon="🕐"
              label="Time"
              value="8:00 PM — 11:00 PM"
              delay={0.17}
            />
            <DetailRow
              icon="📍"
              label="Venue"
              value="قاعة جراند حياة Grand Hayat" 
              sub="داخل نادي الهيئة العربيه للتصنيع، شارع عمر عبد العزيز ، كورنيش حلوان."


              delay={0.24}
            />

            {/* Map button */}
            <a
              className="anim-fade-up"
              href="https://maps.app.goo.gl/JVoFnsPStcbc1QS17"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: '0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px',
                borderRadius: '14px',
                border: '1px solid rgba(184,144,64,0.28)',
                background: 'linear-gradient(135deg, rgba(242,224,213,0.4) 0%, rgba(253,248,241,0.6) 100%)',
                color: '#7a5c18',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.015)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label="Open venue in Google Maps"
            >
              <span aria-hidden="true">🗺</span>
              View Location on Map
              <span aria-hidden="true" style={{ fontSize: '0.7rem', opacity: 0.6 }}>↗</span>
            </a>
          </section>

          <Divider />

          {/* ── Countdown ── */}
          <CountdownTimer />

          <Divider />

          {/* ── Closing footer ── */}
          <footer className="anim-fade-up flex flex-col items-center gap-2 w-full pt-2"
            style={{ animationDelay: '0.25s' }}>
            <p style={{
              fontFamily: 'var(--font-sub)', fontStyle: 'italic',
              fontSize: '1rem', color: '#a08070', textAlign: 'center',
            }}>
              We hope to share this magical moment with you.
            </p>
          </footer>

        </div>

        {/* Gold bottom rule */}
        <div style={{
          height: '5px',
          background: 'linear-gradient(90deg, #7a5c18 0%, #d4af62 30%, #f5d98a 50%, #d4af62 70%, #7a5c18 100%)',
        }} />
      </article>
    </>
  )
}