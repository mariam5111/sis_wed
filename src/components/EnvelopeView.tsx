import { useEffect, useState } from 'react'

interface Props {
  stage: 'idle' | 'opening'
  onOpen: () => void
}

export default function EnvelopeView({ stage, onOpen }: Props) {
  const isOpening = stage === 'opening'
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 select-none" style={{ paddingTop: '5vh', paddingBottom: '5vh' }}>

      {/* Top script */}
      <div className="anim-fade-up flex flex-col items-center gap-1 text-center" style={{ animationDelay: '0.1s' }}>
        <p style={{
          fontFamily: 'var(--font-sub)',
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
          color: '#a08070',
          letterSpacing: '0.04em',
        }}>
          يسرنا دعوتكم لحضور حفل زفافنا
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #b89040)' }} />
          <span style={{ color: '#b89040', fontSize: '0.55rem' }}>✦</span>
          <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #b89040, transparent)' }} />
        </div>
      </div>

      {/* ── Envelope ── */}
      <div
        className={`anim-fade-up ${isOpening ? 'anim-env-shrink' : ''}`}
        style={{
          animationDelay: '0.25s',
          width: 'min(420px, 90vw)',
          position: 'relative',
        }}
      >
        {/* Drop shadow layer */}
        <div style={{
          position: 'absolute',
          bottom: '-12px',
          left: '4%',
          right: '4%',
          height: '24px',
          borderRadius: '50%',
          background: 'rgba(46,31,16,0.12)',
          filter: 'blur(12px)',
        }} />

        {/* Envelope body */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '65%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(46,31,16,0.2), 0 4px 12px rgba(46,31,16,0.1)',
          }}
        >
          {/* Base body */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(170deg, #ede0cc 0%, #d8c8b0 100%)',
          }} />

          {/* Left diagonal crease */}
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(0 100%, 50% 48%, 0 0)',
            background: 'linear-gradient(135deg, #e8d8c4 0%, #d0bda4 100%)',
          }} />

          {/* Right diagonal crease */}
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(100% 0, 50% 48%, 100% 100%)',
            background: 'linear-gradient(225deg, #e5d4be 0%, #ccb898 100%)',
          }} />

          {/* Bottom triangle fold */}
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(0 100%, 50% 52%, 100% 100%)',
            background: 'linear-gradient(180deg, #d8c8b0 0%, #c8b49a 100%)',
          }} />

          {/* Subtle linen texture lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(139,105,20,0.03) 14px, rgba(139,105,20,0.03) 15px)',
            pointerEvents: 'none',
          }} />

          {/* Border accent */}
          <div className="absolute inset-0 rounded-xl" style={{
            boxShadow: 'inset 0 0 0 1.5px rgba(184,144,64,0.2)',
            pointerEvents: 'none',
          }} />

          {/* ── Inner card ── */}
          {!isOpening && (
            <div style={{
              position: 'absolute',
              bottom: '14%',
              left: '10%',
              right: '10%',
              height: '50%',
              background: 'linear-gradient(160deg, #fdf8f1 0%, #f5ead8 100%)',
              borderRadius: '6px',
              boxShadow: '0 2px 16px rgba(46,31,16,0.14)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              zIndex: 5,
            }}>
              <p style={{
                fontFamily: 'var(--font-sub)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.85rem, 3vw, 1.05rem)',
                color: '#b89040',
                letterSpacing: '0.04em',
                fontWeight: 'bold',
              }}>
                Ahmed &amp; Menna
              </p>
              <div style={{ width: '32px', height: '1px', background: '#c9927a', opacity: 0.5 }} />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 'clamp(0.65rem, 2.2vw, 0.78rem)',
                color: '#a08070',
              }}>
                7. سبتمبر . 2026
              </p>
            </div>
          )}

          {/* ── Animated flap ── */}
          <div
            className={isOpening ? 'anim-flap' : ''}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '56%',
              clipPath: 'polygon(0 0, 50% 88%, 100% 0)',
              background: 'linear-gradient(175deg, #e8dcc8 0%, #d0bcA0 100%)',
              transformOrigin: 'top center',
              zIndex: 20,
              willChange: 'transform',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              clipPath: 'polygon(0 0, 50% 88%, 100% 0)',
              background: 'linear-gradient(175deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at center, rgba(184,144,64,0.06) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }} />
          </div>

          {/* ── Wax seal (A & M) ── */}
          <div
            className={isOpening ? 'anim-card-emerge' : ''}
            style={{
              position: 'absolute',
              bottom: isOpening ? '10%' : '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              width: '52px',
              height: '52px',
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 35%, #d4a090 0%, #c9927a 30%, #8a4030 100%)',
              boxShadow: '0 3px 10px rgba(100,40,20,0.35), inset 0 1px 2px rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                inset: '3px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.2)',
              }} />
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#fdf8f1',
                lineHeight: 1,
                textShadow: '0 1px 3px rgba(100,40,20,0.4)',
              }}>A &amp; M</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Open button ── */}
      <div className="anim-fade-up flex flex-col items-center gap-3" style={{ animationDelay: '0.45s' }}>
        <button
          onClick={onOpen}
          disabled={isOpening}
          className="anim-pulse-ring relative group"
          style={{
            padding: '14px 48px',
            borderRadius: '100px',
            border: 'none',
            background: 'linear-gradient(135deg, #7a5c18 0%, #b89040 35%, #d4af62 50%, #b89040 65%, #7a5c18 100%)',
            backgroundSize: '200% auto',
            color: '#fdf8f1',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '0.88rem',
            cursor: isOpening ? 'not-allowed' : 'pointer',
            opacity: isOpening ? 0.6 : 1,
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 8px 28px rgba(122,92,24,0.35)',
          }}
          onMouseEnter={e => !isOpening && ((e.currentTarget.style.transform = 'scale(1.04)'))}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          aria-label="افتح دعوة الزفاف"
        >
          {isOpening ? 'جاري الفتح…' : 'افتح الدعوة ✉️'}
        </button>

        {showHint && !isOpening && (
          <p className="anim-fade-up" style={{
            fontFamily: 'var(--font-sub)',
            fontStyle: 'italic',
            fontSize: '0.85rem',
            color: '#a08070',
            animationDelay: '0s',
          }}>
            اضغط لفتح الدعوة ✦
          </p>
        )}
      </div>

    </div>
  )
}